import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-room-form',
  templateUrl: './room-form.component.html',
  styleUrls: ['./room-form.component.css']
})
export class RoomFormComponent implements OnInit {
  rooms: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.loadRooms();
  }

  loadRooms() {
    this.http.get<any[]>('http://localhost:9092/api/rooms') // তোমার backend URL
      .subscribe(data => {
        this.rooms = data;
      });
  }

  bookRoom(room: any) {
    if (room.status === 'Available') {
      this.http.post(`http://localhost:9092/api/book/${room.id}`, {})
        .subscribe(() => {
          room.status = 'Occupied'; // UI update
          alert(`Room ${room.number} booked successfully!`);
        }, err => {
          console.error(err);
          alert('Booking failed!');
        });
    }
  }
}
