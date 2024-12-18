import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Driver } from "src/app/models/driver.model";
import { DriverService } from "src/app/services/driver.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-list",
  templateUrl: "./list.component.html",
  styleUrls: ["./list.component.css"],
})
export class ListComponent implements OnInit {
  driver: Driver[];
  constructor(private driverservice: DriverService, private router: Router) {
    this.driver = [];
  }

  ngOnInit(): void {
    this.list();
  }
  view(id: number) {
    console.log("aqui estoy en view");

    this.router.navigate(["driver/view/" + id]);
  }

  update(id: number) {
    this.router.navigate(["driver/update/" + id]);
  }

  list(): void {
    this.driverservice.list().subscribe((data) => {
      this.driver = data;
      console.log(data);

      //console.log(JSON.stringify(data["data"]));
    });
  }

  create() {
    this.router.navigate(["driver/create"]);
  }

  delete(id: number) {
    Swal.fire({
      title: "Eliminar conductor?",
      text: "¿Estas seguro de eliminar el conductor?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, eliminar!",
      cancelButtonText: "No, Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        this.driverservice.delete(id).subscribe((data) => {
          Swal.fire("Eliminado!", "El conductor ha sido eliminado.", "success");

          this.ngOnInit();
        });
      }
    });
  }
  showVehicleDriver(id: number) {
    console.log("HOLA DESDE VEHICLEDRIVER");
    this.router.navigate(["vehicleDriver/filterByDriver/" + id]);
  }

  showExpense(id: number) {
    this.router.navigate(["expense/filterByDriver/" + id]);
  }

}
