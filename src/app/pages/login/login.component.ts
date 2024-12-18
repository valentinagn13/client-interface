import { Component, OnInit, OnDestroy } from "@angular/core";
import { Router } from "@angular/router";
import { User } from "src/app/models/user.model";
import { SecurityService } from "src/app/services/security.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit, OnDestroy {
  user: User;
  captchaToken: string | null = null; // Token del reCAPTCHA
  captchaResolved: boolean = false; // Indica si el reCAPTCHA fue resuelto

  constructor(
    // para poder saltar en paginas uso router no href
    private securityService: SecurityService,
    private router: Router
  ) {
    this.user = { email: "", password: "" };
  }
  // Método que se ejecuta cuando se resuelve el reCAPTCHA
  onCaptchaResolved(token: string | null) {
    this.captchaResolved = !!token;
    this.captchaToken = token;
  }
  login() {
    if (!this.captchaResolved || !this.captchaToken) {
      Swal.fire("Error", "Por favor, completa el reCAPTCHA.", "error");
      return;
    }

    // Agregar el token al objeto user
    this.user.captchaToken = this.captchaToken;

    this.securityService.login(this.user).subscribe({
      // para la respuesta 200
      next: (data) => {
        // SI TODO SALE BIEN SE LE PIDE A SECURITY SERVICE QUE GUARDE LA SESSIÓN
        this.securityService.saveSession(data);
        // si todo sale bien se va para el dashboar lo redirige gracias a router
        this.router.navigate(["dashboard"]);
      },
      // para errores 400 o 500
      error: (error) => {
        Swal.fire(
          "Autenticación Inválida",
          "Usuario o contraseña inválido",
          "error"
        );
      },
    });
  }
  // login(){
  //   this.securityService.login(this.user).subscribe(data=>{

  //   })
  // }
  ngOnInit() {}
  ngOnDestroy() {}
}
