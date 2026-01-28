import { createContext, useState } from "react";

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(false); // No real loading in mock

  // Mock login: accepts only username 'streetleague' and password '1234'
  const login = (username, password) => {
    setLoading(true);
    setTimeout(() => {
      if (username === "streetleague" && password === "1234") {
        setIsAuthenticated(true);
        setUserInfo({
          name: "Street League User",
          email: "streetleague@example.com",
        });
      } else {
        setIsAuthenticated(false);
        setUserInfo(null);
      }
      setLoading(false);
    }, 400);
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUserInfo(null);
  };

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
