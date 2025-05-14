import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

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
  accessToken: string;
  tokenType: string;
  id: number;
  username: string;
  email: string;
  roles: string[];
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private authUrl = 'http://localhost:8080/api/auth';
  private isLoggedInSubject = new BehaviorSubject<boolean>(this.getToken() !== null);
  isLoggedIn$ = this.isLoggedInSubject.asObservable();
  constructor(private http: HttpClient) {}

  /**
   * Sends a signup request to the backend
   */
  register(data: SignupRequest): Observable<any> {
    return this.http.post(`${this.authUrl}/signup`, data);
  }

  /**
   * Sends a login request to the backend
   */
  login(data: LoginRequest): Observable<JwtResponse> {
    return this.http.post<JwtResponse>(`${this.authUrl}/signin`, data);
    this.isLoggedInSubject.next(true);
  }

  /**
   * Logs out by clearing token and user data
   */
  
  logout(): void {
    if (typeof window !== 'undefined' && localStorage) {
      localStorage.removeItem('auth-token');
      localStorage.removeItem('auth-user');
    }
  }
  /**
   * Save JWT token to localStorage
   */
  saveToken(token: string): void {
    localStorage.setItem('auth-token', token);
  }

  /**
   * Get JWT token from localStorage
   */
  getToken(): string | null {
    // Ensure code only runs in the browser (not on the server)
    if (typeof window !== 'undefined') {
      return localStorage.getItem('auth-token');
    }
    return null;  // Return null if not in browser (e.g., SSR context)
  }

  /**
   * Save user details (including id) to localStorage
   */
  saveUser(user: JwtResponse): void {
    const userToStore = {
      token: user.accessToken,     // ✅ was user.token
      type: user.tokenType,        // ✅ was user.type
      id: user.id,
      username: user.username,
      email: user.email,
      roles: user.roles
    };
    localStorage.setItem('auth-user', JSON.stringify(userToStore));
  }
  
  

  /**
   * Get user details from localStorage
   */
  getUser(): any {
    if (typeof window !== 'undefined' && localStorage) {
      const user = localStorage.getItem('auth-user');
      return user ? JSON.parse(user) : null;
    }
    return null;
  }

  /**
   * Get user ID directly
   */
  getUserId(): number | null {
    return this.getUser()?.id ?? null;
  }
}
