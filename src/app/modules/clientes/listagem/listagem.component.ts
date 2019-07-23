import { Component, OnInit } from '@angular/core';
import { ClientesService } from 'src/app/shared/services/clientes.service';
import { Cliente } from 'src/app/shared/model/cliente';

@Component({
  selector: 'app-listagem',
  templateUrl: './listagem.component.html',
  styleUrls: ['./listagem.component.scss']
})
export class ListagemComponent implements OnInit {

  clientes: Cliente[];

  constructor(
    private clienteService: ClientesService
  ) { }

  value: string = '';

  ngOnInit() {
    this.getClientes();
  }

  getClientes(): void {
    this.clienteService.getClientes()
      .subscribe(clientes => this.clientes = clientes);
  }

}
