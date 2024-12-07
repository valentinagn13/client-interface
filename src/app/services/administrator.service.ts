import { Injectable } from '@angular/core';
import { Observable, tap } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { Administrator } from '../models/administrator.model';

@Injectable({
  providedIn: "root",
})
export class AdministratorService {
  // Inyección de dependencias
  constructor(private http: HttpClient) {}

  // Observable es una clase que permite manejar eventos asincronos
  list(): Observable<Administrator[]> {
    return this.http.get<Administrator[]>(`${environment.url_ms_business}/administrators`);
  }

  view(id: number): Observable<Administrator> {
    // Listar un solo teatro
    return this.http
      .get<Administrator>(`${environment.url_ms_business}/administrators/${id}`)
      .pipe(
        tap((data) => console.log("Datos recibidooooos:", data)) // Imprimir los datos recibidos
      );
  }

  delete(id: number) {
    return this.http.delete<Administrator>(
      `${environment.url_ms_business}/administrators/${id}`
    );
  }

  create(Administrator: Administrator): Observable<Administrator> {
    return this.http.post<Administrator>(
      `${environment.url_ms_business}/administrators`,
      Administrator
    );
  }

  update(Administrator: Administrator): Observable<Administrator> {
    return this.http.put<Administrator>(
      `${environment.url_ms_business}/administrators/${Administrator.id}`,
      Administrator
    );
  }
}

