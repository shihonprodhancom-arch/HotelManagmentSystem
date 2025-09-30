import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Guest {
  id?: number;
  name: string;
  phone: string;
  email: string;
}

@Injectable({
  providedIn: 'root'
})
export class GuestService {

  private apiUrl = 'http://localhost:9092/api/guests';

  constructor(private http: HttpClient) { }

  // Get all guests
  getAllGuests(): Observable<Guest[]> {
    return this.http.get<Guest[]>(this.apiUrl);
  }

  // Get guest by ID
  getGuestById(id: number): Observable<Guest> {
    return this.http.get<Guest>(`${this.apiUrl}/${id}`);
  }

  // Add new guest
  addGuest(guest: Guest): Observable<Guest> {
    return this.http.post<Guest>(this.apiUrl, guest);
  }

  // Update guest
  updateGuest(id: number, guest: Guest): Observable<Guest> {
    return this.http.put<Guest>(`${this.apiUrl}/${id}`, guest);
  }

  // Delete guest
  deleteGuest(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
