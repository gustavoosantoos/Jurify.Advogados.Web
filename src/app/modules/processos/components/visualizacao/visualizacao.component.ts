import { saveAs } from 'file-saver';
import { Evento } from './../../model/visualizacao/evento.model';
import { Component, OnInit, ViewChild, TemplateRef, ElementRef } from '@angular/core';
import { ProcessosJuridicosService } from '../../services/processos-juridicos.service';
import { LoadingScreenService } from 'src/app/shared/services/loading-screen.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar, MatDialog } from '@angular/material';
import { FormGroup } from '@angular/forms';
import { RxFormBuilder } from '@rxweb/reactive-form-validators';
import { NovoEvento } from '../../model/visualizacao/novo-evento.model';
import { Processo } from '../../model/visualizacao/processo.model';
import { Anexo } from '../../model/visualizacao/anexo.model';
import EstadoBrasileiro from 'src/app/shared/model/estado-brasileiro.model';
import { CadastrosService } from 'src/app/shared/services/cadastros.service';
import { ProcessoAtualizacao } from '../../model/atualizacao/processo-atualizacao.model';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';
import { CadastroUsuario } from 'src/app/modules/configuracoes/geral/usuarios/model/usuario.model';
import { UsuariosService } from 'src/app/modules/configuracoes/geral/usuarios/services/usuarios.service';

@Component({
  selector: 'app-visualizacao',
  templateUrl: './visualizacao.component.html',
  styleUrls: ['./visualizacao.component.scss']
})
export class VisualizacaoComponent implements OnInit {

  constructor(
    private processoService: ProcessosJuridicosService,
    private cadastrosService: CadastrosService,
    private authService: AuthenticationService,
    private usersService: UsuariosService,
    private activatedRoute: ActivatedRoute,
    private loadingService: LoadingScreenService,
    private router: Router,
    private snackBar: MatSnackBar,
    private formBuilder: RxFormBuilder,
    private dialog: MatDialog
  ) { }

  codigoProcesso: string;
  processo: Processo;
  evento: NovoEvento;
  eventoFormGroup: FormGroup;
  estadosBrasileiros: EstadoBrasileiro[] = [];
  isAdmin: boolean;
  advogados: CadastroUsuario[];

  @ViewChild('templateRemocaoEvento', { static: true })
  templateRemocaoEvento: TemplateRef<any>;
  eventoRemocao: Evento;

  @ViewChild('inputAnexoEvento', { static: true })
  inputAnexoEvento: ElementRef;
  eventoInclusaoAnexo: Evento;

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(r => {
      this.codigoProcesso = r.get('codigo');
      this.getProcesso();
    });

    this.evento = new NovoEvento();
    this.eventoFormGroup = this.formBuilder.formGroup(this.evento);
    this.cadastrosService.obterEstadosBrasileiros().subscribe(estados => {
      this.estadosBrasileiros = estados;
    });
    this.getAdvogados();
    this.isAdmin = this.authService.getUserInfo().ehAdministrador;
  }

  getProcesso(): void {
    this.loadingService.isLoading.next(true);
    this.processoService.obterProcesso(this.codigoProcesso).subscribe(p => {
      this.processo = p;
      this.loadingService.isLoading.next(false);
    }, error => {
      this.loadingService.isLoading.next(false);
      this.snackBar.open('Erro ao carregar processo', 'Fechar', { duration: 10000 });
      this.router.navigateByUrl('/processos');
    });
  }

  getAdvogados() {
    let advogado: CadastroUsuario;
    this.usersService.getUsuarios().subscribe(usuarios => {
    this.advogados = usuarios.filter(obj => {
        if(obj.numeroOab !== "") {
          advogado = obj;
          return advogado;
        }
      });
    console.log(this.advogados);
    });
  }

  editarProcesso(): void {
    const processoAtualzacao = new ProcessoAtualizacao(
      this.processo.codigo,
      this.processo.cliente.codigo,
      this.processo.codigoAdvogadoResponsavel,
      this.processo.numero,
      this.processo.codigoUF,
      this.processo.titulo,
      this.processo.descricao,
      this.processo.juizResponsavel,
      this.processo.status,
      this.processo.tipoDePapel,
    );

    this.loadingService.isLoading.next(true);

    this.processoService.editarProcesso(processoAtualzacao).subscribe(r => {
      this.loadingService.isLoading.next(false);

      if(r === processoAtualzacao.codigo) {
        this.snackBar.open('Processo atualizado com sucesso', 'Fechar', { duration: 10000 });
        this.getProcesso();
      } else {
        this.snackBar.open('Erro ao atualizar processo', 'Fechar', { duration: 10000 });
      }
    }, error => {
      this.loadingService.isLoading.next(false);
      this.snackBar.open('Erro ao atualizar processo', 'Fechar', { duration: 10000 });
    });
  }

  saveEvent() {
    this.evento.atualizarDataHoraEvento();
    this.evento.codigoProcessoJuridico = this.codigoProcesso;
    this.loadingService.isLoading.next(true);
    this.processoService.adicionarEvento(this.evento).subscribe(e => {
      this.snackBar.open('Evento salvo com sucesso', 'Fechar');
      this.getProcesso();
    }, err => {
      this.snackBar.open('Falha ao salvar evento', 'Fechar');
    }, () => {
      this.dialog.closeAll();
    });
  }

  removerEvento(evento: Evento): void {
    this.eventoRemocao = evento;
    this.dialog.open(this.templateRemocaoEvento);
  }

  cancelarRemocaoEvento(): void {
    this.eventoRemocao = null;
    this.dialog.closeAll();
  }

  confirmarRemocaoEvento(): void {
    this.loadingService.isLoading.next(true);
    this.processoService.removerEvento(this.processo.codigo, this.eventoRemocao.codigo).subscribe(r => {
      this.snackBar.open('Evento removido com sucesso', 'Fechar');
      this.getProcesso();
    }, err => {
      this.snackBar.open('Falha ao remover evento', 'Fechar');
      this.loadingService.isLoading.next(false);
    }, () => {
      this.dialog.closeAll();
    });
  }

  abrirInputDeAnexos(evento: Evento): void {
    this.eventoInclusaoAnexo = evento;
    this.inputAnexoEvento.nativeElement.value = '';
    this.inputAnexoEvento.nativeElement.click();
  }

  salvarAnexoEvento(fileInput: any): void {
    if (fileInput.target.files && fileInput.target.files[0]) {
      this.loadingService.isLoading.next(true);
      const file = fileInput.target.files[0];
      const formData = new FormData();
      formData.append('file', file, file.name);

      this.processoService.adicionarAnexo(this.processo.codigo, this.eventoInclusaoAnexo.codigo, formData).subscribe(r => {
        this.snackBar.open('Anexo salvo com sucesso', 'Fechar');
        this.getProcesso();
      }, err => {
        this.snackBar.open('Falha ao salvar anexo', 'Fechar');
      }, () => {
        this.loadingService.isLoading.next(false);
      });
    }
  }

  baixarAnexo(evento: Evento, anexo: Anexo): void {
    this.loadingService.isLoading.next(true);
    this.processoService.baixarAnexo(this.processo.codigo, evento.codigo, anexo.codigo).subscribe(blob => {
      saveAs(blob, anexo.nomeArquivo);
    }, err => {
      this.snackBar.open('Erro ao baixar anexo', 'Fechar');
    }, () => {
      this.loadingService.isLoading.next(false);
    });
  }

  removerAnexo(evento: Evento, anexo: Anexo): void {
    this.loadingService.isLoading.next(true);
    this.processoService.removerAnexo(this.processo.codigo, evento.codigo, anexo.codigo).subscribe(r => {
      this.snackBar.open('Anexo removido com sucesso.', 'Fechar');
      this.getProcesso();
    }, err => {
      this.snackBar.open('Erro ao remover anexo', 'Fechar');
    }, () => {
      this.loadingService.isLoading.next(false);
    });
  }

  enviarEmailParaCliente(evento: Evento): void {
    this.loadingService.isLoading.next(true);

    this.processoService.notificarCliente(this.processo.codigo, evento.codigo).subscribe(r => {
      this.snackBar.open('Notificação enviada com sucesso', 'Fechar');
    }, err => {
      this.snackBar.open('Erro ao notificar cliente', 'Fechar');
    }, () => {
      this.loadingService.isLoading.next(false);
    });
  }
}
