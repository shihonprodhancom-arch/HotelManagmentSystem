import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  private baseUrl = 'http://localhost:9092/api/reports';

  constructor(private http: HttpClient) {}

  getMonthlyRevenue() {
    return this.http.get(`${this.baseUrl}/monthly-revenue`, { responseType: 'blob' });
  }

  getOccupancyRate() {
    return this.http.get(`${this.baseUrl}/occupancy-rate`, { responseType: 'blob' });
  }
}
