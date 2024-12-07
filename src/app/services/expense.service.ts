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
}
