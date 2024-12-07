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
    path: "driver",
    children: [
      {
        path: "",
        //aqui conectamos con los componentes de departments

        loadChildren: () =>
          import("src/app/pages/driver/driver.module").then(
            (m) => m.DriverModule
          ),
      },
    ],
  },
  {
    path: "expense",
    children: [
      {
        path: "",
        //aqui conectamos con los componentes de departments

        loadChildren: () =>
          import("src/app/pages/expense/expense.module").then(
            (m) => m.ExpenseModule
          ),
      },
    ],
  },
  {
    path: "service",
    children: [
      {
        path: "",
        //aqui conectamos con los componentes de departments

        loadChildren: () =>
          import("src/app/pages/service/service.module").then(
            (m) => m.ServiceModule
          ),
      },
    ],
  },
  {
    path: "invoice",
    children: [
      {
        path: "",
        //aqui conectamos con los componentes de departments

        loadChildren: () =>
          import("src/app/pages/invoice/invoice.module").then(
            (m) => m.InvoiceModule
          ),
      },
    ],
  },
  {
    path: "administrator",
    children: [
      {
        path: "",
        //aqui conectamos con los componentes de departments

        loadChildren: () =>
          import("src/app/pages/administrator/administrator.module").then(
            (m) => m.AdministratorModule
          ),
      },
    ],
  },
];
