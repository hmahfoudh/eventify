import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = 'http://localhost:8080/api/products'; 

  constructor(private http: HttpClient) {}

  saveProduct(product: any): Observable<any> {
    return this.http.post(this.apiUrl, product);
  }
}
