import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import UserNavbar from './UserNavbar.jsx';
import { useAuth } from '../../context/AuthContext.jsx';
import { useTheme } from '../../context/ThemeContext.jsx';
import {
  ClipboardList, Wallet, Users, CheckCircle2, ShoppingCart, BarChart, Plus,
  TrendingUp, Sparkles, Target,
} from 'lucide-react';

// MOCK DATA
const mockDashboardData = {
  location: { city: 'Navi Mumbai', temp: 28, date: '11-10-2025' },
  overviewStats: [
    { id: 1, icon: <ClipboardList />, title: "Total Lists", value: "5 Active", link: "/lists" },
    { id: 2, icon: <Wallet />, title: "This Month's Expense", value: "₹3,240", link: "/expenses" },
    { id: 3, icon: <Users />, title: "Family Members", value: "4 Connected", link: "/family" },
    { id: 4, icon: <CheckCircle2 />, title: "Completion Rate", value: "78%", link: "/lists" },
  ],
  insights: [
    "🛍️ You're running low on 3 items (Milk, Bread, Sugar).",
    "💸 You saved ₹480 compared to last week — nice work!",
    "👨‍👩‍👧 Riya updated 'Weekly Essentials' 2 hours ago.",
  ],
  recentLists: [
    { id: 1, name: 'Weekly Essentials', items: 15, updated: '2 hours ago' },
    { id: 2, name: 'Weekend Party', items: 25, updated: '1 day ago' },
    { id: 3, name: 'Household Cleaning', items: 8, updated: '3 days ago' },
  ],
  familyActivity: [
    { id: 1, avatar: '👩', text: "Riya added 2 items to 'Family List.'" },
    { id: 2, avatar: '🧑', text: "Aarav marked 'Snacks' as purchased." },
    { id: 3, avatar: '🧍‍♀️', text: "You added ₹320 expense to 'Household Supplies.'" },
  ],
  weeklyGoals: [
    { id: 1, title: 'Stay under ₹4,000 budget', percentage: 72 },
    { id: 2, title: 'Complete all 5 lists before Sunday', percentage: 60 },
  ],
};

const StatCard = ({ icon, title, value, gradient }) => {
  const { isDarkMode } = useTheme();
  
  return (
    <Link to={title === "Total Lists" ? "/lists" : title.includes("Expense") ? "/expenses" : title.includes("Family") ? "/family" : "/lists"}>
      <div className={`${isDarkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-200'} p-6 rounded-2xl border shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-xl cursor-pointer group`}>
        <div className="flex justify-between items-start">
          <div className="flex flex-col">
            <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>{title}</p>
            <p className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'} mt-1`}>{value}</p>
          </div>
          <div className={`p-3 ${gradient || 'bg-gradient-to-br from-green-400 to-green-600'} text-white rounded-xl shadow-md group-hover:scale-110 transition-transform`}>
            {icon}
          </div>
        </div>
      </div>
    </Link>
  );
};

const GoalProgressBar = ({ title, percentage }) => {
  const { isDarkMode } = useTheme();
  
  return (
    <div>
      <div className="flex justify-between items-center mb-2">
        <span className={`text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>{title}</span>
        <span className="text-sm font-bold text-green-500">{percentage}%</span>
      </div>
      <div className={`w-full ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'} rounded-full h-3 overflow-hidden shadow-inner`}>
        <div className="bg-gradient-to-r from-green-500 to-green-600 h-3 rounded-full transition-all duration-500 shadow-sm" style={{ width: `${percentage}%` }}></div>
      </div>
    </div>
  );
};

const UserHome = () => {
  const { user } = useAuth();
  const { isDarkMode } = useTheme();
  const [dashboardData] = useState(mockDashboardData);

  const { location, overviewStats, insights, recentLists, familyActivity, weeklyGoals } = dashboardData;

  const statGradients = [
    'bg-gradient-to-br from-green-400 to-green-600',
    'bg-gradient-to-br from-blue-400 to-blue-600',
    'bg-gradient-to-br from-purple-400 to-purple-600',
    'bg-gradient-to-br from-orange-400 to-orange-600',
  ];

  return (
    <div className={`${isDarkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-100 text-gray-800'} font-sans min-h-screen transition-colors duration-300`}>
      <UserNavbar />
      <main className="w-full max-w-7xl mx-auto px-6 py-12">
        <section className={`relative ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white'} p-8 rounded-3xl mb-12 shadow-xl border transition-colors`}>
          <div className={`absolute top-6 right-6 text-right ${isDarkMode ? 'text-gray-400' : 'text-gray-500'} text-sm`}>
            <p>📍 {location.city} | {location.temp}°C</p>
            <p>{location.date}</p>
          </div>
          <h1 className={`text-4xl md:text-5xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'} mb-2`}>
            Welcome back, {user?.name || 'User'} 👋
          </h1>
          <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'} mt-2 text-lg`}>
            Track groceries, monitor expenses, and keep your family organized.
          </p>
        </section>

        {/* --- ACTION BUTTONS UPDATED --- */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Link to="/lists/create" className="flex flex-col items-center justify-center gap-3 p-8 bg-gradient-to-br from-green-600 to-green-700 text-white font-bold rounded-2xl hover:from-green-500 hover:to-green-600 transition-all transform hover:-translate-y-1 shadow-xl hover:shadow-2xl">
            <Plus size={32}/>
            <span className="text-xl">Create List</span>
          </Link>
          <Link to="/expenses/add" className={`flex flex-col items-center justify-center gap-3 p-8 ${isDarkMode ? 'bg-gray-800 hover:bg-gray-700 border-gray-700' : 'bg-white hover:bg-gray-50 border-gray-200'} font-bold rounded-2xl transition-all transform hover:-translate-y-1 shadow-xl border`}>
            <Wallet size={32} className={isDarkMode ? 'text-blue-400' : 'text-blue-600'}/>
            <span className={`text-xl ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>Add Expense</span>
          </Link>
          <Link to="/family/invite" className={`flex flex-col items-center justify-center gap-3 p-8 ${isDarkMode ? 'bg-gray-800 hover:bg-gray-700 border-gray-700' : 'bg-white hover:bg-gray-50 border-gray-200'} font-bold rounded-2xl transition-all transform hover:-translate-y-1 shadow-xl border`}>
            <Users size={32} className={isDarkMode ? 'text-purple-400' : 'text-purple-600'}/>
            <span className={`text-xl ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>Invite Family</span>
          </Link>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {overviewStats.map((stat, index) => (
            <StatCard key={stat.id} {...stat} gradient={statGradients[index]} />
          ))}
        </section>
        
        <section className="mb-12">
            <div className="flex gap-4 overflow-x-auto pb-4 -mx-6 px-6">
                {insights.map((insight, index) => (
                    <div key={index} className={`flex-shrink-0 ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} p-4 rounded-xl border hover:border-green-500 transition-all shadow-md`}>
                        <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} whitespace-nowrap flex items-center gap-2`}>
                          <Sparkles size={16} className="text-yellow-400" />
                          {insight}
                        </p>
                    </div>
                ))}
            </div>
        </section>

        <section className="grid grid-cols-1 lg:grid-cols-5 gap-8 mb-12">
          <div className={`lg:col-span-3 ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white'} p-6 rounded-2xl shadow-xl border transition-colors`}>
            <h2 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'} flex items-center gap-2 mb-4`}>
              <BarChart className="text-green-500" /> Spending Overview
            </h2>
            <div className={`h-64 ${isDarkMode ? 'bg-gray-900' : 'bg-gray-100'} rounded-lg flex items-center justify-center ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>
              <div className="text-center">
                <TrendingUp size={48} className="mx-auto mb-2 opacity-50" />
                <p>Chart will be displayed here</p>
              </div>
            </div>
          </div>
          <div className={`lg:col-span-2 ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white'} p-6 rounded-2xl shadow-xl border transition-colors`}>
            <h2 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'} flex items-center gap-2 mb-4`}>
              <ShoppingCart className="text-green-500" /> Recent Lists
            </h2>
            <div className="space-y-3">
              {recentLists.map(list => (
                <Link key={list.id} to="/lists" className={`block ${isDarkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'} p-4 rounded-lg transition-all`}>
                  <p className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>{list.name}</p>
                  <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>{list.items} items - Updated {list.updated}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            <div className={`${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white'} p-6 rounded-2xl shadow-xl border transition-colors`}>
                <h2 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'} mb-4 flex items-center gap-2`}>
                  <Users className="text-purple-500" /> Family Highlights
                </h2>
                <div className="space-y-4">
                    {familyActivity.map(activity => (
                        <div key={activity.id} className={`flex items-center gap-3 text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                            <span className="text-lg">{activity.avatar}</span>
                            <p>{activity.text}</p>
                        </div>
                    ))}
                </div>
            </div>
            <div className={`${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white'} p-6 rounded-2xl shadow-xl border transition-colors`}>
                <h2 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'} mb-4 flex items-center gap-2`}>
                  <Target className="text-orange-500" /> This Week's Goals
                </h2>
                <div className="space-y-4">
                    {weeklyGoals.map((goal) => (
                        <GoalProgressBar key={goal.id} {...goal} />
                    ))}
                </div>
                <div className={`mt-6 p-4 text-center ${isDarkMode ? 'bg-green-900/50 border-green-700' : 'bg-green-100'} ${isDarkMode ? 'text-green-300 border' : 'text-green-700'} rounded-lg transition-colors`}>
                    <p>Great progress! You're managing groceries like a pro 🏆</p>
                </div>
            </div>
        </section>

      </main>
      <footer className={`w-full text-center p-6 ${isDarkMode ? 'text-gray-400 border-gray-700' : 'text-gray-500 border-gray-200'} text-sm border-t mt-8 transition-colors`}>
        Grocefy © 2025 — Simplify Your Grocery Life.
      </footer>
    </div>
  );
};

export default UserHome;
