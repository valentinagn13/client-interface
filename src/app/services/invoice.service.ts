import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, tap } from "rxjs";
import { Invoice } from "../models/invoice.model";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class InvoiceService {
  // Inyección de dependencias
  constructor(private http: HttpClient) {}

  // Observable es una clase que permite manejar eventos asincronos
  list(): Observable<Invoice[]> {
    return this.http.get<Invoice[]>(`${environment.url_ms_business}/invoices`);
  }

  view(id: number): Observable<Invoice> {
    // Listar un solo teatro
    return this.http
      .get<Invoice>(`${environment.url_ms_business}/invoices/${id}`)
      .pipe(
        tap((data) => console.log("Datos recibidooooos:", data)) // Imprimir los datos recibidos
      );
  }

  delete(id: number) {
    return this.http.delete<Invoice>(
      `${environment.url_ms_business}/invoices/${id}`
    );
  }

  create(Invoice: Invoice): Observable<Invoice> {
    return this.http.post<Invoice>(
      `${environment.url_ms_business}/invoices`,
      Invoice
    );
  }

  update(Invoice: Invoice): Observable<Invoice> {
    return this.http.put<Invoice>(
      `${environment.url_ms_business}/invoices/${Invoice.id}`,
      Invoice
    );
  }
}
