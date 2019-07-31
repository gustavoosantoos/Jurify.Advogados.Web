import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthenticationResult } from '../model/authentication-result.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService implements OnInit {
  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  ngOnInit(): void {

  }

  public isAuthenticated(): boolean {
    const tokenFromStorage = localStorage.getItem(environment.storage.token_identifier);
    if (!tokenFromStorage || tokenFromStorage === '') {
      return false;
    }

    return true;
  }

  public async authenticate(username: string, password: string): Promise<boolean> {
    const url = environment.authentication.provider + 'connect/token';

    const options = {
      headers: new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' })
    };

    const requestBody = new HttpParams()
      .set('username', username)
      .set('password', password)
      .set('scope', environment.authentication.scope)
      .set('grant_type', environment.authentication.grant_type)
      .set('client_id', environment.authentication.client_id)
      .set('client_secret', environment.authentication.client_secret);

    const result = await this.http.post<AuthenticationResult>(url, requestBody, options).toPromise();

    if (!result || !result.access_token) {
      return false;
    }

    localStorage.setItem(environment.storage.token_identifier, result.access_token);
    return true;
  }

  public getToken(): string {
    if (!this.isAuthenticated()) {
      throw new Error('Cannot retrieve token from an unidentified user');
    }

    return localStorage.getItem(environment.storage.token_identifier);
  }

  public logout(): void {
    localStorage.removeItem(environment.storage.token_identifier);
    this.router.navigateByUrl('autenticacao');
  }
}
