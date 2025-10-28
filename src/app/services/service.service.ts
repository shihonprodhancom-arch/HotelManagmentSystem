import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ExtraService } from '../service.model';


@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  private baseUrl = 'http://localhost:9092/api/services'; // Spring Boot

  constructor(private http: HttpClient) {}

  getAll(): Observable<ExtraService[]> {
    return this.http.get<ExtraService[]>(this.baseUrl);
  }

  add(service: ExtraService): Observable<ExtraService> {
    return this.http.post<ExtraService>(this.baseUrl, service);
  }
}
