import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(private router: Router) {}

  login(formData: any) {
    const userData = localStorage.getItem('user');

    if (userData) {
      const user = JSON.parse(userData);

      if (user.email === formData.email && user.password === formData.password) {
        alert("✅ Login Successful!");
        this.router.navigate(['/dashboard']);
      } else {
        alert("❌ Invalid Email or Password!");
      }
    } else {
      alert("❌ No registered user found. Please Register first.");
      this.router.navigate(['/']);
    }
  }
}
