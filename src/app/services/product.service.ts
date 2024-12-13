import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { Product } from "../models/product.model";


@Injectable({
  providedIn: "root",
})
export class ProductService {
  //injection de dependencias
  constructor(private http: HttpClient) {}

  //observable es una clase que permite manejar eventos asincronos
  list(): Observable<Product[]> {
    return this.http.get<Product[]>(`${environment.url_ms_business}/products`);
  }

  view(id: number): Observable<Product> {

    return this.http.get<Product>(
      `${environment.url_ms_business}/products/${id}`
    );
  }

  delete(id: number) {
    return this.http.delete<Product>(
      `${environment.url_ms_business}/products/${id}`
    );
  }

  create(Product: Product): Observable<Product> {
    return this.http.post<Product>(
      `${environment.url_ms_business}/products`,
      Product
    );
  }

  update(Product: Product): Observable<Product> {
    return this.http.put<Product>(
      `${environment.url_ms_business}/products/${Product.id}`,
      Product
    );
  }

  listByBatch(batchId: number): Observable<Product[]> {
    return this.http.get<Product[]>(`${
      environment.url_ms_business
    }/products?batch_id=${batchId}`);
    
  }
  createForBatch(batch_id: number, product: Product): Observable<Product> {
    return this.http.post<Product>(`${environment.url_ms_business}/products/batch/${batch_id}`, product);
  }

  listByClient(client_id: number): Observable<Product[]> {
    return this.http.get<Product[]>(`${
      environment.url_ms_business
    }/products?client_id=${client_id}`);
    
  }
  createForClient(client_id: number, product: Product): Observable<Product> {
    return this.http.post<Product>(`${environment.url_ms_business}/products/client/${client_id}`, product);
  }
}
