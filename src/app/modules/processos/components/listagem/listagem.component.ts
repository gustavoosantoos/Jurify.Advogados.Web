import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { ProcessosJuridicosService } from '../../services/processos-juridicos.service';
import { LoadingScreenService } from 'src/app/shared/services/loading-screen.service';
import { MatSnackBar, MatTableDataSource, MatDialog } from '@angular/material';
import ProcessoPreview from '../../model/listagem/processo-preview.model';

@Component({
  selector: 'app-listagem',
  templateUrl: './listagem.component.html',
  styleUrls: ['./listagem.component.scss']
})
export class ListagemComponent implements OnInit {
  isLoading = false;

  processos: ProcessoPreview[] = [];
  processosAtivos = 0;
  dataSource: MatTableDataSource<ProcessoPreview> = new MatTableDataSource([]);
  displayedColumns: string[] = ['titulo', 'numero', 'uf', 'criacao', 'responsavel', 'status', 'acoes'];
  value = '';

  processoRemocao: ProcessoPreview;

  @ViewChild('templateRemocaoProcesso', { static: true })
  templateRemocaoProcesso: TemplateRef<any>;

  constructor(
    private processosService: ProcessosJuridicosService,
    private loadingService: LoadingScreenService,
    private snackBar: MatSnackBar,
    private confirmDialog: MatDialog
  ) { }

  ngOnInit() {
    this.loadingService.isLoading.subscribe(r => this.isLoading = r);
    this.getProcessos();
  }

  getProcessos(): void {
    this.loadingService.isLoading.next(true);
    this.processosService.obterProcessos().subscribe(processos => {
      this.processos = processos;
      processos.forEach(processo => {
        switch(processo.status) {
          case 0:
            processo.statusT = 'Aberto';
            break;
          case 1:
            processo.statusT = 'Aguardando Distribuição';
            break;
          case 2:
            processo.statusT = 'Aguardando Citação';
            break;
          case 3:
            processo.statusT = 'Aguardando Cumprimento de Carta Precatória';
            break;
          case 4:
            processo.statusT = 'Aguardando Julgamento de Embargo de Terceiros';
            break;
          case 5:
            processo.statusT = 'Aguardando Sentença';
            break;
          case 6:
            processo.statusT = 'Aguardando Trânsito em Julgado';
            break;
          case 7:
            processo.statusT = 'Aguardando Intimação da Sentença';
            break;
          case 8:
            processo.statusT = 'Aguardando Julgamento de Apelação';
            break;
          case 9:
            processo.statusT = 'Aguardando Julgamento de Recurso Especial';
            break;
          case 10:
            processo.statusT = 'Cumprimento da Sentença';
            break;
          case 11:
            processo.statusT = 'Aguardando Baixa do Distribuidor';
            break;
          case 12:
            processo.statusT = 'Finalizado';
            break;
          default:
            processo.statusT = 'Desconhecido';
            break;
        }

        if(processo.status !== 0) {
          this.processosAtivos++;
        }
      });
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
    this.processoRemocao = processo;
    this.confirmDialog.open(this.templateRemocaoProcesso);
  }

  cancelarRemocaoProcesso(): void {
    this.processoRemocao = null;
    this.confirmDialog.closeAll();
  }

  confirmarRemocaoProcesso(): void {
    this.loadingService.isLoading.next(true);

    this.processosService.removerProcesso(this.processoRemocao.codigo).subscribe(r => {
      this.snackBar.open('Processo removido com sucesso', 'Fechar');
      this.getProcessos();
    }, err => {
      this.snackBar.open('Falha ao remover processo', 'Fechar');
    }, () => {
      this.loadingService.isLoading.next(false);
      this.processoRemocao = null;
    });
  }
}
