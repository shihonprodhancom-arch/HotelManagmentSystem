import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RoomsRoutingModule } from './rooms-routing.module';
import { RoomsComponent } from './rooms.component';
import { RoomFormComponent } from './room-form/room-form.component';


@NgModule({
  declarations: [
    // RoomsComponent,
    // RoomFormComponent
  ],
  imports: [
    CommonModule,
    // RoomsRoutingModule
  ]
})
export class RoomsModule { }
