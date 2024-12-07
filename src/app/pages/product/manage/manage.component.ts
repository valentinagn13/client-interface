import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Product } from "src/app/models/product.model";
import { ProductService } from "src/app/services/product.service";
import {
  AbstractControl,
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
      expiration_date: new Date(),
      client_id: 0,
      batch_id: 0,
      description: "",
    };
    this.trySend = false;
  }

  ngOnInit(): void {
    this.configFormGroup();
    this.setupMode();
    this.loadProductIfExists();
  }

  configFormGroup() {
    this.theFormGroup = this.theFormBuilder.group({
      id: [{ value: this.products.id, disabled: true }], // Siempre deshabilitado
      name: [this.products.name, [Validators.required]],
      expiration_date: [this.products.expiration_date, [Validators.required]],
      client_id: [this.products.client_id, [Validators.required]],
      batch_id: [this.products.batch_id, [Validators.required]],
    });
  }

  setupMode() {
    const currentUrl = this.activateRoute.snapshot.url.join("/");
    if (currentUrl.includes("view")) {
      this.mode = 1;
    } else if (currentUrl.includes("create")) {
      this.mode = 2;
    } else if (currentUrl.includes("update")) {
      this.mode = 3;
    }
    this.setFormControlsByMode();
  }

  setFormControlsByMode() {
    if (!this.theFormGroup) return;
    if (this.mode === 1) {
      this.theFormGroup.disable(); // Deshabilita todo el formulario en modo vista
    } else if (this.mode === 2 || this.mode === 3) {
      this.theFormGroup.get("id")?.disable();
    }
  }

  loadProductIfExists() {
    const productId = this.activateRoute.snapshot.params?.id;
    if (productId) {
      this.getProduct(productId);
    }
  }

  getProduct(id: number) {
    this.productsService.view(id).subscribe(
      (data) => {
        const datePipe = new DatePipe("en-US");
        this.products = data;

        // Transformar fecha a 'yyyy-MM-dd'
        const expiration_date = datePipe.transform(
          this.products.expiration_date,
          "yyyy-MM-dd"
        );

        this.theFormGroup.patchValue({
          id: this.products.id,
          name: this.products.name,
          expiration_date: expiration_date,
          client_id: this.products.client_id,
          batch_id: this.products.batch_id,
        });
      },
      (error) => {
        Swal.fire("Error", "No se pudo cargar el producto", "error");
      }
    );
  }

  create() {
    if (this.theFormGroup.invalid) {
      Swal.fire(
        "Error",
        "Formulario inválido. Por favor, verifica los campos.",
        "error"
      );
      return;
    }
    this.products = this.theFormGroup.value;
    this.productsService.create(this.products).subscribe(
      () => {
        Swal.fire("Creado", "Producto creado exitosamente", "success");
        this.router.navigate(["products/list"]);
      },
      (error) => {
        Swal.fire("Error", "No se pudo crear el producto", "error");
      }
    );
  }

  update() {
    if (this.theFormGroup.invalid) {
      Swal.fire(
        "Error",
        "Formulario inválido. Por favor, verifica los campos.",
        "error"
      );
      return;
    }
    this.products = this.theFormGroup.value;
    this.productsService.update(this.products).subscribe(
      () => {
        Swal.fire(
          "Actualizado",
          "Producto actualizado exitosamente",
          "success"
        );
        this.router.navigate(["products/list"]);
      },
      (error) => {
        Swal.fire("Error", "No se pudo actualizar el producto", "error");
      }
    );
  }

  get getTheFormGroup() {
    return this.theFormGroup.controls;
  }
}
