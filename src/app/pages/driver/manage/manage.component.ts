import { DatePipe } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { log } from "console";
import { Driver } from "src/app/models/driver.model";
import { DriverService } from "src/app/services/driver.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-manage",
  templateUrl: "./manage.component.html",
  styleUrls: ["./manage.component.css"],
})
export class ManageComponent implements OnInit {
  driver: Driver;
  //mode=1 --> viw  , mode=2--> create ,  mode =3 update
  mode: number;
  theFormGroup: FormGroup; //! EL POLICIA QUIEN HACE CUMPIR LAS REGLAS
  trySend: boolean; //! YA HIZO UN INTENTO DE ENVIO
  constructor(
    private driverService: DriverService,
    private activateRoute: ActivatedRoute, //analizar la url para saber que quiere hacer el user: crear visualizar
    private router: Router, //como me muevo yo en la pagina,gestiona los archivos de .routing para poder navegar : MOVERSE DE UNA COMPONENTE A OTRA
    private theFormBuilder: FormBuilder //* PARA ESTABLECER LAS REGLAS
  ) {
    this.mode = 1;
    this.trySend = false;
    this.configFormGroup(); //* CREAR AL POLICIA
    this.driver = {
      id: 0,
      license_number: "",
      expiration_date: new Date(),
      phone_number: "",
      user_id: "",
    };
  }

  ngOnInit(): void {
    const currentUrl = this.activateRoute.snapshot.url.join("/");
    if (currentUrl.includes("view")) {
      this.mode = 1;
      // this.theFormGroup.get("id").disable();
      this.theFormGroup.get("license_number").disable();
      this.theFormGroup.get("expiration_date").disable();
      this.theFormGroup.get("phone_number").disable();
      this.theFormGroup.get("user_id").disable();
    } else if (currentUrl.includes("create")) {
      this.mode = 2;
      // this.theFormGroup.get("id").disable();
    } else if (currentUrl.includes("update")) {
      this.mode = 3;
      // this.theFormGroup.get("id").disable();
    }
    if (this.activateRoute.snapshot.params.id) {
      this.driver.id = this.activateRoute.snapshot.params.id;
      this.getDriver(this.driver.id);
    }
  } //* lo del correo -importar validators
  configFormGroup() {
    //* UNION ENTRE LA POLICIA Y CONGRESO
    this.theFormGroup = this.theFormBuilder.group({
      // id: [this.driver.id || ""],
      license_number: ["", [Validators.required, Validators.minLength(5)]],
      expiration_date: ["", [Validators.required]],

      phone_number: ["", [Validators.required, Validators.minLength(5)]],
      user_id: ["", [Validators.required]],
    });
  }
  get getTheFormGroup() {
    //* para que devulva una variable
    return this.theFormGroup.controls; //DEVUELVE LOS CONTROLES
  }
  create() {
    if (this.theFormGroup.invalid) {
      this.trySend = true;
      Swal.fire(
        "Error en el formulario",
        "Ingrese correctamente los datos solicitados"
      );
      return;
    }
    console.log(JSON.stringify(this.driver));
    this.driverService.create(this.driver).subscribe((data) => {
      Swal.fire("Creado", " se ha creado exitosa mente", "success"); //tirulo a la alerta
      this.router.navigate(["driver/list"]);
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
    console.log(JSON.stringify(this.driver));
    this.driverService.update(this.driver).subscribe((data) => {
      Swal.fire("Actualizado", " se ha actualizado exitosa mente", "success"); //titulo a la alerta
      this.router.navigate(["driver/list"]);
    });
  }

  //aqui se arma la dataaaa
  getDriver(id: number) {
    this.driverService.view(id).subscribe((data) => {
      const datePipe = new DatePipe("en-US");
      // Formatear las fechas antes de asignarlas
      const formattedExpirationtDate = datePipe.transform(
        data.expiration_date,
        "yyyy-MM-dd"
      );
      this.driver = data;
      this.theFormGroup.patchValue({
        id: this.driver.id,
        license_number: this.driver.license_number,
        expiration_date: formattedExpirationtDate, // Fecha formateada
        phone_number: this.driver.phone_number,
        user_id: this.driver.user_id,
      });
      console.log(JSON.stringify(this.driver));
      console.log(this.driver);
    });
  }
}
