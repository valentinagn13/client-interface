import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Owner } from "src/app/models/owner.model";
import { OwnerService } from "src/app/services/owner.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-list",
  templateUrl: "./list.component.html",
  styleUrls: ["./list.component.css"],
})
export class ListComponent implements OnInit {
  owner: Owner[];
  constructor(private ownerservice: OwnerService, private router: Router) {
    this.owner = [];
  }

  ngOnInit(): void {
    this.list();
  }
  view(id: number) {
    console.log("aqui estoy en view");

    this.router.navigate(["owners/view/" + id]);
  }

  update(id: number) {
    this.router.navigate(["owners/update/" + id]);
  }

  list(): void {
    this.ownerservice.list().subscribe((data) => {
      this.owner = data;
      console.log(data);

      //console.log(JSON.stringify(data["data"]));
    });
  }

  create() {
    this.router.navigate(["owners/create"]);
  }

  delete(id: number) {
    Swal.fire({
      title: "Eliminar factura?",
      text: "¿Estas seguro de eliminar la factura?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, eliminar!",
      cancelButtonText: "No, Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        this.ownerservice.delete(id).subscribe((data) => {
          Swal.fire("Eliminada!", "El factura ha sido eliminada.", "success");

          this.ngOnInit();
        });
      }
    });
  }
  showVehicleOwners(id: number) {
    this.router.navigate(["vehicleOwners/filterByOwner/" + id]);
  }

  showExpense(id: number) {
    this.router.navigate(["expense/filterByOwner/" + id]);
  }
}
