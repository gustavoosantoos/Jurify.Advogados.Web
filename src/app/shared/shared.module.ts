import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule, MatSelectModule, MatProgressSpinnerModule, MatSidenavModule, MatToolbarModule, MatDividerModule, MatListModule, MatTableModule } from '@angular/material';
import { FormsModule } from '@angular/forms'
import { AuthGuard } from './guards/auth-guard';
import { RouterModule } from '@angular/router';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './interceptors/auth-interceptor';
import { ErrorInterceptor } from './interceptors/error-interceptor';


@NgModule({
    declarations: [],
    imports: [
      CommonModule,
      MatFormFieldModule,
      MatInputModule,
      MatButtonModule,
      MatIconModule,
      MatSelectModule,
      MatProgressSpinnerModule,
      FormsModule,
      RouterModule
    ],
    exports: [
      CommonModule,
      MatSidenavModule,
      MatToolbarModule,
      MatDividerModule,
      MatListModule,
      MatFormFieldModule,
      MatInputModule,
      MatButtonModule,
      MatIconModule,
      MatSelectModule,
      MatProgressSpinnerModule,
      MatTableModule,
      FormsModule,
      RouterModule
    ],
    providers: [
      { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
      { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
      AuthGuard
    ],
})
export class SharedModule { }
