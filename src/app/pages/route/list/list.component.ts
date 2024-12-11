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
  public routes: Routes[] = [];

  constructor(private routesService: RouteService, private router: Router) {
    this.routes = [];
  }

  ngOnInit(): void {
    this.list();
  }

  list() {
    this.routesService.list().subscribe((data: any[]) => {
      this.routes = data.map((route) => ({
        id: route.id,
        startingPlace: route.starting_place,
        endingPlace: route.ending_place,
        distance: route.distance,
        deliveryDate: route.delivery_date,
      }));
    });
  }

  delete(id: number) {
    Swal.fire({
      title: "Eliminación",
      text: "¿Está seguro que quiere eliminar este registro?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "No, cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        this.routesService.delete(id).subscribe({
          next: () => {
            this.ngOnInit(); // Actualiza la tabla
            Swal.fire({
              title: "Eliminado",
              text: "Se ha eliminado correctamente",
              icon: "success",
            });
          },
          error: (err) => {
            console.error("Error eliminando la ruta:", err);
            Swal.fire({
              title: "Error",
              text: "No se pudo eliminar el registro. Intente nuevamente.",
              icon: "error",
            });
          },
        });
      }
    });
  }

  view(id: number) {
    this.router.navigate(["routes/view/" + id]);
  }

  update(id: number) {
    this.router.navigate(["routes/update/" + id]);
  }
}
