


import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Booking {
  id?: number;
  guestName: string;
  roomNumber: string;
  checkInDate: string;
  checkOutDate: string;
  totalPrice: number;
  status?: string;
  paymentMethod?: string;
  paymentInfo?: any;
}

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  private apiUrl = 'http://localhost:9092/api/bookings';

  constructor(private http: HttpClient) {}

  getAllBookings(): Observable<Booking[]> {
    return this.http.get<Booking[]>(this.apiUrl);
  }
    getBookingsByRoom(roomNumber: string): Observable<Booking[]> {
    return this.http.get<Booking[]>(`${this.apiUrl}/room/${roomNumber}`);
  }

  addBooking(booking: Booking): Observable<Booking> {
    return this.http.post<Booking>(this.apiUrl, booking);
  }

  updateBooking(id: number, booking: Booking): Observable<Booking> {
    return this.http.put<Booking>(`${this.apiUrl}/${id}`, booking);
  }

  deleteBooking(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}

