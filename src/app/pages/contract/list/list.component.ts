import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import Swal from "sweetalert2";

//Importaciones de la clase
import { Contract } from 'src/app/models/contract.model';
import { ContractService } from 'src/app/services/contract.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  contracts: Contract[];

  constructor(private service:ContractService, private router: Router) {
    this.contracts = [];
  }

  ngOnInit(): void {
    this.list();
  }

  view(id: number) {
    this.router.navigate(["contracts/view/" + id]);
  }

  update(id: number) {
    this.router.navigate(["contracts/update/" + id]);
  }

  list(): void {
    this.service.list().subscribe((data) => {
      this.contracts = data
      console.log(JSON.stringify(data));
    });
  }

  create(){
    this.router.navigate(["contracts/create"]);
  }

  delete(id: number) {
    Swal.fire({
      title: "Eliminar Contrato",
      text: "¿Estas seguro de eliminar el contrato?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, eliminar!",
      cancelButtonText: "No, Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        this.service.delete(id).subscribe((data) => {
          this.list();
          Swal.fire("Contrato Eliminado", "El contrato ha sido eliminado con exito", "success");
        });
      }
    });
  }
  showQuotas(id: number){
    this.router.navigate(["quotas/filterByContract/" + id]);
  }
}
