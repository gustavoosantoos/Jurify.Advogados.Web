import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(
    private authService: AuthenticationService,
    private router: Router
  ) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
   return next.handle(request)
    .pipe(
      catchError(err => {
        if (err.status === 401) {
          const authenticateHeader: string = err.headers.get('www-authenticate');
          if (authenticateHeader && authenticateHeader.includes('The token is expired')) {
            this.authService.logout();
          }

          this.router.navigateByUrl(
            this.router.createUrlTree(
              ['/autenticacao/erro'], {queryParams: {
                codigo: 401,
                mensagem: 'Você não possui permissão para essa ação :('
              }}
            )
          );
        }

        return throwError(err);
      })
    );
  }
}
