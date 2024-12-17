import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Quota } from "src/app/models/quota.model";
import { QuotaService } from "src/app/services/quota.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-list",
  templateUrl: "./list.component.html",
  styleUrls: ["./list.component.css"],
})
export class ListComponent implements OnInit {
  quotas: Quota[];

  constructor(private service: QuotaService, private router: Router) {
    this.quotas = [];
  }

  //este es el primero que se llama igual que contructor pero cuando hay cambios en los componentes

  ngOnInit(): void {
    this.list();
  }

  view(id: number) {
    console.log("aqui estoy en view");

    this.router.navigate(["quotas/view/" + id]);
  }

  update(id: number) {
    this.router.navigate(["quotas/update/" + id]);
  }

  list(): void {
    this.service.list().subscribe((data) => {
      this.quotas = data;

      //console.log(JSON.stringify(data["data"]));
    });
  }
  payment(id: number) {
    console.log("HOLA DESDE PAYMENT");
    this.router.navigate(["quotas/payment/" + id]);
  }
  create() {
    this.router.navigate(["quotas/create"]);
  }

  delete(id: number) {
    Swal.fire({
      title: "Eliminar Quota",
      text: "¿Estas seguro de eliminar la Quota?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, eliminar!",
      cancelButtonText: "No, Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        this.service.delete(id).subscribe((data) => {
          Swal.fire("Eliminado!", "La Quota ha sido eliminada.", "success");

          this.ngOnInit();
        });
      }
    });
  }
}
