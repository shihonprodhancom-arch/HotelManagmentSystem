import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// 🔹 Auth Components
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';

// 🔹 Sidebar & Dashboard
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { NavAdminComponent } from './components/nav-admin/nav-admin.component';

// 🔹 Features / Pages
import { RoomsComponent } from './components/rooms/rooms/rooms.component';
import { RoomFormComponent } from './components/rooms/room-form/room-form.component';
import { RoomGroupListComponent } from './components/rooms/room-group-list/room-group-list.component';
import { BookingComponent } from './booking/booking.component';
import { GuestsComponent } from './guests/guests.component';
import { PaymentsComponent } from './payments/payments.component';
import { AdminComponent } from './admin/admin.component';
import { StaffListComponent } from './staff-list/staff-list.component';
import { StaffFormComponent } from './staff-form/staff-form.component';


const routes: Routes = [
  // 🔹 Auth Routes
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: RegistrationComponent },

  // 🔹 Sidebar Parent
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
      { path: 'payments', component: PaymentsComponent },
      { path: 'admin', component: AdminComponent },

      // fallback for unknown child paths
      { path: '**', redirectTo: 'dashboard', pathMatch: 'full' }
    ]
  },

  // 🔹 Root & Wildcard
  // { path: '', redirectTo: '/login', pathMatch: 'full' },
  // { path: '**', redirectTo: '/login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
