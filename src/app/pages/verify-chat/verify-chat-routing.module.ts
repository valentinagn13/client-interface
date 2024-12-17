import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { VerifyComponent } from "./verify/verify.component";

const routes: Routes = [
  { path: "", component: VerifyComponent },
  {
    path: "chatsp/",
    loadChildren: () =>
      import("../chat-prueba/chat-prueba.module").then(
        (m) => m.ChatPruebaModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VerifyChatRoutingModule {}
