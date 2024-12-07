import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Address } from 'src/app/models/address.model';
import { AddressService } from 'src/app/services/address.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  addresses: Address[];
  
  constructor(private service: AddressService, private router: Router) { 
     this.addresses = [];
  }

  //este es el primero que se llama igual que contructor pero cuando hay cambios en los componentes 
  
  ngOnInit(): void {
    this.list();
  }
  

  view(id: number) {
    console.log("aqui estoy en view");
    
    this.router.navigate(["addresses/view/" + id]);
  }

  update(id: number) {
    this.router.navigate(["addresses/update/" + id]);
  }

  list(): void {
    this.service.list().subscribe((data) => {
      this.addresses = data
      //console.log(JSON.stringify(data["data"]));
    });
  }

  create(){
    this.router.navigate(["addresses/create"]);
  }

  delete(id: number) {
    Swal.fire({
      title: "Eliminar Dirección",
      text: "¿Estas seguro de eliminar la Dirección?",
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
            "La Dirección ha sido eliminada.",
            "success"
          );
          this.ngOnInit();
        });
      }
    });
  }

}
