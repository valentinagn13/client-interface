import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { log } from "console";
import { Invoice } from "src/app/models/invoice.model";
import { InvoiceService } from "src/app/services/invoice.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-manage",
  templateUrl: "./manage.component.html",
  styleUrls: ["./manage.component.css"],
})
export class ManageComponent implements OnInit {
  invoice: Invoice;
  //mode=1 --> viw  , mode=2--> create ,  mode =3 update
  mode: number;

  constructor(
    private invoiceService: InvoiceService,
    private activateRoute: ActivatedRoute, //analizar la url para saber que quiere hacer el user: crear visualizar
    private router: Router //como me muevo yo en la pagina,gestiona los archivos de .routing para poder navegar : MOVERSE DE UNA COMPONENTE A OTRA
  ) {
    this.mode = 1;
    this.invoice = {
      id: 0,
      date: new Date(),
      total: 0,
      status: false,
      quota_id: 0,
      expense_id:0
    };
  }

  ngOnInit(): void {
    const currentUrl = this.activateRoute.snapshot.url.join("/");
    if (currentUrl.includes("view")) {
      this.mode = 1;
    } else if (currentUrl.includes("create")) {
      this.mode = 2;
    } else if (currentUrl.includes("update")) {
      this.mode = 3;
    }
    if (this.activateRoute.snapshot.params.id) {
      this.invoice.id = this.activateRoute.snapshot.params.id;
      this.getInvoice(this.invoice.id);
    }
  }

  create() {
    console.log(JSON.stringify(this.invoice));
    this.invoiceService.create(this.invoice).subscribe((data) => {
      Swal.fire("Creado", " se ha creado exitosa mente", "success"); //tirulo a la alerta
      this.router.navigate(["invoice/list"]);
    });
  }

  update() {
    console.log(JSON.stringify(this.invoice));
    this.invoiceService.update(this.invoice).subscribe((data) => {
      Swal.fire("Actualizado", " se ha actualizado exitosa mente", "success"); //titulo a la alerta
      this.router.navigate(["invoice/list"]);
    });
  }

  //aqui se arma la dataaaa
  getInvoice(id: number) {
    this.invoiceService.view(id).subscribe((data) => {
      this.invoice = data;
      console.log(JSON.stringify(this.invoice));
      console.log(this.invoice);
    });
  }
}
