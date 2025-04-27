import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = 'http://localhost:8080/api/products'; 

  constructor(private http: HttpClient) {}

  // Method to save a product
  saveProduct(productData: any, imageFile: File): Observable<any> {
    const formData = new FormData();

    // Append product as JSON blob
    const productBlob = new Blob([JSON.stringify(productData)], { type: 'application/json' });
    formData.append('product', productBlob);

    // Append image file
    formData.append('imageFile', imageFile, imageFile.name);

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
  getProducts(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl).pipe(
      catchError((err) => {
        console.error('Error fetching products:', err);
        return throwError(() => new Error('Failed to fetch products'));
      })
    );
  }

  // Method to fetch product by name
  getProductByName(productName: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${productName}`); // Corrected URL
  }
   // Get product image data by product name
    getProductImage(productName: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${productName}/image`);
  }
}
