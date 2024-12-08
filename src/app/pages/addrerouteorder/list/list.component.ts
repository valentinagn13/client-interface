import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Addrerouteorder } from 'src/app/models/addrerouteorder.model';
import { AddrerouteorderService } from 'src/app/services/addrerouteorder.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  
  AddreRouteOrder: Addrerouteorder[];
  
  constructor(private service:  AddrerouteorderService, private router: Router) { 
     this.AddreRouteOrder = [];
  }

  //este es el primero que se llama igual que contructor pero cuando hay cambios en los componentes 
  
  ngOnInit(): void {
    this.list();
  }
  

  view(id: number) {
    console.log("aqui estoy en view");
    
    this.router.navigate(["addreRouteOrders/view/" + id]);
  }

  update(id: number) {
    this.router.navigate(["addreRouteOrders/update/" + id]);
  }

  list(): void {
    this.service.list().subscribe((data) => {
      
      this.AddreRouteOrder = data

      //console.log(JSON.stringify(data["data"]));
    });
  }

  create(){
    this.router.navigate(["addreRouteOrders/create"]);
  }

  delete(id: number) {
    Swal.fire({
      title: "Eliminar Orden-Direccion-Ruta",
      text: "¿Estas seguro de eliminar la Orden-Direccion-Ruta?",
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
            "La Orden-Direccion-Ruta ha sido eliminada.",
            "success"
          );
          
          this.ngOnInit();
        });
      }
    });
  }

}
