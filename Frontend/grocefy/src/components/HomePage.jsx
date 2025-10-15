import React from "react";
import { Link } from "react-router-dom";
import {
  ShoppingCart,
  Users,
  BarChart,
  Github,
  Linkedin,
  ShoppingBasket,
} from "lucide-react";
import Navbar from "./Navbar";

const HomePage = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50 animate-fadeInUp">
      <Navbar />

      {/* Hero and "How It Works" sections remain unchanged */}
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
            <Link
              to="/signup"
              className="inline-block px-8 py-4 bg-green-400 text-gray-900 text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transition transform hover:scale-105 hover:bg-green-500"
            >
              Get Started for Free
            </Link>
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
                  <p className="text-white font-semibold text-center">
                    + Add Item
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="how" className="bg-white py-24 border-y flex-shrink-0">
        <div className="max-w-7xl mx-auto px-6">
          <h3 className="text-4xl font-bold text-center mb-16">How It Works</h3>
          <div className="flex flex-wrap justify-center gap-10">
            <div className="w-80 p-8 rounded-xl shadow-md text-center hover:shadow-xl transition">
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-blue-100 flex items-center justify-center text-blue-500">
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
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-purple-100 flex items-center justify-center text-purple-500">
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

      <footer className="w-full bg-gray-800 text-gray-300 py-12 px-6 mt-auto">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div className="md:col-span-1">
               <Link to="/" className="flex items-center gap-2 mb-2">
                <ShoppingBasket className="w-10 h-10 text-green-500" />
                {/* --- FIXED: Text color changed to white --- */}
                <span className="text-3xl font-bold text-white">Grocefy</span>
              </Link>
              <p className="text-gray-400 text-sm">
                Making grocery management simple for families everywhere.
              </p>
            </div>

            <div>
              <h5 className="font-semibold text-white mb-4">Product</h5>
              <ul className="space-y-3">
                <li><a href="#features" className="hover:text-green-500 transition">Features</a></li>
                <li><a href="#how" className="hover:text-green-500 transition">How It Works</a></li>
                <li><a href="#" className="hover:text-green-500 transition">Pricing</a></li>
              </ul>
            </div>

            <div>
              <h5 className="font-semibold text-white mb-4">Company</h5>
              <ul className="space-y-3">
                <li><a href="#" className="hover:text-green-500 transition">About Us</a></li>
                <li><a href="#" className="hover:text-green-500 transition">Contact</a></li>
                <li><a href="#" className="hover:text-green-500 transition">Careers</a></li>
              </ul>
            </div>

            <div>
              <h5 className="font-semibold text-white mb-4">Legal</h5>
              <ul className="space-y-3">
                <li><a href="#" className="hover:text-green-500 transition">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-green-500 transition">Terms of Service</a></li>
              </ul>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-gray-700 flex flex-col items-center gap-4">
            <div className="flex gap-6 text-gray-400">
              <a
                href="https://github.com/saachi032"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-green-500 transition"
              >
                <Github size={24} />
              </a>
              <a
                href="https://www.linkedin.com/in/saachi-mishra-51362229b/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-green-500 transition"
              >
                <Linkedin size={24} />
              </a>
            </div>
            <p className="text-gray-500 text-sm">
              &copy; {new Date().getFullYear()} Grocefy. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;