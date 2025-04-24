import { Component } from '@angular/core';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.scss']
})
export class ProducteditComponent {
  product = {
    name: '',
    description: '',
    basePrice: 0,
    stockQuantity: 0,
    category: {
      id: 1 // Hardcoded for now
    }
  };

  selectedImage: File | null = null;

  constructor(private productService: ProductService) {}

  onImageSelected(event: Event) {
    const fileInput = event.target as HTMLInputElement;
    this.selectedImage = fileInput.files?.[0] || null;
  }

  saveProduct() {
    if (!this.selectedImage) {
      console.error('No image selected!');
      return;
    }

    // Call service with separate parameters
    this.productService.saveProduct(this.product, this.selectedImage).subscribe({
      next: (res) => {
        console.log('Product saved successfully!', res);
        // Handle success (e.g., navigation)
      },
      error: (err) => {
        console.error('Error saving product:', err);
        // Handle error
      }
    });
  }
}