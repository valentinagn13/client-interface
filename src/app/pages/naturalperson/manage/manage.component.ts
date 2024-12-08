import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import Swal from "sweetalert2";

//Importaciones de la clase
import { Naturalperson } from "src/app/models/naturalperson.model";
import { NaturalpersonService } from "src/app/services/naturalperson.service";
import { FormBuilder, FormGroup } from "@angular/forms";
import { Operation } from "src/app/models/operation.model";

@Component({
  selector: "app-manage",
  templateUrl: "./manage.component.html",
  styleUrls: ["./manage.component.css"],
})
export class ManageComponent implements OnInit {

  mode: number; //1->View, 2->Create, 3->Update
  naturalperson: Naturalperson;
  operations: Operation;
  theFormGroup: FormGroup;

  constructor(
    private activateRoute: ActivatedRoute,
    private router: Router,
    private naturalpersonService: NaturalpersonService,
    private theFormBuilder: FormBuilder
  ) {
    this.mode = 1;
    this.naturalperson = { id: 0, user_id: "", document_type: "", document_number: 0, birth_date: new Date(), company_id: null, client_id: 0 };
  }

  ngOnInit(): void {
    const currentUrl = this.activateRoute.snapshot.url.join("/");
    if (currentUrl.includes("view")) {
      this.mode = 1;
    } else if (currentUrl.includes("create")) {
      this.mode = 2;
    } else if (currentUrl.includes("update")) {
      this.mode = 3;
    }
    if (this.activateRoute.snapshot.params.id) {
      this.naturalperson.id = this.activateRoute.snapshot.params.id;
      this.getPerson(this.naturalperson.id);
    }
  }

  create() {
    console.log(JSON.stringify(this.naturalperson));
    this.naturalpersonService.create(this.naturalperson).subscribe((data) => {
      Swal.fire("Creado", " se ha creado exitosa mente", "success"); //tirulo a la alerta
      this.router.navigate(["naturalpeople/list"]);
    });
  }

  update() {
    console.log(JSON.stringify(this.naturalperson));
    this.naturalpersonService.update(this.naturalperson).subscribe((data) => {
      Swal.fire("Actualizado", " se ha actualizado exitosa mente", "success"); //titulo a la alerta
      this.router.navigate(["naturalpeople/list"]);
    });
  }

  getPerson(id: number) {
    this.naturalpersonService.view(id).subscribe((data) => {
      this.naturalperson = data;
    });
  }
}
