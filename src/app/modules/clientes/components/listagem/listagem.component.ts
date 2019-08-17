import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatTableDataSource, MatDialog, MatSnackBar } from '@angular/material';
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
  clienteRemocao: ClientePreview;
  dataSource: MatTableDataSource<ClientePreview> = new MatTableDataSource([]);
  displayedColumns: string[] = ['nome', 'email', 'nascimento', 'acoes'];
  value: string = '';

  @ViewChild('templateRemocaoCliente', { static: true })
  templateRemocaoCliente: TemplateRef<any>;
  
  constructor(
    private clienteService: ClientesService,
    private loadingService: LoadingScreenService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) { }


  ngOnInit() {
    this.loadingService.isLoading.subscribe(r => this.isLoading = r);
    this.getClientes();
  }

  getClientes(): void {
    this.loadingService.isLoading.next(true);
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

  removerCliente(cliente: ClientePreview) {
    this.clienteRemocao = cliente;
    this.dialog.open(this.templateRemocaoCliente);
  }

  cancelarRemocao() {
    this.clienteRemocao = null;
    this.dialog.closeAll();
  }

  confirmarRemocao() {
    this.loadingService.isLoading.next(true);
    this.dialog.closeAll();

    this.clienteService.removerCliente(this.clienteRemocao.codigo).subscribe(r => {
      this.clienteRemocao = null;
      this.loadingService.isLoading.next(false);
      this.getClientes();
    }, error => {
      this.clienteRemocao = null;
      this.loadingService.isLoading.next(false);
      this.snackBar.open('Erro ao remover cliente', 'Fechar', { 
        duration: 10000
      })
    });
  }
}
