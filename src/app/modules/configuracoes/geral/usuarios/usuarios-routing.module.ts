import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CadastroUsuarioComponent } from './cadastro/cadastro-usuario.component';
import { ListagemComponent } from './listagem/listagem.component';
import { AuthGuard } from '../../../../shared/guards/auth-guard';
import { VisualizacaoComponent } from './visualizacao/visualizacao.component';


const routes: Routes = [
  { path: '', redirectTo: 'listagem', pathMatch: 'full' },
  { path: 'cadastro-usuario', component: CadastroUsuarioComponent },
  { path: 'listagem', component: ListagemComponent, canActivate: [AuthGuard] },
  { path: 'cadastro-usuario/:codigo', component: VisualizacaoComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsuariosRoutingModule { }
