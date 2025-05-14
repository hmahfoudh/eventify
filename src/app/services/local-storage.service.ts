import { Injectable } from '@angular/core';

const TOKEN = 'l_token';
const USER = 'l_user';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() {}

  private static isBrowser(): boolean {
    return typeof window !== 'undefined' && typeof localStorage !== 'undefined';
  }

  // ========== INSTANCE METHODS ==========

  public saveToken(token: string): void {
    if (LocalStorageService.isBrowser()) {
      localStorage.removeItem(TOKEN);
      localStorage.setItem(TOKEN, token);
    }
  }

  public hasToken(): boolean {
    return this.getToken() !== null;
  }

  public getToken(): string | null {
    if (LocalStorageService.isBrowser()) {
      return localStorage.getItem(TOKEN);
    }
    return null;
  }

  public saveUser(user: any): void {
    if (LocalStorageService.isBrowser()) {
      localStorage.removeItem(USER);
      localStorage.setItem(USER, JSON.stringify(user));
    }
  }

  // ========== STATIC METHODS ==========

static getUser(): any {
  if (typeof window === 'undefined') return null;
  const rawUser = localStorage.getItem(USER);
  return rawUser ? JSON.parse(rawUser) : null;
}

static getUserId(): number | null {
  const user = this.getUser();
  return user && typeof user.id === 'number' ? user.id : null;
}

static getUserRole(): string {
  const user = this.getUser();
  return Array.isArray(user?.roles) && user.roles.length > 0 ? user.roles[0] : '';
}

}
