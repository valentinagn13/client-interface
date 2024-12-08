import { Component, OnInit } from "@angular/core";
import { Expense } from "src/app/models/expense.model";
import { ExpenseService } from "src/app/services/expense.service";
import { ActivatedRoute, Router } from "@angular/router";
import Swal from "sweetalert2";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: "app-manage",
  templateUrl: "./manage.component.html",
  styleUrls: ["./manage.component.css"],
})
export class ManageComponent implements OnInit {
  expense: Expense;
  mode: number;
  theFormGroup: FormGroup; //! EL POLICIA QUIEN HACE CUMPIR LAS REGLAS
  trySend: boolean;
  constructor(
    private expenseService: ExpenseService,
    private activateRoute: ActivatedRoute, //analizar la url para saber que quiere hacer el user: crear visualizar
    private router: Router, //como me muevo yo en la pagina,gestiona los archivos de .routing para poder navegar : MOVERSE DE UNA COMPONENTE A OTRA
    private theFormBuilder: FormBuilder //* PARA ESTABLECER LAS REGLAS
  ) {
    this.mode = 1;
    this.trySend = false;
    this.configFormGroup(); //* CREAR AL POLICIA
    this.expense = {
      id: 0,
      amount: 0,
      service_id: 0,
      driver_id: 0,
      owner_id: 0,
    };
  }
  ngOnInit(): void {
    const currentUrl = this.activateRoute.snapshot.url.join("/");
    if (currentUrl.includes("view")) {
      this.mode = 1;
      this.theFormGroup.get("amount").disable();
      this.theFormGroup.get("service_id").disable();
      this.theFormGroup.get("driver_id").disable();
      this.theFormGroup.get("owner_id").disable();
    } else if (currentUrl.includes("create")) {
      this.mode = 2;
    } else if (currentUrl.includes("update")) {
      this.mode = 3;
    }
    if (this.activateRoute.snapshot.params.id) {
      this.expense.id = this.activateRoute.snapshot.params.id;
      this.getExpense(this.expense.id);
    }
  }
  configFormGroup() {
    //* UNION ENTRE LA POLICIA Y CONGRESO
    this.theFormGroup = this.theFormBuilder.group({
      amount: [0, [Validators.required, Validators.pattern("^[0-9]+$")]],
      service_id: [0, [Validators.required, Validators.pattern("^[0-9]+$")]],
      driver_id: [0, [Validators.required, Validators.pattern("^[0-9]+$")]],
      owner_id: [0, [Validators.required, Validators.pattern("^[0-9]+$")]],
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
    console.log(JSON.stringify(this.expense));
    this.expenseService.create(this.expense).subscribe((data) => {
      Swal.fire("Creado", " se ha creado exitosa mente", "success"); //tirulo a la alerta
      this.router.navigate(["expense/list"]);
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
    console.log(JSON.stringify(this.expense));
    this.expenseService.update(this.expense).subscribe((data) => {
      Swal.fire("Actualizado", " se ha actualizado exitosa mente", "success"); //titulo a la alerta
      this.router.navigate(["expense/list"]);
    });
  }

  //aqui se arma la dataaaa
  getExpense(id: number) {
    this.expenseService.view(id).subscribe((data) => {
      this.expense = data;
      console.log(JSON.stringify(this.expense));
      console.log(this.expense);
      this.theFormGroup.patchValue({
        amount: this.expense.amount,
        service_id: this.expense.service_id,
        driver_id: this.expense.driver_id,
        owner_id: this.expense.owner_id,
      });
      console.log(JSON.stringify(this.expense));
      console.log(this.expense);
    });
  }
}
