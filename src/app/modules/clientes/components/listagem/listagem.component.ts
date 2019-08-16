import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { ClientesService } from 'src/app/modules/clientes/services/clientes.service';
import { LoadingScreenService } from 'src/app/shared/services/loading-screen.service';
import ClientePreview from '../../model/listagem/cliente-preview.model';
import { filter } from 'minimatch';

@Component({
  selector: 'app-listagem',
  templateUrl: './listagem.component.html',
  styleUrls: ['./listagem.component.scss']
})
export class ListagemComponent implements OnInit {

  isLoading = false;
  clientes: ClientePreview[];
  dataSource: MatTableDataSource<ClientePreview> = new MatTableDataSource([]);
  displayedColumns: string[] = ['nome', 'email', 'nascimento', 'acoes'];
  value: string = '';

  constructor(
    private clienteService: ClientesService,
    private loadingService: LoadingScreenService
  ) { }


  ngOnInit() {
    this.loadingService.isLoading.subscribe(r => this.isLoading = r);
    this.loadingService.isLoading.next(true);
    this.getClientes();
  }

  getClientes(): void {
    this.clienteService.getClientes()
      .subscribe(clientes => { 
        this.clientes = clientes;
        this.dataSource = new MatTableDataSource(this.clientes);
        this.loadingService.isLoading.next(false);
      }, error => {
        this.clientes = [];
        this.dataSource = new MatTableDataSource(this.clientes);
        this.loadingService.isLoading.next(false);
      });
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    filterValue = filterValue.replace('/', '-');

    this.dataSource.filter = filterValue;
  }
}
