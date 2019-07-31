import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Cliente } from '../model/cliente';
import { environment } from 'src/environments/environment';
import { AuthenticationService } from './authentication.service';
import { Observable } from 'rxjs';
import { Endereco } from '../model/endereco';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {

  constructor(
    private http: HttpClient,
    private auth: AuthenticationService
  ) { }


  public getClientes(): Observable<Cliente[]> {
    const url = 'http://jurify-advogados.azurewebsites.net/api/clientes';
    var BEARER_TOKEN = "";
    if (this.auth.isAuthenticated()) {
      BEARER_TOKEN = this.auth.getToken();
    }

    const options = {
      headers: new HttpHeaders({ 'Authorization': 'Bearer ' + BEARER_TOKEN, 'Content-Type': 'application/json' })
    };


    return this.http.get<Cliente[]>(url, options);
  }

  public getCliente(id): Observable<Cliente> {
    const url = 'http://jurify-advogados.azurewebsites.net/api/clientes/';

    var BEARER_TOKEN = "";
    if (this.auth.isAuthenticated()) {
      BEARER_TOKEN = this.auth.getToken();
    }

    const options = {
      headers: new HttpHeaders({ 'Authorization': 'Bearer ' + BEARER_TOKEN, 'Content-Type': 'application/json' })
    };


    return this.http.get<Cliente>(url + id, options);
  }

} 
