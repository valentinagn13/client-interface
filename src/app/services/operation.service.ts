import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Operation } from '../models/operation.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OperationService {


  //injection de dependencias
  constructor(private http: HttpClient) {

  }

  //observable es una clase que permite manejar eventos asincronos
  list(): Observable<Operation[]> {
    return this.http.get<Operation[]>(`${environment.url_ms_business}/operations`);
  }

  view(id: number): Observable<Operation> {//listar un solo teatro
    return this.http.get<Operation>(`${environment.url_ms_business}/operations/${id}`);
  }


  delete(id: number) {
    return this.http.delete<Operation>(`${environment.url_ms_business}/operations/${id}`,
    );
  }

  create(Operation: Operation): Observable<Operation> {
    return this.http.post<Operation>(`${environment.url_ms_business}/operations`, Operation);
  }
  //en la proxima clase colocamos el interceptor

  update(Operation: Operation): Observable<Operation> {
    return this.http.put<Operation>(`${environment.url_ms_business}/operations/${Operation.id}`, Operation);
  }
}
