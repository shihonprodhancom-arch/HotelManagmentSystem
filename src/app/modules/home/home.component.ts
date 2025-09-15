import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  hotel = {
    name: 'Grand Hotel',
    location: '123 Main Street, Dhaka, Bangladesh',
    phone: '+880 1234-567890',
    email: 'info@grandhotel.com',
    facebook: 'https://facebook.com/grandhotel',
    banner: 'https://picsum.photos/1600/900' // <-- external download image
  };
}
