import { Component, OnInit, Input } from '@angular/core';
import { Location, formatDate } from '@angular/common';
import { Cliente } from 'src/app/shared/model/cliente';
import { ActivatedRoute } from '@angular/router';
import { ClientesService } from 'src/app/shared/services/clientes.service';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.scss']
})
export class CadastroComponent implements OnInit {

  @Input() cliente: Cliente;
  codigo: string;

  constructor(
    private route: ActivatedRoute,
    private clienteService: ClientesService,
    private location: Location
  ) {
    this.route.params.subscribe( params => this.codigo = params['codigo']);
   }

  ngOnInit() {
    this.getCliente(this.codigo);
  }

  getCliente(codigo): void {
    this.clienteService.getCliente(codigo)
      .subscribe(cliente => this.cliente = cliente);
  }

  goBack(): void {
    this.location.back();
  }

}
