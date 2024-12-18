import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Addrerouteorder } from "src/app/models/addrerouteorder.model";
import { AddrerouteorderService } from "src/app/services/addrerouteorder.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-manage",
  templateUrl: "./manage.component.html",
  styleUrls: ["./manage.component.css"],
})
export class ManageComponent implements OnInit {
  mode: number; //1->View, 2->Create, 3->Update
  AddreRouteOrder: Addrerouteorder;
  theFormGroup: FormGroup;
  trySend: boolean;
  route_id: number;
  address_id: number;

  constructor(
    private activateRoute: ActivatedRoute,
    private AddreRouteOrderService: AddrerouteorderService,
    private router: Router,
    private theFormBuilder: FormBuilder
  ) {
    this.mode = 1;
    this.AddreRouteOrder = { id: 0, address_id: 0, route_id: 0 };
    this.trySend = false;
  }

  ngOnInit(): void {
    this.configFormGroup();
    const currentUrl = this.activateRoute.snapshot.url.join("/");
    if (currentUrl.includes("view")) {
      this.theFormGroup.get("id").disable();
      this.theFormGroup.get("address_id").disable();
      this.theFormGroup.get("route_id").disable();
      this.mode = 1;
    } else if (
      currentUrl.includes("create") &&
      !currentUrl.includes("createForRoute") &&
      !currentUrl.includes("createForAddress")
    ) {
      this.mode = 2;
      this.theFormGroup.get("id").disable();
      this.theFormGroup.get("address_id").enable();
      this.theFormGroup.get("route_id").enable();
    } else if (currentUrl.includes("createForRoute")) {
      // Modo crear para Route
      this.mode = 4;
      this.theFormGroup.get("id").disable();
      this.route_id = +this.activateRoute.snapshot.params["route_id"];
      if (this.route_id) {
        this.AddreRouteOrder.route_id = this.route_id;
        this.theFormGroup.patchValue({ route_id: this.route_id });
        // Deshabilitar route_id solo en modo createForRoute
        this.theFormGroup.get("route_id").disable();
      }
    } else if (currentUrl.includes("createForAddress")) {
      // Modo crear para Address
      this.mode = 5;
      this.theFormGroup.get("id").disable();
      this.address_id = +this.activateRoute.snapshot.params["address_id"];
      console.log("address_id:", this.address_id);
      if (this.address_id) {
        this.AddreRouteOrder.address_id = this.address_id;
        this.theFormGroup.patchValue({ address_id: this.address_id });
        // Deshabilitar address_id solo en modo createForAddress
        this.theFormGroup.get("address_id").disable();
      }
    } else if (currentUrl.includes("update")) {
      this.mode = 3;
      this.theFormGroup.get("id").disable();
    }
    if (this.activateRoute.snapshot.params["id"]) {
      this.AddreRouteOrder.id = +this.activateRoute.snapshot.params["id"];
      this.getAddreRouteOrder(this.AddreRouteOrder.id);
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
    console.log(JSON.stringify(this.AddreRouteOrder));
    this.AddreRouteOrderService.create(this.AddreRouteOrder).subscribe(
      (data) => {
        Swal.fire("Creado", " se ha creado exitosa mente", "success"); //tirulo a la alerta
        this.router.navigate(["addreRouteOrders/list"]);
      }
    );
  }

  createForRoute() {
    console.log("route_id: don chimbo", this.route_id);

    this.AddreRouteOrder.route_id = this.route_id;
    console.log(JSON.stringify(this.AddreRouteOrder));
    this.AddreRouteOrderService.createForRoute(
      this.route_id,
      this.AddreRouteOrder
    ).subscribe((data) => {
      Swal.fire("Creado", "Se ha creado exitosamente", "success");
      // Redirigir a la lista de operaciones de la ruta específica
      this.router.navigate(["addreRouteOrders/filterByRoute", this.route_id]);
    });
  }

  createForAddress() {
    this.AddreRouteOrder.address_id = this.address_id;
    console.log(JSON.stringify(this.AddreRouteOrder));
    this.AddreRouteOrderService.createForAddress(
      this.address_id,
      this.AddreRouteOrder
    ).subscribe((data) => {
      Swal.fire("Creado", "Se ha creado exitosamente", "success");
      // Redirigir a la lista de operaciones de la dirección específica
      this.router.navigate([
        "addreRouteOrders/filterByAddress",
        this.address_id,
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
    console.log(JSON.stringify(this.AddreRouteOrder));
    this.AddreRouteOrderService.update(this.AddreRouteOrder).subscribe(
      (data) => {
        Swal.fire("Actualizado", " se ha actualizado exitosa mente", "success"); //titulo a la alerta
        this.router.navigate(["addreRouteOrders/list"]);
      }
    );
  }

  getAddreRouteOrder(id: number) {
    this.AddreRouteOrderService.view(id).subscribe((data) => {
      this.AddreRouteOrder = data;
      this.theFormGroup.patchValue({
        id: this.AddreRouteOrder.id,
        address_id: this.AddreRouteOrder.address_id,
        route_id: this.AddreRouteOrder.route_id,
      });
    });
  }

  configFormGroup() {
    this.theFormGroup = this.theFormBuilder.group({
      id: [this.AddreRouteOrder.id || 0],
      address_id: [
        this.AddreRouteOrder.address_id || 0,
        [Validators.required, Validators.pattern("^[0-9]+$")],
      ],
      route_id: [
        this.AddreRouteOrder.route_id || 0,
        [Validators.required, Validators.pattern("^[0-9]+$")],
      ],
    });
  }

  get getTheFormGroup() {
    return this.theFormGroup.controls;
  }
}
