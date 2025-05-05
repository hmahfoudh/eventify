import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service'; // Adjust the path if needed
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

  addProductToCart(product: any): void {
    const productId = product.id;
    const productName = product.name || 'chaise';
    const productDescription = product.description || 'meuble';
    const quantity = product.quantity || 30;
    const image = {
      name: product.imageName || 'moteur.jpg',
      url: 'binary data', // replace this with actual image binary string if available
      extension: 'jpg',
      type: 'image/jpeg'
    };
    const dateAdded = product.dateAdded || '2025-04-25 15:47:28.396712';
    const orderDate = product.orderDate || '2025-04-25 15:47:28.396712';
    const userId = this.authService.getUserId();
  
    // If userId is null, replace it with undefined or fallback value
    this.service.addProductToCart(
      productId,
      productName,
      productDescription,
      quantity,
      image,
      dateAdded,
      orderDate,
      userId ?? undefined  // Fallback to undefined if userId is null
    ).subscribe(
      (res) => {
        console.log(res);
        this.notification.success("SUCCESS", "Product added to Cart Successfully", { nzDuration: 5000 });
      },
      (error) => {
        this.notification.error("ERROR", "Product already exists in cart", { nzDuration: 5000 });
      }
    );
  }
}  
