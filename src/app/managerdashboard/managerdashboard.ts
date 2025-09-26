import { Component, Output, EventEmitter, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ManagerAddHotelComponent } from '../manager-add-hotel/manager-add-hotel';
import { ManagerAddUserComponent } from '../manager-add-user/manager-add-user';
import { UserBookingData } from '../services/manager-add-user.service';
import { RoomService } from '../services/managerServices.service';

@Component({
  selector: 'app-managerdashboard',
  templateUrl: './managerdashboard.html',
  styleUrls: ['./managerdashboard.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, ManagerAddHotelComponent, ManagerAddUserComponent]
})
export class ManagerDashboardComponent implements OnInit {
  
  private managerService = inject(RoomService);
  private router = inject(Router);
  
 
  currentView: 'hub' | 'add-hotel' | 'add-user' = 'hub';
  
 
  totalBookingsCreated: number = 0;
  totalHotelsManaged: number = 0;
  
 
  availableHotels: string[] = [];
  availableLocations: string[] = [];

  constructor() {}

  ngOnInit(): void {
    console.log('ManagerDashboardComponent (Parent) initialized');
    this.loadDashboardStats();
    this.loadServiceData();
  }

  private loadServiceData(): void {
    this.availableHotels = this.managerService.getAvailableHotels();
    this.availableLocations = this.managerService.getAvailableMaintenanceLocations();
    console.log('Loaded hotels and locations from service');
  }

  showAddHotel() {
    console.log('Navigating to Add Hotel child component');
    this.currentView = 'add-hotel';
  }

  showAddUser() {
    console.log('Navigating to Add User child component');
    this.currentView = 'add-user';
  }

  backToHub() {
    console.log('Returning to Dashboard hub from child component');
    this.currentView = 'hub';
  }

  goHome() {
    console.log('Manager Dashboard navigating to home');
    this.router.navigate(['/home']);
  }

  onUserAdded(bookingData: UserBookingData) {
    console.log('Parent received new user booking:', bookingData);
    this.totalBookingsCreated++;
    this.backToHub();
  }

  onHotelManaged() {
    console.log('Parent received hotel management update');
    this.totalHotelsManaged++;
    this.backToHub();
  }

  private loadDashboardStats() {
    console.log('Loading dashboard statistics...');
  }

}
