import { Component, ViewChild, TemplateRef } from '@angular/core';
import { Location } from '@angular/common';
import { ClientesService } from '../../services/clientes.service';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material';
import ClienteCadastro from '../../model/cadastro/cliente-cadastro.model';
import { Router } from '@angular/router';

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
    private snackBar: MatSnackBar,
    private router: Router) {
  }

  salvarCliente(): void {
    if (Object.values(this.cliente.endereco).every(v => v == null)) {
      this.cliente.enderecos = [];
    }

    const snackBarOptions = new MatSnackBarConfig();
    snackBarOptions.duration = 10000;

    this.clientesService.cadastrarCliente(this.cliente).subscribe(r => {
      this.snackBar.open('Cliente salvo com sucesso', 'Fechar', snackBarOptions);
      this.router.navigateByUrl('/clientes');
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

  getPickerMaxDate(): Date {
    return new Date(Date.now());
  }

  goBack(): void {
    this.location.back();
  }
}
