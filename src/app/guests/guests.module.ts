import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GuestsRoutingModule } from './guests-routing.module';
import { GuestsComponent } from './guests.component';


@NgModule({
  declarations: [
    GuestsComponent
  ],
  imports: [
    CommonModule,
    GuestsRoutingModule
  ]
})
export class GuestsModule { }
