import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LocalStorageService } from './local-storage.service'; // Adjust path as needed

export interface ProductDTO {
  id: number;
  title: string;
  description: string;
  price: number;
  imageUrl: string;
  // Add other fields as needed
}

export interface CartItemDto {
  productId: number;
  quantity: number;
  // Add other fields if needed
}

const BASIC_URL = 'http://localhost:8080/'; // ✅ Defined BASIC_URL to avoid error

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private apiUrl = 'http://localhost:8080/api/customer';

  constructor(
    private http: HttpClient,
    private localStorageService: LocalStorageService // ✅ Injected the service properly
  ) {}

  private createAuthorizationHeader(): HttpHeaders {
    const token = this.localStorageService.getToken(); // ✅ Use injected service
    return new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
  }

  // 1. Get all products
  getAllProducts(): Observable<ProductDTO[]> {
    return this.http.get<ProductDTO[]>(`${this.apiUrl}/products`);
  }

  // 2. Search product by title
  searchProductByTitle(title: string): Observable<any> {
    return this.http.get<[]>(BASIC_URL + "api/customer/product/search/" + title, {
      headers: this.createAuthorizationHeader()
    });
  }

// 3. Add product to cart
addProductToCart(
  productId: number,
  productName: string,
  productDescription: string,
  quantity: number,
  image: any,
  dateAdded: string,
  orderDate: string,
  userId?: number // Add the 8th argument (userId)
): Observable<any> {
  let cartDto = {
    productId: productId,
    userId: userId,  // Use the passed userId
    productName: productName,
    productDescription: productDescription,
    quantity: quantity,
    image: {
      name: image.name,
      url: image.url,
      extension: image.extension,
      type: image.type
    },
    dateAdded: dateAdded,
    orderDate: orderDate
  };

  return this.http.post<[]>(BASIC_URL + "api/customer/cart", cartDto, {
    headers: this.createAuthorizationHeader()
  });
}


}
