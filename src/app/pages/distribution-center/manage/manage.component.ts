import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { DistributionCenter } from "src/app/models/distribution-center.model";
import { DistributionCenterService } from "src/app/services/distribution-center.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-manage",
  templateUrl: "./manage.component.html",
  styleUrls: ["./manage.component.css"],
})
export class ManageComponent implements OnInit {
  mode: number; // 1->View, 2->Create, 3->Update
  trySend: boolean;

  distributionCenter: DistributionCenter;

  constructor(
    private activateRoute: ActivatedRoute,
    private distributionCenterService: DistributionCenterService,
    private router: Router
  ) {
    this.mode = 1;
    this.distributionCenter = {
      id: 0,
      name: "",
      phone: "",
      email: "",
      capacity: 0,
      municipality_id: 0,
      address_id: 0,
    };
    this.trySend = false;
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
      this.distributionCenter.id = this.activateRoute.snapshot.params.id;
      this.getdistributionCenter(this.distributionCenter.id);
    }
  }

  create() {
    // Validar manualmente los campos
    if (!this.distributionCenter.name || !this.distributionCenter.address_id || !this.distributionCenter.municipality_id) {
      this.trySend = true;
      Swal.fire(
        "Error en el formulario",
        "Ingrese correctamente los datos solicitados"
      );
      return;
    }

    console.log(JSON.stringify(this.distributionCenter));
    this.distributionCenterService
      .create(this.distributionCenter)
      .subscribe((data) => {
        Swal.fire("Creado", "Se ha creado exitosamente", "success");
        this.router.navigate(["distributionCenters/list"]);
      });
  }

  update() {
    // Validar manualmente los campos
    if (!this.distributionCenter.name || !this.distributionCenter.address_id || !this.distributionCenter.municipality_id) {
      this.trySend = true;
      Swal.fire(
        "Error en el formulario",
        "Ingrese correctamente los datos solicitados"
      );
      return;
    }

    console.log(JSON.stringify(this.distributionCenter));
    this.distributionCenterService
      .update(this.distributionCenter)
      .subscribe((data) => {
        Swal.fire("Actualizado", "Se ha actualizado exitosamente", "success");
        this.router.navigate(["distributionCenters/list"]);
      });
  }

  // Obtener datos del centro de distribución
  getdistributionCenter(id: number) {
    this.distributionCenterService.view(id).subscribe((data) => {
      this.distributionCenter = data;
      console.log(JSON.stringify(this.distributionCenter));
    });
  }
}