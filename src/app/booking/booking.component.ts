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
    { number: 101, type: 'Single', price: 2000 },
    { number: 102, type: 'Double', price: 3000 },
    { number: 103, type: 'Suite', price: 5000 },
    { number: 104, type: 'AC', price: 3500 },
    { number: 105, type: 'Non-AC', price: 2500 },
    { number: 106, type: 'Business', price: 4000 },
    { number: 107, type: 'Family', price: 4500 }
  ];

  paymentMethods: string[] = ['Bank', 'Bkash', 'Nagad'];
  paymentDetails: any = {}; // Payment Info for Selected Booking

  constructor() {}

  ngOnInit(): void { }

  addOrUpdateBooking(data: any) {
    if (!data.guest || !data.room || !data.checkin || !data.checkout || !data.guests) {
      Swal.fire('Error', 'All fields are required!', 'error');
      return;
    }

    const selectedRoom = this.rooms.find(r => r.number == data.room);
    data.roomType = selectedRoom?.type || 'Unknown';
    data.price = selectedRoom && selectedRoom.price ? selectedRoom.price * data.guests : 0;

    if (this.editingIndex !== null) {
      this.bookings[this.editingIndex] = { ...data, status: 'Pending', paymentMethod: '', paymentInfo: {} };
      this.editingIndex = null;
    } else {
      this.bookings.push({ ...data, status: 'Pending', paymentMethod: '', paymentInfo: {} });
    }

    this.booking = {};
  }

  payBooking(index: number) {
    this.paymentDetails = { method: '', bankName: '', accountNumber: '', trxId: '' };
    Swal.fire({
      title: 'Select Payment Method',
      input: 'radio',
      inputOptions: this.paymentMethods.reduce((acc, m) => { acc[m] = m; return acc; }, {} as any),
      inputValidator: (value) => value ? null : 'Please select a payment method!'
    }).then((result) => {
      if (result.isConfirmed) {
        const method = result.value;
        this.paymentDetails.method = method;

        // Open detail input modal
        Swal.fire({
          title: `${method} Payment Details`,
          html: this.getPaymentHtml(method),
          focusConfirm: false,
          preConfirm: () => {
            if(method === 'Bank'){
              const bankName = (document.getElementById('bankName') as HTMLInputElement).value;
              const accountNumber = (document.getElementById('accountNumber') as HTMLInputElement).value;
              if(!bankName || !accountNumber){
                Swal.showValidationMessage('Enter Bank Name and Account Number');
              }
              return { bankName, accountNumber };
            }
            if(method === 'Bkash' || method === 'Nagad'){
              const trxId = (document.getElementById('trxId') as HTMLInputElement).value;
              if(!trxId){
                Swal.showValidationMessage('Enter Transaction ID');
              }
              return { trxId };
            }
            return {};
          }
        }).then((detailsResult) => {
          if(detailsResult.isConfirmed){
            this.bookings[index].paymentMethod = method;
            this.bookings[index].status = 'Paid';
            this.bookings[index].paymentInfo = detailsResult.value;
            Swal.fire('Paid!', `${method} Payment Completed`, 'success');
          }
        });
      }
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

  printReceipt(booking: any) {
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
            .total { font-weight: bold; }
          </style>
        </head>
        <body>
          <h2>Hotel Booking Receipt</h2>
          <table>
            <tr><th>Guest Name</th><td>${booking.guest}</td></tr>
            <tr><th>Email</th><td>${booking.email || '-'}</td></tr>
            <tr><th>Room Number</th><td>${booking.room}</td></tr>
            <tr><th>Room Type</th><td>${booking.roomType}</td></tr>
            <tr><th>Guests</th><td>${booking.guests}</td></tr>
            <tr><th>Check-in</th><td>${booking.checkin}</td></tr>
            <tr><th>Check-out</th><td>${booking.checkout}</td></tr>
            <tr><th>Payment Method</th><td>${booking.paymentMethod}</td></tr>
            <tr><th>Payment Details</th><td>${this.formatPaymentInfo(booking.paymentInfo)}</td></tr>
            <tr><th>Total Price</th><td>${booking.price} ৳</td></tr>
          </table>
          <script>window.print();</script>
        </body>
      </html>
    `);
  }

  formatPaymentInfo(info: any){
    if(!info) return '-';
    if(info.bankName) return `Bank: ${info.bankName}, Account: ${info.accountNumber}`;
    if(info.trxId) return `Transaction ID: ${info.trxId}`;
    return '-';
  }

  cancelBooking(index: number) {
    this.bookings[index].status = 'Cancelled';
  }

}
