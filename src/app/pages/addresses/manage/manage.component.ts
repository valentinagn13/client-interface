import { Component, OnInit } from "@angular/core";
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  Validators,
} from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { log } from "console";
import { map, Observable } from "rxjs";
import { Address } from "src/app/models/address.model";
import { AddressService } from "src/app/services/address.service";
import { MunicipalityService } from "src/app/services/municipality.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-manage",
  templateUrl: "./manage.component.html",
  styleUrls: ["./manage.component.css"],
})
export class ManageComponent implements OnInit {
  mode: number; //1->View, 2->Create, 3->Update
  address: Address;
  theFormGroup: FormGroup;
  trySend: boolean;
  ocultarId: boolean = false;
  municipioslista = [];
  selectedMunicipioId: number = 0;

  constructor(
    private activateRoute: ActivatedRoute,
    private router: Router,
    private addressService: AddressService,
    private theFormBuilder: FormBuilder
  ) {
    this.mode = 1;
    this.address = {
      id: 0,
      street: "",
      number: "",
      neighborhood: "",
      reference: "",
      municipality_id: 0,
    };
    this.trySend = false;
  }

  ngOnInit(): void {
    this.configFormGroup();
    console.log("ocultarid", this.ocultarId);
    this.municipios();
    const currentUrl = this.activateRoute.snapshot.url.join("/");
    if (currentUrl.includes("view")) {
      this.mode = 1;
      this.theFormGroup.get("id").disable();
      this.theFormGroup.get("street").disable();
      this.theFormGroup.get("number").disable();
      this.theFormGroup.get("neighborhood").disable();
      this.theFormGroup.get("reference").disable();
      this.theFormGroup.get("municipality_id").disable();
      console.log("ocultarid", this.ocultarId);
    } else if (currentUrl.includes("create")) {
      this.mode = 2;
      this.theFormGroup.get("id").disable();
    } else if (currentUrl.includes("update")) {
      this.mode = 3;
      this.theFormGroup.get("id").disable();
    }
    if (this.activateRoute.snapshot.params.id) {
      this.address.id = this.activateRoute.snapshot.params.id;
      this.getAddress(this.address.id);
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
    console.log(JSON.stringify(this.address));
    this.addressService.create(this.address).subscribe((data) => {
      Swal.fire("Creado", " se ha creado exitosa mente", "success"); //tirulo a la alerta
      this.router.navigate(["addresses/list"]);
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
    console.log(JSON.stringify(this.address));
    this.addressService.update(this.address).subscribe((data) => {
      Swal.fire("Actualizado", " se ha actualizado exitosa mente", "success"); //titulo a la alerta
      this.router.navigate(["addresses/list"]);
    });
  }

  //aqui se arma la data
  getAddress(id: number) {
    this.addressService.view(id).subscribe((data) => {
      this.address = data;
      console.log(JSON.stringify(this.address));
    });
  }

  //OJO-----------------------------
  //aqui definimos las reglas
  configFormGroup() {
    this.theFormGroup = this.theFormBuilder.group({
      // primer elemento del vector, valor por defecto
      // lista, serán las reglas
      id: [this.address.id || ""],
      street: [
        "",
        [Validators.required, Validators.pattern("^[a-zA-Z0-9\\s]+$")],
      ], // Letras, números y espacios
      number: [
        "",
        [Validators.required, Validators.pattern("^[a-zA-Z0-9\\s]+$")],
      ], // Letras, números y espacios
      neighborhood: [
        "",
        [Validators.required, Validators.pattern("^[a-zA-Z0-9\\s]+$")],
      ], // Letras, números y espacios
      reference: [
        "",
        [Validators.required, Validators.pattern("^[a-zA-Z0-9\\s]+$")],
      ], // Letras, números y espacios
      municipality_id: [0, [Validators.required]],

      // idProjector:[null,[Validators.required]],
    });
  }
  //aqui nos indica que regla molesto
  //aqui nos indica que regla molesto
  get getTheFormGroup() {
    return this.theFormGroup.controls;
  }


    municipios() {
      this.municipioslista = [
        { id: 1, name: 'Bogotá' },
        { id: 2, name: 'Medellín' },
        { id: 3, name: 'Cali' },
        { id: 4, name: 'Barranquilla' },
        { id: 5, name: 'Cartagena' },
        { id: 6, name: 'Cúcuta' },
        { id: 7, name: 'Bucaramanga' },
        { id: 8, name: 'Pereira' },
        { id: 9, name: 'Santa Marta' },
        { id: 10, name: 'Ibagué' },
        { id: 11, name: 'Manizales' },
        { id: 12, name: 'Villavicencio' },
        { id: 13, name: 'Neiva' },
        { id: 14, name: 'Armenia' },
        { id: 15, name: 'Pasto' },
        { id: 16, name: 'Montería' },
        { id: 17, name: 'Valledupar' },
        { id: 18, name: 'Sincelejo' },
        { id: 19, name: 'Popayán' },
        { id: 20, name: 'Tunja' },
        { id: 21, name: 'Florencia' },
        { id: 22, name: 'Quibdó' },
        { id: 23, name: 'Riohacha' },
        { id: 24, name: 'San Andrés' },
        { id: 25, name: 'Leticia' },
        { id: 26, name: 'Mocoa' },
        { id: 27, name: 'San José del Guaviare' },
        { id: 28, name: 'Puerto Carreño' },
        { id: 29, name: 'Inírida' },
        { id: 30, name: 'Mitú' },
        { id: 31, name: 'Arauca' },
        { id: 32, name: 'Yopal' },
        { id: 33, name: 'Buenaventura' },
        { id: 34, name: 'Tumaco' },
        { id: 35, name: 'Turbo' }
      ];
    }
    onSelectChange() {
      this.selectedMunicipioId = this.theFormGroup.get('municipality_id')?.value;
    }
  

}
