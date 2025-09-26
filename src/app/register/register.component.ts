import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  user = {
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeTerms: false
  };
 
  errorMessage: string = '';
  termsError: string = '';

  
  validatePasswordMatch(): boolean {
    return this.user.password === this.user.confirmPassword;
  }

  onSubmit(form: NgForm) {
    this.errorMessage = '';
    this.termsError = '';
    
   
    if (form.valid && this.validatePasswordMatch()) {
      try {
        
        console.log('User registered successfully:', this.user);
        this.errorMessage = 'Registration successful! You can now log in.';
        
        
        form.resetForm();
        this.user = {
          fullName: '',
          email: '',
          password: '',
          confirmPassword: '',
          agreeTerms: false
        };
      } catch (error) {
        this.errorMessage = 'Registration failed. Please try again.';
        console.error('Registration error:', error);
      }
    } else {
       
      form.form.markAllAsTouched();
      
      this.errorMessage = 'Please fix the errors in the form';
    }
  }

  acceptTerms() {
    this.user.agreeTerms = true;
    this.termsError = '';
  }
}
