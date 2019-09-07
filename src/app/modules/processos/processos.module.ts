import { NgModule } from '@angular/core';

import { ProcessosRoutingModule } from './processos-routing.module';
import { ListagemComponent } from './components/listagem/listagem.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [ListagemComponent],
  imports: [
    SharedModule,
    ProcessosRoutingModule
  ]
})
export class ProcessosModule { }
