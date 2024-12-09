import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OperationRoutingModule } from './operation-routing.module';
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
    OperationRoutingModule,
    FormsModule,//importante importarlo para que funcione el ngModel en el html
    // NgxPaginationModule
    ReactiveFormsModule//importamos el modulo de formularios reactivos paso 8
    //DatePipe
  ]
})
export class OperationModule { }
