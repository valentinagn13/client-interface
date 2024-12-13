import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Addrerouteorder } from '../models/addrerouteorder.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AddrerouteorderService {

   //injection de dependencias
   constructor(private http: HttpClient) {

   }
 
   //observable es una clase que permite manejar eventos asincronos
   list(): Observable<Addrerouteorder[]> {
     return this.http.get<Addrerouteorder[]>(`${environment.url_ms_business}/addreRouteOrders`);
   }
 
   view(id: number): Observable<Addrerouteorder> {//listar un solo teatro
     
     return this.http.get<Addrerouteorder>(`${environment.url_ms_business}/addreRouteOrders/${id}`);
   }
 
 
   delete(id: number) {
     return this.http.delete<Addrerouteorder>(`${environment.url_ms_business}/addreRouteOrders/${id}`,
     );
   }
 
   create(Addrerouteorder: Addrerouteorder): Observable<Addrerouteorder> {
     return this.http.post<Addrerouteorder>(`${environment.url_ms_business}/addreRouteOrders`, Addrerouteorder);
   }
   //en la proxima clase colocamos el interceptor
 
   update(Addrerouteorder: Addrerouteorder): Observable<Addrerouteorder> {
     return this.http.put<Addrerouteorder>(`${environment.url_ms_business}/addreRouteOrders/${Addrerouteorder.id}`, Addrerouteorder);
   }

   listByRoute(route_id: number): Observable<Addrerouteorder[]> {
         return this.http.get<Addrerouteorder[]>(`${
           environment.url_ms_business
         }/addreRouteOrders?route_id=${route_id}`);
         
       }
       createForRoute(route_id: number, addreRouteOrders: Addrerouteorder): Observable<Addrerouteorder> {
         return this.http.post<Addrerouteorder>(`${environment.url_ms_business}/addreRouteOrders/route/${route_id}`, addreRouteOrders);
       }
     
       listByAddress(address_id: number): Observable<Addrerouteorder[]> {
         return this.http.get<Addrerouteorder[]>(`${
           environment.url_ms_business
         }/addreRouteOrders?address_id=${address_id}`);
         
       }
       createForAddress(address_id: number, addreRouteOrders: Addrerouteorder): Observable<Addrerouteorder> {
         return this.http.post<Addrerouteorder>(`${environment.url_ms_business}/addreRouteOrders/address/${address_id}`, addreRouteOrders);
       }
}
