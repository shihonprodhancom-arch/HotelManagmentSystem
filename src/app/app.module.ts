import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Components
import { AppComponent } from './app.component';
import { RoomsComponent } from './components/rooms/rooms/rooms.component';
import { RoomFormComponent } from './components/rooms/room-form/room-form.component';
import { BookingComponent } from './booking/booking.component';
import { GuestsComponent } from './guests/guests.component';
import { PaymentsComponent } from './payments/payments.component';
import { AdminComponent } from './admin/admin.component';

// Angular Material
import { MatCardModule } from '@angular/material/card';
import { RegistrationComponent } from './registration/registration.component';
import { LoginComponent } from './login/login.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { NavAdminComponent } from './components/nav-admin/nav-admin.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { HttpClientModule } from '@angular/common/http';
import { LogoutComponent } from './logout/logout.component';
import { RoomGroupListComponent } from './components/rooms/room-group-list/room-group-list.component';
import { StaffFormComponent } from './staff-form/staff-form.component';
import { StaffListComponent } from './staff-list/staff-list.component';
import { AttendanceComponent } from './attendance/attendance.component';
import { ServiceFormComponent } from './services/service-form/service-form.component';
import { ServiceListComponent } from './services/service-list/service-list.component';
import { ReportComponent } from './report/report.component';

@NgModule({
  declarations: [
    AppComponent,
    RoomsComponent,
    RoomFormComponent,
    GuestsComponent,
    PaymentsComponent,
    AdminComponent,
    RegistrationComponent,
    LoginComponent,
    HomepageComponent,
    NavAdminComponent,
    SidebarComponent,
    BookingComponent,
    LogoutComponent,
    RoomGroupListComponent,
    StaffFormComponent,
    StaffListComponent,
    AttendanceComponent,
    ServiceFormComponent,
    ServiceListComponent,
    ReportComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatCardModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
