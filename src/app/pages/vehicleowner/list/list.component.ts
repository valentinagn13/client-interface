import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
  
  constructor(private service: VehicleownerService, private router: Router) { 
     this.vehicleOwners = [];
  }

  //este es el primero que se llama igual que contructor pero cuando hay cambios en los componentes 
  
  ngOnInit(): void {
    this.list();
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

}
