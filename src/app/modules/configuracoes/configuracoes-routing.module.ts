import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GeralComponent } from './geral/geral.component';

const routes: Routes = [
  { path: '', redirectTo: 'geral', pathMatch: 'full' },
  { path: 'geral', component: GeralComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConfiguracoesRoutingModule { }
