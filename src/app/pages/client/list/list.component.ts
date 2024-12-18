import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import Swal from "sweetalert2";

//Importaciones de la clase
import { Client } from "src/app/models/client.model";
import { ClientService } from "src/app/services/client.service";

@Component({
  selector: "app-list",
  templateUrl: "./list.component.html",
  styleUrls: ["./list.component.css"],
})
export class ListComponent implements OnInit {
  clients: Client[];

  constructor(private service: ClientService, private router: Router) {
    this.clients = [];
  }

  ngOnInit(): void {
    this.list();
  }

  view(id: number) {
    this.router.navigate(["clients/view/" + id]);
  }

  update(id: number) {
    this.router.navigate(["clients/update/" + id]);
  }

  list(): void {
    this.service.list().subscribe((data) => {
      console.log(data);
      this.clients = data;
    });
  }

  create() {
    this.router.navigate(["clients/create"]);
  }

  delete(id: number) {
    Swal.fire({
      title: "Eliminar Cliente",
      text: "¿Estas seguro de eliminar el Cliente?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, eliminar!",
      cancelButtonText: "No, Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        this.service.delete(id).subscribe((data) => {
          Swal.fire(
            "Eliminado!",
            "Cliente eliminado correctamente.",
            "success"
          );
          this.list();
        });
      }
    });
  }

  showProducts(id: number){
    this.router.navigate(["products/filterByClient/" + id]);
  }
  showContract(id: number){
    this.router.navigate(["contracts/filterByClient/" + id]);
  }
}
