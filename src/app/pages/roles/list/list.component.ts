import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Role } from "src/app/models/role.model";
import { RoleService } from "src/app/services/role.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-list",
  templateUrl: "./list.component.html",
  styleUrls: ["./list.component.scss"],
})
export class ListComponent implements OnInit {
  roles: Role[];
  constructor(
    private service: RoleService,
    private route: Router,
  ) {
    this.roles = [];
  }

  ngOnInit(): void {
    this.list();
  }

  list() {
    this.service.getRoles().subscribe((data: Role[]) => {
      this.roles = data;
    });
  }

  create() {
    this.route.navigate(["roles/create"]);
  }

  view(id: string) {
    this.route.navigate(["roles/view", id]);
  }

  update(id: string) {
    this.route.navigate(["roles/update", id]);
  }

  delete(id: string) {
    Swal.fire({
      title: "¿Estás seguro de eliminar el registro?",
      text: "Esta acción no se puede revertir!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminar!",
      cancelButtonText: "No, cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        this.service.delete(id).subscribe(() => {
          Swal.fire("Eliminado!", "El registro ha sido eliminado.", "success");
          this.ngOnInit();
        });
      }
    });
  }
}
