import React, { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChangedListener } from '../services/authService';
import { User } from 'firebase/auth';

interface AuthContextType {
  currentUser: User | null;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Ensure the listener is only attached on the client side
    if (typeof window !== 'undefined') {
      const unsubscribe = onAuthStateChangedListener((user) => {
        setCurrentUser(user);
        setLoading(false);
      });

      return () => unsubscribe();
    }
  }, []);

  const value = { currentUser, loading };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};