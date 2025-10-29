import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent {

  constructor(private http: HttpClient) {}

  openReport(endpoint: string, filename: string) {
    this.http.get(`http://localhost:9092/api/reports/${endpoint}`, { responseType: 'blob' })
      .subscribe((res) => {
        const url = window.URL.createObjectURL(res);
        const link = document.createElement('a');
        link.href = url;
        link.download = filename;
        link.click();
      });
  }

  openMonthlyRevenue() {
    this.openReport('monthly-revenue', 'MonthlyRevenue.pdf');
  }

  openOccupancyRate() {
    this.openReport('occupancy-rate', 'OccupancyRate.pdf');
  }

  openTopBookedRooms() {
    this.openReport('top-booked-rooms', 'TopBookedRooms.pdf');
  }

  openGuestFrequency() {
    this.openReport('guest-frequency', 'GuestFrequency.pdf');
  }
}
