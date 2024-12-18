import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { DistributionCenter } from "src/app/models/distribution-center.model";
import { DistributionCenterService } from "src/app/services/distribution-center.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-manage",
  templateUrl: "./manage.component.html",
  styleUrls: ["./manage.component.css"],
})
export class ManageComponent implements OnInit {
  mode: number; //1->View, 2->Create, 3->Update
  theFormGroup: FormGroup;
  trySend: boolean;

  distributionCenter: DistributionCenter;

  constructor(
    private activateRoute: ActivatedRoute,
    private distributionCenterService: DistributionCenterService,
    private router: Router,
    private theFormBuilder: FormBuilder
  ) {
    this.mode = 1;
    this.distributionCenter = {
      id: 0,
      name: "",
      phone: "",
      email: "",
      capacity: 0,
      municipality_id: 0,
      address_id: 0,
    };
    this.trySend = false;
  }

  ngOnInit(): void {
    const currentUrl = this.activateRoute.snapshot.url.join("/");
    if (currentUrl.includes("view")) {
      this.mode = 1;
      this.theFormGroup.get("name").disable();
      this.theFormGroup.get("phone").disable();
      this.theFormGroup.get("email").disable();
      this.theFormGroup.get("capacity").disable();
      this.theFormGroup.get("municipality_id").disable();
      this.theFormGroup.get("address_id").disable();
    } else if (currentUrl.includes("create")) {
      this.mode = 2;
    } else if (currentUrl.includes("update")) {
      this.mode = 3;
    }
    if (this.activateRoute.snapshot.params.id) {
      this.distributionCenter.id = this.activateRoute.snapshot.params.id;
      this.getdistributionCenter(this.distributionCenter.id);
    }
  }

  create() {
    //aqui se crea la data
    if (this.theFormGroup.invalid) {
      this.trySend = true;
      Swal.fire(
        "Error en el formulario",
        "Ingrese correctamente los datos solicitados"
      );
      return;
    }
    console.log(JSON.stringify(this.distributionCenter));
    this.distributionCenterService
      .create(this.distributionCenter)
      .subscribe((data) => {
        Swal.fire("Creado", " se ha creado exitosa mente", "success"); //tirulo a la alerta
        this.router.navigate(["distributionCenters/list"]);
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
    console.log(JSON.stringify(this.distributionCenter));
    this.distributionCenterService
      .update(this.distributionCenter)
      .subscribe((data) => {
        Swal.fire("Actualizado", " se ha actualizado exitosa mente", "success"); //titulo a la alerta
        this.router.navigate(["distributionCenters/list"]);
      });
  }

  //aqui se arma la data
  getdistributionCenter(id: number) {
    this.distributionCenterService.view(id).subscribe((data) => {
      this.distributionCenter = data;
      console.log(JSON.stringify(this.distributionCenter));
    });
  }
  configFormGroup() {
    this.theFormGroup = this.theFormBuilder.group({
      // primer elemento del vector, valor por defecto
      // lista, serán las reglas
      id: [this.distributionCenter.id || ""],
      // VALIDAR EL USUARIO
      name: ["", [Validators.required]],
      phone: ["", [Validators.required]],
      email: ["", [Validators.required]],
      address_id: [0, [Validators.required]],

      municipality_id: [0, [Validators.required]],
      capacity: [0, [Validators.required]],

      // idProjector:[null,[Validators.required]],
    });
  }
  get getTheFormGroup() {
    return this.theFormGroup.controls;
  }
}
