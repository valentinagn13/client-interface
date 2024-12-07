import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Department } from '../models/department.model';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {
  //injection de dependencias
  constructor(private http: HttpClient) {

   }

    //observable es una clase que permite manejar eventos asincronos
  list(): Observable<Department[]> {
    return this.http.get<Department[]>(`${environment.url_ms_business}/api/departments`);
  }

  view(id:number): Observable<Department> {//listar un solo teatro
    return this.http.get<Department>(`${environment.url_ms_business}/api/departments/${id}`);
  }


  delete(id: number) {
    return this.http.delete<Department>(`${environment.url_ms_business}/api/departments/${id}`,
    );
  }

  create(Department: Department):Observable<Department> {
    return this.http.post<Department>(`${environment.url_ms_business}/api/departments`, Department);
  }
  //en la proxima clase colocamos el interceptor

  update(Department: Department):Observable<Department> {
    return this.http.put<Department>(`${environment.url_ms_business}/api/departments/${Department.id}`, Department);
  }
}
