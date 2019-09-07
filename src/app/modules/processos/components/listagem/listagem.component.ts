import { Component, OnInit } from '@angular/core';
import { ProcessosJuridicosService } from '../../services/processos-juridicos.service';
import { LoadingScreenService } from 'src/app/shared/services/loading-screen.service';
import { MatSnackBar, MatTableDataSource } from '@angular/material';
import ProcessoPreview from '../model/listagem/processo-preview.model';

@Component({
  selector: 'app-listagem',
  templateUrl: './listagem.component.html',
  styleUrls: ['./listagem.component.scss']
})
export class ListagemComponent implements OnInit {
  isLoading = false;

  processos: ProcessoPreview[] = [];
  dataSource: MatTableDataSource<ProcessoPreview> = new MatTableDataSource([]);
  displayedColumns: string[] = ['titulo', 'numero', 'uf', 'criacao', 'responsavel', 'acoes'];
  value = '';

  processoRemocao: ProcessoPreview;

  constructor(
    private processosService: ProcessosJuridicosService,
    private loadingService: LoadingScreenService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.loadingService.isLoading.subscribe(r => this.isLoading = r);
    this.getProcessos();
  }

  getProcessos(): void {
    this.loadingService.isLoading.next(true);
    this.processosService.obterProcessos().subscribe(processos => {
      this.processos = processos;
      this.dataSource = new MatTableDataSource(this.processos);
    }, err => {
      this.snackBar.open('Erro ao obter processos', 'Fechar');
    }, () => {
      this.loadingService.isLoading.next(false);
    });
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    filterValue = filterValue.replace('/', '-');

    this.dataSource.filter = filterValue;
  }

  removerProcesso(processo: ProcessoPreview): void {

  }

  cancelarRemocaoProcesso(): void {

  }

  confirmarRemocaoProcesso(): void {

  }
}
