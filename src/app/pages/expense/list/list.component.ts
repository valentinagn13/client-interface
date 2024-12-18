import { Component, OnInit } from "@angular/core";
import { Expense } from "src/app/models/expense.model";
import { ExpenseService } from "src/app/services/expense.service";
import Swal from "sweetalert2";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: "app-list",
  templateUrl: "./list.component.html",
  styleUrls: ["./list.component.css"],
})
export class ListComponent implements OnInit {
  expense: Expense[];
  driver_id: number;
  service_id: number;
  owner_id: number;
  constructor(private expenseservice: ExpenseService, private router: Router, private activateRoute: ActivatedRoute) {
    this.expense = [];
  }

  ngOnInit(): void {
    const currentUrl = this.activateRoute.snapshot.url.join('/');
    
    // Reiniciar conductor id y servicio_id
    this.driver_id = null;
    this.service_id = null;
    this.owner_id = null;
  
    // Verificar si estamos filtrando por conductor
    if (currentUrl.includes('filterByDriver')) {
      this.driver_id = +this.activateRoute.snapshot.params['id'];
      console.log("driver_id:", this.driver_id);
      this.filterByDriver();
      console.log("service_id:", this.driver_id);
      

    } 
    // Verificar si estamos filtrando por Servicio
    else if (currentUrl.includes('filterByService')) {
      this.service_id = +this.activateRoute.snapshot.params['id'];
      console.log("service_id:", this.service_id);
      this.filterByService();
      console.log("driver_id:", this.service_id);
      
    } else if(currentUrl.includes('filterByOwner')) {
      this.owner_id = +this.activateRoute.snapshot.params['id'];
      console.log("owner_id:", this.owner_id);
      this.filterByOwner();

    }
    // Si no hay filtro específico, listar todos las operaciones
    else {
      this.list();
    }
  }
  view(id: number) {
    console.log("aqui estoy en view");

    this.router.navigate(["expense/view/" + id]);
  }

  update(id: number) {
    this.router.navigate(["expense/update/" + id]);
  }

  list(): void {
    this.expenseservice.list().subscribe((data) => {
      this.expense = data;
      console.log(data);

      //console.log(JSON.stringify(data["data"]));
    });
  }

  create() {
    this.router.navigate(["expense/create"]);
  }

  delete(id: number) {
    Swal.fire({
      title: "Eliminar gasto?",
      text: "¿Estas seguro de eliminar el gasto?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, eliminar!",
      cancelButtonText: "No, Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        this.expenseservice.delete(id).subscribe((data) => {
          Swal.fire("Eliminado!", "El conductor ha sido eliminado.", "success");

          this.ngOnInit();
        });
      }
    });
  }

  
  //Funcion para filtrar por conductores
  filterByDriver(){
    this.expenseservice.listByDriver(this.driver_id).subscribe((data) => {
      this.expense = data;
      console.log(this.expense);
    });
  }
  //funcion para crear un gasto segun un conductor

  createForDriver() {
    this.router.navigate(["expense/createForDriver", this.driver_id]);
    console.log("aqui estoy en createForDriver", this.driver_id);
  }

  //Funcion para filtrar por servicio
  filterByService(){
    this.expenseservice.listByService(this.service_id).subscribe((data) => {
      this.expense = data;
      console.log(this.expense);
    });
  }

  //funcion para crear un gasto segun un servicio
  createForService() {
    this.router.navigate(["expense/createForService", this.service_id]);
    console.log("aqui estoy en createForService", this.service_id);
  }

  //Funcion para filtrar por rutas
  filterByOwner(){
    this.expenseservice.listByOwner(this.owner_id).subscribe((data) => {
      this.expense = data;
      console.log(this.expense);
    });
  }
  //funcion para crear un producto segun un lote

  createForOwner() {
    this.router.navigate(["expense/createForOwner", this.owner_id]);
    console.log("aqui estoy en createForExpense", this.owner_id);
  }
}
