

import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { BookingService, Booking } from '../services/booking.service';
import { Router } from '@angular/router';
import { RoomService } from '../services/room.service';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent implements OnInit {

  extraServices = [
    { name: 'Breakfast', price: 500 },
    { name: 'Airport Pickup', price: 1000 },
    { name: 'Spa', price: 1500 },
    { name: 'Extra Bed', price: 800 }
  ];

  bookings: Booking[] = [];

  booking: any = {
    guest: '',
    room: null,
    guests: 1,
    checkin: '',
    checkout: '',
    totalPrice: 0,
    paymentMethod: '',
    selectedServices: []
  };

  editingBookingId: number | null = null;
  room: any;

  rooms :any[] = [ ];

  paymentMethods: string[] = ['Bank', 'Bkash', 'Nagad'];

  constructor(private bookingService: BookingService, private router: Router, private roomService: RoomService) {
    const navigation = this.router.getCurrentNavigation();
    this.room = navigation?.extras.state?.['room'];
    if (this.room) {
      this.booking.room = this.room.number;
      this.booking.guests = 1;
      this.updateRoomPrice();
    }
  }

  ngOnInit(): void {
    this.loadBookings();
    this.loadRooms();
  }


  loadRooms(){

    this.roomService.getAllRooms().subscribe((val) =>{
      this.rooms = val;
    })

  }
  // -------------------
  // VALIDATION METHODS
  // -------------------
  validateDates() {
    if (this.booking.checkin && this.booking.checkout && this.booking.checkin > this.booking.checkout) {
      Swal.fire('Invalid Dates', 'Check-out date must be after check-in date', 'error');
      this.booking.checkout = '';
    }
  }

  // -------------------
  // PRICE CALCULATION
  // -------------------
  updateRoomPrice() {
    const selectedRoom = this.rooms.find(r => r.number == this.booking.room);
    const basePrice = selectedRoom ? selectedRoom.price * this.booking.guests : 0;

    const extrasPrice = (this.booking.selectedServices || []).reduce(
      (sum: number, s: any) => sum + s.price, 0
    );

    this.booking.totalPrice = basePrice + extrasPrice;
  }

  toggleService(service: any, checked: boolean) {
    if (checked) {
      this.booking.selectedServices.push(service);
    } else {
      this.booking.selectedServices = this.booking.selectedServices.filter(
        (s: any) => s.name !== service.name
      );
    }
    this.updateRoomPrice();
  }

  isServiceSelected(service: any): boolean {
    return this.booking.selectedServices.some((s: any) => s.name === service.name);
  }

  // -------------------
  // BOOKING CRUD
  // -------------------
  loadBookings(): void {
    this.bookingService.getAllBookings().subscribe((data: Booking[]) => {
      this.bookings = data.map(b => ({
        ...b,
        status: b.status || 'Pending',
        paymentMethod: b.paymentMethod || '',
        paymentInfo: b.paymentInfo || {}
      }));
    });
  }

  addOrUpdateBooking(data: any) {
    if (!data.guest || !data.room || !data.checkin || !data.checkout || !data.guests) {
      Swal.fire('Error', 'All fields are required!', 'error');
      return;
    }

    const selectedRoom = this.rooms.find(r => r.number == data.room);
    console.log('----------------selectedRoom----------------',selectedRoom );
    
    const booking: Booking = {
      guestName: data.guest,
      roomNumber: data.room.toString(),
      checkInDate: data.checkin,
      checkOutDate: data.checkout,
      totalPrice: selectedRoom ? selectedRoom.price * data.guests : 0,
      status: 'Pending',
      paymentMethod: '',
      paymentInfo: ''
    };

        console.log('----------------booking----------------',booking );

    if (this.editingBookingId !== null) {
      this.bookingService.updateBooking(this.editingBookingId, booking).subscribe(() => {
        Swal.fire('Updated', 'Booking updated successfully', 'success');
        this.editingBookingId = null;
        this.booking = {};
        this.loadBookings();
      });
    } else {
      this.bookingService.addBooking(booking).subscribe(() => {
        Swal.fire('Success', 'Booking added successfully', 'success');
        this.booking = {};
        this.loadBookings();
      });
    }
  }

  editBooking(booking: Booking) {
    this.editingBookingId = booking.id!;
    this.booking = {
      guest: booking.guestName,
      room: Number(booking.roomNumber),
      checkin: booking.checkInDate,
      checkout: booking.checkOutDate,
      guests: Math.ceil(booking.totalPrice / (this.rooms.find(r => r.number == Number(booking.roomNumber))?.price || 1)),
      selectedServices: []
    };
    this.updateRoomPrice();
  }

  deleteBooking(id: any) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'This booking will be deleted!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!'
    }).then(result => {
      if (result.isConfirmed) {
        this.bookingService.deleteBooking(id).subscribe(() => {
          Swal.fire('Deleted', 'Booking removed', 'success');
          this.loadBookings();
        });
      }
    });
  }

  // -------------------
  // PAYMENT METHODS
  // -------------------
  payBooking(index: number) {
    const bookingToPay = this.bookings[index];

    Swal.fire({
      title: 'Select Payment Method',
      input: 'radio',
      inputOptions: this.paymentMethods.reduce((acc, m) => { acc[m] = m; return acc; }, {} as any),
      inputValidator: (value) => value ? null : 'Please select a payment method!'
    }).then((result) => {
      if (result.isConfirmed) {
        const method = result.value;

        Swal.fire({
          title: `${method} Payment Details`,
          html: this.getPaymentHtml(method),
          focusConfirm: false,
          preConfirm: () => {
            if (method === 'Bank') {
              const bankName = (document.getElementById('bankName') as HTMLInputElement).value;
              const accountNumber = (document.getElementById('accountNumber') as HTMLInputElement).value;
              if (!bankName || !accountNumber) Swal.showValidationMessage('Enter Bank Name and Account Number');
              return { bankName, accountNumber };
            }
            if (method === 'Bkash' || method === 'Nagad') {
              const trxId = (document.getElementById('trxId') as HTMLInputElement).value;
              if (!trxId) Swal.showValidationMessage('Enter Transaction ID');
              return { trxId };
            }
            return {};
          }
        }).then((detailsResult) => {
          if (detailsResult.isConfirmed) {
            bookingToPay.status = 'Paid';
            bookingToPay.paymentMethod = method;
            bookingToPay.paymentInfo = detailsResult.value;

            this.bookingService.updateBooking(bookingToPay.id!, bookingToPay).subscribe(() => {
              Swal.fire('Paid!', `${method} Payment Completed`, 'success');
              this.loadBookings();
            });
          }
        });
      }
    });
  }

  cancelBooking(index: number) {
    const bookingToCancel = this.bookings[index];
    bookingToCancel.status = 'Cancelled';

    this.bookingService.updateBooking(bookingToCancel.id!, bookingToCancel).subscribe(() => {
      Swal.fire('Cancelled', 'Booking cancelled', 'success');
      this.loadBookings();
    });
  }

  getPaymentHtml(method: string) {
    if (method === 'Bank') {
      return `
        <input id="bankName" class="swal2-input" placeholder="Bank Name">
        <input id="accountNumber" class="swal2-input" placeholder="Account Number">
      `;
    } else if (method === 'Bkash' || method === 'Nagad') {
      return `<input id="trxId" class="swal2-input" placeholder="Transaction ID">`;
    }
    return '';
  }

  formatPaymentInfo(info: any) {
    if (!info) return '-';
    if (info.bankName) return `Bank: ${info.bankName}, Account: ${info.accountNumber}`;
    if (info.trxId) return `Transaction ID: ${info.trxId}`;
    return '-';
  }

  printReceipt(booking: Booking) {
    const receiptWindow = window.open('', 'PRINT', 'height=600,width=800');
    receiptWindow?.document.write(`
      <html>
        <head>
          <title>Booking Receipt</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 20px; }
            h2 { text-align: center; }
            table { width: 100%; border-collapse: collapse; margin-top: 20px; }
            table, th, td { border: 1px solid #000; padding: 10px; text-align: left; }
          </style>
        </head>
        <body>
          <h2>Hotel Booking Receipt</h2>
          <table>
            <tr><th>Guest Name</th><td>${booking.guestName}</td></tr>
            <tr><th>Room Number</th><td>${booking.roomNumber}</td></tr>
            <tr><th>Check-in</th><td>${booking.checkInDate}</td></tr>
            <tr><th>Check-out</th><td>${booking.checkOutDate}</td></tr>
            <tr><th>Payment Method</th><td>${booking.paymentMethod || '-'}</td></tr>
            <tr><th>Payment Details</th><td>${this.formatPaymentInfo(booking.paymentInfo)}</td></tr>
            <tr><th>Total Price</th><td>${booking.totalPrice} ৳</td></tr>
          </table>
          <script>window.print();</script>
        </body>
      </html>
    `);
  }
}
