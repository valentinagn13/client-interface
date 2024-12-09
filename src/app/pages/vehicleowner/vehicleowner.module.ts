import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VehicleownerRoutingModule } from './vehicleowner-routing.module';
import { ListComponent } from './list/list.component';
import { ManageComponent } from './manage/manage.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ListComponent,
    ManageComponent
  ],
  imports: [
    CommonModule,
    VehicleownerRoutingModule,
    FormsModule,
    ReactiveFormsModule//importamos el modulo de formularios reactivos paso 8
    //DatePipe
  ]
})
export class VehicleownerModule { }
