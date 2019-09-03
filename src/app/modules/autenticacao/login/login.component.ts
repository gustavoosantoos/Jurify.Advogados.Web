import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(
    private authService: AuthenticationService,
    private router: Router,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.redirectLoggedInUser();
  }

  async login(usuario: string, senha: string): Promise<void> {
    document.querySelector('div.submit').classList.add('load');
    if (await this.authService.authenticate(usuario, senha)) {
      this.router.navigateByUrl('/');
    } else {
      document.querySelector('div.submit').classList.remove('load');
      this.snackBar.open('Usuário e/ou senha inválidos', 'Fechar', {
        duration: 5000
      });
    }
  }

  redirectLoggedInUser(): void {
    if (this.authService.isAuthenticated()) {
      this.router.navigateByUrl('/');
    }
  }

}
