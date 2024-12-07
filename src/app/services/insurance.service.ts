import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Insurance } from '../models/insurance.model';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class InsuranceService {

  //injection de dependencias
  constructor(private http: HttpClient) {

  }

  //observable es una clase que permite manejar eventos asincronos
  list(): Observable<Insurance[]> {
    return this.http.get<Insurance[]>(`${environment.url_ms_business}/insurances`);
  }

  view(id: number): Observable<Insurance> {//listar un solo teatro
    return this.http.get<Insurance>(`${environment.url_ms_business}/insurances/${id}`);
  }


  delete(id: number) {
    return this.http.delete<Insurance>(`${environment.url_ms_business}/insurances/${id}`,
    );
  }

  create(Insurance: Insurance): Observable<Insurance> {
    return this.http.post<Insurance>(`${environment.url_ms_business}/insurances`, Insurance);
  }
  //en la proxima clase colocamos el interceptor

  update(Insurance: Insurance): Observable<Insurance> {
    return this.http.put<Insurance>(`${environment.url_ms_business}/insurances/${Insurance.id}`, Insurance);
  }
 
}
