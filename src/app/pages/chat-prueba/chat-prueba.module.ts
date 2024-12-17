import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChatPruebaRoutingModule } from './chat-prueba-routing.module';
import { ChatpComponent } from './chatp/chatp.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ChatpComponent
  ],
  imports: [
    CommonModule,
    ChatPruebaRoutingModule,
    FormsModule
  ]
})
export class ChatPruebaModule { }
