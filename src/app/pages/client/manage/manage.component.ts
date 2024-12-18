import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import Swal from "sweetalert2";

// Importaciones de la clase
import { Client } from "src/app/models/client.model";
import { ClientService } from "src/app/services/client.service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: "app-manage",
  templateUrl: "./manage.component.html",
  styleUrls: ["./manage.component.css"],
})
export class ManageComponent implements OnInit {
  mode: number; // 1->View, 2->Create, 3->Update
  client: Client;
  theFormGroup: FormGroup;
  trySend: boolean;

  constructor(
    private activateRoute: ActivatedRoute,
    private router: Router,
    private clientService: ClientService,
    private theFormBuilder: FormBuilder
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
    this.configFormGroup();
    const currentUrl = this.activateRoute.snapshot.url.join("/");
    if (currentUrl.includes("view")) {
      this.mode = 1;
      this.theFormGroup.get("id").disable();
      this.theFormGroup.get("id_type").disable();
      this.theFormGroup.get("id_number").disable();
      this.theFormGroup.get("phone_number").disable();
      this.theFormGroup.get("order_count").disable();
      this.theFormGroup.get("user_id").disable();
    } else if (currentUrl.includes("create")) {
      this.mode = 2;
      this.theFormGroup.get("id").disable();
    } else if (currentUrl.includes("update")) {
      this.mode = 3;
      this.theFormGroup.get("id").disable();
    }

    // Suscribirse a los parámetros de la ruta
    if (this.activateRoute.snapshot.params.id) {
      this.client.id = this.activateRoute.snapshot.params.id;
      this.getClient(this.client.id);
    }
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
    console.log(JSON.stringify(this.client));
    this.clientService.create(this.client).subscribe((data) => {
      Swal.fire("Creado", " se ha creado exitosa mente", "success"); // tirulo a la alerta
      this.router.navigate(["clients/list"]);
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
    console.log(JSON.stringify(this.client));
    this.clientService.update(this.client).subscribe((data) => {
      Swal.fire("Actualizado", " se ha actualizado exitosa mente", "success"); // titulo a la alerta
      this.router.navigate(["clients/list"]);
    });
  }

  getClient(id: number) {
    this.clientService.view(id).subscribe((data) => {
      this.client = data;
      this.theFormGroup.patchValue({
        id: this.client.id,
        id_type: this.client.id_type,
        id_number: this.client.id_number,
        phone_number: this.client.phone_number,
        order_count: this.client.order_count,
        user_id: this.client.user_id,
      });
    });
  }

  // OJO-----------------------------
  // aqui definimos las reglas
  configFormGroup() {
    this.theFormGroup = this.theFormBuilder.group({
      // primer elemento del vector, valor por defecto
      // lista, serán las reglas
      id: [this.client.id || ""],
      id_type: ["", [Validators.required, Validators.pattern("^[a-zA-Z]+$")]], // Solo letras
      id_number: ["", [Validators.required, Validators.pattern("^[0-9]+$")]], // Solo números
      phone_number: [0, [Validators.required, Validators.pattern("^[0-9]+$")]], // Solo números
      order_count: [0, [Validators.required, Validators.pattern("^[0-9]+$")]], // Solo números
      user_id: ["", [Validators.required]],
    });
  }

  // aqui nos indica que regla molesto
  get getTheFormGroup() {
    return this.theFormGroup.controls;
  }
}
