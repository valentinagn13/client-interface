import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { Role } from "../models/role.model";

@Injectable({
  providedIn: "root",
})
export class RoleService {
  baseUrl: string;

  constructor(private http: HttpClient) {
    this.baseUrl = `${environment.url_ms_security}/roles`;
  }

  getRoles(): Observable<Role[]> {
    return this.http.get<Role[]>(this.baseUrl);
  }

  getRole(id: string): Observable<Role> {
    return this.http.get<Role>(`${this.baseUrl}/${id}`);
  }

  create(role: Role): Observable<Role> {
    return this.http.post<Role>(this.baseUrl, role);
  }

  update(role: Role): Observable<Role> {
    return this.http.put<Role>(`${this.baseUrl}/${role._id}`, role);
  }

  delete(id: string): Observable<Role> {
    return this.http.delete<Role>(`${this.baseUrl}/${id}`);
  }
}
