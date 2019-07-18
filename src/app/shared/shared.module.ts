import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatFormFieldModule, MatInputModule, MatButtonModule } from '@angular/material';

@NgModule({
    declarations: [],
    imports: [
      CommonModule,
      MatFormFieldModule,
      MatInputModule,
      MatButtonModule
    ],
    exports: [
      CommonModule,
      MatFormFieldModule,
      MatInputModule,
      MatButtonModule
    ],
    providers: [],
})
export class SharedModule { }
