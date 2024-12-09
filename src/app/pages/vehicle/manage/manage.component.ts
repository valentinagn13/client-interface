import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Vehicle } from "src/app/models/vehicle.model";
import { VehicleService } from "src/app/services/vehicle.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-manage",
  templateUrl: "./manage.component.html",
  styleUrls: ["./manage.component.css"],
})
export class ManageComponent implements OnInit {
  mode: number; //1->View, 2->Create, 3->Update
  vehicles: Vehicle;
  theFormGroup: FormGroup;
  trySend: boolean;

  constructor(
    private activateRoute: ActivatedRoute,
    private vehiclesService: VehicleService,
    private router: Router,
    private theFormBuilder: FormBuilder
  ) {
    this.mode = 1;
    this.vehicles = {
      id: 0,
      license_plate: "",
      model: "",
      capacity: 0,
      cargo_type: "",
    };
    this.trySend = false;
  }

  ngOnInit(): void {
    this.configFormGroup();
    const currentUrl = this.activateRoute.snapshot.url.join("/");
    if (currentUrl.includes("view")) {
      this.mode = 1;
      this.theFormGroup.get("id").disable();
      this.theFormGroup.get("license_plate").disable();
      this.theFormGroup.get("model").disable();
      this.theFormGroup.get("capacity").disable();
      this.theFormGroup.get("cargo_type").disable();
    } else if (currentUrl.includes("create")) {
      this.mode = 2;
      this.theFormGroup.get("id").disable();
    } else if (currentUrl.includes("update")) {
      this.mode = 3;
      this.theFormGroup.get("id").disable();
    }
    if (this.activateRoute.snapshot.params.id) {
      this.vehicles.id = this.activateRoute.snapshot.params.id;
      this.getVehicle(this.vehicles.id);
    }
  }

  create() {
    console.log(JSON.stringify(this.vehicles));
    this.vehiclesService.create(this.vehicles).subscribe((data) => {
      Swal.fire("Creado", " se ha creado exitosa mente", "success"); //tirulo a la alerta
      this.router.navigate(["vehicles/list"]);
    });
  }

  update() {
    console.log(JSON.stringify(this.vehicles));
    this.vehiclesService.update(this.vehicles).subscribe((data) => {
      Swal.fire("Actualizado", " se ha actualizado exitosa mente", "success"); //titulo a la alerta
      this.router.navigate(["vehicles/list"]);
    });
  }

  //aqui se arma la data
  getVehicle(id: number) {
    this.vehiclesService.view(id).subscribe((data) => {
      this.vehicles = data;
      console.log(JSON.stringify(this.vehicles));
    });
  }

  configFormGroup() {
    this.theFormGroup = this.theFormBuilder.group({
      // primer elemento del vector, valor por defecto
      // lista, serán las reglas
      id: [this.vehicles.id || ""],
      license_plate: [
        "",
        [
          Validators.required,
          Validators.pattern("^[a-zA-Z0-9 _-]+$"), // Permitir letras, números, espacios, guiones bajos y guiones
        ],
      ],
      model: [
        "",
        [Validators.required, Validators.pattern("^[a-zA-Z0-9 -]+$")],
      ],
      capacity: [
        0,
        [
          Validators.required,
          Validators.pattern("^[0-9]+$"),
          Validators.min(1),
          Validators.max(35000),
        ],
      ],
      cargo_type: [
        0,
        [Validators.required, Validators.pattern("^[a-zA-Z0-9áéíóúÁÉÍÓÚñÑ\\s-]+$")],
      ],
    });
  }

  //aqui nos indica que regla molesto
  get getTheFormGroup() {
    return this.theFormGroup.controls;
  }
}
