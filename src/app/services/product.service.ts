import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = 'http://localhost:8080/api/products';

  constructor(private http: HttpClient) {}

  saveProduct(productData: any, imageFile: File): Observable<any> {
    const formData = new FormData();
    
    // Append product as JSON blob
    const productBlob = new Blob(
      [JSON.stringify(productData)],
      { type: 'application/json' }
    );
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
        return throwError(() => new Error(
          err.error?.message || 'Failed to save product'
        ));
      })
    );
  }
}