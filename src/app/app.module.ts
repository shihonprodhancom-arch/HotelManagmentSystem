import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Components
import { AppComponent } from './app.component';
import { RoomsComponent } from './rooms/rooms.component';
import { RoomFormComponent } from './rooms/room-form/room-form.component';
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
    BookingComponent
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
