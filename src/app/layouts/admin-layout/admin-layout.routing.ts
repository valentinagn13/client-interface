import { ProductModule } from "./../../pages/product/product.module";
import { Routes } from "@angular/router";

import { DashboardComponent } from "../../pages/dashboard/dashboard.component";
import { IconsComponent } from "../../pages/icons/icons.component";
import { MapsComponent } from "../../pages/maps/maps.component";
import { UserProfileComponent } from "../../pages/user-profile/user-profile.component";
import { TablesComponent } from "../../pages/tables/tables.component";

export const AdminLayoutRoutes: Routes = [
  { path: "dashboard", component: DashboardComponent },
  { path: "user-profile", component: UserProfileComponent },
  { path: "tables", component: TablesComponent },
  { path: "icons", component: IconsComponent },
  { path: "maps", component: MapsComponent },
  {
    path: "departments",
    children: [
      {
        path: "",
        //aqui conectamos con los componentes de departments

        loadChildren: () =>
          import("src/app/pages/departments/departments.module").then(
            (m) => m.DepartmentsModule
          ),
      },
    ],
  },
  {
    path: "municipalities",
    children: [
      {
        path: "",
        //aqui conectamos con los componentes de Direccion

        loadChildren: () =>
          import("src/app/pages/municipalities/municipalities.module").then(
            (m) => m.MunicipalitiesModule
          ),
      },
    ],
  },
  {
    path: "addresses",
    children: [
      {
        path: "",
        //aqui conectamos con los componentes de Direccion

        loadChildren: () =>
          import("src/app/pages/addresses/addresses.module").then(
            (m) => m.AddressesModule
          ),
      },
    ],
  },
  {
    path: "distributionCenters",
    children: [
      {
        path: "",
        //aqui conectamos con los componentes de Direccion

        loadChildren: () =>
          import(
            "src/app/pages/distribution-center/distribution-center.module"
          ).then((m) => m.DistributionCenterModule),
      },
    ],
  },
  {
    path: "vehicles",
    children: [
      {
        path: "",
        //aqui conectamos con los componentes de Direccion

        loadChildren: () =>
          import("src/app/pages/vehicle/vehicle.module").then(
            (m) => m.VehicleModule
          ),
      },
    ],
  },
  {
    path: "operations",
    children: [
      {
        path: "",
        //aqui conectamos con los componentes de Direccion

        loadChildren: () =>
          import("src/app/pages/operation/operation.module").then(
            (m) => m.OperationModule
          ),
      },
    ],
  },
  {
    path: "insurances",
    children: [
      {
        path: "",
        //aqui conectamos con los componentes de Direccion

        loadChildren: () =>
          import("src/app/pages/insurance/insurance.module").then(
            (m) => m.InsuranceModule
          ),
      },
    ],
  },
  {
    path: "owners",
    children: [
      {
        path: "",
        //aqui conectamos con los componentes de Direccion

        loadChildren: () =>
          import("src/app/pages/owner/owner.module").then((m) => m.OwnerModule),
      },
    ],
  },
  {
    path: "routes",
    children: [
      {
        path: "",
        //aqui conectamos con los componentes de Direccion

        loadChildren: () =>
          import("src/app/pages/route/route.module").then((m) => m.RouteModule),
      },
    ],
  },
  {
    path: "products",
    children: [
      {
        path: "",
        //aqui conectamos con los componentes de Direccion

        loadChildren: () =>
          import("src/app/pages/product/product.module").then(
            (m) => m.ProductModule
          ),
      },
    ],
  },
  {
    path: "batches",
    children: [
      {
        path: "",
        //aqui conectamos con los componentes de Direccion

        loadChildren: () =>
          import("src/app/pages/batch/batch.module").then(
            (m) => m.BatchModule
          ),
      },
    ],
  },
];
