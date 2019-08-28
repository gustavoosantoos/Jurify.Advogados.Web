import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import Cliente from '../model/visualizacao/cliente';
import ClientePreview from '../model/listagem/cliente-preview.model';
import ClienteCadastro from '../model/cadastro/cliente-cadastro.model';
import ClienteAtualizacao from '../model/atualizacao/cliente-atualizacao.model';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {
  private baseUrl = environment.endpoints.advogados + 'clientes';

  constructor(
    private http: HttpClient
  ) { }


  public getClientes(): Observable<ClientePreview[]> {
    return this.http.get<ClientePreview[]>(this.baseUrl);
  }

  public getCliente(id: string): Observable<Cliente> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.get<Cliente>(url);
  }

  public cadastrarCliente(cliente: ClienteCadastro): Observable<string> {
    return this.http.post<string>(this.baseUrl, cliente);
  }

  public atualizarDadosBasicosCliente(cliente: ClienteAtualizacao): Observable<string> {
    const url = `${this.baseUrl}/${cliente.codigo}`;
    return this.http.put<string>(url, cliente);
  }

  public removerCliente(id: string): Observable<string> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.delete<string>(url);
  }
}