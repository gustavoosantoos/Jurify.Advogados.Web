import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AutenticacaoRoutingModule } from './autenticacao-routing.module';
import { LoginComponent } from './login/login.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
    declarations: [
        LoginComponent
    ],
    imports: [
        SharedModule,
        AutenticacaoRoutingModule
    ],
    exports: [],
    providers: [],
})
export class AutenticacaoModule { }
