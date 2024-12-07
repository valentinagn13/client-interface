import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Department } from "src/app/models/department.model";
import { DepartmentService } from "src/app/services/department.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-list",
  templateUrl: "./list.component.html",
  styleUrls: ["./list.component.css"],
})
export class ListComponent implements OnInit {
  departments: Department[];

  constructor(private service: DepartmentService, private router: Router) {
    this.departments = [];
  }

  //este es el primero que se llama igual que contructor pero cuando hay cambios en los componentes

  ngOnInit(): void {
    this.list();
  }

  view(id: number) {
    console.log("aqui estoy en view");
    
    this.router.navigate(["departments/view/" + id]);
  }

  update(id: number) {
    this.router.navigate(["departments/update/" + id]);
  }

  list(): void {
    this.service.list().subscribe((data) => {
      this.departments = data["data"];
      //console.log(JSON.stringify(data["data"]));
    });
  }

  create(){
    this.router.navigate(["departments/create"]);
  }

  delete(id: number) {
    Swal.fire({
      title: "Eliminar Departamento",
      text: "¿Estas seguro de eliminar el Departamento?",
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
            "El Departamento ha sido eliminado.",
            "success"
          );
          this.ngOnInit();
        });
      }
    });
  }
}
