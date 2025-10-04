import React, { createContext, useState, useContext } from 'react';

// NOTE: We have removed useNavigate from this file.

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Login function ONLY updates state
  const login = () => {
    setIsAuthenticated(true);
    console.log("User has been logged in.");
  };

  // Logout function ONLY updates state
  const logout = () => {
    setIsAuthenticated(false);
    console.log("User has been logged out.");
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};