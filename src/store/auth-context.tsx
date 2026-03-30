"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  ReactNode,
} from "react";

interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  isSignedIn: boolean;
  signIn: (name: string, email: string) => void;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("ecommerce932-user");
    if (stored) {
      try {
        setUser(JSON.parse(stored));
      } catch {
        localStorage.removeItem("ecommerce932-user");
      }
    }
    setIsLoaded(true);
  }, []);

  const signIn = useCallback((name: string, email: string) => {
    const newUser: User = {
      id: `user_${Date.now()}_${Math.random().toString(36).slice(2)}`,
      name,
      email,
    };
    setUser(newUser);
    localStorage.setItem("ecommerce932-user", JSON.stringify(newUser));
  }, []);

  const signOut = useCallback(() => {
    setUser(null);
    localStorage.removeItem("ecommerce932-user");
  }, []);

  if (!isLoaded) return null;

  return (
    <AuthContext.Provider
      value={{
        user,
        isSignedIn: !!user,
        signIn,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
