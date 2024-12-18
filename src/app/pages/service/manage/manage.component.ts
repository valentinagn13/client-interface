import { DatePipe } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { log } from "node:console";
import { Administrator } from "src/app/models/administrator.model";
import { Service } from "src/app/models/service.model";
import { AdministratorService } from "src/app/services/administrator.service";
import { ServiceService } from "src/app/services/service.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-manage",
  templateUrl: "./manage.component.html",
  styleUrls: ["./manage.component.css"],
})
export class ManageComponent implements OnInit {
  service: Service;
  //mode=1 --> viw  , mode=2--> create ,  mode =3 update
  mode: number;
  theFormGroup: FormGroup;
  trySend: boolean;
  administrator:Administrator[]

  constructor(
    private serviceService: ServiceService,
    private activateRoute: ActivatedRoute, //analizar la url para saber que quiere hacer el user: crear visualizar
    private router: Router, //como me muevo yo en la pagina,gestiona los archivos de .routing para poder navegar : MOVERSE DE UNA COMPONENTE A OTRA
    private theFormBuilder: FormBuilder, //* PARA ESTABLECER LAS REGLAS
    private administratorService: AdministratorService
  ) {
    this.administrator= []
    this.mode = 1;
    this.trySend = false;
    this.configFormGroup(); //* CREAR AL POLICIA

    this.service = {
      id: 0,
      name: "",
      address: "",
      description: "",
      date: new Date(),
      administrator:{
        id: null
      }
    };
  }

  AdministratorList(){
    this.administratorService.list().subscribe((data)=>{
      this.administrator= data;
      console.log(this.administrator);
      
    })
  }
  ngOnInit(): void {
    this.AdministratorList()
    this.configFormGroup
    const currentUrl = this.activateRoute.snapshot.url.join("/");
    if (currentUrl.includes("view")) {
      this.mode = 1;
      this.theFormGroup.get("name").disable();
      this.theFormGroup.get("address").disable();
      this.theFormGroup.get("description").disable();
      this.theFormGroup.get("date").disable();
      this.theFormGroup.get("administrator").disable();
    } else if (currentUrl.includes("create")) {
      this.mode = 2;
    } else if (currentUrl.includes("update")) {
      this.mode = 3;
    }
    if (this.activateRoute.snapshot.params.id) {
      this.service.id = this.activateRoute.snapshot.params.id;
      this.getService(this.service.id);
    }
  }
  configFormGroup() {
    //* UNION ENTRE LA POLICIA Y CONGRESO
    this.theFormGroup = this.theFormBuilder.group({
      name: ["", [Validators.required]],
      address: ["", [Validators.required]],
      description: ["", [Validators.required]],
      date: ["", [Validators.required]],
      administrator: [null, [Validators.required]],
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
    console.log(JSON.stringify(this.service));
    this.serviceService.create(this.service).subscribe((data) => {
      Swal.fire("Creado", " se ha creado exitosa mente", "success"); //tirulo a la alerta
      this.router.navigate(["service/list"]);
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
    console.log(JSON.stringify(this.service));
    this.serviceService.update(this.service).subscribe((data) => {
      Swal.fire("Actualizado", " se ha actualizado exitosa mente", "success"); //titulo a la alerta
      this.router.navigate(["service/list"]);
    });
  }

  //aqui se arma la dataaaa
  getService(id: number) {
    this.serviceService.view(id).subscribe((data) => {
      const datePipe = new DatePipe("en-US");
      const formattedtDate = datePipe.transform(data.date, "yyyy-MM-dd");
      this.service = data;
      if(this.service.administrator==null){
        this.service.administrator={
          id:null
        }
      }
      console.log(JSON.stringify(this.service));
      console.log(this.service);
      this.theFormGroup.patchValue({
        name: this.service.name,
        address: this.service.address,
        description: this.service.description,
        date: formattedtDate,
        idAdministrator: this.service.administrator.id
      });
      console.log(JSON.stringify(this.service));
      console.log(this.service);
    });
  }
}
