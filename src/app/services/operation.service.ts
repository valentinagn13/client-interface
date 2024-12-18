import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Operation } from '../models/operation.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Municipality } from '../models/municipality.model';

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

   listByMunicipality(municipality_id: number): Observable<Operation[]> {
      return this.http.get<Operation[]>(`${
        environment.url_ms_business
      }/operations?municipality_id=${municipality_id}`);
      
    }
    createForMunicipality(municipality_id: number, operation: Operation): Observable<Operation> {
      return this.http.post<Operation>(`${environment.url_ms_business}/operations/municipality/${municipality_id}`, operation);
    }
  
    listByVehicle(vehicle_id: number): Observable<Operation[]> {
      return this.http.get<Operation[]>(`${
        environment.url_ms_business
      }/operations?vehicle_id=${vehicle_id}`);
      
    }
    createForVehicle(vehicle_id: number, operation: Operation): Observable<Operation> {
      return this.http.post<Operation>(`${environment.url_ms_business}/operations/vehicle/${vehicle_id}`, operation);
    }
}
