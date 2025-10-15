import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import UserNavbar from '../UserInterface/UserNavbar.jsx';
import {
    Users, FileText, Wallet, Mail, Lock, Check,
    Plus, PartyPopper, Copy, ArrowRight, X
} from 'lucide-react';

const CreateFamily = () => {
    const navigate = useNavigate();

    // Form state
    const [familyName, setFamilyName] = useState('');
    const [description, setDescription] = useState('');
    const [budget, setBudget] = useState('');
    const [selectedEmoji, setSelectedEmoji] = useState('🏡');
    const [visibility, setVisibility] = useState('Private');
    const [emails, setEmails] = useState([]);
    const [emailInput, setEmailInput] = useState('');

    // Success state
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [familyCode, setFamilyCode] = useState('');
    const [copied, setCopied] = useState(false); // State for the "copied" message

    const familyEmojis = ['🏡', '👨‍👩‍👧‍👦', '⭐', '🏆', '😎', '❤️'];

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

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = { familyName, description, budget, selectedEmoji, visibility, members: emails };
        console.log('Family Created:', formData);
        const generatedCode = 'A3B-7K9-P2X';
        setFamilyCode(generatedCode);
        setIsSubmitted(true);
    };

    // --- NEW: Function to handle copying and redirecting ---
    const handleCopyAndRedirect = () => {
        navigator.clipboard.writeText(familyCode).then(() => {
            setCopied(true); // Show "Copied!" feedback

            // Redirect to the family hub after 1.5 seconds
            setTimeout(() => {
                navigate('/family');
            }, 1500);
        }).catch(err => {
            console.error('Failed to copy: ', err);
            // Fallback redirect if copy fails
            setTimeout(() => {
                navigate('/family');
            }, 1500);
        });
    };

    // --- UPDATED Success Modal Component ---
    const SuccessModal = () => (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl p-8 shadow-2xl text-center max-w-md w-full">
                <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <PartyPopper size={32} />
                </div>
                <h2 className="text-2xl font-bold text-gray-800">Family created successfully!</h2>
                <p className="text-gray-500 mt-2">Share this code with your members to let them join.</p>
                <div className="my-6 p-3 bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg">
                    <p className="text-2xl font-mono font-bold text-gray-700 tracking-widest">{familyCode}</p>
                </div>
                <div className="flex flex-col gap-3">
                    <button
                        onClick={handleCopyAndRedirect}
                        disabled={copied} // Prevent multiple clicks
                        className={`w-full flex items-center justify-center gap-2 px-4 py-2.5 font-bold rounded-lg transition-all duration-300 ${
                            copied
                                ? 'bg-green-100 text-green-700 cursor-default'
                                : 'bg-green-600 text-white hover:bg-green-500'
                        }`}
                    >
                        {copied ? (
                            <>
                                <Check size={16} /> Copied to clipboard!
                            </>
                        ) : (
                            <>
                                <Copy size={16} /> Copy Code & Go to Hub
                            </>
                        )}
                    </button>
                </div>
            </div>
        </div>
    );

    if (isSubmitted) {
        return <SuccessModal />;
    }

    // --- Main Form Component (No Changes Below) ---
    return (
        <div className="bg-gray-100 min-h-screen font-sans">
            <UserNavbar />
            <main className="w-full max-w-3xl mx-auto px-4 py-12">
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold text-gray-800">Create a New Family</h1>
                    <p className="text-gray-500 mt-2 max-w-xl mx-auto">
                        Start a shared space where everyone can track groceries and expenses together.
                    </p>
                </div>
                <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm space-y-6">
                    <div>
                        <label htmlFor="familyName" className="block text-sm font-semibold text-gray-700 mb-1 flex items-center gap-2"><Users size={16} /> Family Name</label>
                        <input type="text" id="familyName" value={familyName} onChange={(e) => setFamilyName(e.target.value)} placeholder="e.g., The Sharma Household" className="w-full text-lg px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500" required/>
                    </div>
                    <div>
                        <label htmlFor="description" className="block text-sm font-semibold text-gray-700 mb-1 flex items-center gap-2"><FileText size={16} /> Description (Optional)</label>
                        <textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} rows="2" placeholder="A short tagline or purpose for your family hub." className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"></textarea>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label htmlFor="budget" className="block text-sm font-semibold text-gray-700 mb-1 flex items-center gap-2"><Wallet size={16} /> Budget Limit (Optional)</label>
                            <div className="relative">
                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 font-semibold">₹</span>
                                <input type="number" id="budget" value={budget} onChange={(e) => setBudget(e.target.value)} placeholder="Monthly budget" className="w-full pl-8 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500" />
                            </div>
                        </div>
                        <div>
                             <label className="block text-sm font-semibold text-gray-700 mb-1 flex items-center gap-2"><Lock size={16} /> Visibility</label>
                             <div className="flex border border-gray-300 rounded-lg p-1 bg-gray-50">
                                <button type="button" onClick={() => setVisibility('Private')} className={`w-1/2 py-2 rounded-md font-semibold transition-colors text-sm ${visibility === 'Private' ? 'bg-green-600 text-white shadow' : 'text-gray-600 hover:bg-gray-200'}`}>Private</button>
                                <button type="button" onClick={() => setVisibility('Invite Only')} className={`w-1/2 py-2 rounded-md font-semibold transition-colors text-sm ${visibility === 'Invite Only' ? 'bg-green-600 text-white shadow' : 'text-gray-600 hover:bg-gray-200'}`}>Invite Only</button>
                            </div>
                        </div>
                    </div>
                     <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Profile Icon / Emoji</label>
                        <div className="flex gap-3">
                            {familyEmojis.map(emoji => (
                                <button type="button" key={emoji} onClick={() => setSelectedEmoji(emoji)} className={`w-12 h-12 text-2xl rounded-full flex items-center justify-center transition-transform transform hover:scale-110 ${selectedEmoji === emoji ? 'ring-2 ring-offset-2 ring-green-500' : 'bg-gray-100'}`}>
                                    {emoji}
                                </button>
                            ))}
                        </div>
                    </div>
                    <div>
                        <label htmlFor="members" className="block text-sm font-semibold text-gray-700 mb-1 flex items-center gap-2"><Mail size={16} /> Invite Members (Optional)</label>
                        <div className="flex flex-wrap items-center gap-2 p-2 border border-gray-300 rounded-lg focus-within:ring-2 focus-within:ring-green-500">
                            {emails.map((email, index) => (
                                <div key={index} className="flex items-center gap-1.5 bg-gray-200 text-gray-800 text-sm font-semibold pl-3 pr-2 py-1 rounded-full">
                                    {email}
                                    <button type="button" onClick={() => removeEmail(index)} className="text-gray-500 hover:text-gray-800"><X size={16} /></button>
                                </div>
                            ))}
                            <input type="email" id="members" value={emailInput} onChange={e => setEmailInput(e.target.value)} onKeyDown={handleEmailKeyDown} placeholder={emails.length === 0 ? "Enter emails and press space..." : ""} className="flex-grow bg-transparent outline-none p-1"/>
                        </div>
                    </div>
                    <div className="flex flex-col-reverse sm:flex-row items-center justify-end gap-4 pt-4 border-t border-gray-200 mt-2">
                        <Link to="/family" className="font-semibold text-gray-600 hover:text-gray-800">Back to Family Hub</Link>
                        <button type="submit" className="w-full sm:w-auto px-8 py-3 bg-green-600 font-bold text-white rounded-lg hover:bg-green-500 transition-colors shadow-sm hover:shadow-md">
                            Create Family
                        </button>
                    </div>
                </form>
            </main>
        </div>
    );
};

export default CreateFamily;