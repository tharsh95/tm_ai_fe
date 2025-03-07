import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { AuthContextType, User, AxiosErrorResponse } from "../types";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const UseAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("UseAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const handleLogout = () => {
    setUser(null);
    setIsAuthenticated(false);
    setToken(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    delete axios.defaults.headers.common['Authorization'];
  };

  // Set up axios interceptor for handling unauthorized responses
  useEffect(() => {
    const interceptor = axios.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401) {
          handleLogout();
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axios.interceptors.response.eject(interceptor);
    };
  }, []);

  // Initialize auth state from localStorage and validate token
  useEffect(() => {
    const validateAndSetAuth = async () => {
      try {
        const storedToken = localStorage.getItem("token");
        const storedUser = localStorage.getItem("user");
        
        if (storedToken && storedUser) {
          // Set token in axios headers
          axios.defaults.headers.common['Authorization'] = `Bearer ${storedToken}`;
          
          // Validate token with backend
          try {
            await axios.get("http://localhost:8000/auth/validate");
            // If validation succeeds, set auth state
            setToken(storedToken);
            setUser(JSON.parse(storedUser));
            setIsAuthenticated(true);
          } catch (error) {
            // If validation fails, clear auth state
            handleLogout();
          }
        }
      } catch (error) {
        handleLogout();
      } finally {
        setLoading(false);
      }
    };

    validateAndSetAuth();
  }, []);

  const login = async (
    email: string,
    password: string
  ): Promise<{ status: boolean; detail?: string }> => {
    try {
      const { data } = await axios.post("http://localhost:8000/auth/login", {
        email,
        password,
      });

      const { access_token, name } = data;

      const userData: User = {
        name,
        email,
      };

      // Set axios default authorization header
      axios.defaults.headers.common['Authorization'] = `Bearer ${access_token}`;

      setUser(userData);
      setToken(access_token);
      setIsAuthenticated(true);

      // Store token and user data in localStorage
      localStorage.setItem("user", JSON.stringify(userData));
      localStorage.setItem("token", access_token);

      return { status: true };
    } catch (error) {
      console.error("Login failed:", error);
      if (error instanceof Error && "response" in error) {
        return {
          status: false,
          detail: (error as AxiosErrorResponse).response?.data?.detail,
        };
      }
      return { status: false, detail: "Login failed" };
    }
  };

  const register = async (
    name: string,
    email: string,
    password: string
  ): Promise<{ status: boolean; detail?: string }> => {
    try {
      const { data } = await axios.post("http://localhost:8000/auth/register", {
        name,
        email,
        password,
      });

      // Assuming the API returns user details
      const userData: User = {
        id: data.id,
        name: data.name,
        email: data.email,
      };

      setUser(userData);
      setIsAuthenticated(true);
      localStorage.setItem("user", JSON.stringify(userData));

      return { status: true };
    } catch (error) {
      console.error("Registration failed:", error);
      if (error instanceof Error && "response" in error) {
        return {
          status: false,
          detail: (error as AxiosErrorResponse).response?.data?.detail,
        };
      }
      return { status: false, detail: "Registration failed" };
    }
  };

  const value = {
    user,
    isAuthenticated,
    login,
    register,
    logout: handleLogout,
    token,
    loading
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
