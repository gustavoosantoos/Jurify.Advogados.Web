import { Component, OnInit, Input, ElementRef, ViewChild, TemplateRef } from '@angular/core';
import { Location } from '@angular/common';
import ClienteCadastro from '../../model/cadastro/cliente-cadastro.model';
import EnderecoCadastro from '../../model/cadastro/endereco-cadastro.model';
import ClientesService from '../../services/clientes.service';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.scss']
})
export class CadastroComponent {

  @ViewChild('errorsTemplate', { static: false })
  errorTemplate: TemplateRef<any>;
  
  cliente: ClienteCadastro = new ClienteCadastro();
  validationErrors: string[] = [];

  constructor(
    private location: Location,
    private clientesService: ClientesService,
    private snackBar: MatSnackBar) {
  }

  salvarCliente(): void {
    const snackBarOptions = new MatSnackBarConfig();
    snackBarOptions.duration = 100000;

    this.clientesService.cadastrarCliente(this.cliente).subscribe(r => {
      console.log(r);
    }, error => {
      if (error.status == 400) {
        console.log(error);
        this.validationErrors = error.error.map(e => e.message);
        this.snackBar.openFromTemplate(this.errorTemplate, snackBarOptions);
      } else {
        this.snackBar.open('Erro inesperado', 'Fechar', snackBarOptions);
      }
    });
  }

  goBack(): void {
    this.location.back();
  }
}
