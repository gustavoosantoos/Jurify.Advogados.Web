import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import ProcessoPreview from '../model/listagem/processo-preview.model';
import Cliente from '../model/cadastro/cliente.model';
import { ClientesService } from '../../clientes/services/clientes.service';
import { map } from 'rxjs/operators';
import { NovoProcesso } from '../model/cadastro/novo-processo.model';
import { NovoEvento } from '../model/visualizacao/novo-evento.model';
import { Processo } from '../model/visualizacao/processo.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProcessosJuridicosService {
  private baseUrl = environment.endpoints.advogados + 'processosjuridicos';

  constructor(
    private httpClient: HttpClient,
    private clientesService: ClientesService
  ) { }

  public obterProcessos(): Observable<ProcessoPreview[]> {
    return this.httpClient.get<ProcessoPreview[]>(this.baseUrl);
  }

  public obterProcesso(codigo: string): Observable<Processo> {
    return this.httpClient.get<Processo>(this.baseUrl + '/' + codigo);
  }

  public obterClientesDisponiveis(): Observable<Cliente[]> {
    return this.clientesService.getClientes().pipe(
      map(clientesOriginal => {
        return clientesOriginal
          .map(c => new Cliente(c.codigo, `${c.nome} ${c.sobrenome}`))
          .sort((a, b) => {
            return a.nome < b.nome ? -1 : a.nome > b.nome ? 1 : 0;
          });
      })
    );
  }

  public salvarProcesso(novoProcesso: NovoProcesso): Observable<string> {
    return this.httpClient.post<string>(this.baseUrl, novoProcesso);
  }

  public removerProcesso(codigo: string): Observable<string> {
    return this.httpClient.delete<string>(`${this.baseUrl}/${codigo}`);
  }

  public adicionarEvento(evento: NovoEvento): Observable<string> {
    return this.httpClient.post<string>(this.baseUrl + '/' + evento.codigoProcessoJuridico + '/eventos', evento);
  }

  public removerEvento(codigoProcesso: string, codigoEvento: string): Observable<string> {
    return this.httpClient.delete<string>(this.baseUrl + '/' + codigoProcesso + '/eventos/' + codigoEvento);
  }

  public adicionarAnexo(codigoProcesso: string, codigoEvento: string, anexo: FormData): Observable<string> {
    const url = `${this.baseUrl}/${codigoProcesso}/eventos/${codigoEvento}/anexos`;
    return this.httpClient.post<string>(url, anexo);
  }

  public baixarAnexo(codigoProcesso: string, codigoEvento: string, codigoAnexo: string): Observable<any> {
    const url = `${this.baseUrl}/${codigoProcesso}/eventos/${codigoEvento}/anexos/${codigoAnexo}`;
    return this.httpClient.get(url, {
      responseType: 'blob'
    });
  }

  public removerAnexo(codigoProcesso: string, codigoEvento: string, codigoAnexo: any): Observable<string> {
    const url = `${this.baseUrl}/${codigoProcesso}/eventos/${codigoEvento}/anexos/${codigoAnexo}`;
    return this.httpClient.delete<string>(url);
  }

  public notificarCliente(codigoProcesso: string, codigoEvento: string): Observable<any> {
    const url = `${this.baseUrl}/${codigoProcesso}/eventos/${codigoEvento}/notificar-cliente`;
    return this.httpClient.post<any>(url, null);
  }
}
