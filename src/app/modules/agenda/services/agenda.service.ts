import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Compromisso } from '../model/compromisso.model';
import { HttpClient } from '@angular/common/http';
import { NovoCompromisso } from '../model/novo-compromisso.model';

@Injectable({
    providedIn: 'root'
})
export class AgendaService {
    private baseUrl = environment.endpoints.advogados + 'agenda';

    constructor(
        private http: HttpClient
    ) { }

    public obterCompromissos(): Observable<Compromisso[]> {
        return this.http.get<Compromisso[]>(this.baseUrl);
    }

    public salvarCompromisso(compromisso: NovoCompromisso): Observable<string> {
        return this.http.post<string>(this.baseUrl, compromisso);
    }
}
