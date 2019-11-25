import { Component, OnInit } from '@angular/core';
import { MuralService } from '../../services/mural.service';
import { MatSnackBar } from '@angular/material';
import { LoadingScreenService } from 'src/app/shared/services/loading-screen.service';
import { MensagemPublica } from '../../model/mensagem.model';
import { Resultado } from '../../model/result.model';

@Component({
  selector: 'app-listagem',
  templateUrl: './listagem.component.html',
  styleUrls: ['./listagem.component.scss']
})
export class ListagemComponent implements OnInit {

  constructor(
    private muralService: MuralService,
    private snackBar: MatSnackBar,
    private loadingService: LoadingScreenService
  ) { }

  isLoading = false;
  mensagens: Resultado;
  mural: MensagemPublica[];
  marcadas: MensagemPublica[];

  ngOnInit() {
    this.loadingService.isLoading.subscribe(r => this.isLoading = r);
    this.getMensagens();
  }

  getMensagens() {
    this.loadingService.isLoading.next(true);

    this.muralService.getMensagens().subscribe(m => {
      this.mensagens = m;
      this.mural = this.mensagens.mensagensMural;
      this.marcadas = this.mensagens.mensagensEscritorio;
    },  err => {
      // Captura e exibe feedback de erro
      this.snackBar.open('Erro ao carregar dados', 'Fechar');
    }, () => {
      // Em qualquer um dos dois casos acima, tira a tela de loading
      this.loadingService.isLoading.next(false);
    });
  }

  getMensagensEscritorio() {}

  marcarInteresse(codigo) {
    this.muralService.marcarInteresse(codigo).subscribe(r => {
      this.snackBar.open('Mensagem marcada com sucesso, confira a aba de Mensagens Marcadas', 'Fechar');
    }, err => {
      this.snackBar.open('Erro ao marcar a mensagem', 'Fechar');
    })
  }

  desmarcarMensagem(codigo) {
    this.muralService.reativarMensagem(codigo).subscribe(r => {
      this.snackBar.open('Mensagem desmarcada! Ela retornará para a lista de mensagens públicas', 'Fechar');
    }, err => {
      this.snackBar.open('Erro ao desmarcar a mensagem', 'Fechar');
    })
  }
}
