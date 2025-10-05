import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingBasket, Bell, LogOut, UserCircle } from 'lucide-react';
import { useAuth } from '../../context/AuthContext.jsx';

const UserNavbar = ({ user }) => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    alert("You have been logged out.");
    navigate("/", { replace: true });
    setTimeout(() => logout(), 100);
  };

  const navLinks = ["Dashboard", "Lists", "Expenses", "Family"];

  return (
    <header className="w-full bg-white sticky top-0 z-50 shadow-md">
      <div className="mx-auto  px-6 py-4 flex items-center justify-between">
        {/* Left: Logo */}
        <Link to="/home" className="flex items-center gap-2">
          <ShoppingBasket className="w-10 h-10 text-green-500" />
          <span className="text-4xl font-bold text-gray-800">Grocefy</span>
        </Link>

        {/* Center: Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link}
              to={`/${link.toLowerCase()}`}
              className="text-gray-800 font-medium hover:text-gray-900 transition-colors relative group"
            >
              {link}
              <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-green-500 transition-all duration-300 group-hover:w-full"></span>
            </Link>
          ))}
        </nav>

        {/* Right: User Actions */}
        <div className="flex items-center gap-5">
          <button className="text-gray-800 hover:text-gray-900 transition-colors">
            <Bell size={22} />
          </button>
          <div className="flex items-center gap-2">
            <UserCircle size={28} className="text-gray-500" />
            <span className="text-gray-800 font-medium hidden sm:block">{user?.name || 'User'}</span>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 bg-gray-200 text-gray-800 font-semibold rounded-lg hover:bg-red-500 hover:text-white transition-colors"
          >
            <LogOut size={18} />
            <span className="hidden sm:block">Logout</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default UserNavbar;

