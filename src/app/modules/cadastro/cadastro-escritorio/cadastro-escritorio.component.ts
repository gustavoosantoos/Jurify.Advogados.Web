import { Component, OnInit } from '@angular/core';
import { SignupService } from 'src/app/shared/services/signup.service';
import { Router } from '@angular/router';
import { NgForm, Validators, FormControl, FormGroupDirective } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-cadastro-escritorio',
  templateUrl: './cadastro-escritorio.component.html',
  styleUrls: ['./cadastro-escritorio.component.scss']
})
export class CadastroEscritorioComponent implements OnInit {

  constructor(
    private signupService: SignupService,
    private router: Router
  ) { }

  public officeName: string;

  ngOnInit() {
    
  }

  nextStep(target): void {
    event.preventDefault();
    document.querySelector('.step.active').classList.remove('active');

    window.setTimeout(function() {
      document.getElementById(target).classList.add('active');
    }, 500);
  }

  signUp(user: NgForm): void {
    if(this.signupService.createUser(user.value)) {
      this.router.navigateByUrl('/autenticacao');
    }
  }

  nomeFormControl = new FormControl('', [
    Validators.required
  ]);

  sobrenomeFormControl = new FormControl('', [
    Validators.required
  ]);

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email
  ]);

  senhaFormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(6)
  ]);

  matcher = new MyErrorStateMatcher();
}
