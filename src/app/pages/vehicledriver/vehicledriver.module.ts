import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VehicledriverRoutingModule } from './vehicledriver-routing.module';
import { ListComponent } from './list/list.component';
import { ManageComponent } from './manage/manage.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ListComponent,
    ManageComponent
  ],
  imports: [
    CommonModule,
    VehicledriverRoutingModule,
        FormsModule //importante importarlo para que funcione el ngModel en el html

  ]
})
export class VehicledriverModule { }
