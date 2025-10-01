import { Injectable, inject } from "@angular/core";
import { RoomInterface } from "../interfaces/roomInterface";
import { LocationInterface } from "../interfaces/locationInterface";
import { HotelDataService } from "./hotel-data.service";
import { HotelInterface } from "../interfaces/hotelInterface";
@Injectable({
  providedIn: 'root'
})
export class RoomService{
  private hotelDataService = inject(HotelDataService);
  
  private locations:LocationInterface[] = [
    { name: 'Goa', emoji: '🏖️' },
    { name: 'Hyderabad', emoji: '🏰' },
    { name: 'Mumbai', emoji: '🌆' },
    { name: 'Chennai', emoji: '🌊' },
    { name: 'Kolkata', emoji: '🌉' },
    { name: 'Delhi', emoji: '🏛️' },
    { name: 'Bangalore', emoji: '🌳' },
    { name: 'Pune', emoji: '🎓' },
    { name: 'Jaipur', emoji: '🕌' },
    { name: 'Kochi', emoji: '🌴' },
    { name: 'Manali', emoji: '⛰️' }
  ];
  private roomTypes = ['Single', 'Double', 'Suite', 'Deluxe', 'Standard Single', 'Standard Double', 'Deluxe Single', 'Deluxe Double', 'Presidential Suite', 'Family Room', 'Business Room'];
  private hotelChains = ['Marriott', 'Park Hyatt', 'Taj', 'ITC', 'Oberoi', 'Hilton', 'Radisson', 'Leela', 'JW Marriott', 'Four Seasons'];
  
  getLocations():LocationInterface[]{
    return this.locations
  }
  getRoomTypes():string[]{
    return this.roomTypes
  }
  gethotelChains():string[]{
    return this.hotelChains
  }
  getLocationEmoji(locationName: string): string {
    const location = this.locations.find(loc => loc.name === locationName);
    return location ? location.emoji : '';
  }
  addRoom(room:RoomInterface):void{
    console.log("Room Added",room);
    alert("Room added successfully")
  }

  
  addHotel(hotelData: Omit<HotelInterface, 'id'>): HotelInterface {
    return this.hotelDataService.addHotel(hotelData);
  }

  getAllHotels(): HotelInterface[] {
    return this.hotelDataService.getHotels();
  }

  getTotalHotels(): number {
    return this.hotelDataService.getHotelsCount();
  }
}

