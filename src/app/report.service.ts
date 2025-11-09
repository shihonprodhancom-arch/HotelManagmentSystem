import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  private baseUrl = 'http://localhost:9092/report';

  constructor(private http: HttpClient) { }

  downloadReport(type: string) {
    return this.http.get(`${this.baseUrl}/${type}`, { responseType: 'blob' });
  }
}
