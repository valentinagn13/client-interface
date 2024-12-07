import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
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

  constructor(private service: ProductService, private router: Router) {
    this.products = [];
  }

  //este es el primero que se llama igual que contructor pero cuando hay cambios en los componentes

  ngOnInit(): void {
    this.list();
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

      //console.log(JSON.stringify(data["data"]));
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
}
