import { Component, OnInit } from "@angular/core";
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  Validators,
} from "@angular/forms";
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
    } else if (currentUrl.includes("create")) {
      this.mode = 2;
      this.theFormGroup.get("id").disable();
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
    console.log(JSON.stringify(this.insurances));
    this.insurancesService.create(this.insurances).subscribe((data) => {
      Swal.fire("Creado", " se ha creado exitosa mente", "success"); //tirulo a la alerta
      this.router.navigate(["insurances/list"]);
    });
  }

  update() {
    const fechaInicio = this.theFormGroup.get("start_date")?.value;
    const fechafin = this.theFormGroup.get("end_date")?.value;
    const fechainicioDate = new Date(fechaInicio);
    const fechafinDate = new Date(fechafin);

    if(fechainicioDate > fechafinDate){
      alert( "La fecha de inicio no puede ser mayor a la fecha de fin");
      return;
    }
/* console.log("fecha inicio" ,fechaInicio);
console.log("fecha fin" ,fechafinDate);
console.log("fecha inicio Date" ,fechainicioDate);
console.log("fecha fin Date" ,fechafinDate); */


    //console.log(JSON.stringify(this.insurances));
    this.insurancesService.update(this.insurances).subscribe((data) => {
      Swal.fire("Actualizado", " se ha actualizado exitosa mente", "success"); //titulo a la alerta
      this.router.navigate(["insurances/list"]);
    });
  }
  /*  private formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Mes en dos dígitos
    const day = String(date.getDate()).padStart(2, '0'); // Día en dos dígitos
    const hours = String(date.getHours()).padStart(2, '0'); // Hora en dos dígitos
    const minutes = String(date.getMinutes()).padStart(2, '0'); // Minutos en dos dígitos
    const seconds = String(date.getSeconds()).padStart(2, '0'); // Segundos en dos dígitos

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  }

  private formatDates(): void {
    this.insurances.start_date = this.formatDate(new Date(this.insurances.start_date)) as unknown as Date;
    this.insurances.end_date = this.formatDate(new Date(this.insurances.end_date)) as unknown as Date;
  } */

  //aqui se arma la data
  getInsurance(id: number) {
    this.insurancesService.view(id).subscribe((data) => {
      const datePipe = new DatePipe("en-US");
      this.insurances = data;

      // Formatear las fechas antes de asignarlas
      const formattedStartDate = datePipe.transform(
        this.insurances.start_date,
        "yyyy-MM-dd"
      );
      const formattedEndDate = datePipe.transform(
        this.insurances.end_date,
        "yyyy-MM-dd"
      );

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

  private parseDateFromString(dateString: string): Date {
    const [day, month, year] = dateString.split("/");
    return new Date(`${year}-${month}-${day}`);
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
        [Validators.required, Validators.pattern("^[a-zA-Z0-9]+$")],
      ],
      start_date: ["", [Validators.required]],
      end_date: ["", [Validators.required]],
      insurance_company: [
        "",
        [Validators.required, Validators.pattern("^[a-zA-Z0-9]+$")],
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

  // Validador personalizado para verificar las fechas
  /* dateValidator(control: AbstractControl): ValidationErrors | null {
    const startDate = control.get('start_date')?.value;
    const endDate = control.get('end_date')?.value;
    const today = new Date().toISOString().split('T')[0];

    if (!startDate || !endDate) {
      return null; // No validar si alguna de las fechas está vacía
    }

    const startDateValid = startDate >= today;
    const endDateValid = endDate >= today;
    const datesValid = startDate < endDate;

    if (!startDateValid) {
      return { startDateInvalid: true };
    }

    if (!endDateValid) {
      return { endDateInvalid: true };
    }

    if (!datesValid) {
      return { startDateAfterEndDate: true };
    }

    return null;
  }
 */

  validateStartDate(control: AbstractControl): ValidationErrors | null {
    const startDate = control.value;

    if (!startDate) {
      return null; // No hay error si la fecha está vacía
    }

    const startDateObj = new Date(startDate);
    if (startDateObj < new Date()) {
      return { startDateInvalid: true }; // Error si la fecha de inicio está en el pasado
    }

    return null; // Sin errores
  }

  validateEndDate(control: AbstractControl): ValidationErrors | null {
    const startDate = this.theFormGroup?.get("start_date")?.value;
    const endDate = control.value;

    if (!startDate || !endDate) {
      return null; // No hay error si alguno de los campos está vacío
    }

    const startDateObj = new Date(startDate);
    const endDateObj = new Date(endDate);

    if (endDateObj < startDateObj) {
      return { startDateAfterEndDate: true }; // Error si la fecha de fin es anterior a la de inicio
    }

    if (endDateObj < new Date()) {
      return { endDateInvalid: true }; // Error si la fecha de fin está en el pasado
    }

    return null; // Sin errores
  }
}
