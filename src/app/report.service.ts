import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  private baseUrl = 'http://localhost:9092/api/reports';

  constructor(private http: HttpClient) {}

  downloadReport(format: string) {
    const url = `${this.baseUrl}/bookings/${format}`;
    const headers = new HttpHeaders({
      'Accept': 'application/octet-stream'
    });
    return this.http.get(url, { headers, responseType: 'blob' });
  }
}
