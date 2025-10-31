import React from "react";
import { Link } from "react-router-dom";
import { ShoppingBasket, ShoppingCart, Moon, Sun } from "lucide-react";
import { useTheme } from "../context/ThemeContext.jsx"; 

const Navbar = () => {
  const { isDarkMode, toggleTheme } = useTheme();
  
  return (
    <header className="w-full bg-gray-900 dark:bg-gray-950 sticky top-0 z-50 border-b border-gray-800 dark:border-gray-800">
      <div className="mx-auto px-6 py-6 flex items-center justify-between">
         <Link to="/" className="flex items-center gap-2 mb-2">
                <ShoppingBasket className="w-10 h-10 text-green-500 dark:text-green-400" />
                <span className="text-3xl font-bold text-white dark:text-gray-100">Grocefy</span>
              </Link>

        {/* Center Navigation */}
        <nav className="hidden md:flex gap-12 absolute left-1/2 transform -translate-x-1/2">
          <a
            href="/#features"
            className="text-xl text-gray-300 dark:text-gray-300 hover:text-green-500 dark:hover:text-green-400 font-medium transition"
          >
            Features
          </a>
          <a
            href="/#how"
            className="text-xl text-gray-300 dark:text-gray-300 hover:text-green-500 dark:hover:text-green-400 font-medium transition"
          >
            How It Works
          </a>
          <a
            href="/#contact"
            className="text-xl text-gray-300 dark:text-gray-300 hover:text-green-500 dark:hover:text-green-400 font-medium transition"
          >
            Contact
          </a>
        </nav>

        {/* Right Side Actions */}
        <div className="flex items-center gap-4">
          {/* Dark Mode Toggle */}
          <button
            onClick={toggleTheme}
            className="relative p-2.5 rounded-full bg-gray-800 dark:bg-gray-700 border border-gray-700 dark:border-gray-600 hover:bg-gray-700 dark:hover:bg-gray-600 transition-all duration-300 transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-green-500 dark:focus:ring-green-400 focus:ring-offset-2 focus:ring-offset-gray-900 dark:focus:ring-offset-gray-950"
            aria-label="Toggle dark mode"
          >
            <div className="relative w-6 h-6">
              <Sun 
                size={20} 
                className={`absolute inset-0 text-yellow-400 transition-all duration-300 ${isDarkMode ? 'opacity-0 rotate-90 scale-0' : 'opacity-100 rotate-0 scale-100'}`}
              />
              <Moon 
                size={20} 
                className={`absolute inset-0 text-blue-300 transition-all duration-300 ${isDarkMode ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-90 scale-0'}`}
              />
            </div>
          </button>
          
          <Link
            to="/login"
            className="px-5 py-2 border border-gray-400 dark:border-gray-600 text-gray-300 dark:text-gray-200 rounded-full hover:bg-gray-300 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white font-medium transition transform hover:scale-105 flex items-center"
          >
            Login
          </Link>
          <Link
            to="/signup"
            className="px-5 py-2 bg-green-400 dark:bg-green-500 text-gray-900 dark:text-white font-semibold rounded-full shadow-md hover:shadow-lg transition transform hover:scale-105 hover:bg-green-500 dark:hover:bg-green-400 flex items-center"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Navbar;