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

  // Ruta para departamentos
  {
    path: "departments",
    children: [
      {
        path: "",
        loadChildren: () =>
          import("src/app/pages/departments/departments.module").then(
            (m) => m.DepartmentsModule
          ),
      },
    ],
  },

  // Ruta para municipios
  {
    path: "municipalities",
    children: [
      {
        path: "",
        loadChildren: () =>
          import("src/app/pages/municipalities/municipalities.module").then(
            (m) => m.MunicipalitiesModule
          ),
      },
    ],
  },

  // Ruta para direcciones
  {
    path: "addresses",
    children: [
      {
        path: "",
        loadChildren: () =>
          import("src/app/pages/addresses/addresses.module").then(
            (m) => m.AddressesModule
          ),
      },
    ],
  },

  // Ruta para centros de distribución
  {
    path: "distributionCenters",
    children: [
      {
        path: "",
        loadChildren: () =>
          import(
            "src/app/pages/distribution-center/distribution-center.module"
          ).then((m) => m.DistributionCenterModule),
      },
    ],
  },

  // Ruta para vehículos
  {
    path: "vehicles",
    children: [
      {
        path: "",
        loadChildren: () =>
          import("src/app/pages/vehicle/vehicle.module").then(
            (m) => m.VehicleModule
          ),
      },
    ],
  },

  // Ruta para operaciones
  {
    path: "operations",
    children: [
      {
        path: "",
        loadChildren: () =>
          import("src/app/pages/operation/operation.module").then(
            (m) => m.OperationModule
          ),
      },
    ],
  },

  // Ruta para seguros
  {
    path: "insurances",
    children: [
      {
        path: "",
        loadChildren: () =>
          import("src/app/pages/insurance/insurance.module").then(
            (m) => m.InsuranceModule
          ),
      },
    ],
  },

  // Ruta para propietarios
  {
    path: "owners",
    children: [
      {
        path: "",
        loadChildren: () =>
          import("src/app/pages/owner/owner.module").then(
            (m) => m.OwnerModule
          ),
      },
    ],
  },

  // Ruta para conductores
  {
    path: "driver",
    children: [
      {
        path: "",
        loadChildren: () =>
          import("src/app/pages/driver/driver.module").then(
            (m) => m.DriverModule
          ),
      },
    ],
  },

  // Ruta para rutas
  {
    path: "routes",
    children: [
      {
        path: "",
        loadChildren: () =>
          import("src/app/pages/route/route.module").then(
            (m) => m.RouteModule
          ),
      },
    ],
  },

  // Ruta para productos
  {
    path: "products",
    children: [
      {
        path: "",
        loadChildren: () =>
          import("src/app/pages/product/product.module").then(
            (m) => m.ProductModule
          ),
      },
    ],
  },

  // Ruta para lotes
  {
    path: "batches",
    children: [
      {
        path: "",
        loadChildren: () =>
          import("src/app/pages/batch/batch.module").then(
            (m) => m.BatchModule
          ),
      },
    ],
  },

  // Ruta para contratos
  {
    path: "contracts",
    children: [
      {
        path: "",
        loadChildren: () =>
          import("src/app/pages/contract/contract.module").then(
            (m) => m.ContractModule
          ),
      },
    ],
  },

  // Ruta para servicios
  {
    path: "service",
    children: [
      {
        path: "",
        loadChildren: () =>
          import("src/app/pages/service/service.module").then(
            (m) => m.ServiceModule
          ),
      },
    ],
  },

  // Ruta para facturas
  {
    path: "invoice",
    children: [
      {
        path: "",
        loadChildren: () =>
          import("src/app/pages/invoice/invoice.module").then(
            (m) => m.InvoiceModule
          ),
      },
    ],
  },

  // Ruta para administradores
  {
    path: "administrator",
    children: [
      {
        path: "",
        loadChildren: () =>
          import("src/app/pages/administrator/administrator.module").then(
            (m) => m.AdministratorModule
          ),
      },
    ],
  },

  // Ruta para vehículos-conductores
  {
    path: "vehicleDriver",
    children: [
      {
        path: "",
        loadChildren: () =>
          import("src/app/pages/vehicledriver/vehicledriver.module").then(
            (m) => m.VehicledriverModule
          ),
      },
    ],
  },

  // Ruta para clientes
  {
    path: "clients",
    children: [
      {
        path: "",
        loadChildren: () =>
          import("src/app/pages/client/client.module").then(
            (m) => m.ClientModule
          ),
      },
    ],
  },

  // Ruta para personas
  {
    path: "people",
    children: [
      {
        path: "",
        loadChildren: () =>
          import("src/app/pages/naturalperson/naturalperson.module").then(
            (m) => m.NaturalpersonModule
          ),
      },
    ],
  },

  // Ruta para gastos
  {
    path: "expense",
    children: [
      {
        path: "",
        loadChildren: () =>
          import("src/app/pages/expense/expense.module").then(
            (m) => m.ExpenseModule
          ),
      },
    ],
  },
];
