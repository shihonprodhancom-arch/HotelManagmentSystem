import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Staff {
  id?: number;
  name: string;
  role: string;
  salary: number;
  shift: string;
  joinDate?: string;
}

@Injectable({ providedIn: 'root' })
export class StaffService {
  private baseUrl = 'http://localhost:9092/api/staff';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Staff[]> {
    return this.http.get<Staff[]>(this.baseUrl);
  }

  add(staff: Staff): Observable<Staff> {
    return this.http.post<Staff>(this.baseUrl, staff);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}
