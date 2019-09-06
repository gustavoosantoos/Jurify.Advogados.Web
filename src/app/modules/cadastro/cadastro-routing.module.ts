import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CadastroEscritorioComponent } from './cadastro-escritorio/cadastro-escritorio.component';

const routes: Routes = [
  { path: '', redirectTo: 'cadastro-escritorio', pathMatch: 'full' },
  { path: 'cadastro-escritorio', component: CadastroEscritorioComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CadastroRoutingModule { }
