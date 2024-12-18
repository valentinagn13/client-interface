import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AuthLayoutRoutes } from "./auth-layout.routing";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { RecaptchaModule, RecaptchaFormsModule } from "ng-recaptcha";
import { LoginComponent } from "../../pages/login/login.component";
import { RegisterComponent } from "../../pages/register/register.component";
// import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AuthLayoutRoutes),
    FormsModule,
    RecaptchaModule,
    RecaptchaFormsModule,
    // NgbModule
  ],
  // schemas: [CUSTOM_ELEMENTS_SCHEMA], // Añadir esto para evitar errores de componentes desconocidos

  declarations: [LoginComponent, RegisterComponent],
})
export class AuthLayoutModule {}
