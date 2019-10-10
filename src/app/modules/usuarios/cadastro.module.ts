import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CadastroRoutingModule } from './cadastro-routing.module';
import { CadastroUsuarioComponent } from './cadastro/cadastro-usuario.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [CadastroUsuarioComponent],
  imports: [
    CommonModule,
    CadastroRoutingModule,
    SharedModule
  ]
})
export class CadastroModule { }
