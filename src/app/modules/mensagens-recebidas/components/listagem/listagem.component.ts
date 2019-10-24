import { ListagemMensagens } from './../../models/listagem-mensagens.model';
import { MensagensService } from './../../services/mensagens.service';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { LoadingScreenService } from 'src/app/shared/services/loading-screen.service';
import { MatSnackBar, MatTableDataSource, MatDialog } from '@angular/material';
import { Mensagem } from '../../models/mensagem.model';

@Component({
  selector: 'app-listagem',
  templateUrl: './listagem.component.html',
  styleUrls: ['./listagem.component.scss']
})
export class ListagemComponent implements OnInit {
  public isLoading: boolean;
  public dados: ListagemMensagens;
  public dataSource: MatTableDataSource<Mensagem> = new MatTableDataSource<Mensagem>([]);
  public displayedColumns: string[] = ['nome', 'cpf', 'contato', 'texto', 'acoes'];
  public mensagemAtual: Mensagem;
  public mensagemRemocao: Mensagem;

  @ViewChild('templateMensagem', { static: true })
  templateMensagem: TemplateRef<any>;

  @ViewChild('templateRemocaoMensagem', { static: true })
  templateRemocaoMensagem: TemplateRef<any>;

  constructor(
    private mensagensService: MensagensService,
    private loadingService: LoadingScreenService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    this.loadingService.isLoading.subscribe(r => this.isLoading = r);
    this.obterMensagens();
  }

  obterMensagens(): void {
    this.loadingService.isLoading.next(true);
    this.mensagensService.obterMensagens().subscribe(r => {
      this.dados = r;
      this.dataSource = new MatTableDataSource<Mensagem>(this.dados.mensagens);
    }, err => {
      this.snackBar.open('Falha ao carregar mensagens', 'Fechar', { duration: 5000 });
    }, () => {
      this.loadingService.isLoading.next(false);
    });
  }

  mostrarTextoMensagem(mensagem: Mensagem): void {
    this.mensagemAtual = mensagem;
    this.dialog.open(this.templateMensagem);
  }

  fecharTextoMensagem(): void {
    this.mensagemAtual = null;
    this.dialog.closeAll();
  }

  cadastrarCliente(mensagem: Mensagem): void {
    this.loadingService.isLoading.next(true);
    this.mensagensService.cadastrarCliente(mensagem.codigo).subscribe(r => {
      this.snackBar.open(`Cliente [${mensagem.nomeCliente.toUpperCase()}] cadastrado com sucesso`, 'Fechar');
      this.obterMensagens();
    }, err => {
      this.snackBar.open('Falha ao cadastrar cliente', 'Fechar', { duration: 5000 });
      this.loadingService.isLoading.next(false);
    });
  }

  removerMensagem(mensagem: Mensagem): void {
    this.mensagemRemocao = mensagem;
    this.dialog.open(this.templateRemocaoMensagem);
  }

  cancelarRemocao(): void {
    this.mensagemRemocao = null;
    this.dialog.closeAll();
  }

  confirmarRemocao(): void {
    this.loadingService.isLoading.next(true);
    this.mensagensService.removerMensagem(this.mensagemRemocao.codigo).subscribe(r => {
      this.snackBar.open('Mensagem removida com sucesso', 'Fechar', { duration: 5000 });
      this.obterMensagens();
    }, err => {
      this.snackBar.open('Falha ao remover mensagem', 'Fechar', { duration: 5000 });
      this.loadingService.isLoading.next(true);
    });
  }
}
