import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Product } from '../models/product';
import { Services } from '../models/services';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = 'http://localhost:8080/api/products'; 
  private baseUrl = 'http://localhost:8080/api/services';

  constructor(private http: HttpClient) {}

  // Method to save a product
  saveProduct(productData: Product, imageFile: File[]): Observable<any> {
    const formData = new FormData();
    formData.append('product', JSON.stringify(productData));

    // Append image file
    imageFile.forEach((file) => {
      formData.append('images', file);
    });

    // Debug: Log FormData contents
    formData.forEach((value, key) => {
      console.log(`${key}:`, value);
    });

    return this.http.post(this.apiUrl, formData).pipe(
      catchError((err) => {
        console.error('Error:', err);
        return throwError(() => new Error(err.error?.message || 'Failed to save product'));
      })
    );
  }

  // Get all products from the backend
  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl);
  }
  getServices(): Observable<Services[]> {
    return this.http.get<Services[]>(this.baseUrl);
  }
  // Method to fetch product by name
  getProductByName(productName: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${productName}`); // Corrected URL
  }
   // Get product image data by product name
    getProductImage(productName: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${productName}/image`);
  }


  getProductById(productId: string | number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${productId}`);
  }

  getServiceById(productId: string | number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/${productId}`);
  }
 
}
