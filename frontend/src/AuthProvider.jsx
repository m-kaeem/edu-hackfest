import React, { useState, useEffect, useCallback } from "react";
import { loginUser, registerUser } from "./api";
import { AuthContext } from "./context/AuthContext";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("hg_user");
    return saved ? JSON.parse(saved) : null;
  });

  // Check localStorage on mount and when window regains focus (for OAuth callback)
  const syncUserFromStorage = useCallback(() => {
    const saved = localStorage.getItem("hg_user");
    const token = localStorage.getItem("hg_token");
    if (saved && token) {
      setUser(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    // Sync on window focus (helps after OAuth redirect)
    window.addEventListener('focus', syncUserFromStorage);
    window.addEventListener('storage', syncUserFromStorage);
    
    return () => {
      window.removeEventListener('focus', syncUserFromStorage);
      window.removeEventListener('storage', syncUserFromStorage);
    };
  }, [syncUserFromStorage]);

  async function login(data) {
    const res = await loginUser(data);
    localStorage.setItem("hg_token", res.data.token);
    localStorage.setItem("hg_user", JSON.stringify(res.data.farmer));
    setUser(res.data.farmer);
  }

  async function register(data) {
    const res = await registerUser(data);
    localStorage.setItem("hg_token", res.data.token);
    localStorage.setItem("hg_user", JSON.stringify(res.data.farmer));
    setUser(res.data.farmer);
  }

  // For OAuth callback - set user directly
  function setUserFromOAuth(userData, token) {
    localStorage.setItem("hg_token", token);
    localStorage.setItem("hg_user", JSON.stringify(userData));
    setUser(userData);
  }

  function logout() {
    localStorage.removeItem("hg_token");
    localStorage.removeItem("hg_user");
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, login, register, logout, setUserFromOAuth, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}
