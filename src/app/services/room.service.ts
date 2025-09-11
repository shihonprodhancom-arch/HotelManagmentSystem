import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RoomsService {
  rooms: any[] = [];

  constructor() {
    // ২০টি fixed room
    this.rooms = [
      { number: 101, type: 'Single', status: 'Available', price: 1500, capacity: 1 },
      { number: 102, type: 'Single', status: 'Available', price: 1500, capacity: 1 },
      { number: 103, type: 'Double', status: 'Available', price: 2500, capacity: 2 },
      { number: 104, type: 'Double', status: 'Available', price: 2500, capacity: 2 },
      { number: 105, type: 'Suite', status: 'Available', price: 5000, capacity: 4 },
      { number: 106, type: 'Suite', status: 'Available', price: 5000, capacity: 4 },
      { number: 107, type: 'AC', status: 'Available', price: 3000, capacity: 2 },
      { number: 108, type: 'AC', status: 'Available', price: 3000, capacity: 2 },
      { number: 109, type: 'Non-AC', status: 'Available', price: 2000, capacity: 2 },
      { number: 110, type: 'Non-AC', status: 'Available', price: 2000, capacity: 2 },
      { number: 111, type: 'Business', status: 'Available', price: 4000, capacity: 3 },
      { number: 112, type: 'Business', status: 'Available', price: 4000, capacity: 3 },
      { number: 113, type: 'Family', status: 'Available', price: 6000, capacity: 5 },
      { number: 114, type: 'Family', status: 'Available', price: 6000, capacity: 5 },
      { number: 115, type: 'Single', status: 'Available', price: 1500, capacity: 1 },
      { number: 116, type: 'Double', status: 'Available', price: 2500, capacity: 2 },
      { number: 117, type: 'Suite', status: 'Available', price: 5000, capacity: 4 },
      { number: 118, type: 'AC', status: 'Available', price: 3000, capacity: 2 },
      { number: 119, type: 'Non-AC', status: 'Available', price: 2000, capacity: 2 },
      { number: 120, type: 'Family', status: 'Available', price: 6000, capacity: 5 },
    ];
  }

  getRooms() {
    return this.rooms;
  }

  setRoomStatus(roomNumber: number, status: string) {
    const room = this.rooms.find(r => r.number === roomNumber);
    if (room) room.status = status;
  }
}
