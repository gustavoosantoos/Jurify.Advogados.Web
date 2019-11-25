import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MensagemPublica } from '../model/mensagem.model';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MuralService {
  private baseUrl = environment.endpoints.advogados + 'mensagenspublicas';

  constructor(
    private http: HttpClient
  ) { }
  
  public getMensagens(): Observable<MensagemPublica[]> {
    return this.http.get<MensagemPublica[]>(this.baseUrl);
  }
}
