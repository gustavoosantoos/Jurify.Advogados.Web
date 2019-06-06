import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AuthenticationService } from './services/authentication.service';

@NgModule({
    declarations: [],
    imports: [
      CommonModule
    ],
    exports: [
      AuthenticationService
    ],
    providers: [],
})
export class SharedModule { }
