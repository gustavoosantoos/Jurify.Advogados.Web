import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AuthenticationService } from './services/authentication.service';
import { MatFormFieldModule } from '@angular/material/form-field';

@NgModule({
    declarations: [],
    imports: [
      CommonModule,
      MatFormFieldModule
    ],
    exports: [
      AuthenticationService
    ],
    providers: [],
})
export class SharedModule { }
