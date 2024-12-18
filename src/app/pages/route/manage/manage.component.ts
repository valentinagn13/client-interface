import { DatePipe } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Routes } from "src/app/models/routes.model";
import { RouteService } from "src/app/services/route.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-manage",
  templateUrl: "./manage.component.html",
  styleUrls: ["./manage.component.css"],
})
export class ManageComponent implements OnInit {
  mode: number; // 1->View, 2->Create, 3->Update
  routes: Routes;
  theFormGroup: FormGroup;
  trySend: boolean;
  contract_id: number;
  vehicle_id: number;

  constructor(
    private activateRoute: ActivatedRoute,
    private routeService: RouteService,
    private router: Router,
    private theFormBuilder: FormBuilder
  ) {
    this.mode = 1;
    this.routes = {
      id: 0,
      starting_place: "",
      ending_place: "",
      distance: 0,
      delivery_date: new Date(),
      contract_id: 0,
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
      this.theFormGroup.get("starting_place").disable();
      this.theFormGroup.get("ending_place").disable();
      this.theFormGroup.get("distance").disable();
      this.theFormGroup.get("delivery_date").disable();
      this.theFormGroup.get("contract_id").disable();
      this.theFormGroup.get("vehicle_id").disable();
    } else if (
      currentUrl.includes("create") &&
      !currentUrl.includes("createForContract") &&
      !currentUrl.includes("createForVehicle")
    ) {
      this.mode = 2;
      this.theFormGroup.get("id").disable();
      this.theFormGroup.get("contract_id").enable();
      this.theFormGroup.get("vehicle_id").enable();
    } else if (currentUrl.includes("createForContract")) {
      // Modo crear para Municipio
      this.mode = 4;
      this.theFormGroup.get("id").disable();
      this.contract_id = this.activateRoute.snapshot.params.contract_id;

      if (this.contract_id) {
        this.routes.contract_id = this.contract_id;
        this.theFormGroup.patchValue({ contract_id: this.contract_id });
        // Deshabilitar municipality_id solo en modo createForMunicipality
        this.theFormGroup.get("contract_id").disable();
      }
    } else if (currentUrl.includes("createForVehicle")) {
      // Modo crear para Vehiculo
      this.mode = 5;
      this.theFormGroup.get("id").disable();
      this.vehicle_id = this.activateRoute.snapshot.params.vehicle_id;
      console.log("vehicle_id:", this.vehicle_id);

      if (this.vehicle_id) {
        this.routes.vehicle_id = this.vehicle_id;
        this.theFormGroup.patchValue({ vehicle_id: this.vehicle_id });
        // Deshabilitar vehicle_id solo en modo createForVehicle
        this.theFormGroup.get("vehicle_id").disable();
      }
    } else if (currentUrl.includes("update")) {
      this.mode = 3;
      this.theFormGroup.get("id").disable();
    }
    if (this.activateRoute.snapshot.params.id) {
      this.routes.id = this.activateRoute.snapshot.params.id;
      this.getRoutes(this.routes.id);
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
    console.log(JSON.stringify(this.routes));
    this.routeService.create(this.routes).subscribe((data) => {
      Swal.fire("Creado", " se ha creado exitosa mente", "success"); //tirulo a la alerta
      this.router.navigate(["routes/list"]);
    });
  }

  createForContract() {
    this.routes.contract_id = this.contract_id;
    console.log(JSON.stringify(this.routes));
    this.routeService
      .createForMunicipality(this.contract_id, this.routes)
      .subscribe((data) => {
        Swal.fire("Creado", "Se ha creado exitosamente", "success");
        // Redirigir a la lista de operaciones del municipio específico
        this.router.navigate(["routes/filterByContract", this.contract_id]);
      });
  }

  createForVehicle() {
    this.routes.vehicle_id = this.vehicle_id;
    console.log(JSON.stringify(this.routes));
    this.routeService
      .createForVehicle(this.vehicle_id, this.routes)
      .subscribe((data) => {
        Swal.fire("Creado", "Se ha creado exitosamente", "success");
        // Redirigir a la lista de operaciones del vehiculo específico
        this.router.navigate(["routes/filterByVehicle", this.vehicle_id]);
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
    const fechaEntrega = this.theFormGroup.get("delivery_date")?.value;
    const fechaEntregaDate = new Date(fechaEntrega);

    //console.log(JSON.stringify(this.products));
    this.routeService.update(this.routes).subscribe((data) => {
      Swal.fire("Actualizado", " se ha actualizado exitosa mente", "success"); //titulo a la alerta
      this.router.navigate(["routes/list"]);
    });
  }

  //aqui se arma la data
  getRoutes(id: number) {
    this.routeService.view(id).subscribe((data) => {
      const datePipe = new DatePipe("en-US");

      const formatteddeliveryDate = datePipe.transform(
        data.delivery_date,
        "yyyy-MM-dd"
      );
      this.routes = data;
      console.log(JSON.stringify(this.routes));

      this.theFormGroup.patchValue({
        id: this.routes.id,
        starting_place: this.routes.starting_place,
        ending_place: this.routes.ending_place,
        distance: this.routes.distance,
        // Fecha formateada
        delivery_date: formatteddeliveryDate, // Fecha formateada
        contract_id: this.routes.contract_id,
        vehicle_id: this.routes.vehicle_id,
      });
    });
  }

  //OJO-----------------------------
  //aqui definimos las reglas
  configFormGroup() {
    this.theFormGroup = this.theFormBuilder.group({
      id: [this.routes.id || ""], // Siempre deshabilitado
      starting_place: [
        "",
        [Validators.required, Validators.pattern("^[a-zA-Z0-9\\s]+$")],
      ],
      ending_place: [
        "",
        [Validators.required, Validators.pattern("^[a-zA-Z0-9\\s]+$")],
      ],
      distance: ["", [Validators.required, Validators.pattern("^[0-9]+$")]],
      delivery_date: ["", [Validators.required]],
      contract_id: [0, [Validators.required, Validators.pattern("^[0-9]+$")]],
      vehicle_id: [0, [Validators.required, Validators.pattern("^[0-9]+$")]],
    });
  }

  //aqui nos indica que regla molesto
  get getTheFormGroup() {
    return this.theFormGroup.controls;
  }
}
