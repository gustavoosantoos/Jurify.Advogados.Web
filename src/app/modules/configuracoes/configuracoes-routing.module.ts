import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GeralComponent } from './geral/geral.component';
import { AuthGuard } from 'src/app/shared/guards/auth-guard';

const routes: Routes = [
  { path: '', redirectTo: 'geral', pathMatch: 'full', canActivate: [AuthGuard] },
  { path: 'geral', component: GeralComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConfiguracoesRoutingModule { }
