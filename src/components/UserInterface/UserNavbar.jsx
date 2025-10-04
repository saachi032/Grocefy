import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Bell, UserCircle, LogOut } from 'lucide-react';
import { useAuth } from '../../context/AuthContext.jsx';

const UserNavbar = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

const handleLogout = () => {
  alert("You have been logged out.");
  navigate("/", { replace: true });
  setTimeout(() => {
    logout();
  }, 100); 
};

  return (
    <header className="w-full bg-gray-800 sticky top-0 z-50 shadow-md">
      <div className="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between">
        <Link to="/home" className="flex items-center gap-2 transition transform hover:scale-105">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24"
            fill="currentColor"
            className="w-9 h-9 text-green-500"
          >
            <path d="M11.25,4.5A5.25,5.25,0,0,0,6,9.75v.25a.75.75,0,0,0,1.5,0V9.75a3.75,3.75,0,0,1,7.5,0v.25a.75.75,0,0,0,1.5,0V9.75A5.25,5.25,0,0,0,11.25,4.5Z" />
            <path
              fillRule="evenodd"
              d="M6.16,12.47a.75.75,0,0,1,1.06,0l1.22,1.22a.75.75,0,0,0,1.06,0l2.72-2.72a.75.75,0,0,1,1.06,1.06l-2.72,2.72a2.25,2.25,0,0,1-3.18,0l-1.22-1.22a.75.75,0,0,1,0-1.06ZM18,10.5a.75.75,0,0,1,.75.75v8.25a.75.75,0,0,1-1.5,0V11.25A.75.75,0,0,1,18,10.5Z"
              clipRule="evenodd"
            />
          </svg>
          <span className="text-2xl font-bold text-white">Grocefy</span>
        </Link>

        <nav className="hidden md:flex gap-8">
          <Link to="/home" className="text-lg text-gray-300 hover:text-green-400 font-medium transition">
            Dashboard
          </Link>
          <Link to="/lists" className="text-lg text-gray-300 hover:text-green-400 font-medium transition">
            Lists
          </Link>
          <Link to="/expenses" className="text-lg text-gray-300 hover:text-green-400 font-medium transition">
            Expenses
          </Link>
           <Link to="/family" className="text-lg text-gray-300 hover:text-green-400 font-medium transition">
            Family
          </Link>
        </nav>

        <div className="flex items-center gap-5">
            <button className="text-gray-300 hover:text-green-400 transition">
                <Bell size={24} />
            </button>
             <div className="flex items-center gap-3">
                 <UserCircle size={32} className="text-gray-400"/>
                 <span className="text-white font-medium hidden sm:block">Saachi</span>
             </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 bg-green-500 text-gray-900 font-semibold rounded-full shadow-md hover:shadow-lg transition transform hover:scale-105 hover:bg-green-400"
          >
            <LogOut size={20}/>
            <span>Logout</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default UserNavbar;

