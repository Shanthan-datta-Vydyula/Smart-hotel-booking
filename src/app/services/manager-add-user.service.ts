import { Injectable } from '@angular/core';

export interface UserBookingData {
  name: string;
  email: string;
  phone: string;
  numberOfPeople: number;
  checkInDate: string;
  checkOutDate: string;
  hotelLocation: string;
  hotelName: string;
  roomType: string;
  specialRequests: string;
}

@Injectable({
  providedIn: 'root'
})
export class ManagerAddUserService {
  private bookings: UserBookingData[] = [];

  // Dropdown options
  public readonly locations = [
    'Goa', 'Mumbai', 'Delhi', 'Bangalore', 'Chennai', 
    'Hyderabad', 'Kolkata', 'Pune', 'Jaipur', 'Kochi'
  ];

  public readonly hotels = [
    'Marriott', 'Taj', 'Park Hyatt', 'ITC', 'Oberoi', 
    'Hilton', 'Radisson', 'Leela', 'JW Marriott', 'Four Seasons'
  ];

  public readonly roomTypes = [
    'Single Room', 'Double Room', 'Deluxe Room', 'Suite', 
    'Executive Suite', 'Presidential Suite'
  ];

  constructor() {
    console.log('ManagerAddUserService initialized');
  }

  // Create a new booking
  createUserBooking(userData: UserBookingData): string {
    const bookingId = 'BK' + Date.now();
    this.bookings.push(userData);
    console.log('Booking created:', bookingId);
    return bookingId;
  }

  // Get today's date
  getTodayDate(): string {
    return new Date().toISOString().split('T')[0];
  }
}
