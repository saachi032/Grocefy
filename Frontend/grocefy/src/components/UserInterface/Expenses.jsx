import React, { useState, useMemo, useEffect } from 'react';
import { format, startOfWeek, endOfWeek, addWeeks, subWeeks, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay } from 'date-fns';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import { Link } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext.jsx';
import { useAuth } from '../../context/AuthContext.jsx';

import UserNavbar from './UserNavbar.jsx';
import { Plus, ChevronLeft, ChevronRight, Calendar, CreditCard, Wallet, Landmark, Trash2, Target, Settings, X, Save, TrendingUp, TrendingDown, AlertCircle } from 'lucide-react';

const PaymentInfo = ({ method }) => {
    let Icon;
    switch (method) {
        case 'Card': Icon = CreditCard; break;
        case 'UPI': Icon = Landmark; break;
        case 'Cash': Icon = Wallet; break;
        default: Icon = Wallet;
    }
    return (
        <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
            <Icon size={18} />
            <span>{method}</span>
        </div>
    );
};

const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-gray-800 text-white p-2 rounded-md shadow-lg">
          <p>{`Spending: ₹${payload[0].value.toLocaleString('en-IN')}`}</p>
        </div>
      );
    }
    return null;
};

// Budget Setup Modal Component
const BudgetSetupModal = ({ isOpen, onClose, onSave, budget, isDark, saving }) => {
  const [activeTab, setActiveTab] = useState('weekly');
  const [weeklyBudget, setWeeklyBudget] = useState(budget?.weeklyBudget || 0);
  const [monthlyBudget, setMonthlyBudget] = useState(budget?.monthlyBudget || 0);

  useEffect(() => {
    if (budget) {
      setWeeklyBudget(budget.weeklyBudget || 0);
      setMonthlyBudget(budget.monthlyBudget || 0);
    }
  }, [budget, isOpen]);

  if (!isOpen) return null;

  const handleSave = () => {
    onSave({
      weeklyBudget: parseFloat(weeklyBudget) || 0,
      monthlyBudget: parseFloat(monthlyBudget) || 0,
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div 
        className={`${isDark ? 'bg-gray-800' : 'bg-white'} w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className={`${isDark ? 'bg-gradient-to-r from-green-600 to-green-700' : 'bg-gradient-to-r from-green-500 to-green-600'} p-6 text-white`}>
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold flex items-center gap-2">
                <Target size={24} />
                Set Up Budget
              </h2>
              <p className="text-green-100 mt-1">Track your spending with weekly or monthly limits</p>
            </div>
            <button
              onClick={onClose}
              className="text-white hover:bg-white/20 rounded-full p-2 transition-colors"
            >
              <X size={24} />
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className={`flex border-b ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
          <button
            onClick={() => setActiveTab('weekly')}
            className={`flex-1 px-6 py-4 font-semibold transition-colors ${
              activeTab === 'weekly'
                ? `${isDark ? 'text-green-400 border-b-2 border-green-400' : 'text-green-600 border-b-2 border-green-600'}`
                : `${isDark ? 'text-gray-400 hover:text-gray-300' : 'text-gray-500 hover:text-gray-700'}`
            }`}
          >
            Weekly Budget
          </button>
          <button
            onClick={() => setActiveTab('monthly')}
            className={`flex-1 px-6 py-4 font-semibold transition-colors ${
              activeTab === 'monthly'
                ? `${isDark ? 'text-green-400 border-b-2 border-green-400' : 'text-green-600 border-b-2 border-green-600'}`
                : `${isDark ? 'text-gray-400 hover:text-gray-300' : 'text-gray-500 hover:text-gray-700'}`
            }`}
          >
            Monthly Budget
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {activeTab === 'weekly' ? (
            <div className="space-y-6">
              <div>
                <label className={`block text-sm font-semibold ${isDark ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                  Weekly Budget Amount
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-2xl font-bold text-gray-400">₹</span>
                  <input
                    type="number"
                    value={weeklyBudget}
                    onChange={(e) => setWeeklyBudget(e.target.value)}
                    placeholder="0.00"
                    step="0.01"
                    min="0"
                    className={`w-full pl-12 pr-4 py-4 text-2xl font-bold rounded-xl border-2 focus:ring-2 focus:ring-green-500 outline-none transition-all ${
                      isDark 
                        ? 'bg-gray-700 border-gray-600 text-white focus:border-green-500' 
                        : 'bg-gray-50 border-gray-300 text-gray-900 focus:border-green-500'
                    }`}
                  />
                </div>
                <p className={`text-xs mt-2 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                  Set your maximum spending limit for each week
                </p>
              </div>

              {weeklyBudget > 0 && (
                <div className={`${isDark ? 'bg-green-900/20 border-green-700' : 'bg-green-50 border-green-200'} border rounded-xl p-4`}>
                  <div className="flex items-center gap-2 text-green-700 dark:text-green-300 mb-2">
                    <Target size={18} />
                    <span className="font-semibold">Budget Preview</span>
                  </div>
                  <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                    Your weekly budget is set to <span className="font-bold text-green-600 dark:text-green-400">₹{parseFloat(weeklyBudget || 0).toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span>
                  </p>
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-6">
              <div>
                <label className={`block text-sm font-semibold ${isDark ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                  Monthly Budget Amount
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-2xl font-bold text-gray-400">₹</span>
                  <input
                    type="number"
                    value={monthlyBudget}
                    onChange={(e) => setMonthlyBudget(e.target.value)}
                    placeholder="0.00"
                    step="0.01"
                    min="0"
                    className={`w-full pl-12 pr-4 py-4 text-2xl font-bold rounded-xl border-2 focus:ring-2 focus:ring-green-500 outline-none transition-all ${
                      isDark 
                        ? 'bg-gray-700 border-gray-600 text-white focus:border-green-500' 
                        : 'bg-gray-50 border-gray-300 text-gray-900 focus:border-green-500'
                    }`}
                  />
                </div>
                <p className={`text-xs mt-2 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                  Set your maximum spending limit for each month
                </p>
              </div>

              {monthlyBudget > 0 && (
                <div className={`${isDark ? 'bg-green-900/20 border-green-700' : 'bg-green-50 border-green-200'} border rounded-xl p-4`}>
                  <div className="flex items-center gap-2 text-green-700 dark:text-green-300 mb-2">
                    <Target size={18} />
                    <span className="font-semibold">Budget Preview</span>
                  </div>
                  <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                    Your monthly budget is set to <span className="font-bold text-green-600 dark:text-green-400">₹{parseFloat(monthlyBudget || 0).toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span>
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-3 mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
            <button
              onClick={onClose}
              className={`flex-1 px-6 py-3 ${isDark ? 'bg-gray-700 hover:bg-gray-600 text-gray-300' : 'bg-gray-200 hover:bg-gray-300 text-gray-700'} font-semibold rounded-xl transition-colors`}
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              disabled={saving}
              className="flex-1 px-6 py-3 bg-gradient-to-r from-green-600 to-green-700 text-white font-bold rounded-xl hover:from-green-500 hover:to-green-600 transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {saving ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  Saving...
                </>
              ) : (
                <>
                  <Save size={20} />
                  Save Budget
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Budget Status Card Component
const BudgetStatusCard = ({ budget, spending, period, isDark, onSetup }) => {
  const budgetAmount = period === 'weekly' ? budget?.weeklyBudget : budget?.monthlyBudget;
  const remaining = budgetAmount > 0 ? budgetAmount - spending : 0;
  const percentage = budgetAmount > 0 ? (spending / budgetAmount) * 100 : 0;
  const isOverBudget = spending > budgetAmount;
  const statusColor = isOverBudget 
    ? 'red' 
    : percentage >= 90 
      ? 'orange' 
      : percentage >= 75 
        ? 'yellow' 
        : 'green';

  if (!budgetAmount || budgetAmount === 0) {
    return (
      <div className={`${isDark ? 'bg-gradient-to-br from-gray-800 to-gray-900 border-gray-700' : 'bg-gradient-to-br from-white to-gray-50 border-gray-200'} border rounded-2xl p-6 shadow-lg transition-all hover:shadow-xl`}>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className={`p-3 ${isDark ? 'bg-gray-700' : 'bg-gray-100'} rounded-xl`}>
              <Target size={24} className="text-gray-500" />
            </div>
            <div>
              <h3 className={`text-lg font-bold ${isDark ? 'text-white' : 'text-gray-800'}`}>
                {period === 'weekly' ? 'Weekly' : 'Monthly'} Budget
              </h3>
              <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Not set up yet</p>
            </div>
          </div>
        </div>
        <button
          onClick={onSetup}
          className="w-full mt-4 px-6 py-3 bg-gradient-to-r from-green-600 to-green-700 text-white font-bold rounded-xl hover:from-green-500 hover:to-green-600 transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
        >
          <Settings size={20} />
          Set Up Budget
        </button>
      </div>
    );
  }

  return (
    <div className={`${isDark ? 'bg-gradient-to-br from-gray-800 to-gray-900 border-gray-700' : 'bg-gradient-to-br from-white to-gray-50 border-gray-200'} border rounded-2xl p-6 shadow-lg transition-all hover:shadow-xl`}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className={`p-3 ${
            statusColor === 'green' ? 'bg-green-100 dark:bg-green-900/30' :
            statusColor === 'yellow' ? 'bg-yellow-100 dark:bg-yellow-900/30' :
            statusColor === 'orange' ? 'bg-orange-100 dark:bg-orange-900/30' :
            'bg-red-100 dark:bg-red-900/30'
          } rounded-xl`}>
            <Target size={24} className={
              statusColor === 'green' ? 'text-green-600 dark:text-green-400' :
              statusColor === 'yellow' ? 'text-yellow-600 dark:text-yellow-400' :
              statusColor === 'orange' ? 'text-orange-600 dark:text-orange-400' :
              'text-red-600 dark:text-red-400'
            } />
          </div>
          <div>
            <h3 className={`text-lg font-bold ${isDark ? 'text-white' : 'text-gray-800'}`}>
              {period === 'weekly' ? 'Weekly' : 'Monthly'} Budget
            </h3>
            <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
              {isOverBudget ? 'Over budget' : `${remaining.toLocaleString('en-IN', { minimumFractionDigits: 2 })} remaining`}
            </p>
          </div>
        </div>
        <button
          onClick={onSetup}
          className={`p-2 ${isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-100'} rounded-lg transition-colors`}
          title="Edit budget"
        >
          <Settings size={18} className={isDark ? 'text-gray-400' : 'text-gray-500'} />
        </button>
      </div>

      {/* Progress Bar */}
      <div className="mb-4">
        <div className="flex justify-between items-center mb-2">
          <span className={`text-sm font-semibold ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
            Spent: ₹{spending.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
          </span>
          <span className={`text-sm font-bold ${
            statusColor === 'green' ? 'text-green-600 dark:text-green-400' :
            statusColor === 'yellow' ? 'text-yellow-600 dark:text-yellow-400' :
            statusColor === 'orange' ? 'text-orange-600 dark:text-orange-400' :
            'text-red-600 dark:text-red-400'
          }`}>
            {percentage.toFixed(1)}%
          </span>
        </div>
        <div className={`w-full ${isDark ? 'bg-gray-700' : 'bg-gray-200'} rounded-full h-4 overflow-hidden shadow-inner`}>
          <div 
            className={`h-4 rounded-full transition-all duration-500 ${
              statusColor === 'green' ? 'bg-gradient-to-r from-green-500 to-green-600' :
              statusColor === 'yellow' ? 'bg-gradient-to-r from-yellow-500 to-yellow-600' :
              statusColor === 'orange' ? 'bg-gradient-to-r from-orange-500 to-orange-600' :
              'bg-gradient-to-r from-red-500 to-red-600'
            } shadow-lg`}
            style={{ width: `${Math.min(percentage, 100)}%` }}
          >
            {percentage > 100 && (
              <div className="w-full h-full bg-red-600 animate-pulse"></div>
            )}
          </div>
        </div>
        <div className="flex justify-between items-center mt-2">
          <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
            Budget: ₹{budgetAmount.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
          </span>
          {isOverBudget && (
            <span className="text-xs font-semibold text-red-600 dark:text-red-400 flex items-center gap-1">
              <AlertCircle size={14} />
              Over by ₹{Math.abs(remaining).toLocaleString('en-IN', { minimumFractionDigits: 2 })}
            </span>
          )}
        </div>
      </div>

      {/* Status Message */}
      <div className={`${
        statusColor === 'green' ? `${isDark ? 'bg-green-900/20 border-green-700' : 'bg-green-50 border-green-200'}` :
        statusColor === 'yellow' ? `${isDark ? 'bg-yellow-900/20 border-yellow-700' : 'bg-yellow-50 border-yellow-200'}` :
        statusColor === 'orange' ? `${isDark ? 'bg-orange-900/20 border-orange-700' : 'bg-orange-50 border-orange-200'}` :
        `${isDark ? 'bg-red-900/20 border-red-700' : 'bg-red-50 border-red-200'}`
      } border rounded-lg p-3 flex items-start gap-2`}>
        {isOverBudget ? (
          <>
            <TrendingUp size={18} className="text-red-600 dark:text-red-400 mt-0.5" />
            <div>
              <p className={`text-sm font-semibold ${
                statusColor === 'red' ? 'text-red-700 dark:text-red-300' : ''
              }`}>
                Budget Exceeded!
              </p>
              <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'} mt-1`}>
                You've exceeded your budget. Consider reviewing your expenses.
              </p>
            </div>
          </>
        ) : percentage >= 90 ? (
          <>
            <AlertCircle size={18} className="text-orange-600 dark:text-orange-400 mt-0.5" />
            <div>
              <p className={`text-sm font-semibold ${
                statusColor === 'orange' ? 'text-orange-700 dark:text-orange-300' : ''
              }`}>
                Almost There!
              </p>
              <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'} mt-1`}>
                You're close to your budget limit. Spend wisely!
              </p>
            </div>
          </>
        ) : percentage >= 75 ? (
          <>
            <TrendingUp size={18} className="text-yellow-600 dark:text-yellow-400 mt-0.5" />
            <div>
              <p className={`text-sm font-semibold ${
                statusColor === 'yellow' ? 'text-yellow-700 dark:text-yellow-300' : ''
              }`}>
                On Track
              </p>
              <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'} mt-1`}>
                You're doing well! Keep monitoring your spending.
              </p>
            </div>
          </>
        ) : (
          <>
            <TrendingDown size={18} className="text-green-600 dark:text-green-400 mt-0.5" />
            <div>
              <p className={`text-sm font-semibold ${
                statusColor === 'green' ? 'text-green-700 dark:text-green-300' : ''
              }`}>
                Great Job!
              </p>
              <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'} mt-1`}>
                You're well within your budget. Keep it up!
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

const Expenses = () => {
  const { isDarkMode } = useTheme();
  const { user } = useAuth();
  const [expenses, setExpenses] = useState([]);
  const [budget, setBudget] = useState(null);
  const [loading, setLoading] = useState(true);
  const [budgetLoading, setBudgetLoading] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [isPickerOpen, setPickerOpen] = useState(false);
  const [showBudgetModal, setShowBudgetModal] = useState(false);
  const [savingBudget, setSavingBudget] = useState(false);

  // Fetch expenses and budget from backend
  useEffect(() => {
    const fetchData = async () => {
      if (!user?.token) {
        setLoading(false);
        return;
      }

      try {
        const [expensesRes, budgetRes] = await Promise.all([
          fetch('/api/expenses', {
            headers: {
              'Authorization': `Bearer ${user.token}`,
              'Content-Type': 'application/json',
            },
          }),
          fetch('/api/budgets', {
            headers: {
              'Authorization': `Bearer ${user.token}`,
              'Content-Type': 'application/json',
            },
          }),
        ]);

        if (expensesRes.ok) {
          const expensesData = await expensesRes.json();
          if (expensesData.success) {
            const formattedExpenses = expensesData.expenses.map(exp => ({
              ...exp,
              date: exp.date ? new Date(exp.date).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
            }));
            setExpenses(formattedExpenses);
          }
        }

        if (budgetRes.ok) {
          const budgetData = await budgetRes.json();
          if (budgetData.success) {
            setBudget(budgetData.budget);
          }
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user]);

  const deleteExpense = async (expenseId) => {
    if (!window.confirm('Are you sure you want to delete this expense?')) {
      return;
    }

    try {
      const response = await fetch(`/api/expenses/${expenseId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${user.token}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        setExpenses(expenses.filter(exp => exp._id !== expenseId));
        // Refresh budget to update spending
        const budgetRes = await fetch('/api/budgets', {
          headers: {
            'Authorization': `Bearer ${user.token}`,
            'Content-Type': 'application/json',
          },
        });
        if (budgetRes.ok) {
          const budgetData = await budgetRes.json();
          if (budgetData.success) {
            setBudget(budgetData.budget);
          }
        }
      } else {
        alert('Failed to delete expense');
      }
    } catch (error) {
      console.error('Error deleting expense:', error);
      alert('Error deleting expense');
    }
  };

  const handleSaveBudget = async (budgetData) => {
    if (!user?.token) return;

    setSavingBudget(true);
    try {
      const response = await fetch('/api/budgets', {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${user.token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(budgetData),
      });

      const data = await response.json();
      if (data.success) {
        setBudget(data.budget);
        setShowBudgetModal(false);
      } else {
        alert(data.message || 'Failed to save budget');
      }
    } catch (error) {
      console.error('Error saving budget:', error);
      alert('Error saving budget');
    } finally {
      setSavingBudget(false);
    }
  };

  const { weekExpenses, weeklyTotal, weekTitle, monthlyData, monthlyTotal } = useMemo(() => {
    const start = startOfWeek(currentDate, { weekStartsOn: 1 });
    const end = endOfWeek(currentDate, { weekStartsOn: 1 });
    const weekExpenses = expenses
      .filter(exp => {
        const expDate = new Date(exp.date);
        return expDate >= start && expDate <= end;
      })
      .sort((a, b) => new Date(b.date) - new Date(a.date));
    const weeklyTotal = weekExpenses.reduce((sum, exp) => sum + exp.amount, 0);
    const weekTitle = `${format(start, 'd MMM')} - ${format(end, 'd MMM, yyyy')}`;
    const startMonth = startOfMonth(currentDate);
    const endMonth = endOfMonth(currentDate);
    const expensesInMonth = expenses.filter(e => {
      const expDate = new Date(e.date);
      return expDate >= startMonth && expDate <= endMonth;
    });
    const monthlyTotal = expensesInMonth.reduce((sum, exp) => sum + exp.amount, 0);
    const daysInMonth = eachDayOfInterval({ start: startMonth, end: endMonth });
    const monthlyData = daysInMonth.map(day => ({
      name: format(day, 'd'),
      spending: expensesInMonth
        .filter(exp => isSameDay(new Date(exp.date), day))
        .reduce((sum, exp) => sum + exp.amount, 0),
    }));
    return { weekExpenses, weeklyTotal, weekTitle, monthlyData, monthlyTotal };
  }, [currentDate, expenses]);

  const goToPreviousWeek = () => setCurrentDate(subWeeks(currentDate, 1));
  const goToNextWeek = () => setCurrentDate(addWeeks(currentDate, 1));

  if (loading) {
    return (
      <div className={`${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'} min-h-screen font-sans transition-colors duration-300`}>
        <UserNavbar />
        <main className="w-full max-w-5xl mx-auto px-4 py-12 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
            <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Loading expenses...</p>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className={`${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'} min-h-screen font-sans transition-colors duration-300`}>
      <UserNavbar />
      <main className="w-full max-w-5xl mx-auto px-4 py-12">
        <header className="flex flex-col md:flex-row items-center justify-between gap-6 mb-8">
            <Link to="/expenses/add" className="w-full md:w-auto flex items-center justify-center gap-2 px-6 py-3 bg-green-600 text-white font-bold rounded-xl hover:bg-green-500 transition-transform transform hover:scale-105 shadow-lg order-1 md:order-none">
                <Plus size={22} />
                <span className="text-lg">Add Expense</span>
            </Link>
            <div className={`flex items-center gap-2 ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white'} p-1 rounded-full border ${isDarkMode ? 'border-gray-700' : ''} transition-colors`}>
                <button onClick={goToPreviousWeek} className={`p-2 rounded-full hover:bg-gray-100 ${isDarkMode ? 'hover:bg-gray-700' : ''} transition-colors`}>
                  <ChevronLeft size={24} className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}/>
                </button>
                <div className="relative">
                    <button onClick={() => setPickerOpen(!isPickerOpen)} className={`flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-gray-100 ${isDarkMode ? 'hover:bg-gray-700' : ''} transition-colors`}>
                        <h1 className={`text-xl sm:text-2xl font-bold ${isDarkMode ? 'text-gray-100' : 'text-gray-800'} text-center w-52 sm:w-auto`}>{weekTitle}</h1>
                        <Calendar size={20} className={isDarkMode ? 'text-gray-400' : 'text-gray-500'} />
                    </button>
                    {isPickerOpen && (
                        <div className={`absolute top-full mt-2 ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white'} rounded-xl shadow-2xl z-20 right-0 md:right-auto md:left-0 border transition-colors`}>
                            <DayPicker 
                                mode="single" 
                                selected={currentDate} 
                                onSelect={(date) => { if(date) { setCurrentDate(date); setPickerOpen(false); } }} 
                                initialFocus
                            />
                        </div>
                    )}
                </div>
                <button onClick={goToNextWeek} className={`p-2 rounded-full hover:bg-gray-100 ${isDarkMode ? 'hover:bg-gray-700' : ''} transition-colors`}>
                  <ChevronRight size={24} className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}/>
                </button>
            </div>
        </header>

        {/* Budget Status Cards */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <BudgetStatusCard
            budget={budget}
            spending={weeklyTotal}
            period="weekly"
            isDark={isDarkMode}
            onSetup={() => setShowBudgetModal(true)}
          />
          <BudgetStatusCard
            budget={budget}
            spending={monthlyTotal}
            period="monthly"
            isDark={isDarkMode}
            onSetup={() => setShowBudgetModal(true)}
          />
        </section>
        
        {/* --- REDESIGNED TABLE CONTAINER --- */}
        <div className={`rounded-xl border ${isDarkMode ? 'border-gray-700' : 'border-gray-200'} overflow-hidden shadow-sm transition-colors mb-8`}>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[640px]">
              {/* --- STICKY HEADER --- */}
              <thead className={`sticky top-0 ${isDarkMode ? 'bg-gray-800/75' : 'bg-gray-100/75'} backdrop-blur-sm transition-colors`}>
                <tr>
                  <th className={`px-4 py-3 text-left text-sm font-semibold ${isDarkMode ? 'text-gray-300' : 'text-gray-600'} tracking-wider`}>Date</th>
                  <th className={`px-4 py-3 text-left text-sm font-semibold ${isDarkMode ? 'text-gray-300' : 'text-gray-600'} tracking-wider`}>Item</th>
                  <th className={`px-4 py-3 text-left text-sm font-semibold ${isDarkMode ? 'text-gray-300' : 'text-gray-600'} tracking-wider`}>Method</th>
                  <th className={`px-4 py-3 text-right text-sm font-semibold ${isDarkMode ? 'text-gray-300' : 'text-gray-600'} tracking-wider`}>Amount</th>
                  <th className={`px-4 py-3 text-center text-sm font-semibold ${isDarkMode ? 'text-gray-300' : 'text-gray-600'} tracking-wider`}>Action</th>
                </tr>
              </thead>
              <tbody>
                {weekExpenses.length > 0 ? (
                  weekExpenses.map((exp, index) => (
                    // --- ALTERNATING & HOVERABLE ROWS ---
                    <tr key={exp._id || exp.id} className={`transition-colors duration-200 ${isDarkMode ? (index % 2 === 0 ? 'bg-gray-900/50' : 'bg-gray-800/50') : (index % 2 === 0 ? 'bg-white' : 'bg-gray-50')} hover:${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'} transition-colors`}>
                      {/* --- COMPACT PADDING & REFINED TEXT --- */}
                      <td className="px-4 py-3 whitespace-nowrap">
                        <p className={`font-semibold ${isDarkMode ? 'text-gray-100' : 'text-gray-800'}`}>{format(new Date(exp.date), 'dd-MM-yyyy')}</p>
                        <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>{format(new Date(exp.date), 'EEEE')}</p>
                      </td>
                      <td className={`px-4 py-3 font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{exp.item}</td>
                      <td className="px-4 py-3"><PaymentInfo method={exp.method} /></td>
                      <td className={`px-4 py-3 font-bold ${isDarkMode ? 'text-gray-100' : 'text-gray-900'} text-right whitespace-nowrap`}>
                        ₹{exp.amount.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </td>
                      <td className="px-4 py-3 text-center">
                        <button
                          onClick={() => deleteExpense(exp._id || exp.id)}
                          className="text-red-500 hover:text-red-700 transition-colors p-1"
                          title="Delete expense"
                        >
                          <Trash2 size={18} />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className={`text-center py-16 ${isDarkMode ? 'text-gray-400 bg-gray-900/50' : 'text-gray-500 bg-white'}`}>
                      No expenses recorded for this week.
                    </td>
                  </tr>
                )}
              </tbody>
              {/* --- STYLED FOOTER --- */}
              <tfoot className={isDarkMode ? 'bg-gray-800' : 'bg-gray-100'} style={{ transition: 'background-color 0.3s' }}>
                  <tr>
                      <td colSpan="3" className={`px-4 py-3 text-right ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} font-semibold`}>Total for the Week:</td>
                      <td className={`px-4 py-3 text-right text-lg ${isDarkMode ? 'text-white' : 'text-gray-900'} font-semibold`}>
                        ₹{weeklyTotal.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </td>
                      <td></td>
                  </tr>
              </tfoot>
            </table>
          </div>
        </div>
        
        <section className={`${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} p-4 md:p-6 rounded-2xl border shadow-sm transition-colors`}>
            <h2 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'} mb-4`}>
                Monthly Overview for {format(currentDate, 'MMMM')}
            </h2>
            <ResponsiveContainer width="100%" height={250}>
                <BarChart data={monthlyData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} className={isDarkMode ? 'stroke-gray-700' : 'stroke-gray-200'}/>
                    <XAxis dataKey="name" tick={{ fill: isDarkMode ? '#9ca3af' : '#6b7280' }} fontSize={12} />
                    <YAxis tickFormatter={(value) => `₹${value/1000}k`} tick={{ fill: isDarkMode ? '#9ca3af' : '#6b7280' }} fontSize={12} />
                    <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(16, 185, 129, 0.1)' }} />
                    <Bar dataKey="spending" fill="#10B981" radius={[4, 4, 0, 0]} />
                </BarChart>
            </ResponsiveContainer>
        </section>
      </main>

      {/* Budget Setup Modal */}
      <BudgetSetupModal
        isOpen={showBudgetModal}
        onClose={() => setShowBudgetModal(false)}
        onSave={handleSaveBudget}
        budget={budget}
        isDark={isDarkMode}
        saving={savingBudget}
      />
    </div>
  );
};

export default Expenses;
