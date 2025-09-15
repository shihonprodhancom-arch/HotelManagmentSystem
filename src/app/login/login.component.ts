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
    // ✅ Demo hardcoded login (তুমি চাইলে API দিয়ে মিলিয়ে নিতে পারো)
    const demoEmail = "shihonprodhan.com@gmail.com";
    const demoPassword = "123456";

    if (formData.email === demoEmail && formData.password === demoPassword) {
      alert("✅ Login Successful!");
      this.router.navigate(['/sidebar']);
    } else {
      alert("❌ Invalid Email or Password!");
    }
  }
}
