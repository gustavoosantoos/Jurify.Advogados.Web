import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard/home', pathMatch: 'full' },
  { path: 'dashboard', loadChildren: () => import('./modules/dashboard/dashboard.module').then(m => m.DashboardModule) },
  { path: 'autenticacao', loadChildren: () => import('./modules/autenticacao/autenticacao.module').then(m => m.AutenticacaoModule) },
  { path: 'cadastro', loadChildren: () => import('./modules/cadastro/cadastro.module').then(m => m.CadastroModule) },
  { path: 'usuarios', loadChildren: () => import('./modules/configuracoes/geral/usuarios/usuarios.module').then(m => m.UsuariosModule) },
  { path: 'agenda', loadChildren: () => import('./modules/agenda/agenda.module').then(m => m.AgendaModule) },
  { path: 'clientes', loadChildren: () => import('./modules/clientes/clientes.module').then(m => m.ClientesModule) },
  { path: 'processos', loadChildren: () => import('./modules/processos/processos.module').then(m => m.ProcessosModule) },
  { path: 'mensagens', loadChildren: () => import('./modules/mensagens-recebidas/mensagens-recebidas.module').then(m => m.MensagensRecebidasModule) },
  { path: 'mural', loadChildren: () => import('./modules/mural/mural.module').then(m => m.MuralModule) },
  { path: 'configuracoes', loadChildren: () => import('./modules/configuracoes/configuracoes.module').then(m => m.ConfiguracoesModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
