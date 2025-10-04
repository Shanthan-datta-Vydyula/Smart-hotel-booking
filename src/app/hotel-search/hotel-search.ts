import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HotelFilterPipe } from "./hotel-search.pipe";
import { GuestSelectorComponent } from '../guest-selector/guest-selector';
import { Booking } from "../booking/booking";
import { HotelService } from '../services/hotel.service';
import { HotelInterface } from '../interfaces/hotelInterface';
 
@Component({
  selector: 'app-hotel-search',
  standalone: true,
  imports: [CommonModule, FormsModule, HotelFilterPipe, GuestSelectorComponent, Booking],
  templateUrl: './hotel-search.html',
  styleUrls: ['./hotel-search.css']
})
export class HotelSearch implements OnInit {
  @Output() hotelSelected = new EventEmitter<{hotel: HotelInterface, checkInDate: string, checkOutDate: string}>();
  @Output() backToHome = new EventEmitter<void>();

  hotels:HotelInterface[]=[];
 
  constructor(private hotelService:HotelService, private router: Router) {}

  ngOnInit(): void {
    this.hotels = this.hotelService.getHotels();
  }

  searchTerm: string = '';
  searchTriggered: boolean = false;
  showGuestSelector: boolean = false;
  guestSelectionText: string = '2 adults · 0 children · 0room';
  searchButtonLabel:string='Search All';
  checkInDate: string = '';
  checkOutDate: string = '';
  dateError: string = '';
 
  selectedHotel: HotelInterface | null = null;
  today: string = new Date().toISOString().split('T')[0];
 
  triggerSearch(form?: any) {
    if (form && form.invalid) {
      this.dateError = 'Please fill all required fields.';
      return;
    }
   
    this.dateError = '';

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const checkIn = new Date(this.checkInDate);
    const checkOut = new Date(this.checkOutDate);

    if (!this.checkInDate || !this.checkOutDate) {
      this.dateError = 'Please select both check-in and check-out dates.';
      return;
    }

    if (checkIn.getTime() < today.getTime()) {
      this.dateError = 'Check-in date cannot be in the past.';
      return;
    }

    if (checkOut.getTime() <= checkIn.getTime()) {
      this.dateError = 'Check-out date must be after check-in date.';
      return;
    }

    // If all validations pass of the date input by the user
    this.searchTerm = this.searchTerm.trim();
    this.searchTriggered = true;
  }
 
  toggleGuestSelector() {
    this.showGuestSelector = !this.showGuestSelector;
  }
 
  onGuestSelectionChange(selection: any) {
    this.guestSelectionText = `${selection.adults} adults · ${selection.children} children · ${selection.rooms} room`;
    // Keep the selector open while making changes
    this.showGuestSelector = true;
  }
 
  closeGuestSelector() {
    this.showGuestSelector = false;
  }
 
  // Handle clicks outside the selector
  // onDocumentClick(event: any) {
  //   if (!event.target.closest('.guest-selector-wrapper')) {
  //     this.closeGuestSelector();
  //   }
  // }
updateSearchLabel() {
  this.searchButtonLabel = this.searchTerm ? 'Search' : 'Search All';
}
 
bookHotel(hotel:HotelInterface) {
  this.selectedHotel = hotel;
  const bookingData = {
    hotel: hotel,
    checkInDate: this.checkInDate,
    checkOutDate: this.checkOutDate
  };
  
  // Store booking data before navigation
  sessionStorage.setItem('bookingData', JSON.stringify(bookingData));
  
  // Navigate to booking component
  this.router.navigate(['/booking']);
  
  this.hotelSelected.emit(bookingData);
}
}