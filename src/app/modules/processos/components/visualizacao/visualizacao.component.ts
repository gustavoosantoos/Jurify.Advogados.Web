import { Component, OnInit } from '@angular/core';
import { ProcessosJuridicosService } from '../../services/processos-juridicos.service';
import { NovoProcesso } from '../../model/cadastro/novo-processo.model';
import { LoadingScreenService } from 'src/app/shared/services/loading-screen.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { Evento } from '../../model/visualizacao/evento.model';
import { FormGroup, FormBuilder } from '@angular/forms';
import { RxFormBuilder } from '@rxweb/reactive-form-validators';

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
  processo: NovoProcesso;
  evento: Evento;
  eventoFormGroup: FormGroup;

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(r => {
      this.codigoProcesso = r.get('codigo');
      this.getProcesso();
    });
    this.evento = new Evento();
    this.eventoFormGroup = this.formBuilder.formGroup(this.evento);
  }

  getProcesso(): void {
    this.loadingService.isLoading.next(true);
    this.processoService.obterProcesso(this.codigoProcesso).subscribe(p => {
      this.processo = p;
      console.log(this.processo);
      
      this.loadingService.isLoading.next(false);
    }, error => {
      this.loadingService.isLoading.next(false);
      this.snackBar.open('Erro ao carregar cliente', 'Fechar', { duration: 10000 });
      this.router.navigateByUrl('/clientes');
    });
  }

  openEventEditor() {
    document.querySelector('.eventEditor').classList.add('active');
  }

  saveEvent() {
    this.evento.codigoProcessoJuridico = this.codigoProcesso;
    this.loadingService.isLoading.next(true);
    this.processoService.adicionarEvento(this.evento).subscribe(e => {
      this.snackBar.open('Evento salvo com sucesso', 'Fechar');
    }, err => {
      this.snackBar.open('Falha ao salvar evento', 'Fechar');
    }, () => {
      this.loadingService.isLoading.next(false);
    });;

  }

}
