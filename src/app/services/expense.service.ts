import { Injectable } from "@angular/core";
import { Observable, tap } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { Expense } from "../models/expense.model";

@Injectable({
  providedIn: "root",
})
export class ExpenseService {
  // Inyección de dependencias
  constructor(private http: HttpClient) {}

  // Observable es una clase que permite manejar eventos asincronos
  list(): Observable<Expense[]> {
    return this.http.get<Expense[]>(`${environment.url_ms_business}/expenses`);
  }

  view(id: number): Observable<Expense> {
    // Listar un solo teatro
    return this.http
      .get<Expense>(`${environment.url_ms_business}/expenses/${id}`)
      .pipe(
        tap((data) => console.log("Datos recibidooooos:", data)) // Imprimir los datos recibidos
      );
  }

  delete(id: number) {
    return this.http.delete<Expense>(
      `${environment.url_ms_business}/expenses/${id}`
    );
  }

  create(Expense: Expense): Observable<Expense> {
    return this.http.post<Expense>(
      `${environment.url_ms_business}/expenses`,
      Expense
    );
  }

  update(Expense: Expense): Observable<Expense> {
    return this.http.put<Expense>(
      `${environment.url_ms_business}/expenses/${Expense.id}`,
      Expense
    );
  }

  listByDriver(driver_id: number): Observable<Expense[]> {
        return this.http.get<Expense[]>(`${
          environment.url_ms_business
        }/expenses?driver_id=${driver_id}`);
        
      }
      createForDriver(driver_id: number, expense: Expense): Observable<Expense> {
        return this.http.post<Expense>(`${environment.url_ms_business}/expenses/driver/${driver_id}`, expense);
      }
    
      listByService(service_id: number): Observable<Expense[]> {
        return this.http.get<Expense[]>(`${
          environment.url_ms_business
        }/expenses?service_id=${service_id}`);
        
      }
      createForService(service_id: number, operation: Expense): Observable<Expense> {
        return this.http.post<Expense>(`${environment.url_ms_business}/expenses/service/${service_id}`, operation);
      }

      listByOwner(owner_id: number): Observable<Expense[]> {
        return this.http.get<Expense[]>(`${
          environment.url_ms_business
        }/expenses?owner_id=${owner_id}`);
        
      }
      createForOwner(owner_id: number, expense: Expense): Observable<Expense> {
        return this.http.post<Expense>(`${environment.url_ms_business}/expenses/owner/${owner_id}`, expense);
      }
      
}
