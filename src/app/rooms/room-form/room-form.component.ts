import { Component } from '@angular/core';

@Component({
  selector: 'app-room-form',
  templateUrl: './room-form.component.html',
  styleUrls: ['./room-form.component.css']
})
export class RoomFormComponent {
  rooms = [
    { number: 101, type: 'Single', status: 'Available', price: 2000 },
    { number: 102, type: 'Double', status: 'Occupied', price: 3500 },
    { number: 103, type: 'Suite', status: 'Available', price: 6000 }
  ];

  addRoom(roomData: any) {
    this.rooms.push(roomData);
  }
}
