import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthenticationResult } from '../model/authentication-result.model';
import { Router } from '@angular/router';
import * as jwt_decode from 'jwt-decode';
import Usuario from '../model/usuario';
import { Subject, Observable } from 'rxjs';
import { Especialidade } from '../model/especialidade.model';
import { EspecialidadeResult } from '../model/especialidade-result.model';
import { Escritorio } from '../model/escritorio.model';
import { EscritorioAtualizacao } from '../model/escritorio-atualizacao.model';


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

    const result = await this.http.post<AuthenticationResult>(url, requestBody, options).toPromise()
      .catch(err => null);

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

  public getEspecialidadesEscritorio(): Observable<EspecialidadeResult> {
    let userInfo = this.getUserInfo();
    const url = environment.endpoints.autenticador + '/advogados/specialties/listar-especialidades-escritorio?codigoEscritorio=' + userInfo.codigoEscritorio;
    return this.http.get<EspecialidadeResult>(url);
  }

  public getEspecialidades(): Observable<Especialidade[]> {
    const url = environment.endpoints.autenticador + 'advogados/specialties/listar-especialidades/';

    return this.http.get<Especialidade[]>(url);
  }

  public salvarEspecialidade(codigoEspecialidade: string): boolean {
    const url = environment.endpoints.autenticador + 'advogados/specialties/cadastrar-especialidade-escritorio';
    let userInfo = this.getUserInfo();
    const obj = {
      "codigoEspecialidade": codigoEspecialidade,
      "codigoEscritorio": userInfo.codigoEscritorio
    }

    const options = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    const result = this.http.post(url, obj, options).toPromise();
    
    if (!result) {
      return false;
    }

    return true;
  }

  public removerEspecialidade(codigoEspecialidade: string): boolean {
    const url = environment.endpoints.autenticador + 'advogados/specialties/remover-especialidade-escritorio?codigoEspecialidadeEscritorio=' + codigoEspecialidade;

    const result = this.http.delete(url).toPromise();

    if(!result) {
      return false;
    }
    return true;
  }

  public getInfoEscritorio(): Observable<Escritorio> {
    let userInfo = this.getUserInfo();
    const url = environment.endpoints.autenticador + 'advogados/offices/dados-escritorio?codigoEscritorio=' + userInfo.codigoEscritorio;

    return this.http.get<Escritorio>(url);
  }

  public atualizarDados(escritorio: EscritorioAtualizacao): Observable<Escritorio> {
    const url = environment.endpoints.autenticador + 'advogados/offices/modificar-escritorio';

    const options = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    return this.http.put<Escritorio>(url, escritorio, options);
  }
}
