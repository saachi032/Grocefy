import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import UserNavbar from './UserNavbar.jsx';
import {
    User, Mail, Calendar, Phone, Edit3, Save, X, Settings, Moon, Sun, Bell, BellOff,
    Users as FamilyIcon, ArrowRight, LogOut, Trash2, Wallet, ClipboardList, CheckSquare, BarChart3, Crown
} from 'lucide-react';

// --- MOCK USER DATA ---
const mockUserData = {
    name: 'Aarav Sharma',
    email: 'aarav.sharma@example.com',
    avatar: '🧑',
    role: 'Admin',
    joinedDate: '2025-01-15',
    contactNumber: '+91 98765 43210',
    preferences: {
        currency: '₹',
        theme: 'Light',
        notifications: true,
    },
    family: {
        id: 1,
        name: 'The Sharma Household',
    },
    activity: {
        totalExpenses: 12450.75,
        listsCreated: 8,
        itemsChecked: 112,
        familyContribution: '₹2,400',
    },
};

// --- HELPER COMPONENTS ---

// Stat Card for Activity Summary
const StatCard = ({ icon, title, value, colorClass }) => (
    <div className="bg-white p-4 rounded-xl border border-gray-200 flex items-center gap-4 transition-all hover:shadow-md hover:-translate-y-1">
        <div className={`p-3 rounded-lg ${colorClass}`}>
            {icon}
        </div>
        <div>
            <p className="text-sm text-gray-500">{title}</p>
            <p className="text-lg font-bold text-gray-800">{value}</p>
        </div>
    </div>
);

// Toggle Switch for Preferences
const ToggleSwitch = ({ enabled, setEnabled, labelOn, labelOff, IconOn, IconOff }) => (
    <div className="flex items-center justify-between py-2">
        <div className="flex items-center gap-2">
            {enabled ? <IconOn size={18} className="text-gray-600"/> : <IconOff size={18} className="text-gray-600"/>}
            <span className="font-semibold text-gray-700">{enabled ? labelOn : labelOff}</span>
        </div>
        <button
            onClick={() => setEnabled(!enabled)}
            className={`relative inline-flex items-center h-7 w-12 rounded-full transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 ${enabled ? 'bg-green-600' : 'bg-gray-300'}`}
        >
            <span className={`inline-block w-5 h-5 transform bg-white rounded-full transition-transform duration-300 ${enabled ? 'translate-x-6' : 'translate-x-1'}`}/>
        </button>
    </div>
);


// --- MAIN PROFILE COMPONENT ---
const MyProfile = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(mockUserData);
    const [isEditing, setIsEditing] = useState(false);
    
    // Preferences State
    const [theme, setTheme] = useState(user.preferences.theme);
    const [notifications, setNotifications] = useState(user.preferences.notifications);
    
    // Editable Form Fields State
    const [editableName, setEditableName] = useState(user.name);
    const [editableContact, setEditableContact] = useState(user.contactNumber);

    const handleSave = () => {
        // In a real app, you'd make an API call here.
        setUser(prev => ({ ...prev, name: editableName, contactNumber: editableContact }));
        setIsEditing(false);
    };

    const handleCancel = () => {
        setEditableName(user.name);
        setEditableContact(user.contactNumber);
        setIsEditing(false);
    };

    const handleLogout = () => {
        if (window.confirm("Are you sure you want to log out?")) {
            navigate('/login'); // Redirect to login page
        }
    };
    
    return (
        <div className="bg-gray-100 min-h-screen font-sans">
            <UserNavbar />
            <main className="w-full max-w-5xl mx-auto px-4 py-12">
                {/* Header */}
                <header className="mb-10">
                    <h1 className="text-4xl font-bold text-gray-800">My Profile</h1>
                    <p className="text-gray-500 mt-1">Manage your account, preferences, and family connections.</p>
                </header>

                {/* Profile Card and Welcome Message */}
                <section className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
                    <div className="lg:col-span-1 bg-white p-6 rounded-2xl border border-gray-200 shadow-sm text-center flex flex-col items-center justify-center">
                        <div className="relative mb-4">
                            <div className="w-28 h-28 bg-gray-200 rounded-full flex items-center justify-center text-5xl">{user.avatar}</div>
                            <button className="absolute bottom-0 right-0 p-2 bg-green-600 text-white rounded-full hover:bg-green-500 transition-transform transform hover:scale-110">
                                <Edit3 size={16} />
                            </button>
                        </div>
                        <h2 className="text-2xl font-bold text-gray-800">{user.name}</h2>
                        <p className="text-gray-500">{user.email}</p>
                        {user.role === 'Admin' && (
                            <div className="mt-2 flex items-center gap-1.5 px-3 py-1 bg-yellow-100 text-yellow-700 text-xs font-semibold rounded-full">
                                <Crown size={14}/> Family Admin
                            </div>
                        )}
                    </div>
                    <div className="lg:col-span-2 space-y-4">
                         <div className="bg-green-50 border-l-4 border-green-500 text-green-800 p-5 rounded-r-lg">
                            <h3 className="font-bold text-lg">Hey {user.name.split(' ')[0]} 👋,</h3>
                            <p>You’ve helped your family save an estimated <span className="font-bold">{user.activity.familyContribution}</span> this month!</p>
                        </div>
                         <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <StatCard icon={<Wallet size={20} className="text-green-600"/>} title="Total Expenses Added" value={`₹${user.activity.totalExpenses.toLocaleString('en-IN')}`} colorClass="bg-green-100" />
                            <StatCard icon={<ClipboardList size={20} className="text-blue-600"/>} title="Lists Created" value={user.activity.listsCreated} colorClass="bg-blue-100" />
                            <StatCard icon={<CheckSquare size={20} className="text-purple-600"/>} title="Items Checked Off" value={user.activity.itemsChecked} colorClass="bg-purple-100" />
                            <StatCard icon={<BarChart3 size={20} className="text-yellow-600"/>} title="Family Contributions" value={user.activity.familyContribution} colorClass="bg-yellow-100" />
                        </div>
                    </div>
                </section>
                
                {/* Details Section */}
                <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="space-y-8">
                        {/* Personal Info */}
                        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-xl font-bold text-gray-800">Personal Info</h3>
                                {isEditing ? (
                                    <div className="flex gap-2">
                                        <button onClick={handleSave} className="p-2 text-green-600 hover:bg-green-100 rounded-full"><Save size={18}/></button>
                                        <button onClick={handleCancel} className="p-2 text-gray-500 hover:bg-gray-100 rounded-full"><X size={18}/></button>
                                    </div>
                                ) : (
                                    <button onClick={() => setIsEditing(true)} className="p-2 text-gray-500 hover:bg-gray-100 rounded-full"><Edit3 size={18}/></button>
                                )}
                            </div>
                            <div className="space-y-4 text-gray-700">
                                <div className="flex items-center gap-3"><User size={18} className="text-gray-400"/> {isEditing ? <input value={editableName} onChange={(e) => setEditableName(e.target.value)} className="w-full p-1 border-b"/> : <span>{user.name}</span>}</div>
                                <div className="flex items-center gap-3"><Mail size={18} className="text-gray-400"/> <span>{user.email}</span></div>
                                <div className="flex items-center gap-3"><Phone size={18} className="text-gray-400"/> {isEditing ? <input value={editableContact} onChange={(e) => setEditableContact(e.target.value)} className="w-full p-1 border-b"/> : <span>{user.contactNumber}</span>}</div>
                                <div className="flex items-center gap-3"><Calendar size={18} className="text-gray-400"/> <span>Joined on {new Date(user.joinedDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</span></div>
                            </div>
                        </div>

                        {/* Family Connections */}
                        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
                             <h3 className="text-xl font-bold text-gray-800 mb-4">Family Connections</h3>
                             <div className="bg-gray-50 p-4 rounded-lg flex items-center justify-between">
                                <div>
                                    <p className="font-bold">{user.family.name}</p>
                                    <p className="text-sm text-gray-500">Your role: {user.role}</p>
                                </div>
                                <Link to={`/family/${user.family.id}`} className="flex items-center gap-1.5 font-semibold text-green-600 hover:text-green-500">View <ArrowRight size={16}/></Link>
                             </div>
                             <button className="mt-4 w-full text-center text-sm text-red-600 font-semibold hover:underline">Leave Family</button>
                        </div>
                    </div>
                    
                    <div className="space-y-8">
                        {/* Preferences */}
                        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
                             <h3 className="text-xl font-bold text-gray-800 mb-2">Preferences</h3>
                             <div className="divide-y divide-gray-100">
                                <ToggleSwitch enabled={theme === 'Dark'} setEnabled={() => setTheme(theme === 'Light' ? 'Dark' : 'Light')} labelOn="Dark Mode" labelOff="Light Mode" IconOn={Moon} IconOff={Sun} />
                                <ToggleSwitch enabled={notifications} setEnabled={setNotifications} labelOn="Notifications On" labelOff="Notifications Off" IconOn={Bell} IconOff={BellOff} />
                             </div>
                        </div>

                        {/* Security Actions */}
                        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
                            <h3 className="text-xl font-bold text-gray-800 mb-4">Account Actions</h3>
                            <div className="space-y-3">
                                <button className="w-full text-left p-3 font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors">Change Password</button>
                                <button onClick={handleLogout} className="w-full text-left p-3 font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors flex items-center gap-2"><LogOut size={16}/> Logout</button>
                                <button className="w-full text-left p-3 font-semibold text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition-colors flex items-center gap-2"><Trash2 size={16}/> Delete Account</button>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
};

export default MyProfile;