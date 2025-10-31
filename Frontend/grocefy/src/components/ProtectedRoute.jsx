import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  // 1. If the auth state is still loading (e.g., checking localStorage), 
  //    show a simple loading text or a spinner component.
  if (loading) {
    return <div>Loading...</div>; // Or a full-page spinner
  }

  // 2. If loading is finished and there is no user, redirect to the login page.
  //    We also pass the page they were trying to access (location)
  //    so we can redirect them back there after they log in.
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // 3. If loading is finished and there is a user, render the child component 
  //    (e.g., <UserHome />, <Lists />, etc.)
  return children;
};

export default ProtectedRoute;