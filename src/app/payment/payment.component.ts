import { Component, OnInit } from "@angular/core";
import { Quota } from "../models/quota.model";
import { ActivatedRoute, Router } from "@angular/router";
import { PaymentService } from "../services/payment.service";
import { Payment } from "../models/payment";
import Swal from "sweetalert2";

@Component({
  selector: "app-payment",
  templateUrl: "./payment.component.html",
  styleUrls: ["./payment.component.css"],
})
export class PaymentComponent implements OnInit {
  payment: Payment;
  constructor(
    private paymentService: PaymentService,
    private route: ActivatedRoute, // Importar ActivatedRoute
    private router: Router
  ) {
    this.payment = {
      quota_id: 0,
      card_number: "",
      exp_year: "",
      exp_month: "",
      cvc: "",
      name: "",
      last_name: "",
      email: "",
      doc_number: "",
      city: "",
      address: "",
      phone: "",
      cell_phone: "",
    };
  }

  ngOnInit(): void {
    const quotaId = Number(this.route.snapshot.paramMap.get("id"));
    this.payment.quota_id = quotaId; // Asignar el ID al objeto payment
    console.log("Quota ID capturado:", quotaId); // Comprobación en consola
  }

  create() {
    console.log(JSON.stringify(this.payment));
    this.paymentService.create(this.payment).subscribe((data) => {
      Swal.fire("PAGO EXITOSO", " se ha pagado exitosa mente", "success"); //tirulo a la alerta
      this.router.navigate(["quotas/list"]);
    });
  }
}
