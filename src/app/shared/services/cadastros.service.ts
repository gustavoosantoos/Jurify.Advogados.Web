import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import EstadoBrasileiro from '../model/estado-brasileiro.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CadastrosService {

  private baseUrl = environment.endpoints.advogados + 'cadastros';

  constructor(
    private httpClient: HttpClient
  ) { }

  public obterEstadosBrasileiros(): Observable<EstadoBrasileiro[]> {
    // Se os estados estão no local storage, retorna eles
    const dadosCache = localStorage.getItem(environment.storage.cache_estadosbrasileiros);
    if (dadosCache) {
      return of(JSON.parse(dadosCache) as EstadoBrasileiro[]);
    }

    // Caso não haja cache, puxa os dados da api e aloca no local storage para consultas futuras
    return this.httpClient.get<EstadoBrasileiro[]>(`${this.baseUrl}/estados-brasileiros`)
      .pipe(
        map(res => {
          localStorage.setItem(environment.storage.cache_estadosbrasileiros, JSON.stringify(res));
          return res;
        })
      );
  }
}
