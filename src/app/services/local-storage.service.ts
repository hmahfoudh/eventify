import { Injectable } from '@angular/core';

const TOKEN = 'l_token';
const USER = 'l_user';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() {}

  public saveToken(token: string): void {
    window.localStorage.removeItem(TOKEN);
    window.localStorage.setItem(TOKEN, token);
  }

  public hasToken(): boolean {
    return this.getToken() !== null;
  }

  getToken(): string | null {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('auth-token');
    }
    return null;
  }
  

  public saveUser(user: any): void {
    window.localStorage.removeItem(USER);
    window.localStorage.setItem(USER, JSON.stringify(user));
  }

  public getUser(): any {
    const rawUser = localStorage.getItem(USER);
    return rawUser ? JSON.parse(rawUser) : null;
  }

  /**
   * Get user ID from localStorage
   * Returns null if ID is not found or invalid
   */
  public getUserId(): number | null {
    const user = this.getUser();
    // Ensure the user has a valid 'id' and it's a number
    return user && typeof user.id === 'number' ? user.id : null;
  }

  public getUserRole(): string {
    const user = this.getUser();
    return user?.role ?? '';
  }
}
