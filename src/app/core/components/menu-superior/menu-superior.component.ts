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

  showLogo = false;
  userInfo: Usuario;

  @Output()
  public toggleMenu = new EventEmitter<any>();

  constructor(
    private authService: AuthenticationService
  ) { }

  ngOnInit() {
    this.userInfo = this.authService.getUserInfo();
  }

  toggleSidenav() {
    this.toggleMenu.emit();
    this.showLogo = !this.showLogo;
  }

  sair() {
    this.authService.logout();
  }
}
