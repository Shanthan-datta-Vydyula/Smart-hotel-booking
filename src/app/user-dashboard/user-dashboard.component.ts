import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-dashboard',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="container-fluid p-0">
      <!-- Header -->
      <header class="bg-primary text-white py-3 mb-4">
        <div class="container">
          <div class="d-flex justify-content-between align-items-center">
            <h1 class="h3 mb-0">
              <i class="fas fa-user-circle me-2"></i>
              User Dashboard
            </h1>
            <button class="btn btn-outline-light" (click)="backToDashboard()">
              <i class="fas fa-arrow-left me-1"></i>
              Back to Dashboard
            </button>
          </div>
        </div>
      </header>

      <div class="container">
        <!-- Welcome Section -->
        <div class="row mb-4">
          <div class="col-12">
            <div class="alert alert-info">
              <h4 class="alert-heading">
                <i class="fas fa-star me-2"></i>
                Welcome to Smart Hotel Booking!
              </h4>
              <p class="mb-0">Manage your bookings, search for hotels, and provide feedback all in one place.</p>
            </div>
          </div>
        </div>

        <!-- Quick Actions -->
        <div class="row g-4 mb-5">
          <div class="col-md-6">
            <div class="card h-100 shadow-sm hover-card" (click)="searchHotels()">
              <div class="card-body text-center p-4">
                <div class="feature-icon bg-primary text-white rounded-circle mx-auto mb-3">
                  <i class="fas fa-search fa-2x"></i>
                </div>
                <h5 class="card-title">Search Hotels</h5>
                <p class="card-text text-muted">Find and book your perfect hotel</p>
              </div>
            </div>
          </div>

          <div class="col-md-6">
            <div class="card h-100 shadow-sm hover-card" (click)="giveFeedback()">
              <div class="card-body text-center p-4">
                <div class="feature-icon bg-warning text-white rounded-circle mx-auto mb-3">
                  <i class="fas fa-comment-alt fa-2x"></i>
                </div>
                <h5 class="card-title">Feedback</h5>
                <p class="card-text text-muted">Share your experience with us</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .hover-card {
      transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
      cursor: pointer;
    }
    
    .hover-card:hover {
      transform: translateY(-5px);
      box-shadow: 0 8px 25px rgba(0,0,0,0.15) !important;
    }
    
    .feature-icon {
      width: 80px;
      height: 80px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    
    .bg-primary {
      background-color: #007bff !important;
    }
    
    .bg-success {
      background-color: #28a745 !important;
    }
    
    .bg-warning {
      background-color: #ffc107 !important;
    }
  `]
})
export class UserDashboardComponent {

  constructor(private router: Router) {}

  searchHotels(): void {
    this.router.navigate(['/hotel-search']);
  }

  giveFeedback(): void {
    this.router.navigate(['/feedback']);
  }

  backToDashboard(): void {
    this.router.navigate(['/home']);
  }
}

