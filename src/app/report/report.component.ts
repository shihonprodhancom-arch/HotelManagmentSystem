import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent {

  loading: boolean = false;
  errorMessage: string = '';

  activeBookingFormat: string = '';
  activeAttendanceFormat: string = '';

  constructor(private http: HttpClient) {}

  downloadBookingReport(format: string) {
    this.loading = true;
    this.errorMessage = '';
    const url = `http://localhost:9092/api/reports/bookings/${format}`;

    this.http.get(url, { responseType: 'blob' }).subscribe({
      next: (response: Blob) => {
        saveAs(response, `booking-report.${format}`);
        this.activeBookingFormat = format;
        this.loading = false;
      },
      error: (err) => {
        console.error('Booking report failed:', err);
        this.errorMessage = 'Booking report download failed!';
        this.loading = false;
      }
    });
  }

  downloadAttendanceReport(format: string) {
    this.loading = true;
    this.errorMessage = '';
    const url = `http://localhost:9092/api/reports/attendance/${format}`;

    this.http.get(url, { responseType: 'blob' }).subscribe({
      next: (response: Blob) => {
        saveAs(response, `attendance-report.${format}`);
        this.activeAttendanceFormat = format;
        this.loading = false;
      },
      error: (err) => {
        console.error('Attendance report failed:', err);
        this.errorMessage = 'Attendance report download failed!';
        this.loading = false;
      }
    });
  }
}
