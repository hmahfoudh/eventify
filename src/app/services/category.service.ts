import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// Define the structure of the Category object
export interface Category {
  id: number;
  name: string;
}

@Injectable({
  providedIn: 'root'
})
export class CategoryService {


  private apiUrl = 'http://localhost:8080/api/categories'; 

  constructor(private http: HttpClient) { }

  // Get all categories from the backend
  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(this.apiUrl);
  }
}
