import { Injectable } from '@angular/core';
import { DistributionCenter } from '../models/distribution-center.model';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DistributionCenterService {
//injection de dependencias
constructor(private http: HttpClient) {

}

 //observable es una clase que permite manejar eventos asincronos
list(): Observable<DistributionCenter[]> {
 return this.http.get<DistributionCenter[]>(`${environment.url_ms_business}/distributionCenter`);
}

view(id:number): Observable<DistributionCenter> {//listar un solo teatro
 return this.http.get<DistributionCenter>(`${environment.url_ms_business}/distributionCenter/${id}`);
}


delete(id: number) {
 return this.http.delete<DistributionCenter>(`${environment.url_ms_business}/distributionCenter/${id}`,
 );
}

create(DistributionCenter: DistributionCenter):Observable<DistributionCenter> {
 return this.http.post<DistributionCenter>(`${environment.url_ms_business}/distributionCenter`, DistributionCenter);
}
//en la proxima clase colocamos el interceptor

update(DistributionCenter: DistributionCenter):Observable<DistributionCenter> {
 return this.http.put<DistributionCenter>(`${environment.url_ms_business}/distributionCenter/${DistributionCenter.id}`, DistributionCenter);
}
}
