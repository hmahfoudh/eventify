import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss'
})
export class CheckoutComponent implements OnInit {
  checkoutForm!: FormGroup;
  totalAmount: number = 0;
  
   
   bootstrap: any; 

  constructor(private fb: FormBuilder, private cartService: CartService , private toastr: ToastrService,
    private router: Router) {}

  ngOnInit(): void {
    this.checkoutForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      address: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      deliveryType: ['domicile', Validators.required]
    });

    this.cartService.getTotalAmount().subscribe(amount => {
      this.totalAmount = amount;
    });
  }
  
  submitOrder() {
    if (this.checkoutForm.valid) {
      const orderData = {
        ...this.checkoutForm.value,
        cart: this.cartService.getCartItems(),
        totalAmount: this.totalAmount
      };

      console.log('Order submitted:', orderData);

      // ✅ Affiche le toast
      this.toastr.success("👏 Commande envoyée avec succès !");
      this.cartService.clearCart();
      // ✅ Redirige après 2 secondes (tu peux ajuster le délai)
      setTimeout(() => {
        this.router.navigate(['/']);
      }, 2000);
    } else {
      this.toastr.error('Veuillez remplir correctement tous les champs.');
      this.checkoutForm.markAllAsTouched();
    }
  }
}