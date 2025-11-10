import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RoomGroup, RoomService, Room } from '../../../services/room.service';
import { AuthService } from 'src/app/services/auth.service';
import { BookingService, Booking } from 'src/app/services/booking.service';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { EventInput } from '@fullcalendar/core';

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
  isLogin: boolean = false;
  userRole = '';

  // Calendar modal properties
  showCalendarModal: boolean = false;
  calendarRoomNumber: string | null = null;
  calendarEvents: EventInput[] = [];
  calendarOptions: any = {
    initialView: 'dayGridMonth',
    plugins: [dayGridPlugin, interactionPlugin],
    events: []
  };

  constructor(
    private router: Router,
    private roomService: RoomService,
    private authService: AuthService,
    private bookingService: BookingService
  ) { }

  ngOnInit(): void {
    this.loadRoomGroups();
    this.getUserRole();
  }

  getUserRole() {
    this.userRole = this.authService.getRoles()[0];
  }

  // Show calendar modal for a specific room
  showCal(roomNumber: number) {
    this.calendarRoomNumber = roomNumber.toString();
    this.showCalendarModal = true;

    this.bookingService.getBookingsByRoom(this.calendarRoomNumber).subscribe((bookings: Booking[]) => {
      this.calendarEvents = bookings.map(b => ({
        title: `${b.guestName} (${b.status})`,
        start: b.checkInDate,
        end: b.checkOutDate,
        color: '#e7253f', // red booked
        textColor: '#fff'
      }));

      this.calendarOptions = {
        ...this.calendarOptions,
        events: this.calendarEvents
      };
    });
  }

  closeCalendarModal() {
    this.showCalendarModal = false;
    this.calendarRoomNumber = null;
    this.calendarEvents = [];
  }

  // Existing methods

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
        this.loadFallbackData();
      }
    });
  }

  deleteRoom(_t39: Room) {
    this.roomService.deleteRoom(_t39.id).subscribe({
      next: () => this.loadRoomGroups(),
      error: (error) => {
        console.error('Error deleting room:', error);
        this.error = 'Failed to delete room data. Please try again later.';
        this.isLoading = false;
        this.loadRoomGroups();
      }
    });
  }

  private loadFallbackData(): void {
    this.roomGroups = [
      // Paste your static roomGroups fallback data here (same as your original code)
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
    return this.roomGroups.reduce((total, group) => total + (group.rooms?.length || 0), 0);
  }

  getServicesList(services?: string[]): string {
    return services?.join(', ') || '';
  }

  getStartingPrice(rooms?: Room[]): number {
    if (!rooms || rooms.length === 0) return 0;
    const prices = rooms.map(room => room.price || 0).filter(price => price > 0);
    return prices.length > 0 ? Math.min(...prices) : 0;
  }

  getMaxCapacity(rooms?: Room[]): number {
    if (!rooms || rooms.length === 0) return 0;
    const capacities = rooms.map(room => room.capacity || 0).filter(capacity => capacity > 0);
    return capacities.length > 0 ? Math.max(...capacities) : 0;
  }

  getFirstRoomImage(rooms?: Room[]): string {
    if (!rooms || rooms.length === 0) return 'assets/img/room-placeholder.jpg';
    const firstRoom = rooms[0];
    if (!firstRoom.image) return 'assets/img/room-placeholder.jpg';
    return firstRoom.image.startsWith('http') ? firstRoom.image : `http://localhost:9092/${firstRoom.image.replace(/^\/+/, '')}`;
  }

  getRoomType(group: RoomGroup): string {
    return group.type || 'Unknown Type';
  }

  getRoomNumber(room: Room): number {
    return room.number || 0;
  }

  getRoomPrice(room: Room): number {
    return room.price || 0;
  }

  getRoomCapacity(room: Room): number {
    return room.capacity || 0;
  }

  getRoomServices(room: Room): string[] {
    return room.services || [];
  }

  getImageUrl(imagePath: string | undefined): string {
    if (!imagePath) return 'assets/images/room-placeholder.jpg';
    return imagePath.startsWith('http') ? imagePath : `http://localhost:9092/${imagePath}`;
  }
}
