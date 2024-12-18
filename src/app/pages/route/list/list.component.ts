import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Routes } from "src/app/models/routes.model";
import { RouteService } from "src/app/services/route.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-list",
  templateUrl: "./list.component.html",
  styleUrls: ["./list.component.css"],
})
export class ListComponent implements OnInit {

  
  
  routes: Routes[];
  vehicle_id: number;
  contract_id: number;
  constructor(private routeService: RouteService, private router: Router, private activateRoute: ActivatedRoute) {
    this.routes = [];

  }

  ngOnInit(): void {
    const currentUrl = this.activateRoute.snapshot.url.join('/');
    
    // Reiniciar municipality_id y vehicle_id
    this.contract_id = null;
    this.vehicle_id = null;
  
    // Verificar si estamos filtrando por municipio
    if (currentUrl.includes('filterByContract')) {
      this.contract_id = +this.activateRoute.snapshot.params['id'];
      console.log("contract_id:", this.contract_id);
      this.filterByContract();
      console.log("contract_id:", this.vehicle_id);
      

    } 
    // Verificar si estamos filtrando por vehiculo
    else if (currentUrl.includes('filterByVehicle')) {
      this.vehicle_id = +this.activateRoute.snapshot.params['id'];
      console.log("vehicle_id:", this.vehicle_id);
      this.filterByVehicle();
      console.log("contract_id:", this.contract_id);
      
    } 
    // Si no hay filtro específico, listar todos las operaciones
    else {
      this.list();
    }
  }
  view(id: number) {
    console.log("aqui estoy en view");

    this.router.navigate(["routes/view/" + id]);
  }

  update(id: number) {
    this.router.navigate(["routes/update/" + id]);
  }

  list(): void {
    this.routeService.list().subscribe((data) => {
      this.routes = data;
      console.log(data);

      //console.log(JSON.stringify(data["data"]));

    });
  }

  create() {
    this.router.navigate(["routes/create"]);
  }

  delete(id: number) {
    Swal.fire({
      title: "Eliminar Ruta?",
      text: "¿Estas seguro de eliminar la Ruta?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, eliminar!",
      cancelButtonText: "No, Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        this.routeService.delete(id).subscribe((data) => {
          Swal.fire("Eliminada!", "La Ruta ha sido eliminada.", "success");

          this.ngOnInit();
        });
      }
    });
  }
  
  //Funcion para filtrar por municipio
  filterByContract(){
    this.routeService.listByContract(this.contract_id).subscribe((data) => {
      this.routes = data;
      console.log(this.routes);
    });
  }
  //funcion para crear una operacion segun un municipio

  createForContract() {
    this.router.navigate(["routes/createForContract", this.contract_id]);
    console.log("aqui estoy en createForContract", this.contract_id);
  }

  //Funcion para filtrar por vehiculo
  filterByVehicle(){
    this.routeService.listByVehicle(this.vehicle_id).subscribe((data) => {
      this.routes = data;
      console.log(this.routes);
    });
  }

  //funcion para crear una operacion segun un vehiculo
  createForVehicle() {
    this.router.navigate(["routes/createForVehicle", this.vehicle_id]);
    console.log("aqui estoy en createForVehicle", this.vehicle_id);
  }
  
  showBatch(id: number){
    this.router.navigate(["batches/filterByRoute/" + id]);
  }
  showAddreRouteOrder(id: number) {
    this.router.navigate(["addreRouteOrders/filterByRoute/" + id]);
  }
}
