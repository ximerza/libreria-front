'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { authService, User, AuthResponse } from '../services/auth.service';

interface Reading {
  id: string;
  status: string;
  book: {
    id: string;
    title: string;
    author: string;
    coverUrl?: string;
  };
}

interface Club {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  members: number;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, username: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  refreshLibrary: () => void;
  refreshClubs: () => void;
  libraryTrigger: number;
  clubsTrigger: number;
  addToLibrary: (reading: Reading) => void;
  getLibrary: () => Reading[];
  updateReadingStatus: (id: string, newStatus: string) => void;
  addToClubs: (club: Club) => void;
  getClubs: () => Club[];
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [libraryTrigger, setLibraryTrigger] = useState(0);
  const [clubsTrigger, setClubsTrigger] = useState(0);

  useEffect(() => {
    const token = authService.getToken();
    if (token) {
      setIsLoading(false);
    } else {
      setIsLoading(false);
    }
  }, []);

  const login = async (email: string, password: string) => {
    const data: AuthResponse = await authService.login(email, password);
    authService.setToken(data.token);
    // Keep existing local data when logging in
    setUser(data.user);
  };

  const register = async (name: string, username: string, email: string, password: string) => {
    const data: AuthResponse = await authService.register(name, username, email, password);
    authService.setToken(data.token);
    // Clear old data only for new accounts
    localStorage.removeItem('myLibrary');
    localStorage.removeItem('myClubs');
    setUser(data.user);
  };

  const logout = () => {
    authService.logout();
    // Clear all local data
    localStorage.removeItem('myLibrary');
    localStorage.removeItem('myClubs');
    setUser(null);
  };

  const refreshLibrary = () => {
    setLibraryTrigger(prev => prev + 1);
  };

  const refreshClubs = () => {
    setClubsTrigger(prev => prev + 1);
  };

  const addToLibrary = (reading: Reading) => {
    const existing = getLibrary();
    const updated = [...existing, reading];
    localStorage.setItem('myLibrary', JSON.stringify(updated));
    refreshLibrary();
  };

  const updateReadingStatus = (id: string, newStatus: string) => {
    const library = getLibrary();
    const updated = library.map(reading => {
      if (reading.id === id) {
        return { ...reading, status: newStatus };
      }
      return reading;
    });
    localStorage.setItem('myLibrary', JSON.stringify(updated));
    refreshLibrary();
  };

  const getLibrary = (): Reading[] => {
    const data = localStorage.getItem('myLibrary');
    if (data) {
      return JSON.parse(data);
    }
    return []; // Empty library by default
  };

  const addToClubs = (club: Club) => {
    const existing = getClubs();
    const updated = [...existing, club];
    localStorage.setItem('myClubs', JSON.stringify(updated));
    refreshClubs();
  };

  const getClubs = (): Club[] => {
    const data = localStorage.getItem('myClubs');
    if (data) {
      return JSON.parse(data);
    }
    return []; // Empty clubs by default
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: authService.isAuthenticated(),
        isLoading,
        login,
        register,
        logout,
        refreshLibrary,
        refreshClubs,
        libraryTrigger,
        clubsTrigger,
        addToLibrary,
        getLibrary,
        updateReadingStatus,
        addToClubs,
        getClubs,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
