import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { BookingService, Booking } from '../services/booking.service';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent implements OnInit {

  bookings: Booking[] = [];
  booking: any = {};
  editingBookingId: number | null = null;

  rooms = [
    { number: 101, type: 'Single', price: 2000 },
    { number: 102, type: 'Double', price: 3000 },
    { number: 103, type: 'Suite', price: 5000 },
    { number: 104, type: 'AC', price: 3500 },
    { number: 105, type: 'Non-AC', price: 2500 },
    { number: 106, type: 'Business', price: 4000 },
    { number: 107, type: 'Family', price: 4500 }
  ];

  paymentMethods: string[] = ['Bank', 'Bkash', 'Nagad'];
  paymentDetails: any = {};

  constructor(private bookingService: BookingService) {}

  ngOnInit(): void {
    this.loadBookings();
  }

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
    const booking: Booking = {
      guestName: data.guest,
      roomNumber: data.room.toString(),
      checkInDate: data.checkin,
      checkOutDate: data.checkout,
      totalPrice: selectedRoom ? selectedRoom.price * data.guests : 0,
      status: 'Pending',
      paymentMethod: '',
      paymentInfo: {}
    };

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
      guests: Math.ceil(booking.totalPrice / (this.rooms.find(r => r.number == Number(booking.roomNumber))?.price || 1))
    };
  }

  deleteBooking(id: any) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'This booking will be deleted!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!'
    }).then(result => {
      if(result.isConfirmed){
        this.bookingService.deleteBooking(id).subscribe(() => {
          Swal.fire('Deleted', 'Booking removed', 'success');
          this.loadBookings();
        });
      }
    });
  }

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
              console.log(bookingToPay);
              
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

  getPaymentHtml(method: string){
    if(method === 'Bank'){
      return `
        <input id="bankName" class="swal2-input" placeholder="Bank Name">
        <input id="accountNumber" class="swal2-input" placeholder="Account Number">
      `;
    } else if(method === 'Bkash' || method === 'Nagad'){
      return `<input id="trxId" class="swal2-input" placeholder="Transaction ID">`;
    }
    return '';
  }

  formatPaymentInfo(info: any){
    if(!info) return '-';
    if(info.bankName) return `Bank: ${info.bankName}, Account: ${info.accountNumber}`;
    if(info.trxId) return `Transaction ID: ${info.trxId}`;
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
