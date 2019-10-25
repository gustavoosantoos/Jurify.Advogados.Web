import { Compromisso } from './../../model/compromisso.model';
import { AgendaService } from './../../services/agenda.service';
import { FormGroup } from '@angular/forms';
import { NovoCompromisso } from './../../model/novo-compromisso.model';
import { Component, OnInit, ViewEncapsulation, ViewChild, TemplateRef } from '@angular/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import interactionPlugin from '@fullcalendar/interaction';
import { MatDialog, MatSnackBar } from '@angular/material';
import { LoadingScreenService } from 'src/app/shared/services/loading-screen.service';
import { RxFormBuilder } from '@rxweb/reactive-form-validators';

@Component({
  selector: 'app-agenda',
  templateUrl: './agenda.component.html',
  styleUrls: ['./agenda.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AgendaComponent implements OnInit {

  calendarPlugins = [dayGridPlugin, timeGridPlugin, listPlugin, interactionPlugin];

  formatoTitulo = {
    year: 'numeric',
    month: 'long'
  };

  header = {
    left: 'dayGridMonth,timeGridWeek,listMonth',
    center: 'title',
    right: 'today,prev,next'
  };

  buttons = {
    today:     'Hoje',
    month:     'Mês',
    week:      'Semana',
    day:       'Dia',
    listMonth: 'Compromissos'
  };

  localeInfo = 'pt-BR';

  @ViewChild('templateNovoCompromisso', { static: true })
  templateNovoCompromisso: TemplateRef<any>;
  novoCompromissoForm: FormGroup;
  novoCompromisso: NovoCompromisso = new NovoCompromisso();

  compromissos: Compromisso[] = [];
  compromisso: Compromisso;
  compromissosCalendar: any[];

  constructor(
    private agendaService: AgendaService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private loadingService: LoadingScreenService,
    private formBuilder: RxFormBuilder
  ) { }

  ngOnInit() {
    this.carregarEventos();
    this.novoCompromissoForm = this.formBuilder.formGroup(this.novoCompromisso);
  }

  carregarEventos(): void {
    this.loadingService.isLoading.next(true);
    this.agendaService.obterCompromissos().subscribe(r => {
      this.compromissos = r;
      this.compromissosCalendar = this.compromissos.map(c => ({
        title: c.titulo,
        start: c.inicio,
        end: c.final,
        allDay: c.inicio.endsWith('00:00:00')
      }));
    }, err => {
      this.snackBar.open('Falha ao carregar compromissos', 'Fechar');
    }, () => {
      this.loadingService.isLoading.next(false);
    });
  }

  novoEvento(event): void {
    const today = new Date(Date.now()).setHours(0, 0, 0, 0);

    if (event.date < today) {
      this.snackBar.open('Não é possível criar compromissos em datas passadas', 'Fechar');
      return;
    }

    this.novoCompromisso.inicio = event.date;
    this.dialog.open(this.templateNovoCompromisso);
  }

  abrirEvento(event) {
    this.compromissos.filter(obj => {
      if ( obj.titulo == event.event.title) {
        this.compromisso = obj;
      }
    });
    this.dialog.open(this.templateNovoCompromisso);
  }

  cancelarNovoCompromisso(): void {
    this.novoCompromisso = new NovoCompromisso();
    this.novoCompromissoForm = this.formBuilder.formGroup(this.novoCompromisso);
    this.dialog.closeAll();
  }

  salvarNovoCompromisso(): void {
    this.novoCompromisso.atualizarHorarioCompromisso();
    this.loadingService.isLoading.next(true);

    this.agendaService.salvarCompromisso(this.novoCompromisso).subscribe(r => {
      this.snackBar.open('Compromisso salvo com sucesso', 'Fechar');
      this.carregarEventos();
    }, err => {
      this.snackBar.open('Erro ao salvar compromisso', 'Fechar');
      this.loadingService.isLoading.next(false);
    }, () => {
      this.novoCompromisso = new NovoCompromisso();
      this.novoCompromissoForm = this.formBuilder.formGroup(this.novoCompromisso);
      this.dialog.closeAll();
    });
  }
}
