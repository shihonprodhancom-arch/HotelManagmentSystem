import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Booking {
  id?: number;
  guestName: string;
  roomNumber: string;
  checkInDate: string;  // yyyy-MM-dd
  checkOutDate: string; // yyyy-MM-dd
  totalPrice: number;
  status?: string;       // Pending, Paid, Cancelled
  paymentMethod?: string; // Bank, Bkash, Nagad
  paymentInfo?: any;      // JSON object for bank/trx details
}


@Injectable({
  providedIn: 'root'
})
export class BookingService {

  private apiUrl = 'http://localhost:9092/api/bookings';

  constructor(private http: HttpClient) { }

  getAllBookings(): Observable<Booking[]> {
    return this.http.get<Booking[]>(this.apiUrl);
  }

  getBookingById(id: number): Observable<Booking> {
    return this.http.get<Booking>(`${this.apiUrl}/${id}`);
  }

  // addBooking(booking: Booking): Observable<Booking> {
  //   return this.http.post<Booking>(this.apiUrl, booking);
  // }

  // updateBooking(id: number, booking: Booking): Observable<Booking> {
  //   return this.http.put<Booking>(`${this.apiUrl}/${id}`, booking);
  // }

  addBooking(booking: Booking): Observable<Booking> {
  const payload = { ...booking, paymentInfo: JSON.stringify(booking.paymentInfo) };
  return this.http.post<Booking>(this.apiUrl, payload);
}

updateBooking(id: number, booking: Booking): Observable<Booking> {
  const payload = { ...booking, paymentInfo: JSON.stringify(booking.paymentInfo) };
  return this.http.put<Booking>(`${this.apiUrl}/${id}`, payload);
}


  deleteBooking(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

}
