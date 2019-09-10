import { environment } from './../../../../environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import ProcessoPreview from '../model/listagem/processo-preview.model';
import Cliente from '../model/cadastro/cliente.model';
import { ClientesService } from '../../clientes/services/clientes.service';
import { map } from 'rxjs/operators';
import { NovoProcesso } from '../model/cadastro/novo-processo.model';
import { Evento } from '../model/visualizacao/evento.model';

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

  public obterProcesso(codigo: string): Observable<NovoProcesso> {
    return this.httpClient.get<NovoProcesso>(this.baseUrl + '/' + codigo);
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

  public adicionarEvento(evento: Evento): Observable<string> {
    return this.httpClient.post<string>(this.baseUrl + '/' + evento.codigoProcessoJuridico + '/eventos', evento);
  }
}
