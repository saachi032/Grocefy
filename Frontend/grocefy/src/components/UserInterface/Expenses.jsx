import React, { useState, useMemo } from 'react';
import { format, startOfWeek, endOfWeek, addWeeks, subWeeks, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay } from 'date-fns';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import { Link } from 'react-router-dom';

import UserNavbar from './UserNavbar.jsx';
import { Plus, ChevronLeft, ChevronRight, Calendar, CreditCard, Wallet, Landmark } from 'lucide-react';

// --- MOCK DATA ---
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
        <div className="flex items-center gap-2 text-gray-600">
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
      .sort((a, b) => new Date(a.date) - new Date(b.date));
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
    <div className="bg-gray-100 min-h-screen font-sans">
      <UserNavbar />
      <main className="w-full max-w-5xl mx-auto px-4 py-12">
        <header className="flex flex-col md:flex-row items-center justify-between gap-6 mb-8">
            <Link to="/expenses/add" className="w-full md:w-auto flex items-center justify-center gap-2 px-6 py-4 bg-green-600 text-white font-bold rounded-xl hover:bg-green-500 transition-transform transform hover:scale-105 shadow-lg order-1 md:order-none">
                <Plus size={24} />
                <span className="text-lg">Add Expense</span>
            </Link>
            <div className="flex items-center gap-2">
                <button onClick={goToPreviousWeek} className="p-2 rounded-full hover:bg-gray-200 transition-colors"><ChevronLeft size={24} /></button>
                <div className="relative">
                    <button onClick={() => setPickerOpen(!isPickerOpen)} className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors">
                        <h1 className="text-xl sm:text-2xl font-bold text-gray-800 text-center w-52 sm:w-auto">{weekTitle}</h1>
                        <Calendar size={20} className="text-gray-500" />
                    </button>
                    {isPickerOpen && (
                        <div className="absolute top-full mt-2 bg-white rounded-xl shadow-2xl z-20 right-0 md:right-auto md:left-0">
                            <DayPicker 
                                mode="single" 
                                selected={currentDate} 
                                onSelect={(date) => { if(date) { setCurrentDate(date); setPickerOpen(false); } }} 
                                initialFocus
                            />
                        </div>
                    )}
                </div>
                <button onClick={goToNextWeek} className="p-2 rounded-full hover:bg-gray-200 transition-colors"><ChevronRight size={24} /></button>
            </div>
        </header>

        {/* --- CHANGED: overflow-hidden changed to overflow-x-auto --- */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-x-auto">
          {/* --- CHANGED: Added min-w-[640px] to force scroll on small screens --- */}
          <table className="w-full min-w-[640px]">
            <thead className="bg-gray-50 text-left text-sm font-semibold text-gray-600">
              <tr>
                <th className="p-4">Date</th>
                <th className="p-4">Day</th>
                <th className="p-4 w-2/5">Item</th>
                <th className="p-4">Method</th>
                <th className="p-4 text-right">Amount</th>
              </tr>
            </thead>
            <tbody>
              {weekExpenses.length > 0 ? (
                weekExpenses.map(exp => (
                  <tr key={exp.id} className="border-b border-gray-100">
                    {/* --- CHANGED: Added whitespace-nowrap --- */}
                    <td className="p-4 text-gray-700 whitespace-nowrap">{format(new Date(exp.date), 'dd-MM-yyyy')}</td>
                    <td className="p-4 text-gray-700 whitespace-nowrap">{format(new Date(exp.date), 'EEEE')}</td>
                    <td className="p-4 font-semibold text-gray-900">{exp.item}</td>
                    <td className="p-4"><PaymentInfo method={exp.method} /></td>
                    {/* --- CHANGED: Added whitespace-nowrap --- */}
                    <td className="p-4 font-bold text-gray-900 text-right whitespace-nowrap">₹{exp.amount.toLocaleString('en-IN')}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center py-16 text-gray-500">
                    No expenses recorded for this week.
                  </td>
                </tr>
              )}
            </tbody>
            <tfoot className="bg-gray-50 font-bold">
                <tr>
                    <td colSpan="4" className="p-4 text-right text-gray-700">Total for the Week:</td>
                    <td className="p-4 text-right text-lg text-gray-900">₹{weeklyTotal.toLocaleString('en-IN')}</td>
                </tr>
            </tfoot>
          </table>
        </div>
        
        <section className="bg-white p-4 md:p-6 mt-8 rounded-2xl border border-gray-200 shadow-sm">
            <h2 className="text-xl font-bold text-gray-800 mb-4">
                Monthly Overview for {format(currentDate, 'MMMM')}
            </h2>
            <ResponsiveContainer width="100%" height={250}>
                <BarChart data={monthlyData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="name" tick={{ fill: '#6b7280' }} fontSize={12} />
                    <YAxis tickFormatter={(value) => `₹${value/1000}k`} tick={{ fill: '#6b7280' }} fontSize={12} />
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