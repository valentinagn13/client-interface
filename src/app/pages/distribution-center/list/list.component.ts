import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DistributionCenter } from 'src/app/models/distribution-center.model';
import { DistributionCenterService } from 'src/app/services/distribution-center.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  distributionCenters: DistributionCenter[];
  
  constructor(private service: DistributionCenterService, private router: Router) { 
     this.distributionCenters = [];
  }

  //este es el primero que se llama igual que contructor pero cuando hay cambios en los componentes 
  
  ngOnInit(): void {
    this.list();
  }
  

  view(id: number) {
    console.log("aqui estoy en view");
    
    this.router.navigate(["distributionCenters/view/" + id]);
  }

  update(id: number) {
    this.router.navigate(["distributionCenters/update/" + id]);
  }

  list(): void {
    this.service.list().subscribe((data) => {
      this.distributionCenters = data
      //console.log(JSON.stringify(data["data"]));
    });
  }

  create(){
    this.router.navigate(["distributionCenters/create"]);
  }

  delete(id: number) {
    Swal.fire({
      title: "Eliminar Centro de distribucion",
      text: "¿Estas seguro de eliminar el Centro de distribucion?",
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
            "El Centro de distribucion ha sido eliminado.",
            "success"
          );
          this.ngOnInit();
        });
      }
    });
  }

}
