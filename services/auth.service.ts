import api from './api';

export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}

// Check if we're in a browser environment
const isBrowser = typeof window !== 'undefined';

export const authService = {
  async register(name: string, username: string, email: string, password: string) {
    const response = await api.post<{ data: AuthResponse }>('/auth/register', {
      name,
      username,
      email,
      password,
    });
    return response.data.data;
  },

  async login(email: string, password: string) {
    const response = await api.post<{ data: AuthResponse }>('/auth/login', {
      email,
      password,
    });
    return response.data.data;
  },

  logout() {
    if (isBrowser) {
      localStorage.removeItem('token');
    }
  },

  setToken(token: string) {
    if (isBrowser) {
      localStorage.setItem('token', token);
    }
  },

  getToken() {
    if (isBrowser) {
      return localStorage.getItem('token');
    }
    return null;
  },

  isAuthenticated() {
    return !!this.getToken();
  },
};
