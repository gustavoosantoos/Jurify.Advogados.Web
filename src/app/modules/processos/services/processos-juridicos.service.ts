import { environment } from './../../../../environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import ProcessoPreview from '../components/model/listagem/processo-preview.model';

@Injectable({
  providedIn: 'root'
})
export class ProcessosJuridicosService {
  private baseUrl = environment.endpoints.advogados + 'processosjuridicos';

  constructor(
    private httpClient: HttpClient
  ) { }

  public obterProcessos(): Observable<ProcessoPreview[]> {
    return this.httpClient.get<ProcessoPreview[]>(this.baseUrl);
  }
}
