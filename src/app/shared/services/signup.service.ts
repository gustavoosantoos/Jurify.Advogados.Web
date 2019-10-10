import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SignUp } from '../model/signup';
import Cadastro from 'src/app/modules/usuarios/model/cadastro.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SignupService {

  constructor(
    private http: HttpClient
  ) { }

  public async createUser(user: SignUp): Promise<boolean> {
    const url = environment.authentication.provider + 'api/advogados/account/cadastrar';

    const options = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    const result = await this.http.post<SignUp>(url, user, options).toPromise().catch(err => null);

    if(!result) {
      return false;
    }

    return true;
  }

  public async createNewUser(user: Cadastro): Promise<boolean> {
    const url = environment.authentication.provider + 'api/advogados/account/cadastrar-novo';

    const options = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    const result = await this.http.post<Cadastro>(url, user, options).toPromise().catch(err => null);

    if (!result) {
      return false;
    }

    return true;
  }
}
