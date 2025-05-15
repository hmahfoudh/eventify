import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BookingService  {
  private apiUrl = 'http://localhost:8080/api/bookings'; // ton endpoint réel

  constructor(private http: HttpClient) {}

  createBooking(booking: any) {
    return this.http.post(this.apiUrl, booking);
  }
}