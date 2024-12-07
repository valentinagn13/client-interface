import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import Swal from "sweetalert2";

//Importaciones de la clase
import { Batch } from 'src/app/models/batch.model';
import { BatchService } from 'src/app/services/batch.service';


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  batches: Batch[];

  constructor(private service:BatchService, private router:Router) {
    this.batches = [];
  }

  ngOnInit(): void {
    this.list();
  }

  view(id: number) {
    this.router.navigate(["batches/view/" + id]);
  }

  update(id: number) {
    this.router.navigate(["batches/update/" + id]);
  }

  list(): void {
    this.service.list().subscribe((data) => {
      console.log(data);
      this.batches = data
    });
  }

  create(){
    this.router.navigate(["batches/create"]);
  }

  delete(id: number) {
    Swal.fire({
      title: "Eliminar Lote",
      text: "¿Estas seguro de eliminar el Lote?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, eliminar!",
      cancelButtonText: "No, Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        this.service.delete(id).subscribe((data) => {
          Swal.fire("Eliminado!", "Lote eliminado correctamente.", "success");
          this.list();
        });
      }
    });
  }
}
