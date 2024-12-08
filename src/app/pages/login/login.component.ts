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
  constructor(
    // para poder saltar en paginas uso router no href
    private securityService: SecurityService,
    private router: Router
  ) {
    this.user = { email: "", password: "" };
  }
  login() {
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
