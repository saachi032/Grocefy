import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

// Configure axios base URL for production
const API_BASE_URL = import.meta.env.VITE_API_URL || '';
axios.defaults.baseURL = API_BASE_URL;

// 1. Create the context
const AuthContext = createContext();

// 2. Create the provider component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // To handle initial load

  // Check for logged-in user on initial mount
  useEffect(() => {
    const storedUser = localStorage.getItem('userInfo');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  // Login function
  const login = async (email, password) => {
    try {
      const { data } = await axios.post('/api/users/login', { email, password });
      localStorage.setItem('userInfo', JSON.stringify(data));
      setUser(data);
      return data; // Return user data on success
    } catch (error) {
      // Throw error to be caught by the component
      throw error.response && error.response.data.message
        ? new Error(error.response.data.message)
        : error;
    }
  };
  
  // Signup function
  const signup = async (name, email, password) => {
     try {
      const { data } = await axios.post('/api/users/register', { name, email, password });
      localStorage.setItem('userInfo', JSON.stringify(data));
      setUser(data);
      return data;
    } catch (error) {
       throw error.response && error.response.data.message
        ? new Error(error.response.data.message)
        : error;
    }
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem('userInfo');
    setUser(null);
  };

  // The value provided to the context consumers
  const value = {
    user,
    login,
    signup,
    logout,
    loading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// 3. Create a custom hook to use the context
export const useAuth = () => {
  return useContext(AuthContext);
};
