import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import UserNavbar from './UserNavbar.jsx';
import { useTheme } from '../../context/ThemeContext.jsx';
import { useAuth } from '../../context/AuthContext.jsx';
import {
  Users, Wallet, BarChart3, ClipboardList, Plus, Copy, Crown, PieChart as PieChartIcon,
  Download, ArrowRight, CheckCircle, MessageSquare, ArrowLeft
} from 'lucide-react';

const COLORS = ['#10B981', '#3B82F6', '#6B7280', '#F59E0B', '#EF4444'];

const StatCard = ({ icon, title, value, children, isDark }) => (
    <div className={`${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} p-5 rounded-xl border shadow-sm transition-colors`}>
        <div className="flex items-center gap-3 mb-2">
            <div className={`${isDark ? 'bg-gray-700' : 'bg-gray-100'} p-2 rounded-lg`}>{icon}</div>
            <p className={`font-semibold ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>{title}</p>
        </div>
        <p className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-800'}`}>{value}</p>
        {children}
    </div>
);

const MemberCard = ({ member, isDark }) => (
    <div className={`${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} p-4 rounded-xl border shadow-sm text-center transition-colors`}>
        <div className={`w-16 h-16 ${isDark ? 'bg-gray-700' : 'bg-gray-200'} rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-3`}>
            {member.avatar}
        </div>
        <div className="flex items-center justify-center gap-2">
            <p className={`font-bold text-lg ${isDark ? 'text-white' : 'text-gray-800'}`}>{member.name}</p>
            {member.role === 'Admin' && <Crown size={18} className="text-yellow-500" />}
        </div>
        <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'} mb-3`}>{member.role}</p>
        <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>This Month's Spending</p>
        <p className={`font-bold text-xl text-green-600 mb-4`}>₹{member.monthlySpending.toLocaleString('en-IN')}</p>
        <div className="flex justify-center gap-2">
            <button className={`text-sm px-4 py-2 ${isDark ? 'bg-gray-700 hover:bg-gray-600 text-gray-300' : 'bg-gray-100 hover:bg-gray-200'} rounded-lg font-semibold transition-colors`}>
                View Details
            </button>
            {member.role !== 'Admin' && (
                <button className={`text-sm px-4 py-2 ${isDark ? 'bg-red-900/30 hover:bg-red-900/50 text-red-300' : 'bg-red-50 text-red-600 hover:bg-red-100'} rounded-lg font-semibold transition-colors`}>
                    Remove
                </button>
            )}
        </div>
    </div>
);

const FamilyDashboard = () => {
  const { familyId } = useParams();
  const { isDarkMode } = useTheme();
  const { user } = useAuth();
  const [familyData, setFamilyData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const fetchFamilyData = async () => {
      if (!user?.token || !familyId) {
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/family/${familyId}`, {
          headers: {
            'Authorization': `Bearer ${user.token}`,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch family data');
        }

        const data = await response.json();
        if (data.success) {
          setFamilyData(data.family);
        } else {
          console.error('Failed to fetch family data:', data.message);
          setFamilyData(null);
        }
      } catch (error) {
        console.error('Error fetching family data:', error);
        setFamilyData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchFamilyData();
  }, [familyId, user]);

  const handleCopyCode = () => {
    if (familyData?.code) {
      navigator.clipboard.writeText(familyData.code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (loading) {
    return (
      <div className={`${isDarkMode ? 'bg-gray-900' : 'bg-gray-100'} min-h-screen font-sans transition-colors duration-300`}>
        <UserNavbar />
        <main className="w-full max-w-7xl mx-auto px-6 py-12 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
            <p className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>Loading family dashboard...</p>
          </div>
        </main>
      </div>
    );
  }

  if (!familyData) {
    return (
      <div className={`${isDarkMode ? 'bg-gray-900' : 'bg-gray-100'} min-h-screen font-sans transition-colors duration-300`}>
        <UserNavbar />
        <main className="w-full max-w-7xl mx-auto px-6 py-12">
          <p className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>Family not found</p>
        </main>
      </div>
    );
  }

  const { name, code, members, summary, pieChartData } = familyData;
  const budgetProgress = summary.budget > 0 ? (summary.totalSpending / summary.budget) * 100 : 0;

  return (
    <div className={`${isDarkMode ? 'bg-gray-900' : 'bg-gray-100'} min-h-screen font-sans transition-colors duration-300`}>
      <UserNavbar />
      <main className="w-full max-w-7xl mx-auto px-6 py-12 space-y-10">
        <Link to="/family" className={`inline-flex items-center gap-2 ${isDarkMode ? 'text-green-400 hover:text-green-300' : 'text-green-600 hover:underline'} font-semibold mb-2 transition-colors`}>
          <ArrowLeft size={20} />
          Back to Family Hub
        </Link>
        <header>
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div>
                    <h1 className={`text-4xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>Family Dashboard</h1>
                    <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-500'} mt-1`}>Managing {name}</p>
                </div>
                <button className={`flex items-center gap-2 px-5 py-2.5 bg-green-600 text-white font-bold rounded-lg hover:bg-green-500 transition-transform transform hover:scale-105 shadow-sm`}>
                    <Plus size={20}/> <span>Invite Member</span>
                </button>
            </div>
            <div className={`mt-4 flex items-center gap-6 ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-200'} border p-3 rounded-lg text-sm transition-colors`}>
                <span className={`font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>{name}</span>
                <div className={`flex items-center gap-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    <span>Family Code: <span className={`font-mono ${isDarkMode ? 'bg-gray-700 text-gray-200' : 'bg-gray-200'} px-2 py-1 rounded`}>{code}</span></span>
                    <button 
                        onClick={handleCopyCode}
                        title="Copy Code"
                        className={`hover:${isDarkMode ? 'text-green-400' : 'text-green-600'} transition-colors`}
                    >
                        <Copy size={16} className={`cursor-pointer ${copied ? 'text-green-500' : ''}`}/>
                    </button>
                    {copied && <span className={`text-xs ${isDarkMode ? 'text-green-400' : 'text-green-600'}`}>Copied!</span>}
                </div>
                <span className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'} font-semibold`}>{members.length} Members</span>
            </div>
        </header>

        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard 
                icon={<Users size={22} className="text-blue-600" />} 
                title="Total Members" 
                value={`${members.length} Connected`}
                isDark={isDarkMode}
            />
            <StatCard 
                icon={<Wallet size={22} className="text-green-600" />} 
                title="Family Monthly Spending" 
                value={`₹${summary.totalSpending.toLocaleString('en-IN')}`}
                isDark={isDarkMode}
            />
            <StatCard 
                icon={<BarChart3 size={22} className="text-purple-600" />} 
                title="Shared Budget"
                isDark={isDarkMode}
            >
                <div className={`w-full ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'} rounded-full h-2.5 mt-2 transition-colors`}>
                  <div className="bg-purple-500 h-2.5 rounded-full" style={{ width: `${Math.min(budgetProgress, 100)}%` }}></div>
                </div>
                <p className={`text-sm mt-1 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  ₹{summary.totalSpending.toLocaleString('en-IN')} / ₹{summary.budget.toLocaleString('en-IN')}
                </p>
            </StatCard>
            <StatCard 
                icon={<ClipboardList size={22} className="text-yellow-600" />} 
                title="Active Shared Lists" 
                value={summary.activeLists}
                isDark={isDarkMode}
            />
        </section>

        <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
                <h2 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'} mb-4`}>Members</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {members && members.length > 0 ? (
                      members.map(m => <MemberCard key={m.id} member={m} isDark={isDarkMode} />)
                    ) : (
                      <div className={`col-span-2 text-center py-8 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                        <Users size={32} className="mx-auto mb-2 opacity-50" />
                        <p>No members yet</p>
                      </div>
                    )}
                </div>
            </div>
            <div className={`${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} p-6 rounded-2xl border shadow-sm transition-colors`}>
                <div className="flex justify-between items-center mb-4">
                    <h2 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'} flex items-center gap-2`}>
                        <PieChartIcon /> Expense Overview
                    </h2>
                    <button className={`flex items-center gap-2 px-3 py-1.5 ${isDarkMode ? 'bg-gray-700 hover:bg-gray-600 text-gray-300' : 'bg-gray-100 hover:bg-gray-200'} text-sm font-semibold rounded-lg transition-colors`}>
                        <Download size={16}/> Export
                    </button>
                </div>
                {pieChartData && pieChartData.length > 0 ? (
                    <ResponsiveContainer width="100%" height={250}>
                        <PieChart>
                            <Pie 
                                data={pieChartData} 
                                dataKey="value" 
                                nameKey="name" 
                                cx="50%" 
                                cy="50%" 
                                outerRadius={100} 
                                label
                            >
                                {pieChartData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip />
                        </PieChart>
                    </ResponsiveContainer>
                ) : (
                    <div className={`flex items-center justify-center h-[250px] ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                        No expense data available
                    </div>
                )}
            </div>
        </section>
      </main>
    </div>
  );
};

export default FamilyDashboard;
