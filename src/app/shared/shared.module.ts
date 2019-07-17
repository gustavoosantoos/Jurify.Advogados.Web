import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AuthenticationService } from './services/authentication.service';
import { MatFormFieldModule, MatInputModule } from '@angular/material';

@NgModule({
    declarations: [],
    imports: [
      CommonModule,
      MatFormFieldModule,
      MatInputModule
    ],
    exports: [
      AuthenticationService
    ],
    providers: [],
})
export class SharedModule { }
