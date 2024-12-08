import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import Swal from "sweetalert2";

//Importaciones de la clase
import { Client } from "src/app/models/client.model";
import { ClientService } from "src/app/services/client.service";

@Component({
  selector: "app-manage",
  templateUrl: "./manage.component.html",
  styleUrls: ["./manage.component.css"],
})
export class ManageComponent implements OnInit {
  mode: number; //1->View, 2->Create, 3->Update
  client: Client;

  constructor(
    private activateRoute: ActivatedRoute,
    private router: Router,
    private clientService: ClientService
  ) {
    this.mode = 1;
    this.client = {
      id: 0,
      id_type: "",
      id_number: "",
      phone_number: 0,
      order_count: 0,
      user_id: "",
    };
  }

  ngOnInit(): void {
    // Detectar el modo (view, create, update) según la URL
    const currentUrl = this.activateRoute.snapshot.url.join("/");
    if (currentUrl.includes("view")) {
      this.mode = 1;
    } else if (currentUrl.includes("create")) {
      this.mode = 2;
    } else if (currentUrl.includes("update")) {
      this.mode = 3;
    }

    // Suscribirse a los parámetros de la ruta
    this.activateRoute.params.subscribe((params) => {
      const id = params["id"]; // Obtener el id de los parámetros
      if (id) {
        this.client.id = +id; // Convertir a número si es necesario
        this.getClient(this.client.id);
      }
    });
  }

  create() {
    console.log(JSON.stringify(this.client));
    this.clientService.create(this.client).subscribe((data) => {
      Swal.fire("Creado", " se ha creado exitosa mente", "success"); //tirulo a la alerta
      this.router.navigate(["clients/list"]);
    });
  }

  update() {
    console.log(JSON.stringify(this.client));
    this.clientService.update(this.client).subscribe((data) => {
      Swal.fire("Actualizado", " se ha actualizado exitosa mente", "success"); //titulo a la alerta
      this.router.navigate(["clients/list"]);
    });
  }

  getClient(id: number) {
    this.clientService.view(id).subscribe((data) => {
      this.client = data;
      console.log(JSON.stringify(this.client));
    });
  }
}
