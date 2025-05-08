import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { CustomerService } from '../services/customer.service';
import { FormBuilder } from '@angular/forms';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public products: any[] = [];
  public imageUrl: string = 'http://localhost:8080'; // Base URL for product images

  constructor(
    private productService: ProductService,
    private service: CustomerService,
    private fb: FormBuilder,
    private notification: NzNotificationService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.productService.getProducts().subscribe({
      next: (data) => {
        this.products = data;
      },
      error: (err) => {
        console.error('Error fetching products:', err);
      }
    }); 
  }

  addProductToCart(productId: number): void {
    console.log(productId);
    const userId = this.authService.getUserId();

    // Send only productId and userId
    this.service.addProductToCart(productId).subscribe({
      next: (res) => {
        console.log(res);
        this.notification.success("SUCCESS", "Product added to Cart Successfully", { nzDuration: 5000 });
      },
      error: (error) => {
        console.error("Add to cart error:", error);
        this.notification.error("ERROR", "Product already exists in cart", { nzDuration: 5000 });
      }
    });
  }
}
