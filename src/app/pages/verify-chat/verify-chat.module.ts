import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VerifyChatRoutingModule } from './verify-chat-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { VerifyComponent } from './verify/verify.component';


@NgModule({
  declarations: [
    VerifyComponent
  ],
  imports: [
    CommonModule,
    VerifyChatRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class VerifyChatModule { }
