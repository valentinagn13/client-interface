import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";

import { Client } from "../models/client.model";

@Injectable({
  providedIn: "root",
})
export class ClientService {
  constructor(private http: HttpClient) {}

  list(): Observable<Client[]> {
    return this.http.get<Client[]>(`${environment.url_ms_business}/clients`);
  }

  view(id: number): Observable<Client> {
    return this.http.get<Client>(
      `${environment.url_ms_business}/clients/${id}`
    );
  }

  delete(id: number) {
    return this.http.delete<Client>(
      `${environment.url_ms_business}/clients/${id}`
    );
  }

  create(client: Client): Observable<Client> {
    return this.http.post<Client>(
      `${environment.url_ms_business}/clients`,
      client
    );
  }

  update(client: Client): Observable<Client> {
    return this.http.put<Client>(
      `${environment.url_ms_business}/clients/${client.id}`,
      client
    );
  }
}
