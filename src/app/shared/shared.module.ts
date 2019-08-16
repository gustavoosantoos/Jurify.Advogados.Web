import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule, MatSelectModule, MatProgressSpinnerModule, MatSidenavModule, MatToolbarModule, MatDividerModule, MatListModule, MatTableModule, MatGridListModule, MatCardModule, MatSnackBar, MatSnackBarModule, MatTabsModule, MatDatepickerModule, MatNativeDateModule, MAT_DATE_LOCALE } from '@angular/material';
import { FormsModule } from '@angular/forms'
import { AuthGuard } from './guards/auth-guard';
import { RouterModule } from '@angular/router';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './interceptors/auth-interceptor';
import { ErrorInterceptor } from './interceptors/error-interceptor';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgxMaskModule } from 'ngx-mask';

@NgModule({
    declarations: [],
    imports: [
      CommonModule,
      MatFormFieldModule,
      MatInputModule,
      MatButtonModule,
      MatIconModule,
      MatSelectModule,
      MatDatepickerModule,
      MatNativeDateModule,
      MatProgressSpinnerModule,
      FormsModule,
      RouterModule,
      NgxMaskModule.forRoot()
    ],
    exports: [
      CommonModule,
      FlexLayoutModule,
      MatSnackBarModule,
      MatGridListModule,
      MatCardModule,
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
      MatTabsModule,
      MatDatepickerModule,
      FormsModule,
      RouterModule,
      NgxMaskModule
    ],
    providers: [
      { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
      { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
      { provide: MAT_DATE_LOCALE, useValue: 'pt-BR' }, 
      AuthGuard
    ],
})
export class SharedModule { }
