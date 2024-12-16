import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ListComponent } from "./list/list.component";
import { ManageComponent } from "./manage/manage.component";
import { MapaComponent } from "src/app/pages/mapa/manage/mapa.component";

const routes: Routes = [
  { path: "list", component: ListComponent },
  { path: "create", component: ManageComponent },
  { path: "update/:id", component: ManageComponent },
  { path: "view/:id", component: ManageComponent }, //listo los
  { path: "location/:id", component: MapaComponent }, //listo los
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VehicleRoutingModule {}
