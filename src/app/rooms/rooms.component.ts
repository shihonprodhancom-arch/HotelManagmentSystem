import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RoomGroup, RoomService, Room } from '../services/room.service';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.css']
})
export class RoomsComponent implements OnInit {

  selectedGroup: RoomGroup | null = null;
  roomGroups: RoomGroup[] = [];
  isLoading: boolean = true;
  error: string | null = null;

  constructor(
    private router: Router,
    private roomService: RoomService
  ) {}

  ngOnInit(): void {
    this.loadRoomGroups();
  }

  loadRoomGroups(): void {
    this.isLoading = true;
    this.error = null;

    this.roomService.getAllRoomGroups().subscribe({
      next: (groups: RoomGroup[]) => {
        this.roomGroups = groups;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading room groups:', error);
        this.error = 'Failed to load room data. Please try again later.';
        this.isLoading = false;
        
        // Fallback to static data if API fails
        this.loadFallbackData();
      }
    });
  }

  private loadFallbackData(): void {
    // Fallback static data in case API is not available
    this.roomGroups = [
      {
        id: 1,
        type: 'Single',
        rooms: [
          { id: 1, number: 101, price: 2000, capacity: 1, services: ['WiFi', 'AC'], image: 'assets/img/download (1).jpg' },
          { id: 2, number: 102, price: 2100, capacity: 1, services: ['WiFi', 'AC'], image: 'assets/img/download (2).jpg' },
          { id: 3, number: 103, price: 2200, capacity: 1, services: ['WiFi', 'AC'], image: 'assets/img/download (3).jpg' },
          { id: 4, number: 104, price: 2300, capacity: 1, services: ['WiFi', 'AC'], image: 'assets/img/download (5).jpg' },
        ]
      },
      {
        id: 2,
        type: 'Double',
        rooms: [
          { id: 5, number: 201, price: 3000, capacity: 2, services: ['WiFi', 'AC', 'TV'], image: 'assets/img/markus-spiske-g5ZIXjzRGds-unsplash.jpg' },
          { id: 6, number: 202, price: 3100, capacity: 2, services: ['WiFi', 'AC', 'TV'], image: 'assets/img/manuel-moreno-DGa0LQ0yDPc-unsplash.jpg' },
          { id: 7, number: 203, price: 3200, capacity: 2, services: ['WiFi', 'AC', 'TV'], image: 'assets/img/gettyimages-1390233984-612x612.jpg' },
          { id: 8, number: 204, price: 3300, capacity: 2, services: ['WiFi', 'AC', 'TV'], image: 'assets/img/download (4).jpg' },
          { id: 9, number: 205, price: 3400, capacity: 2, services: ['WiFi', 'AC', 'TV'], image: 'assets/img/gettyimages-154945734-612x612.jpg' },
        ]
      },
      {
        id: 3,
        type: 'Suite',
        rooms: [
          { id: 10, number: 301, price: 5000, capacity: 4, services: ['WiFi', 'AC', 'TV', 'Mini Bar'], image: 'assets/img/gettyimages-1148452746-612x612.jpg' },
          { id: 11, number: 302, price: 5100, capacity: 4, services: ['WiFi', 'AC', 'TV', 'Mini Bar'], image: 'assets/img/gettyimages-1266155634-612x612.jpg' },
          { id: 12, number: 303, price: 5200, capacity: 4, services: ['WiFi', 'AC', 'TV', 'Mini Bar'], image: 'assets/img/gettyimages-1300135335-612x612.jpg' },
        ]
      },
      {
        id: 4,
        type: 'Honeymoon',
        rooms: [
          { id: 13, number: 401, price: 6000, capacity: 2, services: ['WiFi', 'AC', 'TV', 'Jacuzzi'], image: 'assets/img/download (6).jpg' },
          { id: 14, number: 402, price: 6200, capacity: 2, services: ['WiFi', 'AC', 'TV', 'Jacuzzi'], image: 'assets/img/gettyimages-1334117383-612x612.jpg' },
        ]
      },
      {
        id: 5,
        type: 'Family',
        rooms: [
          { id: 15, number: 501, price: 7000, capacity: 5, services: ['WiFi', 'AC', 'TV'], image: 'assets/img/gettyimages-1148452746-612x612.jpg' },
          { id: 16, number: 502, price: 7100, capacity: 5, services: ['WiFi', 'AC', 'TV'], image: 'assets/img/manuel-moreno-DGa0LQ0yDPc-unsplash.jpg' },
        ]
      },
      {
        id: 6,
        type: 'VIP',
        rooms: [
          { id: 17, number: 601, price: 12000, capacity: 3, services: ['WiFi', 'AC', 'TV', 'Mini Bar', 'Private Pool'], image: 'assets/img/gettyimages-1334117383-612x612.jpg' },
          { id: 18, number: 602, price: 12500, capacity: 3, services: ['WiFi', 'AC', 'TV', 'Mini Bar', 'Private Pool'], image: 'assets/img/gettyimages-1390233984-612x612.jpg' },
        ]
      },
    ];
  }

  viewGroupDetails(group: RoomGroup): void {
    this.selectedGroup = group;
  }

  closeDetails(): void {
    this.selectedGroup = null;
  }

  bookRoom(room: Room): void {
    console.log('Booking room:', room);
    this.router.navigate(['/sidebar/booking'], { state: { room } });
  }

  refreshData(): void {
    this.loadRoomGroups();
  }

  getRoomCount(): number {
    return this.roomGroups.reduce((total, group) => total + group.rooms.length, 0);
  }

  getServicesList(services: string[]): string {
    return services.join(', ');
  }

  getStartingPrice(rooms: Room[]): number {
  if (!rooms || rooms.length === 0) return 0;
  return Math.min(...rooms.map(room => room.price));
}

getMaxCapacity(rooms: Room[]): number {
  if (!rooms || rooms.length === 0) return 0;
  return Math.max(...rooms.map(room => room.capacity));
}
}