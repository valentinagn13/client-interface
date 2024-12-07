import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
  
  constructor(private service: InsuranceService, private router: Router) { 
     this.insurances = [];
  }

  //este es el primero que se llama igual que contructor pero cuando hay cambios en los componentes 
  
  ngOnInit(): void {
    this.list();
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


}
