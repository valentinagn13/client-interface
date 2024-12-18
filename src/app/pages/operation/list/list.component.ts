import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Operation } from 'src/app/models/operation.model';
import { OperationService } from 'src/app/services/operation.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  operations: Operation[];
  municipality_id: number;
  vehicle_id: number;

  constructor(private service:  OperationService, private router: Router, private activateRoute: ActivatedRoute) {
     this.operations = [];
  }

  //este es el primero que se llama igual que contructor pero cuando hay cambios en los componentes

  ngOnInit(): void {
    const currentUrl = this.activateRoute.snapshot.url.join('/');
    
    // Reiniciar municipality_id y vehicle_id
    this.municipality_id = null;
    this.vehicle_id = null;
  
    // Verificar si estamos filtrando por municipio
    if (currentUrl.includes('filterByMunicipality')) {
      this.municipality_id = +this.activateRoute.snapshot.params['id'];
      console.log("municipality_id:", this.municipality_id);
      this.filterByMunicipality();
      console.log("vehicle_id:", this.vehicle_id);
      

    } 
    // Verificar si estamos filtrando por vehiculo
    else if (currentUrl.includes('filterByVehicle')) {
      this.vehicle_id = +this.activateRoute.snapshot.params['id'];
      console.log("vehicle_id:", this.vehicle_id);
      this.filterByVehicle();
      console.log("municipality_id:", this.municipality_id);
      
    } 
    // Si no hay filtro específico, listar todos las operaciones
    else {
      this.list();
    }
  }


  view(id: number) {
    console.log("aqui estoy en view");

    this.router.navigate(["operations/view/" + id]);
  }

  update(id: number) {
    this.router.navigate(["operations/update/" + id]);
  }

  list(): void {
    this.service.list().subscribe((data) => {

      this.operations = data

      //console.log(JSON.stringify(data["data"]));
    });
  }

  create(){
    this.router.navigate(["operations/create"]);
  }

  delete(id: number) {
    Swal.fire({
      title: "Eliminar Operacion",
      text: "¿Estas seguro de eliminar la Operacion?",
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
            "La Operacion ha sido eliminada.",
            "success"
          );

          this.ngOnInit();
        });
      }
    });
  }

  //Funcion para filtrar por municipio
  filterByMunicipality(){
    this.service.listByMunicipality(this.municipality_id).subscribe((data) => {
      this.operations = data;
      console.log(this.operations);
    });
  }
  //funcion para crear una operacion segun un municipio

  createForMunicipality() {
    this.router.navigate(["operations/createForMunicipality", this.municipality_id]);
    console.log("aqui estoy en createForMunicipality", this.municipality_id);
  }

  //Funcion para filtrar por vehiculo
  filterByVehicle(){
    this.service.listByVehicle(this.vehicle_id).subscribe((data) => {
      this.operations = data;
      console.log(this.operations);
    });
  }

  //funcion para crear una operacion segun un vehiculo
  createForVehicle() {
    this.router.navigate(["operations/createForVehicle", this.vehicle_id]);
    console.log("aqui estoy en createForVehicle", this.vehicle_id);
  }

}
