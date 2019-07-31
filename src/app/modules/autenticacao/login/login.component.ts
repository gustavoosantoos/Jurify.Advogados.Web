import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(
    private authService: AuthenticationService,
    private router: Router
  ) { }

  ngOnInit() {
    this.redirectLoggedInUser();
  }

  login(username: string, password: string): void {
    if (this.authService.authenticate(username, password)) {
      document.querySelector('div.submit').classList.add('load');
      this.router.navigateByUrl('/');
    }
  }

  redirectLoggedInUser(): void {
    if (this.authService.isAuthenticated()) {
      this.router.navigateByUrl('/');
    }
  }

}
