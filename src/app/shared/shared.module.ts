import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule, MatSelectModule, MatProgressSpinnerModule, MatSidenavModule, MatToolbarModule, MatDividerModule, MatListModule, MatTableModule, MatGridListModule, MatCardModule, MatSnackBar, MatSnackBarModule, MatTabsModule, MatDatepickerModule, MatNativeDateModule, MAT_DATE_LOCALE, MatDialogModule, MatTooltipModule, MatSlideToggleModule } from '@angular/material';
import { AuthGuard } from './guards/auth-guard';
import { RouterModule } from '@angular/router';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './interceptors/auth-interceptor';
import { ErrorInterceptor } from './interceptors/error-interceptor';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgxMaskModule } from 'ngx-mask';
import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';
import { AngularEditorModule } from '@kolkov/angular-editor';

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
      MatDialogModule,
      FormsModule,
      ReactiveFormsModule,
      RouterModule,
      NgxMaskModule.forRoot(),
      RxReactiveFormsModule
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
      MatDialogModule,
      MatTableModule,
      MatTabsModule,
      MatDatepickerModule,
      MatTooltipModule,
      FormsModule,
      ReactiveFormsModule,
      RouterModule,
      NgxMaskModule,
      RxReactiveFormsModule,
      AngularEditorModule,
      MatSlideToggleModule
    ],
    providers: [
      { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
      { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
      { provide: MAT_DATE_LOCALE, useValue: 'pt-BR' },
      AuthGuard
    ],
})
export class SharedModule { }
