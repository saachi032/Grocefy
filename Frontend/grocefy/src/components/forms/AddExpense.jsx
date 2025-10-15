import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UserNavbar from '../UserInterface/UserNavbar.jsx';
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
    const [showSuccessToast, setShowSuccessToast] = useState(false);

    // Form state
    const [expenseName, setExpenseName] = useState('');
    const [amount, setAmount] = useState('');
    const [category, setCategory] = useState('Groceries');
    const [date, setDate] = useState(new Date().toISOString().split('T')[0]); // Defaults to today
    const [paidBy, setPaidBy] = useState(familyMembers[0].id);

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = { expenseName, amount, category, date, paidBy };
        console.log('Expense Added:', formData);

        // Trigger success toast
        setShowSuccessToast(true);

        // Hide toast and navigate back after a short delay
        setTimeout(() => {
            setShowSuccessToast(false);
            navigate('/expenses');
        }, 2000);
    };

    // --- Success Toast Component ---
    const SuccessToast = () => (
        <div className={`fixed bottom-5 right-5 flex items-center gap-3 bg-white text-gray-800 p-4 rounded-xl shadow-lg border border-gray-200 transition-transform duration-300 ${showSuccessToast ? 'translate-x-0' : 'translate-x-[calc(100%+20px)]'}`}>
            <CheckCircle size={24} className="text-green-500" />
            <div>
                <p className="font-bold">Expense Added!</p>
                <p className="text-sm text-gray-600">You’re keeping the family budget in check.</p>
            </div>
        </div>
    );

    return (
        <div className="bg-gray-100 min-h-screen font-sans">
            <UserNavbar />
            {/* Main content area with a semi-transparent overlay to simulate a modal */}
            <div className="w-full flex items-center justify-center py-12 px-4">
                {/* Form Card */}
                <div className="relative w-full max-w-lg bg-white p-8 rounded-2xl border border-gray-200 shadow-xl transform transition-all duration-300">
                    <button onClick={() => navigate('/expenses')} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
                        <X size={24} />
                    </button>

                    {/* Header */}
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-bold text-gray-800">Add New Expense</h1>
                        <p className="text-gray-500 mt-1">Track it before your wallet forgets 😉</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        {/* Expense Name */}
                        <div>
                            <label htmlFor="expenseName" className="block text-sm font-semibold text-gray-700 mb-1">Expense Name</label>
                            <div className="relative">
                                <input type="text" id="expenseName" value={expenseName} onChange={(e) => setExpenseName(e.target.value)} placeholder="Milk & Bread run 🥛🍞" className="w-full pl-4 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 transition-shadow" required/>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                            {/* Amount */}
                            <div>
                                <label htmlFor="amount" className="block text-sm font-semibold text-gray-700 mb-1">Amount (₹)</label>
                                <div className="relative">
                                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 font-semibold">₹</span>
                                    <input type="number" id="amount" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="0.00" className="w-full pl-8 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 transition-shadow" required />
                                </div>
                            </div>

                            {/* Date */}
                            <div>
                                <label htmlFor="date" className="block text-sm font-semibold text-gray-700 mb-1">Date</label>
                                <div className="relative">
                                    <Calendar size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                    <input type="date" id="date" value={date} onChange={(e) => setDate(e.target.value)} className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 transition-shadow" required />
                                </div>
                            </div>
                        </div>

                        {/* Category */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Category</label>
                            <div className="flex flex-wrap gap-2">
                                {['Groceries 🛒', 'Household 🏠', 'Misc 🎯', 'Dining 🍴'].map(cat => {
                                    const [catName, catEmoji] = cat.split(' ');
                                    return (
                                        <button type="button" key={catName} onClick={() => setCategory(catName)} className={`px-4 py-1.5 rounded-full font-semibold text-sm transition-colors ${category === catName ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}>
                                            {catName} {catEmoji}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Paid By */}
                        <div>
                            <label htmlFor="paidBy" className="block text-sm font-semibold text-gray-700 mb-1">Paid By</label>
                            <div className="relative">
                                <User size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                <select id="paidBy" value={paidBy} onChange={(e) => setPaidBy(e.target.value)} className="w-full appearance-none bg-white pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 transition-shadow">
                                    {familyMembers.map(member => (
                                        <option key={member.id} value={member.id}>{member.avatar} {member.name}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        
                        {/* Notes */}
                        <div>
                             <label htmlFor="notes" className="block text-sm font-semibold text-gray-700 mb-1">Notes (Optional)</label>
                             <textarea id="notes" rows="2" placeholder="Add a quick note..." className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 transition-shadow"></textarea>
                        </div>

                        {/* Actions */}
                        <div className="flex flex-col-reverse sm:flex-row items-center gap-4 pt-4 border-t border-gray-100">
                            <button type="button" onClick={() => navigate('/expenses')} className="w-full sm:w-auto font-semibold text-gray-600 hover:text-gray-800">
                                Maybe Later
                            </button>
                            <button type="submit" className="w-full sm:w-auto px-8 py-3 bg-green-600 font-bold text-white rounded-lg hover:bg-green-500 transition-all shadow-sm hover:shadow-md transform hover:-translate-y-0.5">
                                Add Expense
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