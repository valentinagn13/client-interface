import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
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
  driver_id:number
  vehicle_id:number
  constructor(private service: VehicledriverService, private router: Router, private activateRoute: ActivatedRoute) {
    this.vehicledriver = [];
  }

  //este es el primero que se llama igual que contructor pero cuando hay cambios en los componentes

  ngOnInit(): void {
    const currentUrl = this.activateRoute.snapshot.url.join('/');
    
    // Reiniciar municipality_id y vehicle_id
    this.driver_id = null;
    this.vehicle_id = null;
  
    // Verificar si estamos filtrando por municipio
    if (currentUrl.includes('filterByDriver')) {
      this.driver_id = +this.activateRoute.snapshot.params['id'];
      console.log("driver_id:", this.driver_id);
      this.filterByDriver();
      console.log("vehicle_id:", this.vehicle_id);
      

    } 
    // Verificar si estamos filtrando por vehiculo
    else if (currentUrl.includes('filterByVehicle')) {
      this.vehicle_id = +this.activateRoute.snapshot.params['id'];
      console.log("vehicle_id:", this.vehicle_id);
      this.filterByVehicle();
      console.log("driver_id:", this.driver_id);
      
    } 
    // Si no hay filtro específico, listar todos las operaciones
    else {
      this.list();
    }
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
  
  //Funcion para filtrar por municipio
  filterByDriver(){
    this.service.listByDriver(this.driver_id).subscribe((data) => {
      this.vehicledriver = data;
      console.log(this.vehicledriver);
    });
  }
  //funcion para crear una operacion segun un municipio

  createForDriver() {
    this.router.navigate(["vehicleDriver/createForDriver", this.driver_id]);
    console.log("aqui estoy en createForOwner", this.driver_id);
  }

  //Funcion para filtrar por vehiculo
  filterByVehicle(){
    this.service.listByVehicle(this.vehicle_id).subscribe((data) => {
      this.vehicledriver = data;
      console.log(this.vehicledriver);
    });
  }

  //funcion para crear una operacion segun un vehiculo
  createForVehicle() {
    this.router.navigate(["vehicleDriver/createForVehicle", this.vehicle_id]);
    console.log("aqui estoy en createForVehicle", this.vehicle_id);
  }
}
