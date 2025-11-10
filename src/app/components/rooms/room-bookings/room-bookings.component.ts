import { Component, OnInit, Input } from '@angular/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { BookingService, Booking } from 'src/app/services/booking.service';
import { EventInput } from '@fullcalendar/core';

@Component({
  selector: 'app-room-bookings',
  templateUrl: './room-bookings.component.html',
  styleUrls: ['./room-bookings.component.css']
})
export class RoomBookingsComponent implements OnInit {

  @Input() roomNumber: string = '101';

  calendarOptions: any = {
    initialView: 'dayGridMonth',
    plugins: [dayGridPlugin, interactionPlugin],
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,dayGridWeek'
    },
    events: [],
    height: 'auto',
    eventDisplay: 'block',
    dayMaxEventRows: true,
    showNonCurrentDates: false,
  };

  constructor(private bookingService: BookingService) { }

  ngOnInit(): void {
    this.loadBookings();
  }

  loadBookings() {
    if (!this.roomNumber) return;

    this.bookingService.getBookingsByRoom(this.roomNumber).subscribe((bookings: Booking[]) => {
      const events: EventInput[] = bookings.map(b => ({
        title: `${b.guestName} (${b.status})`,
        start: b.checkInDate,
        end: b.checkOutDate,
        color: b.status === 'Paid' ? '#4caf50' : '#ff1100ff', // green for Paid, orange for Pending
        textColor: '#000000ff',
        borderColor: '#ffffff'
      }));

      this.calendarOptions.events = events;
    });
  }
}
