import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { User } from "src/app/models/user.model";
import { UserService } from "src/app/services/user.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-list",
  templateUrl: "./list.component.html",
  styleUrls: ["./list.component.scss"],
})
export class ListComponent implements OnInit {
  users: User[];
  constructor(
    private service: UserService,
    private route: Router,
  ) {
    this.users = [];
  }

  ngOnInit(): void {
    this.list();
  }

  list() {
    this.service.getUsers().subscribe((data: User[]) => {
      this.users = data;
    });
  }

  create() {
    this.route.navigate(["users/create"]);
  }

  view(id: string) {
    this.route.navigate(["users/view", id]);
  }

  update(id: string) {
    this.route.navigate(["users/update", id]);
  }

  delete(id: string) {
    Swal.fire({
      title: "¿Estás seguro de eliminar el registro?",
      text: "Esta acción no se puede revertir!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminar!",
      cancelButtonText: "No, cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        this.service.delete(id).subscribe(() => {
          Swal.fire("Eliminado!", "El registro ha sido eliminado.", "success");
          this.ngOnInit();
        });
      }
    });
  }
}
