import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ConversasComponent } from './conversas/conversas.component';

const routes: Routes = [
  { path: '', redirectTo: 'conversas', pathMatch: 'full' },
  { path: 'conversas', component: ConversasComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChatRoutingModule { }
