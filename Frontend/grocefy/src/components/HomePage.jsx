import React from "react";
import { Link } from "react-router-dom";
import {
  ShoppingCart,
  Users,
  BarChart,
  Github,
  Linkedin,
  ShoppingBasket,
  ClipboardList,
  Wallet,
  PieChart,
} from "lucide-react";
import Navbar from "./Navbar.jsx";
import Footer from "./Footer.jsx";

const HomePage = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50 animate-fadeInUp">
      <Navbar />

      {/* Hero Section */}
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

      {/* Features Section */}
      <section id="features" className="bg-white py-24 border-y">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-green-500 font-semibold uppercase tracking-wider">Core Features</span>
            <h2 className="text-4xl font-bold text-gray-900 mt-2">Everything you need, all in one place</h2>
            <p className="text-lg text-gray-600 mt-4 max-w-2xl mx-auto">
              Stop switching between apps. Grocefy brings your lists, expenses, and family coordination together seamlessly.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center p-6 bg-gray-50 rounded-xl transition hover:shadow-lg">
              <div className="p-4 bg-green-100 text-green-600 rounded-full">
                <ClipboardList size={32} />
              </div>
              <h3 className="text-2xl font-semibold text-gray-800 mt-5 mb-2">Collaborative Lists</h3>
              <p className="text-gray-600">
                Create shared grocery lists that update in real-time. Anyone in the family can add items, check them off, and see what's needed at a glance.
              </p>
            </div>
            <div className="flex flex-col items-center text-center p-6 bg-gray-50 rounded-xl transition hover:shadow-lg">
              <div className="p-4 bg-blue-100 text-blue-600 rounded-full">
                <Wallet size={32} />
              </div>
              <h3 className="text-2xl font-semibold text-gray-800 mt-5 mb-2">Expense Tracking</h3>
              <p className="text-gray-600">
                Log every purchase with categories. See exactly where your money is going with weekly and monthly spending charts and summaries.
              </p>
            </div>
            <div className="flex flex-col items-center text-center p-6 bg-gray-50 rounded-xl transition hover:shadow-lg">
              <div className="p-4 bg-purple-100 text-purple-600 rounded-full">
                <Users size={32} />
              </div>
              <h3 className="text-2xl font-semibold text-gray-800 mt-5 mb-2">Family Hub</h3>
              <p className="text-gray-600">
                Manage multiple family groups, see who's spending what, and keep a shared budget. Set goals and see a feed of all family activity.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how" className="bg-gray-50 py-24 border-y flex-shrink-0">
        <div className="max-w-7xl mx-auto px-6">
          <h3 className="text-4xl font-bold text-center mb-16">How It Works</h3>
          <div className="flex flex-wrap justify-center gap-10">
            <div className="w-80 p-8 rounded-xl shadow-md text-center bg-white hover:shadow-xl transition">
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-blue-100 flex items-center justify-center text-blue-500">
                <Users size={40} />
              </div>
              <h4 className="text-2xl font-semibold mb-3">Add Family</h4>
              <p className="text-gray-600">
                Invite your family members and manage things together.
              </p>
            </div>
            <div className="w-80 p-8 rounded-xl shadow-md text-center bg-white hover:shadow-xl transition">
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-green-100 flex items-center justify-center text-green-500">
                <ShoppingCart size={40} />
              </div>
              <h4 className="text-2xl font-semibold mb-3">Shared Lists</h4>
              <p className="text-gray-600">
                Maintain personal and family grocery lists with real-time
                updates.
              </p>
            </div>
            <div className="w-80 p-8 rounded-xl shadow-md text-center bg-white hover:shadow-xl transition">
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

      <Footer />
    </div>
  );
};

export default HomePage;

