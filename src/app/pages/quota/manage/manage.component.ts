import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Quota } from "src/app/models/quota.model";
import { QuotaService } from "src/app/services/quota.service";
import Swal from "sweetalert2";
import { DatePipe } from "@angular/common";

@Component({
  selector: "app-manage",
  templateUrl: "./manage.component.html",
  styleUrls: ["./manage.component.css"],
})
export class ManageComponent implements OnInit {
  mode: number; //1->View, 2->Create, 3->Update
  quotas: Quota;
  theFormGroup: FormGroup;
  trySend: boolean;
  contract_id: number;

  constructor(
    private activateRoute: ActivatedRoute,
    private quotaService: QuotaService,
    private router: Router,
    private theFormBuilder: FormBuilder
  ) {
    this.mode = 1;
    this.quotas = {
      id: 0,
      amount: 0,
      interest_rate: 0,
      due_date: new Date(),
      contract_id: 0,
      status: false,
    };
    this.trySend = false;
  }

  ngOnInit(): void {
    this.configFormGroup();
    const currentUrl = this.activateRoute.snapshot.url.join("/");
    if (currentUrl.includes("view")) {
      this.mode = 1;
      this.theFormGroup.get("id").disable();
      this.theFormGroup.get("amount").disable();
      this.theFormGroup.get("interest_rate").disable();
      this.theFormGroup.get("due_date").disable();
      this.theFormGroup.get("contract_id").disable();
      this.theFormGroup.get("status").disable();
    } else if (
      currentUrl.includes("create") &&
      !currentUrl.includes("createForContract")
    ) {
      this.mode = 2;
      this.theFormGroup.get("id").disable();
      this.theFormGroup.get("contract_id").enable();
    } else if (currentUrl.includes("createForContract")) {
      // Modo crear para batch
      this.mode = 4;
      this.theFormGroup.get("id").disable();
      this.contract_id = this.activateRoute.snapshot.params.contract_id;

      if (this.contract_id) {
        this.quotas.contract_id = this.contract_id;
        this.theFormGroup.patchValue({ contract_id: this.contract_id });
        // Deshabilitar batch_id solo en modo createForBatch
        this.theFormGroup.get("contract_id").disable();
      }
    } else if (currentUrl.includes("update")) {
      this.mode = 3;
      this.theFormGroup.get("id").disable();
      // PARA QUE NO SE PUEDA CAMBIAR EL STATUS DE UNA QUOTA
      this.theFormGroup.get("status").disable();
    }
    if (this.activateRoute.snapshot.params.id) {
      this.quotas.id = this.activateRoute.snapshot.params.id;
      this.getQuota(this.quotas.id);
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
    console.log(JSON.stringify(this.quotas));
    this.quotaService.create(this.quotas).subscribe((data) => {
      Swal.fire("Creado", " se ha creado exitosa mente", "success"); //tirulo a la alerta
      this.router.navigate(["quotas/list"]);
    });
  }

  createForContract() {
    console.log("hola");

    this.quotas.contract_id = this.contract_id;
    console.log(JSON.stringify(this.quotas));
    this.quotaService
      .createForContract(this.contract_id, this.quotas)
      .subscribe((data) => {
        Swal.fire("Creado", "Se ha creado exitosamente", "success");
        // Redirigir a la lista de productos del lote específico
        this.router.navigate(["quotas/filterByContract", this.contract_id]);
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
    const fechaVencimiento = this.theFormGroup.get("due_date")?.value;
    const fechaVenciminetoDate = new Date(fechaVencimiento);

    console.log(JSON.stringify(this.quotas));
    this.quotaService.update(this.quotas).subscribe((data) => {
      Swal.fire("Actualizado", " se ha actualizado exitosa mente", "success"); //titulo a la alerta
      this.router.navigate(["quotas/list"]);
    });
  }
  payment() {
    console.log(JSON.stringify(this.quotas));
    this.quotaService.update(this.quotas).subscribe((data) => {
      Swal.fire("PAGO", " se ha PAGADO exitosa mente", "success"); //titulo a la alerta
      this.router.navigate(["quotas/list"]);
    });
  }
  //aqui se arma la data
  getQuota(id: number) {
    this.quotaService.view(id).subscribe((data) => {
      this.quotas = data;

      // Format due_date if it's a string or Date
      const formattedDueDate = this.quotas.due_date
        ? new Date(this.quotas.due_date).toISOString().split("T")[0]
        : "";

      this.theFormGroup.patchValue({
        id: this.quotas.id,
        amount: this.quotas.amount,
        interest_rate: this.quotas.interest_rate,
        due_date: formattedDueDate,
        contract_id: this.quotas.contract_id,
        status: this.quotas.status,
      });
    });
  }

  //OJO-----------------------------
  //aqui definimos las reglas
  configFormGroup() {
    this.theFormGroup = this.theFormBuilder.group({
      id: [this.quotas.id || 0],
      amount: [
        this.quotas.amount || 0,
        [
          Validators.required,
          Validators.min(0),
          Validators.max(500000000),
          Validators.pattern("^[0-9]+$"),
        ],
      ],
      interest_rate: [
        this.quotas.interest_rate || 0,
        [
          Validators.required,
          Validators.min(0),
          Validators.max(100),
          Validators.pattern("^[0-9]+$"),
        ],
      ],
      due_date: [this.quotas.due_date || "", Validators.required],
      status: [this.quotas.status || false, Validators.required],
      contract_id: [
        this.quotas.contract_id || 0,
        [Validators.required, Validators.pattern("^[0-9]+$")],
      ],
    });
  }

  //aqui nos indica que regla molesto
  get getTheFormGroup() {
    return this.theFormGroup.controls;
  }
}
