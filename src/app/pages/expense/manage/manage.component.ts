import { Component, OnInit } from "@angular/core";
import { Expense } from "src/app/models/expense.model";
import { ExpenseService } from "src/app/services/expense.service";
import { ActivatedRoute, Router } from "@angular/router";
import Swal from "sweetalert2";

@Component({
  selector: "app-manage",
  templateUrl: "./manage.component.html",
  styleUrls: ["./manage.component.css"],
})
export class ManageComponent implements OnInit {
  expense: Expense;
  mode: number;
  constructor(
    private expenseService: ExpenseService,
    private activateRoute: ActivatedRoute, //analizar la url para saber que quiere hacer el user: crear visualizar
    private router: Router //como me muevo yo en la pagina,gestiona los archivos de .routing para poder navegar : MOVERSE DE UNA COMPONENTE A OTRA
  ) {
    this.mode = 1;
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

  create() {
    console.log(JSON.stringify(this.expense));
    this.expenseService.create(this.expense).subscribe((data) => {
      Swal.fire("Creado", " se ha creado exitosa mente", "success"); //tirulo a la alerta
      this.router.navigate(["expense/list"]);
    });
  }

  update() {
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
    });
  }
}
