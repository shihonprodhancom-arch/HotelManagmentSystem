import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RegistrationComponent } from './registration/registration.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RoomsComponent } from './rooms/rooms.component';
import { RoomFormComponent } from './rooms/room-form/room-form.component';
import { BookingComponent } from './booking/booking.component';
import { GuestsComponent } from './guests/guests.component';
import { PaymentsComponent } from './payments/payments.component';
import { AdminComponent } from './admin/admin.component';

const routes: Routes = [
  // 🔹 Default route → Registration Page
  { path: '', component: RegistrationComponent },

  // 🔹 Auth Routes
  { path: 'login', component: LoginComponent },

  // 🔹 Main Dashboard & Features
  { path: 'dashboard', component: DashboardComponent },
  { path: 'rooms', component: RoomsComponent },
  { path: 'rooms/add', component: RoomFormComponent },
  { path: 'booking', component: BookingComponent },
  { path: 'guests', component: GuestsComponent },
  { path: 'payments', component: PaymentsComponent },
  { path: 'admin', component: AdminComponent },

  // 🔹 Wildcard → back to Registration
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule{
  
}
