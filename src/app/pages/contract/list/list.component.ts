import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
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
  client_id:number;

  constructor(private service:ContractService, private router: Router,  private activateRoute: ActivatedRoute) {
    this.contracts = [];
  }

  ngOnInit(): void {
    const currentUrl = this.activateRoute.snapshot.url.join('/');
    
    // Reiniciar batch_id y client_id
    this.client_id = null;
   
  
    // Verificar si estamos filtrando por batch
    if (currentUrl.includes('filterByClient')) {
      this.client_id = +this.activateRoute.snapshot.params['id'];
      console.log("client_id:", this.client_id);
      this.filterByClient();
    
      

    } else{
      this.list();

    }
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

  showRoute(id: number){
    this.router.navigate(["routes/filterByContract/" + id]);
  }

 //Funcion para filtrar por rutas
 filterByClient(){
  this.service.listByClient(this.client_id).subscribe((data) => {
    this.contracts = data;
    console.log(this.contracts);
  });
}
//funcion para crear un producto segun un lote

createForClient() {
  this.router.navigate(["contracts/createForClient", this.client_id]);
  console.log("aqui estoy en createForRoute", this.client_id);
}
}
