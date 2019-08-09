import { Component, OnInit } from '@angular/core';
import { Router, NavigationStart } from '@angular/router'
import { AuthenticationService } from './shared/services/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'jurify-web';
  currentRoute: string;
  authenticated: Boolean;
  
  constructor(
    private router: Router,
    private authService: AuthenticationService  
  ) { }
  
  ngOnInit(): void {
    this.authService.authenticatedState.subscribe(r => {
      this.authenticated = r;
    });
  }
}
