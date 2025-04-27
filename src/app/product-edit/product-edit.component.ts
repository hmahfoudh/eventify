import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { CategoryService } from '../services/category.service'; // CategoryService is needed for fetching categories


@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.scss']
})
export class ProducteditComponent implements OnInit {
  product = {
    name: '',
    description: '',
    basePrice: 0,
    stockQuantity: 0,
    category: '' // Make category an empty string instead of an object
  };

  selectedImage: File | null = null;
  categories: any[] = []; // Array to store fetched categories

  constructor(
    private productService: ProductService,
    private categoryService: CategoryService // Inject CategoryService
  ) {}

  ngOnInit(): void {
    // Fetch categories on component initialization
    this.categoryService.getCategories().subscribe({
      next: (data) => {
        this.categories = data; // Populate the categories array with the response from the API
      },
      error: (err) => {
        console.error('Error loading categories:', err);
      }
    });
  }

  onImageSelected(event: Event) {
    const fileInput = event.target as HTMLInputElement;
    this.selectedImage = fileInput.files?.[0] || null;
  }

  saveProduct() {
    if (!this.selectedImage) {
      console.error('No image selected!');
      return;
    }

    // Call service with the product data and selected image
    this.productService.saveProduct(this.product, this.selectedImage).subscribe({
      next: (res) => {
        console.log('Product saved successfully!', res);
        // Handle success (e.g., navigation or message)
      },
      error: (err) => {
        console.error('Error saving product:', err);
        // Handle error (e.g., error message display)
      }
    });
  }
}
