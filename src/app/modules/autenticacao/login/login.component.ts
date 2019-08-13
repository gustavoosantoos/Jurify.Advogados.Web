import { Component, OnInit, ViewEncapsulation } from '@angular/core';
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

  async login(username: string, password: string): Promise<void> {
    document.querySelector('div.submit').classList.add('load');
    if (await this.authService.authenticate(username, password)) {
      this.router.navigateByUrl('/');
    }
  }

  redirectLoggedInUser(): void {
    if (this.authService.isAuthenticated()) {
      this.router.navigateByUrl('/');
    }
  }

}
