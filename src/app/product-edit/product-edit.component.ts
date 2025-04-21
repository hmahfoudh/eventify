import { Component } from '@angular/core';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProducteditComponent {
  product = {
    name: '',
    description: '',
    basePrice: 0,
    stockQuantity: 0,
    createdAt: '',
    updatedAt: '',
    imageUrl: ''
  };

  constructor(private productService: ProductService) {}

  saveProduct() {
    this.productService.saveProduct(this.product).subscribe({
      next: (res) => console.log('Product saved:', res),
      error: (err) => console.error('Error saving product:', err)
    });
  }
}
