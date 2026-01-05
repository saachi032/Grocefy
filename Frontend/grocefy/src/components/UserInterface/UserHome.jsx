import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import UserNavbar from './UserNavbar.jsx';
import { useAuth } from '../../context/AuthContext.jsx';
import { useTheme } from '../../context/ThemeContext.jsx';
import { BarChart as RechartsBarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { format, subMonths, startOfMonth, endOfMonth } from 'date-fns';
import {
  ClipboardList, Wallet, Users, CheckCircle2, ShoppingCart, BarChart, Plus,
  TrendingUp, Sparkles, Target,
} from 'lucide-react';

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
  const [loading, setLoading] = useState(true);
  const [lists, setLists] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [families, setFamilies] = useState([]);

  useEffect(() => {
    const fetchDashboardData = async () => {
      if (!user?.token) {
        setLoading(false);
        return;
      }

      try {
        const [listsRes, expensesRes, familiesRes] = await Promise.all([
          fetch(`${import.meta.env.VITE_API_BASE_URL}/api/lists`, {
            headers: {
              'Authorization': `Bearer ${user.token}`,
              'Content-Type': 'application/json',
            },
          }),
          fetch(`${import.meta.env.VITE_API_BASE_URL}/api/expenses`, {
            headers: {
              'Authorization': `Bearer ${user.token}`,
              'Content-Type': 'application/json',
            },
          }),
          fetch(`${import.meta.env.VITE_API_BASE_URL}/api/family`, {
            headers: {
              'Authorization': `Bearer ${user.token}`,
              'Content-Type': 'application/json',
            },
          }),
        ]);

        if (listsRes.ok) {
          const listsData = await listsRes.json();
          if (listsData.success) {
            setLists(listsData.lists || []);
          }
        }

        if (expensesRes.ok) {
          const expensesData = await expensesRes.json();
          if (expensesData.success) {
            setExpenses(expensesData.expenses || []);
          }
        }

        if (familiesRes.ok) {
          const familiesData = await familiesRes.json();
          if (familiesData.success) {
            setFamilies(familiesData.families || []);
          }
        }
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [user]);

  // Calculate stats from real data
  const totalLists = lists.length;
  const activeLists = lists.filter(l => l.status === 'Active').length;
  const completedLists = totalLists - activeLists;
  
  // Calculate monthly expenses
  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();
  const monthlyExpenses = expenses
    .filter(exp => {
      const expDate = new Date(exp.date);
      return expDate.getMonth() === currentMonth && expDate.getFullYear() === currentYear;
    })
    .reduce((sum, exp) => sum + exp.amount, 0);

  const totalFamilyMembers = families.reduce((sum, fam) => sum + (fam.members || 0), 0);

  // Calculate spending for last 6 months for graph
  const monthlySpendingData = useMemo(() => {
    const data = [];
    for (let i = 5; i >= 0; i--) {
      const monthDate = subMonths(new Date(), i);
      const monthStart = startOfMonth(monthDate);
      const monthEnd = endOfMonth(monthDate);
      
      const monthExpenses = expenses
        .filter(exp => {
          const expDate = new Date(exp.date);
          return expDate >= monthStart && expDate <= monthEnd;
        })
        .reduce((sum, exp) => sum + exp.amount, 0);
      
      data.push({
        name: format(monthDate, 'MMM'),
        spending: monthExpenses,
        fullDate: format(monthDate, 'MMMM yyyy'),
      });
    }
    return data;
  }, [expenses]);

  // Get recent lists (last 3)
  const recentLists = lists
    .sort((a, b) => new Date(b.lastUpdated) - new Date(a.lastUpdated))
    .slice(0, 3)
    .map(list => ({
      id: list.id,
      name: list.name,
      items: list.totalItems,
      updated: formatRelativeTime(new Date(list.lastUpdated)),
    }));

  // Calculate completion rate
  const completionRate = lists.length > 0
    ? Math.round((lists.reduce((sum, list) => sum + (list.completedItems / Math.max(list.totalItems, 1)), 0) / lists.length) * 100)
    : 0;

  const formatRelativeTime = (date) => {
    const now = new Date();
    const diffMs = now - date;
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);
    if (diffHours < 24) return `${diffHours} ${diffHours === 1 ? 'hour' : 'hours'} ago`;
    if (diffDays < 7) return `${diffDays} ${diffDays === 1 ? 'day' : 'days'} ago`;
    return date.toLocaleDateString();
  };

  const overviewStats = [
    { id: 1, icon: <ClipboardList />, title: "Total Lists", value: `${activeLists} Active`, link: "/lists" },
    { id: 2, icon: <Wallet />, title: "This Month's Expense", value: `₹${monthlyExpenses.toLocaleString('en-IN')}`, link: "/expenses" },
    { id: 3, icon: <Users />, title: "Family Members", value: `${totalFamilyMembers} Connected`, link: "/family" },
    { id: 4, icon: <CheckCircle2 />, title: "Completion Rate", value: `${completionRate}%`, link: "/lists" },
  ];

  const location = {
    city: 'Your Location',
    temp: '--',
    date: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }),
  };

  const insights = [];
  const familyActivity = [];
  const weeklyGoals = [];

  const statGradients = [
    'bg-gradient-to-br from-green-400 to-green-600',
    'bg-gradient-to-br from-blue-400 to-blue-600',
    'bg-gradient-to-br from-purple-400 to-purple-600',
    'bg-gradient-to-br from-orange-400 to-orange-600',
  ];

  if (loading) {
    return (
      <div className={`${isDarkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-100 text-gray-800'} font-sans min-h-screen transition-colors duration-300`}>
        <UserNavbar />
        <main className="w-full max-w-7xl mx-auto px-6 py-12 flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
            <p className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>Loading dashboard...</p>
          </div>
        </main>
      </div>
    );
  }

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
        
        {insights.length > 0 && (
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
        )}

        <section className="grid grid-cols-1 lg:grid-cols-5 gap-8 mb-12">
          <div className={`lg:col-span-3 ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white'} p-6 rounded-2xl shadow-xl border transition-colors`}>
            <h2 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'} flex items-center gap-2 mb-4`}>
              <BarChart className="text-green-500" /> Spending Overview (Last 6 Months)
            </h2>
            {monthlySpendingData.length > 0 ? (
              <ResponsiveContainer width="100%" height={250}>
                <RechartsBarChart data={monthlySpendingData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={isDarkMode ? '#374151' : '#e5e7eb'} />
                  <XAxis 
                    dataKey="name" 
                    tick={{ fill: isDarkMode ? '#9ca3af' : '#6b7280' }} 
                    fontSize={12}
                  />
                  <YAxis 
                    tickFormatter={(value) => `₹${value >= 1000 ? (value/1000).toFixed(1) + 'k' : value}`} 
                    tick={{ fill: isDarkMode ? '#9ca3af' : '#6b7280' }} 
                    fontSize={12}
                  />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: isDarkMode ? '#1f2937' : '#ffffff',
                      border: `1px solid ${isDarkMode ? '#374151' : '#e5e7eb'}`,
                      borderRadius: '8px',
                      color: isDarkMode ? '#f3f4f6' : '#111827',
                    }}
                    formatter={(value) => [`₹${value.toLocaleString('en-IN', { minimumFractionDigits: 2 })}`, 'Spending']}
                    labelFormatter={(label) => {
                      const data = monthlySpendingData.find(d => d.name === label);
                      return data ? data.fullDate : label;
                    }}
                  />
                  <Bar 
                    dataKey="spending" 
                    fill="#10B981" 
                    radius={[4, 4, 0, 0]}
                  />
                </RechartsBarChart>
              </ResponsiveContainer>
            ) : (
              <div className={`h-64 ${isDarkMode ? 'bg-gray-900' : 'bg-gray-100'} rounded-lg flex items-center justify-center ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                <div className="text-center">
                  <TrendingUp size={48} className="mx-auto mb-2 opacity-50" />
                  <p>No spending data available</p>
                </div>
              </div>
            )}
          </div>
          <div className={`lg:col-span-2 ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white'} p-6 rounded-2xl shadow-xl border transition-colors`}>
            <h2 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'} flex items-center gap-2 mb-4`}>
              <ShoppingCart className="text-green-500" /> Recent Lists
            </h2>
            <div className="space-y-3">
              {recentLists.length > 0 ? (
                recentLists.map(list => (
                  <Link key={list.id} to="/lists" className={`block ${isDarkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'} p-4 rounded-lg transition-all`}>
                    <p className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>{list.name}</p>
                    <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>{list.items} items - Updated {list.updated}</p>
                  </Link>
                ))
              ) : (
                <div className={`text-center py-8 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  <ShoppingCart size={32} className="mx-auto mb-2 opacity-50" />
                  <p>No lists yet. Create your first list!</p>
                </div>
              )}
            </div>
          </div>
        </section>

        <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            <div className={`${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white'} p-6 rounded-2xl shadow-xl border transition-colors`}>
                <h2 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'} mb-4 flex items-center gap-2`}>
                  <Users className="text-purple-500" /> Family Highlights
                </h2>
                <div className="space-y-4">
                    {familyActivity.length > 0 ? (
                      familyActivity.map(activity => (
                          <div key={activity.id} className={`flex items-center gap-3 text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                              <span className="text-lg">{activity.avatar}</span>
                              <p>{activity.text}</p>
                          </div>
                      ))
                    ) : (
                      <div className={`text-center py-8 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                        <Users size={32} className="mx-auto mb-2 opacity-50" />
                        <p>No family activity yet.</p>
                      </div>
                    )}
                </div>
            </div>
            <div className={`${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white'} p-6 rounded-2xl shadow-xl border transition-colors`}>
                <h2 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'} mb-4 flex items-center gap-2`}>
                  <Target className="text-orange-500" /> This Week's Goals
                </h2>
                <div className="space-y-4">
                    {weeklyGoals.length > 0 ? (
                      weeklyGoals.map((goal) => (
                          <GoalProgressBar key={goal.id} {...goal} />
                      ))
                    ) : (
                      <div className={`text-center py-8 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                        <Target size={32} className="mx-auto mb-2 opacity-50" />
                        <p>No goals set yet.</p>
                      </div>
                    )}
                </div>
                {weeklyGoals.length > 0 && (
                  <div className={`mt-6 p-4 text-center ${isDarkMode ? 'bg-green-900/50 border-green-700' : 'bg-green-100'} ${isDarkMode ? 'text-green-300 border' : 'text-green-700'} rounded-lg transition-colors`}>
                      <p>Great progress! You're managing groceries like a pro 🏆</p>
                  </div>
                )}
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
