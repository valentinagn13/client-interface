import { Component, OnInit } from "@angular/core";
import { Expense } from "src/app/models/expense.model";
import { ExpenseService } from "src/app/services/expense.service";
import { ActivatedRoute, Router } from "@angular/router";
import Swal from "sweetalert2";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: "app-manage",
  templateUrl: "./manage.component.html",
  styleUrls: ["./manage.component.css"],
})
export class ManageComponent implements OnInit {
  expense: Expense;
  mode: number;
  theFormGroup: FormGroup; //! EL POLICIA QUIEN HACE CUMPIR LAS REGLAS
  trySend: boolean;
  driver_id:number
  service_id:number
  owner_id:number
  constructor(
    private expenseService: ExpenseService,
    private activateRoute: ActivatedRoute, //analizar la url para saber que quiere hacer el user: crear visualizar
    private router: Router, //como me muevo yo en la pagina,gestiona los archivos de .routing para poder navegar : MOVERSE DE UNA COMPONENTE A OTRA
    private theFormBuilder: FormBuilder //* PARA ESTABLECER LAS REGLAS
  ) {
    this.mode = 1;
    this.trySend = false;
    this.configFormGroup(); //* CREAR AL POLICIA
    this.expense = {
      id: 0,
      amount: 0,
      service_id: 0,
      driver_id: 0,
      owner_id: 0,
    };
  }
  ngOnInit(): void {
    const currentUrl = this.activateRoute.snapshot.url.join("/");
    if (currentUrl.includes("view")) {
      this.mode = 1;
      this.theFormGroup.get("amount").disable();
      this.theFormGroup.get("service_id").disable();
      this.theFormGroup.get("driver_id").disable();
      this.theFormGroup.get("owner_id").disable();
    } else if (currentUrl.includes("create") && !currentUrl.includes("createForDriver") && !currentUrl.includes("createForService")&& !currentUrl.includes("createForOwner")) {
      this.mode = 2;
      this.theFormGroup.get("driver_id").enable();
      this.theFormGroup.get("service_id").enable();
      this.theFormGroup.get("owner_id").enable();

    } else if (currentUrl.includes("createForDriver")) {
      // Modo crear para Municipio
      this.mode = 4;
   
      this.driver_id = this.activateRoute.snapshot.params.driver_id;
      
      if (this.driver_id) {
        this.expense.driver_id = this.driver_id;
        this.theFormGroup.patchValue({ driver_id: this.driver_id });
        // Deshabilitar municipality_id solo en modo createForMunicipality
        this.theFormGroup.get("driver_id").disable();
      }
    }
      else if(currentUrl.includes("createForService")) {
        // Modo crear para Vehiculo
        this.mode = 5;
        this.service_id = this.activateRoute.snapshot.params.service_id;
        console.log("service_id:", this.service_id);
        
        if (this.service_id) {
          this.expense.service_id = this.service_id;
          this.theFormGroup.patchValue({ vehicle_id: this.service_id });
          // Deshabilitar vehicle_id solo en modo createForVehicle
          this.theFormGroup.get("service_id").disable();
        }
      }   
        else if (currentUrl.includes("createForOwner")) {
          // Modo crear para Municipio
          this.mode = 6;
       
          this.owner_id = this.activateRoute.snapshot.params.owner_id;
          
          if (this.owner_id) {
            this.expense.owner_id = this.owner_id;
            this.theFormGroup.patchValue({ owner_id: this.owner_id });
            // Deshabilitar municipality_id solo en modo createForMunicipality
            this.theFormGroup.get("owner_id").disable();
          }
        
      
    } else if (currentUrl.includes("update")) {
      this.mode = 3;
    }
    if (this.activateRoute.snapshot.params.id) {
      this.expense.id = this.activateRoute.snapshot.params.id;
      this.getExpense(this.expense.id);
    }
  }
  configFormGroup() {
    //* UNION ENTRE LA POLICIA Y CONGRESO
    this.theFormGroup = this.theFormBuilder.group({
      amount: [0, [Validators.required, Validators.pattern("^[0-9]+$")]],
      service_id: [0, [Validators.required, Validators.pattern("^[0-9]+$")]],
      driver_id: [0, [Validators.required, Validators.pattern("^[0-9]+$")]],
      owner_id: [0, [Validators.required, Validators.pattern("^[0-9]+$")]],
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
    console.log(JSON.stringify(this.expense));
    this.expenseService.create(this.expense).subscribe((data) => {
      Swal.fire("Creado", " se ha creado exitosa mente", "success"); //tirulo a la alerta
      this.router.navigate(["expense/list"]);
    });
  }

    createForDriver() {
          this.expense.driver_id = this.driver_id;
          console.log(JSON.stringify(this.expense));
          this.expenseService.createForDriver(this.driver_id, this.expense).subscribe((data) => {
            Swal.fire("Creado", "Se ha creado exitosamente", "success");
            // Redirigir a la lista de Gastos del Conductor específico
            this.router.navigate(["expense/filterByDriver", this.driver_id]);
          });
        }
        createForService() {
          this.expense.service_id = this.service_id;
          console.log(JSON.stringify(this.expense));
          this.expenseService.createForService(this.service_id, this.expense).subscribe((data) => {
            Swal.fire("Creado", "Se ha creado exitosamente", "success");
            // Redirigir a la lista de gasto del Servicio específico
            this.router.navigate(["expense/filterByService", this.service_id]);
          });
        }
        createForOwner() {
          this.expense.owner_id = this.owner_id;
          console.log(JSON.stringify(this.expense));
          this.expenseService.createForOwner(this.owner_id, this.expense).subscribe((data) => {
            Swal.fire("Creado", "Se ha creado exitosamente", "success");
            // Redirigir a la lista de Gastos del Conductor específico
            this.router.navigate(["expense/filterByOwner", this.owner_id]);
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
    console.log(JSON.stringify(this.expense));
    this.expenseService.update(this.expense).subscribe((data) => {
      Swal.fire("Actualizado", " se ha actualizado exitosa mente", "success"); //titulo a la alerta
      this.router.navigate(["expense/list"]);
    });
  }

  //aqui se arma la dataaaa
  getExpense(id: number) {
    this.expenseService.view(id).subscribe((data) => {
      this.expense = data;
      console.log(JSON.stringify(this.expense));
      console.log(this.expense);
      this.theFormGroup.patchValue({
        amount: this.expense.amount,
        service_id: this.expense.service_id,
        driver_id: this.expense.driver_id,
        owner_id: this.expense.owner_id,
      });
      console.log(JSON.stringify(this.expense));
      console.log(this.expense);
    });
  }
}
