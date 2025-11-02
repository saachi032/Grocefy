import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import UserNavbar from './UserNavbar.jsx';
import { useTheme } from '../../context/ThemeContext.jsx';
import { useAuth } from '../../context/AuthContext.jsx';
import { Plus, Users, ArrowRight, Mail, CheckCircle, LogIn, X } from 'lucide-react';

// --- FamilyCard Sub-Component ---
const FamilyCard = ({ family, isDark }) => (
    <Link to={`/family/${family._id}`} className={`block ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} p-6 rounded-2xl border shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:border-green-500 group`}>
        <div className="flex items-center justify-between">
            <div>
                <h3 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-800'}`}>{family.name}</h3>
                <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'} font-semibold flex items-center gap-2 mt-1`}>
                    <Users size={16} /> {family.members} Members
                </p>
            </div>
            <div className="flex -space-x-3">
                {family.avatars.slice(0, 3).map((avatar, index) => (
                    <div key={index} className={`w-10 h-10 ${isDark ? 'bg-gray-700' : 'bg-gray-200'} rounded-full flex items-center justify-center text-xl border-2 ${isDark ? 'border-gray-800' : 'border-white'}`}>
                        {avatar}
                    </div>
                ))}
            </div>
        </div>
        <div className={`mt-6 w-full flex items-center justify-center gap-2 px-4 py-2 ${isDark ? 'bg-gray-700' : 'bg-gray-100'} font-semibold rounded-lg ${isDark ? 'text-gray-300' : 'text-gray-700'} group-hover:bg-green-600 group-hover:text-white transition-colors`}>
            View Dashboard <ArrowRight size={18} />
        </div>
    </Link>
);

// Join with Code Modal
const JoinCodeModal = ({ isOpen, onClose, onJoin, isDark, loading }) => {
    const [code, setCode] = useState('');

    if (!isOpen) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        if (code.trim()) {
            onJoin(code.trim());
            setCode('');
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4" onClick={onClose}>
            <div 
                className={`${isDark ? 'bg-gray-800' : 'bg-white'} w-full max-w-md rounded-2xl shadow-2xl p-6`}
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex justify-between items-center mb-4">
                    <h3 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-800'}`}>Join with Code</h3>
                    <button onClick={onClose} className={isDark ? 'text-gray-400 hover:text-gray-200' : 'text-gray-500 hover:text-gray-700'}>
                        <X size={24} />
                    </button>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className={`block text-sm font-semibold ${isDark ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                            Enter Family Code
                        </label>
                        <input
                            type="text"
                            value={code}
                            onChange={(e) => setCode(e.target.value.toUpperCase())}
                            placeholder="ABC-123-XYZ"
                            className={`w-full px-4 py-2.5 ${isDark ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-500' : 'bg-white border-gray-300'} border rounded-lg focus:ring-2 focus:ring-green-500 outline-none`}
                            required
                        />
                        <p className={`text-xs mt-1 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                            Ask your family admin for the invite code
                        </p>
                    </div>
                    <div className="flex gap-3">
                        <button
                            type="button"
                            onClick={onClose}
                            className={`flex-1 px-4 py-2.5 ${isDark ? 'bg-gray-700 hover:bg-gray-600 text-gray-300' : 'bg-gray-200 hover:bg-gray-300'} font-semibold rounded-lg transition-colors`}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={loading || !code.trim()}
                            className="flex-1 px-4 py-2.5 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? 'Joining...' : 'Join'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

// --- MAIN FAMILY HUB PAGE ---
const Family = () => {
  const { isDarkMode } = useTheme();
  const { user } = useAuth();
  const [families, setFamilies] = useState([]);
  const [invitations, setInvitations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [joinLoading, setJoinLoading] = useState(false);
  const [showJoinModal, setShowJoinModal] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Fetch families and invitations
  useEffect(() => {
    const fetchData = async () => {
      if (!user?.token) {
        setLoading(false);
        return;
      }

      try {
        const [familiesRes, invitationsRes] = await Promise.all([
          fetch('/api/families', {
            headers: {
              'Authorization': `Bearer ${user.token}`,
              'Content-Type': 'application/json',
            },
          }),
          fetch('/api/families/invitations', {
            headers: {
              'Authorization': `Bearer ${user.token}`,
              'Content-Type': 'application/json',
            },
          }),
        ]);

        if (familiesRes.ok) {
          const familiesData = await familiesRes.json();
          if (familiesData.success) {
            setFamilies(familiesData.families);
          }
        }

        if (invitationsRes.ok) {
          const invitationsData = await invitationsRes.json();
          if (invitationsData.success) {
            setInvitations(invitationsData.invitations);
          }
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user]);

  const handleJoinFamily = async (code) => {
    if (!user?.token) return;

    setJoinLoading(true);
    setError('');
    setSuccess('');

    try {
      const response = await fetch('/api/families/join', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${user.token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code }),
      });

      const data = await response.json();

      if (data.success) {
        setSuccess(`Successfully joined ${data.family.name}!`);
        setShowJoinModal(false);
        // Refresh families list
        const familiesRes = await fetch('/api/families', {
          headers: {
            'Authorization': `Bearer ${user.token}`,
            'Content-Type': 'application/json',
          },
        });
        if (familiesRes.ok) {
          const familiesData = await familiesRes.json();
          if (familiesData.success) {
            setFamilies(familiesData.families);
          }
        }
      } else {
        setError(data.message || 'Failed to join family');
      }
    } catch (error) {
      console.error('Error joining family:', error);
      setError('Network error. Please try again.');
    } finally {
      setJoinLoading(false);
    }
  };

  const handleInvitation = async (invitationId, action) => {
    if (!user?.token) return;

    try {
      const response = await fetch(`/api/families/invitations/${invitationId}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${user.token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ action }),
      });

      const data = await response.json();

      if (data.success) {
        // Refresh data
        const [familiesRes, invitationsRes] = await Promise.all([
          fetch('/api/families', {
            headers: {
              'Authorization': `Bearer ${user.token}`,
              'Content-Type': 'application/json',
            },
          }),
          fetch('/api/families/invitations', {
            headers: {
              'Authorization': `Bearer ${user.token}`,
              'Content-Type': 'application/json',
            },
          }),
        ]);

        if (familiesRes.ok) {
          const familiesData = await familiesRes.json();
          if (familiesData.success) {
            setFamilies(familiesData.families);
          }
        }

        if (invitationsRes.ok) {
          const invitationsData = await invitationsRes.json();
          if (invitationsData.success) {
            setInvitations(invitationsData.invitations);
          }
        }
      }
    } catch (error) {
      console.error('Error handling invitation:', error);
    }
  };

  if (loading) {
    return (
      <div className={`${isDarkMode ? 'bg-gray-900' : 'bg-gray-100'} min-h-screen font-sans transition-colors duration-300`}>
        <UserNavbar />
        <main className="w-full max-w-7xl mx-auto px-6 py-12 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
            <p className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>Loading families...</p>
          </div>
        </main>
      </div>
    );
  }
  
  return (
    <div className={`${isDarkMode ? 'bg-gray-900' : 'bg-gray-100'} min-h-screen font-sans transition-colors duration-300`}>
      <UserNavbar />
      <main className="w-full max-w-7xl mx-auto px-6 py-12">
        <header className="mb-8">
            <h1 className={`text-4xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>Your Family Hub</h1>
            <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-500'} mt-1`}>Select a family to manage, or create a new one to start collaborating.</p>
        </header>

        {/* Messages */}
        {error && (
          <div className={`mb-4 p-4 ${isDarkMode ? 'bg-red-900/30 border-red-700 text-red-300' : 'bg-red-50 border-red-300 text-red-700'} border rounded-lg`}>
            {error}
          </div>
        )}
        {success && (
          <div className={`mb-4 p-4 ${isDarkMode ? 'bg-green-900/30 border-green-700 text-green-300' : 'bg-green-50 border-green-300 text-green-700'} border rounded-lg`}>
            {success}
          </div>
        )}
        
        {/* Main Grid: Families + Actions */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {families.map(family => (
                <FamilyCard key={family._id} family={family} isDark={isDarkMode} />
            ))}
            
            {/* Action Cards */}
            <Link to="/family/create" className={`flex flex-col items-center justify-center text-center p-6 ${isDarkMode ? 'bg-green-900/30 border-green-700 text-green-300 hover:bg-green-900/50' : 'bg-green-50 border-green-300 text-green-700 hover:bg-green-100'} rounded-2xl border-2 border-dashed hover:border-green-400 transition`}>
                <Plus size={32} />
                <h3 className={`text-xl font-bold mt-2 ${isDarkMode ? 'text-green-200' : ''}`}>Create New Family</h3>
                <p className={`text-sm mt-1 ${isDarkMode ? 'text-green-300/70' : ''}`}>Start a new shared space for lists and expenses.</p>
            </Link>

            <div 
                onClick={() => setShowJoinModal(true)}
                className={`flex flex-col items-center justify-center text-center p-6 ${isDarkMode ? 'bg-blue-900/30 border-blue-700 text-blue-300 hover:bg-blue-900/50' : 'bg-blue-50 border-blue-300 text-blue-700 hover:bg-blue-100'} rounded-2xl border-2 border-dashed hover:border-blue-400 transition cursor-pointer`}
            >
                <LogIn size={32} />
                <h3 className={`text-xl font-bold mt-2 ${isDarkMode ? 'text-blue-200' : ''}`}>Join with Code</h3>
                <p className={`text-sm mt-1 ${isDarkMode ? 'text-blue-300/70' : ''}`}>Enter an invite code to join an existing family.</p>
            </div>
        </section>

        {/* Pending Invitations Section */}
        <section className="mt-12">
            <h2 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'} mb-4`}>Pending Invitations</h2>
            {invitations.length > 0 ? (
                <div className={`${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-2xl border shadow-sm p-4 transition-colors`}>
                    {invitations.map(invite => (
                        <div key={invite._id} className={`flex flex-col sm:flex-row items-center justify-between p-3 rounded-lg ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50'} transition-colors mb-2`}>
                            <div className="flex items-center gap-3">
                                <Mail className="text-blue-500" />
                                <p className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>
                                    You have been invited to join <span className="font-bold">{invite.familyName}</span> by <span className="font-semibold">{invite.invitedBy}</span>.
                                </p>
                            </div>
                            <div className="flex gap-3 mt-3 sm:mt-0">
                                <button 
                                    onClick={() => handleInvitation(invite._id, 'decline')}
                                    className={`px-4 py-1.5 ${isDarkMode ? 'bg-gray-700 hover:bg-gray-600 text-gray-300' : 'bg-gray-200 hover:bg-gray-300'} font-semibold rounded-lg text-sm transition-colors`}
                                >
                                    Decline
                                </button>
                                <button 
                                    onClick={() => handleInvitation(invite._id, 'accept')}
                                    className="px-4 py-1.5 bg-green-600 text-white font-semibold rounded-lg text-sm hover:bg-green-500 transition-colors"
                                >
                                    Accept
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p className={isDarkMode ? 'text-gray-400' : 'text-gray-500'}>You have no pending invitations.</p>
            )}
        </section>
      </main>

      <JoinCodeModal
        isOpen={showJoinModal}
        onClose={() => {
          setShowJoinModal(false);
          setError('');
        }}
        onJoin={handleJoinFamily}
        isDark={isDarkMode}
        loading={joinLoading}
      />
    </div>
  );
};

export default Family;
