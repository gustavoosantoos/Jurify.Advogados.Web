import { Component, OnInit } from '@angular/core';
import { SignupService } from 'src/app/shared/services/signup.service';
import { Router } from '@angular/router';
import { NgForm, Validators, FormControl, FormGroupDirective, FormGroup } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { SignUp } from 'src/app/shared/model/signup';
import { RxFormBuilder } from '@rxweb/reactive-form-validators';
import { MatSnackBar } from '@angular/material';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';
import Usuario from 'src/app/shared/model/usuario';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-cadastro-escritorio',
  templateUrl: './cadastro-usuario.component.html',
  styleUrls: ['./cadastro-usuario.component.scss']
})
export class CadastroUsuarioComponent implements OnInit {

  constructor(
    private signupService: SignupService,
    private router: Router,
    private formBuilder: RxFormBuilder,
    private snackBar: MatSnackBar,
    private authService: AuthenticationService
  ) { }

  signupObj: SignUp;
  user: Usuario;
  usuarioFormGroup: FormGroup;
  

  ngOnInit() {
    this.signupObj = new SignUp();
    this.user = this.authService.getUserInfo();
    this.signupObj.escritorio.nomeFantasia = this.user.nomeEscritorio;
    this.usuarioFormGroup = this.formBuilder.formGroup(this.signupObj.usuario);
  }

  changeStep(target): void {
    event.preventDefault();
    document.querySelector('.step.active').classList.remove('active');

    window.setTimeout(function() {
      document.getElementById(target).classList.add('active');
    }, 500);
  }

  signUp(): void {
    if (this.signupService.createNewUser(this.signupObj)) {
      this.router.navigateByUrl('/autenticacao');
    } else {
      this.snackBar.open('Falha no cadastro, verifique os campos e tente novamente.', 'Fechar', {
        duration: 5000
      });
    }
  }

  matcher = new MyErrorStateMatcher();
}
