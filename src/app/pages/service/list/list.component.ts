import { Component, OnInit } from "@angular/core";
import { Service } from "src/app/models/service.model";
import { Router } from "@angular/router";
import Swal from "sweetalert2";
import { ServiceService } from "src/app/services/service.service";

@Component({
  selector: "app-list",
  templateUrl: "./list.component.html",
  styleUrls: ["./list.component.css"],
})
export class ListComponent implements OnInit {
  service: Service[];
  constructor(private serviceservice: ServiceService, private router: Router) {
    this.service = [];
  }

  ngOnInit(): void {
    this.list();
  }
  view(id: number) {
    console.log("aqui estoy en view");

    this.router.navigate(["service/view/" + id]);
  }

  update(id: number) {
    this.router.navigate(["service/update/" + id]);
  }

  list(): void {
    this.serviceservice.list().subscribe((data) => {
      this.service = data;
      console.log(data);

      //console.log(JSON.stringify(data["data"]));
    });
  }

  create() {
    this.router.navigate(["service/create"]);
  }

  delete(id: number) {
    Swal.fire({
      title: "Eliminar conductor?",
      text: "¿Estas seguro de eliminar el conductor?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, eliminar!",
      cancelButtonText: "No, Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        this.serviceservice.delete(id).subscribe((data) => {
          Swal.fire("Eliminado!", "El servicio ha sido eliminado.", "success");

          this.ngOnInit();
        });
      }
    });
  }

  showExpense(id: number) {
    this.router.navigate(["expense/filterByService/" + id]);
  }
}
