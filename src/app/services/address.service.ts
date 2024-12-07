import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Address } from '../models/address.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AddressService {
//injection de dependencias
constructor(private http: HttpClient) {

}

 //observable es una clase que permite manejar eventos asincronos
list(): Observable<Address[]> {
 return this.http.get<Address[]>(`${environment.url_ms_business}/address`);
}

view(id:number): Observable<Address> {//listar un solo teatro
 return this.http.get<Address>(`${environment.url_ms_business}/address/${id}`);
}


delete(id: number) {
 return this.http.delete<Address>(`${environment.url_ms_business}/address/${id}`,
 );
}

create(Address: Address):Observable<Address> {
 return this.http.post<Address>(`${environment.url_ms_business}/address`, Address);
}
//en la proxima clase colocamos el interceptor

update(Address: Address):Observable<Address> {
 return this.http.put<Address>(`${environment.url_ms_business}/address/${Address.id}`, Address);
}
}
