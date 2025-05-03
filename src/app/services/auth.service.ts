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
  private authUrl = 'http://localhost:8080/api/auth';

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
  }

  /**
   * Logs out by clearing token and user data
   */
  logout(): void {
    localStorage.removeItem('auth-token');
    localStorage.removeItem('auth-user');
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
    return localStorage.getItem('auth-token');
  }

  /**
   * Save user details (including id) to localStorage
   */
  saveUser(user: JwtResponse): void {
    const userToStore = {
      token: user.token,     // Save token
      type: user.type,       // Save token type
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
    const user = localStorage.getItem('auth-user');
    return user ? JSON.parse(user) : null;
  }

  /**
   * Get user ID directly
   */
  getUserId(): number | null {
    return this.getUser()?.id ?? null;
  }
}
