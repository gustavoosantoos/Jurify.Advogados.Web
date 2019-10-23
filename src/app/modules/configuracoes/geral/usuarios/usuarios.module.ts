import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsuariosRoutingModule } from './usuarios-routing.module';
import { CadastroUsuarioComponent } from './cadastro/cadastro-usuario.component';
import { ListagemComponent } from './listagem/listagem.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { VisualizacaoComponent } from './visualizacao/visualizacao.component';

@NgModule({
  declarations: [
    ListagemComponent,
    CadastroUsuarioComponent,
    VisualizacaoComponent
  ],
  imports: [
    CommonModule,
    UsuariosRoutingModule,
    SharedModule
  ]
})
export class UsuariosModule { }
