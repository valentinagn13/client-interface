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
  route: Routes;
  //mode=1 --> viw  , mode=2--> create ,  mode =3 update
  mode: number;

  theFormGroup: FormGroup;
  trySend: boolean;
  constructor(
    private routeService: RouteService,
    private activateRoute: ActivatedRoute, //analizar la url para saber que quiere hacer el user: crear visualizar
    private router: Router, //como me muevo yo en la pagina,gestiona los archivos de .routing para poder navegar : MOVERSE DE UNA COMPONENTE A OTRA
    private theFormBuilder: FormBuilder //* PARA ESTABLECER LAS REGLAS
  ) {
    this.route = { id: 0, startingPlace: "", endingPlace: "", distance: 0, deliveryDate: new Date() };
    this.mode = 1;
    this.trySend = false;
   
  }
  // TOMAR LA FOTO DE LA URL PARTIRLA POR CADA / UNA LISTA CON TODA LA RUTA
  ngOnInit(): void {
    this.configFormGroup(); //* CREAR AL POLICIA
    const currentUrl = this.activateRoute.snapshot.url.join("/");
    if (currentUrl.includes("view")) {
      //LA LISTA INCLUYE LA PALABRA VIW. sI? ES POR QUE QUIERE VISUALIZAR . no? ENTONCES...
      this.mode = 1;
    } else if (currentUrl.includes("create")) {
      this.mode = 2;
    } else if (currentUrl.includes("update")) {
      this.mode = 3;
    }
    if (this.activateRoute.snapshot.params.id) {
      //SI LA RUTA VIENE UN ID, SI VIENE ES EL ID DE UN TEATRO
      this.route.id = this.activateRoute.snapshot.params.id;
      this.getRoute(this.route.id); //PARA QUE TRIGA LA FUNCION DE LISTAR SOLO UN TEATRO CON ESE ID
    }
  } //! lo del correo -importar validators
  configFormGroup() {
    //* UNION ENTRE LA POLICIA Y CONGRESO
    this.theFormGroup = this.theFormBuilder.group({
      // primer elemento del vector, valor por defecto
      // lista, serán las reglas
      id:[this.route.id || 0],
      startingPlace: ["", [Validators.required, Validators.minLength(2)]],
      capacity: [
        0,
        [Validators.required, Validators.min(1), Validators.max(100)], //* 0 PRIMER ELEMENTO EN EL VECTOR VALOR POR DEFECTO QUE PUEDE TENER LA CAPACIDAD
        //* LUEGO LASS REGLAS QUE SE LE VAN A APLICAR
      ],
      location: ["", [Validators.required, Validators.minLength(2)]],
    });
  }
  get getTheFormGroup() {
    //* para que devulva una variable
    return this.theFormGroup.controls; //DEVUELVE LOS CONTROLES
  }
  getRoute(id: number) {
    this.routeService.view(id).subscribe((data) => {
      this.route = data;
    });
  }
  create() {
    if (this.theFormGroup.invalid) {
      if (this.theFormGroup.invalid) {
        Swal.fire("malo ", "error");
        return;
      }
      this.trySend = true;
      Swal.fire(
        "Error en el formulario",
        "Ingrese correctamente los datos solicitados"
      );
      return;
    }
    console.log(JSON.stringify(this.route));
    this.routeService.create(this.route).subscribe((data) => {
      Swal.fire("Creado", "Se ha creado exitosamente", "success");
      this.router.navigate(["routes/list"]);
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
    this.routeService.update(this.route).subscribe((data) => {
      Swal.fire("Creado", "Se ha actualizado exitosamente", "success");
      this.router.navigate(["routes/list"]);
    });
  }
}
