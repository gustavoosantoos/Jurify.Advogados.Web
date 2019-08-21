import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cadastro-escritorio',
  templateUrl: './cadastro-escritorio.component.html',
  styleUrls: ['./cadastro-escritorio.component.scss']
})
export class CadastroEscritorioComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    document.getElementById('submitOfficeForm').addEventListener('click', function(){
      document.getElementById('officeForm').submit();
    });
  }

  nextStep(target): void {
    event.preventDefault();
    document.querySelector('.step.active').classList.remove('active');

    window.setTimeout(function() {
      document.getElementById(target).classList.add('active');
    }, 500);
  }

  createOffice(form): void {
    this.nextStep('credentials');
  }

}
