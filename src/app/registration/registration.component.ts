import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {

  formData = { name: '', email: '', password: '' };
  loading = false;

  constructor(private authService: AuthService, private router: Router) {}

  register() {
    this.loading = true;
this.authService.register(this.formData).subscribe({
  next: (res) => {
    if (res.success) {
      alert(res.message);
      this.router.navigate(['/login']);
    }
  },
  error: (err) => {
    alert(err.error.message || 'Registration failed');
        this.loading = false;

  }
});

    // this.authService.register(this.formData).subscribe({
    //   next: () => {
    //     alert('✅ Registration successful! Please login.');
    //     this.router.navigate(['/login']); // redirect to login page
    //     this.loading = false;
    //   },
    //   error: (err) => {
    //     alert('❌ Registration failed: ' + err.error);
    //     this.loading = false;
    //   }
    // });
  }
}
