import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatFormFieldModule, MatInputModule } from '@angular/material';

@NgModule({
    declarations: [],
    imports: [
      CommonModule,
      MatFormFieldModule,
      MatInputModule
    ],
    exports: [
      CommonModule,
      MatFormFieldModule,
      MatInputModule
    ],
    providers: [],
})
export class SharedModule { }
