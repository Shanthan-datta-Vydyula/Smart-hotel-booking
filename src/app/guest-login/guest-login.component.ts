import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { ValidationService } from '../services/validation.service';

@Component({
  selector: 'app-guest-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './guest-login.component.html',
  styleUrls: ['./guest-login.component.css']
})
export class GuestLoginComponent {
  private authService = inject(AuthService);
  private validationService = inject(ValidationService);
  private router = inject(Router);
  
  user = {
    email: '',
    password: ''
  };
  
  errorMessage: string = '';
  emailError: string = '';
  passwordError: string = '';

  validateEmail(): void {
    const validation = this.validationService.validateEmail(this.user.email);
    this.emailError = validation.valid ? '' : validation.error || '';
  }
  
  validatePassword(): void {
    const validation = this.validationService.validatePassword(this.user.password);
    this.passwordError = validation.valid ? '' : validation.error || '';
  }
  
  onSubmit(): void {
    this.errorMessage = '';
    this.emailError = '';
    this.passwordError = '';

    const loginResult = this.authService.processGuestLogin(this.user.email, this.user.password);
    
    if (loginResult.success) {
      this.router.navigate(['/user-dashboard']);
      
      this.user = {
        email: '',
        password: ''
      };
    } else {
      this.errorMessage = loginResult.message || 'Login failed';
      
      const validation = this.validationService.validateLoginForm(this.user.email, this.user.password);
      if (!validation.valid) {
        this.emailError = validation.errors.email || '';
        this.passwordError = validation.errors.password || '';
      }
    }
  }

  goHome(): void {
    this.router.navigate(['/home']);
  }

  onShowRegister(): void {
    this.router.navigate(['/register']);
  }

  switchToManagerLogin(): void {
    this.router.navigate(['/manager-login']);
  }
}
