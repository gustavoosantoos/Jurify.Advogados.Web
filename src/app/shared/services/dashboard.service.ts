import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Dashboard } from '../model/dashboard.model';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class DashboardService {
    private baseUrl = environment.endpoints.advogados + 'dashboard';

    constructor(private http: HttpClient) { }

    public obterDados(): Observable<Dashboard> {
        return this.http.get<Dashboard>(this.baseUrl);
    }
}
