import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Vehicleowner } from "src/app/models/vehicleowner.model";
import { VehicleownerService } from "src/app/services/vehicleowner.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-manage",
  templateUrl: "./manage.component.html",
  styleUrls: ["./manage.component.css"],
})
export class ManageComponent implements OnInit {
  mode: number; //1->View, 2->Create, 3->Update
  vehicleOwners: Vehicleowner;
  theFormGroup: FormGroup;
  trySend: boolean;
  owner_id: number;
  vehicle_id: number;
  constructor(
    private activateRoute: ActivatedRoute,
    private vehicleOwnerService: VehicleownerService,
    private router: Router,
    private theFormBuilder: FormBuilder
  ) {
    this.mode = 1;
    this.vehicleOwners = {
      id: 0,
      acquisition_date: new Date(),
      ownership_percentage: 0,
      owner_id: 0,
      vehicle_id: 0,
    };
    this.trySend = false;
  }

  ngOnInit(): void {
    this.configFormGroup();
    const currentUrl = this.activateRoute.snapshot.url.join("/");
    if (currentUrl.includes("view")) {
      this.theFormGroup.get("id").disable();
      this.theFormGroup.get("acquisition_date").disable();
      this.theFormGroup.get("ownership_percentage").disable();
      this.theFormGroup.get("owner_id").disable();
      this.theFormGroup.get("vehicle_id").disable();
      this.mode = 1;
    } else if (
      currentUrl.includes("create") &&
      !currentUrl.includes("createForOwner") &&
      !currentUrl.includes("createForVehicle")
    ) {
      this.mode = 2;
      this.theFormGroup.get("id").disable();
      this.theFormGroup.get("owner_id").enable();
      this.theFormGroup.get("vehicle_id").enable();
    } else if (currentUrl.includes("createForOwner")) {
      // Modo crear para Municipio
      this.mode = 4;
      this.theFormGroup.get("id").disable();
      this.owner_id = this.activateRoute.snapshot.params.owner_id;

      if (this.owner_id) {
        this.vehicleOwners.owner_id = this.owner_id;
        this.theFormGroup.patchValue({ owner_id: this.owner_id });
        // Deshabilitar municipality_id solo en modo createForMunicipality
        this.theFormGroup.get("owner_id").disable();
      }
    } else if (currentUrl.includes("createForVehicle")) {
      // Modo crear para Vehiculo
      this.mode = 5;
      this.theFormGroup.get("id").disable();
      this.vehicle_id = this.activateRoute.snapshot.params.vehicle_id;
      console.log("vehicle_id:", this.vehicle_id);

      if (this.vehicle_id) {
        this.vehicleOwners.vehicle_id = this.vehicle_id;
        this.theFormGroup.patchValue({ vehicle_id: this.vehicle_id });
        // Deshabilitar vehicle_id solo en modo createForVehicle
        this.theFormGroup.get("vehicle_id").disable();
      }
    } else if (currentUrl.includes("update")) {
      this.mode = 3;
      this.theFormGroup.get("id").disable();
    }
    if (this.activateRoute.snapshot.params.id) {
      this.vehicleOwners.id = this.activateRoute.snapshot.params.id;
      this.getVehicleOwner(this.vehicleOwners.id);
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
    console.log(JSON.stringify(this.vehicleOwners));
    this.vehicleOwnerService.create(this.vehicleOwners).subscribe((data) => {
      Swal.fire("Creado", " se ha creado exitosa mente", "success"); //tirulo a la alerta
      this.router.navigate(["vehicleOwners/list"]);
    });
  }

  createForOwner() {
    this.vehicleOwners.owner_id = this.owner_id;
    console.log(JSON.stringify(this.vehicleOwners));
    this.vehicleOwnerService
      .createForOwner(this.owner_id, this.vehicleOwners)
      .subscribe((data) => {
        Swal.fire("Creado", "Se ha creado exitosamente", "success");
        // Redirigir a la lista de dueños vehiculos del conductor específico
        this.router.navigate(["vehicleOwners/filterByOwner", this.owner_id]);
      });
  }
  createForVehicle() {
    this.vehicleOwners.vehicle_id = this.vehicle_id;
    console.log(JSON.stringify(this.vehicleOwners));
    this.vehicleOwnerService
      .createForVehicle(this.vehicle_id, this.vehicleOwners)
      .subscribe((data) => {
        Swal.fire("Creado", "Se ha creado exitosamente", "success");
        // Redirigir a la lista de operaciones del vehiculo específico
        this.router.navigate([
          "vehicleOwners/filterByVehicle",
          this.vehicle_id,
        ]);
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
    const fechaVencimiento = this.theFormGroup.get("due_date")?.value;
    const fechaVenciminetoDate = new Date(fechaVencimiento);

    console.log(JSON.stringify(this.vehicleOwners));
    this.vehicleOwnerService.update(this.vehicleOwners).subscribe((data) => {
      Swal.fire("Actualizado", " se ha actualizado exitosa mente", "success"); //titulo a la alerta
      this.router.navigate(["vehicleOwners/list"]);
    });
  }

  //aqui se arma la data
  getVehicleOwner(id: number) {
    this.vehicleOwnerService.view(id).subscribe((data) => {
      this.vehicleOwners = data;

      // Format due_date if it's a string or Date
      const formattedDueDate = this.vehicleOwners.acquisition_date
        ? new Date(this.vehicleOwners.acquisition_date)
            .toISOString()
            .split("T")[0]
        : "";

      this.theFormGroup.patchValue({
        id: this.vehicleOwners.id,
        acquisition_date: formattedDueDate,
        ownership_percentage: this.vehicleOwners.ownership_percentage,
        owner_id: this.vehicleOwners.owner_id,
        vehicle_id: this.vehicleOwners.vehicle_id,
      });
    });
  }

  //OJO-----------------------------
  //aqui definimos las reglas
  configFormGroup() {
    this.theFormGroup = this.theFormBuilder.group({
      id: [this.vehicleOwners.id || 0],
      acquisition_date: [
        this.vehicleOwners.acquisition_date || "",
        Validators.required,
      ],
      ownership_percentage: [
        this.vehicleOwners.ownership_percentage || 0,
        [
          Validators.required,
          Validators.min(0),
          Validators.max(100),
          Validators.pattern("^[0-9]+$"),
        ],
      ],
      owner_id: [
        this.vehicleOwners.owner_id || 0,
        [Validators.required, Validators.pattern("^[0-9]+$")],
      ],
      vehicle_id: [
        this.vehicleOwners.vehicle_id || 0,
        [Validators.required, Validators.pattern("^[0-9]+$")],
      ],
    });
  }

  //aqui nos indica que regla molesto
  get getTheFormGroup() {
    return this.theFormGroup.controls;
  }

  incrementPercentage() {
    const currentValue = this.vehicleOwners.ownership_percentage || 0;
    if (currentValue < 100) {
      this.vehicleOwners.ownership_percentage = currentValue + 1;
      this.theFormGroup
        .get("ownership_percentage")
        ?.setValue(this.vehicleOwners.ownership_percentage);
    }
  }

  decrementPercentage() {
    const currentValue = this.vehicleOwners.ownership_percentage || 0;
    if (currentValue > 0) {
      this.vehicleOwners.ownership_percentage = currentValue - 1;
      this.theFormGroup
        .get("ownership_percentage")
        ?.setValue(this.vehicleOwners.ownership_percentage);
    }
  }
}
