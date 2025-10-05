import React, { useEffect, useState } from 'react';
import UserNavbar from './UserNavbar.jsx';
import { useAuth } from '../../context/AuthContext.jsx';
import {
  ClipboardList, Wallet, Users, CheckCircle2, ShoppingCart, BarChart, Plus, Download,
} from 'lucide-react';

// MOCK DATA: In a real app, this would come from an API call in a useEffect hook.
const mockDashboardData = {
  location: {
    city: 'Navi Mumbai',
    temp: 29,
    date: 'October 5, 2025',
  },
  overviewStats: [
    { id: 1, icon: <ClipboardList />, title: "Total Lists", value: "5 Active", link: "/lists" },
    { id: 2, icon: <Wallet />, title: "This Month’s Expense", value: "₹3,240", link: "/expenses" },
    { id: 3, icon: <Users />, title: "Family Members", value: "4 Connected", link: "/family" },
    { id: 4, icon: <CheckCircle2 />, title: "Completion Rate", value: "78%", link: "/lists" },
  ],
  insights: [
    "🛍️ You’re running low on 3 items (Milk, Bread, Sugar).",
    "💸 You saved ₹480 compared to last week — nice work!",
    "👨‍👩‍👧 Riya updated ‘Weekly Essentials’ 2 hours ago.",
    "🔥 90% of your budget used — plan your next purchase carefully.",
  ],
  recentLists: [
    { id: 1, name: 'Weekly Essentials', items: 15, updated: '2 hours ago', status: 'Active' },
    { id: 2, name: 'Weekend Party', items: 25, updated: '1 day ago', status: 'Completed' },
    { id: 3, name: 'Household Cleaning', items: 8, updated: '3 days ago', status: 'Completed' },
  ],
  familyActivity: [
    { id: 1, avatar: '👩', text: "Riya added 2 items to ‘Family List.’" },
    { id: 2, avatar: '🧑', text: "Aarav marked ‘Snacks’ as purchased." },
    { id: 3, avatar: '🧍‍♀️', text: "You added ₹320 expense to ‘Household Supplies.’" },
  ],
  weeklyGoals: [
    { id: 1, title: 'Stay under ₹4,000 budget', percentage: 72 },
    { id: 2, title: 'Complete all 5 lists before Sunday', percentage: 60 },
  ],
};

// --- SUB-COMPONENTS for a cleaner main component ---

const StatCard = ({ icon, title, value, link, delay }) => (
  <div
    className="bg-white p-6 rounded-2xl border border-gray-200 shadow-lg transition-transform duration-300 hover:-translate-y-2 cursor-pointer animate-fadeInUp"
    style={{ animationDelay: `${delay * 100}ms` }}
  >
    <div className="flex justify-between items-start">
      <div className="flex flex-col">
        <p className="text-sm text-gray-500">{title}</p>
        <p className="text-2xl font-bold text-gray-800 mt-1">{value}</p>
      </div>
      <div className="p-3 bg-green-100 text-green-600 rounded-lg">{icon}</div>
    </div>
  </div>
);

const GoalProgressBar = ({ title, percentage, delay }) => (
    <div className="animate-fadeInUp" style={{ animationDelay: `${delay * 100}ms` }}>
    <div className="flex justify-between items-center mb-1">
      <span className="text-sm font-medium text-gray-700">{title}</span>
      <span className="text-sm font-bold text-green-600">{percentage}%</span>
    </div>
    <div className="w-full bg-gray-200 rounded-full h-2.5">
      <div className="bg-green-500 h-2.5 rounded-full" style={{ width: `${percentage}%` }}></div>
    </div>
  </div>
);


// --- MAIN DASHBOARD COMPONENT ---

const UserHome = () => {
  const { user } = useAuth();
  const [dashboardData, setDashboardData] = useState(null);

  useEffect(() => {
    setTimeout(() => {
      setDashboardData(mockDashboardData);
    }, 500);
  }, []);

  if (!dashboardData) {
    return <div className="bg-gray-100 min-h-screen flex items-center justify-center text-gray-800">Loading Dashboard...</div>;
  }

  const { location, overviewStats, insights, recentLists, familyActivity, weeklyGoals } = dashboardData;

  return (
    <div className="bg-gray-100 text-gray-800 font-sans">
      <UserNavbar />

      <main className="w-full max-w-7xl mx-auto px-6 py-12">
        
        <section className="relative bg-white p-8 rounded-2xl mb-12 animate-fadeInUp shadow-md">
          <div className="absolute top-6 right-6 text-right text-gray-500 text-sm">
            <p>📍 {location.city} | {location.temp}°C</p>
            <p>{location.date}</p>
          </div>
          <h1 className="text-4xl font-bold text-gray-800">Welcome back, {user?.name || 'User'} 👋</h1>
          <p className="text-gray-600 mt-2">Track groceries, monitor expenses, and keep your family organized.</p>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {overviewStats.map((stat, index) => (
            <StatCard key={stat.id} {...stat} delay={index + 1} />
          ))}
        </section>
        
        <section className="mb-12 animate-fadeInUp" style={{ animationDelay: '500ms' }}>
            <div className="flex gap-4 overflow-x-auto pb-4 -mx-6 px-6">
                {insights.map((insight, index) => (
                    <div key={index} className="flex-shrink-0 bg-white p-3 rounded-lg border border-gray-200 hover:border-green-500 transition-colors">
                        <p className="text-sm text-gray-700 whitespace-nowrap">{insight}</p>
                    </div>
                ))}
            </div>
        </section>

        <section className="grid grid-cols-1 lg:grid-cols-5 gap-8 mb-12">
          <div className="lg:col-span-3 bg-white p-6 rounded-2xl animate-fadeInUp shadow-md" style={{ animationDelay: '600ms' }}>
            <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2 mb-4"><BarChart /> Spending Overview</h2>
            <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center text-gray-500">Chart will be displayed here</div>
          </div>
          <div className="lg:col-span-2 bg-white p-6 rounded-2xl animate-fadeInUp shadow-md" style={{ animationDelay: '700ms' }}>
            <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2 mb-4"><ShoppingCart /> Recent Lists</h2>
            <div className="space-y-3">
              {recentLists.map(list => (
                <div key={list.id} className="bg-gray-100 p-3 rounded-lg hover:bg-gray-200 transition-colors">
                  <p className="font-semibold text-gray-800">{list.name}</p>
                  <p className="text-xs text-gray-500">{list.items} items - Updated {list.updated}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            <div className="bg-white p-6 rounded-2xl animate-fadeInUp shadow-md" style={{ animationDelay: '800ms' }}>
                <h2 className="text-xl font-bold text-gray-800 mb-4">👨‍👩‍👧 Family Highlights</h2>
                <div className="space-y-4">
                    {familyActivity.map(activity => (
                        <div key={activity.id} className="flex items-center gap-3 text-sm">
                            <span className="text-lg">{activity.avatar}</span>
                            <p className="text-gray-600">{activity.text}</p>
                        </div>
                    ))}
                </div>
            </div>
            <div className="bg-white p-6 rounded-2xl animate-fadeInUp shadow-md" style={{ animationDelay: '900ms' }}>
                <h2 className="text-xl font-bold text-gray-800 mb-4">🎯 This Week’s Goals</h2>
                <div className="space-y-4">
                    {weeklyGoals.map((goal, index) => (
                        <GoalProgressBar key={goal.id} {...goal} delay={index} />
                    ))}
                </div>
                <div className="mt-6 p-4 text-center bg-green-100 text-green-700 rounded-lg">
                    <p>Great progress! You’re managing groceries like a pro 🏆</p>
                </div>
            </div>
        </section>

        <section className="text-center py-8 animate-fadeInUp" style={{ animationDelay: '1000ms' }}>
          <div className="inline-flex items-center gap-4 bg-white p-3 rounded-xl shadow-md">
            <button className="flex items-center gap-2 px-5 py-3 bg-green-600 text-white font-bold rounded-lg hover:bg-green-500 transition-all transform hover:scale-105"><Plus size={20}/> Add List</button>
            <button className="flex items-center gap-2 px-5 py-3 bg-gray-200 text-gray-800 font-bold rounded-lg hover:bg-gray-300 transition-colors"><Wallet size={20}/> Add Expense</button>
            <button className="flex items-center gap-2 px-5 py-3 bg-gray-200 text-gray-800 font-bold rounded-lg hover:bg-gray-300 transition-colors"><Users size={20}/> Invite Family</button>
            <button className="flex items-center gap-2 px-5 py-3 bg-gray-200 text-gray-800 font-bold rounded-lg hover:bg-gray-300 transition-colors"><Download size={20}/> Export</button>
          </div>
        </section>

      </main>

      <footer className="w-full text-center p-6 text-gray-500 text-sm border-t border-gray-200 mt-8">
        Grocefy © 2025 — Simplify Your Grocery Life.
      </footer>
    </div>
  );
};

export default UserHome;