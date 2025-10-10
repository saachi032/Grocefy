import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { ShoppingBasket, Bell, LogOut, UserCircle } from 'lucide-react';
import { useAuth } from '../../context/AuthContext.jsx';

const UserNavbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation(); // Get the current location object

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
    <header className="w-full bg-gray-800 sticky top-0 z-50">
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
                // If the link is active, make the text white
                className={`text-gray-300 font-medium hover:text-white transition-colors relative group ${isActive ? 'text-white' : ''}`}
              >
                {link.name}
                <span
                  // If the link is active, make the underline visible (width 100%)
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
          <div className="flex items-center gap-2">
            <UserCircle size={28} className="text-gray-400" />
            <span className="text-white font-medium hidden sm:block">{user?.name || 'User'}</span>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 bg-gray-700 text-white font-semibold rounded-lg hover:bg-red-600 transition-colors"
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