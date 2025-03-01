import { AuthenticationService } from './../../../../shared/services/authentication.service';
import { saveAs } from 'file-saver';
import { Component, OnInit, ViewEncapsulation, TemplateRef, ViewChild } from '@angular/core';
import { ClientesService } from '../../services/clientes.service';
import { ActivatedRoute, Router } from '@angular/router';
import Cliente from '../../model/visualizacao/cliente.model';
import { MatSnackBar, MatSnackBarConfig, MatTableDataSource, MatDialog } from '@angular/material';
import { LoadingScreenService } from 'src/app/shared/services/loading-screen.service';
import ClienteAtualizacao from '../../model/atualizacao/cliente-atualizacao.model';
import Endereco from '../../model/visualizacao/endereco.model';
import Anexo from '../../model/visualizacao/anexo.model';
import Usuario from 'src/app/shared/model/usuario';
import { Processo } from '../../model/visualizacao/processos.model';

@Component({
  selector: 'app-visualizacao',
  templateUrl: './visualizacao.component.html',
  styleUrls: ['./visualizacao.component.scss']
})
export class VisualizacaoComponent implements OnInit {
  public usuario: Usuario;
  public cliente: Cliente;
  public codigoCliente: string;
  public enderecoRemocao: Endereco;

  public enderecosDataSource: MatTableDataSource<Endereco> = new MatTableDataSource<Endereco>([]);
  public enderecosFields = ['rua', 'cidade', 'estado', 'tipo', 'acoes'];

  public processosDataSource: MatTableDataSource<Processo> = new MatTableDataSource<Processo>([]);
  public processosFields = ['numero', 'titulo', 'tipoDePapel', 'status', 'acoes'];

  @ViewChild('templateRemocaoEndereco', { static: true })
  templateRemocaoEndereco: TemplateRef<any>;

  constructor(
    private clientesService: ClientesService,
    private activatedRoute: ActivatedRoute,
    private loadingService: LoadingScreenService,
    private router: Router,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    private authService: AuthenticationService
  ) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(r => {
      this.codigoCliente = r.get('codigo');
      this.getCliente();
    });

    this.usuario = this.authService.getUserInfo();
  }

  getCliente() {
    this.loadingService.isLoading.next(true);
    this.clientesService.getCliente(this.codigoCliente).subscribe(c => {
      this.cliente = c;
      this.cliente.enderecos.forEach(e => {
        switch (e.tipo) {
          case 0:
            e.tipoEndereco = 'Residencial';
            break;
          case 1:
            e.tipoEndereco = 'Comercial';
            break;
          case 2:
            e.tipoEndereco = 'Outro';
            break;
          default:
            e.tipoEndereco = 'Desconhecido';
            break;
        }
      });

      this.enderecosDataSource = new MatTableDataSource<Endereco>(this.cliente.enderecos);
      this.processosDataSource = new MatTableDataSource<Processo>(this.cliente.processosJuridicos);
      this.loadingService.isLoading.next(false);
    }, error => {
      this.loadingService.isLoading.next(false);
      this.snackBar.open('Erro ao carregar cliente', 'Fechar', { duration: 10000 });
      this.router.navigateByUrl('/clientes');
    });
  }

  atualizarDadosBasicos() {
    const clienteAtualizacao = new ClienteAtualizacao(
      this.codigoCliente,
      this.cliente.nome,
      this.cliente.sobrenome,
      this.cliente.rg,
      this.cliente.cpf,
      this.cliente.email,
      this.cliente.dataNascimento
    );

    this.loadingService.isLoading.next(true);

    this.clientesService.atualizarDadosBasicosCliente(clienteAtualizacao).subscribe(r => {
      this.loadingService.isLoading.next(false);

      if (r === clienteAtualizacao.codigo) {
        this.snackBar.open('Cliente atualizado com sucesso', 'Fechar', { duration: 10000 });
        this.getCliente();
      } else {
        this.snackBar.open('Erro ao atualizar cliente', 'Fechar', { duration: 10000 });
      }
    }, error => {
      this.loadingService.isLoading.next(false);
      this.snackBar.open('Erro ao atualizar cliente', 'Fechar', { duration: 10000 });
    });
  }

  salvarNovoAnexoCliente(fileInput: any) {
    if (fileInput.target.files && fileInput.target.files[0]) {
      this.loadingService.isLoading.next(true);
      const file = fileInput.target.files[0];
      const formData = new FormData();
      formData.append('file', file, file.name);

      this.clientesService.adicionarAnexo(this.cliente.codigo, formData).subscribe(r => {
        this.snackBar.open('Anexo salvo com sucesso', 'Fechar');
        this.getCliente();
      }, err => {
        this.snackBar.open('Falha ao salvar anexo', 'Fechar');
      }, () => {
        this.loadingService.isLoading.next(false);
      });
    }
  }

  baixarAnexo(anexo: Anexo) {
    this.loadingService.isLoading.next(true);
    this.clientesService.baixarAnexo(this.cliente.codigo, anexo.codigo).subscribe(blob => {
      saveAs(blob, anexo.nomeArquivo);
    }, err => {
      this.snackBar.open('Erro ao baixar anexo', 'Fechar');
    }, () => {
      this.loadingService.isLoading.next(false);
    });
  }

  removerAnexo(anexo: Anexo) {
    this.loadingService.isLoading.next(true);
    this.clientesService.removerAnexo(this.cliente.codigo, anexo.codigo).subscribe(r => {
      this.snackBar.open('Anexo removido com sucesso.', 'Fechar');
      this.getCliente();
    }, err => {
      this.snackBar.open('Erro ao remover anexo', 'Fechar');
    }, () => {
      this.loadingService.isLoading.next(false);
    });
  }

  mostrarDetalhesEndereco(endereco: Endereco) {

  }

  mostrarDetalhesProcesso(processo: Processo): void {
    this.router.navigateByUrl(`/processos/cadastro/${processo.codigo}`);
  }

  removerEndereco(endereco: Endereco) {
    this.enderecoRemocao = endereco;
    this.dialog.open(this.templateRemocaoEndereco);
  }

  cancelarRemocaoEndereco(): void {
    this.enderecoRemocao = null;
    this.dialog.closeAll();
  }

  confirmarRemocaoEndereco(): void {
    this.loadingService.isLoading.next(true);

    this.clientesService.removerEndereco(this.cliente.codigo, this.enderecoRemocao.codigo).subscribe(r => {
      this.getCliente();
    }, error => {
      this.snackBar.open('Erro ao remover endereço', 'Fechar', { duration: 10000 });
    }, () => {
      this.enderecoRemocao = null;
      this.loadingService.isLoading.next(false);
    });
  }
}
