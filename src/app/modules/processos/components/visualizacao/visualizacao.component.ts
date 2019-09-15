import { Component, OnInit } from '@angular/core';
import { ProcessosJuridicosService } from '../../services/processos-juridicos.service';
import { LoadingScreenService } from 'src/app/shared/services/loading-screen.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { FormGroup } from '@angular/forms';
import { RxFormBuilder } from '@rxweb/reactive-form-validators';
import { NovoEvento } from '../../model/visualizacao/novo-evento.model';
import { Processo } from '../../model/visualizacao/processo.model';

@Component({
  selector: 'app-visualizacao',
  templateUrl: './visualizacao.component.html',
  styleUrls: ['./visualizacao.component.scss']
})
export class VisualizacaoComponent implements OnInit {

  constructor(
    private processoService: ProcessosJuridicosService,
    private activatedRoute: ActivatedRoute,
    private loadingService: LoadingScreenService,
    private router: Router,
    private snackBar: MatSnackBar,
    private formBuilder: RxFormBuilder
  ) { }

  codigoProcesso: string;
  processo: Processo;
  evento: NovoEvento;
  eventoFormGroup: FormGroup;

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(r => {
      this.codigoProcesso = r.get('codigo');
      this.getProcesso();
    });

    this.evento = new NovoEvento();
    this.eventoFormGroup = this.formBuilder.formGroup(this.evento);
  }

  getProcesso(): void {
    this.loadingService.isLoading.next(true);
    this.processoService.obterProcesso(this.codigoProcesso).subscribe(p => {
      this.processo = p;
      this.loadingService.isLoading.next(false);
    }, error => {
      this.loadingService.isLoading.next(false);
      this.snackBar.open('Erro ao carregar cliente', 'Fechar', { duration: 10000 });
      this.router.navigateByUrl('/clientes');
    });
  }

  saveEvent() {
    this.evento.atualizarDataHoraEvento();
    this.evento.codigoProcessoJuridico = this.codigoProcesso;
    this.loadingService.isLoading.next(true);
    this.processoService.adicionarEvento(this.evento).subscribe(e => {
      this.snackBar.open('Evento salvo com sucesso', 'Fechar');
      this.getProcesso();
    }, err => {
      this.snackBar.open('Falha ao salvar evento', 'Fechar');
    }, () => {
      this.loadingService.isLoading.next(false);
    });
  }
}
