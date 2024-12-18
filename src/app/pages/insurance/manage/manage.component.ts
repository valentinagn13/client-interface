import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Insurance } from "src/app/models/insurance.model";
import { InsuranceService } from "src/app/services/insurance.service";
import { DatePipe } from "@angular/common";

import Swal from "sweetalert2";

@Component({
  selector: "app-manage",
  templateUrl: "./manage.component.html",
  styleUrls: ["./manage.component.css"],
})
export class ManageComponent implements OnInit {
  mode: number; //1->View, 2->Create, 3->Update
  insurances: Insurance;
  theFormGroup: FormGroup;
  trySend: boolean;
  vehicle_id: number;

  constructor(
    private activateRoute: ActivatedRoute,
    private insurancesService: InsuranceService,
    private router: Router,
    private theFormBuilder: FormBuilder //Se agrega para los validadores
  ) {
    this.mode = 1;
    this.insurances = {
      id: 0,
      insurance_type: "",
      start_date: new Date(),
      end_date: new Date(),
      insurance_company: "",
      vehicle_id: 0,
    };
    this.trySend = false;
  }

  ngOnInit(): void {
    this.configFormGroup();
    const currentUrl = this.activateRoute.snapshot.url.join("/");
    if (currentUrl.includes("view")) {
      this.mode = 1;
      this.theFormGroup.get("id").disable();
      this.theFormGroup.get("insurance_type").disable();
      this.theFormGroup.get("start_date").disable();
      this.theFormGroup.get("end_date").disable();
      this.theFormGroup.get("insurance_company").disable();
      this.theFormGroup.get("vehicle_id").disable();
    } else if (
      currentUrl.includes("create") &&
      !currentUrl.includes("createForVehicle")
    ) {
      this.mode = 2;
      this.theFormGroup.get("id").disable();
      this.theFormGroup.get("vehicle_id").enable();
    } else if (currentUrl.includes("createForVehicle")) {
      // Modo crear para batch
      this.mode = 4;
      this.theFormGroup.get("id").disable();
      this.vehicle_id = this.activateRoute.snapshot.params.vehicle_id;

      if (this.vehicle_id) {
        this.insurances.vehicle_id = this.vehicle_id;
        this.theFormGroup.patchValue({ vehicle_id: this.vehicle_id });
        // Deshabilitar batch_id solo en modo createForBatch
        this.theFormGroup.get("vehicle_id").disable();
      }
    } else if (currentUrl.includes("update")) {
      this.mode = 3;
      this.theFormGroup.get("id").disable();
    }
    if (this.activateRoute.snapshot.params.id) {
      this.insurances.id = this.activateRoute.snapshot.params.id;
      this.getInsurance(this.insurances.id);
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
    console.log(JSON.stringify(this.insurances));
    this.insurancesService.create(this.insurances).subscribe((data) => {
      Swal.fire("Creado", " se ha creado exitosa mente", "success"); //tirulo a la alerta
      this.router.navigate(["insurances/list"]);
    });
  }
  /* console.log("fecha inicio" ,fechaInicio);
console.log("fecha fin" ,fechafinDate);
console.log("fecha inicio Date" ,fechainicioDate);
console.log("fecha fin Date" ,fechafinDate); */

  createForVehicle() {
    this.insurances.vehicle_id = this.vehicle_id;
    console.log(JSON.stringify(this.insurances));
    this.insurancesService
      .createForVehicle(this.vehicle_id, this.insurances)
      .subscribe((data) => {
        Swal.fire("Creado", "Se ha creado exitosamente", "success");
        // Redirigir a la lista de productos del lote específico
        this.router.navigate(["insurances/filterByVehicle", this.vehicle_id]);
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
    const fechaInicio = this.theFormGroup.get("start_date")?.value;
    const fechafin = this.theFormGroup.get("end_date")?.value;
    const fechainicioDate = new Date(fechaInicio);
    const fechafinDate = new Date(fechafin);

    if (fechainicioDate > fechafinDate) {
      alert("La fecha de inicio no puede ser mayor a la fecha de fin");
      return;
    }
    //console.log(JSON.stringify(this.insurances));

    const fechaActual = new Date();

    console.log("fecha inicio", fechaInicio);
    console.log("fecha final", fechafin);
    console.log("fecha inicio Date", fechainicioDate);
    console.log("fecha fin Date", fechafinDate);
    console.log("fecha Actual", fechaActual);

    if (fechainicioDate > fechafinDate) {
      alert("La fecha de inicio no puede ser mayor a la fecha de fin");
      return;
    }

    // }else if(fechainicioDate < fechaActual){
    //   alert("La fecha de inicio no puede ser menor a la fecha actual");
    //   return;

    // }else if(fechafinDate < fechaActual){
    //   alert("La fecha de fin no puede ser menor a la fecha actual");
    //   return;
    // }

    this.insurancesService.update(this.insurances).subscribe((data) => {
      Swal.fire("Actualizado", " se ha actualizado exitosa mente", "success"); //titulo a la alerta
      this.router.navigate(["insurances/list"]);
    });
  }

  //aqui se arma la data
  getInsurance(id: number) {
    this.insurancesService.view(id).subscribe((data) => {
      const datePipe = new DatePipe("en-US");

      // Formatear las fechas antes de asignarlas
      const formattedStartDate = datePipe.transform(
        data.start_date,
        "yyyy-MM-dd"
      );
      const formattedEndDate = datePipe.transform(data.end_date, "yyyy-MM-dd");
      this.insurances = data;
      this.theFormGroup.patchValue({
        id: this.insurances.id,
        insurance_type: this.insurances.insurance_type,
        start_date: formattedStartDate, // Fecha formateada
        end_date: formattedEndDate, // Fecha formateada
        insurance_company: this.insurances.insurance_company,
        vehicle_id: this.insurances.vehicle_id,
      });
    });
  }

  //OJO-----------------------------
  //aqui definimos las reglas
  configFormGroup() {
    this.theFormGroup = this.theFormBuilder.group({
      // primer elemento del vector, valor por defecto
      // lista, serán las reglas
      id: [this.insurances.id || ""],
      insurance_type: [
        "",
        [
          Validators.required,
          Validators.pattern("^[a-zA-Z0-9áéíóúÁÉÍÓÚñÑ ]+$"),
        ],
      ],
      start_date: ["", [Validators.required]],
      end_date: ["", [Validators.required]],
      insurance_company: [
        "",
        [
          Validators.required,
          Validators.pattern("^[a-zA-Z0-9áéíóúÁÉÍÓÚñÑ ]+$"),
        ],
      ],
      vehicle_id: [0, [Validators.required]],

      // idProjector:[null,[Validators.required]],
    });
  }
  //aqui nos indica que regla molesto
  //aqui nos indica que regla molesto
  get getTheFormGroup() {
    return this.theFormGroup.controls;
  }
}
