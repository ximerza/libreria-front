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
    localStorage.removeItem('token');
  },

  setToken(token: string) {
    localStorage.setItem('token', token);
  },

  getToken() {
    return localStorage.getItem('token');
  },

  isAuthenticated() {
    return !!this.getToken();
  },
};
