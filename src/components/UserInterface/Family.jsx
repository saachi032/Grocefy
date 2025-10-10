import React from 'react';
import UserNavbar from './UserNavbar.jsx';

const Family = () => {
  return (
    <div className="bg-gray-100 min-h-screen font-sans">
      <UserNavbar />
      <main className="w-full max-w-7xl mx-auto px-6 py-12">
        <div className="bg-white p-8 rounded-2xl shadow-md">
            <h1 className="text-4xl font-bold text-gray-800">Organize Your Family 👨‍👩‍👧‍👦</h1>
            <p className="text-gray-600 mt-2">Invite family members, assign tasks, and see everyone's activity here.</p>
        </div>
      </main>
    </div>
  );
};

export default Family;