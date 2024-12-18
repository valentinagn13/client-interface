import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Message } from "src/app/models/message.model";
import { MessagesService } from "src/app/services/messages.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-list",
  templateUrl: "./list.component.html",
  styleUrls: ["./list.component.scss"],
})
export class ListComponent implements OnInit {
  messages: Message[];
  chatId: string;
  url: string;

  constructor(
    private service: MessagesService,
    private parent: ActivatedRoute,
    private router: Router,
  ) {
    this.url =
      this.parent.snapshot["_routerState"].url.match(/^\/.+(?=\/)/gim)[0];

    this.chatId = this.parent.snapshot.params.chatId;
    this.messages = [];
  }

  ngOnInit(): void {
    this.list();
  }

  list() {
    this.service.getMessagesByChat(this.chatId).subscribe((data: Message[]) => {
      this.messages = data;
    });
  }

  create() {
    this.router.navigate([this.url, "create"]);
  }

  view(id: string) {
    this.router.navigate([this.url, "view", id]);
  }

  update(id: string) {
    this.router.navigate([this.url, "update", id]);
  }

  delete(id: string) {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "No podrás revertir esto",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
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
