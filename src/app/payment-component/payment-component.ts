
 
import { Component, EventEmitter, Input, Output, OnInit, inject } from '@angular/core';
import { PaymentService } from '../services/payment.service';
import { HotelService } from '../services/hotel.service';
import { Payment } from '../interfaces/paymentInterface';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HotelInterface } from '../interfaces/hotelInterface';
@Component({
  selector: 'app-payment',
  templateUrl: './payment-component.html',
   imports: [CommonModule, FormsModule],
  styleUrls: ['./payment-component.css'],
  standalone: true
})
export class PaymentComponent implements OnInit {
  private hotelService = inject(HotelService);
 
  hotel: HotelInterface[] = [];
  @Input() selectedHotel: HotelInterface | null = null;
  @Output() close = new EventEmitter<void>();
  
  paymentMethod = 'Card';
  agreeToTerms = false;
 
  constructor(private paymentService: PaymentService) {}

  ngOnInit() {
    // Load hotels from service
    this.hotel = this.hotelService.getHotels();
    console.log('Selected hotel:', this.selectedHotel);
    console.log('Available hotels:', this.hotel.length);
  }
 
   closeBooking() {
    this.close.emit();
  }
  submitPayment(form?: any) {
    if (form && form.invalid) {
      alert('Please fill all required fields correctly.');
      return;
    }

    if (!this.agreeToTerms) {
      alert('Please agree to the terms before proceeding.');
      return;
    }

    alert('Payment processed successfully!');
    this.closeBooking();




  }
}
 
 
 