import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service'; // Adjust the path if needed
import { CustomerService } from '../services/customer.service';
import { FormBuilder } from '@angular/forms';
import { error } from 'console';
import { NzNotificationService } from 'ng-zorro-antd/notification';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public products: any[] = [];
  public imageUrl: string = 'http://localhost:8080'; // Base URL for product images


  constructor(private productService: ProductService,
    private service:CustomerService,
    private fb :FormBuilder,
    private notification:NzNotificationService
  ) {}

  ngOnInit(): void {
    this.productService.getProducts().subscribe({
      next: (data) => {
        this.products = data; // Store the product list
      },
      error: (err) => {
        console.error('Error fetching products:', err);
      }
    });
    console.log('Products received:', this.products);

  }

  addProductToCart(productId:number){
    console.log(productId);
    this.service.addProductToCart(productId).subscribe((res)=>{
      console.log(res);
      this.notification.success("SUCCESS","Product added to Cart Successfully ",{nzDuration:5000});
    },error=>{
      this.notification.error("ERROR","Product already exists in cart",{nzDuration:5000});
    }
    )


  }
}
