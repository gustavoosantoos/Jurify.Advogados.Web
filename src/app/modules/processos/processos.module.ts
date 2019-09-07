import { NgModule } from '@angular/core';

import { ProcessosRoutingModule } from './processos-routing.module';
import { ListagemComponent } from './components/listagem/listagem.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { CadastroComponent } from './components/cadastro/cadastro.component';

@NgModule({
  declarations: [
    ListagemComponent,
    CadastroComponent
  ],
  imports: [
    SharedModule,
    ProcessosRoutingModule
  ]
})
export class ProcessosModule { }
