import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../services/customer.service';
import { LocalStorageService } from '../services/local-storage.service';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  totalAmount: number = 0;
  cartProducts: any[] = [];

  constructor(private service: CustomerService) {}

  ngOnInit(): void {
    this.getCart();
  }

getCart(): void {
  const userId = LocalStorageService.getUserId();

  if (userId === null) {
    console.error('User is not logged in or ID is missing in localStorage');
    return;
  }

  this.service.getCartByUserId().subscribe({
    next: (res) => {
      console.log("📦 Cart Response:", res); 
      this.cartProducts = res.cartItemDtoList;
      this.totalAmount = res.totalAmount;
      console.log('Cart Products:', this.cartProducts);  // Check if the cart data is set correctly
      console.log('Total Amount:', this.totalAmount);
    },
    error: (err) => {
      console.error('Error fetching cart:', err);
    }
  });
}



  incrementQuantity(product: any): void {
    product.quantity++;
    this.recalculateTotal();
  }

  decrementQuantity(product: any): void {
    if (product.quantity > 1) {
      product.quantity--;
      this.recalculateTotal();
    }
  }

  removeFromCart(product: any): void {
    this.cartProducts = this.cartProducts.filter(p => p !== product);
    this.recalculateTotal();
  }

  recalculateTotal(): void {
    this.totalAmount = this.cartProducts.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }
}
