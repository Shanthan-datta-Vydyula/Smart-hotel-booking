import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { GuestLoginComponent } from './guest-login/guest-login.component';
import { ManagerLoginComponent } from './manager-login/manager-login.component';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { HotelSearch } from './hotel-search/hotel-search';
import { Booking } from './booking/booking';
import { FeedbackForm } from './feedback-form/feedback-form';
import { ManagerDashboardComponent } from './managerdashboard/managerdashboard';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'guest-login', component: GuestLoginComponent },
  { path: 'manager-login', component: ManagerLoginComponent },
  { path: 'user-dashboard', component: UserDashboardComponent },
  { path: 'hotel-search', component: HotelSearch },
  { path: 'booking', component: Booking },
  { path: 'feedback', component: FeedbackForm },
  { path: 'manager-dashboard', component: ManagerDashboardComponent },
  { path: '**', redirectTo: '' }
];
