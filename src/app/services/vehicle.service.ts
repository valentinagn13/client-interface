import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Vehicle } from '../models/vehicle.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {

  //injection de dependencias
  constructor(private http: HttpClient) {

  }

  //observable es una clase que permite manejar eventos asincronos
  list(): Observable<Vehicle[]> {
    return this.http.get<Vehicle[]>(`${environment.url_ms_business}/vehicles`);
  }

  view(id: number): Observable<Vehicle> {//listar un solo teatro
    
    return this.http.get<Vehicle>(`${environment.url_ms_business}/vehicles/${id}`);
  }


  delete(id: number) {
    return this.http.delete<Vehicle>(`${environment.url_ms_business}/vehicles/${id}`,
    );
  }

  create(Vehicle: Vehicle): Observable<Vehicle> {
    return this.http.post<Vehicle>(`${environment.url_ms_business}/vehicles`, Vehicle);
  }
  //en la proxima clase colocamos el interceptor

  update(Vehicle: Vehicle): Observable<Vehicle> {
    return this.http.put<Vehicle>(`${environment.url_ms_business}/vehicles/${Vehicle.id}`, Vehicle);
  }
}
