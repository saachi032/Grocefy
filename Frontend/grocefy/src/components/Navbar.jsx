import React from "react";
import { Link } from "react-router-dom";
import { ShoppingBasket, ShoppingCart } from "lucide-react"; 

const Navbar = () => {
  return (
    <header className="w-full bg-gray-900 sticky top-0 z-50">
      <div className="mx-auto px-6 py-6 flex items-center justify-between">
         <Link to="/" className="flex items-center gap-2 mb-2">
                <ShoppingBasket className="w-10 h-10 text-green-500" />
                {/* --- FIXED: Text color changed to white --- */}
                <span className="text-3xl font-bold text-white">Grocefy</span>
              </Link>

        {/* Center Navigation */}
        <nav className="hidden md:flex gap-12 absolute left-1/2 transform -translate-x-1/2">
          <a
            href="/#features"
            className="text-xl text-gray-300 hover:text-green-500 font-medium transition"
          >
            Features
          </a>
          <a
            href="/#how"
            className="text-xl text-gray-300 hover:text-green-500 font-medium transition"
          >
            How It Works
          </a>
          <a
            href="/#contact"
            className="text-xl text-gray-300 hover:text-green-500 font-medium transition"
          >
            Contact
          </a>
        </nav>

        {/* Right Side Actions */}
        <div className="flex items-center gap-4">
          <Link
            to="/login"
            className="px-5 py-2 border border-gray-400 text-gray-300 rounded-full hover:bg-gray-300 hover:text-gray-900 font-medium transition transform hover:scale-105 flex items-center"
          >
            Login
          </Link>
          <Link
            to="/signup"
            className="px-5 py-2 bg-green-400 text-gray-900 font-semibold rounded-full shadow-md hover:shadow-lg transition transform hover:scale-105 hover:bg-green-500 flex items-center"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Navbar;