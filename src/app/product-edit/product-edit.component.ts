import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { CategoryService } from '../services/category.service'; // CategoryService is needed for fetching categories
import { Product } from '../models/product';
import { Category } from '../models/category';
import { FormBuilder, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.scss']
})
export class ProducteditComponent implements OnInit {


  selectedImages: File [] = [];
  categories: Category[] = []; 

  public productForm: FormGroup

  public product: Product;

  constructor(
    private productService: ProductService,
    private categoryService: CategoryService,
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.categoryService.getCategories().subscribe({
      next: (data) => {
        this.categories = data; // Populate the categories array with the response from the API
      },
      error: (err) => {
        console.error('Error loading categories:', err);
      }
    });

    this.initForm();
  }

  onImageSelected(event: Event) {
    this.selectedImages = [];
    const fileInput = event.target as HTMLInputElement;
    console.log(fileInput.files)
    if (!fileInput.files || fileInput.files.length === 0) {
      console.error('No file selected!');
      return;
    }
    for(let i=0; i<=fileInput.files.length; i++){
      this.selectedImages.push(fileInput.files?.[i]);
    }
    
  }

  saveProduct() {
    console.log('product form:', this.productForm);
    if(!this.productForm.valid){
      return ;
    }
    if (!this.selectedImages) {
      console.error('No image selected!');
      return;
    }

    this.product = this.productForm.value;
    this.product.productImages = [];

    // Call service with the product data and selected image
    this.productService.saveProduct(this.product, this.selectedImages).subscribe({
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

  private initForm() {
    this.productForm = this.fb.group({
      name: [''],
      description: [''],
      stockQuantity: [0],
      basePrice: [0],
      category: [null],
      productImages: [[]]
    });
  }

}
