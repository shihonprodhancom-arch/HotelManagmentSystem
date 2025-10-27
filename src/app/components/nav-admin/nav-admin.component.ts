import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-admin',
  templateUrl: './nav-admin.component.html',
  styleUrls: ['./nav-admin.component.css']
})
export class NavAdminComponent implements OnInit {
  constructor(private router: Router) { }

  currentYear: number = new Date().getFullYear();
  
  // Dashboard statistics
  dashboardStats = {
    totalRooms: 120,
    availableRooms: 24,
    activeBookings: 85,
    currentGuests: 250,
    pendingPayments: 12,
    totalRevenue: '৳2.5M',
    occupancyRate: 94,
    hotelRating: 4.8
  };

  // Recent activities
  recentActivities = [
    { type: 'booking', message: 'New booking from John Smith', time: '2 minutes ago', icon: '✓' },
    { type: 'maintenance', message: 'Room 201 requires maintenance', time: '1 hour ago', icon: '⚠' },
    { type: 'payment', message: 'Payment received for Booking #1234', time: '3 hours ago', icon: '💳' },
    { type: 'booking', message: 'Check-out completed for Room 305', time: '5 hours ago', icon: '✓' },
    { type: 'maintenance', message: 'Pool area cleaning scheduled', time: '6 hours ago', icon: '⚠' }
  ];

  ngOnInit() {
    // You can add initialization logic here
  }

  // Navigation methods
  navigateTo(path: string) {
    this.router.navigate([path]);
  }

  // Quick action methods
  onQuickAction(action: string) {
    switch(action) {
      case 'rooms':
        this.navigateTo('/rooms');
        break;
      case 'booking':
        this.navigateTo('/booking');
        break;
      case 'guests':
        this.navigateTo('/guests');
        break;
      case 'payments':
        this.navigateTo('/payments');
        break;
      case 'admin':
        this.navigateTo('/admin');
        break;
    }
  }

  // Get occupancy percentage
  getOccupancyPercentage(): number {
    return Math.round(((this.dashboardStats.totalRooms - this.dashboardStats.availableRooms) / this.dashboardStats.totalRooms) * 100);
  }
}