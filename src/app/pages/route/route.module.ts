import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouteRoutingModule } from './route-routing.module';
import { ManageComponent } from './manage/manage.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ListComponent } from './list/list.component';


@NgModule({
  declarations: [ManageComponent, ListComponent],
  imports: [
    CommonModule,
    RouteRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class RouteModule { }
