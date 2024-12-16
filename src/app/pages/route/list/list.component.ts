import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Routes } from "src/app/models/routes.model";
import { RouteService } from "src/app/services/route.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-list",
  templateUrl: "./list.component.html",
  styleUrls: ["./list.component.css"],
})
export class ListComponent implements OnInit {

  
  
  routes: Routes[];
  constructor(private routeService: RouteService, private router: Router) {
    this.routes = [];
  }

  ngOnInit(): void {
    this.list();
  }
  view(id: number) {
    console.log("aqui estoy en view");

    this.router.navigate(["routes/view/" + id]);
  }

  update(id: number) {
    this.router.navigate(["routes/update/" + id]);
  }

  list(): void {
    this.routeService.list().subscribe((data) => {
      this.routes = data;
      console.log(data);

      //console.log(JSON.stringify(data["data"]));

    });
  }

  create() {
    this.router.navigate(["routes/create"]);
  }

  delete(id: number) {
    Swal.fire({
      title: "Eliminar Ruta?",
      text: "¿Estas seguro de eliminar la Ruta?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, eliminar!",
      cancelButtonText: "No, Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        this.routeService.delete(id).subscribe((data) => {
          Swal.fire("Eliminada!", "La Ruta ha sido eliminada.", "success");

          this.ngOnInit();
        });
      }
    });
  }
  showBatch(id: number){
    this.router.navigate(["batches/filterByRoute/" + id]);
  }
}
