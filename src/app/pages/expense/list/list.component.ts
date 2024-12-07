import { Component, OnInit } from "@angular/core";
import { Expense } from "src/app/models/expense.model";
import { ExpenseService } from "src/app/services/expense.service";
import Swal from "sweetalert2";
import { Router } from "@angular/router";

@Component({
  selector: "app-list",
  templateUrl: "./list.component.html",
  styleUrls: ["./list.component.css"],
})
export class ListComponent implements OnInit {
  expense: Expense[];
  constructor(private expenseservice: ExpenseService, private router: Router) {
    this.expense = [];
  }

  ngOnInit(): void {
    this.list();
  }
  view(id: number) {
    console.log("aqui estoy en view");

    this.router.navigate(["expense/view/" + id]);
  }

  update(id: number) {
    this.router.navigate(["expense/update/" + id]);
  }

  list(): void {
    this.expenseservice.list().subscribe((data) => {
      this.expense = data;
      console.log(data);

      //console.log(JSON.stringify(data["data"]));
    });
  }

  create() {
    this.router.navigate(["expense/create"]);
  }

  delete(id: number) {
    Swal.fire({
      title: "Eliminar gasto?",
      text: "¿Estas seguro de eliminar el gasto?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, eliminar!",
      cancelButtonText: "No, Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        this.expenseservice.delete(id).subscribe((data) => {
          Swal.fire("Eliminado!", "El conductor ha sido eliminado.", "success");

          this.ngOnInit();
        });
      }
    });
  }
}
