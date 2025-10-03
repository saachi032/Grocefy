import React from "react";
import {
  ShoppingCart,
  Users,
  BarChart,
  Github,
  Twitter,
  Linkedin,
} from "lucide-react";

const HomePage = () => {
  return (
    // Full screen container
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* --- Header --- */}
      <header className="w-full bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <a href="#" className="flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-8 h-8 text-green-500"
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
            <span className="text-2xl font-bold text-gray-800">Grocefy</span>
          </a>
          <nav className="hidden md:flex gap-8">
            <a href="#features" className="text-gray-600 hover:text-green-500">
              Features
            </a>
            <a href="#how" className="text-gray-600 hover:text-green-500">
              How It Works
            </a>
            <a href="#contact" className="text-gray-600 hover:text-green-500">
              Contact
            </a>
          </nav>
          <div className="flex gap-4">
            <button className="px-5 py-2 border border-blue-500 text-blue-500 rounded-full hover:bg-blue-500 hover:text-white transition">
              Login
            </button>
            <button className="px-5 py-2 bg-green-400 text-gray-900 font-semibold rounded-full shadow-md hover:shadow-lg transition">
              Sign Up
            </button>
          </div>
        </div>
      </header>

      {/* --- Hero Section --- */}
      <section className="flex-1 flex items-center justify-center py-16 md:py-20">
        <div className="w-full max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-5xl md:text-7xl font-extrabold text-gray-900 mb-6 leading-tight">
              Simplify your <span className="text-green-500">groceries</span> &
              expenses
            </h1>
            <p className="text-xl text-gray-600 mb-10">
              Grocefy helps you and your family stay on top of grocery lists,
              track expenses, and manage household needs — all in one app.
            </p>
            <button className="px-8 py-4 bg-green-400 text-gray-900 text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transition">
              Get Started for Free
            </button>
          </div>
          <div className="flex-1 flex justify-center">
            <div className="w-72 h-[32rem] bg-white rounded-3xl shadow-2xl border-4 border-gray-200 p-4 transition-transform duration-300 hover:scale-105 flex flex-col">
              <div className="w-full h-full bg-gray-800 rounded-2xl flex flex-col p-4 gap-3 overflow-hidden">
                <h2 className="text-white font-bold text-lg">Family List</h2>
                <div className="w-full bg-gray-700 p-3 rounded-lg animate-pulse">
                  <p className="text-gray-400 text-sm">Milk</p>
                </div>
                <div className="w-full bg-gray-700 p-3 rounded-lg">
                  <p className="text-gray-400 text-sm">Eggs</p>
                </div>
                <div className="w-full bg-gray-700 p-3 rounded-lg animate-pulse delay-150">
                  <p className="text-gray-400 text-sm">Bread</p>
                </div>
                <div className="w-full bg-gray-700 p-3 rounded-lg">
                  <p className="text-gray-400 text-sm">Apples</p>
                </div>
                <div className="w-full bg-gray-700 p-3 rounded-lg">
                  <p className="text-gray-400 text-sm">Chicken Breast</p>
                </div>
                <div className="w-full bg-green-500 p-3 rounded-lg mt-auto shadow-lg">
                  <p className="text-white font-semibold text-center">+ Add Item</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- How It Works Section --- */}
      <section id="how" className="bg-white py-24 border-y flex-shrink-0">
        <div className="max-w-7xl mx-auto px-6">
          <h3 className="text-4xl font-bold text-center mb-16">How It Works</h3>
          <div className="flex flex-wrap justify-center gap-10">
            <div className="w-80 p-8 rounded-xl shadow-md text-center hover:shadow-xl transition">
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-green-100 flex items-center justify-center text-green-500">
                <Users size={40} />
              </div>
              <h4 className="text-2xl font-semibold mb-3">Add Family</h4>
              <p className="text-gray-600">
                Invite your family members and manage things together.
              </p>
            </div>
            <div className="w-80 p-8 rounded-xl shadow-md text-center hover:shadow-xl transition">
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-green-100 flex items-center justify-center text-green-500">
                <ShoppingCart size={40} />
              </div>
              <h4 className="text-2xl font-semibold mb-3">Shared Lists</h4>
              <p className="text-gray-600">
                Maintain personal and family grocery lists with real-time
                updates.
              </p>
            </div>
            <div className="w-80 p-8 rounded-xl shadow-md text-center hover:shadow-xl transition">
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-green-100 flex items-center justify-center text-green-500">
                <BarChart size={40} />
              </div>
              <h4 className="text-2xl font-semibold mb-3">Track Expenses</h4>
              <p className="text-gray-600">
                Keep track of your daily spendings and get monthly insights.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* --- Footer --- */}
      <footer className="w-full bg-gray-100 py-12 flex-shrink-0 mt-auto">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between gap-6">
          <p className="text-gray-700">
            &copy; {new Date().getFullYear()} Grocefy. All rights reserved.
          </p>
          <div className="flex gap-4 text-gray-700">
            <Github size={24} />
            <Twitter size={24} />
            <Linkedin size={24} />
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;