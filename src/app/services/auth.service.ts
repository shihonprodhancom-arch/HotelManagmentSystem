import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

export interface LoginResponse {
  token: string;
  roles: string[];
  message: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = 'http://localhost:9092/api/auth';

  constructor(private http: HttpClient) {}

  // Registration
  register(user: { name: string; email: string; password: string }): Observable<any> {
    return this.http.post(`${this.baseUrl}/register`, user);
  }

  // Login
  login(credentials: { email: string; password: string }): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.baseUrl}/login`, credentials)
      .pipe(
        tap(res => {
          this.saveToken(res.token);
          this.saveRoles(res.roles);
        })
      );
  }

  private saveToken(token: string) {
    localStorage.setItem('authToken', token);
  }

  private saveRoles(roles: string[]) {
    localStorage.setItem('userRoles', JSON.stringify(roles));
  }

  getRoles(): string[] {
    const roles = localStorage.getItem('userRoles');
    return roles ? JSON.parse(roles) : [];
  }

  getToken(): string | null {
    return localStorage.getItem('authToken');
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  logout() {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userRoles');
  }
}
