import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import HomePage from './components/HomePage.jsx';
import SignUpPage from './components/SignUpPage.jsx';
import LoginPage from './components/LoginPage.jsx';
import UserHome from './components/UserInterface/UserHome.jsx';
import Lists from './components/UserInterface/Lists.jsx';
import Expenses from './components/UserInterface/Expenses.jsx';
import Family from './components/UserInterface/Family.jsx';
import FamilyDashboard from './components/UserInterface/FamilyDashboard.jsx'; // Make sure this import is correct
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
          <Route path="/home" element={<ProtectedRoute><UserHome /></ProtectedRoute>} />
          <Route path="/lists" element={<ProtectedRoute><Lists /></ProtectedRoute>} />
          <Route path="/expenses" element={<ProtectedRoute><Expenses /></ProtectedRoute>} />
          
          {/* This route loads the Family Hub page */}
          <Route path="/family" element={<ProtectedRoute><Family /></ProtectedRoute>} />
          
          {/* This dynamic route loads the specific dashboard page and makes redirection work */}
          <Route path="/family/:familyId" element={<ProtectedRoute><FamilyDashboard /></ProtectedRoute>} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;