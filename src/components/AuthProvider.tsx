"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { jwtDecode } from "jwt-decode";

type User = { id: string; role: 'admin' | 'user' } | null;

const AuthContext = createContext<{
  user: User,
  token: string | null,
  login: (token: string) => void,
  logout: () => void,
}>({
  user: null,
  token: null,
  login: () => {},
  logout: () => {},
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<User>(null);

  useEffect(() => {
    const t = localStorage.getItem("token");
    setToken(t);
    if (t) {
      try { setUser(jwtDecode(t)); } catch { setUser(null); }
    }
  }, []);

  const login = (t: string) => {
    localStorage.setItem("token", t);
    setToken(t);
    setUser(jwtDecode(t));
  };
  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
