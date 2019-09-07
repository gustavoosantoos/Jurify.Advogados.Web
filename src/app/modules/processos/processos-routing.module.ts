import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListagemComponent } from './components/listagem/listagem.component';
import { AuthGuard } from 'src/app/shared/guards/auth-guard';
import { CadastroComponent } from './components/cadastro/cadastro.component';

const routes: Routes = [
  { path: '', redirectTo: 'listagem', pathMatch: 'full', canActivate: [AuthGuard] },
  { path: 'listagem', component: ListagemComponent, canActivate: [AuthGuard] },
  { path: 'cadastro', component: CadastroComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProcessosRoutingModule { }
