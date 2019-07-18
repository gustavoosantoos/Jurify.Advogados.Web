import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { ClientesRoutingModule } from './clientes-routing.module';
import { ListagemComponent } from './listagem/listagem.component';

@NgModule({
  declarations: [ListagemComponent],
  imports: [
    CommonModule,
    ClientesRoutingModule,
    SharedModule
  ]
})
export class ClientesModule { }
