import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../services/customer.service';

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
    this.service.getCartByUserId().subscribe((res) => {
      console.log(res);
      this.cartProducts = res.cartItemDtoList;
      this.totalAmount = res.totalAmount;
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
