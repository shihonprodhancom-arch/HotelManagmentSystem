import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  formData = { email: '', password: '' };
  loading = false;

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    this.loading = true;

    this.authService.login(this.formData).subscribe({
      next: (res) => {
        this.authService.saveToken(res.token);
        alert('✅ Login successful!');
        this.router.navigate(['/sidebar']); // sidebar বা dashboard route
        this.loading = false;
      },
      error: () => {
        alert('❌ Invalid Email or Password!');
        this.loading = false;
      }
    });
  }
}
