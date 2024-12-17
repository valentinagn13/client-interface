
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Quota } from "src/app/models/quota.model";
import { QuotaService } from "src/app/services/quota.service";
import Swal from "sweetalert2";
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: "app-list",
  templateUrl: "./list.component.html",
  styleUrls: ["./list.component.css"],
})
export class ListComponent implements OnInit {
  quotas: Quota[];

  contract_id:number
  
  constructor(private service:  QuotaService, private router: Router,  private activateRoute: ActivatedRoute) { 
     this.quotas = [];

  }

  //este es el primero que se llama igual que contructor pero cuando hay cambios en los componentes

  ngOnInit(): void {
    const currentUrl = this.activateRoute.snapshot.url.join('/');
    
    // Reiniciar contract_id
    this.contract_id = null;
   
  
    // Verificar si estamos filtrando por batch
    if (currentUrl.includes('filterByContract')) {
      this.contract_id = +this.activateRoute.snapshot.params['id'];
      console.log("contract_id:", this.contract_id);
      this.filterByContract();
    
      

    } else{
      this.list();

    }
  }

  view(id: number) {
    console.log("aqui estoy en view");

    this.router.navigate(["quotas/view/" + id]);
  }

  update(id: number) {
    this.router.navigate(["quotas/update/" + id]);
  }

  list(): void {
    this.service.list().subscribe((data) => {
      this.quotas = data;

      //console.log(JSON.stringify(data["data"]));
    });
  }
  payment(id: number) {
    console.log("HOLA DESDE PAYMENT");
    this.router.navigate(["quotas/payment/" + id]);
  }
  create() {
    this.router.navigate(["quotas/create"]);
  }

  delete(id: number) {
    Swal.fire({
      title: "Eliminar Quota",
      text: "¿Estas seguro de eliminar la Quota?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, eliminar!",
      cancelButtonText: "No, Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        this.service.delete(id).subscribe((data) => {
          Swal.fire("Eliminado!", "La Quota ha sido eliminada.", "success");

          this.ngOnInit();
        });
      }
    });
  }

  //Funcion para filtrar por rutas
  filterByContract(){
    this.service.listByContract(this.contract_id).subscribe((data) => {
      this.quotas = data;
      console.log(this.quotas);
    });
  }
  //funcion para crear un producto segun un lote

  createForContract() {
    this.router.navigate(["quotas/createForContract", this.contract_id]);
    console.log("aqui estoy en createForContract", this.contract_id);
  }
}
