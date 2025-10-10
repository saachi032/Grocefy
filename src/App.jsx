import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Auth Context
import { AuthProvider } from './context/AuthContext.jsx';

// Route Protection
import ProtectedRoute from './components/ProtectedRoute.jsx';

// Page Components
import HomePage from './components/HomePage.jsx';
import SignUpPage from './components/SignUpPage.jsx';
import LoginPage from './components/LoginPage.jsx';
import UserHome from './components/UserInterface/UserHome.jsx';
import Lists from './components/UserInterface/Lists.jsx';
import Expenses from './components/UserInterface/Expenses.jsx';
import Family from './components/UserInterface/Family.jsx';


// Global Styles
import './App.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/login" element={<LoginPage />} />

          {/* Protected Routes */}
          <Route 
            path="/home" 
            element={
              <ProtectedRoute>
                <UserHome />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/lists" 
            element={
              <ProtectedRoute>
                <Lists />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/expenses" 
            element={
              <ProtectedRoute>
                <Expenses />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/family" 
            element={
              <ProtectedRoute>
                <Family />
              </ProtectedRoute>
            } 
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;