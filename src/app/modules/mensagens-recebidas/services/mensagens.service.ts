import { environment } from 'src/environments/environment.prod';
import { ListagemMensagens } from './../models/listagem-mensagens.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MensagensService {
  private baseUrl = environment.endpoints.advogados + 'escritorios/mensagens';

  constructor(
    private httpClient: HttpClient
  ) { }

  public obterMensagens(): Observable<ListagemMensagens> {
    return this.httpClient.get<ListagemMensagens>(this.baseUrl);
  }

  public cadastrarCliente(codigo: string): Observable<string> {
    return this.httpClient.post<string>(`${this.baseUrl}/${codigo}/criar-cliente`, { });
  }

  public removerMensagem(codigo: string): Observable<string> {
    return this.httpClient.delete<string>(`${this.baseUrl}/${codigo}`);
  }
}
