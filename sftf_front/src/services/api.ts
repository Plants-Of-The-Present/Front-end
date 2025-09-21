interface LoginRequest {
  username: string;
  password: string;
}

interface RegisterRequest {
  username: string;
  password: string;
  userType: 'BUYER' | 'SUPPLIER';
  companyName: string;
  companyCnpj: string;
}

interface ApiResponse<T> {
  success: boolean;
  message?: string;
  error?: string;
  data?: T;
}

interface UserData {
  id: string;
  username: string;
  userType: 'BUYER' | 'SUPPLIER';
  companyName: string;
  companyCnpj: string;
  createdAt: string;
}

interface AuthResponse {
  user: UserData;
  token: string;
}

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000/api';

class ApiService {
  private async makeRequest<T>(
    endpoint: string,
    method: 'GET' | 'POST' | 'PUT' | 'DELETE' = 'GET',
    body?: any,
    token?: string
  ): Promise<ApiResponse<T>> {
    try {
      const headers: Record<string, string> = {
        'Content-Type': 'application/json',
      };

      if (token) {
        headers.Authorization = `Bearer ${token}`;
      }

      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        method,
        headers,
        body: body ? JSON.stringify(body) : undefined,
      });

      const data = await response.json();

      if (!response.ok) {
        return {
          success: false,
          error: data.error || `HTTP error! status: ${response.status}`,
        };
      }

      return data;
    } catch (error) {
      console.error('API Error:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Erro de conexão com o servidor',
      };
    }
  }

  async login(credentials: LoginRequest): Promise<ApiResponse<AuthResponse>> {
    return this.makeRequest<AuthResponse>('/auth/login', 'POST', credentials);
  }

  async register(userData: RegisterRequest): Promise<ApiResponse<AuthResponse>> {
    return this.makeRequest<AuthResponse>('/auth/register', 'POST', userData);
  }

  async getProfile(token: string): Promise<ApiResponse<{ user: UserData }>> {
    return this.makeRequest<{ user: UserData }>('/auth/profile', 'GET', undefined, token);
  }

  async updateProfile(
    updates: Partial<Pick<UserData, 'companyName'>>,
    token: string
  ): Promise<ApiResponse<{ user: UserData }>> {
    return this.makeRequest<{ user: UserData }>('/auth/profile', 'PUT', updates, token);
  }

  async changePassword(
    passwordData: { currentPassword: string; newPassword: string },
    token: string
  ): Promise<ApiResponse<void>> {
    return this.makeRequest<void>('/auth/change-password', 'PUT', passwordData, token);
  }
}

export const apiService = new ApiService();
export type { LoginRequest, RegisterRequest, ApiResponse, UserData, AuthResponse };