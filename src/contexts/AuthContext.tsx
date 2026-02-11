import React, { createContext, useContext, useState, useCallback, useEffect, useRef } from "react";
import { mockUsers, type User, type Plan } from "@/lib/mock-data";
import { useToast } from "@/hooks/use-toast";

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => boolean;
  register: (name: string, email: string, password: string) => boolean;
  logout: () => void;
  subscribeToPlan: (plan: Plan) => void;
  allUsers: User[];
}

const AuthContext = createContext<AuthContextType | null>(null);

const TOKEN_EXPIRY_MS = 30 * 60 * 1000; // 30 minutes

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [users, setUsers] = useState<User[]>(mockUsers);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout>>();
  const { toast } = useToast();

  const logout = useCallback(() => {
    setCurrentUser(null);
    if (timerRef.current) clearTimeout(timerRef.current);
    toast({ title: "Logged out", description: "You have been logged out." });
  }, [toast]);

  const startAutoLogout = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      logout();
      toast({ title: "Session expired", description: "Please log in again.", variant: "destructive" });
    }, TOKEN_EXPIRY_MS);
  }, [logout, toast]);

  const login = useCallback((email: string, password: string): boolean => {
    const found = users.find((u) => u.email === email && u.password === password);
    if (found) {
      setCurrentUser(found);
      startAutoLogout();
      return true;
    }
    return false;
  }, [users, startAutoLogout]);

  const register = useCallback((name: string, email: string, password: string): boolean => {
    if (users.some((u) => u.email === email)) return false;
    const newUser: User = {
      id: String(users.length + 1),
      name,
      email,
      password,
      role: "user",
      plan: "free",
      subscriptionStatus: "none",
      subscriptionStart: null,
      subscriptionExpiry: null,
    };
    setUsers((prev) => [...prev, newUser]);
    setCurrentUser(newUser);
    startAutoLogout();
    return true;
  }, [users, startAutoLogout]);

  const subscribeToPlan = useCallback((plan: Plan) => {
    if (!currentUser) return;
    const now = new Date();
    const expiry = new Date(now);
    expiry.setFullYear(expiry.getFullYear() + 1);
    const updated: User = {
      ...currentUser,
      plan,
      subscriptionStatus: plan === "free" ? "none" : "active",
      subscriptionStart: plan === "free" ? null : now.toISOString().split("T")[0],
      subscriptionExpiry: plan === "free" ? null : expiry.toISOString().split("T")[0],
    };
    setCurrentUser(updated);
    setUsers((prev) => prev.map((u) => (u.id === updated.id ? updated : u)));
  }, [currentUser]);

  useEffect(() => {
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, []);

  return (
    <AuthContext.Provider value={{ user: currentUser, isAuthenticated: !!currentUser, login, register, logout, subscribeToPlan, allUsers: users }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
