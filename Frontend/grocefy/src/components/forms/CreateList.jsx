import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import UserNavbar from '../UserInterface/UserNavbar.jsx';
import { 
    Users, User, Share2, ArrowLeft, X,
    DollarSign, Zap, PartyPopper, ShoppingCart
} from 'lucide-react';

const CreateList = () => {
  const [listName, setListName] = useState('');
  const [listType, setListType] = useState('Individual');
  const [description, setDescription] = useState('');
  const [budget, setBudget] = useState('');
  const [color, setColor] = useState('#10B981'); // Default Grocefy Green
  const [icon, setIcon] = useState('ShoppingCart');
  
  // State for email chip input
  const [emails, setEmails] = useState([]);
  const [emailInput, setEmailInput] = useState('');
  
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!listName) {
      alert('Please provide a list name.');
      return;
    }
    const formData = { listName, listType, description, budget, color, icon, sharedWith: emails };
    console.log('Form Submitted:', formData);
    navigate('/lists');
  };

  const handleEmailKeyDown = (e) => {
    if (e.key === ' ' || e.key === ',' || e.key === 'Enter') {
      e.preventDefault();
      const newEmail = emailInput.trim();
      if (newEmail && !emails.includes(newEmail)) {
        setEmails([...emails, newEmail]);
        setEmailInput('');
      }
    } else if (e.key === 'Backspace' && emailInput === '' && emails.length > 0) {
      setEmails(emails.slice(0, -1));
    }
  };

  const removeEmail = (indexToRemove) => {
    setEmails(emails.filter((_, index) => index !== indexToRemove));
  };
  
  const colors = ['#10B981', '#3B82F6', '#8B5CF6', '#F59E0B', '#EF4444'];
  const icons = { ShoppingCart, PartyPopper, Zap };

  return (
    <div className="bg-gray-100 min-h-screen font-sans">
      <UserNavbar />
      <main className="w-full max-w-4xl mx-auto px-4 py-12">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
            <div>
                <Link to="/lists" className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-800 mb-2">
                    <ArrowLeft size={16}/> Back to Lists
                </Link>
                <h1 className="text-4xl font-bold text-gray-800">Craft Your New List</h1>
            </div>
            <div className="flex items-center gap-4 self-start sm:self-center">
                <button type="button" onClick={() => navigate('/lists')} className="px-6 py-2 bg-white border font-semibold text-gray-700 rounded-lg hover:bg-gray-100 transition-colors">
                    Cancel
                </button>
                <button form="create-list-form" type="submit" className="px-8 py-2 bg-green-600 font-bold text-white rounded-lg hover:bg-green-500 transition-colors">
                    Create List
                </button>
            </div>
        </div>

        <form id="create-list-form" onSubmit={handleSubmit} className="grid grid-cols-1 gap-8">
            
            {/* Card 1: The Essentials */}
            <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">The Essentials</h2>
                <div className="space-y-6">
                    <div>
                        <label htmlFor="listName" className="block text-sm font-semibold text-gray-700 mb-1">List Name</label>
                        <input type="text" id="listName" value={listName} onChange={(e) => setListName(e.target.value)} placeholder="e.g., Weekly Groceries" className="w-full text-lg px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500" required/>
                    </div>
                    <div>
                        <label htmlFor="description" className="block text-sm font-semibold text-gray-700 mb-1">Description (Optional)</label>
                        <textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} rows="3" placeholder="A short description of what this list is for." className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"></textarea>
                    </div>
                </div>
            </div>

            {/* Card 2: Customization & Settings */}
            <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Customization & Settings</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">List Type</label>
                        <div className="flex border border-gray-300 rounded-lg p-1 bg-gray-50">
                            <button type="button" onClick={() => setListType('Individual')} className={`w-1/2 flex items-center justify-center gap-2 px-4 py-2 rounded-md font-semibold transition-colors ${listType === 'Individual' ? 'bg-green-600 text-white shadow' : 'text-gray-600 hover:bg-gray-200'}`}><User size={16} /> Individual</button>
                            <button type="button" onClick={() => setListType('Shared')} className={`w-1/2 flex items-center justify-center gap-2 px-4 py-2 rounded-md font-semibold transition-colors ${listType === 'Shared' ? 'bg-green-600 text-white shadow' : 'text-gray-600 hover:bg-gray-200'}`}><Users size={16} /> Shared</button>
                        </div>
                    </div>
                    <div>
                        <label htmlFor="budget" className="block text-sm font-semibold text-gray-700 mb-1">Budget (Optional)</label>
                        <div className="relative">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 font-semibold">₹</span>
                            <input type="number" id="budget" value={budget} onChange={(e) => setBudget(e.target.value)} placeholder="e.g., 5000" className="w-full pl-8 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500" />
                        </div>
                    </div>
                    <div className="md:col-span-2">
                        <label className="block text-sm font-semibold text-gray-700 mb-2">List Color</label>
                        <div className="flex gap-4">
                            {colors.map(c => (
                                <button type="button" key={c} onClick={() => setColor(c)} className={`w-10 h-10 rounded-full transition-transform transform hover:scale-110 ${color === c ? 'ring-2 ring-offset-2 ring-green-500' : ''}`} style={{ backgroundColor: c }}></button>
                            ))}
                        </div>
                    </div>
                    <div className="md:col-span-2">
                        <label className="block text-sm font-semibold text-gray-700 mb-2">List Icon</label>
                         <div className="flex gap-4">
                            {Object.keys(icons).map(iconName => {
                                const IconComponent = icons[iconName];
                                return (
                                <button type="button" key={iconName} onClick={() => setIcon(iconName)} className={`w-12 h-12 rounded-lg flex items-center justify-center transition-colors ${icon === iconName ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
                                    <IconComponent size={24} />
                                </button>
                            )})}
                        </div>
                    </div>
                </div>
            </div>

            {/* Card 3 (Conditional): Sharing */}
            {listType === 'Shared' && (
                <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3"><Share2 /> Sharing</h2>
                    <label htmlFor="members" className="block text-sm font-semibold text-gray-700 mb-1">Invite Members by Email</label>
                    <div className="flex flex-wrap items-center gap-2 p-2 border border-gray-300 rounded-lg focus-within:ring-2 focus-within:ring-green-500">
                        {emails.map((email, index) => (
                            <div key={index} className="flex items-center gap-1.5 bg-gray-200 text-gray-800 text-sm font-semibold pl-3 pr-2 py-1 rounded-full">
                                {email}
                                <button type="button" onClick={() => removeEmail(index)} className="text-gray-500 hover:text-gray-800">
                                    <X size={16} />
                                </button>
                            </div>
                        ))}
                        <input type="email" id="members" value={emailInput} onChange={e => setEmailInput(e.target.value)} onKeyDown={handleEmailKeyDown} placeholder={emails.length === 0 ? "Enter emails and press space..." : ""}
                            className="flex-grow bg-transparent outline-none p-1"/>
                    </div>
                </div>
            )}
        </form>
      </main>
    </div>
  );
};

export default CreateList;