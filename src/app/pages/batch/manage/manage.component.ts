import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import Swal from "sweetalert2";

//Importaciones de la clase
import { Batch } from "src/app/models/batch.model";
import { BatchService } from "src/app/services/batch.service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: "app-manage",
  templateUrl: "./manage.component.html",
  styleUrls: ["./manage.component.css"],
})
export class ManageComponent implements OnInit {
  mode: number; //1->View, 2->Create, 3->Update
  batch: Batch;
  theFormGroup: FormGroup;
  trySend: boolean;
  route_id: number;

  constructor(
    private activateRoute: ActivatedRoute,
    private router: Router,
    private batchService: BatchService,
    private theFormBuilder: FormBuilder
  ) {
    this.mode = 1;
    this.batch = { id: 0, weight: 0, route_id: 0, addre_route_orders: 0 };
  }

  ngOnInit(): void {
    this.configFormGroup();
    const currentUrl = this.activateRoute.snapshot.url.join("/");
    if (currentUrl.includes("view")) {
      this.mode = 1;
      this.theFormGroup.get("id").disable();
      this.theFormGroup.get("weight").disable();
      this.theFormGroup.get("route_id").disable();
      this.theFormGroup.get("addre_route_orders").disable();
    } else if (currentUrl.includes("create") && !currentUrl.includes("createForRoute")) {
      this.mode = 2;
      this.theFormGroup.get("id").disable();
      this.theFormGroup.get("route_id").enable();

    }else if(currentUrl.includes("createForRoute")){
 // Modo crear para batch
 this.mode = 4;
 this.theFormGroup.get("id").disable();
 this.route_id = this.activateRoute.snapshot.params.route_id;
 
 if (this.route_id) {
   this.batch.route_id = this.route_id;
   this.theFormGroup.patchValue({ batch_id: this.route_id });
   // Deshabilitar batch_id solo en modo createForBatch
   this.theFormGroup.get("route_id").disable();
 }
    } else if (currentUrl.includes("update")) {
      this.mode = 3;
      this.theFormGroup.get("id").disable();
    }
    if (this.activateRoute.snapshot.params.id) {
      this.batch.id = this.activateRoute.snapshot.params.id;
      this.getBatch(this.batch.id);
    }
  }

  create() {
    console.log(JSON.stringify(this.batch));
    this.batchService.create(this.batch).subscribe((data) => {
      Swal.fire("Creado", " se ha creado exitosa mente", "success"); //tirulo a la alerta
      this.router.navigate(["batches/list"]);
    });
  }
  
      createForRoute() {
        this.batch.route_id = this.route_id;
        console.log(JSON.stringify(this.batch));
        this.batchService.createForRoute(this.route_id, this.batch).subscribe((data) => {
          Swal.fire("Creado", "Se ha creado exitosamente", "success");
          // Redirigir a la lista de productos del lote específico
          this.router.navigate(["batches/filterByRoute", this.route_id]);
        });
      }

  update() {
    console.log(JSON.stringify(this.batch));
    this.batchService.update(this.batch).subscribe((data) => {
      Swal.fire("Actualizado", " se ha actualizado exitosa mente", "success"); //titulo a la alerta
      this.router.navigate(["batches/list"]);
    });
  }
  

  getBatch(id: number) {
    this.batchService.view(id).subscribe((data) => {
      this.batch = data;
      console.log(JSON.stringify(this.batch));
    });
  }

  configFormGroup() {
    this.theFormGroup = this.theFormBuilder.group({
      // primer elemento del vector, valor por defecto
      // lista, serán las reglas
      id: [this.batch.id || ""],
      weight: [0, [Validators.required, Validators.min(1), Validators.max(1000)]],
      route_id: ["", [Validators.required, Validators.pattern("^[0-9]+$")], ],
      addre_route_orders: [
        0,
        [Validators.required, Validators.pattern("^[0-9]+$")],
      ]
    });
  }

  //aqui nos indica que regla molesto
  get getTheFormGroup() {
    return this.theFormGroup.controls;
  }
}
