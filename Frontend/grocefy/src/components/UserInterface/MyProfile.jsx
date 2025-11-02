import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import UserNavbar from './UserNavbar.jsx';
import { useTheme } from '../../context/ThemeContext.jsx';
import { useAuth } from '../../context/AuthContext.jsx';
import {
    User, Mail, Calendar, Phone, Edit3, Save, X, Settings, Moon, Sun, Bell, BellOff,
    Users as FamilyIcon, ArrowRight, LogOut, Trash2, Wallet, ClipboardList, CheckSquare, BarChart3, Crown
} from 'lucide-react';

// Avatar options with dogs and cats
const AVATAR_OPTIONS = [
    { emoji: '🐕', name: 'Dog' },
    { emoji: '🐶', name: 'Puppy' },
    { emoji: '🐩', name: 'Poodle' },
    { emoji: '🐺', name: 'Wolf' },
    { emoji: '🐱', name: 'Cat' },
    { emoji: '🐈', name: 'Cat Face' },
    { emoji: '🐈‍⬛', name: 'Black Cat' },
    { emoji: '🐅', name: 'Tiger' },
    { emoji: '🦁', name: 'Lion' },
    { emoji: '🧑', name: 'Person' },
    { emoji: '👤', name: 'User' },
    { emoji: '😎', name: 'Cool' },
];

// --- HELPER COMPONENTS ---

// Stat Card for Activity Summary
const StatCard = ({ icon, title, value, colorClass, isDark }) => (
    <div className={`${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} p-4 rounded-xl border flex items-center gap-4 transition-all hover:shadow-md hover:-translate-y-1`}>
        <div className={`p-3 rounded-lg ${colorClass}`}>
            {icon}
        </div>
        <div>
            <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{title}</p>
            <p className={`text-lg font-bold ${isDark ? 'text-gray-100' : 'text-gray-800'}`}>{value}</p>
        </div>
    </div>
);

// Toggle Switch for Preferences
const ToggleSwitch = ({ enabled, setEnabled, labelOn, labelOff, IconOn, IconOff, isDark }) => (
    <div className="flex items-center justify-between py-2">
        <div className="flex items-center gap-2">
            {enabled ? <IconOn size={18} className={isDark ? 'text-gray-300' : 'text-gray-600'}/> : <IconOff size={18} className={isDark ? 'text-gray-300' : 'text-gray-600'}/>}
            <span className={`font-semibold ${isDark ? 'text-gray-200' : 'text-gray-700'}`}>{enabled ? labelOn : labelOff}</span>
        </div>
        <button
            onClick={() => setEnabled(!enabled)}
            className={`relative inline-flex items-center h-7 w-12 rounded-full transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 ${enabled ? 'bg-green-600' : isDark ? 'bg-gray-600' : 'bg-gray-300'}`}
        >
            <span className={`inline-block w-5 h-5 transform bg-white rounded-full transition-transform duration-300 ${enabled ? 'translate-x-6' : 'translate-x-1'}`}/>
        </button>
    </div>
);

// Avatar Selection Modal
const AvatarModal = ({ isOpen, onClose, onSelect, currentAvatar, isDark }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4" onClick={onClose}>
            <div 
                className={`${isDark ? 'bg-gray-800' : 'bg-white'} w-full max-w-md rounded-2xl shadow-2xl p-6`}
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex justify-between items-center mb-4">
                    <h3 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-800'}`}>Select Avatar</h3>
                    <button onClick={onClose} className={`${isDark ? 'text-gray-400 hover:text-gray-200' : 'text-gray-500 hover:text-gray-700'}`}>
                        <X size={24} />
                    </button>
                </div>
                <div className="grid grid-cols-4 gap-4">
                    {AVATAR_OPTIONS.map((avatar) => (
                        <button
                            key={avatar.emoji}
                            onClick={() => onSelect(avatar.emoji)}
                            className={`p-4 text-4xl rounded-xl transition-all ${
                                currentAvatar === avatar.emoji
                                    ? 'bg-green-600 ring-2 ring-green-400'
                                    : isDark 
                                        ? 'bg-gray-700 hover:bg-gray-600' 
                                        : 'bg-gray-100 hover:bg-gray-200'
                            }`}
                        >
                            {avatar.emoji}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

// --- MAIN PROFILE COMPONENT ---
const MyProfile = () => {
    const navigate = useNavigate();
    const { isDarkMode, toggleTheme } = useTheme();
    const { user, logout } = useAuth();
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [showAvatarModal, setShowAvatarModal] = useState(false);
    const [saving, setSaving] = useState(false);
    
    // Preferences State
    const [notifications, setNotifications] = useState(true);
    
    // Editable Form Fields State
    const [editableName, setEditableName] = useState('');
    const [editableContact, setEditableContact] = useState('');
    const [editableAvatar, setEditableAvatar] = useState('🧑');

    // Fetch user profile from backend
    useEffect(() => {
        const fetchProfile = async () => {
            if (!user?.token) {
                setLoading(false);
                return;
            }

            try {
                const response = await fetch('/api/users/profile', {
                    headers: {
                        'Authorization': `Bearer ${user.token}`,
                        'Content-Type': 'application/json',
                    },
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch profile');
                }

                const data = await response.json();
                if (data.success) {
                    setUserData(data.user);
                    setEditableName(data.user.name || '');
                    setEditableContact(data.user.phone || '');
                    setEditableAvatar(data.user.avatar || '🧑');
                }
            } catch (error) {
                console.error('Error fetching profile:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, [user]);

    const handleSave = async () => {
        if (!user?.token) return;

        setSaving(true);
        try {
            const response = await fetch('/api/users/profile', {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${user.token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: editableName,
                    phone: editableContact,
                    avatar: editableAvatar,
                }),
            });

            const data = await response.json();
            if (data.success) {
                setUserData(data.user);
                setIsEditing(false);
                setShowAvatarModal(false);
            } else {
                alert(data.message || 'Failed to update profile');
            }
        } catch (error) {
            console.error('Error updating profile:', error);
            alert('Error updating profile');
        } finally {
            setSaving(false);
        }
    };

    const handleCancel = () => {
        if (userData) {
            setEditableName(userData.name || '');
            setEditableContact(userData.phone || '');
            setEditableAvatar(userData.avatar || '🧑');
        }
        setIsEditing(false);
    };

    const handleAvatarSelect = (avatar) => {
        setEditableAvatar(avatar);
        setShowAvatarModal(false);
    };

    const handleLogout = () => {
        if (window.confirm("Are you sure you want to log out?")) {
            logout();
            navigate('/');
        }
    };

    if (loading) {
        return (
            <div className={`${isDarkMode ? 'bg-gray-900' : 'bg-gray-100'} min-h-screen font-sans transition-colors duration-300`}>
                <UserNavbar />
                <main className="w-full max-w-5xl mx-auto px-4 py-12 flex items-center justify-center">
                    <div className="text-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
                        <p className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>Loading profile...</p>
                    </div>
                </main>
            </div>
        );
    }

    if (!userData) {
        return (
            <div className={`${isDarkMode ? 'bg-gray-900' : 'bg-gray-100'} min-h-screen font-sans transition-colors duration-300`}>
                <UserNavbar />
                <main className="w-full max-w-5xl mx-auto px-4 py-12">
                    <p className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>Failed to load profile</p>
                </main>
            </div>
        );
    }

    const joinedDate = userData.createdAt ? new Date(userData.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }) : 'N/A';
    
    return (
        <div className={`${isDarkMode ? 'bg-gray-900' : 'bg-gray-100'} min-h-screen font-sans transition-colors duration-300`}>
            <UserNavbar />
            <main className="w-full max-w-5xl mx-auto px-4 py-12">
                {/* Header */}
                <header className="mb-10">
                    <h1 className={`text-4xl font-bold ${isDarkMode ? 'text-gray-100' : 'text-gray-800'}`}>My Profile</h1>
                    <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-500'} mt-1`}>Manage your account, preferences, and family connections.</p>
                </header>

                {/* Profile Card and Welcome Message */}
                <section className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
                    <div className={`lg:col-span-1 ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} p-6 rounded-2xl border shadow-sm text-center flex flex-col items-center justify-center transition-colors duration-300`}>
                        <div className="relative mb-4">
                            <div className={`w-28 h-28 ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'} rounded-full flex items-center justify-center text-5xl`}>{editableAvatar}</div>
                            <button 
                                onClick={() => setShowAvatarModal(true)} 
                                className="absolute bottom-0 right-0 p-2 bg-green-600 text-white rounded-full hover:bg-green-500 transition-transform transform hover:scale-110"
                            >
                                <Edit3 size={16} />
                            </button>
                        </div>
                        <h2 className={`text-2xl font-bold ${isDarkMode ? 'text-gray-100' : 'text-gray-800'}`}>{editableName}</h2>
                        <p className={isDarkMode ? 'text-gray-400' : 'text-gray-500'}>{userData.email}</p>
                    </div>
                    <div className="lg:col-span-2 space-y-4">
                         <div className={`${isDarkMode ? 'bg-green-900/20 border-green-700 text-green-200' : 'bg-green-50 border-green-500 text-green-800'} border-l-4 p-5 rounded-r-lg transition-colors duration-300`}>
                            <h3 className="font-bold text-lg">Hey {editableName.split(' ')[0]} 👋,</h3>
                            <p>Welcome to your profile! Manage your settings and preferences here.</p>
                        </div>
                         <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <StatCard 
                                icon={<Wallet size={20} className="text-green-600 dark:text-green-400"/>} 
                                title="Total Expenses" 
                                value="₹0" 
                                colorClass={isDarkMode ? 'bg-green-900/30' : 'bg-green-100'}
                                isDark={isDarkMode}
                            />
                            <StatCard 
                                icon={<ClipboardList size={20} className="text-blue-600 dark:text-blue-400"/>} 
                                title="Lists Created" 
                                value="0" 
                                colorClass={isDarkMode ? 'bg-blue-900/30' : 'bg-blue-100'}
                                isDark={isDarkMode}
                            />
                            <StatCard 
                                icon={<CheckSquare size={20} className="text-purple-600 dark:text-purple-400"/>} 
                                title="Items Checked" 
                                value="0" 
                                colorClass={isDarkMode ? 'bg-purple-900/30' : 'bg-purple-100'}
                                isDark={isDarkMode}
                            />
                            <StatCard 
                                icon={<BarChart3 size={20} className="text-yellow-600 dark:text-yellow-400"/>} 
                                title="Family Members" 
                                value="0" 
                                colorClass={isDarkMode ? 'bg-yellow-900/30' : 'bg-yellow-100'}
                                isDark={isDarkMode}
                            />
                        </div>
                    </div>
                </section>
                
                {/* Details Section */}
                <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="space-y-8">
                        {/* Personal Info */}
                        <div className={`${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} p-6 rounded-2xl border shadow-sm transition-colors duration-300`}>
                            <div className="flex justify-between items-center mb-4">
                                <h3 className={`text-xl font-bold ${isDarkMode ? 'text-gray-100' : 'text-gray-800'}`}>Personal Info</h3>
                                {isEditing ? (
                                    <div className="flex gap-2">
                                        <button onClick={handleSave} disabled={saving} className={`p-2 ${isDarkMode ? 'text-green-400 hover:bg-gray-700' : 'text-green-600 hover:bg-green-100'} rounded-full transition-colors disabled:opacity-50`}>
                                            <Save size={18}/>
                                        </button>
                                        <button onClick={handleCancel} className={`p-2 ${isDarkMode ? 'text-gray-400 hover:bg-gray-700' : 'text-gray-500 hover:bg-gray-100'} rounded-full transition-colors`}>
                                            <X size={18}/>
                                        </button>
                                    </div>
                                ) : (
                                    <button onClick={() => setIsEditing(true)} className={`p-2 ${isDarkMode ? 'text-gray-400 hover:bg-gray-700' : 'text-gray-500 hover:bg-gray-100'} rounded-full transition-colors`}>
                                        <Edit3 size={18}/>
                                    </button>
                                )}
                            </div>
                            <div className={`space-y-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                                <div className="flex items-center gap-3">
                                    <User size={18} className={isDarkMode ? 'text-gray-500' : 'text-gray-400'}/> 
                                    {isEditing ? (
                                        <input 
                                            value={editableName} 
                                            onChange={(e) => setEditableName(e.target.value)} 
                                            className={`flex-1 p-1 border-b ${isDarkMode ? 'bg-gray-700 text-gray-100 border-gray-600' : 'bg-white border-gray-300'}`}
                                        />
                                    ) : (
                                        <span>{editableName}</span>
                                    )}
                                </div>
                                <div className="flex items-center gap-3">
                                    <Mail size={18} className={isDarkMode ? 'text-gray-500' : 'text-gray-400'}/> 
                                    <span>{userData.email}</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Phone size={18} className={isDarkMode ? 'text-gray-500' : 'text-gray-400'}/> 
                                    {isEditing ? (
                                        <input 
                                            value={editableContact} 
                                            onChange={(e) => setEditableContact(e.target.value)} 
                                            className={`flex-1 p-1 border-b ${isDarkMode ? 'bg-gray-700 text-gray-100 border-gray-600' : 'bg-white border-gray-300'}`}
                                        />
                                    ) : (
                                        <span>{editableContact || 'Not set'}</span>
                                    )}
                                </div>
                                <div className="flex items-center gap-3">
                                    <Calendar size={18} className={isDarkMode ? 'text-gray-500' : 'text-gray-400'}/> 
                                    <span>Joined on {joinedDate}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div className="space-y-8">
                        {/* Preferences */}
                        <div className={`${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} p-6 rounded-2xl border shadow-sm transition-colors duration-300`}>
                             <h3 className={`text-xl font-bold ${isDarkMode ? 'text-gray-100' : 'text-gray-800'} mb-2`}>Preferences</h3>
                             <div className={`divide-y ${isDarkMode ? 'divide-gray-700' : 'divide-gray-100'}`}>
                                <ToggleSwitch 
                                    enabled={isDarkMode} 
                                    setEnabled={toggleTheme} 
                                    labelOn="Dark Mode" 
                                    labelOff="Light Mode" 
                                    IconOn={Moon} 
                                    IconOff={Sun}
                                    isDark={isDarkMode}
                                />
                                <ToggleSwitch 
                                    enabled={notifications} 
                                    setEnabled={setNotifications} 
                                    labelOn="Notifications On" 
                                    labelOff="Notifications Off" 
                                    IconOn={Bell} 
                                    IconOff={BellOff}
                                    isDark={isDarkMode}
                                />
                             </div>
                        </div>

                        {/* Security Actions */}
                        <div className={`${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} p-6 rounded-2xl border shadow-sm transition-colors duration-300`}>
                            <h3 className={`text-xl font-bold ${isDarkMode ? 'text-gray-100' : 'text-gray-800'} mb-4`}>Account Actions</h3>
                            <div className="space-y-3">
                                <button className={`w-full text-left p-3 font-semibold ${isDarkMode ? 'text-gray-200 bg-gray-700 hover:bg-gray-600' : 'text-gray-700 bg-gray-100 hover:bg-gray-200'} rounded-lg transition-colors`}>
                                    Change Password
                                </button>
                                <button 
                                    onClick={handleLogout} 
                                    className={`w-full text-left p-3 font-semibold ${isDarkMode ? 'text-gray-200 bg-gray-700 hover:bg-gray-600' : 'text-gray-700 bg-gray-100 hover:bg-gray-200'} rounded-lg transition-colors flex items-center gap-2`}
                                >
                                    <LogOut size={16}/> Logout
                                </button>
                                <button className={`w-full text-left p-3 font-semibold ${isDarkMode ? 'text-red-400 bg-red-900/20 hover:bg-red-900/30' : 'text-red-600 bg-red-50 hover:bg-red-100'} rounded-lg transition-colors flex items-center gap-2`}>
                                    <Trash2 size={16}/> Delete Account
                                </button>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            <AvatarModal
                isOpen={showAvatarModal}
                onClose={() => setShowAvatarModal(false)}
                onSelect={handleAvatarSelect}
                currentAvatar={editableAvatar}
                isDark={isDarkMode}
            />
        </div>
    );
};

export default MyProfile;
