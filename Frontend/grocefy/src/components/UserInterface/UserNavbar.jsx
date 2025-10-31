import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
// --- 1. ADD Menu and X icons ---
import { ShoppingBasket, Bell, LogOut, UserCircle, User, Menu, X, Moon, Sun } from 'lucide-react';
import { useAuth } from '../../context/AuthContext.jsx';
import { useTheme } from '../../context/ThemeContext.jsx';

const UserNavbar = () => {
  const { user, logout } = useAuth();
  const { isDarkMode, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  // --- 2. ADD State for the mobile menu ---
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

 const handleLogout = () => {
  logout();
  setTimeout(() => {
    navigate("/", { replace: true }); // Redirect to public HomePage.jsx
  }, 250); // small delay (200ms) to allow state update
};
  const navLinks = [
    { name: "Dashboard", path: "/home" },
    { name: "Lists", path: "/lists" },
    { name: "Expenses", path: "/expenses" },
    { name: "Family", path: "/family" }
  ];

  return (
    <header className="w-full bg-gray-900 dark:bg-gray-950 sticky top-0 z-50 border-b border-gray-800 dark:border-gray-800">
      <div className="mx-auto px-6 py-4 flex items-center justify-between">
        {/* Left: Logo */}
        <Link to="/home" className="flex items-center gap-2">
          <ShoppingBasket className="w-10 h-10 text-green-500 dark:text-green-400" />
          <span className="text-4xl font-bold text-white dark:text-gray-100">Grocefy</span>
        </Link>

        {/* Center: Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.name}
                to={link.path}
                className={`text-gray-300 dark:text-gray-300 font-medium hover:text-white dark:hover:text-gray-100 transition-colors relative group ${isActive ? 'text-white dark:text-white' : ''}`}
              >
                {link.name}
                <span
                  className={`absolute -bottom-1 left-1/2 -translate-x-1/2 h-0.5 bg-green-500 dark:bg-green-400 transition-all duration-300 group-hover:w-full ${isActive ? 'w-full' : 'w-0'}`}
                ></span>
              </Link>
            );
          })}
        </nav>

        {/* Right: User Actions */}
        <div className="flex items-center gap-5">
          {/* Dark Mode Toggle */}
          <button
            onClick={toggleTheme}
            className="relative p-2.5 rounded-full bg-gray-800 dark:bg-gray-700 border border-gray-700 dark:border-gray-600 hover:bg-gray-700 dark:hover:bg-gray-600 transition-all duration-300 transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-green-500 dark:focus:ring-green-400 focus:ring-offset-2 focus:ring-offset-gray-900 dark:focus:ring-offset-gray-950"
            aria-label="Toggle dark mode"
          >
            <div className="relative w-5 h-5">
              <Sun 
                size={18} 
                className={`absolute inset-0 text-yellow-400 transition-all duration-300 ${isDarkMode ? 'opacity-0 rotate-90 scale-0' : 'opacity-100 rotate-0 scale-100'}`}
              />
              <Moon 
                size={18} 
                className={`absolute inset-0 text-blue-300 transition-all duration-300 ${isDarkMode ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-90 scale-0'}`}
              />
            </div>
          </button>
          
          <button className="text-gray-400 dark:text-gray-400 hover:text-white dark:hover:text-gray-100 transition-colors">
            <Bell size={22} />
          </button>

          {/* Profile Dropdown */}
          <div className="relative">
            <button onClick={() => setIsProfileOpen(!isProfileOpen)} className="flex items-center gap-2">
              <UserCircle size={28} className="text-gray-400 dark:text-gray-400" />
              <span className="text-white dark:text-gray-100 font-medium hidden sm:block">{user?.name || 'User'}</span>
            </button>
            {isProfileOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-gray-700 dark:bg-gray-800 rounded-lg shadow-xl py-1 z-50 border border-gray-600 dark:border-gray-700">
                <Link to="/profile" onClick={() => setIsProfileOpen(false)} className="flex items-center w-full px-4 py-2 text-sm text-gray-300 dark:text-gray-300 hover:bg-gray-600 dark:hover:bg-gray-700 hover:text-white dark:hover:text-white">
                  <User size={16} className="mr-2" /> My Profile
                </Link>
                <button onClick={handleLogout} className="flex items-center w-full px-4 py-2 text-sm text-gray-300 dark:text-gray-300 hover:bg-gray-600 dark:hover:bg-gray-700 hover:text-white dark:hover:text-white">
                  <LogOut size={16} className="mr-2" /> Logout
                </button>
              </div>
            )}
          </div>
          
          {/* --- 3. ADD Hamburger Menu Button (visible only on mobile) --- */}
          <div className="md:hidden">
            <button onClick={() => setMobileMenuOpen(!isMobileMenuOpen)} className="text-gray-300 hover:text-white">
              {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* --- 4. ADD Mobile Menu Dropdown --- */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-gray-800 dark:bg-gray-900 border-t border-gray-700 dark:border-gray-700">
          <nav className="flex flex-col items-center gap-2 p-4">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)} // Close menu on click
                  className={`w-full text-center py-2 rounded-md font-medium transition-colors ${isActive ? 'text-white dark:text-white bg-gray-700 dark:bg-gray-800' : 'text-gray-300 dark:text-gray-300 hover:text-white dark:hover:text-white'}`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>
        </div>
      )}
    </header>
  );
};

export default UserNavbar;