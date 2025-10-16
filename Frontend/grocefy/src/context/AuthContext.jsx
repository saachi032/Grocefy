import React, { createContext, useContext, useState, useEffect } from 'react';

// Create the context
const AuthContext = createContext();

// Custom hook to use the auth context
export const useAuth = () => {
  return useContext(AuthContext);
};

// Provider component
export const AuthProvider = ({ children }) => {
  // Initialize user from localStorage
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('grocefyUser');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  // Flag to prevent redirect flicker during logout
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  // Keep localStorage in sync with user state
  useEffect(() => {
    if (user) {
      localStorage.setItem('grocefyUser', JSON.stringify(user));
    } else {
      localStorage.removeItem('grocefyUser');
    }
  }, [user]);

  // Mock login
  const login = (userData) => {
    const mockUser = { name: userData.name || "Saachi", email: userData.email };
    setUser(mockUser);
  };

  // Fixed logout (prevents login flicker)
  const logout = () => {
    setIsLoggingOut(true);
    setUser(null);
    // Give React time to unmount protected routes before redirecting
    setTimeout(() => {
      setIsLoggingOut(false);
    }, 400);
  };

  const value = {
    user,
    isAuthenticated: !!user,
    isLoggingOut,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
