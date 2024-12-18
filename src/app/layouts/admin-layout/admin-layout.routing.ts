import { Routes } from "@angular/router";
import { DashboardComponent } from "src/app/pages/dashboard/dashboard.component";
import { IconsComponent } from "src/app/pages/icons/icons.component";
import { MapsComponent } from "src/app/pages/maps/maps.component";
import { TablesComponent } from "src/app/pages/tables/tables.component";
import { UserProfileComponent } from "src/app/pages/user-profile/user-profile.component";
export const AdminLayoutRoutes: Routes = [
  {
    path: "addreRouteOrders",
    children: [
      {
        path: "",
        loadChildren: () =>
          import("src/app/pages/addrerouteorder/addrerouteorder.module").then(
            (m) => m.AddrerouteorderModule,
          ),
      },
    ],
  },
  {
    path: "addresses",
    children: [
      {
        path: "",
        loadChildren: () =>
          import("src/app/pages/addresses/addresses.module").then(
            (m) => m.AddressesModule,
          ),
      },
    ],
  },
  {
    path: "administrator",
    children: [
      {
        path: "",
        loadChildren: () =>
          import("src/app/pages/administrator/administrator.module").then(
            (m) => m.AdministratorModule,
          ),
      },
    ],
  },
  {
    path: "batches",
    children: [
      {
        path: "",
        loadChildren: () =>
          import("src/app/pages/batch/batch.module").then((m) => m.BatchModule),
      },
    ],
  },
  {
    path: "clients",
    children: [
      {
        path: "",
        loadChildren: () =>
          import("src/app/pages/client/client.module").then(
            (m) => m.ClientModule,
          ),
      },
    ],
  },
  {
    path: "contracts",
    children: [
      {
        path: "",
        loadChildren: () =>
          import("src/app/pages/contract/contract.module").then(
            (m) => m.ContractModule,
          ),
      },
    ],
  },
  { path: "dashboard",
    title: "Dashboard",
    component: DashboardComponent },
  {
    path: "departments",
    children: [
      {
        path: "",
        loadChildren: () =>
          import("src/app/pages/departments/departments.module").then(
            (m) => m.DepartmentsModule,
          ),
      },
    ],
  },
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
  {
    path: "driver",
    children: [
      {
        path: "",
        loadChildren: () =>
          import("src/app/pages/driver/driver.module").then(
            (m) => m.DriverModule,
          ),
      },
    ],
  },
  {
    path: "expense",
    children: [
      {
        path: "",
        loadChildren: () =>
          import("src/app/pages/expense/expense.module").then(
            (m) => m.ExpenseModule,
          ),
      },
    ],
  },
  { path: "icons", component: IconsComponent },
  {
    path: "insurances",
    children: [
      {
        path: "",
        loadChildren: () =>
          import("src/app/pages/insurance/insurance.module").then(
            (m) => m.InsuranceModule,
          ),
      },
    ],
  },
  {
    path: "invoice",
    children: [
      {
        path: "",
        loadChildren: () =>
          import("src/app/pages/invoice/invoice.module").then(
            (m) => m.InvoiceModule,
          ),
      },
    ],
  },
  { path: "maps", component: MapsComponent },
  {
    path: "municipalities",
    children: [
      {
        path: "",
        loadChildren: () =>
          import("src/app/pages/municipalities/municipalities.module").then(
            (m) => m.MunicipalitiesModule,
          ),
      },
    ],
  },
  {
    path: "operations",
    children: [
      {
        path: "",
        loadChildren: () =>
          import("src/app/pages/operation/operation.module").then(
            (m) => m.OperationModule,
          ),
      },
    ],
  },
  {
    path: "owners",
    children: [
      {
        path: "",
        loadChildren: () =>
          import("src/app/pages/owner/owner.module").then((m) => m.OwnerModule),
      },
    ],
  },
  {
    path: "people",
    children: [
      {
        path: "",
        loadChildren: () =>
          import("src/app/pages/naturalperson/naturalperson.module").then(
            (m) => m.NaturalpersonModule,
          ),
      },
    ],
  },
  {
    path: "products",
    children: [
      {
        path: "",
        loadChildren: () =>
          import("src/app/pages/product/product.module").then(
            (m) => m.ProductModule,
          ),
      },
    ],
  },
  {
    path: "quotas",
    children: [
      {
        path: "",
        loadChildren: () =>
          import("src/app/pages/quota/quota.module").then((m) => m.QuotaModule),
      },
    ],
  },
  {
    path: "routes",
    children: [
      {
        path: "",
        loadChildren: () =>
          import("src/app/pages/route/route.module").then((m) => m.RouteModule),
      },
    ],
  },
  {
    path: "service",
    children: [
      {
        path: "",
        loadChildren: () =>
          import("src/app/pages/service/service.module").then(
            (m) => m.ServiceModule,
          ),
      },
    ],
  },
  { path: "tables", component: TablesComponent },
  { path: "user-profile", component: UserProfileComponent },
  {
    path: "vehicleDriver",
    children: [
      {
        path: "",
        loadChildren: () =>
          import("src/app/pages/vehicledriver/vehicledriver.module").then(
            (m) => m.VehicledriverModule,
          ),
      },
    ],
  },
  {
    path: "vehicleOwners",
    children: [
      {
        path: "",
        loadChildren: () =>
          import("src/app/pages/vehicleowner/vehicleowner.module").then(
            (m) => m.VehicleownerModule,
          ),
      },
    ],
  },
  {
    path: "vehicles",
    children: [
      {
        path: "",
        loadChildren: () =>
          import("src/app/pages/vehicle/vehicle.module").then(
            (m) => m.VehicleModule,
          ),
      },
    ],
  },
  {
    path: "chat",
    children: [
      {
        path: "",
        loadChildren: () =>
          import("src/app/pages/chats/chats.module").then((m) => m.ChatsModule),
      },
    ],
  },
  {
    path: "chatsp/:email",
    loadChildren: () =>
      import("src/app/pages/chat-prueba/chat-prueba.module").then(
        (m) => m.ChatPruebaModule,
      ),
  },
  {
    path: "verify-chat",
    loadChildren: () =>
      import("../../pages/verify-chat/verify-chat.module").then(
        (m) => m.VerifyChatModule,
      ),
  },
  {
    path:"user",
    loadChildren: () =>
      import("../../pages/users/users.module").then(
        (m) => m.UsersModule,
      ),
  }
];
