import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Product } from "src/app/models/product.model";
import { ProductService } from "src/app/services/product.service";
import {
  FormBuilder,
  FormGroup,
  Validators,
} from "@angular/forms";
import Swal from "sweetalert2";
import { DatePipe } from "@angular/common";

@Component({
  selector: "app-manage",
  templateUrl: "./manage.component.html",
  styleUrls: ["./manage.component.css"],
})
export class ManageComponent implements OnInit {
  mode: number; // 1->View, 2->Create, 3->Update
  products: Product;
  theFormGroup: FormGroup;
  trySend: boolean;
  batch_id: number;
  client_id: number;


  constructor(
    private activateRoute: ActivatedRoute,
    private productsService: ProductService,
    private router: Router,
    private theFormBuilder: FormBuilder
  ) {
    this.mode = 1;
    this.products = {
      id: 0,
      name: "",
      description: "",
      expiration_date: new Date(),
      client_id: 0,
      batch_id: 0,
     
    };
    this.trySend = false;
  }

  ngOnInit(): void {
    this.configFormGroup();
    const currentUrl = this.activateRoute.snapshot.url.join("/");
    if (currentUrl.includes("view")) {
      this.mode = 1;
      this.theFormGroup.get("id").disable();
      this.theFormGroup.get("name").disable();
      this.theFormGroup.get("description").disable();
      this.theFormGroup.get("expiration_date").disable();
      this.theFormGroup.get("client_id").disable();
      this.theFormGroup.get("batch_id").disable();
    } else if (currentUrl.includes("create") && !currentUrl.includes("createForBatch") && !currentUrl.includes("createForClient")) {
      // Modo crear normal
      this.mode = 2;
      this.theFormGroup.get("id").disable();
      // Habilitar batch_id para creación normal
      this.theFormGroup.get("batch_id").enable();
      this.theFormGroup.get("client_id").enable();

    } else if (currentUrl.includes("createForBatch")) {
      // Modo crear para batch
      this.mode = 4;
      this.theFormGroup.get("id").disable();
      this.batch_id = this.activateRoute.snapshot.params.batch_id;
      
      if (this.batch_id) {
        this.products.batch_id = this.batch_id;
        this.theFormGroup.patchValue({ batch_id: this.batch_id });
        // Deshabilitar batch_id solo en modo createForBatch
        this.theFormGroup.get("batch_id").disable();
      }
    }
      else if(currentUrl.includes("createForClient")) {
        // Modo crear para cliente
        this.mode = 5;
        this.theFormGroup.get("id").disable();
        this.client_id = this.activateRoute.snapshot.params.client_id;
        
        if (this.client_id) {
          this.products.client_id = this.client_id;
          this.theFormGroup.patchValue({ client_id: this.client_id });
          // Deshabilitar client_id solo en modo createForClient
          this.theFormGroup.get("client_id").disable();
        }
      }

     else if (currentUrl.includes("update")) {
      // Código existente para modo actualización
      this.mode = 3;
      this.theFormGroup.get("id").disable();
    }
    if (this.activateRoute.snapshot.params.id) {
      this.products.id = this.activateRoute.snapshot.params.id;
      this.getProduct(this.products.id);
    }
  }

  
    create() {
      console.log(JSON.stringify(this.products));
      this.productsService.create(this.products).subscribe((data) => {
        Swal.fire("Creado", " se ha creado exitosa mente", "success"); //tirulo a la alerta
        this.router.navigate(["products/list"]);
      });
    }
  

    createForBatch() {
      this.products.batch_id = this.batch_id;
      console.log(JSON.stringify(this.products));
      this.productsService.createForBatch(this.batch_id, this.products).subscribe((data) => {
        Swal.fire("Creado", "Se ha creado exitosamente", "success");
        // Redirigir a la lista de productos del lote específico
        this.router.navigate(["products/filterByBatch", this.batch_id]);
      });
    }
    createForClient() {
      this.products.client_id = this.client_id;
      console.log(JSON.stringify(this.products));
      this.productsService.createForClient(this.client_id, this.products).subscribe((data) => {
        Swal.fire("Creado", "Se ha creado exitosamente", "success");
        // Redirigir a la lista de productos del lote específico
        this.router.navigate(["products/filterByClient", this.client_id]);
      });
    }
  update(){
    const fechaExpiration = this.theFormGroup.get("expiration_date")?.value;
    const fechaExpirationDate = new Date(fechaExpiration);

    //console.log(JSON.stringify(this.products));
    this.productsService.update(this.products).subscribe(data=>{
      Swal.fire("Actualizado"," se ha actualizado exitosa mente", "success")//titulo a la alerta
      this.router.navigate(["products/list"]); 
    })
    
  }

   //aqui se arma la data
   getProduct(id:number){
    this.productsService.view(id).subscribe(data=>{
      const datePipe = new DatePipe("en-US");  
      this.products = data; 
      const formattedExpirationDate = datePipe.transform(
        data.expiration_date,
        "yyyy-MM-dd"
      );
      console.log(JSON.stringify(this.products));
      
      this.theFormGroup.patchValue({
        id: this.products.id,
        name: this.products.name,
        description: this.products.description, // Fecha formateada
        expiration_date: formattedExpirationDate, // Fecha formateada
        client_id: this.products.client_id,
        batch_id: this.products.batch_id,
      });
    });
  }

  //OJO-----------------------------
  //aqui definimos las reglas
  configFormGroup() {
    this.theFormGroup = this.theFormBuilder.group({
      id: [this.products.id || "" ], // Siempre deshabilitado
      name: ["", [Validators.required, Validators.pattern('^[a-zA-Z0-9áéíóúÁÉÍÓÚñÑ ]+$')]],
      description:["",[Validators.required]],
      expiration_date: ["",[Validators.required]],
      client_id: [0, [Validators.required, Validators.pattern("^[0-9]+$")]],
      batch_id: [0, [Validators.required, Validators.pattern("^[0-9]+$")]],
    });
  }

  //aqui nos indica que regla molesto
  get getTheFormGroup() {
    return this.theFormGroup.controls;
  }


}
