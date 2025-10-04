import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { BookingDetails } from '../booking-details/booking-details';
 
// import {GuestSelection} from "../guest-selector/guest-selector.component";
@Component({
  selector: 'app-booking',
  imports: [CommonModule, BookingDetails],
  templateUrl: './booking.html',
  styleUrl: './booking.css',
  standalone: true
})
export class Booking implements OnInit {
  @Input() hotel: any;
  @Output() close = new EventEmitter<void>();
  @Output() bookingConfirmed = new EventEmitter<any>();
  
  @Input() checkIn: string = '';
  @Input() checkOut: string = '';
  openBookingDetails: boolean = false;
  
  constructor(private router: Router) {}
 
  ngOnInit() {
    // Load booking data from session storage if available
    const storedBookingData = sessionStorage.getItem('bookingData');
    if (storedBookingData) {
      const bookingData = JSON.parse(storedBookingData);
      this.hotel = bookingData.hotel;
      this.checkIn = bookingData.checkInDate;
      this.checkOut = bookingData.checkOutDate;
      this.openBookingDetails = false;
    } else {
      console.error('No booking data found in session storage');
    }
    console.log('Hotel:', this.hotel);
  }
 
  confirmBooking() {
    // First show booking confirmation, then proceed to details
    this.openBookingDetails = true;
    this.bookingConfirmed.emit({
      hotel: this.hotel,
      checkIn: this.checkIn,
      checkOut: this.checkOut
    });
  }
 
  closeBooking() {
    if (this.openBookingDetails) {
      this.router.navigate(['/user-dashboard']);
    } else {
      this.router.navigate(['/hotel-search']);
    }
    this.close.emit();
  }
  
  goBack() {
    this.router.navigate(['/hotel-search']);
  }
}
 
// Angular module
 
 