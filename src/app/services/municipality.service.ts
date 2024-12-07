import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Municipality } from '../models/municipality.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MunicipalityService {
//injection de dependencias
constructor(private http: HttpClient) {

}

 //observable es una clase que permite manejar eventos asincronos
list(): Observable<Municipality[]> {
 return this.http.get<Municipality[]>(`${environment.url_ms_business}/api/municipalities`);
}

view(id:number): Observable<Municipality> {//listar un solo teatro
 return this.http.get<Municipality>(`${environment.url_ms_business}/api/municipalities/${id}`);
}


delete(id: number) {
 return this.http.delete<Municipality>(`${environment.url_ms_business}/api/municipalities/${id}`,
 );
}

create(Municipality: Municipality):Observable<Municipality> {
 return this.http.post<Municipality>(`${environment.url_ms_business}/api/municipalities`, Municipality);
}
//en la proxima clase colocamos el interceptor

update(Municipality: Municipality):Observable<Municipality> {
 return this.http.put<Municipality>(`${environment.url_ms_business}/api/municipalities/${Municipality.id}`, Municipality);
}

}
