import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
// --- 1. ADD Menu and X icons ---
import { ShoppingBasket, Bell, LogOut, UserCircle, User, Menu, X } from 'lucide-react';
import { useAuth } from '../../context/AuthContext.jsx';

const UserNavbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  // --- 2. ADD State for the mobile menu ---
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/", { replace: true });
  };

  const navLinks = [
    { name: "Dashboard", path: "/home" },
    { name: "Lists", path: "/lists" },
    { name: "Expenses", path: "/expenses" },
    { name: "Family", path: "/family" }
  ];

  return (
    <header className="w-full bg-gray-900 sticky top-0 z-50">
      <div className="mx-auto px-6 py-4 flex items-center justify-between">
        {/* Left: Logo */}
        <Link to="/home" className="flex items-center gap-2">
          <ShoppingBasket className="w-10 h-10 text-green-500" />
          <span className="text-4xl font-bold text-white">Grocefy</span>
        </Link>

        {/* Center: Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.name}
                to={link.path}
                className={`text-gray-300 font-medium hover:text-white transition-colors relative group ${isActive ? 'text-white' : ''}`}
              >
                {link.name}
                <span
                  className={`absolute -bottom-1 left-1/2 -translate-x-1/2 h-0.5 bg-green-500 transition-all duration-300 group-hover:w-full ${isActive ? 'w-full' : 'w-0'}`}
                ></span>
              </Link>
            );
          })}
        </nav>

        {/* Right: User Actions */}
        <div className="flex items-center gap-5">
          <button className="text-gray-400 hover:text-white transition-colors">
            <Bell size={22} />
          </button>

          {/* Profile Dropdown */}
          <div className="relative">
            <button onClick={() => setIsProfileOpen(!isProfileOpen)} className="flex items-center gap-2">
              <UserCircle size={28} className="text-gray-400" />
              <span className="text-white font-medium hidden sm:block">{user?.name || 'User'}</span>
            </button>
            {isProfileOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-gray-700 rounded-lg shadow-xl py-1 z-50">
                <Link to="/profile" onClick={() => setIsProfileOpen(false)} className="flex items-center w-full px-4 py-2 text-sm text-gray-300 hover:bg-gray-600 hover:text-white">
                  <User size={16} className="mr-2" /> My Profile
                </Link>
                <button onClick={handleLogout} className="flex items-center w-full px-4 py-2 text-sm text-gray-300 hover:bg-gray-600 hover:text-white">
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
        <div className="md:hidden bg-gray-800 border-t border-gray-700">
          <nav className="flex flex-col items-center gap-2 p-4">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)} // Close menu on click
                  className={`w-full text-center py-2 rounded-md font-medium transition-colors ${isActive ? 'text-white bg-gray-700' : 'text-gray-300 hover:text-white'}`}
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