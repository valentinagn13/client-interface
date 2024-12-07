import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Owner } from 'src/app/models/owner.model';
import { OwnerService } from 'src/app/services/owner.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  owners: Owner[];
  
  constructor(private service: OwnerService, private router: Router) { 
     this.owners = [];
  }

  //este es el primero que se llama igual que contructor pero cuando hay cambios en los componentes 
  
  ngOnInit(): void {
    this.list();
  }
  

  view(id: number) {
    console.log("aqui estoy en view");
    
    this.router.navigate(["owners/view/" + id]);
  }

  update(id: number) {
    this.router.navigate(["owners/update/" + id]);
  }

  list(): void {
    this.service.list().subscribe((data) => {
      this.owners = data
      //console.log(JSON.stringify(data["data"]));
    });
  }

  create(){
    this.router.navigate(["owners/create"]);
  }

  delete(id: number) {
    Swal.fire({
      title: "Eliminar Dueño",
      text: "¿Estas seguro de eliminar el Dueño?",
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
            "El Dueño ha sido eliminado.",
            "success"
          );
          
          this.ngOnInit();
        });
      }
    });
  }


}
