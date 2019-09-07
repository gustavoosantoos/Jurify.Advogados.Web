import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import Cliente from '../model/visualizacao/cliente.model';
import ClientePreview from '../model/listagem/cliente-preview.model';
import ClienteCadastro from '../model/cadastro/cliente-cadastro.model';
import ClienteAtualizacao from '../model/atualizacao/cliente-atualizacao.model';
import { LoadingScreenService } from 'src/app/shared/services/loading-screen.service';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {
  private baseUrl = environment.endpoints.advogados + 'clientes';

  constructor(
    private http: HttpClient,
    private loadingService: LoadingScreenService
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

  public removerEndereco(idCliente: string, idEndereco: string): Observable<string> {
    const url = `${this.baseUrl}/${idCliente}/enderecos/${idEndereco}`;
    return this.http.delete<string>(url);
  }

  public adicionarAnexo(idCliente: string, anexo: FormData): Observable<string> {
    const url = `${this.baseUrl}/${idCliente}/anexos`;
    return this.http.post<string>(url, anexo);
  }

  public baixarAnexo(idCliente: string, idAnexo: string): Observable<any> {
    const url = `${this.baseUrl}/${idCliente}/anexos/${idAnexo}`;
    return this.http.get(url, {
      responseType: 'blob'
    });
  }

  public removerAnexo(idCliente: string, idAnexo: any): Observable<string> {
    const url = `${this.baseUrl}/${idCliente}/anexos/${idAnexo}`;
    return this.http.delete<string>(url);
  }
}