import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ConversasComponent } from './conversas/conversas.component';
import { AuthGuard } from 'src/app/shared/guards/auth-guard';

const routes: Routes = [
  { path: '', redirectTo: 'conversas', pathMatch: 'full', canActivate: [AuthGuard] },
  { path: 'conversas', component: ConversasComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChatRoutingModule { }
