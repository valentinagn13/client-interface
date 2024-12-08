import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { Vehicledriver } from '../models/vehicledriver.model';

@Injectable({
  providedIn: "root",
})
export class VehicledriverService {
  //injection de dependencias
  constructor(private http: HttpClient) {}

  //observable es una clase que permite manejar eventos asincronos
  list(): Observable<Vehicledriver[]> {
    return this.http.get<Vehicledriver[]>(
      `${environment.url_ms_business}/vehicleDrivers`
    );
  }

  view(id: number): Observable<Vehicledriver> {
    //listar un solo teatro

    return this.http.get<Vehicledriver>(
      `${environment.url_ms_business}/vehicleDrivers/${id}`
    );
  }

  delete(id: number) {
    return this.http.delete<Vehicledriver>(
      `${environment.url_ms_business}/vehicleDrivers/${id}`
    );
  }

  create(VehicleDriver: Vehicledriver): Observable<Vehicledriver> {
    return this.http.post<Vehicledriver>(
      `${environment.url_ms_business}/vehicleDrivers`,
      VehicleDriver
    );
  }
  //en la proxima clase colocamos el interceptor

  update(VehicleDriver: Vehicledriver): Observable<Vehicledriver> {
    return this.http.put<Vehicledriver>(
      `${environment.url_ms_business}/vehicleDrivers/${VehicleDriver.id}`,
      VehicleDriver
    );
  }
}
