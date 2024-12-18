import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { RolePermission } from "src/app/models/role-permission.model";
import { RolePermissionService } from "src/app/services/role-permission.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-list",
  templateUrl: "./list.component.html",
  styleUrls: ["./list.component.scss"],
})
export class ListComponent implements OnInit {
  roleId: string;
  rolePermissions: RolePermission[];
  url: string;

  constructor(
    private parent: ActivatedRoute,
    private route: Router,
    private service: RolePermissionService,
  ) {
    this.url =
      this.parent.snapshot["_routerState"].url.match(/^\/.+(?=\/)/gim)[0];

    this.roleId = this.parent.snapshot.params.roleId;
    this.rolePermissions = [];
  }

  ngOnInit(): void {
    this.list();
  }

  list() {
    this.service
      .getRolePermissionsByRole(this.roleId)
      .subscribe((data: RolePermission[]) => {
        this.rolePermissions = data;
      });
  }

  view(id: string) {
    this.route.navigate([this.url, "view", id]);
  }

  create() {
    this.route.navigate([this.url, "create"]);
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
