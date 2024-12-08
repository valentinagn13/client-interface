import { Component, OnInit } from "@angular/core";
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  Validators,
} from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { log } from "console";
import { Administrator } from "src/app/models/administrator.model";
import { AdministratorService } from "src/app/services/administrator.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-manage",
  templateUrl: "./manage.component.html",
  styleUrls: ["./manage.component.css"],
})
export class ManageComponent implements OnInit {
  administrator: Administrator;
  //mode=1 --> viw  , mode=2--> create ,  mode =3 update
  mode: number;
  theFormGroup: FormGroup;
  trySend: boolean;

  constructor(
    private administratorService: AdministratorService,
    private activateRoute: ActivatedRoute, //analizar la url para saber que quiere hacer el user: crear visualizar
    private router: Router, //como me muevo yo en la pagina,gestiona los archivos de .routing para poder navegar : MOVERSE DE UNA COMPONENTE A OTRA
    private theFormBuilder: FormBuilder
  ) {
    this.mode = 1;
    this.administrator = {
      id: 0,
      user_id: "",
      service_id: 0,
    };
    this.trySend = false;
  }

  ngOnInit(): void {
    this.configFormGroup();

    const currentUrl = this.activateRoute.snapshot.url.join("/");
    if (currentUrl.includes("view")) {
      this.mode = 1;

      // this.theFormGroup.get("id").disable();
      this.theFormGroup.get("user_id").disable();
      this.theFormGroup.get("service_id").disable();
    } else if (currentUrl.includes("create")) {
      this.mode = 2;
      // this.theFormGroup.get("id").disable();
    } else if (currentUrl.includes("update")) {
      this.mode = 3;
      // this.theFormGroup.get("id").disable();
    }
    if (this.activateRoute.snapshot.params.id) {
      this.administrator.id = this.activateRoute.snapshot.params.id;
      this.getAdministrator(this.administrator.id);
    }
  }

  create() {
    if (this.theFormGroup.invalid) {
      // if (this.theFormGroup.invalid) {
      //   Swal.fire("malo ", "error");
      //   return;
      // }
      this.trySend = true;
      Swal.fire(
        "Error en el formulario",
        "Ingrese correctamente los datos solicitados"
      );
      return;
    }
    console.log(JSON.stringify(this.administrator));
    this.administratorService.create(this.administrator).subscribe((data) => {
      Swal.fire("Creado", " se ha creado exitosa mente", "success"); //tirulo a la alerta
      this.router.navigate(["administrator/list"]);
    });
  }

  update() {
    if (this.theFormGroup.invalid) {
      this.trySend = true;
      Swal.fire(
        "Error en el formulario",
        "Ingrese correctamente los datos solicitados"
      );
      return;
    }
    console.log(JSON.stringify(this.administrator));
    this.administratorService.update(this.administrator).subscribe((data) => {
      Swal.fire("Actualizado", " se ha actualizado exitosa mente", "success"); //titulo a la alerta
      this.router.navigate(["administrator/list"]);
    });
  }

  //aqui se arma la dataaaa
  getAdministrator(id: number) {
    this.administratorService.view(id).subscribe((data) => {
      this.administrator = data;
      console.log(JSON.stringify(this.administrator));
      console.log(this.administrator);

      this.theFormGroup.patchValue({
        id: this.administrator.id,
        user_id: this.administrator.user_id,
        service_id: this.administrator.service_id,
      });
    });
  }
  configFormGroup() {
    this.theFormGroup = this.theFormBuilder.group({
      // primer elemento del vector, valor por defecto
      // lista, serán las reglas
      id: [this.administrator.id || ""],
      // VALIDAR EL USUARIO
      user_id: ["", [Validators.required, Validators.minLength(5)]],
      service_id: [0, [Validators.required, Validators.pattern("^[0-9]+$")]],

      // idProjector:[null,[Validators.required]],
    });
  }
  get getTheFormGroup() {
    return this.theFormGroup.controls;
  }
}
