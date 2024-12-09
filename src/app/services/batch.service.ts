import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";

import { Batch } from "../models/batch.model";

@Injectable({
  providedIn: "root",
})
export class BatchService {
  constructor(private http:HttpClient) {}

  list():Observable<Batch[]>{
    return this.http.get<Batch[]>(`${environment.url_ms_business}/batches`);
  }

  view(id:number):Observable<Batch>{
    return this.http.get<Batch>(`${environment.url_ms_business}/batches/${id}`);
  }

  delete(id:number){
    return this.http.delete<Batch>(`${environment.url_ms_business}/batches/${id}`);
  }

  create(batch:Batch):Observable<Batch>{
    return this.http.post<Batch>(`${environment.url_ms_business}/batches`,batch);
  }

  update(batch:Batch):Observable<Batch>{
    return this.http.put<Batch>(`${environment.url_ms_business}/batches/${batch.id}`,batch);
  }
}
