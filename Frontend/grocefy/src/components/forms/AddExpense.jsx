import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UserNavbar from '../UserInterface/UserNavbar.jsx';
import { useAuth } from '../../context/AuthContext.jsx';
import { useTheme } from '../../context/ThemeContext.jsx';
import {
    X, Wallet, Tag, Calendar, User, MessageSquare, CheckCircle
} from 'lucide-react';

// Mock data for "Paid By" dropdown
const familyMembers = [
    { id: 1, name: 'You (Alex)', avatar: '😎' },
    { id: 2, name: 'Riya Sharma', avatar: '👩' },
    { id: 3, name: 'Aarav Sharma', avatar: '🧑' },
];

const AddExpense = () => {
    const navigate = useNavigate();
    const { user } = useAuth();
    const { isDarkMode } = useTheme();
    const [showSuccessToast, setShowSuccessToast] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    // Form state
    const [expenseName, setExpenseName] = useState('');
    const [amount, setAmount] = useState('');
    const [category, setCategory] = useState('Groceries');
    const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
    const [method, setMethod] = useState('Cash');
    const [paidBy, setPaidBy] = useState(familyMembers[0].id);
    const [notes, setNotes] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        if (!user?.token) {
            setError('Please log in to add expenses');
            setLoading(false);
            return;
        }

        try {
            const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/expenses`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`,
                },
                body: JSON.stringify({
                    item: expenseName,
                    amount: parseFloat(amount),
                    date: date,
                    method: method,
                    category: category,
                    paidBy: paidBy.toString(),
                    notes: notes,
                }),
            });

            const data = await response.json();

            if (response.ok && data.success) {
                // Trigger success toast
                setShowSuccessToast(true);
                
                // Hide toast and navigate back after a short delay
                setTimeout(() => {
                    setShowSuccessToast(false);
                    navigate('/expenses');
                }, 2000);
            } else {
                setError(data.message || 'Failed to add expense');
            }
        } catch (error) {
            console.error('Error adding expense:', error);
            setError('Network error. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    // --- Success Toast Component ---
    const SuccessToast = () => (
        <div className={`fixed bottom-5 right-5 flex items-center gap-3 ${isDarkMode ? 'bg-gray-800 text-gray-100 border-gray-700' : 'bg-white text-gray-800 border-gray-200'} p-4 rounded-xl shadow-lg border transition-all duration-300 ${showSuccessToast ? 'translate-x-0' : 'translate-x-[calc(100%+20px)]'}`}>
            <CheckCircle size={24} className="text-green-500" />
            <div>
                <p className="font-bold">Expense Added!</p>
                <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>You're keeping the family budget in check.</p>
            </div>
        </div>
    );

    return (
        <div className={`${isDarkMode ? 'bg-gray-900' : 'bg-gray-100'} min-h-screen font-sans transition-colors duration-300`}>
            <UserNavbar />
            {/* Main content area */}
            <div className="w-full flex items-center justify-center py-12 px-4">
                {/* Form Card */}
                <div className={`relative w-full max-w-lg ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} p-8 rounded-2xl border shadow-xl transform transition-all duration-300`}>
                    <button 
                        onClick={() => navigate('/expenses')} 
                        className={`absolute top-4 right-4 ${isDarkMode ? 'text-gray-400 hover:text-gray-200' : 'text-gray-400 hover:text-gray-600'} transition-colors`}
                    >
                        <X size={24} />
                    </button>

                    {/* Header */}
                    <div className="text-center mb-8">
                        <h1 className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>Add New Expense</h1>
                        <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-500'} mt-1`}>Track it before your wallet forgets 😉</p>
                    </div>

                    {error && (
                        <div className="mb-4 bg-red-50 dark:bg-red-900/30 border border-red-300 dark:border-red-700 text-red-700 dark:text-red-300 px-4 py-2 rounded-lg text-sm">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-5">
                        {/* Expense Name */}
                        <div>
                            <label htmlFor="expenseName" className={`block text-sm font-semibold ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} mb-1`}>Expense Name</label>
                            <div className="relative">
                                <input 
                                    type="text" 
                                    id="expenseName" 
                                    value={expenseName} 
                                    onChange={(e) => setExpenseName(e.target.value)} 
                                    placeholder="Milk & Bread run 🥛🍞" 
                                    className={`w-full pl-4 pr-4 py-2.5 ${isDarkMode ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-500' : 'bg-white border-gray-300'} border rounded-lg focus:ring-2 focus:ring-green-500 transition-shadow`}
                                    required
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                            {/* Amount */}
                            <div>
                                <label htmlFor="amount" className={`block text-sm font-semibold ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} mb-1`}>Amount (₹)</label>
                                <div className="relative">
                                    <span className={`absolute left-3 top-1/2 -translate-y-1/2 ${isDarkMode ? 'text-gray-400' : 'text-gray-400'} font-semibold`}>₹</span>
                                    <input 
                                        type="number" 
                                        id="amount" 
                                        value={amount} 
                                        onChange={(e) => setAmount(e.target.value)} 
                                        placeholder="0.00" 
                                        step="0.01"
                                        min="0"
                                        className={`w-full pl-8 pr-4 py-2.5 ${isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'} border rounded-lg focus:ring-2 focus:ring-green-500 transition-shadow`}
                                        required 
                                    />
                                </div>
                            </div>

                            {/* Date */}
                            <div>
                                <label htmlFor="date" className={`block text-sm font-semibold ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} mb-1`}>Date</label>
                                <div className="relative">
                                    <Calendar size={18} className={`absolute left-3 top-1/2 -translate-y-1/2 ${isDarkMode ? 'text-gray-400' : 'text-gray-400'}`} />
                                    <input 
                                        type="date" 
                                        id="date" 
                                        value={date} 
                                        onChange={(e) => setDate(e.target.value)} 
                                        className={`w-full pl-10 pr-4 py-2.5 ${isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'} border rounded-lg focus:ring-2 focus:ring-green-500 transition-shadow`}
                                        required 
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Payment Method */}
                        <div>
                            <label className={`block text-sm font-semibold ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} mb-2`}>Payment Method</label>
                            <div className="flex flex-wrap gap-2">
                                {['Cash', 'Card', 'UPI'].map(methodOption => (
                                    <button 
                                        type="button" 
                                        key={methodOption} 
                                        onClick={() => setMethod(methodOption)} 
                                        className={`px-4 py-1.5 rounded-full font-semibold text-sm transition-colors ${
                                            method === methodOption 
                                                ? 'bg-green-600 text-white' 
                                                : isDarkMode 
                                                    ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' 
                                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                        }`}
                                    >
                                        {methodOption}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Category */}
                        <div>
                            <label className={`block text-sm font-semibold ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} mb-2`}>Category</label>
                            <div className="flex flex-wrap gap-2">
                                {['Groceries', 'Household', 'Misc', 'Dining'].map(cat => (
                                    <button 
                                        type="button" 
                                        key={cat} 
                                        onClick={() => setCategory(cat)} 
                                        className={`px-4 py-1.5 rounded-full font-semibold text-sm transition-colors ${
                                            category === cat 
                                                ? 'bg-green-600 text-white' 
                                                : isDarkMode 
                                                    ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' 
                                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                        }`}
                                    >
                                        {cat}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Paid By */}
                        <div>
                            <label htmlFor="paidBy" className={`block text-sm font-semibold ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} mb-1`}>Paid By</label>
                            <div className="relative">
                                <User size={18} className={`absolute left-3 top-1/2 -translate-y-1/2 ${isDarkMode ? 'text-gray-400' : 'text-gray-400'}`} />
                                <select 
                                    id="paidBy" 
                                    value={paidBy} 
                                    onChange={(e) => setPaidBy(e.target.value)} 
                                    className={`w-full appearance-none ${isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'} pl-10 pr-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-green-500 transition-shadow`}
                                >
                                    {familyMembers.map(member => (
                                        <option key={member.id} value={member.id}>{member.avatar} {member.name}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        
                        {/* Notes */}
                        <div>
                             <label htmlFor="notes" className={`block text-sm font-semibold ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} mb-1`}>Notes (Optional)</label>
                             <textarea 
                                id="notes" 
                                rows="2" 
                                value={notes}
                                onChange={(e) => setNotes(e.target.value)}
                                placeholder="Add a quick note..." 
                                className={`w-full px-4 py-2 ${isDarkMode ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-500' : 'bg-white border-gray-300'} border rounded-lg focus:ring-2 focus:ring-green-500 transition-shadow`}
                             />
                        </div>

                        {/* Actions */}
                        <div className="flex flex-col-reverse sm:flex-row items-center gap-4 pt-4 border-t border-gray-100 dark:border-gray-700">
                            <button 
                                type="button" 
                                onClick={() => navigate('/expenses')} 
                                className={`w-full sm:w-auto font-semibold ${isDarkMode ? 'text-gray-400 hover:text-gray-200' : 'text-gray-600 hover:text-gray-800'} transition-colors`}
                            >
                                Maybe Later
                            </button>
                            <button 
                                type="submit" 
                                disabled={loading}
                                className="w-full sm:w-auto px-8 py-3 bg-green-600 font-bold text-white rounded-lg hover:bg-green-500 transition-all shadow-sm hover:shadow-md transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {loading ? 'Adding...' : 'Add Expense'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>

            {/* Success Toast Notification */}
            <SuccessToast />
        </div>
    );
};

export default AddExpense;
