import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { ClientesRoutingModule } from './clientes-routing.module';
import { ListagemComponent } from './components/listagem/listagem.component';
import { CadastroComponent } from './components/cadastro/cadastro.component';

@NgModule({
  declarations: [
    ListagemComponent,
    CadastroComponent
  ],
  imports: [
    CommonModule,
    ClientesRoutingModule,
    SharedModule
  ]
})
export class ClientesModule { }
