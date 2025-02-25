// src/AuthContext.js
import React, { createContext, useState, useEffect, useContext } from "react";
import { useLocation } from "react-router-dom";
import authService from "../components/services/authService";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Define public paths that don’t trigger refresh
        const publicPaths = ["/", "/login"];
        if (publicPaths.includes(location.pathname)) {
          // On public pages, simply set auth based on token existence
          const token = localStorage.getItem("access_token");
          setIsAuthenticated(!!token);
        } else {
          // On protected routes, try refreshing if no access token
          let token = localStorage.getItem("access_token");
          if (!token) {
            console.log("No access token found, attempting refresh...");
            token = await authService.refreshToken();
          }
          setIsAuthenticated(!!token);
        }
      } catch (error) {
        console.error("Auth check failed:", error);
        setIsAuthenticated(false);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [location.pathname]);

  return (
    <AuthContext.Provider value={{ isAuthenticated, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
