import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Vehicledriver } from "src/app/models/vehicledriver.model";
import { VehicledriverService } from "src/app/services/vehicledriver.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-manage",
  templateUrl: "./manage.component.html",
  styleUrls: ["./manage.component.css"],
})
export class ManageComponent implements OnInit {
  mode: number; //1->View, 2->Create, 3->Update
  vehicledriver: Vehicledriver;
  theFormGroup: FormGroup; //! EL POLICIA QUIEN HACE CUMPIR LAS REGLAS
  trySend: boolean;
  constructor(
    private activateRoute: ActivatedRoute,
    private vehiclesService: VehicledriverService,
    private router: Router,
    private theFormBuilder: FormBuilder //* PARA ESTABLECER LAS REGLAS
  ) {
    this.mode = 1;
    this.trySend = false;
    this.configFormGroup(); //* CREAR AL POLICIA
    this.vehicledriver = {
      id: 0,
      vehicle_id: 0,
      driver_id: 0,
    };
  }

  ngOnInit(): void {
    const currentUrl = this.activateRoute.snapshot.url.join("/");
    if (currentUrl.includes("view")) {
      this.theFormGroup.get("vehicle_id").disable();
      this.theFormGroup.get("driver_id").disable();
      this.mode = 1;
    } else if (currentUrl.includes("create")) {
      this.mode = 2;
    } else if (currentUrl.includes("update")) {
      this.mode = 3;
    }
    if (this.activateRoute.snapshot.params.id) {
      this.vehicledriver.id = this.activateRoute.snapshot.params.id;
      this.getVehicle(this.vehicledriver.id);
    }
  }
  configFormGroup() {
    //* UNION ENTRE LA POLICIA Y CONGRESO
    this.theFormGroup = this.theFormBuilder.group({
      vehicle_id: [0, [Validators.required, Validators.pattern("^[0-9]+$")]],
      driver_id: [0, [Validators.required, Validators.pattern("^[0-9]+$")]],
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
    console.log(JSON.stringify(this.vehicledriver));
    this.vehiclesService.create(this.vehicledriver).subscribe((data) => {
      Swal.fire("Creado", " se ha creado exitosa mente", "success"); //tirulo a la alerta
      this.router.navigate(["vehicleDriver/list"]);
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
    console.log(JSON.stringify(this.vehicledriver));
    this.vehiclesService.update(this.vehicledriver).subscribe((data) => {
      Swal.fire("Actualizado", " se ha actualizado exitosa mente", "success"); //titulo a la alerta
      this.router.navigate(["vehicleDriver/list"]);
    });
  }

  //aqui se arma la data
  getVehicle(id: number) {
    this.vehiclesService.view(id).subscribe((data) => {
      this.vehicledriver = data;
      console.log(JSON.stringify(this.vehicledriver));
      this.theFormGroup.patchValue({
        // status: this.invoice.status,
        vehicle_id: this.vehicledriver.vehicle_id,
        driver_id: this.vehicledriver.driver_id,
      });
      console.log(JSON.stringify(this.vehicledriver));
      console.log(this.vehicledriver);
    });
  }
}
