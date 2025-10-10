    import React, { useState, useMemo } from 'react';
    import UserNavbar from './UserNavbar.jsx';
    import { Search, Plus, List, Loader, CheckCircle2, Users, Eye, Pencil, Trash2, ChevronDown } from 'lucide-react';

    // --- MOCK DATA for the Lists page ---
    const mockLists = [
    { id: 1, name: 'Weekly Essentials', totalItems: 15, completedItems: 12, lastUpdated: '2 hours ago', status: 'Active', isShared: true },
    { id: 2, name: 'Weekend Party', totalItems: 25, completedItems: 25, lastUpdated: '1 day ago', status: 'Completed', isShared: false },
    { id: 3, name: 'Household Cleaning', totalItems: 8, completedItems: 8, lastUpdated: '3 days ago', status: 'Completed', isShared: true },
    { id: 4, name: 'Mom’s Birthday Prep', totalItems: 12, completedItems: 5, lastUpdated: '5 days ago', status: 'Active', isShared: false },
    { id: 5, name: 'Snacks & Drinks', totalItems: 18, completedItems: 18, lastUpdated: '1 week ago', status: 'Completed', isShared: false },
    { id: 6, name: 'Monthly Restock', totalItems: 42, completedItems: 10, lastUpdated: '2 weeks ago', status: 'Active', isShared: true },
    ];


    // --- ListCard Sub-Component ---
    const ListCard = ({ list }) => {
    const completionPercentage = list.totalItems > 0 ? (list.completedItems / list.totalItems) * 100 : 0;
    const isCompleted = list.status === 'Completed';

    return (
        <div className={`group relative bg-white border border-gray-200 rounded-2xl shadow-md p-6 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${isCompleted ? 'bg-gray-50' : ''}`}>
        {/* Card Header */}
        <div className="flex items-start justify-between mb-4">
            <h3 className="text-xl font-bold text-gray-800 pr-4">{list.name}</h3>
            <div className="flex-shrink-0">
            {isCompleted ? (
                <span className="flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold text-green-700 bg-green-100 rounded-full">
                <CheckCircle2 size={14} /> Completed
                </span>
            ) : list.isShared && (
                <span className="flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold text-blue-700 bg-blue-100 rounded-full">
                <Users size={14} /> Shared
                </span>
            )}
            </div>
        </div>

        {/* Card Meta Info */}
        <div className={`text-sm text-gray-500 mb-4 ${isCompleted ? 'opacity-70' : ''}`}>
            <p>{list.totalItems} items</p>
            <p>Updated {list.lastUpdated}</p>
        </div>

        {/* Progress Bar */}
        <div>
            <div className="flex justify-between items-center mb-1">
            <span className="text-xs font-medium text-gray-600">Completion</span>
            <span className="text-xs font-bold text-green-600">{Math.round(completionPercentage)}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
            <div className="bg-green-500 h-2 rounded-full" style={{ width: `${completionPercentage}%` }}></div>
            </div>
            <p className="text-right text-xs text-gray-500 mt-1">{list.completedItems} / {list.totalItems} items</p>
        </div>
        
        {/* Hover Actions Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-40 rounded-2xl flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <button className="p-3 bg-white text-gray-800 rounded-full hover:bg-green-500 hover:text-white transition-colors"><Eye size={20} /></button>
            <button className="p-3 bg-white text-gray-800 rounded-full hover:bg-green-500 hover:text-white transition-colors"><Pencil size={20} /></button>
            <button className="p-3 bg-white text-red-500 rounded-full hover:bg-red-500 hover:text-white transition-colors"><Trash2 size={20} /></button>
        </div>
        </div>
    );
    };


    // --- Main Lists Page Component ---
    const Lists = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [filter, setFilter] = useState('All');

    const filteredLists = useMemo(() => {
        return mockLists
        .filter(list => {
            if (filter === 'All') return true;
            if (filter === 'Active') return list.status === 'Active';
            if (filter === 'Completed') return list.status === 'Completed';
            if (filter === 'Shared') return list.isShared;
            return true;
        })
        .filter(list =>
            list.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [searchTerm, filter]);
    
    const totalLists = mockLists.length;
    const activeLists = mockLists.filter(l => l.status === 'Active').length;
    const completedLists = totalLists - activeLists;

    return (
        <div className="bg-gray-100 min-h-screen font-sans">
        <UserNavbar />
        <main className="w-full max-w-7xl mx-auto px-6 py-12">
            {/* Page Header */}
            <header className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
            <h1 className="text-4xl font-bold text-gray-800">Your Grocery Lists</h1>
            <div className="flex items-center gap-3 w-full md:w-auto">
                <div className="relative w-full md:w-56">
                <Search size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input 
                    type="text" 
                    placeholder="Search lists..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition" 
                />
                </div>
                {/* Custom styled select dropdown */}
                <div className="relative">
                    <select 
                        value={filter} 
                        onChange={(e) => setFilter(e.target.value)}
                        className="appearance-none w-full md:w-auto bg-white border border-gray-300 text-gray-700 py-2.5 pl-4 pr-10 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    >
                        <option>All</option>
                        <option>Active</option>
                        <option>Completed</option>
                        <option>Shared</option>
                    </select>
                    <ChevronDown size={20} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"/>
                </div>
                <button className="flex items-center gap-2 px-5 py-2.5 bg-green-600 text-white font-bold rounded-lg hover:bg-green-500 transition-transform transform hover:scale-105 shadow-sm">
                <Plus size={20}/>
                <span className="hidden sm:inline">Create List</span>
                </button>
            </div>
            </header>

            {/* Summary Strip */}
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

            {/* Lists Grid */}
            <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredLists.length > 0 ? (
                filteredLists.map(list => <ListCard key={list.id} list={list} />)
            ) : (
                <div className="lg:col-span-3 text-center py-16 px-6 bg-white rounded-2xl border border-gray-200">
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