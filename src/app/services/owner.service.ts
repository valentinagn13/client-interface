import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Owner } from '../models/owner.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: "root",
})
export class OwnerService {
  //injection de dependencias
  constructor(private http: HttpClient) {}

  //observable es una clase que permite manejar eventos asincronos
  list(): Observable<Owner[]> {
    return this.http.get<Owner[]>(`${environment.url_ms_business}/owners`);
  }

  view(id: number): Observable<Owner> {
    //listar un solo teatro

    return this.http.get<Owner>(`${environment.url_ms_business}/owners/${id}`);
  }
  //observable es una clase que permite manejar eventos asincronos

  delete(id: number) {
    return this.http.delete<Owner>(
      `${environment.url_ms_business}/owners/${id}`
    );
  }

  create(Owner: Owner): Observable<Owner> {
    return this.http.post<Owner>(
      `${environment.url_ms_business}/owners`,
      Owner
    );
  }
  //en la proxima clase colocamos el interceptor

  update(Owner: Owner): Observable<Owner> {
    return this.http.put<Owner>(
      `${environment.url_ms_business}/owners/${Owner.id}`,
      Owner
    );
  }
}
