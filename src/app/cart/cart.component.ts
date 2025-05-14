import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service';
import { ProductService } from '../services/product.service';
import { forkJoin } from 'rxjs/internal/observable/forkJoin';
import { map } from 'rxjs/internal/operators/map';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit {
  cartItems: any[] = [];
  public imageUrl: string = 'http://localhost:8080'; 
  constructor(private cartService: CartService , private productService: ProductService) {}

  ngOnInit(): void {
    const rawItems = this.cartService.getCartItems(); // [{ id, quantity }]
    
    const itemObservables = rawItems.map(item =>
      this.productService.getProductById(item.id).pipe(
        map((product: any) => ({
          ...product,              // name, image, price, etc.
          quantity: item.quantity  // from cart
        }))
      )
    );
  
    forkJoin(itemObservables).subscribe(itemsWithDetails => {
      this.cartItems = itemsWithDetails;
    });
  }
  incrementQuantity(item: any) {
    item.quantity++;
    this.cartService.addToCart(item, 0); // met à jour sans ajouter un nouveau
  }

  decrementQuantity(item: any) {
    if (item.quantity > 1) {
      item.quantity--;
      this.cartService.addToCart(item, 0); // met à jour
    }
  }

  removeItem(item: any) {
    this.cartItems = this.cartItems.filter(i => i.id !== item.id);
    this.cartService.removeItem(item.id);
  }

  get subtotal(): number {
    return this.cartItems.reduce((total, item) => total + item.basePrice * item.quantity, 0);
  }
}