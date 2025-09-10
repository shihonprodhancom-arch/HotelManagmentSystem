import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {
  constructor(private router: Router) {}

  register(formData: any) {
    console.log("User Registered:", formData);

    // localStorage এ ডাটা সেভ
    localStorage.setItem('user', JSON.stringify(formData));

    alert("✅ Registration Successful! Please login.");
    this.router.navigate(['/login']);
  }
}
