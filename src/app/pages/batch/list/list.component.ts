import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import Swal from "sweetalert2";

//Importaciones de la clase
import { Batch } from 'src/app/models/batch.model';
import { BatchService } from 'src/app/services/batch.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  batches: Batch[];
  route_id:number

  constructor(private service:BatchService, private router:Router,  private activateRoute: ActivatedRoute) {
    this.batches = [];
  }

  ngOnInit(): void {
    const currentUrl = this.activateRoute.snapshot.url.join('/');
    
    // Reiniciar batch_id y client_id
    this.route_id = null;
   
  
    // Verificar si estamos filtrando por batch
    if (currentUrl.includes('filterByRoute')) {
      this.route_id = +this.activateRoute.snapshot.params['id'];
      console.log("route_id:", this.route_id);
      this.filterByRoute();
    
      

    } else{
      this.list();

    }
  }

  view(id: number) {
    this.router.navigate(["batches/view/" + id]);
  }

  update(id: number) {
    this.router.navigate(["batches/update/" + id]);
  }

  list(): void {
    this.service.list().subscribe((data) => {
      console.log(data);
      this.batches = data
    });
  }

  create(){
    this.router.navigate(["batches/create"]);
  }

  delete(id: number) {
    Swal.fire({
      title: "Eliminar Lote",
      text: "¿Estas seguro de eliminar el Lote?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, eliminar!",
      cancelButtonText: "No, Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        this.service.delete(id).subscribe((data) => {
          Swal.fire("Eliminado!", "Lote eliminado correctamente.", "success");
          this.list();
        });
      }
    });
  }
  showProducts(id: number){
    this.router.navigate(["products/filterByBatch/" + id]);
  }

  
  //Funcion para filtrar por rutas
  filterByRoute(){
    this.service.listByRoute(this.route_id).subscribe((data) => {
      this.batches = data;
      console.log(this.batches);
    });
  }
  //funcion para crear un producto segun un lote

  createForRoute() {
    this.router.navigate(["batches/createForRoute", this.route_id]);
    console.log("aqui estoy en createForRoute", this.route_id);
  }

}
