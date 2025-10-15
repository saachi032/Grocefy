import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import UserNavbar from './UserNavbar.jsx';
import { 
  Search, Plus, CheckCircle2, Users, ChevronDown, 
  Eye, Pencil, Trash2, ShoppingCart, PartyPopper, Zap
} from 'lucide-react';

// --- UPDATED MOCK DATA with color and icon ---
const mockLists = [
  { id: 1, name: 'Weekly Essentials', totalItems: 15, completedItems: 12, lastUpdated: '2 hours ago', status: 'Active', isShared: true, color: '#10B981', icon: 'ShoppingCart' },
  { id: 2, name: 'Weekend Party', totalItems: 25, completedItems: 25, lastUpdated: '1 day ago', status: 'Completed', isShared: false, color: '#8B5CF6', icon: 'PartyPopper' },
  { id: 3, name: 'Household Cleaning', totalItems: 8, completedItems: 8, lastUpdated: '3 days ago', status: 'Completed', isShared: true, color: '#3B82F6', icon: 'ShoppingCart' },
  { id: 4, name: 'Quick Snacks Run', totalItems: 12, completedItems: 5, lastUpdated: '5 days ago', status: 'Active', isShared: false, color: '#F59E0B', icon: 'Zap' },
];

const icons = { ShoppingCart, PartyPopper, Zap };

// --- UPDATED ListCard Component ---
const ListCard = ({ list }) => {
  const completionPercentage = list.totalItems > 0 ? (list.completedItems / list.totalItems) * 100 : 0;
  const isCompleted = list.status === 'Completed';
  const IconComponent = icons[list.icon] || ShoppingCart;

  return (
    <div className={`group relative bg-white border border-gray-200 rounded-2xl shadow-md p-6 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 overflow-hidden ${isCompleted ? 'bg-gray-50' : ''}`}>
      {/* Color Bar */}
      <div className="absolute left-0 top-0 h-full w-1.5" style={{ backgroundColor: list.color }}></div>
      
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <IconComponent size={20} className="text-gray-600" />
          <h3 className="text-xl font-bold text-gray-800 pr-4">{list.name}</h3>
        </div>
        <div className="flex-shrink-0">
          {isCompleted ? (
            <span className="flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold text-green-700 bg-green-100 rounded-full"><CheckCircle2 size={14} /> Completed</span>
          ) : list.isShared && (
            <span className="flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold text-blue-700 bg-blue-100 rounded-full"><Users size={14} /> Shared</span>
          )}
        </div>
      </div>

      <div className={`text-sm text-gray-500 mb-4 pl-9 ${isCompleted ? 'opacity-70' : ''}`}>
        <p>{list.totalItems} items</p>
        <p>Updated {list.lastUpdated}</p>
      </div>

      <div className="pl-9">
        <div className="flex justify-between items-center mb-1">
          <span className="text-xs font-medium text-gray-600">Completion</span>
          <span className="text-xs font-bold text-green-600">{Math.round(completionPercentage)}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div className="bg-green-500 h-2 rounded-full" style={{ width: `${completionPercentage}%` }}></div>
        </div>
        <p className="text-right text-xs text-gray-500 mt-1">{list.completedItems} / {list.totalItems} items</p>
      </div>
      
      <div className="absolute inset-0 bg-black bg-opacity-40 rounded-2xl flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <button className="p-3 bg-white text-gray-800 rounded-full hover:bg-green-500 hover:text-white transition-colors"><Eye size={20} /></button>
        <button className="p-3 bg-white text-gray-800 rounded-full hover:bg-green-500 hover:text-white transition-colors"><Pencil size={20} /></button>
        <button className="p-3 bg-white text-red-500 rounded-full hover:bg-red-500 hover:text-white transition-colors"><Trash2 size={20} /></button>
      </div>
    </div>
  );
};


const Lists = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('All');

  const filteredLists = useMemo(() => {
    return mockLists
      .filter(list => filter === 'All' || (filter === 'Shared' ? list.isShared : list.status === filter))
      .filter(list => list.name.toLowerCase().includes(searchTerm.toLowerCase()));
  }, [searchTerm, filter]);
  
  const totalLists = mockLists.length;
  const activeLists = mockLists.filter(l => l.status === 'Active').length;
  const completedLists = totalLists - activeLists;

  return (
    <div className="bg-gray-100 min-h-screen font-sans">
      <UserNavbar />
      <main className="w-full max-w-7xl mx-auto px-6 py-12">
        <header className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
          <h1 className="text-4xl font-bold text-gray-800">Your Grocery Lists</h1>
          <div className="flex items-center gap-3 w-full md:w-auto">
            <div className="relative w-full md:w-56">
              <Search size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input type="text" placeholder="Search lists..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500" />
            </div>
            <div className="relative">
                <select value={filter} onChange={(e) => setFilter(e.target.value)}
                    className="appearance-none w-full md:w-auto bg-white border border-gray-300 text-gray-700 py-2.5 pl-4 pr-10 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500">
                    <option>All</option>
                    <option>Active</option>
                    <option>Completed</option>
                    <option>Shared</option>
                </select>
                <ChevronDown size={20} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"/>
            </div>
            <Link to="/lists/create" className="flex items-center gap-2 px-5 py-2.5 bg-green-600 text-white font-bold rounded-lg hover:bg-green-500 transition-transform transform hover:scale-105 shadow-sm">
              <Plus size={20}/>
              <span className="hidden sm:inline">Create List</span>
            </Link>
          </div>
        </header>

        <section className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10 bg-white p-4 rounded-xl border border-gray-200">
            <div className="text-center">
                <p className="text-2xl font-bold text-gray-800">{totalLists}</p>
                <p className="text-sm text-gray-500">Total Lists</p>
            </div>
            <div className="text-center">
                <p className="text-2xl font-bold text-green-600">{activeLists}</p>
                <p className="text-sm text-gray-500">Active Lists</p>
            </div>
            <div className="text-center">
                <p className="text-2xl font-bold text-gray-500">{completedLists}</p>
                <p className="text-sm text-gray-500">Completed</p>
            </div>
            <div className="text-center">
                <p className="text-2xl font-bold text-blue-600">{mockLists.filter(l => l.isShared).length}</p>
                <p className="text-sm text-gray-500">Shared Lists</p>
            </div>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredLists.length > 0 ? (
            filteredLists.map(list => <ListCard key={list.id} list={list} />)
          ) : (
            <div className="lg-col-span-3 text-center py-16 px-6 bg-white rounded-2xl border border-gray-200">
              <h3 className="text-xl font-semibold text-gray-700">No lists found</h3>
              <p className="text-gray-500 mt-2">Try adjusting your search or filter to find what you're looking for.</p>
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

export default Lists;