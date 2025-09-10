import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent implements OnInit {

  bookings: any[] = [];
  booking: any = {};
  editingIndex: number | null = null;

  rooms = [
    { number: 101, type: 'Single' },
    { number: 102, type: 'Double' },
    { number: 103, type: 'Suite' },
    { number: 104, type: 'AC Room' },
    { number: 105, type: 'Non-AC Room' },
    { number: 106, type: 'Business Class' },
    { number: 107, type: 'Family Room' }
  ];

  searchText: string = '';

  ngOnInit(): void {
    Swal.fire({
      title: 'Bookings Loaded!',
      text: 'You can now add your own guest names dynamically.',
      icon: 'success',
      confirmButtonText: 'OK'
    });
  }

  addOrUpdateBooking(data: any) {
    if (!data.room || !data.guest || !data.checkin || !data.checkout) {
      Swal.fire('Error', 'All fields are required!', 'error');
      return;
    }

    if (new Date(data.checkin) > new Date(data.checkout)) {
      Swal.fire('Error', 'Check-out date must be after check-in date!', 'error');
      return;
    }

    const overlapping = this.bookings.some((b, i) =>
      b.room == data.room && i !== this.editingIndex &&
      !(new Date(data.checkout) <= new Date(b.checkin) || new Date(data.checkin) >= new Date(b.checkout))
    );

    if (overlapping) {
      Swal.fire('Error', 'This room is already booked for the selected dates!', 'error');
      return;
    }

    if (this.editingIndex !== null) {
      this.bookings[this.editingIndex] = { ...data };
      Swal.fire('Updated!', 'Booking updated successfully.', 'success');
      this.editingIndex = null;
    } else {
      this.bookings.push({ ...data });
      Swal.fire('Added!', `Booking for ${data.guest} added successfully.`, 'success');
    }

    this.booking = {};
  }

  editBooking(index: number) {
    this.editingIndex = index;
    this.booking = { ...this.bookings[index] };
    Swal.fire({
      title: 'Edit Mode',
      text: `You are editing booking of ${this.bookings[index].guest}`,
      icon: 'info',
      confirmButtonText: 'OK'
    });
  }

  deleteBooking(index: number) {
    Swal.fire({
      title: 'Are you sure?',
      text: `Do you want to delete booking of ${this.bookings[index].guest}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        this.bookings.splice(index, 1);
        Swal.fire('Deleted!', 'Booking has been removed.', 'success');
        if (this.editingIndex === index) {
          this.booking = {};
          this.editingIndex = null;
        }
      }
    });
  }

  get filteredBookings() {
    return this.bookings.filter(b =>
      (b.guest && b.guest.toLowerCase().includes(this.searchText.toLowerCase())) ||
      (b.room && b.room.toString().includes(this.searchText))
    );
  }

  stayDuration(b: any) {
    if (!b.checkin || !b.checkout) return 0;
    const start = new Date(b.checkin);
    const end = new Date(b.checkout);
    return Math.ceil((end.getTime() - start.getTime()) / (1000 * 3600 * 24));
  }
}
