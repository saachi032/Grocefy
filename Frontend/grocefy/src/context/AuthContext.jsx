import React, { createContext, useContext, useState, useEffect } from 'react';

// Create the context
const AuthContext = createContext();

// Custom hook to use the auth context
export const useAuth = () => {
  return useContext(AuthContext);
};

// The provider component
export const AuthProvider = ({ children }) => {
  // Initialize user state by reading from localStorage
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('grocefyUser');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  // Use useEffect to save the user to localStorage whenever it changes
  useEffect(() => {
    if (user) {
      localStorage.setItem('grocefyUser', JSON.stringify(user));
    } else {
      localStorage.removeItem('grocefyUser');
    }
  }, [user]);

  // --- Mock Login/Logout Functions ---
  // In your real app, these would make API calls

  const login = (userData) => {
    // For now, we'll just set a mock user
    const mockUser = { name: userData.name || "Saachi", email: userData.email };
    setUser(mockUser);
  };

  const logout = () => {
    setUser(null);
  };

  // The value provided to consuming components
  const value = {
    user,
    isAuthenticated: !!user, // A handy boolean to check if user is logged in
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};