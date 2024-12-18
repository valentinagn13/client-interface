import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { Permission } from "../models/permission.model";

@Injectable({
  providedIn: "root",
})
export class PermissionService {
  baseUrl: string;

  constructor(private http: HttpClient) {
    this.baseUrl = `${environment.url_ms_security}/permissions`;
  }

  getPermissions(): Observable<Permission[]> {
    return this.http.get<Permission[]>(this.baseUrl);
  }

  getPermission(id: string): Observable<Permission> {
    return this.http.get<Permission>(`${this.baseUrl}/${id}`);
  }

  create(permission: Permission): Observable<Permission> {
    return this.http.post<Permission>(this.baseUrl, permission);
  }

  update(permission: Permission): Observable<Permission> {
    return this.http.put<Permission>(
      `${this.baseUrl}/${permission._id}`,
      permission,
    );
  }

  delete(id: string): Observable<Permission> {
    return this.http.delete<Permission>(`${this.baseUrl}/${id}`);
  }
}
