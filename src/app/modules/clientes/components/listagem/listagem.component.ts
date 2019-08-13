import { Component, OnInit } from '@angular/core';
import { ClientesService } from 'src/app/modules/clientes/services/clientes.service';
import { Cliente } from '../../model/cliente';
import { MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-listagem',
  templateUrl: './listagem.component.html',
  styleUrls: ['./listagem.component.scss']
})
export class ListagemComponent implements OnInit {

  isLoading = false;
  clientes: Cliente[];
  displayedColumns: string[] = ['nome', 'email', 'nascimento', 'acoes'];
  dataSource: MatTableDataSource<Cliente>;

  constructor(
    private clienteService: ClientesService
  ) { }

  value: string = '';

  ngOnInit() {
    this.getClientes();
  }

  getClientes(): void {
    this.isLoading = true;
    this.clienteService.getClientes()
      .subscribe(clientes => { 
        this.clientes = clientes;
        this.dataSource = new MatTableDataSource(this.clientes);
        this.isLoading = false;
      }, error => {
        this.clientes = [];
        this.dataSource = new MatTableDataSource(this.clientes);
        this.isLoading = false;
      });
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    
    this.dataSource.filter = filterValue;
  }
}
