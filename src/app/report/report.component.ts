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

  constructor(private http: HttpClient) {}

  downloadReport(format: string) {
    this.loading = true;
    this.errorMessage = '';

    const url = `http://localhost:9092/api/reports/bookings/${format}`;

    this.http.get(url, { responseType: 'blob' }).subscribe({
      next: (response: Blob) => {
        const fileName = `booking-report.${format}`;
        saveAs(response, fileName);
        this.loading = false;
      },
      error: (err) => {
        console.error('Report download failed:', err);
        this.errorMessage = 'Report download failed. Please try again!';
        this.loading = false;
      }
    });
  }
  activeReport: string = '';

setActive(format: string) {
  this.activeReport = format;
}
}
