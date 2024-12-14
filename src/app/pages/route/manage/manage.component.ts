import { DatePipe } from "@angular/common";
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
  mode: number; // 1->View, 2->Create, 3->Update
  routes: Routes;
  theFormGroup: FormGroup;
  trySend: boolean;

  constructor(
    private activateRoute: ActivatedRoute,
    private routeService: RouteService,
    private router: Router,
    private theFormBuilder: FormBuilder
  ) {
    this.mode = 1;
    this.routes = {
      id: 0,
      starting_place: "",
      ending_place: "",
      distance:0,
      delivery_date: new Date(),
      contract_id: 0,
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
      this.theFormGroup.get("starting_place").disable();
      this.theFormGroup.get("ending_place").disable();
      this.theFormGroup.get("distance").disable();
      this.theFormGroup.get("delivery_date").disable();
      this.theFormGroup.get("contract_id").disable();
      this.theFormGroup.get("vehicle_id").disable();


    } else if (currentUrl.includes("create")) {
      this.mode = 2;
      this.theFormGroup.get("id").disable();
    } else if (currentUrl.includes("update")) {
      this.mode = 3;
      this.theFormGroup.get("id").disable();
    }
    if (this.activateRoute.snapshot.params.id) {
      this.routes.id = this.activateRoute.snapshot.params.id;
      this.getRoutes(this.routes.id);
    }
   
  }

  


  create() {
    console.log(JSON.stringify(this.routes));
    this.routeService.create(this.routes).subscribe((data) => {
      Swal.fire("Creado", " se ha creado exitosa mente", "success"); //tirulo a la alerta
      this.router.navigate(["routes/list"]);
    });
  }

 
  update(){
    const fechaEntrega = this.theFormGroup.get("delivery_date")?.value;
    const fechaEntregaDate = new Date(fechaEntrega);
    
    //console.log(JSON.stringify(this.products));
    this.routeService.update(this.routes).subscribe(data=>{
      Swal.fire("Actualizado"," se ha actualizado exitosa mente", "success")//titulo a la alerta
      this.router.navigate(["routes/list"]); 
    })
    
  }

   //aqui se arma la data
   getRoutes(id:number){
    this.routeService.view(id).subscribe(data=>{
      const datePipe = new DatePipe("en-US");  
      
      const formatteddeliveryDate = datePipe.transform(
        data.delivery_date,
        "yyyy-MM-dd"
      );
      this.routes = data; 
      console.log(JSON.stringify(this.routes));
      
      this.theFormGroup.patchValue({
        id: this.routes.id,
        starting_place: this.routes.starting_place,
        ending_place: this.routes.ending_place,
        distance: this.routes.distance,
  // Fecha formateada
        delivery_date: formatteddeliveryDate, // Fecha formateada
        contract_id: this.routes.contract_id,
        vehicle_id: this.routes.vehicle_id,
      });
    });
  }

  //OJO-----------------------------
  //aqui definimos las reglas
  configFormGroup() {
    this.theFormGroup = this.theFormBuilder.group({
      id: [this.routes.id || "" ], // Siempre deshabilitado
      starting_place: ["", [Validators.required, Validators.pattern('^[a-zA-Z0-9\\s]+$')]],
      ending_place:["",[Validators.required, Validators.pattern('^[a-zA-Z0-9\\s]+$')]],
      distance: ["",[Validators.required, Validators.pattern("^[0-9]+$")]],
      delivery_date: ["",[Validators.required]],
      contract_id: [0, [Validators.required, Validators.pattern("^[0-9]+$")]],
      vehicle_id: [0, [Validators.required, Validators.pattern("^[0-9]+$")]],
    });
  }

  //aqui nos indica que regla molesto
  get getTheFormGroup() {
    return this.theFormGroup.controls;
  
}
}