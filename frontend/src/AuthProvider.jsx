import React, { useState } from "react";
import { loginUser, registerUser } from "./api";
import { AuthContext } from "./context/AuthContext";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("hg_user");
    return saved ? JSON.parse(saved) : null;
  });

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

  function logout() {
    localStorage.removeItem("hg_token");
    localStorage.removeItem("hg_user");
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
