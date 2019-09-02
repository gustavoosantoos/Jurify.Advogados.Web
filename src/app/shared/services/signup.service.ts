import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SignUp } from '../model/signup';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class SignupService {

  constructor(
    private http: HttpClient
  ) { }

  public createUser(user: SignUp): Promise<boolean> {
    const url = environment.authentication.provider + '/api/lawyers/Account/SignUp';

    const options = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    const result = this.http.post<SignUp>(url, user, options).toPromise();
    return;
  }
}
