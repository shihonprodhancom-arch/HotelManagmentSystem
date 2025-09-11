import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.css']
})
export class RoomsComponent implements OnInit {

  rooms: any[] = [
    { number: 101, type: 'Single', price: 2000, capacity: 1 },
    { number: 102, type: 'Single', price: 2100, capacity: 1 },
    { number: 103, type: 'Single', price: 2200, capacity: 1 },
    { number: 104, type: 'Single', price: 2300, capacity: 1 },
    { number: 105, type: 'Single', price: 2400, capacity: 1 },
    { number: 106, type: 'Double', price: 3000, capacity: 2 },
    { number: 107, type: 'Double', price: 3100, capacity: 2 },
    { number: 108, type: 'Double', price: 3200, capacity: 2 },
    { number: 109, type: 'Double', price: 3300, capacity: 2 },
    { number: 110, type: 'Double', price: 3400, capacity: 2 },
    { number: 111, type: 'Suite', price: 5000, capacity: 4 },
    { number: 112, type: 'Suite', price: 5100, capacity: 4 },
    { number: 113, type: 'Suite', price: 5200, capacity: 4 },
    { number: 114, type: 'AC', price: 3500, capacity: 2 },
    { number: 115, type: 'Non-AC', price: 2500, capacity: 2 },
    { number: 116, type: 'Business', price: 4000, capacity: 3 },
    { number: 117, type: 'Family', price: 4500, capacity: 5 }
  ];

  groupedRooms: any = {};

  constructor() { }

  ngOnInit(): void {
    this.groupRoomsByType();
  }

  groupRoomsByType() {
    this.groupedRooms = this.rooms.reduce((acc: any, room) => {
      if (!acc[room.type]) {
        acc[room.type] = [];
      }
      acc[room.type].push(room);
      return acc;
    }, {});
  }
}
