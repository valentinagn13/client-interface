import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";

import { Naturalperson } from "../models/naturalperson.model";

@Injectable({
  providedIn: "root",
})
export class NaturalpersonService {
  constructor(private http: HttpClient) {}

  list(): Observable<Naturalperson[]> {
    return this.http.get<Naturalperson[]>(
      `${environment.url_ms_business}/naturalPeople`
    );
  }

  view(id: number): Observable<Naturalperson> {
    return this.http.get<Naturalperson>(
      `${environment.url_ms_business}/naturalPeople/${id}`
    );
  }

  delete(id: number) {
    return this.http.delete<Naturalperson>(
      `${environment.url_ms_business}/naturalPeople/${id}`
    );
  }

  create(naturalperson: Naturalperson): Observable<Naturalperson> {
    return this.http.post<Naturalperson>(
      `${environment.url_ms_business}/naturalPeople`,
      naturalperson
    );
  }

  update(naturalperson: Naturalperson): Observable<Naturalperson> {
    return this.http.put<Naturalperson>(
      `${environment.url_ms_business}/naturalPeople/${naturalperson.id}`,
      naturalperson
    );
  }
}
