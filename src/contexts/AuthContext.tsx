import React, { createContext, useContext, useState, useEffect } from "react";
import {jwtDecode} from "jwt-decode";

interface DecodedToken {
  id: string;
  role: string;
  exp: number;
  name: string;
  email: string;
}

interface AuthContextType {
  token: string | null;
  user: DecodedToken | null;
  isAuthenticated: boolean;
  login: (token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("token")
  );
  const [user, setUser] = useState<DecodedToken | null>(null);

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
  };

  const login = (token: string) => {
    localStorage.setItem("token", token);
    setToken(token);
  };

  useEffect(() => {
    if (!token) {
      setUser(null);
      return;
    }

    try {
      const decoded = jwtDecode<DecodedToken>(token);

      // Check expiry
      if (decoded.exp * 1000 < Date.now()) {
        logout();
      } else {
        setUser(decoded);
      }
    } catch (error) {
      logout();
    }
  }, [token]);

  return (
    <AuthContext.Provider
      value={{
        token,
        user,
        isAuthenticated: !!user,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
