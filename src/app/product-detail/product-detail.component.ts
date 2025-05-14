import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { ActivatedRoute } from '@angular/router';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.scss'
})
export class ProductDetailComponent implements OnInit {
  product: any;
  public imageUrl: string = 'http://localhost:8080'; 
  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,private cartService: CartService
  ) {}
  quantity = 1;

  // Simulated cart array
  cart: any[] = [];

  increment() {
    this.quantity++;
  }

  decrement() {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }

 
  ngOnInit(): void {
    const productId = this.route.snapshot.paramMap.get('id');
    if (productId) {
      this.productService.getProductById(productId).subscribe((res) => {
        this.product = res;
      });
    } else {
      // Handle the error case when no ID is present in the route
      console.error('Product ID not found in route.');
    }
  }
 
  addToCart(productId: number) {
    this.cartService.addToCart(productId, this.quantity);
    this.quantity = 1;
  }
 
}
