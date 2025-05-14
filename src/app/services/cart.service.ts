import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { ProductService } from './product.service';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/internal/operators/map';
import { forkJoin } from 'rxjs/internal/observable/forkJoin';


export interface CartItem {
 
  
  id: number;
  quantity: number;
}
@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems: CartItem[] = [];
  private cartCount = new BehaviorSubject<number>(0);
  private cartItemsSubject = new BehaviorSubject<any[]>([]);
  cartItems$ = this.cartItemsSubject.asObservable();
  cartCount$ = this.cartCount.asObservable();

  constructor(private productService: ProductService) {
    this.loadCartFromStorage();
  }

  private isBrowser(): boolean {
    return typeof window !== 'undefined' && typeof localStorage !== 'undefined';
  }
  private updateCartItems() {
    this.cartItemsSubject.next(this.cartItems);
  }
  addToCart(productId: number, quantity: number) {
    const existing = this.cartItems.find(item => item.id === productId);
    if (existing) {
      existing.quantity += quantity;
      this.saveCartToStorage();
      this.updateCartCount();
      this.updateCartItems();
    } else {
      this.productService.getProductById(productId).subscribe(product => {
        const newItem = {
          id: product.id,
          quantity,
          name: product.name,
          image: product.image,
          price: product.price
        };
        this.cartItems.push(newItem);
        this.saveCartToStorage();
        this.updateCartCount();
        this.updateCartItems(); // Important
      });
    }
  }
  
  getCartItems(): CartItem[] {
    return this.cartItems;
  }

  removeItem(productId: number) {
    this.cartItems = this.cartItems.filter(item => item.id !== productId);
    this.saveCartToStorage();
    this.updateCartCount();
    this.updateCartItems()
  }

  private updateCartCount() {
    const total = this.cartItems.reduce((sum, item) => sum + item.quantity, 0);
    this.cartCount.next(total);
  }
 

  private saveCartToStorage() {
    if (this.isBrowser()) {
      localStorage.setItem('cartItems', JSON.stringify(this.cartItems));
    }
  }

  private loadCartFromStorage() {
    if (this.isBrowser()) {
      const savedCart = localStorage.getItem('cartItems');
      if (savedCart) {
        this.cartItems = JSON.parse(savedCart);
      } else {
        this.cartItems = [];
      }
    
      this.updateCartItems()
      this.updateCartCount(); 
    }
  }
 
  getTotalAmount(): Observable<number> {
    const rawItems = this.getCartItems(); // [{ id, quantity }]
  
    const itemObservables = rawItems.map(item =>
      this.productService.getProductById(item.id).pipe(
        map(product => product.basePrice * item.quantity)
      )
    );
  
    return forkJoin(itemObservables).pipe(
      map(prices => prices.reduce((total, price) => total + price, 0))
    );
  }

  clearCart() {
    this.cartItems = [];
    localStorage.removeItem('cartItems');
    this.cartItemsSubject.next([]);
    this.updateCartCount();
    this.updateCartItems();
  }
}
