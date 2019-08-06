import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';

@Component({
  selector: 'app-menu-lateral',
  templateUrl: './menu-lateral.component.html',
  styleUrls: ['./menu-lateral.component.scss']
})
export class MenuLateralComponent implements OnInit {
  isAuthenticated: boolean;

  constructor(
    private authService: AuthenticationService
  ) { }

  ngOnInit() {
    this.isAuthenticated = this.authService.isAuthenticated();
  }

  toggleMenu(): void {
    const menu = document.getElementById('sidemenu');
    const button = document.getElementsByClassName('togglemenu');
    console.log(button);

    if (button[0].classList.contains('open')) {
      button[0].classList.remove('open');
      button[0].classList.add('closed');
      menu.style.marginLeft = '-7%';
    } else if (button[0].classList.contains('closed')) {
      button[0].classList.remove('closed');
      button[0].classList.add('open');
      menu.style.marginLeft = '0';
    }
  }
}
