import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  hotel = {
    name: 'SK Grand Hotel',
    location: '123 Main Street, Dhaka, Bangladesh',
    phone: '+880 1918156780',
    email: 'shihonprodhan.com@gmail.com',
    facebook: 'https://www.facebook.com/md.shihonchowdhory',
    banner: 'https://images.stockcake.com/public/9/4/6/946c19ed-f3b5-40b5-aa03-90743b097996_large/elegant-hotel-reception-stockcake.jpg' // <-- external download image
  };
}
