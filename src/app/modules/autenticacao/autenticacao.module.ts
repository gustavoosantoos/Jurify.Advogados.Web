import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AutenticacaoRoutingModule } from './autenticacao-routing.module';
import { LoginComponent } from './login/login.component';

@NgModule({
    declarations: [
    LoginComponent],
    imports: [
        CommonModule,
        AutenticacaoRoutingModule
    ],
    exports: [],
    providers: [],
})
export class AutenticacaoModule { }
