import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Resultado } from '../model/result.model';

@Injectable({
  providedIn: 'root'
})
export class MuralService {
  private baseUrl = environment.endpoints.advogados + 'mensagenspublicas';

  constructor(
    private http: HttpClient
  ) { }
  
  public getMensagens(): Observable<Resultado> {
    return this.http.get<Resultado>(this.baseUrl);
  }

  public marcarInteresse(codigo: string): Observable<string> {
    const url = this.baseUrl + '/' + codigo + '/marcar-interesse';
    return this.http.post<string>(url, { });
  }

  public reativarMensagem(codigo: string): Observable<string> {
    const url = this.baseUrl + '/' + codigo + '/reativar';
    return this.http.post<string>(url, { });
  }
}
