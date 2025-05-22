import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, Plan } from '../types';
import { mockAuthService } from '../services/mockAuthService';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, name: string) => Promise<void>;
  logout: () => void;
  updatePlan: (plan: Plan) => void;
  updateCredits: (credits: number) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is already logged in
    const checkAuth = async () => {
      try {
        const currentUser = await mockAuthService.getCurrentUser();
        setUser(currentUser);
      } catch (error) {
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const loggedInUser = await mockAuthService.login(email, password);
      setUser(loggedInUser);
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (email: string, password: string, name: string) => {
    setIsLoading(true);
    try {
      const newUser = await mockAuthService.signup(email, password, name);
      setUser(newUser);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    mockAuthService.logout();
    setUser(null);
  };

  const updatePlan = (plan: Plan) => {
    if (user) {
      const updatedUser = {
        ...user,
        plan,
        credits: plan.credits,
      };
      mockAuthService.updateUser(updatedUser);
      setUser(updatedUser);
    }
  };

  const updateCredits = (credits: number) => {
    if (user) {
      const updatedUser = {
        ...user,
        credits,
      };
      mockAuthService.updateUser(updatedUser);
      setUser(updatedUser);
    }
  };

  const value = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    signup,
    logout,
    updatePlan,
    updateCredits,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}