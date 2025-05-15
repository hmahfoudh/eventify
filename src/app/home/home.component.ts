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
  public selectedServiceCat: string = '';
  public filteredProducts: any[] = [];
  public products: any[] = [];
  public filteredServices: any[] = [];

  filterProductsByCategory(category: string): void {
    this.selectedCategory = category;
  
    if (!category || category.trim() === '') {
      // Si "All" est sélectionné, on affiche tous les produits
      this.filteredProducts = this.products;
    } else {
      // Sinon on filtre selon la catégorie
      this.filteredProducts = this.products.filter(
        p => p.category?.name?.toLowerCase() === category.toLowerCase()
      );
    }
  }
  filterServicesByCategory(category: string): void {
    this.selectedServiceCat = category;
  
    if (!category || category.trim() === '') {
      // Si "All" est sélectionné, on affiche tous les produits
      this.filteredServices = this.services;
    } else {
      // Sinon on filtre selon la catégorie
      this.filteredServices = this.services.filter(
        p => p.category?.name?.toLowerCase() === category.toLowerCase()
      );
    }
  }
  ngOnInit(): void {
    this.productService.getProducts().subscribe({
      next: (data) => {
        this.products = data;
        this.filteredProducts = data;// default category
      },
      error: (err) => {
        console.error('Error fetching products:', err);
      }
    });
  
    this.productService.getServices().subscribe({
      next: (data) => {
        this.services = data;
        this.filteredServices=data
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
