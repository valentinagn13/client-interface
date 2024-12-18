import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
//import { Customer } from "src/app/models/customer.model";
import { Message } from "src/app/models/message.model";
//import { CustomerService } from "src/app/services/customer.service";
import { MessagesService } from "src/app/services/messages.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-manage",
  templateUrl: "./manage.component.html",
  styleUrls: ["./manage.component.scss"],
})
export class ManageComponent implements OnInit {
  //customers: Customer[];
  message: Message;
  mode: number;
  theFormGroup: FormGroup;
  trySend: boolean;
  url: string;

  constructor(
    private parent: ActivatedRoute,
    private router: Router,
    //private serviceCustomer: CustomerService,
    private serviceMessage: MessagesService,
    private theFormBuilder: FormBuilder,
  ) {
    this.mode = 1;
    this.trySend = false;
    this.url =
      this.parent.snapshot["_routerState"].url.match(/^\/.+(?=\/)/gim)[0];

    this.message = {
      chat_id: this.parent.snapshot.params.chatId,
    };

    this.configFormGroup();
  }

  configFormGroup() {
    this.theFormGroup = this.theFormBuilder.group({
      user_id: [
        null,
        [
          Validators.required,
          Validators.minLength(1),
          Validators.maxLength(100),
        ],
      ],
      chat_id: [
        null,
        [
          Validators.required,
          Validators.minLength(1),
          Validators.maxLength(100),
        ],
      ],
      content: [
        null,
        [
          Validators.required,
          Validators.minLength(1),
          Validators.maxLength(1000),
        ],
      ]
    });
  }

  ngOnInit(): void {
    //this.getCustomers();
    this.list();
  }

  list() {
    const currentUrl = this.parent.snapshot.url.join("/");
    if (currentUrl.includes("view")) {
      this.mode = 1;
      this.theFormGroup.disable();
    } else if (currentUrl.includes("update")) {
      this.mode = 2;
    } else if (currentUrl.includes("create")) {
      this.mode = 3;
    }

    if (this.parent.snapshot.params.id) {
      this.message.id = this.parent.snapshot.params.id;
      this.getMessage(this.message.id);
    }
  }

  get getTheFormGroup() {
    return this.theFormGroup.controls;
  }

  // async getCustomers() {
  //   this.serviceCustomer.getCustomers().subscribe((data: Customer[]) => {
  //     this.customers = data;
  //   });
  // }

  async getMessage(id: string) {
    this.serviceMessage.view(id).subscribe((data: Message) => {
      this.message = data;
    });
  }

  create() {
    if (this.theFormGroup.invalid) {
      Swal.fire("Error", "Por favor complete los campos requeridos", "error");
      this.trySend = true;
      return;
    }

    this.serviceMessage.create(this.message).subscribe(() => {
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

    this.serviceMessage.update(this.message).subscribe(() => {
      Swal.fire(
        "actualización con exito",
        "Chat actualizado correctamente",
        "success",
      );
      this.router.navigate([this.url.match(/^\/.+(?=\/)/gim)[0], "list"]);
    });
  }
}
