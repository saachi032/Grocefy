import React from 'react';
import { Link } from 'react-router-dom';
import UserNavbar from './UserNavbar.jsx';
import { Plus, Users, ArrowRight, Mail, CheckCircle, LogIn } from 'lucide-react';

// --- MOCK DATA for the Family Hub ---
const mockUserFamilies = [
    { id: 1, name: "The Sharma Household", members: 3, avatars: ['A', 'R', '🧑'] },
    { id: 2, name: "Weekend Warriors", members: 5, avatars: ['A', 'P', 'S', 'V', 'K'] },
    { id: 3, name: "Apartment 3B", members: 2, avatars: ['A', 'M'] },
];

const mockInvitations = [
    { id: 1, familyName: "Patel Cousins", invitedBy: "Meera Patel" },
];

const mockRecentActivity = [
    { id: 1, text: "Aarav Sharma added ₹1,200 to Expenses in The Sharma Household." },
    { id: 2, text: "You updated the 'Weekend Party' list in Weekend Warriors." },
];

// --- FamilyCard Sub-Component ---
// The entire card is wrapped in a <Link> component to make it a clickable link
const FamilyCard = ({ family }) => (
    <Link to={`/family/${family.id}`} className="block bg-white p-6 rounded-2xl border border-gray-200 shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:border-green-500 group">
        <div className="flex items-center justify-between">
            <div>
                <h3 className="text-xl font-bold text-gray-800">{family.name}</h3>
                <p className="text-sm text-gray-500 font-semibold flex items-center gap-2 mt-1">
                    <Users size={16} /> {family.members} Members
                </p>
            </div>
            <div className="flex -space-x-3">
                {family.avatars.slice(0, 3).map((avatar, index) => (
                    <div key={index} className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center font-bold text-gray-600 border-2 border-white">
                        {avatar}
                    </div>
                ))}
            </div>
        </div>
        <div className="mt-6 w-full flex items-center justify-center gap-2 px-4 py-2 bg-gray-100 font-semibold rounded-lg text-gray-700 group-hover:bg-green-600 group-hover:text-white transition-colors">
            View Dashboard <ArrowRight size={18} />
        </div>
    </Link>
);


// --- MAIN FAMILY HUB PAGE ---
const Family = () => {
  return (
    <div className="bg-gray-100 min-h-screen font-sans">
      <UserNavbar />
      <main className="w-full max-w-7xl mx-auto px-6 py-12">
        <header className="mb-8">
            <h1 className="text-4xl font-bold text-gray-800">Your Family Hub</h1>
            <p className="text-gray-500 mt-1">Select a family to manage, or create a new one to start collaborating.</p>
        </header>
        
        {/* Main Grid: Families + Actions */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockUserFamilies.map(family => (
                <FamilyCard key={family.id} family={family} />
            ))}
            
            {/* Action Cards -- CHANGE IS HERE */}
            <Link to="/family/create" className="flex flex-col items-center justify-center text-center p-6 bg-green-50 rounded-2xl border-2 border-dashed border-green-300 text-green-700 hover:bg-green-100 hover:border-green-400 transition">
                <Plus size={32} />
                <h3 className="text-xl font-bold mt-2">Create New Family</h3>
                <p className="text-sm mt-1">Start a new shared space for lists and expenses.</p>
            </Link>

            <div className="flex flex-col items-center justify-center text-center p-6 bg-blue-50 rounded-2xl border-2 border-dashed border-blue-300 text-blue-700 hover:bg-blue-100 hover:border-blue-400 transition cursor-pointer">
                <LogIn size={32} />
                <h3 className="text-xl font-bold mt-2">Join with Code</h3>
                <p className="text-sm mt-1">Enter an invite code to join an existing family.</p>
            </div>
        </section>

        {/* Pending Invitations Section */}
        <section className="mt-12">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Pending Invitations</h2>
            {mockInvitations.length > 0 ? (
                <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-4">
                    {mockInvitations.map(invite => (
                        <div key={invite.id} className="flex flex-col sm:flex-row items-center justify-between p-3 rounded-lg hover:bg-gray-50">
                            <div className="flex items-center gap-3">
                                <Mail className="text-blue-500" />
                                <p className="text-gray-700">
                                    You have been invited to join <span className="font-bold">{invite.familyName}</span> by <span className="font-semibold">{invite.invitedBy}</span>.
                                </p>
                            </div>
                            <div className="flex gap-3 mt-3 sm:mt-0">
                                <button className="px-4 py-1.5 bg-gray-200 font-semibold rounded-lg text-sm hover:bg-gray-300">Decline</button>
                                <button className="px-4 py-1.5 bg-green-600 text-white font-semibold rounded-lg text-sm hover:bg-green-500">Accept</button>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-gray-500">You have no pending invitations.</p>
            )}
        </section>

        {/* Recent Activity Snippet */}
        <section className="mt-12">
             <h2 className="text-2xl font-bold text-gray-800 mb-4">Recent Activity</h2>
             <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 space-y-4">
                {mockRecentActivity.map(activity => (
                    <div key={activity.id} className="flex items-center gap-3 text-sm">
                        <CheckCircle size={16} className="text-green-500 flex-shrink-0" />
                        <p className="text-gray-600">{activity.text}</p>
                    </div>
                ))}
             </div>
        </section>
      </main>
    </div>
  );
};

export default Family;