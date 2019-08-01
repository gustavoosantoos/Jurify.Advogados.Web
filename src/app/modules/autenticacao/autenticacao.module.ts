import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AutenticacaoRoutingModule } from './autenticacao-routing.module';
import { LoginComponent } from './login/login.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ErroComponent } from './erro/erro.component';

@NgModule({
    declarations: [
        LoginComponent,
        ErroComponent
    ],
    imports: [
        SharedModule,
        AutenticacaoRoutingModule
    ],
    exports: [],
    providers: [],
})
export class AutenticacaoModule { }
