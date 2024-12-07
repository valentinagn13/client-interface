import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Municipality } from 'src/app/models/municipality.model';
import { MunicipalityService } from 'src/app/services/municipality.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  municipalities: Municipality[];

  constructor(private service: MunicipalityService, private router: Router) {
    this.municipalities = [];
  }

  //este es el primero que se llama igual que contructor pero cuando hay cambios en los componentes

  ngOnInit(): void {
    this.list();
  }

  view(id: number) {
    console.log("aqui estoy en view");
    
    this.router.navigate(["municipalities/view/" + id]);
  }

  update(id: number) {
    this.router.navigate(["municipalities/update/" + id]);
  }

  list(): void {
    this.service.list().subscribe((data) => {
      this.municipalities = data["data"];
      //console.log(JSON.stringify(data["data"]));
    });
  }

  create(){
    this.router.navigate(["municipalities/create"]);
  }

  delete(id: number) {
    Swal.fire({
      title: "Eliminar Municipio",
      text: "¿Estas seguro de eliminar el Municipio?",
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
            "El Municipio ha sido eliminado.",
            "success"
          );
          this.ngOnInit();
        });
      }
    });
  }
}
