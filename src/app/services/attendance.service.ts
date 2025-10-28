import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Attendance } from '../attendance.model';

@Injectable({
  providedIn: 'root'
})
export class AttendanceService {

  private apiUrl = 'http://localhost:9092/api/attendance'; // Backend URL

  constructor(private http: HttpClient) {}

  getAll(): Observable<Attendance[]> {
    return this.http.get<Attendance[]>(this.apiUrl);
  }

  getByStaff(staffId: number): Observable<Attendance[]> {
    return this.http.get<Attendance[]>(`${this.apiUrl}/staff/${staffId}`);
  }

  addAttendance(attendance: Attendance): Observable<Attendance> {
    return this.http.post<Attendance>(this.apiUrl, attendance);
  }
}
