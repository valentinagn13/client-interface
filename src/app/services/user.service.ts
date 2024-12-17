import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { Role } from "../models/role.model";
import { User } from "../models/user.model";

@Injectable({
  providedIn: "root",
})
export class UserService {
  baseUrl: string;
  constructor(private http: HttpClient) {
    this.baseUrl = `${environment.url_ms_security}/users`;
  }
  view(id: string): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}/${id}`);
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.baseUrl);
  }

  getUser(id: string): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}/${id}`);
  }

  create(user: User): Observable<User> {
    return this.http.post<User>(this.baseUrl, user);
  }

  update(user: User): Observable<User> {
    return this.http.put<User>(`${this.baseUrl}/${user._id}`, user);
  }

  delete(id: string): Observable<User> {
    return this.http.delete<User>(`${this.baseUrl}/${id}`);
  }

  matchRole(user: User, role: Role): Observable<User> {
    return this.http.put<User>(
      `${this.baseUrl}/${user._id}/role/${role._id}`,
      null
    );
  }
 getUserByEmail(email: string): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}/email/${email}`);
  }
}
