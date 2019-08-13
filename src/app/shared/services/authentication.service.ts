import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthenticationResult } from '../model/authentication-result.model';
import { Router } from '@angular/router';
import * as jwt_decode from 'jwt-decode';
import Usuario from '../model/usuario';
import { Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService implements OnInit {
  public authenticatedState = new Subject<Boolean>();

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.authenticatedState.next(false);
  }

  public isAuthenticated(): boolean {
    const tokenFromStorage = localStorage.getItem(environment.storage.token_identifier);
    if (!tokenFromStorage || tokenFromStorage === '') {
      this.authenticatedState.next(false);
      return false;
    }

    this.authenticatedState.next(true);
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

    const userData = jwt_decode(result.access_token);
    const userInfo = new Usuario(
      userData.office_id,
      userData.user_id,
      userData.office_name,
      `${userData.user_first_name} ${userData.user_last_name}`
    );

    localStorage.setItem(environment.storage.token_identifier, result.access_token);
    localStorage.setItem(environment.storage.user_info_identifier, JSON.stringify(userInfo));

    this.authenticatedState.next(true);
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
    localStorage.removeItem(environment.storage.user_info_identifier);
    
    this.authenticatedState.next(false);
    this.router.navigateByUrl('autenticacao');
  }

  public getUserInfo(): Usuario {
    if (!this.isAuthenticated()) {
      throw new Error('Cannot user info from an unidentified user');
    }

    return JSON.parse(localStorage.getItem(environment.storage.user_info_identifier));
  }
}
