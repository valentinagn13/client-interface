import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { Contract } from "../models/contract.model";
@Injectable({
  providedIn: "root",
})
export class ContractService {
  constructor(private http: HttpClient) {}

  list(): Observable<Contract[]> {
    return this.http.get<Contract[]>(
      `${environment.url_ms_business}/contracts`
    );
  }

  view(id: number): Observable<Contract> {
    return this.http.get<Contract>(
      `${environment.url_ms_business}/contracts/${id}`
    );
  }

  delete(id: number) {
    return this.http.delete<Contract>(
      `${environment.url_ms_business}/contracts/${id}`
    );
  }

  create(contract: Contract): Observable<Contract> {
    return this.http.post<Contract>(
      `${environment.url_ms_business}/contracts`,
      contract
    );
  }

  update(contract: Contract): Observable<Contract> {
    return this.http.put<Contract>(
      `${environment.url_ms_business}/contracts/${contract.id}`,
      contract
    );
  }
}
