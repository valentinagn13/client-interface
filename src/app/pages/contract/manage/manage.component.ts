import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { DatePipe } from "@angular/common";
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  Validators,
} from "@angular/forms";
import Swal from "sweetalert2";

//Importaciones clase
import { Contract } from "src/app/models/contract.model";
import { ContractService } from "src/app/services/contract.service";

@Component({
  selector: "app-manage",
  templateUrl: "./manage.component.html",
  styleUrls: ["./manage.component.css"],
})
export class ManageComponent implements OnInit {
  mode: number; //1->View, 2->Create, 3->Update
  contracts: Contract;
  theFormGroup: FormGroup;
  trySend: boolean;

  constructor(
    private contractService: ContractService,
    private activateRoute: ActivatedRoute,
    private router: Router,
    private theFormBuilder: FormBuilder
  ) {
    this.mode = 1;
    this.contracts = {
      id: 0,
      start_date: new Date(),
      end_date: new Date(),
      client_id: 0,
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
      this.theFormGroup.get("client_id").disable();
    } else if (currentUrl.includes("create")) {
      this.mode = 2;
      this.theFormGroup.get("id").disable();
    } else if (currentUrl.includes("update")) {
      this.mode = 3;
      this.theFormGroup.get("id").disable();
    }
    if (this.activateRoute.snapshot.params.id) {
      this.contracts.id = this.activateRoute.snapshot.params.id;
      this.getContract(this.contracts.id);
    }
  }

  create() {
    console.log(JSON.stringify(this.contracts));
    this.contractService.create(this.contracts).subscribe((data) => {
      Swal.fire("Creado", "El contrato ha sido creado", "success");
      this.router.navigate(["/contracts/list"]);
    });
  }

  update() {
    const fechaInicio = this.theFormGroup.get("start_date")?.value;
    const fechafin = this.theFormGroup.get("end_date")?.value;
    const fechainicioDate = new Date(fechaInicio);
    const fechafinDate = new Date(fechafin);

    if (fechainicioDate > fechafinDate) {
      alert("La fecha de inicio no puede ser mayor a la fecha de fin");
      return;
    }

    this.contractService.update(this.contracts).subscribe((data) => {
      Swal.fire("Actualizado", "El contrato ha sido actualizado", "success");
      this.router.navigate(["/contracts/list"]);
    });
  }

  getContract(id: number) {
    this.contractService.view(id).subscribe((data) => {
      const datePipe = new DatePipe("en-US");
      this.contracts = data;

      //Formatear fechas
      const formattedStartDate = datePipe.transform(
        this.contracts.start_date,
        "yyyy-MM-dd"
      );
      const formattedEndDate = datePipe.transform(
        this.contracts.end_date,
        "yyyy-MM-dd"
      );

      this.theFormGroup.patchValue({
        id: this.contracts.id,
        start_date: formattedStartDate,
        end_date: formattedEndDate,
        client_id: this.contracts.client_id,
      });
    });
  }

  configFormGroup() {
    this.theFormGroup = this.theFormBuilder.group({
      id: [this.contracts.id || ""],
      start_date: ["", [Validators.required]],
      end_date: ["", [Validators.required]],
      client_id: [0, [Validators.required]],
    });
  }

  get getTheFormGroup() {
    return this.theFormGroup.controls;
  }
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
