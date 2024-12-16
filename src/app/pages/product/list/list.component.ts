import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { log } from "console";
import { Product } from "src/app/models/product.model";
import { ProductService } from "src/app/services/product.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-list",
  templateUrl: "./list.component.html",
  styleUrls: ["./list.component.css"],
})
export class ListComponent implements OnInit {
  products: Product[];
  batch_id: number;
  client_id: number;

  constructor(private service: ProductService, private router: Router,  private activateRoute: ActivatedRoute) {
    this.products = [];
    //this.batch_id = 0;
  }

  //este es el primero que se llama igual que contructor pero cuando hay cambios en los componentes

  ngOnInit(): void {
    const currentUrl = this.activateRoute.snapshot.url.join('/');
    
    // Reiniciar batch_id y client_id
    this.batch_id = null;
    this.client_id = null;
  
    // Verificar si estamos filtrando por batch
    if (currentUrl.includes('filterByBatch')) {
      this.batch_id = +this.activateRoute.snapshot.params['id'];
      console.log("batch_id:", this.batch_id);
      this.filterByBatch();
      console.log("client_id:", this.client_id);
      

    } 
    // Verificar si estamos filtrando por cliente
    else if (currentUrl.includes('filterByClient')) {
      this.client_id = +this.activateRoute.snapshot.params['id'];
      console.log("client_id:", this.client_id);
      this.filterByClient();
      console.log("batch_id:", this.batch_id);
      
    } 
    // Si no hay filtro específico, listar todos los productos
    else {
      this.list();
    }
  }

  view(id: number) {
    console.log("aqui estoy en view");

    this.router.navigate(["products/view/" + id]);
  }

  update(id: number) {
    this.router.navigate(["products/update/" + id]);
  }

  list(): void {
    this.service.list().subscribe((data) => {
      this.products = data;

      console.log(JSON.stringify(data["data"]));
    });
  }

  create() {
   
      this.router.navigate(["products/create"]);
    
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
          Swal.fire("Eliminado!", "La Operacion ha sido eliminada.", "success");

          this.ngOnInit();
        });
      }
    });
  }

  //Funcion para filtrar por lotes
  filterByBatch(){
    this.service.listByBatch(this.batch_id).subscribe((data) => {
      this.products = data;
      console.log(this.products);
    });
  }
  //funcion para crear un producto segun un lote

  createForBatch() {
    this.router.navigate(["products/createForBatch", this.batch_id]);
    console.log("aqui estoy en createForBatch", this.batch_id);
  }

  //Funcion para filtrar por cliente
  filterByClient(){
    this.service.listByClient(this.client_id).subscribe((data) => {
      this.products = data;
      console.log(this.products);
    });
  }

  //funcion para crear un producto segun un cliente
  createForClient() {
    this.router.navigate(["products/createForClient", this.client_id]);
    console.log("aqui estoy en createForClient", this.client_id);
  }
}
