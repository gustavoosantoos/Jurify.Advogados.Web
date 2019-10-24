import { MensagensService } from './../../../modules/mensagens-recebidas/services/mensagens.service';
import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-menu-lateral',
  templateUrl: './menu-lateral.component.html',
  styleUrls: ['./menu-lateral.component.scss']
})
export class MenuLateralComponent implements OnInit {
  isAuthenticated: boolean;
  isAdmin: boolean;
  quantidadeMensagensPendentes: number;

  constructor(
    private authService: AuthenticationService,
    private snackBar: MatSnackBar,
    private mensagensService: MensagensService
  ) { }

  ngOnInit() {
    this.isAuthenticated = this.authService.isAuthenticated();

    if (this.isAuthenticated) {
      this.isAdmin = this.authService.getUserInfo().ehAdministrador;
      this.mensagensService.obterMensagens().subscribe(r => {
        this.quantidadeMensagensPendentes = r.mensagensPendentes;
      });
    }
  }

  mostrarAlertaAdministrador(): void {
    this.snackBar.open('Você não possui a permissão para acessar essa funcionalidade.', 'Fechar');
  }
}
