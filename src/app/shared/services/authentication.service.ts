import { Injectable, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthenticationAttemp } from '../model/authentication-attempt.model';
import { AuthenticationAttempResult } from '../model/authentication-attempt-result.model';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService implements OnInit {
  constructor(
    private http: HttpClient
  ) { }

  ngOnInit(): void {

  }

  public isAuthenticated(): boolean {
    const tokenFromStorage = localStorage.getItem(environment.storage.token_identifier);
    if (!tokenFromStorage || tokenFromStorage == '') {
      return false;
    }

    return true;
  }

  public async authenticate(username: string, password: string): Promise<boolean> {
    const requestBody = new AuthenticationAttemp(
      username,
      password,
      environment.authentication.scope,
      environment.authentication.grant_type,
      environment.authentication.client_id,
      environment.authentication.client_secret
    );

    const url = environment.authentication.provider + '/connect/token';
    const result = await this.http.post<AuthenticationAttempResult>(url, requestBody).toPromise();

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
}
