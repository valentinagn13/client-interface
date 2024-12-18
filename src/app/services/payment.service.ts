import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Payment } from "../models/payment";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class PaymentService {
  constructor(private http: HttpClient) {}

  create(Payment: Payment): Observable<Payment> {
    return this.http.post<Payment>(
      `${environment.url_ms_payments}/process_payment`,
      Payment
    );
  }
}
