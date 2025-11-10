import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Auth
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';

// Sidebar + Dashboard
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { NavAdminComponent } from './components/nav-admin/nav-admin.component';

// Main Features
import { RoomsComponent } from './components/rooms/rooms/rooms.component';
import { RoomFormComponent } from './components/rooms/room-form/room-form.component';
import { RoomGroupListComponent } from './components/rooms/room-group-list/room-group-list.component';
import { BookingComponent } from './booking/booking.component';
import { GuestsComponent } from './guests/guests.component';
import { PaymentsComponent } from './payments/payments.component';
import { AdminComponent } from './admin/admin.component';
import { StaffListComponent } from './staff-list/staff-list.component';
import { StaffFormComponent } from './staff-form/staff-form.component';
import { AttendanceComponent } from './attendance/attendance.component';

// ✅ Services
import { ServiceListComponent } from './services/service-list/service-list.component';
import { ServiceFormComponent } from './services/service-form/service-form.component';
import { ReportComponent } from './report/report.component';
import { RoomBookingsComponent } from './components/rooms/room-bookings/room-bookings.component';

const routes: Routes = [
  // Auth routes
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: RegistrationComponent },
  { path: 'cal', component: RoomBookingsComponent },

  // Sidebar routes
  {
    path: 'sidebar', component: SidebarComponent,
    children: [
      { path: 'dashboard', component: NavAdminComponent },
      { path: 'rooms', component: RoomsComponent },
      { path: 'rooms/add', component: RoomFormComponent },
      { path: 'rooms/add/:id', component: RoomFormComponent },
      { path: 'room-groups', component: RoomGroupListComponent },
      { path: 'booking', component: BookingComponent },
      { path: 'guests', component: GuestsComponent },
      { path: 'staff-management', component: StaffListComponent },
      { path: 'staff/add', component: StaffFormComponent },
      { path: 'attendance', component: AttendanceComponent },
      { path: 'reports', component: ReportComponent },
      // ✅ Extra Services
      { path: 'services', component: ServiceListComponent },
      { path: 'services/add', component: ServiceFormComponent },

      { path: 'payments', component: PaymentsComponent },
      { path: 'admin', component: AdminComponent },

      // Default child redirect
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
    ]
  },

  // Root redirect
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
