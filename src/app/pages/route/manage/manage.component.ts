import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Routes } from "src/app/models/routes.model";
import { RouteService } from "src/app/services/route.service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import Swal from "sweetalert2";
import { DatePipe } from "@angular/common";
import { start } from "repl";

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

  constructor(
    private activateRoute: ActivatedRoute,
    private productsService: RouteService,
    private router: Router,
    private theFormBuilder: FormBuilder
  ) {
    this.mode = 1;
    this.routes = {
      id: 0,
      startingPlace: "",
      endingPlace: "",
      distance: 0,
      deliveryDate: new Date(),
    };
    this.trySend = false;
  }

  ngOnInit(): void {
    this.configFormGroup();
    const currentUrl = this.activateRoute.snapshot.url.join("/");
    if (currentUrl.includes("view")) {
      this.mode = 1;
      this.theFormGroup.get("id").disable();
      this.theFormGroup.get("startingPlace").disable();
      this.theFormGroup.get("endingPlace").disable();
      this.theFormGroup.get("distance").disable();
      this.theFormGroup.get("deliveryDate").disable();
    } else if (currentUrl.includes("create")) {
      this.mode = 2;
      this.theFormGroup.get("id").disable();
    } else if (currentUrl.includes("update")) {
      this.mode = 3;
      this.theFormGroup.get("id").disable();
    }
    if (this.activateRoute.snapshot.params.id) {
      this.routes.id = this.activateRoute.snapshot.params.id;
      this.getProduct(this.routes.id);
    }
  }

  create() {
    console.log(JSON.stringify(this.routes));
    this.productsService.create(this.routes).subscribe((data) => {
      Swal.fire("Creado", " se ha creado exitosa mente", "success"); //tirulo a la alerta
      this.router.navigate(["routes/list"]);
    });
  }

  update() {
    const fechaExpiration = this.theFormGroup.get("deliveryDate")?.value;
    const fechaExpirationDate = new Date(fechaExpiration);

    //console.log(JSON.stringify(this.routes));
    this.productsService.update(this.routes).subscribe((data) => {
      Swal.fire("Actualizado", " se ha actualizado exitosa mente", "success"); //titulo a la alerta
      this.router.navigate(["routes/list"]);
    });
  }

  //aqui se arma la data
  getProduct(id: number) {
    this.productsService.view(id).subscribe((data) => {
      const datePipe = new DatePipe("en-US");
      this.routes = data;
      const formattedExpirationDate = datePipe.transform(
        data.deliveryDate,
        "yyyy-MM-dd"
      );
      console.log(JSON.stringify(this.routes));

      this.theFormGroup.patchValue({
        id: this.routes.id,
        startingPlace: this.routes.startingPlace,
        endingPlace: this.routes.endingPlace,
        distance: this.routes.distance,
        deliveryDate: formattedExpirationDate,

      });
    });
  }

  //OJO-----------------------------
  //aqui definimos las reglas
  configFormGroup() {
    this.theFormGroup = this.theFormBuilder.group({
      id: [this.routes.id || ""], // Siempre deshabilitado
      startingPlace: ["", [Validators.required]],
      endingPlace: ["", [Validators.required]],
      distance: [0, [Validators.required]],
      deliveryDate: ["", [Validators.required]],
    });
  }

  //aqui nos indica que regla molesto
  get getTheFormGroup() {
    return this.theFormGroup.controls;
  }
}
