import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RegistrationComponent } from './registration/registration.component';
import { LoginComponent } from './login/login.component';
import { RoomsComponent } from './components/rooms/rooms/rooms.component';
import { RoomFormComponent } from './components/rooms/room-form/room-form.component';
import { BookingComponent } from './booking/booking.component';
import { GuestsComponent } from './guests/guests.component';
import { PaymentsComponent } from './payments/payments.component';
import { AdminComponent } from './admin/admin.component';
import { NavAdminComponent } from './components/nav-admin/nav-admin.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { RoomGroupListComponent } from './components/rooms/room-group-list/room-group-list.component';

const routes: Routes = [
  // 🔹 Home Lazy Loaded
  { path: '', loadChildren: () => import('./modules/home/home.module').then(m => m.HomeModule) },

  // 🔹 Auth Route
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: RegistrationComponent },

  {
    path: 'sidebar', component: SidebarComponent,
    children: [
      { path: 'dashboard', component: NavAdminComponent },
      { path: 'rooms', component: RoomsComponent },
      { path: 'rooms/add', component: RoomFormComponent },
      { path: 'rooms/add/:id', component: RoomFormComponent },
      { path: 'booking', component: BookingComponent },
      { path: 'guests', component: GuestsComponent },
      { path: 'payments', component: PaymentsComponent },
      { path: 'admin', component: AdminComponent },
      { path: 'room-groups', component: RoomGroupListComponent },

      { path: '**', redirectTo: 'dashboard', pathMatch: 'full' }

    ]
  },

  // 🔹 Dashboard & Features


  // 🔹 Wildcard → redirect to home
  { path: '**', redirectTo: 'sidebar' }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
