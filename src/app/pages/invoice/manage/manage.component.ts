import { DatePipe } from "@angular/common";
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
  theFormGroup: FormGroup; //! EL POLICIA QUIEN HACE CUMPIR LAS REGLAS
  trySend: boolean; //! YA HIZO UN INTENTO DE ENVIO
  constructor(
    private invoiceService: InvoiceService,
    private activateRoute: ActivatedRoute, //analizar la url para saber que quiere hacer el user: crear visualizar
    private router: Router, //como me muevo yo en la pagina,gestiona los archivos de .routing para poder navegar : MOVERSE DE UNA COMPONENTE A OTRA
    private theFormBuilder: FormBuilder //* PARA ESTABLECER LAS REGLAS
  ) {
    this.mode = 1;
    this.trySend = false;
    this.configFormGroup(); //* CREAR AL POLICIA
    this.invoice = {
      id: 0,
      date: new Date(),
      total: 0,
      status: false,
      quota_id: 0,
      expense_id: 0,
    };
  }

  ngOnInit(): void {
    const currentUrl = this.activateRoute.snapshot.url.join("/");
    if (currentUrl.includes("view")) {
      this.mode = 1;
      this.theFormGroup.get("date").disable();
      this.theFormGroup.get("total").disable();
      // this.theFormGroup.get("status").disable();
      this.theFormGroup.get("quota_id").disable();
      this.theFormGroup.get("expense_id").disable();
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
  //* lo del correo -importar validators
  configFormGroup() {
    //* UNION ENTRE LA POLICIA Y CONGRESO
    this.theFormGroup = this.theFormBuilder.group({
      date: ["", [Validators.required]],
      // license_number: ["", [Validators.required, Validators.minLength(5)]],
      // phone_number: ["", [Validators.required, Validators.minLength(5)]],
      total: [0, [Validators.required, Validators.pattern("^[0-9]+$")]],
      quota_id: [0, [Validators.required, Validators.pattern("^[0-9]+$")]],
      expense_id: [0, [Validators.required, Validators.pattern("^[0-9]+$")]],
    });
  }
  get getTheFormGroup() {
    //* para que devulva una variable
    return this.theFormGroup.controls; //DEVUELVE LOS CONTROLES
  }
  create() {
    if (this.theFormGroup.invalid) {
      this.trySend = true;
      Swal.fire(
        "Error en el formulario",
        "Ingrese correctamente los datos solicitados"
      );
      return;
    }
    console.log(JSON.stringify(this.invoice));
    this.invoiceService.create(this.invoice).subscribe((data) => {
      Swal.fire("Creado", " se ha creado exitosa mente", "success"); //tirulo a la alerta
      this.router.navigate(["invoice/list"]);
    });
  }

  update() {
    if (this.theFormGroup.invalid) {
      this.trySend = true;
      Swal.fire(
        "Error en el formulario",
        "Ingrese correctamente los datos solicitados"
      );
      return;
    }
    // const fecha = this.theFormGroup.get("start_date")?.value;

    console.log(JSON.stringify(this.invoice));
    this.invoiceService.update(this.invoice).subscribe((data) => {
      Swal.fire("Actualizado", " se ha actualizado exitosa mente", "success"); //titulo a la alerta
      this.router.navigate(["invoice/list"]);
    });
  }

  //aqui se arma la dataaaa
  getInvoice(id: number) {
    this.invoiceService.view(id).subscribe((data) => {
      const datePipe = new DatePipe("en-US");
      // Formatear las fechas antes de asignarlas
      const formattedtDate = datePipe.transform(data.date, "yyyy-MM-dd");
      this.invoice = data;
      console.log("date: ", formattedtDate);
      this.theFormGroup.patchValue({
        // id: this.invoice.id,
        date: formattedtDate,
        total: this.invoice.total,
        // status: this.invoice.status,
        quota_id: this.invoice.quota_id,
        expense_id: this.invoice.expense_id,
      });
      console.log(JSON.stringify(this.invoice));
      console.log(this.invoice);
    });
  }
}
