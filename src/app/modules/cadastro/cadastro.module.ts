import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CadastroRoutingModule } from './cadastro-routing.module';
import { CadastroEscritorioComponent } from './cadastro-escritorio/cadastro-escritorio.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [CadastroEscritorioComponent],
  imports: [
    CommonModule,
    CadastroRoutingModule,
    SharedModule
  ]
})
export class CadastroModule { }
