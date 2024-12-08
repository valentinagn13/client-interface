import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Quota } from '../models/quota.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class QuotaService {

  
  //injection de dependencias
  constructor(private http: HttpClient) {

  }

  //observable es una clase que permite manejar eventos asincronos
  list(): Observable<Quota[]> {
    return this.http.get<Quota[]>(`${environment.url_ms_business}/quotas`);
  }

  view(id: number): Observable<Quota> {//listar un solo teatro
    
    return this.http.get<Quota>(`${environment.url_ms_business}/quotas/${id}`);
  }


  delete(id: number) {
    return this.http.delete<Quota>(`${environment.url_ms_business}/quotas/${id}`,
    );
  }

  create(Quota: Quota): Observable<Quota> {
    return this.http.post<Quota>(`${environment.url_ms_business}/quotas`, Quota);
  }
  //en la proxima clase colocamos el interceptor

  update(Quota: Quota): Observable<Quota> {
    return this.http.put<Quota>(`${environment.url_ms_business}/quotas/${Quota.id}`, Quota);
  }
}
