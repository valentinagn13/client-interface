import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Owner } from "src/app/models/owner.model";
import { OwnerService } from "src/app/services/owner.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-manage",
  templateUrl: "./manage.component.html",
  styleUrls: ["./manage.component.css"],
})
export class ManageComponent implements OnInit {
  mode: number; //1->View, 2->Create, 3->Update
  owners: Owner;
  theFormGroup: FormGroup;
  trySend: boolean;

  constructor(
    private activateRoute: ActivatedRoute,
    private vehiclesService: OwnerService,
    private router: Router,
    private theFormBuilder: FormBuilder
  ) {
    this.mode = 1;
    this.owners = { id: 0, user_id: "", phone_number: 0, driver_id: 0 };
    this.trySend = false;
  }

  ngOnInit(): void {
    this.configFormGroup();
    const currentUrl = this.activateRoute.snapshot.url.join("/");
    if (currentUrl.includes("view")) {
      this.mode = 1;
      this.theFormGroup.get("id").disable();
      this.theFormGroup.get("user_id").disable();
      this.theFormGroup.get("phone_number").disable();
      this.theFormGroup.get("driver_id").disable();
    } else if (currentUrl.includes("create")) {
      this.mode = 2;
      this.theFormGroup.get("id").disable();
    } else if (currentUrl.includes("update")) {
      this.mode = 3;
      this.theFormGroup.get("id").disable();
    }
    if (this.activateRoute.snapshot.params.id) {
      this.owners.id = this.activateRoute.snapshot.params.id;
      this.getOwner(this.owners.id);
    }
  }

  create() {
    console.log(JSON.stringify(this.owners));
    this.vehiclesService.create(this.owners).subscribe((data) => {
      Swal.fire("Creado", " se ha creado exitosa mente", "success"); //tirulo a la alerta
      this.router.navigate(["owners/list"]);
    });
  }

  update() {
    console.log(JSON.stringify(this.owners));
    this.vehiclesService.update(this.owners).subscribe((data) => {
      Swal.fire("Actualizado", " se ha actualizado exitosa mente", "success"); //titulo a la alerta
      this.router.navigate(["owners/list"]);
    });
  }

  //aqui se arma la data
  getOwner(id: number) {
    this.vehiclesService.view(id).subscribe((data) => {
      this.owners = data;
      //console.log(data['cliente']+ "machio aqui estoy");

      console.log(JSON.stringify(this.owners));
    });
  }

    //OJO-----------------------------
  //aqui definimos las reglas
  configFormGroup() {
    this.theFormGroup = this.theFormBuilder.group({
      // primer elemento del vector, valor por defecto
      // lista, serán las reglas
      id: [this.owners.id || ""],
      user_id: ["", [Validators.required]],
      phone_number: [0, [Validators.required, Validators.max(9999999999)]],
      driver_id: [
        0,
        [Validators.required, Validators.pattern("^[0-9]+$")],
      ]
    });
  }

  //aqui nos indica que regla molesto
  get getTheFormGroup() {
    return this.theFormGroup.controls;
  }
}
