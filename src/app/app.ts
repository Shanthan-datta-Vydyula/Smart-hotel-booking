import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule, 
    RouterOutlet
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('smart-hotel-booking');
  userRole: 'user' | 'manager' | null = null;

  constructor(private router: Router) {}

  // Navigation methods
  showHome() {
    this.router.navigate(['/home']);
  }

  showGuestLogin() {
    this.router.navigate(['/guest-login']);
  }

  showManagerLogin() {
    this.router.navigate(['/manager-login']);
  }

  showRegister() {
    this.router.navigate(['/register']);
  }

  showHotelSearch() {
    this.router.navigate(['/hotel-search']);
  }

  showFeedback() {
    this.router.navigate(['/feedback']);
  }

  showDashboard() {
    if (this.userRole === 'manager') {
      this.router.navigate(['/manager-dashboard']);
    } else {
      this.router.navigate(['/hotel-search']);
    }
  }

  logout() {
    this.userRole = null;
    this.showHome();
  }
}
