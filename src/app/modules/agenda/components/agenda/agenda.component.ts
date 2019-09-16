import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';

@Component({
  selector: 'app-agenda',
  templateUrl: './agenda.component.html',
  styleUrls: ['./agenda.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AgendaComponent implements OnInit {

  calendarPlugins = [dayGridPlugin, timeGridPlugin, listPlugin];

  formatoTitulo = {
    year: 'numeric',
    month: 'long'
  };

  header = {
    left: 'dayGridMonth,timeGridWeek,list',
    center: 'title',
    right: 'today,prev,next'
  };

  buttons = {
    today:    'Hoje',
    month:    'Mês',
    week:     'Semana',
    day:      'Dia',
    list:     'Compromissos'
  };

  localeInfo = 'pt-BR';

  constructor() { }

  ngOnInit() {
  }
}
