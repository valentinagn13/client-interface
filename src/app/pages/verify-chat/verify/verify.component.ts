import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { SecurityService } from "src/app/services/security.service";
import { UserService } from "src/app/services/user.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-verify",
  templateUrl: "./verify.component.html",
  styleUrls: ["./verify.component.scss"],
})
export class VerifyComponent implements OnInit {
  theFormGroup: FormGroup;
  trySend: boolean;
  email: any;

  constructor(
    private router: Router,
    private theFormBuilder: FormBuilder,
    private userService: UserService,
    private securityService: SecurityService,
  ) {
    this.trySend = false;
  }

  ngOnInit(): void {
    this.configFormGroup();
  }

  configFormGroup() {
    this.theFormGroup = this.theFormBuilder.group({
      email: [null, [Validators.required, Validators.email]],
    });
  }

  get getTheFormGroup() {
    return this.theFormGroup.controls;
  }

  verify() {
    if (this.theFormGroup.invalid) {
      this.trySend = true;
      Swal.fire("Error", "Por favor complete los campos requeridos", "error");
      return;
    }
    this.email = this.theFormGroup.get("email").value;
    // verificar si el código existe
    this.userService.getUserByEmail(this.email).subscribe({
      next: (response) => {
        console.log(response);
        if (response) {
          if (this.securityService.existSession()) {
            this.router.navigate(["chatsp", this.email]);
          } else {
            Swal.fire("Alert", "Por favor inicie sesión", "error");
            this.router.navigate(["/login"]);
          }
        } else {
          Swal.fire("Error", "Usuario no encontrado", "error");
        }
      },
      error: (error) => {
        Swal.fire("Error", "Error al buscar el usuario", "error");
      },
    });
  }
}
