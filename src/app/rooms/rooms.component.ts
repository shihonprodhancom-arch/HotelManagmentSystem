import { Component } from '@angular/core';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.css']
})
export class RoomsComponent {
  rooms = [
    { number: 101, type: 'Single', status: 'Available', price: 2000 },
    { number: 102, type: 'Double', status: 'Occupied', price: 3500 },
    { number: 103, type: 'Suite', status: 'Available', price: 6000 }
  ];
}
