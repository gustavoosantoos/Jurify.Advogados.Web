import { Component, OnInit } from '@angular/core';
import { SignupService } from 'src/app/shared/services/signup.service';
import { Router } from '@angular/router';
import { NgForm, Validators, FormControl, FormGroupDirective, FormGroup } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { SignUp } from 'src/app/shared/model/signup';
import { RxFormBuilder } from '@rxweb/reactive-form-validators';

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
    private router: Router,
    private formBuilder: RxFormBuilder
  ) { }

  signupObj: SignUp;
  signUpFormGroup: FormGroup;
  

  ngOnInit() {
    this.signupObj = new SignUp();
    this.signUpFormGroup = this.formBuilder.formGroup(this.signupObj);
    console.log(this.signUpFormGroup);
  }

  nextStep(target): void {
    event.preventDefault();
    document.querySelector('.step.active').classList.remove('active');

    window.setTimeout(function() {
      document.getElementById(target).classList.add('active');
    }, 500);
  }

  signUp(): void {
    if(this.signupService.createUser(this.signupObj)) {
      this.router.navigateByUrl('/autenticacao');
    }
  }

  matcher = new MyErrorStateMatcher();
}
