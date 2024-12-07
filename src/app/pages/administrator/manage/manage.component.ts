import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
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

  constructor(
    private administratorService: AdministratorService,
    private activateRoute: ActivatedRoute, //analizar la url para saber que quiere hacer el user: crear visualizar
    private router: Router //como me muevo yo en la pagina,gestiona los archivos de .routing para poder navegar : MOVERSE DE UNA COMPONENTE A OTRA
  ) {
    this.mode = 1;
    this.administrator = {
      id: 0,
      user_id: "",
      service_id: 0,
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
      this.administrator.id = this.activateRoute.snapshot.params.id;
      this.getAdministrator(this.administrator.id);
    }
  }

  create() {
    console.log(JSON.stringify(this.administrator));
    this.administratorService.create(this.administrator).subscribe((data) => {
      Swal.fire("Creado", " se ha creado exitosa mente", "success"); //tirulo a la alerta
      this.router.navigate(["administrator/list"]);
    });
  }

  update() {
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
    });
  }
}
