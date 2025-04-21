import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface SignupRequest {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
  
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface JwtResponse {
  token: string;
  type: string;
  id: number;
  username: string;
  email: string;
  roles: string[];
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private authUrl = 'http://localhost:8080/api/auth'; // replace with your backend URL if different

  constructor(private http: HttpClient) {}

  /**
   * Sends a signup request to the backend
   * @param data SignupRequest
   */
  register(data: SignupRequest): Observable<any> {
    return this.http.post(`${this.authUrl}/signup`, data);
  }

  /**
   * Sends a login request to the backend
   * @param data LoginRequest
   */
  login(data: LoginRequest): Observable<JwtResponse> {
    return this.http.post<JwtResponse>(`${this.authUrl}/signin`, data);
  }

  /**
   * Logs the user out by clearing the token
   */
  logout(): void {
    window.localStorage.removeItem('auth-token');
    window.localStorage.removeItem('auth-user');
  }

  /**
   * Stores token in localStorage
   * @param token string
   */
  saveToken(token: string): void {
    window.localStorage.setItem('auth-token', token);
  }

  /**
   * Gets token from localStorage
   */
  getToken(): string | null {
    return window.localStorage.getItem('auth-token');
  }

  /**
   * Stores user info in localStorage
   * @param user any
   */
  saveUser(user: any): void {
    window.localStorage.setItem('auth-user', JSON.stringify(user));
  }

  /**
   * Retrieves user info from localStorage
   */
  getUser(): any {
    const user = window.localStorage.getItem('auth-user');
    if (user) {
      return JSON.parse(user);
    }
    return null;
  }
}
