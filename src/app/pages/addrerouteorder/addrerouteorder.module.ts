import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddrerouteorderRoutingModule } from './addrerouteorder-routing.module';
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
    AddrerouteorderRoutingModule,
    FormsModule, //importante importarlo para que funcione el ngModel en el html
    ReactiveFormsModule//importamos el modulo de formularios reactivos paso 8
  ]
})
export class AddrerouteorderModule { }
