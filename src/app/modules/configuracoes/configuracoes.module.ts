import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConfiguracoesRoutingModule } from './configuracoes-routing.module';
import { GeralComponent } from './geral/geral.component';
import { EditarEscritorioComponent } from './geral/editar-escritorio/editar-escritorio.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { UsuariosModule } from './geral/usuarios/usuarios.module';

@NgModule({
  declarations: [GeralComponent, EditarEscritorioComponent],
  imports: [
    CommonModule,
    ConfiguracoesRoutingModule,
    SharedModule
  ]
})
export class ConfiguracoesModule { }
