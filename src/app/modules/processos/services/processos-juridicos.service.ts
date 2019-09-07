import { environment } from './../../../../environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import ProcessoPreview from '../model/listagem/processo-preview.model';
import Cliente from '../model/cadastro/cliente.model';
import { ClientesService } from '../../clientes/services/clientes.service';
import { map } from 'rxjs/operators';

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

  public obterClientesDisponiveis(): Observable<Cliente[]> {
    return this.clientesService.getClientes().pipe(
      map(clientesOriginal => {
        return clientesOriginal.map(c => new Cliente(c.codigo, `${c.nome} ${c.sobrenome}`));
      })
    );
  }

  public removerProcesso(codigo: string): Observable<string> {
    return this.httpClient.delete<string>(`${this.baseUrl}/${codigo}`);
  }
}
