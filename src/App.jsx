import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Auth Context
import { AuthProvider } from './context/AuthContext.jsx';

// Route Protection
import ProtectedRoute from './components/ProtectedRoute.jsx';

// Main Page Components
import HomePage from './components/HomePage.jsx';
import SignUpPage from './components/SignUpPage.jsx';
import LoginPage from './components/LoginPage.jsx';
import UserHome from './components/UserInterface/UserHome.jsx';
import Lists from './components/UserInterface/Lists.jsx';
import Expenses from './components/UserInterface/Expenses.jsx';
import Family from './components/UserInterface/Family.jsx';
import FamilyDashboard from './components/UserInterface/FamilyDashboard.jsx';

// Form Page Components
import CreateList from './components/forms/CreateList.jsx';
import AddExpense from './components/forms/AddExpense.jsx';
import CreateFamily from './components/forms/CreateFamily.jsx';
import InviteMember from './components/forms/InviteMember.jsx';

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

          {/* Protected Routes - Main UI */}
          <Route path="/home" element={<ProtectedRoute><UserHome /></ProtectedRoute>} />
          <Route path="/lists" element={<ProtectedRoute><Lists /></ProtectedRoute>} />
          <Route path="/expenses" element={<ProtectedRoute><Expenses /></ProtectedRoute>} />
          <Route path="/family" element={<ProtectedRoute><Family /></ProtectedRoute>} />
          <Route path="/family/:familyId" element={<ProtectedRoute><FamilyDashboard /></ProtectedRoute>} />

          {/* Protected Routes - Forms */}
          <Route path="/lists/create" element={<ProtectedRoute><CreateList /></ProtectedRoute>} />
          <Route path="/expenses/add" element={<ProtectedRoute><AddExpense /></ProtectedRoute>} />
          <Route path="/family/create" element={<ProtectedRoute><CreateFamily /></ProtectedRoute>} />
          <Route path="/family/invite" element={<ProtectedRoute><InviteMember /></ProtectedRoute>} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;