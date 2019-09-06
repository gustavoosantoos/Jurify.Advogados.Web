import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ClientesService } from '../../services/clientes.service';
import { ActivatedRoute, Router } from '@angular/router';
import Cliente from '../../model/visualizacao/cliente.model';
import { MatSnackBar, MatSnackBarConfig, MatTableDataSource } from '@angular/material';
import { LoadingScreenService } from 'src/app/shared/services/loading-screen.service';
import ClienteAtualizacao from '../../model/atualizacao/cliente-atualizacao.model';
import Endereco from '../../model/visualizacao/endereco.model';
import Anexo from '../../model/visualizacao/anexo.model';

@Component({
  selector: 'app-visualizacao',
  templateUrl: './visualizacao.component.html',
  styleUrls: ['./visualizacao.component.scss']
})
export class VisualizacaoComponent implements OnInit {
  public cliente: Cliente;
  public codigoCliente: string;

  public enderecosDataSource: MatTableDataSource<Endereco> = new MatTableDataSource<Endereco>([]);
  public enderecosFields = ['rua', 'cidade', 'estado', 'tipo', 'acoes'];

  constructor(
    private clientesService: ClientesService,
    private activatedRoute: ActivatedRoute,
    private loadingService: LoadingScreenService,
    private router: Router,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(r => {
      this.codigoCliente = r.get('codigo');
      this.getCliente();
    });
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
    this.clientesService.baixarAnexo(this.cliente.codigo, anexo.codigo, anexo.nomeArquivo);
    this.loadingService.isLoading.next(false);
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

  removerEndereco(endereco: Endereco) {

  }
}
