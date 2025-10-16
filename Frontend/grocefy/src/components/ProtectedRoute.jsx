import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, isLoggingOut } = useAuth();
  const location = useLocation();

  // Prevent redirect while logout is still processing
  if (!isAuthenticated && !isLoggingOut) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute;
