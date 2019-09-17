import { AgendaRoutingModule } from './agenda-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgendaComponent } from './components/agenda/agenda.component';
import { FullCalendarModule } from '@fullcalendar/angular';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  imports: [
    SharedModule,
    AgendaRoutingModule,
    FullCalendarModule
  ],
  declarations: [
    AgendaComponent
  ]
})
export class AgendaModule { }
