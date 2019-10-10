import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import Usuario from '../model/usuario.model';
import { LoadingScreenService } from 'src/app/shared/services/loading-screen.service';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  private baseUrl = environment.authentication.provider + 'api/advogados/account';

  constructor(
    private http: HttpClient
  ) { }


  public getUsuarios(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(this.baseUrl +"/listar-usuarios-escritorio");
  }

  public getUsuario(id: string): Observable<Usuario> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.get<Usuario>(url);
  }

  public removerUsuario(id: string): Observable<string> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.delete<string>(url);
  }

}
