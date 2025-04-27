import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service'; // Adjust the path if needed

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  products: any[] = [];

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.productService.getProducts().subscribe({
      next: (data) => {
        this.products = data; // Store the product list
        // After loading products, get images for each product
        this.products.forEach(product => {
          // Fetch image data by calling the backend for each product
          this.productService.getProductImage(product.name).subscribe({
            next: (response) => {
              // Assuming the response contains both image data and image name
              const imageData = response.imageData;
              // Converting byte array to base64 string
              product.imageUrl = `data:image/jpeg;base64,${imageData}`;
            },
            error: (err) => {
              console.error('Error fetching product image:', err);
            }
          });
        });
      },
      error: (err) => {
        console.error('Error fetching products:', err);
      }
    });
    console.log('Products received:', this.products);

  }

}
