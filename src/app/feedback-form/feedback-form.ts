import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FeedbackService } from '../services/feedback.service';
import { Display } from '../interfaces/display.model';
 
@Component({
  selector: 'app-feedback-form',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './feedback-form.html',
  styleUrls: ['./feedback-form.css']
})
export class FeedbackForm implements OnInit {
  name: string = '';
  comment: string = '';
  rating: number = 5;
  hoveredRating: number = 0;
  stars: number[] = [1, 2, 3, 4, 5];
  selectedLocation: string = '';
  selectedHotel: string = '';

  submittedReviews: Display[] = [];
  showFormErrors: boolean = false;

  // Dropdown options (same as manager add user component)
  locations: string[] = [
    'Goa',
    'Hyderabad',
    'Mumbai', 
    'Delhi',
    'Bangalore',
    'Chennai',
    'Kolkata',
    'Pune',
    'Jaipur',
    'Kochi'
  ];

  hotels: string[] = [
    'Marriot',
    'Taj', 
    'Park Hyatt',
    'ITC',
    'Oberoi',
    'Hilton',
    'Radisson',
    'Leela',
    'JW Marriott',
    'Four Seasons'
  ];

  constructor(private feedbackService: FeedbackService) {}

  ngOnInit(): void {
    // Initialize submitted reviews from service
    this.submittedReviews = this.feedbackService.getReviews();
    console.log('FeedbackForm component initialized');
  }

  setRating(value: number) {
    this.rating = value;
  }
 
  hoverRating(value: number) {
    this.hoveredRating = value;
  }
 
  submitFeedback(form?: any) {
    if (form && form.invalid) {
      this.showFormErrors = true;
      return;
    }

    if (this.isFormValid()) {
      const feedback: Display = {
        name: this.name,
        comment: this.comment,
        rating: this.rating,
        location: this.selectedLocation,
        hotelName: this.selectedHotel
      };

      this.feedbackService.addReview(feedback);
      this.submittedReviews = this.feedbackService.getReviews();

      // Reset form
      this.resetForm();
      if (form) form.resetForm();
      this.showFormErrors = false;
      alert('Feedback submitted successfully!');
    } else {
      this.showFormErrors = true;
      console.log('Form validation failed. Please fill in all required fields.');
    }
  }

  private isFormValid(): boolean {
    return this.name.trim() !== '' &&
           this.comment.trim() !== '' &&
           this.selectedLocation !== '' &&
           this.selectedHotel !== '' &&
           this.rating > 0;
  }

  private resetForm() {
    this.name = '';
    this.comment = '';
    this.rating = 5;
    this.hoveredRating = 0;
    this.selectedLocation = '';
    this.selectedHotel = '';
  }

  // Review Card functionality merged here
  getStars(review: Display): number[] {
    return Array(review.rating).fill(0);
  }

  getCurrentDate(): string {
    return new Date().toLocaleDateString();
  }
}