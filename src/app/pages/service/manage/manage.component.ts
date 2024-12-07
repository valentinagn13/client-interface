import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Service } from "src/app/models/service.model";
import { ServiceService } from "src/app/services/service.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-manage",
  templateUrl: "./manage.component.html",
  styleUrls: ["./manage.component.css"],
})
export class ManageComponent implements OnInit {
  service: Service;
  //mode=1 --> viw  , mode=2--> create ,  mode =3 update
  mode: number;

  constructor(
    private serviceService: ServiceService,
    private activateRoute: ActivatedRoute, //analizar la url para saber que quiere hacer el user: crear visualizar
    private router: Router //como me muevo yo en la pagina,gestiona los archivos de .routing para poder navegar : MOVERSE DE UNA COMPONENTE A OTRA
  ) {
    this.mode = 1;
    this.service = {
      id: 0,
      name: "",
      address: "",
      description: "",
      date: new Date(),
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
      this.service.id = this.activateRoute.snapshot.params.id;
      this.getService(this.service.id);
    }
  }

  create() {
    console.log(JSON.stringify(this.service));
    this.serviceService.create(this.service).subscribe((data) => {
      Swal.fire("Creado", " se ha creado exitosa mente", "success"); //tirulo a la alerta
      this.router.navigate(["service/list"]);
    });
  }

  update() {
    console.log(JSON.stringify(this.service));
    this.serviceService.update(this.service).subscribe((data) => {
      Swal.fire("Actualizado", " se ha actualizado exitosa mente", "success"); //titulo a la alerta
      this.router.navigate(["service/list"]);
    });
  }

  //aqui se arma la dataaaa
  getService(id: number) {
    this.serviceService.view(id).subscribe((data) => {
      this.service = data;
      console.log(JSON.stringify(this.service));
      console.log(this.service);
    });
  }
}
