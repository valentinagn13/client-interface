import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Insurance } from 'src/app/models/insurance.model';
import { InsuranceService } from 'src/app/services/insurance.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {


  insurances: Insurance[];
  vehicle_id:number;
  
  constructor(private service: InsuranceService, private router: Router,  private activateRoute: ActivatedRoute) { 
     this.insurances = [];
  }

  //este es el primero que se llama igual que contructor pero cuando hay cambios en los componentes 
  
  ngOnInit(): void {
    const currentUrl = this.activateRoute.snapshot.url.join('/');
    
    // Reiniciar batch_id y client_id
    this.vehicle_id = null;
    
  
    // Verificar si estamos filtrando por batch
    if (currentUrl.includes('filterByVehicle')) {
      this.vehicle_id = +this.activateRoute.snapshot.params['id'];
      console.log("vehicle_id:", this.vehicle_id);
      this.filterByVehicle();
    
      

    } 
    else {
      this.list();
    }
  }
  

  view(id: number) {
    console.log("aqui estoy en view");
    
    this.router.navigate(["insurances/view/" + id]);
  }

  update(id: number) {
    this.router.navigate(["insurances/update/" + id]);
  }

  list(): void {
    this.service.list().subscribe((data) => {
      this.insurances = data
      console.log(JSON.stringify(data));

    });
  }

  create(){
    this.router.navigate(["insurances/create"]);
  }

  delete(id: number) {
    Swal.fire({
      title: "Eliminar Seguro",
      text: "¿Estas seguro de eliminar EL Seguro?",
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
            "El Seguro ha sido eliminado.",
            "success"
          );
          
          this.ngOnInit();
        });
      }
    });
  }

   //Funcion para filtrar por lotes
   filterByVehicle(){
    this.service.listByVehicle(this.vehicle_id).subscribe((data) => {
      this.insurances = data;
      console.log(this.insurances);
    });
  }
  //funcion para crear un producto segun un lote

  createForVehicle() {
    this.router.navigate(["insurances/createForVehicle", this.vehicle_id]);
    console.log("aqui estoy en createForVehicle", this.vehicle_id);
  }



}
