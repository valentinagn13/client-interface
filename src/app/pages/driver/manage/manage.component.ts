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

  constructor(
    private driverService: DriverService,
    private activateRoute: ActivatedRoute, //analizar la url para saber que quiere hacer el user: crear visualizar
    private router: Router //como me muevo yo en la pagina,gestiona los archivos de .routing para poder navegar : MOVERSE DE UNA COMPONENTE A OTRA
  ) {
    this.mode = 1;
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
    } else if (currentUrl.includes("create")) {
      this.mode = 2;
    } else if (currentUrl.includes("update")) {
      this.mode = 3;
    }
    if (this.activateRoute.snapshot.params.id) {
      this.driver.id = this.activateRoute.snapshot.params.id;
      this.getDriver(this.driver.id);
    }
  }

  create() {
    console.log(JSON.stringify(this.driver));
    this.driverService.create(this.driver).subscribe((data) => {
      Swal.fire("Creado", " se ha creado exitosa mente", "success"); //tirulo a la alerta
      this.router.navigate(["driver/list"]);
    });
  }

  update() {
    console.log(JSON.stringify(this.driver));
    this.driverService.update(this.driver).subscribe((data) => {
      Swal.fire("Actualizado", " se ha actualizado exitosa mente", "success"); //titulo a la alerta
      this.router.navigate(["driver/list"]);
    });
  }

  //aqui se arma la dataaaa
  getDriver(id: number) {
    this.driverService.view(id).subscribe((data) => {
      this.driver = data;
      console.log(JSON.stringify(this.driver));
      console.log(this.driver);
    });
  }
}
