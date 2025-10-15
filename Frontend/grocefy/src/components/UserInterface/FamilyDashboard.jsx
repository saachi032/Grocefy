import React, { useState } from 'react';
// --- CHANGES: Import Link and useParams from React Router ---
import { useParams, Link } from 'react-router-dom';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import UserNavbar from './UserNavbar.jsx';
import {
  Users, Wallet, BarChart3, ClipboardList, Plus, Copy, Crown, PieChart as PieChartIcon,
  Download, ArrowRight, CheckCircle, MessageSquare, ArrowLeft
} from 'lucide-react';

// --- MOCK DATA (This would be passed in as a prop in a real app) ---
const mockFamilyData = {
    name: "The Sharma Household",
    code: "A3B-7K9-P2X",
    members: [
        { id: 1, name: 'You (Alex)', avatar: 'A', role: 'Admin', monthlySpending: 7250.50 },
        { id: 2, name: 'Riya Sharma', avatar: 'R', role: 'Member', monthlySpending: 4120.00 },
        { id: 3, name: 'Aarav Sharma', avatar: '🧑', role: 'Member', monthlySpending: 1200.00 },
    ],
    summary: {
        totalSpending: 12570.50,
        budget: 15000,
        activeLists: 3,
    },
    pieChartData: [
        { name: 'Groceries', value: 8500 },
        { name: 'Household', value: 3070.50 },
        { name: 'Misc', value: 1000 },
    ],
    sharedLists: [
        { id: 1, name: 'Weekly Essentials', createdBy: 'Riya Sharma', totalItems: 15, completedItems: 12, lastUpdated: '2h ago' },
        { id: 2, name: 'Weekend Party', createdBy: 'You (Alex)', totalItems: 25, completedItems: 5, lastUpdated: '1d ago' },
    ],
    activityFeed: [
        { id: 1, text: "Aarav added ₹1,200 to Expenses.", timestamp: '15m ago', icon: <Wallet size={16}/> },
        { id: 2, text: "Riya marked 5 items as completed in 'Weekly Essentials'.", timestamp: '2h ago', icon: <CheckCircle size={16}/> },
        { id: 3, text: "You updated the family budget.", timestamp: '1d ago', icon: <MessageSquare size={16}/> },
    ]
};

const COLORS = ['#10B981', '#3B82F6', '#6B7280']; // Green, Blue, Gray

const StatCard = ({ icon, title, value, children }) => (
    <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
        <div className="flex items-center gap-3 mb-2">
            <div className="bg-gray-100 p-2 rounded-lg">{icon}</div>
            <p className="font-semibold text-gray-600">{title}</p>
        </div>
        <p className="text-3xl font-bold text-gray-800">{value}</p>
        {children}
    </div>
);

const MemberCard = ({ member }) => (
    <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm text-center">
        <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center text-2xl font-bold text-gray-600 mx-auto mb-3">{member.avatar}</div>
        <div className="flex items-center justify-center gap-2">
            <p className="font-bold text-lg text-gray-800">{member.name}</p>
            {member.role === 'Admin' && <Crown size={18} className="text-yellow-500" />}
        </div>
        <p className="text-sm text-gray-500 mb-3">{member.role}</p>
        <p className="text-sm text-gray-500">This Month's Spending</p>
        <p className="font-bold text-xl text-green-600 mb-4">₹{member.monthlySpending.toLocaleString('en-IN')}</p>
        <div className="flex justify-center gap-2">
            <button className="text-sm px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 font-semibold">View Details</button>
            {member.role !== 'Admin' && <button className="text-sm px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 font-semibold">Remove</button>}
        </div>
    </div>
);

const FamilyDashboard = () => {
  // --- CHANGE: Read the dynamic 'familyId' from the URL ---
  const { familyId } = useParams();
  const [familyData, setFamilyData] = useState(mockFamilyData);

  const { name, code, members, summary, pieChartData, sharedLists, activityFeed } = familyData;
  const budgetProgress = (summary.totalSpending / summary.budget) * 100;

  return (
    <div className="bg-gray-100 min-h-screen font-sans">
      <UserNavbar />
      <main className="w-full max-w-7xl mx-auto px-6 py-12 space-y-10">
        {/* --- CHANGE: Added a "Back" link for better navigation --- */}
        <Link to="/family" className="inline-flex items-center gap-2 text-green-600 font-semibold hover:underline mb-2">
          <ArrowLeft size={20} />
          Back to Family Hub
        </Link>
        <header>
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-4xl font-bold text-gray-800">Family Dashboard</h1>
                    {/* --- CHANGE: Display the familyId from the URL to prove it's working --- */}
                    <p className="text-gray-500 mt-1">Viewing dashboard for family ID: <span className="font-semibold text-gray-700">{familyId}</span></p>
                </div>
                <button className="flex items-center gap-2 px-5 py-2.5 bg-green-600 text-white font-bold rounded-lg hover:bg-green-500 transition-transform transform hover:scale-105 shadow-sm">
                    <Plus size={20}/> <span>Invite Member</span>
                </button>
            </div>
            <div className="mt-4 flex items-center gap-6 bg-gray-50 border p-3 rounded-lg text-sm">
                <span className="font-bold text-gray-800">{name}</span>
                <div className="flex items-center gap-2 text-gray-600">
                    <span>Family Code: <span className="font-mono bg-gray-200 px-2 py-1 rounded">{code}</span></span>
                    <button title="Copy Code"><Copy size={16} className="cursor-pointer hover:text-green-600"/></button>
                </div>
                <span className="text-gray-600 font-semibold">{members.length} Members</span>
            </div>
        </header>

        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard icon={<Users size={22} className="text-blue-600" />} title="Total Members" value={`${members.length} Connected`} />
            <StatCard icon={<Wallet size={22} className="text-green-600" />} title="Family Monthly Spending" value={`₹${summary.totalSpending.toLocaleString('en-IN')}`} />
            <StatCard icon={<BarChart3 size={22} className="text-purple-600" />} title="Shared Budget">
                <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2"><div className="bg-purple-500 h-2.5 rounded-full" style={{ width: `${budgetProgress}%` }}></div></div>
                <p className="text-sm mt-1 text-gray-600">₹{summary.totalSpending.toLocaleString('en-IN')} / ₹{summary.budget.toLocaleString('en-IN')}</p>
            </StatCard>
            <StatCard icon={<ClipboardList size={22} className="text-yellow-600" />} title="Active Shared Lists" value={summary.activeLists} />
        </section>

        <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Members</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {members.map(m => <MemberCard key={m.id} member={m} />)}
                </div>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2"><PieChartIcon /> Expense Overview</h2>
                    <button className="flex items-center gap-2 px-3 py-1.5 bg-gray-100 text-sm font-semibold rounded-lg hover:bg-gray-200"><Download size={16}/> Export</button>
                </div>
                <ResponsiveContainer width="100%" height={250}>
                    <PieChart>
                        <Pie data={pieChartData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} label>
                            {pieChartData.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}
                        </Pie>
                        <Tooltip />
                    </PieChart>
                </ResponsiveContainer>
            </div>
        </section>

        <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Shared Grocery Lists</h2>
                <div className="space-y-3">{sharedLists.map(list => (<div key={list.id} className="bg-gray-50 p-4 rounded-lg border"><div className="flex justify-between items-start"><div><p className="font-bold">{list.name}</p><p className="text-xs text-gray-500">By {list.createdBy} &bull; Updated {list.lastUpdated}</p></div><button className="flex items-center gap-1.5 text-sm font-semibold text-green-600 hover:text-green-500">View <ArrowRight size={16}/></button></div><div className="w-full bg-gray-200 rounded-full h-1.5 mt-2"><div className="bg-green-500 h-1.5 rounded-full" style={{width: `${(list.completedItems/list.totalItems)*100}%`}}></div></div></div>))}</div>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Activity Feed</h2>
                <div className="space-y-4">{activityFeed.map(act => (<div key={act.id} className="flex items-start gap-3"><div className="mt-1 p-2 bg-gray-100 rounded-full text-gray-500">{act.icon}</div><div><p className="text-gray-700 text-sm">{act.text}</p><p className="text-xs text-gray-400">{act.timestamp}</p></div></div>))}</div>
            </div>
        </section>
      </main>
    </div>
  );
};

export default FamilyDashboard;