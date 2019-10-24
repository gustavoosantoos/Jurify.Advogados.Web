import { MensagensRecebidasRoutingModule } from './mensagens-recebidas-routing.module';
import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { ListagemComponent } from './components/listagem/listagem.component';

@NgModule({
  imports: [
    SharedModule,
    MensagensRecebidasRoutingModule
  ],
  declarations: [
    ListagemComponent
  ]
})
export class MensagensRecebidasModule { }
