import React from 'react';
import UserNavbar from './UserNavbar.jsx';
import Footer from '../Footer.jsx';
import { ShoppingCart, BarChart, Users, PlusCircle } from 'lucide-react';

const UserHome = () => {
  const userName = "Saachi"; 

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 animate-fadeInUp">
      <UserNavbar />

      <main className="flex-1 w-full max-w-7xl mx-auto px-6 py-12">
        <div className="mb-10">
          <h1 className="text-4xl font-bold text-gray-800">Welcome back, {userName}!</h1>
          <p className="text-lg text-gray-600 mt-2">Here’s a snapshot of your household activity.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="bg-white p-6 rounded-xl shadow-lg flex items-center gap-5 transition transform hover:-translate-y-1 hover:shadow-2xl">
            <div className="bg-blue-100 p-4 rounded-full text-blue-500">
              <ShoppingCart size={32} />
            </div>
            <div>
              <p className="text-gray-500 text-sm font-medium">Items in Family List</p>
              <p className="text-3xl font-bold text-gray-800">12</p>
            </div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-lg flex items-center gap-5 transition transform hover:-translate-y-1 hover:shadow-2xl">
            <div className="bg-green-100 p-4 rounded-full text-green-500">
              <BarChart size={32} />
            </div>
            <div>
              <p className="text-gray-500 text-sm font-medium">Monthly Spend</p>
              <p className="text-3xl font-bold text-gray-800">$258.40</p>
            </div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-lg flex items-center gap-5 transition transform hover:-translate-y-1 hover:shadow-2xl">
            <div className="bg-purple-100 p-4 rounded-full text-purple-500">
              <Users size={32} />
            </div>
            <div>
              <p className="text-gray-500 text-sm font-medium">Family Members</p>
              <p className="text-3xl font-bold text-gray-800">4</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-8 rounded-xl shadow-lg">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Recent Grocery Lists</h2>
            <button className="flex items-center gap-2 px-5 py-2 bg-green-500 text-white font-semibold rounded-full shadow-md hover:shadow-lg transition transform hover:scale-105 hover:bg-green-600">
              <PlusCircle size={20}/>
              <span>New List</span>
            </button>
          </div>
          <div className="space-y-4">
            <div className="p-4 border rounded-lg hover:bg-gray-50 flex justify-between items-center">
              <div>
                <h3 className="font-semibold text-gray-800">Weekly Groceries</h3>
                <p className="text-sm text-gray-500">12 items - Last updated 2 hours ago</p>
              </div>
              <span className="px-3 py-1 text-sm font-medium text-green-800 bg-green-100 rounded-full">Active</span>
            </div>
             <div className="p-4 border rounded-lg hover:bg-gray-50 flex justify-between items-center">
              <div>
                <h3 className="font-semibold text-gray-800">Party Supplies</h3>
                <p className="text-sm text-gray-500">31 items - Last updated 1 day ago</p>
              </div>
              <span className="px-3 py-1 text-sm font-medium text-gray-800 bg-gray-200 rounded-full">Completed</span>
            </div>
             <div className="p-4 border rounded-lg hover:bg-gray-50 flex justify-between items-center">
              <div>
                <h3 className="font-semibold text-gray-800">Hardware Store Run</h3>
                <p className="text-sm text-gray-500">4 items - Last updated 4 days ago</p>
              </div>
               <span className="px-3 py-1 text-sm font-medium text-gray-800 bg-gray-200 rounded-full">Completed</span>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default UserHome;