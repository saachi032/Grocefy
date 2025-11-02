import React, { useState, useMemo, useEffect } from 'react';
import { format, startOfWeek, endOfWeek, addWeeks, subWeeks, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay } from 'date-fns';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import { Link } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext.jsx';
import { useAuth } from '../../context/AuthContext.jsx';

import UserNavbar from './UserNavbar.jsx';
import { Plus, ChevronLeft, ChevronRight, Calendar, CreditCard, Wallet, Landmark, Trash2 } from 'lucide-react';

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

const Expenses = () => {
  const { isDarkMode } = useTheme();
  const { user } = useAuth();
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [isPickerOpen, setPickerOpen] = useState(false);

  // Fetch expenses from backend
  useEffect(() => {
    const fetchExpenses = async () => {
      if (!user?.token) {
        setLoading(false);
        return;
      }

      try {
        const response = await fetch('/api/expenses', {
          headers: {
            'Authorization': `Bearer ${user.token}`,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch expenses');
        }

        const data = await response.json();
        if (data.success) {
          // Convert date strings to Date objects for compatibility
          const formattedExpenses = data.expenses.map(exp => ({
            ...exp,
            date: exp.date ? new Date(exp.date).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
          }));
          setExpenses(formattedExpenses);
        }
      } catch (error) {
        console.error('Error fetching expenses:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchExpenses();
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
        // Remove expense from state
        setExpenses(expenses.filter(exp => exp._id !== expenseId));
      } else {
        alert('Failed to delete expense');
      }
    } catch (error) {
      console.error('Error deleting expense:', error);
      alert('Error deleting expense');
    }
  };

  const { weekExpenses, weeklyTotal, weekTitle, monthlyData } = useMemo(() => {
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
    const daysInMonth = eachDayOfInterval({ start: startMonth, end: endMonth });
    const monthlyData = daysInMonth.map(day => ({
      name: format(day, 'd'),
      spending: expensesInMonth
        .filter(exp => isSameDay(new Date(exp.date), day))
        .reduce((sum, exp) => sum + exp.amount, 0),
    }));
    return { weekExpenses, weeklyTotal, weekTitle, monthlyData };
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
        
        {/* --- REDESIGNED TABLE CONTAINER --- */}
        <div className={`rounded-xl border ${isDarkMode ? 'border-gray-700' : 'border-gray-200'} overflow-hidden shadow-sm transition-colors`}>
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
        
        <section className={`${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} p-4 md:p-6 mt-8 rounded-2xl border shadow-sm transition-colors`}>
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
    </div>
  );
};

export default Expenses;
