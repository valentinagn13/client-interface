import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Vehicleowner } from 'src/app/models/vehicleowner.model';
import { VehicleownerService } from 'src/app/services/vehicleowner.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  
  vehicleOwners: Vehicleowner[];
  owner_id:number
  vehicle_id:number

  constructor(private service: VehicleownerService, private router: Router, private activateRoute: ActivatedRoute) { 
     this.vehicleOwners = [];
  }

  //este es el primero que se llama igual que contructor pero cuando hay cambios en los componentes 
  
  ngOnInit(): void {
    const currentUrl = this.activateRoute.snapshot.url.join('/');
    
    // Reiniciar municipality_id y vehicle_id
    this.owner_id = null;
    this.vehicle_id = null;
  
    // Verificar si estamos filtrando por municipio
    if (currentUrl.includes('filterByOwner')) {
      this.owner_id = +this.activateRoute.snapshot.params['id'];
      console.log("owner_id:", this.owner_id);
      this.filterByOwner();
      console.log("vehicle_id:", this.owner_id);
      

    } 
    // Verificar si estamos filtrando por vehiculo
    else if (currentUrl.includes('filterByVehicle')) {
      this.vehicle_id = +this.activateRoute.snapshot.params['id'];
      console.log("vehicle_id:", this.vehicle_id);
      this.filterByVehicle();
      console.log("owner_id:", this.vehicle_id);
      
    } 
    // Si no hay filtro específico, listar todos las operaciones
    else {
      this.list();
    }
  }
  

  view(id: number) {
    console.log("aqui estoy en view");
    
    this.router.navigate(["vehicleOwners/view/" + id]);
  }

  update(id: number) {
    this.router.navigate(["vehicleOwners/update/" + id]);
  }

  list(): void {
    this.service.list().subscribe((data) => {
      
      this.vehicleOwners = data

      //console.log(JSON.stringify(data["data"]));
    });
  }

  create(){
    this.router.navigate(["vehicleOwners/create"]);
  }

  delete(id: number) {
    Swal.fire({
      title: "Eliminar Dueño del Vehiculo",
      text: "¿Estas seguro de eliminar el Dueño del Vehiculo?",
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
            "El Dueño del Vehiculo ha sido eliminada.",
            "success"
          );
          
          this.ngOnInit();
        });
      }
    });
  }

  //Funcion para filtrar por municipio
  filterByOwner(){
    this.service.listByOwner(this.owner_id).subscribe((data) => {
      this.vehicleOwners = data;
      console.log(this.vehicleOwners);
    });
  }
  //funcion para crear una operacion segun un municipio

  createForOwner() {
    this.router.navigate(["vehicleOwners/createForOwner", this.owner_id]);
    console.log("aqui estoy en createForOwner", this.owner_id);
  }

  //Funcion para filtrar por vehiculo
  filterByVehicle(){
    this.service.listByVehicle(this.vehicle_id).subscribe((data) => {
      this.vehicleOwners = data;
      console.log(this.vehicleOwners);
    });
  }

  //funcion para crear una operacion segun un vehiculo
  createForVehicle() {
    this.router.navigate(["vehicleOwners/createForVehicle", this.vehicle_id]);
    console.log("aqui estoy en createForVehicle", this.vehicle_id);
  }

}
