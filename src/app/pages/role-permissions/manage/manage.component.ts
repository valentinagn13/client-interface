import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { throws } from "assert";
import { Permission } from "src/app/models/permission.model";
import { RolePermission } from "src/app/models/role-permission.model";
import { PermissionService } from "src/app/services/permission.service";
import { RolePermissionService } from "src/app/services/role-permission.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-manage",
  templateUrl: "./manage.component.html",
  styleUrls: ["./manage.component.scss"],
})
export class ManageComponent implements OnInit {
  data: any;
  mode: number;
  roleId: string;
  rolePermission: RolePermission;
  selectedPermissions: any;
  theFormGroup: FormGroup;
  trySend: boolean;
  url: string;

  constructor(
    private parent: ActivatedRoute,
    private router: Router,
    private rolePermissionService: RolePermissionService,
    private permissionService: PermissionService,
    private theFormBuilder: FormBuilder,
  ) {
    this.mode = 1;
    this.trySend = false;
    this.roleId = this.parent.snapshot.params.roleId;
    this.selectedPermissions = [];

    this.url =
      this.parent.snapshot["_routerState"].url.match(/^\/.+(?=\/)/gim)[0];

    this.rolePermission = {
      _id: "",
      role: {
        _id: this.roleId,
      },
      permission: {
        _id: "",
      },
    };

    this.configFormGroup();
  }

  configFormGroup() {
    this.theFormGroup = this.theFormBuilder.group({
      role_id: [
        null,
        [
          Validators.required,
          Validators.minLength(1),
          Validators.maxLength(100),
        ],
      ],
      selected_permission: [null, [Validators.required]],
      permission_id: [null, [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.getPermission();
    this.list();
  }

  list() {
    const currentUrl = this.parent.snapshot.url.join("/");
    if (currentUrl.includes("view")) {
      this.theFormGroup.disable();
      this.mode = 1;
    } else if (currentUrl.includes("update")) {
      this.mode = 2;
    } else if (currentUrl.includes("create")) {
      this.mode = 3;
    }

    if (this.parent.snapshot.params.id) {
      this.getRolePermission(this.parent.snapshot.params.id);
    }
  }

  get getTheFormGroup() {
    return this.theFormGroup.controls;
  }

  getRolePermission(id: string) {
    this.rolePermissionService
      .getRolePermissionsByRole(this.roleId)
      .subscribe((data: RolePermission[]) => {
        this.rolePermission = data.find((x) => x._id === id);
        const name = this.rolePermission.permission.url
          .match(/^\/(\w+)(?:\/(\w+))?(?:\/(\w+))?/gim)[0]
          .match(/(?<=\/)\w+$/gim)[0];
        this.onPermissionChange({ target: { value: name } });
        this.rolePermission._id = name;
      });
  }

  getPermission() {
    this.permissionService.getPermissions().subscribe((data: Permission[]) => {
      const keys = new Set(
        data.map(
          (x) =>
            x.url
              .match(/^\/(\w+)(?:\/(\w+))?(?:\/(\w+))?/gim)[0]
              .match(/(?<=\/)\w+$/gim)[0],
        ),
      );

      this.data = new Array(...keys).map((key: string) => {
        return {
          name: key,
          permissions: [
            {
              _id: "ALL",
              method: "ALL",
              url: "",
            },
            ...data.filter((x: Permission) => x.url.includes(key)),
          ],
        };
      });
    });
  }

  onPermissionChange(event: any) {
    const name = event.target.value;
    this.selectedPermissions =
      this.data.find((x: any) => x.name === name).permissions || [];
  }

  create() {
    if (this.rolePermission.permission._id.match(/^ALL$/gim)) {
      this.selectedPermissions
        .filter((x: Permission) => !x._id.match(/^ALL$/gim))
        .forEach((x: Permission) => {
          this.rolePermission.permission = x;
          this._create(this.rolePermission);
        });
    } else {
      this._create(this.rolePermission);
    }

    this.router.navigate([this.url, "list"]);
  }

  async _create(rolePermission: RolePermission) {
    if (this.theFormGroup.invalid) {
      this.trySend = true;
      Swal.fire("Error", "Por favor complete los campos requeridos", "error");
      return;
    }

    this.rolePermissionService.create(rolePermission).subscribe((data) => {
      if (data) {
        Swal.fire(
          "Creación exitosa",
          "Se ha creado un nuevo registro",
          "success",
        );
      } else {
        Swal.fire("Error", "Ha ocurrido un error", "error");
      }
    });
  }
}
