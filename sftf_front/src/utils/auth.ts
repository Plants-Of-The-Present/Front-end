interface User {
  id: string;
  username: string;
  userType: 'BUYER' | 'SUPPLIER';
  companyName: string;
  companyCnpj: string;
  createdAt: string;
}

class AuthManager {
  private readonly TOKEN_KEY = 'auth_token';
  private readonly USER_KEY = 'user_data';

  saveAuthData(token: string, user: User): void {
    localStorage.setItem(this.TOKEN_KEY, token);
    localStorage.setItem(this.USER_KEY, JSON.stringify(user));
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  getUser(): User | null {
    const userData = localStorage.getItem(this.USER_KEY);
    return userData ? JSON.parse(userData) : null;
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  logout(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.USER_KEY);
  }

  updateUser(user: User): void {
    localStorage.setItem(this.USER_KEY, JSON.stringify(user));
  }
}

export const authManager = new AuthManager();
export type { User };