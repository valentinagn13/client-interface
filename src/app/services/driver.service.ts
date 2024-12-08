import { Injectable } from "@angular/core";
import { Driver } from "../models/driver.model";
import { Observable, tap } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class DriverService {
  // Inyección de dependencias
  constructor(private http: HttpClient) {}

  // Observable es una clase que permite manejar eventos asincronos
  list(): Observable<Driver[]> {
    return this.http.get<Driver[]>(`${environment.url_ms_business}/drivers`);
  }

  view(id: number): Observable<Driver> {
    // Listar un solo teatro
    return this.http
      .get<Driver>(`${environment.url_ms_business}/drivers/${id}`)
      .pipe(
        tap((data) => console.log("Datos recibidooooos:", data)) // Imprimir los datos recibidos
      );
  }

  delete(id: number) {
    return this.http.delete<Driver>(
      `${environment.url_ms_business}/drivers/${id}`
    );
  }

  create(Driver: Driver): Observable<Driver> {
    return this.http
      .post<Driver>(`${environment.url_ms_business}/drivers`, Driver)
      .pipe(
        tap((data) => console.log("Datos recibidooooos:", data)) // Imprimir los datos recibidos
      );
  }

  update(Driver: Driver): Observable<Driver> {
    return this.http.put<Driver>(
      `${environment.url_ms_business}/drivers/${Driver.id}`,
      Driver
    );
  }
}
