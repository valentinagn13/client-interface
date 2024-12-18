import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Vehicledriver } from "src/app/models/vehicledriver.model";
import { VehicledriverService } from "src/app/services/vehicledriver.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-manage",
  templateUrl: "./manage.component.html",
  styleUrls: ["./manage.component.css"],
})
export class ManageComponent implements OnInit {
  mode: number; //1->View, 2->Create, 3->Update
  vehicledriver: Vehicledriver;
  theFormGroup: FormGroup; //! EL POLICIA QUIEN HACE CUMPIR LAS REGLAS
  trySend: boolean;
  driver_id:number
  vehicle_id:number
  
  constructor(
    private activateRoute: ActivatedRoute,
    private vehiclesService: VehicledriverService,
    private router: Router,
    private theFormBuilder: FormBuilder //* PARA ESTABLECER LAS REGLAS
  
  ) {
    this.mode = 1;
    this.trySend = false;
    this.configFormGroup(); //* CREAR AL POLICIA
    this.vehicledriver = {
      id: 0,
      vehicle_id: 0,
      driver_id: 0,
    };
  }

  ngOnInit(): void {
    const currentUrl = this.activateRoute.snapshot.url.join("/");
    if (currentUrl.includes("view")) {
      this.theFormGroup.get("vehicle_id").disable();
      this.theFormGroup.get("driver_id").disable();
      this.mode = 1;
    } else if (currentUrl.includes("create") && !currentUrl.includes("createForDriver") && !currentUrl.includes("createForVehicle")) {
      this.mode = 2;
      this.theFormGroup.get("driver_id").enable();
      this.theFormGroup.get("vehicle_id").enable();
   
    } else if (currentUrl.includes("createForDriver")) {
      // Modo crear para Municipio
      this.mode = 4;
      this.driver_id = this.activateRoute.snapshot.params.driver_id;
      
      if (this.driver_id) {
        this.vehicledriver.driver_id = this.driver_id;
        this.theFormGroup.patchValue({ driver_id: this.driver_id });
        // Deshabilitar municipality_id solo en modo createForMunicipality
        this.theFormGroup.get("driver_id").disable();
      }
    }
      else if(currentUrl.includes("createForVehicle")) {
        // Modo crear para Vehiculo
        this.mode = 5;
        this.vehicle_id = this.activateRoute.snapshot.params.vehicle_id;
        console.log("vehicle_id:", this.vehicle_id);
        
        if (this.vehicle_id) {
          this.vehicledriver.vehicle_id = this.vehicle_id;
          this.theFormGroup.patchValue({ vehicle_id: this.vehicle_id });
          // Deshabilitar vehicle_id solo en modo createForVehicle
          this.theFormGroup.get("vehicle_id").disable();
        }
    } else if (currentUrl.includes("update")) {
      this.mode = 3;
    }
    if (this.activateRoute.snapshot.params.id) {
      this.vehicledriver.id = this.activateRoute.snapshot.params.id;
      this.getVehicle(this.vehicledriver.id);
    }
  }
  configFormGroup() {
    //* UNION ENTRE LA POLICIA Y CONGRESO
    this.theFormGroup = this.theFormBuilder.group({
      vehicle_id: [0, [Validators.required, Validators.pattern("^[0-9]+$")]],
      driver_id: [0, [Validators.required, Validators.pattern("^[0-9]+$")]],
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
    console.log(JSON.stringify(this.vehicledriver));
    this.vehiclesService.create(this.vehicledriver).subscribe((data) => {
      Swal.fire("Creado", " se ha creado exitosa mente", "success"); //tirulo a la alerta
      this.router.navigate(["vehicleDriver/list"]);
    });
  }

  createForDriver() {
          this.vehicledriver.driver_id = this.driver_id;
          console.log(JSON.stringify(this.vehicledriver));
          this.vehiclesService.createForDriver(this.driver_id, this.vehicledriver).subscribe((data) => {
            Swal.fire("Creado", "Se ha creado exitosamente", "success");
            // Redirigir a la lista de dueños vehiculos del conductor específico
            this.router.navigate(["vehicleDriver/filterByDriver", this.driver_id]);
          });
        }
        createForVehicle() {
          this.vehicledriver.vehicle_id = this.vehicle_id;
          console.log(JSON.stringify(this.vehicledriver));
          this.vehiclesService.createForVehicle(this.vehicle_id, this.vehicledriver).subscribe((data) => {
            Swal.fire("Creado", "Se ha creado exitosamente", "success");
            // Redirigir a la lista de operaciones del vehiculo específico
            this.router.navigate(["vehicleDriver/filterByVehicle", this.vehicle_id]);
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
    console.log(JSON.stringify(this.vehicledriver));
    this.vehiclesService.update(this.vehicledriver).subscribe((data) => {
      Swal.fire("Actualizado", " se ha actualizado exitosa mente", "success"); //titulo a la alerta
      this.router.navigate(["vehicleDriver/list"]);
    });
  }

  //aqui se arma la data
  getVehicle(id: number) {
    this.vehiclesService.view(id).subscribe((data) => {
      this.vehicledriver = data;
      console.log(JSON.stringify(this.vehicledriver));
      this.theFormGroup.patchValue({
        // status: this.invoice.status,
        vehicle_id: this.vehicledriver.vehicle_id,
        driver_id: this.vehicledriver.driver_id,
      });
      console.log(JSON.stringify(this.vehicledriver));
      console.log(this.vehicledriver);
    });
  }
}
