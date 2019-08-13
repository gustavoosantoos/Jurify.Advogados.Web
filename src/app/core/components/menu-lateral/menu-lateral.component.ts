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
}
