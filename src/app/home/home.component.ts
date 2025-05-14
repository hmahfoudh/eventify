import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service'; // Adjust the path if needed
import { CustomerService } from '../services/customer.service';
import { FormBuilder } from '@angular/forms';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { AuthService } from '../services/auth.service'; 
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public products: any[] = [];
  public services: any[] = [];
  public imageUrl: string = 'http://localhost:8080'; // Base URL for product images
  quantity = 1;

  // Simulated cart array
  cart: any[] = [];
  constructor(
    private productService: ProductService,
    private service: CustomerService,
    private fb: FormBuilder,
    private notification: NzNotificationService,
    private authService: AuthService ,
    private cartService: CartService
  ) {}

  public selectedCategory: string = '';
  public filteredProducts: any[] = [];
  filterProductsByCategory(category: string) {
    this.selectedCategory = category;
    this.filteredProducts = this.products.filter(
      p => p.category?.name === category
    );
  }
  ngOnInit(): void {
    this.productService.getProducts().subscribe({
      next: (data) => {
        this.products = data;
        this.filterProductsByCategory('bridal flower'); // default category
      },
      error: (err) => {
        console.error('Error fetching products:', err);
      }
    });
  
    this.productService.getServices().subscribe({
      next: (data) => {
        this.services = data;
      },
      error: (err) => {
        console.error('Error fetching services:', err);
      }
    });
  }

  addToCart(productId: number) {
    this.cartService.addToCart(productId, this.quantity);
    this.quantity = 1;
  }


  
}  
