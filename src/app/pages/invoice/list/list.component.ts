import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Invoice } from "src/app/models/invoice.model";
import { InvoiceService } from "src/app/services/invoice.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-list",
  templateUrl: "./list.component.html",
  styleUrls: ["./list.component.css"],
})
export class ListComponent implements OnInit {
  invoice: Invoice[];
  constructor(private invoiceservice: InvoiceService, private router: Router) {
    this.invoice = [];
  }

  ngOnInit(): void {
    this.list();
  }
  view(id: number) {
    console.log("aqui estoy en view");

    this.router.navigate(["invoice/view/" + id]);
  }

  update(id: number) {
    this.router.navigate(["invoice/update/" + id]);
  }

  list(): void {
    this.invoiceservice.list().subscribe((data) => {
      this.invoice = data;
      console.log(data);

      //console.log(JSON.stringify(data["data"]));
    });
  }

  create() {
    this.router.navigate(["invoice/create"]);
  }

  delete(id: number) {
    Swal.fire({
      title: "Eliminar factura?",
      text: "¿Estas seguro de eliminar la factura?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, eliminar!",
      cancelButtonText: "No, Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        this.invoiceservice.delete(id).subscribe((data) => {
          Swal.fire("Eliminada!", "El factura ha sido eliminada.", "success");

          this.ngOnInit();
        });
      }
    });
  }
}
