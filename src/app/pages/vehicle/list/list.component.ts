import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Vehicle } from "src/app/models/vehicle.model";
import { VehicleService } from "src/app/services/vehicle.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-list",
  templateUrl: "./list.component.html",
  styleUrls: ["./list.component.css"],
})
export class ListComponent implements OnInit {
  vehicles: Vehicle[];

  constructor(private service: VehicleService, private router: Router) {
    this.vehicles = [];
  }

  //este es el primero que se llama igual que contructor pero cuando hay cambios en los componentes

  ngOnInit(): void {
    this.list();
  }

  view(id: number) {
    console.log("aqui estoy en view");

    this.router.navigate(["vehicles/view/" + id]);
  }

  update(id: number) {
    this.router.navigate(["vehicles/update/" + id]);
  }

  list(): void {
    this.service.list().subscribe((data) => {
      console.log(data);

      this.vehicles = data;
    });
  }
  location(id: number) {
    console.log("HOLA DESDE LOCATION");
    this.router.navigate(["vehicles/location/" + id]);
  }

  create() {
    this.router.navigate(["vehicles/create"]);
  }

  delete(id: number) {
    Swal.fire({
      title: "Eliminar Vehiculo",
      text: "¿Estas seguro de eliminar el Vehiculo?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, eliminar!",
      cancelButtonText: "No, Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        this.service.delete(id).subscribe((data) => {
          Swal.fire("Eliminado!", "El Vehiculo ha sido eliminado.", "success");

          this.ngOnInit();
        });
      }
    });
  }

  showOperations(id: number) {
    this.router.navigate(["operations/filterByVehicle/" + id]);
  }
  showVehicleOwners(id: number) {
    this.router.navigate(["vehicleOwners/filterByVehicle/" + id]);
  }

  showVehicleDriver(id: number) {
    this.router.navigate(["vehicleDriver/filterByVehicle/" + id]);
  }

  showRoute(id: number) {
    this.router.navigate(["routes/filterByVehicle/" + id]);
  }
  
  showInsurance(id: number) {
    this.router.navigate(["insurances/filterByVehicle/" + id]);
  }
}
