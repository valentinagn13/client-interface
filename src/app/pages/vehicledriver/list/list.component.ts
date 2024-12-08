import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Vehicledriver } from "src/app/models/vehicledriver.model";
import { VehicledriverService } from "src/app/services/vehicledriver.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-list",
  templateUrl: "./list.component.html",
  styleUrls: ["./list.component.css"],
})
export class ListComponent implements OnInit {
  vehicledriver: Vehicledriver[];

  constructor(private service: VehicledriverService, private router: Router) {
    this.vehicledriver = [];
  }

  //este es el primero que se llama igual que contructor pero cuando hay cambios en los componentes

  ngOnInit(): void {
    this.list();
  }

  view(id: number) {
    console.log("aqui estoy en view");

    this.router.navigate(["vehicleDriver/view/" + id]);
  }

  update(id: number) {
    this.router.navigate(["vehicleDriver/update/" + id]);
  }

  list(): void {
    this.service.list().subscribe((data) => {
      this.vehicledriver = data;
      //console.log(JSON.stringify(data["data"]));
    });
  }

  create() {
    this.router.navigate(["vehicleDriver/create"]);
  }

  delete(id: number) {
    Swal.fire({
      title: "Eliminar vehicledriver",
      text: "¿Estas seguro de eliminar el vehicledriver?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, eliminar!",
      cancelButtonText: "No, Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        this.service.delete(id).subscribe((data) => {
          Swal.fire(
            "Eliminado!",
            "El vehicledriver ha sido eliminado.",
            "success"
          );

          this.ngOnInit();
        });
      }
    });
  }
}
