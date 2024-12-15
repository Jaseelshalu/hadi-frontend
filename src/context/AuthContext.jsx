import React, { createContext, useState, useEffect } from "react";
import axios from "../controllers/axiosInstance";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(null)
  const [user, setUser] = useState(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    return storedUser ? storedUser : null;
  });
  
    useEffect(() => {
      const initializeAuth = async () => {
        const token = await refreshAccessToken();
        if (token) {
          setAuth(token);
        } else {
          setAuth(null);
          setUser(null)
        }
      };
      initializeAuth()
    }, []);

  const login = async (url, formData) => {
    try {
      const response = await axios.post(url, formData);
      localStorage.setItem("user", JSON.stringify(response.data.user)); // Persist user data
      setUser(response.data.user);
      return true
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  const logout = async () => {
    if (user) {
      let logoutSuccess = await axios.get("/auth/logout");
      if (logoutSuccess) {
        localStorage.removeItem("user");
        setAuth(null);
        setUser(null);
      }
    }
  };

const refreshAccessToken = async () => {
  try {
    const response = await axios.get("/auth/refresh-token", {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error("Error refreshing access token:", error);
    logout();
    return null;
  }
};

  return (
    <AuthContext.Provider value={{ auth, login, logout, user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => React.useContext(AuthContext);
