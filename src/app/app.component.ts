import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, NavigationStart } from '@angular/router'
import { AuthenticationService } from './shared/services/authentication.service';
import { MatSidenav } from '@angular/material';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'jurify-web';
  currentRoute: string;
  authenticated: Boolean;

  @ViewChild('sidenav', { static: false }) sidenav: MatSidenav;
  
  constructor(
    private router: Router,
    private authService: AuthenticationService  
  ) { }
  
  ngOnInit(): void {
    this.authenticated = false;
    this.authService.authenticatedState.subscribe(r => {
      this.authenticated = r;
    });
  }

  toggleSidenav(){
    this.sidenav.toggle();
  }
}
