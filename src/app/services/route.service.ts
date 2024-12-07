import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";

import { Routes } from "../models/routes.model";

@Injectable({
  providedIn: "root",
})
export class RouteService {
  //*INYECTAR LA VARIABLE HTTP CLIENT LA CREA EL MISMO FRAMEWORK PERMITE HACER LOS METODOS DE GET POST AND DELETE
  constructor(private http: HttpClient) {}
  list(): Observable<Routes[]> {
    return this.http.get<Routes[]>(`${environment.url_ms_business}/routes`);
  }
  delete(id: number) {
    return this.http.delete<Routes>(
      `${environment.url_ms_business}/routes/${id}`
    );
  }
  view(id: number): Observable<Routes> {
    return this.http.get<Routes>(
      `${environment.url_ms_business}/routes/${id}`
    );
  }
  create(route: Routes): Observable<Routes> {
    delete route.id; //para borrar el id
    return this.http.post<Routes>(
      `${environment.url_ms_business}/routes`,
      route
    );
  }
  update(route: Routes): Observable<Routes> {
    return this.http.put<Routes>(
      `${environment.url_ms_business}/routes/${route.id}`,
      route //hay que anexarle un body
    );
  }
}
