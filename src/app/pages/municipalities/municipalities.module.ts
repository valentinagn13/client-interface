import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MunicipalitiesRoutingModule } from './municipalities-routing.module';
import { ListComponent } from './list/list.component';
import { ManageComponent } from './manage/manage.component';
import { FormsModule } from '@angular/forms';
//import { NgxPaginationModule } from 'ngx-pagination';


@NgModule({
  declarations: [
    ListComponent,
    ManageComponent
  ],
  imports: [
    CommonModule,
    MunicipalitiesRoutingModule,
    FormsModule //importante importarlo para que funcione el ngModel en el html
   // NgxPaginationModule
  ]
})
export class MunicipalitiesModule { }
