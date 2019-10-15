import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConfiguracoesRoutingModule } from './configuracoes-routing.module';
import { GeralComponent } from './geral/geral.component';
import { EditarEscritorioComponent } from './geral/editar-escritorio/editar-escritorio.component';

@NgModule({
  declarations: [GeralComponent, EditarEscritorioComponent],
  imports: [
    CommonModule,
    ConfiguracoesRoutingModule
  ]
})
export class ConfiguracoesModule { }
