import { Component, EventEmitter, Input, Output } from '@angular/core';
 
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
// import { PaymentComponent } from "../payment-component/payment-component";  
import { BookingData } from '../interfaces/bookingInterface';
import { HotelInterface } from '../interfaces/hotelInterface';
import { PaymentComponent } from '../payment-component/payment-component';
@Component({
  selector: 'app-booking-details',
  imports: [FormsModule, CommonModule, PaymentComponent],
  templateUrl: './booking-details.html',
  styleUrls: ['./booking-details.css'],
  
})
export class BookingDetails {
 
 
  @Output() close = new EventEmitter<void>();
  @Input() selectedHotel:HotelInterface|null=null;
  bookingDeatails: BookingData[]=[];
  showPaymentPortal: boolean = false;
 
 
bookingData: BookingData = {
  firstName: '',
  lastName: '',
  email: '',
  country: 'India',
  phone: '',
  isMainGuest: true,
  isWorkTravel: false
};
 
submitForm(form: any) {
    if (form.valid) {
      console.log(form)
      console.log('Booking submitted:', this.bookingData);
      this.bookingDeatails?.push(this.bookingData);
      console.log('Booking details:', this.bookingDeatails);
     
      // this.close.emit();
    }
  }
  closeBooking() {
    this.close.emit();
  }
  confirmPayment() {
   
    this.showPaymentPortal = true;
  }
}