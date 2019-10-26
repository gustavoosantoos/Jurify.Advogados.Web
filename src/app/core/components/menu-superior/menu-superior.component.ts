import { Component, OnInit, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';
import Usuario from 'src/app/shared/model/usuario';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu-superior',
  templateUrl: './menu-superior.component.html',
  styleUrls: ['./menu-superior.component.scss']
})
export class MenuSuperiorComponent implements OnInit {
  showLogo: boolean;
  userInfo: Usuario;

  @Output()
  public toggleMenu = new EventEmitter<any>();

  constructor(
    private authService: AuthenticationService,
    private router: Router
  ) { }

  ngOnInit() {
    this.setShowLogo();
    this.userInfo = this.authService.getUserInfo();
  }

  setShowLogo() {
    if(window.innerWidth <= 768) {
      this.showLogo = true;
    } else {
      this.showLogo = false;
    }
  }

  toggleSidenav() {
    this.toggleMenu.emit();

    if(window.innerWidth <= 768) {
      this.showLogo = true;
    } else {
      this.showLogo = !this.showLogo;
    }
  }

  editarUsuario(): void {
    const codigoUsuario = this.authService.getUserInfo().codigoUsuario;
    this.router.navigateByUrl('/usuarios/cadastro-usuario/' + codigoUsuario);
  }

  sair() {
    this.authService.logout();
  }
}
