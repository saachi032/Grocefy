import React from "react";

const Navbar = () => {
  return (
    <header className="w-full bg-white shadow-sm sticky top-0 z-50">
      <div className="mx-auto px-6 py-6 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-12 h-12 text-green-500"
          >
            <path d="M11.25,4.5A5.25,5.25,0,0,0,6,9.75v.25a.75.75,0,0,0,1.5,0V9.75a3.75,3.75,0,0,1,7.5,0v.25a.75.75,0,0,0,1.5,0V9.75A5.25,5.25,0,0,0,11.25,4.5Z" />
            <path
              fillRule="evenodd"
              d="M6.16,12.47a.75.75,0,0,1,1.06,0l1.22,1.22a.75.75,0,0,0,1.06,0l2.72-2.72a.75.75,0,0,1,1.06,1.06l-2.72,2.72a2.25,2.25,0,0,1-3.18,0l-1.22-1.22a.75.75,0,0,1,0-1.06ZM18,10.5a.75.75,0,0,1,.75.75v8.25a.75.75,0,0,1-1.5,0V11.25A.75.75,0,0,1,18,10.5Z"
              clipRule="evenodd"
            />
            <path d="M4.5,12.75a.75.75,0,0,0,0,1.5h.75a.75.75,0,0,0,0-1.5H4.5Z" />
            <path d="M6,15.75a.75.75,0,0,1,.75-.75h.75a.75.75,0,0,1,0,1.5H6.75A.75.75,0,0,1,6,15.75Z" />
          </svg>
          <span className="text-4xl font-bold text-gray-800">Grocefy</span>
        </a>

        {/* Center Navigation */}
        <nav className="hidden md:flex gap-12 absolute left-1/2 transform -translate-x-1/2">
          <a
            href="#features"
            className="text-xl text-gray-600 hover:text-green-500 font-medium transition"
          >
            Features
          </a>
          <a
            href="#how"
            className="text-xl text-gray-600 hover:text-green-500 font-medium transition"
          >
            How It Works
          </a>
          <a
            href="#contact"
            className="text-xl text-gray-600 hover:text-green-500 font-medium transition"
          >
            Contact
          </a>
        </nav>

        {/* Right Side Actions */}
        <div className="flex gap-4">
          <button className="px-5 py-2 border border-blue-500 text-blue-500 rounded-full hover:bg-blue-500 hover:text-white font-medium transition">
            Login
          </button>
          <button className="px-5 py-2 bg-green-400 text-gray-900 font-semibold rounded-full shadow-md hover:shadow-lg transition">
            Sign Up
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
