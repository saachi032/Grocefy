import React from 'react';
import { useNavigate } from 'react-router-dom';
import UserNavbar from '../UserInterface/UserNavbar.jsx';
import { Mail, Send } from 'lucide-react';

const InviteFamily = () => {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Invite member form submitted');
    // In a real app, you would handle the API call to send the invitation here.
    navigate('/family');
  };

  return (
    <div className="bg-gray-100 min-h-screen font-sans">
      <UserNavbar />
      <main className="w-full max-w-2xl mx-auto px-4 py-12">
        <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <Mail size={32} className="text-green-600" />
            <h1 className="text-3xl font-bold text-gray-800">Invite a Family Member</h1>
          </div>
          <p className="text-gray-500 mb-8">Send an invitation to join your family. They will receive an email with instructions.</p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-1">
                Member's Email
              </label>
              <input
                type="email"
                id="email"
                placeholder="e.g., member@example.com"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                required
              />
            </div>
            
            <div className="flex justify-end gap-4 pt-4 border-t border-gray-200">
                <button type="button" onClick={() => navigate('/family')} className="px-6 py-2 bg-gray-100 font-semibold text-gray-700 rounded-lg hover:bg-gray-200">
                    Cancel
                </button>
                <button type="submit" className="px-8 py-2 bg-green-600 font-bold text-white rounded-lg hover:bg-green-500 flex items-center gap-2">
                    <Send size={16}/> Send Invite
                </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default InviteFamily;