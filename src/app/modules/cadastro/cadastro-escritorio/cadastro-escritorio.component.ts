import { Component, OnInit } from '@angular/core';
import { SignupService } from 'src/app/shared/services/signup.service';
import { Router } from '@angular/router';
import { NgForm, Validators, FormControl } from '@angular/forms';

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

  createOffice(form): void {
    event.preventDefault();
    this.nextStep('credentials');
    this.officeName = form.value.nomefant;
    console.log(this.officeName);
    console.log(form.value);
  }

  createUser(user: NgForm): void {
    user.value.officeName = this.officeName;
    console.log(this.officeName);
    console.log(user.value);
    if(this.signupService.createUser(user.value)) {
      this.router.navigateByUrl('/autenticacao');
    }
  }

  inputFormControl = new FormControl('', [
    Validators.required
  ]);

}
