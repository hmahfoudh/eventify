import { Component, OnDestroy, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { Subscription } from 'rxjs/internal/Subscription';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit, OnDestroy {
  cartCount: number = 0;
  private cartSubscription!: Subscription;
  username: any;

  constructor(private cartService: CartService , private authService : AuthService ,  private router: Router) {}

  ngOnInit(): void {
    // ✅ Met à jour le compteur du panier en temps réel
    this.cartSubscription = this.cartService.cartCount$.subscribe(count => {
      this.cartCount = count;
    });

     
   }
   getUsername(): string {
    return this.authService.getUser()?.username ?? '';
  }
   isLoggedIn(): boolean {
    return this.authService.getUser() !== null;
  }


  ngOnDestroy(): void {
    // 🧼 Nettoyage (utile si le header est rechargé ou réutilisé dynamiquement)
    if (this.cartSubscription) {
      this.cartSubscription.unsubscribe();
    }
  }


  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']); // ou '/home' si tu veux rediriger ailleurs
  }
}