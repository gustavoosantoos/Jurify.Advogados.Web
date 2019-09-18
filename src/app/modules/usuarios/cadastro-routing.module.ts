import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CadastroUsuarioComponent } from './cadastro/cadastro-usuario.component';

const routes: Routes = [
  { path: '', redirectTo: 'cadastro-usuario', pathMatch: 'full' },
  { path: 'cadastro-usuario', component: CadastroUsuarioComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CadastroRoutingModule { }
