import { Component, OnInit } from '@angular/core';
import { MuralService } from '../../services/mural.service';
import { MatSnackBar } from '@angular/material';
import { LoadingScreenService } from 'src/app/shared/services/loading-screen.service';
import { MensagemPublica } from '../../model/mensagem.model';

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
  mensagens: MensagemPublica[];

  ngOnInit() {
    this.loadingService.isLoading.subscribe(r => this.isLoading = r);
    this.getMensagens();
  }

  getMensagens() {
    this.loadingService.isLoading.next(true);

    this.muralService.getMensagens().subscribe(m => {
      this.mensagens = m;
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
  }
}
