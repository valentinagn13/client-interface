import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Role } from "src/app/models/role.model";
import { User } from "src/app/models/user.model";
import { RoleService } from "src/app/services/role.service";
import { UserService } from "src/app/services/user.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-manage",
  templateUrl: "./manage.component.html",
  styleUrls: ["./manage.component.scss"],
})
export class ManageComponent implements OnInit {
  mode: number;
  roles: Role[];
  theFormGroup: FormGroup;
  trySend: boolean;
  user: User;
  role: Role;

  constructor(
    private parent: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private roleService: RoleService,
    private theFormBuilder: FormBuilder
  ) {
    this.mode = 1;
    this.trySend = false;

    this.user = {};
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
      email: [
        null,
        [
          Validators.required,
          Validators.email,
          Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$"),
        ],
      ],
      role: [null, [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.getRoles();
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
      this.getUser(this.parent.snapshot.params.id);
    }
  }

  async getUser(id: string) {
    this.userService.getUser(id).subscribe((data: User) => {
      this.user = data;
      this.role = data.role || {};
    });
  }

  async getRoles() {
    this.roleService.getRoles().subscribe((data: Role[]) => {
      this.roles = data;
    });
  }

  get getTheFormGroup() {
    return this.theFormGroup.controls;
  }

  create() {
    if (this.theFormGroup.invalid) {
      this.trySend = true;
      Swal.fire("Error", "Por favor complete los campos requeridos", "error");
      return;
    }

    this.userService.create(this.user).subscribe((data: User) => {
      this.userService.matchRole(data, this.role).subscribe(() => {
        Swal.fire(
          "Creación exitosa",
          "Se ha creado un nuevo registro",
          "success"
        );

        this.router.navigate(["users/list"]);
      });
    });
  }

  update() {
    if (this.theFormGroup.invalid) {
      this.trySend = true;
      Swal.fire("Error", "Por favor complete los campos requeridos", "error");
      return;
    }

    this.userService.update(this.user).subscribe((data: User) => {
      this.userService.matchRole(data, this.role).subscribe(() => {
        Swal.fire(
          "Actualización exitosa",
          "Cliente actualizado correctamente",
          "success"
        );
        this.router.navigate(["users/list"]);
      });
    });
  }
}
