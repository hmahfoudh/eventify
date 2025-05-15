import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../services/product.service';
import { BookingService } from '../services/booking.service';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrl: './booking.component.scss'
})
export class BookingComponent implements OnInit {
  product: any;
  public imageUrl: string = 'http://localhost:8080'; ; // adapte selon ton back

  bookingData = {
    customerName: '',
    bookingDate: '',
    userContact: '',
    status: 'Confirmed',
    service: { id: 0 },
    user:{id:1}
  };
  constructor(private route: ActivatedRoute, private productService: ProductService , private bookingService: BookingService, private toastr: ToastrService , private router: Router ,  private authService: AuthService) {}



  ngOnInit(): void {
    const productId = this.route.snapshot.paramMap.get('id');
    if (productId) {
      this.productService.getServiceById(productId).subscribe(data => {
        this.product = data;
        this.bookingData.service.id = data.id; // associer le service
      });
    }
  
    const userId = this.authService.getUserId();
    if (userId) {
      this.bookingData.user.id = userId;
    }
   
  }

  submitBooking() {
    console.log('Booking payload:', this.bookingData); // ⬅️ ajoute ceci pour débugger
  
    this.bookingService.createBooking(this.bookingData).subscribe({
      next: () => {
        this.toastr.success("👏 Booking submitted successfully!");
        setTimeout(() => {
          this.router.navigate(['/']);
        }, 1000);
      },
      error: err => {
        console.error('Booking error:', err);
        this.toastr.error('❌ An error occurred while submitting the booking.');
      }
    });
  }
}