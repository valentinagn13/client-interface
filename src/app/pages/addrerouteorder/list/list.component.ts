import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  route_id: number;
  address_id: number;
  constructor(private service:  AddrerouteorderService, private router: Router, private activateRoute: ActivatedRoute) { 
     this.AddreRouteOrder = [];
  }

  //este es el primero que se llama igual que contructor pero cuando hay cambios en los componentes 
  
  ngOnInit(): void {
    const currentUrl = this.activateRoute.snapshot.url.join('/');
    
    // Reiniciar municipality_id y vehicle_id
    this.route_id = null;
    this.address_id = null;
  
    // Verificar si estamos filtrando por municipio
    if (currentUrl.includes('filterByRoute')) {
      this.route_id = +this.activateRoute.snapshot.params['id'];
      console.log("route_id:", this.route_id);
      this.filterByRoute();
      console.log("address_id:", this.address_id);
      

    } 
    // Verificar si estamos filtrando por vehiculo
    else if (currentUrl.includes('filterByAddress')) {
      this.address_id = +this.activateRoute.snapshot.params['id'];
      console.log("address_id:", this.address_id);
      this.filterByAddress();
      console.log("route_id:", this.route_id);
      
    } 
    // Si no hay filtro específico, listar todos las operaciones
    else {
      this.list();
    }
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
  filterByRoute(){
    this.service.listByRoute(this.route_id).subscribe((data) => {
      this.AddreRouteOrder = data;
      console.log(this.AddreRouteOrder, "aqui estoy en filterByRoute");
    });
  }

  createForRoute() {
    this.router.navigate(["addreRouteOrders/createForRoute", this.route_id]);
    console.log("aqui estoy en createForRoute", this.route_id);
  }

  filterByAddress(){
    this.service.listByAddress(this.address_id).subscribe((data) => {
      this.AddreRouteOrder = data;
      console.log(this.AddreRouteOrder);
    });
  }

  createForAddress() {
    this.router.navigate(["addreRouteOrders/createForAddress", this.address_id]);
    console.log("aqui estoy en createForAddress", this.address_id);
  }

}
