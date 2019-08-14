import { Component, OnInit, Input } from '@angular/core';
import { Location } from '@angular/common';
import ClienteCadastro from '../../model/cadastro/cliente-cadastro.model';
import EnderecoCadastro from '../../model/cadastro/endereco-cadastro.model';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.scss']
})
export class CadastroComponent {

  cliente: ClienteCadastro = new ClienteCadastro();

  constructor(private location: Location) {
  }

  goBack(): void {
    this.location.back();
  }
}
