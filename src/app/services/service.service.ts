import { Injectable } from "@angular/core";
import { Observable, tap } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { Service } from "../models/service.model";

@Injectable({
  providedIn: "root",
})
export class ServiceService {
  // Inyección de dependencias
  constructor(private http: HttpClient) {}

  // Observable es una clase que permite manejar eventos asincronos
  list(): Observable<Service[]> {
    return this.http.get<Service[]>(`${environment.url_ms_business}/services`);
  }

  view(id: number): Observable<Service> {
    // Listar un solo teatro
    return this.http
      .get<Service>(`${environment.url_ms_business}/services/${id}`)
      .pipe(
        tap((data) => console.log("Datos recibidooooos:", data)) // Imprimir los datos recibidos
      );
  }

  delete(id: number) {
    return this.http.delete<Service>(
      `${environment.url_ms_business}/services/${id}`
    );
  }

  create(Service: Service): Observable<Service> {
    return this.http.post<Service>(
      `${environment.url_ms_business}/services`,
      Service
    );
  }

  update(Service: Service): Observable<Service> {
    return this.http.put<Service>(
      `${environment.url_ms_business}/services/${Service.id}`,
      Service
    );
  }
}
