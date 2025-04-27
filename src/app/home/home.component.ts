import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service'; // Adjust the path if needed

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public products: any[] = [];
  public imageUrl: string = 'http://localhost:8080'; // Base URL for product images


  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.productService.getProducts().subscribe({
      next: (data) => {
        this.products = data; // Store the product list
      },
      error: (err) => {
        console.error('Error fetching products:', err);
      }
    });
    console.log('Products received:', this.products);

  }

}
