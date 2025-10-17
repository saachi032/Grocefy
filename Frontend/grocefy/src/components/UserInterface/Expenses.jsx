import React, { useState, useMemo } from 'react';
import { format, startOfWeek, endOfWeek, addWeeks, subWeeks, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay } from 'date-fns';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import { Link } from 'react-router-dom';

import UserNavbar from './UserNavbar.jsx';
import { Plus, ChevronLeft, ChevronRight, Calendar, CreditCard, Wallet, Landmark } from 'lucide-react';

// --- MOCK DATA (No changes) ---
const mockExpenses = [
  { id: 1, date: '2025-10-11', item: 'Grocefy Supermart Haul', method: 'Card', amount: 4850.50 },
  { id: 2, date: '2025-10-11', item: 'Morning Coffee', method: 'UPI', amount: 280.00 },
  { id: 3, date: '2025-10-10', item: 'Team Lunch', method: 'Card', amount: 1800.00 },
  { id: 4, date: '2025-10-08', item: 'Electricity Bill Payment', method: 'UPI', amount: 2250.00 },
  { id: 6, date: '2025-10-06', item: 'Vegetables & Fruits', method: 'Cash', amount: 720.00 },
  { id: 7, date: '2025-10-02', item: 'New Frying Pan', method: 'Card', amount: 1500.00 },
  { id: 8, date: '2025-09-30', item: 'Monthly Groceries', method: 'Card', amount: 6200.00 },
];

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
  const [currentDate, setCurrentDate] = useState(new Date('2025-10-11T12:00:00Z'));
  const [isPickerOpen, setPickerOpen] = useState(false);

  const { weekExpenses, weeklyTotal, weekTitle, monthlyData } = useMemo(() => {
    const start = startOfWeek(currentDate, { weekStartsOn: 1 });
    const end = endOfWeek(currentDate, { weekStartsOn: 1 });
    const weekExpenses = mockExpenses
      .filter(exp => new Date(exp.date) >= start && new Date(exp.date) <= end)
      .sort((a, b) => new Date(b.date) - new Date(a.date)); // Sort descending
    const weeklyTotal = weekExpenses.reduce((sum, exp) => sum + exp.amount, 0);
    const weekTitle = `${format(start, 'd MMM')} - ${format(end, 'd MMM, yyyy')}`;
    const startMonth = startOfMonth(currentDate);
    const endMonth = endOfMonth(currentDate);
    const expensesInMonth = mockExpenses.filter(e => new Date(e.date) >= startMonth && new Date(e.date) <= endMonth);
    const daysInMonth = eachDayOfInterval({ start: startMonth, end: endMonth });
    const monthlyData = daysInMonth.map(day => ({
      name: format(day, 'd'),
      spending: expensesInMonth
        .filter(exp => isSameDay(new Date(exp.date), day))
        .reduce((sum, exp) => sum + exp.amount, 0),
    }));
    return { weekExpenses, weeklyTotal, weekTitle, monthlyData };
  }, [currentDate]);

  const goToPreviousWeek = () => setCurrentDate(subWeeks(currentDate, 1));
  const goToNextWeek = () => setCurrentDate(addWeeks(currentDate, 1));

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen font-sans transition-colors duration-300">
      <UserNavbar />
      <main className="w-full max-w-5xl mx-auto px-4 py-12">
        <header className="flex flex-col md:flex-row items-center justify-between gap-6 mb-8">
            <Link to="/expenses/add" className="w-full md:w-auto flex items-center justify-center gap-2 px-6 py-3 bg-green-600 text-white font-bold rounded-xl hover:bg-green-500 transition-transform transform hover:scale-105 shadow-lg order-1 md:order-none">
                <Plus size={22} />
                <span className="text-lg">Add Expense</span>
            </Link>
            <div className="flex items-center gap-2 bg-white dark:bg-gray-800 p-1 rounded-full border dark:border-gray-700">
                <button onClick={goToPreviousWeek} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"><ChevronLeft size={24} className="text-gray-600 dark:text-gray-300"/></button>
                <div className="relative">
                    <button onClick={() => setPickerOpen(!isPickerOpen)} className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                        <h1 className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-gray-100 text-center w-52 sm:w-auto">{weekTitle}</h1>
                        <Calendar size={20} className="text-gray-500 dark:text-gray-400" />
                    </button>
                    {isPickerOpen && (
                        <div className="absolute top-full mt-2 bg-white dark:bg-gray-800 rounded-xl shadow-2xl z-20 right-0 md:right-auto md:left-0 border dark:border-gray-700">
                            <DayPicker 
                                mode="single" 
                                selected={currentDate} 
                                onSelect={(date) => { if(date) { setCurrentDate(date); setPickerOpen(false); } }} 
                                initialFocus
                            />
                        </div>
                    )}
                </div>
                <button onClick={goToNextWeek} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"><ChevronRight size={24} className="text-gray-600 dark:text-gray-300"/></button>
            </div>
        </header>
        
        {/* --- REDESIGNED TABLE CONTAINER --- */}
        <div className="rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[640px]">
              {/* --- STICKY HEADER --- */}
              <thead className="sticky top-0 bg-gray-100/75 dark:bg-gray-800/75 backdrop-blur-sm">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600 dark:text-gray-300 tracking-wider">Date</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600 dark:text-gray-300 tracking-wider">Item</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600 dark:text-gray-300 tracking-wider">Method</th>
                  <th className="px-4 py-3 text-right text-sm font-semibold text-gray-600 dark:text-gray-300 tracking-wider">Amount</th>
                </tr>
              </thead>
              <tbody>
                {weekExpenses.length > 0 ? (
                  weekExpenses.map((exp, index) => (
                    // --- ALTERNATING & HOVERABLE ROWS ---
                    <tr key={exp.id} className="transition-colors duration-200 odd:bg-white even:bg-gray-50 dark:odd:bg-gray-900/50 dark:even:bg-gray-800/50 hover:bg-gray-100 dark:hover:bg-gray-700">
                      {/* --- COMPACT PADDING & REFINED TEXT --- */}
                      <td className="px-4 py-3 whitespace-nowrap">
                        <p className="font-semibold text-gray-800 dark:text-gray-100">{format(new Date(exp.date), 'dd-MM-yyyy')}</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{format(new Date(exp.date), 'EEEE')}</p>
                      </td>
                      <td className="px-4 py-3 font-semibold text-gray-900 dark:text-white">{exp.item}</td>
                      <td className="px-4 py-3"><PaymentInfo method={exp.method} /></td>
                      <td className="px-4 py-3 font-bold text-gray-900 dark:text-gray-100 text-right whitespace-nowrap">
                        ₹{exp.amount.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="text-center py-16 text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-900/50">
                      No expenses recorded for this week.
                    </td>
                  </tr>
                )}
              </tbody>
              {/* --- STYLED FOOTER --- */}
              <tfoot className="bg-gray-100 dark:bg-gray-800 font-semibold">
                  <tr>
                      <td colSpan="3" className="px-4 py-3 text-right text-gray-700 dark:text-gray-300">Total for the Week:</td>
                      <td className="px-4 py-3 text-right text-lg text-gray-900 dark:text-white">
                        ₹{weeklyTotal.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </td>
                  </tr>
              </tfoot>
            </table>
          </div>
        </div>
        
        <section className="bg-white dark:bg-gray-800 p-4 md:p-6 mt-8 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm">
            <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
                Monthly Overview for {format(currentDate, 'MMMM')}
            </h2>
            <ResponsiveContainer width="100%" height={250}>
                <BarChart data={monthlyData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} className="stroke-gray-200 dark:stroke-gray-700"/>
                    <XAxis dataKey="name" tick={{ fill: '#6b7280' }} fontSize={12} className="dark:fill-gray-400"/>
                    <YAxis tickFormatter={(value) => `₹${value/1000}k`} tick={{ fill: '#6b7280' }} fontSize={12} className="dark:fill-gray-400"/>
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
