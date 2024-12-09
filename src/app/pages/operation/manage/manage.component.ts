import { DatePipe } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Operation } from "src/app/models/operation.model";
import { OperationService } from "src/app/services/operation.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-manage",
  templateUrl: "./manage.component.html",
  styleUrls: ["./manage.component.css"],
})
export class ManageComponent implements OnInit {
  mode: number; //1->View, 2->Create, 3->Update
  operations: Operation;
  theFormGroup: FormGroup;
  trySend: boolean;

  constructor(
    private activateRoute: ActivatedRoute,
    private operationsService: OperationService,
    private router: Router,
    private theFormBuilder: FormBuilder
  ) {
    this.mode = 1;
    this.operations = {
      id: 0,
      start_date: new Date(),
      end_date: new Date(),
      municipality_id: 0,
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
      this.theFormGroup.get("start_date").disable();
      this.theFormGroup.get("end_date").disable();
      this.theFormGroup.get("municipality_id").disable();
      this.theFormGroup.get("vehicle_id").disable();
    } else if (currentUrl.includes("create")) {
      this.mode = 2;
      this.theFormGroup.get("id").disable();
    } else if (currentUrl.includes("update")) {
      this.mode = 3;
      this.theFormGroup.get("id").disable();
    }
    if (this.activateRoute.snapshot.params.id) {
      this.operations.id = this.activateRoute.snapshot.params.id;
      this.getOperation(this.operations.id);
    }
  }

  create() {
    console.log(JSON.stringify(this.operations));
    this.operationsService.create(this.operations).subscribe((data) => {
      Swal.fire("Creado", " se ha creado exitosa mente", "success"); //tirulo a la alerta
      this.router.navigate(["operations/list"]);
    });
  }

  update() {
    const fechaInicio = this.theFormGroup.get("start_date")?.value;
    const fechafin = this.theFormGroup.get("end_date")?.value;
    const fechainicioDate = new Date(fechaInicio);
    const fechafinDate = new Date(fechafin);
    const fechaActual = new Date();
    fechaActual.setHours(0, 0, 0, 0);

    console.log("fecha inicio", fechaInicio);
    console.log("fecha final", fechafin);
    console.log("fecha inicio Date", fechainicioDate);
    console.log("fecha fin Date", fechafinDate);
    console.log("fecha Actual", fechaActual);

    if (fechainicioDate > fechafinDate) {
      alert("La fecha de inicio no puede ser mayor a la fecha de fin");
      return;
    }

    this.operationsService.update(this.operations).subscribe((data) => {
      console.log(JSON.stringify(this.operations));
      this.operations.start_date = fechainicioDate;
      this.operations.end_date = fechafinDate;
      Swal.fire("Actualizado", " se ha actualizado exitosa mente", "success"); //titulo a la alerta
      this.router.navigate(["operations/list"]);
    });
  }

  //aqui se arma la data
  getOperation(id: number) {
    this.operationsService.view(id).subscribe((data) => {
      const datePipe = new DatePipe("en-US");

      // Formatear las fechas antes de asignarlas
      const formattedStartDate = datePipe.transform(
        data.start_date,
        "yyyy-MM-dd"
      );
      const formattedEndDate = datePipe.transform(
        data.end_date,
        "yyyy-MM-dd"
      );
      this.operations = data;
      this.theFormGroup.patchValue({
        id: this.operations.id,
        start_date: formattedStartDate, // Fecha formateada
        end_date: formattedEndDate, // Fecha formateada
        municipality_id: this.operations.municipality_id,
        vehicle_id: this.operations.vehicle_id,
      });
    });
  }

  //OJO-----------------------------
  //aqui definimos las reglas
  configFormGroup() {
    this.theFormGroup = this.theFormBuilder.group({
      // primer elemento del vector, valor por defecto
      // lista, serán las reglas
      id: [this.operations.id || ""],
      start_date: ["", [Validators.required]],
      end_date: ["", [Validators.required]],
      municipality_id: [
        0,
        [Validators.required, Validators.pattern("^[0-9]+$")],
      ],
      vehicle_id: [0, [Validators.required, Validators.pattern("^[0-9]+$")]],
    });
  }

  //aqui nos indica que regla molesto
  get getTheFormGroup() {
    return this.theFormGroup.controls;
  }
}