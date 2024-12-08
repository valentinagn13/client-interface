import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NaturalpersonRoutingModule } from './naturalperson-routing.module';
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
    NaturalpersonRoutingModule,
    FormsModule
  ]
})
export class NaturalpersonModule { }
