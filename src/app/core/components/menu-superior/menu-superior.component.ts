import { Component, OnInit, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';
import Usuario from 'src/app/shared/model/usuario';

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
    private authService: AuthenticationService
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

  sair() {
    this.authService.logout();
  }
}
