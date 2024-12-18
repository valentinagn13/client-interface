import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Vehicle } from '../models/vehicle.model';
import { Vehicleowner } from '../models/vehicleowner.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VehicleownerService {

   //injection de dependencias
   constructor(private http: HttpClient) {

   }
 
   //observable es una clase que permite manejar eventos asincronos
   list(): Observable<Vehicleowner[]> {
     return this.http.get<Vehicleowner[]>(`${environment.url_ms_business}/vehicleOwners`);
   }
 
   view(id: number): Observable<Vehicleowner> {//listar un solo teatro
     
     return this.http.get<Vehicleowner>(`${environment.url_ms_business}/vehicleOwners/${id}`);
   }
 
 
   delete(id: number) {
     return this.http.delete<Vehicleowner>(`${environment.url_ms_business}/vehicleOwners/${id}`,
     );
   }
 
   create(Vehicleowner: Vehicleowner): Observable<Vehicleowner> {
     return this.http.post<Vehicleowner>(`${environment.url_ms_business}/vehicleOwners`, Vehicleowner);
   }
   //en la proxima clase colocamos el interceptor
 
   update(Vehicleowner: Vehicleowner): Observable<Vehicleowner> {
     return this.http.put<Vehicleowner>(`${environment.url_ms_business}/vehicleOwners/${Vehicleowner.id}`, Vehicleowner);
   }
     listByOwner(owner_id: number): Observable<Vehicleowner[]> {
         return this.http.get<Vehicleowner[]>(`${
           environment.url_ms_business
         }/vehicleOwners?owner_id=${owner_id}`);
         
       }
       createForOwner(owner_id: number, operation: Vehicleowner): Observable<Vehicleowner> {
         return this.http.post<Vehicleowner>(`${environment.url_ms_business}/vehicleOwners/owner/${owner_id}`, operation);
       }
     
       listByVehicle(vehicle_id: number): Observable<Vehicleowner[]> {
         return this.http.get<Vehicleowner[]>(`${
           environment.url_ms_business
         }/vehicleOwners?vehicle_id=${vehicle_id}`);
         
       }
       createForVehicle(vehicle_id: number, vehicleOwners: Vehicleowner): Observable<Vehicleowner> {
         return this.http.post<Vehicleowner>(`${environment.url_ms_business}/vehicleOwners/vehicle/${vehicle_id}`, vehicleOwners);
       }
}
