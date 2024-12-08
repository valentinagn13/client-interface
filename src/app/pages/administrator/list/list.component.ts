import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Administrator } from "src/app/models/administrator.model";
import { AdministratorService } from "src/app/services/administrator.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-list",
  templateUrl: "./list.component.html",
  styleUrls: ["./list.component.css"],
})
export class ListComponent implements OnInit {
  administrator: Administrator[];
  constructor(private administratorservice: AdministratorService, private router: Router) {
    this.administrator = [];
  }

  ngOnInit(): void {
    this.list();
  }
  view(id: number) {
    console.log("aqui estoy en view");

    this.router.navigate(["administrator/view/" + id]);
  }

  update(id: number) {
    this.router.navigate(["administrator/update/" + id]);
  }

  list(): void {
    this.administratorservice.list().subscribe((data) => {
      this.administrator = data;
      console.log(data);

      //console.log(JSON.stringify(data["data"]));
    });
  }

  create() {
    this.router.navigate(["administrator/create"]);
  }

  delete(id: number) {
    Swal.fire({
      title: "Eliminar administrador?",
      text: "¿Estas seguro de eliminar el administrador?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, eliminar!",
      cancelButtonText: "No, Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        this.administratorservice.delete(id).subscribe((data) => {
          Swal.fire("Eliminado!", "El administrador ha sido eliminado.", "success");

          this.ngOnInit();
        });
      }
    });
  }
}
