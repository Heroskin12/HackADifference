import { createContext, useState } from "react";

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
  // Always provide the dummy Street League user info
  const userInfo = {
    name: "Street League User",
    email: "streetleague@example.com",
  };
  const isAuthenticated = true;
  const loading = false;
  const login = () => {};
  const logout = () => {};
  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        userInfo,
        loading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
