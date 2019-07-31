import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListagemComponent } from './listagem/listagem.component'
import { CadastroComponent } from './cadastro/cadastro.component';
import { AuthGuard } from 'src/app/shared/guards/auth-guard';

const routes: Routes = [
  { path: '', redirectTo: 'listagem', pathMatch: 'full', canActivate: [AuthGuard] },
  { path: 'listagem', component: ListagemComponent, canActivate: [AuthGuard] },
  { path: 'cadastro/:codigo', component: CadastroComponent, canActivate: [AuthGuard] },
  { path: 'cadastro', component: CadastroComponent, canActivate: [AuthGuard]  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientesRoutingModule { }
