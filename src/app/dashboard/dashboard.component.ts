import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

  constructor(private router: Router) { }

  currentYear: number = new Date().getFullYear();

  // Dashboard cards with router links
  cards = [
    { title: 'Total Rooms', value: 120, link: '/rooms' },
    { title: 'Active Bookings', value: 85, link: '/booking' },
    { title: 'Guests', value: 250, link: '/guests' },
    { title: 'Pending Payments', value: 12, link: '/payment' },
    { title: 'Admin Panel', value: 'Manage Settings', link: '/admin' }
  ];

  goToRooms() {
    this.router.navigate(['/rooms']);
  }

  goToBookings() {
    this.router.navigate(['/booking']);
  }

}
