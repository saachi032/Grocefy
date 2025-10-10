import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UserNavbar from '../UserInterface/UserNavbar.jsx';
import { Wallet, Info, FilePlus2 } from 'lucide-react';

const AddExpense = () => {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Expense form submitted');
    navigate('/expenses');
  };

  return (
    <div className="bg-gray-100 min-h-screen font-sans">
      <UserNavbar />
      <main className="w-full max-w-2xl mx-auto px-4 py-12">
        <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <FilePlus2 size={32} className="text-green-600" />
            <h1 className="text-3xl font-bold text-gray-800">Add a New Expense</h1>
          </div>
          <p className="text-gray-500 mb-8">Log a new transaction to keep your budget up to date.</p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="expenseName" className="block text-sm font-semibold text-gray-700 mb-1">
                Item / Description
              </label>
              <input
                type="text"
                id="expenseName"
                placeholder="e.g., Weekly Groceries, Electricity Bill"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                required
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="amount" className="block text-sm font-semibold text-gray-700 mb-1">
                    Amount (₹)
                  </label>
                  <input
                    type="number"
                    id="amount"
                    placeholder="e.g., 1250.50"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="paymentMethod" className="block text-sm font-semibold text-gray-700 mb-1">
                    Payment Method
                  </label>
                  <select id="paymentMethod" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 bg-white">
                    <option>Credit Card</option>
                    <option>Debit Card</option>
                    <option>UPI</option>
                    <option>Cash</option>
                  </select>
                </div>
            </div>

            <div>
              <label htmlFor="category" className="block text-sm font-semibold text-gray-700 mb-1">
                Category
              </label>
              <select id="category" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 bg-white">
                <option>Groceries</option>
                <option>Household</option>
                <option>Personal</option>
                <option>Utilities</option>
                <option>Miscellaneous</option>
              </select>
            </div>

            <div className="flex justify-end gap-4 pt-4 border-t border-gray-200">
                <button type="button" onClick={() => navigate('/expenses')} className="px-6 py-2 bg-gray-100 font-semibold text-gray-700 rounded-lg hover:bg-gray-200">
                    Cancel
                </button>
                <button type="submit" className="px-8 py-2 bg-green-600 font-bold text-white rounded-lg hover:bg-green-500">
                    Add Expense
                </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default AddExpense;