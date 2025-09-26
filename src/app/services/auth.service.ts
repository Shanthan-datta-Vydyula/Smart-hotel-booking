import { Injectable, inject } from '@angular/core';
import { ValidationService, ValidationResult } from './validation.service';

export interface LoginResult {
  success: boolean;
  message?: string;
  showRoleSelection?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isLoggedIn = false;
  private currentUser: any = null;
  private validationService = inject(ValidationService);

  constructor() {
     
  }

  processLogin(email: string, password: string): LoginResult {
    console.log('AuthService: processLogin() called with email:', email);
    
     
    const validation: ValidationResult = this.validationService.validateLoginForm(email, password);
    
    if (!validation.valid) {
      console.log('AuthService: Login validation failed:', validation.errors);
      return {
        success: false,
        message: validation.errors.general || 'Validation failed'
      };
    }

    
    const loginSuccess = this.login(email, password);
    
    if (loginSuccess) {
      return {
        success: true,
        showRoleSelection: true,
        message: 'Login successful'
      };
    } else {
      return {
        success: false,
        message: 'Login failed. Please try again.'
      };
    }
  }

  processGuestLogin(email: string, password: string): LoginResult {
    console.log('AuthService: processGuestLogin() called with email:', email);
    
    const validation: ValidationResult = this.validationService.validateLoginForm(email, password);
    
    if (!validation.valid) {
      console.log('AuthService: Guest login validation failed:', validation.errors);
      return {
        success: false,
        message: validation.errors.general || 'Validation failed'
      };
    }

    const loginSuccess = this.login(email, password);
    
    if (loginSuccess) {
      this.currentUser = { email, role: 'guest' };
      return {
        success: true,
        message: 'Guest login successful'
      };
    } else {
      return {
        success: false,
        message: 'Guest login failed. Please try again.'
      };
    }
  }

  processManagerLogin(email: string, password: string): LoginResult {
    console.log('AuthService: processManagerLogin() called with email:', email);
    
    const validation: ValidationResult = this.validationService.validateLoginForm(email, password);
    
    if (!validation.valid) {
      console.log('AuthService: Manager login validation failed:', validation.errors);
      return {
        success: false,
        message: validation.errors.general || 'Validation failed'
      };
    }

    // For demo purposes, accept any email for manager login
    // You can implement proper logic here later
    const isManager = true; // Simplified for demo

    const loginSuccess = this.login(email, password);
    
    if (loginSuccess) {
      this.currentUser = { email, role: 'manager' };
      return {
        success: true,
        message: 'Manager login successful'
      };
    } else {
      return {
        success: false,
        message: 'Manager login failed. Please try again.'
      };
    }
  }

  login(email: string, password: string): boolean {
    if (email && password) {
      this.isLoggedIn = true;
      this.currentUser = { email };
      return true;
    }
    console.log('AuthService: Login failed - missing email or password');
    return false;
  }
 

  isAuthenticated(): boolean {
    console.log('AuthService: isAuthenticated() called, result:', this.isLoggedIn);
    return this.isLoggedIn;
  }

  getCurrentUser(): any {
    console.log('AuthService: getCurrentUser() called, current user:', this.currentUser);
    return this.currentUser;
  }
}
