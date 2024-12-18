import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Role } from "src/app/models/role.model";
import { RoleService } from "src/app/services/role.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-manage",
  templateUrl: "./manage.component.html",
  styleUrls: ["./manage.component.scss"],
})
export class ManageComponent implements OnInit {
  mode: number;
  theFormGroup: FormGroup;
  trySend: boolean;
  role: Role;

  constructor(
    private parent: ActivatedRoute,
    private router: Router,
    private roleService: RoleService,
    private theFormBuilder: FormBuilder,
  ) {
    this.mode = 1;
    this.trySend = false;

    this.role = {};

    this.configFormGroup();
  }

  configFormGroup() {
    this.theFormGroup = this.theFormBuilder.group({
      name: [
        null,
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(100),
        ],
      ],
      description: [
        null,
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(100),
        ],
      ],
    });
  }

  ngOnInit(): void {
    this.list();
  }

  list() {
    const currentUrl = this.parent.snapshot.url.join("/");
    if (currentUrl.includes("view")) {
      this.mode = 1;
      this.theFormGroup.disable();
    } else if (currentUrl.includes("update")) {
      this.mode = 2;
    } else if (currentUrl.includes("create")) {
      this.mode = 3;
    }

    if (this.parent.snapshot.params.id) {
      this.getRole(this.parent.snapshot.params.id);
    }
  }

  async getRole(id: string) {
    this.roleService.getRole(id).subscribe((data: Role) => {
      this.role = data;
    });
  }

  get getTheFormGroup() {
    return this.theFormGroup.controls;
  }

  permissions() {
    this.router.navigate(["roles", this.role._id, "permissions"]);
  }

  create() {
    if (this.theFormGroup.invalid) {
      this.trySend = true;
      Swal.fire("Error", "Por favor complete los campos requeridos", "error");
      return;
    }

    this.roleService.create(this.role).subscribe(() => {
      Swal.fire(
        "Creación exitosa",
        "Se ha creado un nuevo registro",
        "success",
      );

      this.router.navigate(["roles/list"]);
    });
  }

  update() {
    if (this.theFormGroup.invalid) {
      this.trySend = true;
      Swal.fire("Error", "Por favor complete los campos requeridos", "error");
      return;
    }

    this.roleService.update(this.role).subscribe(() => {
      Swal.fire(
        "Actualización exitosa",
        "Cliente actualizado correctamente",
        "success",
      );
      this.router.navigate(["roles/list"]);
    });
  }
}
