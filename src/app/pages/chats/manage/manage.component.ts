import Swal from "sweetalert2";
import { ActivatedRoute, Router } from "@angular/router";
import { Chat } from "src/app/models/chat.model";
import { ChatService } from "src/app/services/chat.service";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { get } from "http";
import { UserService } from "src/app/services/user.service";

@Component({
  selector: "app-manage",
  templateUrl: "./manage.component.html",
  styleUrls: ["./manage.component.scss"],
})
export class ManageComponent implements OnInit {
  chat: Chat;
  mode: number;
  emaiByUser: string;
  theFormGroup: FormGroup;
  trySend: boolean;
  url: string;

  constructor(
    private parent: ActivatedRoute,
    private router: Router,
    private serviceChat: ChatService,
    private userService: UserService,
    private theFormBuilder: FormBuilder
  ) {
    this.mode = 1;
    this.trySend = false;
    this.url =
      this.parent.snapshot["_routerState"].url.match(/^\/.+(?=\/)/gim)[0];

    this.chat = {
      id: null,
      email_user: this.parent.snapshot.params.email_user,
    };

    this.configFormGroup();
  }

  configFormGroup() {
    this.theFormGroup = this.theFormBuilder.group({
      status: [
        null,
        [Validators.required, Validators.minLength(1), Validators.maxLength(1)],
      ],
      email_user: [
        null,
        [
          Validators.required,
          Validators.minLength(1),
          Validators.maxLength(100),
        ],
      ],
    });
  }

  ngOnInit(): void {
    const currentUrl = this.parent.snapshot.url.join("/");
    if (currentUrl.includes("view")) {
      this.mode = 1;
      this.theFormGroup.disable();
    } else if (currentUrl.includes("create")) {
      this.mode = 2;
    } else if (currentUrl.includes("update")) {
      this.mode = 3;
    }

    if (this.parent.snapshot.params.id) {
      this.chat.id = this.parent.snapshot.params.id;
      this.getChat(this.chat.id.toString());
    }
  }

  get getTheFormGroup() {
    return this.theFormGroup.controls;
  }

  async getChat(id: string) {
    this.serviceChat.view(id).subscribe((data: Chat) => {
      this.chat = data;
      console.log("viendo uno", this.chat);
    });
  }

  messages() {
    this.router.navigate([
      this.url.match(/.+(?<=\/)/gim)[0],
      this.chat.id,
      "messages",
    ]);
  }

  create() {
    if (this.theFormGroup.invalid) {
      Swal.fire("Error", "Por favor complete los campos requeridos", "error");
      this.trySend = true;
      return;
    }
    console.log(this.chat);
    this.serviceChat.create(this.chat).subscribe(() => {
      Swal.fire("¡Hecho!", "Chat creado exitosamente", "success");
      this.router.navigate([this.url, "list"]);
    });
  }

  update() {
    if (this.theFormGroup.invalid) {
      Swal.fire("Error", "Por favor complete los campos requeridos", "error");
      this.trySend = true;
      return;
    }

    this.serviceChat.update(this.chat).subscribe(() => {
      Swal.fire(
        "actualización con exito",
        "Chat actualizado correctamente",
        "success"
      );
      this.router.navigate([this.url.match(/^\/.+(?=\/)/gim)[0], "list"]);
    });
  }
}
