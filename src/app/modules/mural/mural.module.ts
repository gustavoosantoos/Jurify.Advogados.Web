import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MuralRoutingModule } from './mural-routing.module';
import { ListagemComponent } from './components/listagem/listagem.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [ListagemComponent],
  imports: [
    CommonModule,
    MuralRoutingModule,
    SharedModule
  ]
})
export class MuralModule { }
