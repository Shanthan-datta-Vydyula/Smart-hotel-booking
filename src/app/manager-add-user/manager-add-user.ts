import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ManagerAddUserService, UserBookingData } from '../services/manager-add-user.service';

@Component({
  selector: 'app-manager-add-user',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './manager-add-user.html',
  styleUrl: './manager-add-user.css'
})
export class ManagerAddUserComponent implements OnInit {
  @Output() close = new EventEmitter<void>();
  @Output() userAdded = new EventEmitter<UserBookingData>();

  // Form data properties
  userName: string = '';
  userEmail: string = '';
  userPhone: string = '';
  checkInDate: string = '';
  checkOutDate: string = '';
  selectedLocation: string = '';
  selectedHotel: string = '';
  selectedRoomType: string = '';
  numberOfGuests: number = 1;
  specialRequests: string = '';

  // Dropdown options from service
  locations: string[] = [];
  hotels: string[] = [];
  roomTypes: string[] = [];

  today: string = '';

  constructor(private managerAddUserService: ManagerAddUserService) {}

  ngOnInit(): void {
    // Initialize today's date
    this.today = this.managerAddUserService.getTodayDate();
    
    // Initialize dropdown options from service
    this.locations = this.managerAddUserService.locations;
    this.hotels = this.managerAddUserService.hotels;
    this.roomTypes = this.managerAddUserService.roomTypes;
  }

  onSubmit(form: NgForm) {
    if (form.valid) {
      const bookingData: UserBookingData = {
        name: this.userName,
        email: this.userEmail,
        phone: this.userPhone,
        checkInDate: this.checkInDate,
        checkOutDate: this.checkOutDate,
        hotelLocation: this.selectedLocation,
        hotelName: this.selectedHotel,
        roomType: this.selectedRoomType,
        numberOfPeople: this.numberOfGuests,
        specialRequests: this.specialRequests
      };

      try {
        const bookingId = this.managerAddUserService.createUserBooking(bookingData);
        alert(`User booking created successfully! Booking ID: ${bookingId}`);
        this.userAdded.emit(bookingData);
        this.resetForm(form);
      } catch (error) {
        console.error('Error creating user booking:', error);
        alert('Failed to create user booking. Please try again.');
      }
    } else {
      alert('Please fill in all required fields.');
    }
  }

  resetForm(form: NgForm) {
    form.resetForm({
      numberOfGuests: 1
    });
  }

  onClose() {
    this.close.emit();
  }
}
