import { createContext, useEffect, useState } from "react";
import { fetchUserDetails } from "../api/user";

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true); // Track loading state

  useEffect(() => {
    const getUserDetails = async () => {
      const userDetails = await fetchUserDetails();
      if (
        userDetails &&
        (userDetails.name !== undefined || userDetails.email)
      ) {
        setIsAuthenticated(true);
        setUserInfo(userDetails);
      } else {
        setIsAuthenticated(false);
        setUserInfo(null);
      }
      setLoading(false); // Set loading to false after fetch completes
    };

    getUserDetails();
  }, []);

  const login = () => {
    setIsAuthenticated(true);
    setLoading(true); // Set loading to true during login
    fetchUserDetails().then((userDetails) => {
      if (userDetails) {
        setUserInfo(userDetails);
      } else {
        setIsAuthenticated(false);
        setUserInfo(null);
      }
      setLoading(false);
    });
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
        setUserInfo,
        loading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
