import React, { useState, useMemo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import UserNavbar from './UserNavbar.jsx';
import { useTheme } from '../../context/ThemeContext.jsx';
import { useAuth } from '../../context/AuthContext.jsx';
import { 
  Search, Plus, CheckCircle2, Users, ChevronDown, 
  Eye, Pencil, Trash2, ShoppingCart, PartyPopper, Zap,
  X, Save, Circle
} from 'lucide-react';

// --- REMOVED MOCK DATA - using real data from backend ---
const mockLists = [
  { 
    id: 1, 
    name: 'Weekly Essentials', 
    totalItems: 15, 
    completedItems: 12, 
    lastUpdated: '2 hours ago', 
    status: 'Active', 
    isShared: true, 
    color: '#10B981', 
    icon: 'ShoppingCart',
    items: [
      { id: 1, name: 'Milk', completed: true },
      { id: 2, name: 'Bread', completed: true },
      { id: 3, name: 'Eggs', completed: true },
      { id: 4, name: 'Butter', completed: false },
      { id: 5, name: 'Sugar', completed: false },
      { id: 6, name: 'Rice', completed: true },
      { id: 7, name: 'Tomatoes', completed: true },
      { id: 8, name: 'Onions', completed: true },
      { id: 9, name: 'Potatoes', completed: true },
      { id: 10, name: 'Spinach', completed: true },
      { id: 11, name: 'Bananas', completed: true },
      { id: 12, name: 'Apples', completed: true },
      { id: 13, name: 'Yogurt', completed: false },
      { id: 14, name: 'Cheese', completed: false },
      { id: 15, name: 'Cereal', completed: false },
    ]
  },
  { 
    id: 2, 
    name: 'Weekend Party', 
    totalItems: 25, 
    completedItems: 25, 
    lastUpdated: '1 day ago', 
    status: 'Completed', 
    isShared: false, 
    color: '#8B5CF6', 
    icon: 'PartyPopper',
    items: [
      { id: 1, name: 'Snacks', completed: true },
      { id: 2, name: 'Drinks', completed: true },
      { id: 3, name: 'Chips', completed: true },
    ]
  },
  { 
    id: 3, 
    name: 'Household Cleaning', 
    totalItems: 8, 
    completedItems: 8, 
    lastUpdated: '3 days ago', 
    status: 'Completed', 
    isShared: true, 
    color: '#3B82F6', 
    icon: 'ShoppingCart',
    items: [
      { id: 1, name: 'Detergent', completed: true },
      { id: 2, name: 'Dish Soap', completed: true },
    ]
  },
  { 
    id: 4, 
    name: 'Quick Snacks Run', 
    totalItems: 12, 
    completedItems: 5, 
    lastUpdated: '5 days ago', 
    status: 'Active', 
    isShared: false, 
    color: '#F59E0B', 
    icon: 'Zap',
    items: [
      { id: 1, name: 'Cookies', completed: true },
      { id: 2, name: 'Juice', completed: false },
    ]
  },
];

const icons = { ShoppingCart, PartyPopper, Zap };

// --- Notepad View Component ---
const NotepadView = ({ list, onClose, onSave, isDark }) => {
  const [items, setItems] = useState(list.items || []);
  const [newItem, setNewItem] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState(list.name);

  const toggleItem = (itemId) => {
    setItems(items.map(item => 
      item.id === itemId ? { ...item, completed: !item.completed } : item
    ));
  };

  const addItem = () => {
    if (newItem.trim()) {
      const maxId = items.length > 0 ? Math.max(...items.map(i => i.id)) : 0;
      setItems([...items, { id: maxId + 1, name: newItem.trim(), completed: false }]);
      setNewItem('');
    }
  };

  const deleteItem = (itemId) => {
    setItems(items.filter(item => item.id !== itemId));
  };

  const handleSave = () => {
    const updatedList = {
      ...list,
      items,
      name: editName,
      totalItems: items.length,
      completedItems: items.filter(i => i.completed).length,
    };
    onSave(updatedList);
    setIsEditing(false);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div 
        className={`${isDark ? 'bg-gray-800' : 'bg-amber-50'} w-full max-w-4xl rounded-2xl shadow-2xl overflow-hidden flex flex-col`}
        style={{ maxHeight: '95vh' }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Notepad Header with lines */}
        <div className={`${isDark ? 'bg-gray-900' : 'bg-amber-100'} p-6 border-b-2 ${isDark ? 'border-gray-700' : 'border-amber-300'} flex-shrink-0`}>
          <div className="flex justify-between items-center mb-4">
            {isEditing ? (
              <input
                type="text"
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
                className={`flex-1 text-3xl font-bold handwriting ${isDark ? 'bg-gray-800 text-white' : 'bg-amber-50'} px-3 py-2 rounded-lg border-2 ${isDark ? 'border-gray-700' : 'border-amber-300'}`}
              />
            ) : (
              <h2 className={`text-3xl font-bold handwriting ${isDark ? 'text-white' : 'text-gray-800'}`}>
                {list.name}
              </h2>
            )}
            <div className="flex gap-2">
              {isEditing ? (
                <>
                  <button
                    onClick={handleSave}
                    className="p-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                  >
                    <Save size={20} />
                  </button>
                  <button
                    onClick={() => { setIsEditing(false); setEditName(list.name); }}
                    className="p-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
                  >
                    <X size={20} />
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => setIsEditing(true)}
                    className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <Pencil size={20} />
                  </button>
                  <button
                    onClick={onClose}
                    className="p-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
                  >
                    <X size={20} />
                  </button>
                </>
              )}
            </div>
          </div>
          <div className={`h-px ${isDark ? 'bg-gray-700' : 'bg-amber-300'} mb-1`}></div>
        </div>

        {/* Notepad Content with ruled lines - Now scrollable and shows full list */}
        <div className={`${isDark ? 'bg-gray-800' : 'bg-amber-50'} p-8 overflow-y-auto flex-1 min-h-0`}>
          <div className="relative min-h-full">
            {/* Ruled paper effect */}
            <div className="absolute inset-0" style={{
              backgroundImage: `repeating-linear-gradient(
                ${isDark ? '#374151' : '#FEF3C7'} 0px,
                ${isDark ? '#374151' : '#FEF3C7'} 31px,
                ${isDark ? '#4B5563' : '#E5D5A0'} 31px,
                ${isDark ? '#4B5563' : '#E5D5A0'} 32px
              )`
            }}></div>
            
            {/* Content overlay - Fixed alignment */}
            <div className="relative z-10 pl-10 pr-4 handwriting">
              <div className="space-y-2">
                {items.map((item, index) => (
                  <div key={item.id} className={`flex items-center gap-4 py-1.5 ${isDark ? 'text-gray-200' : 'text-gray-700'}`}>
                    <button
                      onClick={() => toggleItem(item.id)}
                      className="flex-shrink-0 mt-0.5"
                    >
                      {item.completed ? (
                        <CheckCircle2 size={22} className="text-green-600" />
                      ) : (
                        <Circle size={22} className={isDark ? 'text-gray-500' : 'text-gray-400'} />
                      )}
                    </button>
                    <span 
                      className={`flex-1 text-xl ${item.completed ? 'line-through opacity-60' : ''}`}
                    >
                      {item.name}
                    </span>
                    <button
                      onClick={() => deleteItem(item.id)}
                      className="flex-shrink-0 text-red-500 hover:text-red-700 transition-colors p-1"
                      title="Delete item"
                    >
                      <Trash2 size={24} />
                    </button>
                  </div>
                ))}
                
                {/* Add new item */}
                <div className="flex items-center gap-4 py-1.5 mt-4">
                  <Circle size={22} className={`${isDark ? 'text-gray-500' : 'text-gray-400'} opacity-50`} />
                  <input
                    type="text"
                    value={newItem}
                    onChange={(e) => setNewItem(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && addItem()}
                    placeholder="Add new item..."
                    className={`flex-1 text-xl handwriting bg-transparent border-none outline-none ${isDark ? 'text-gray-300 placeholder-gray-600' : 'text-gray-700 placeholder-gray-400'}`}
                  />
                  {newItem.trim() && (
                    <button
                      onClick={addItem}
                      className="flex-shrink-0 text-green-600 hover:text-green-700 transition-colors p-1"
                    >
                      <Plus size={20} />
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer with save button */}
        <div className={`${isDark ? 'bg-gray-900' : 'bg-amber-100'} p-4 border-t-2 ${isDark ? 'border-gray-700' : 'border-amber-300'} flex justify-end flex-shrink-0`}>
          <button
            onClick={() => {
              handleSave();
              onClose();
            }}
            className="px-6 py-2 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

// --- UPDATED ListCard Component ---
const ListCard = ({ list, onView, onEdit, onDelete, isDark }) => {
  const completionPercentage = list.totalItems > 0 ? (list.completedItems / list.totalItems) * 100 : 0;
  const isCompleted = list.status === 'Completed';
  const IconComponent = icons[list.icon] || ShoppingCart;

  return (
    <div className={`group relative ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border rounded-2xl shadow-md p-6 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 overflow-hidden ${isCompleted ? isDark ? 'bg-gray-800/50' : 'bg-gray-50' : ''}`}>
      {/* Color Bar */}
      <div className="absolute left-0 top-0 h-full w-1.5" style={{ backgroundColor: list.color }}></div>
      
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <IconComponent size={20} className={isDark ? 'text-gray-400' : 'text-gray-600'} />
          <h3 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-800'} pr-4`}>{list.name}</h3>
        </div>
        <div className="flex-shrink-0">
          {isCompleted ? (
            <span className={`flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold ${isDark ? 'text-green-300 bg-green-900/50' : 'text-green-700 bg-green-100'} rounded-full`}>
              <CheckCircle2 size={14} /> Completed
            </span>
          ) : list.isShared && (
            <span className={`flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold ${isDark ? 'text-blue-300 bg-blue-900/50' : 'text-blue-700 bg-blue-100'} rounded-full`}>
              <Users size={14} /> Shared
            </span>
          )}
        </div>
      </div>

      <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'} mb-4 pl-9 ${isCompleted ? 'opacity-70' : ''}`}>
        <p>{list.totalItems} items</p>
        <p>Updated {list.lastUpdated}</p>
      </div>

      <div className="pl-9">
        <div className="flex justify-between items-center mb-1">
          <span className={`text-xs font-medium ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Completion</span>
          <span className="text-xs font-bold text-green-500">{Math.round(completionPercentage)}%</span>
        </div>
        <div className={`w-full ${isDark ? 'bg-gray-700' : 'bg-gray-200'} rounded-full h-2`}>
          <div className="bg-green-500 h-2 rounded-full transition-all duration-300" style={{ width: `${completionPercentage}%` }}></div>
        </div>
        <p className={`text-right text-xs ${isDark ? 'text-gray-500' : 'text-gray-500'} mt-1`}>{list.completedItems} / {list.totalItems} items</p>
      </div>
      
      <div className={`absolute inset-0 bg-black bg-opacity-60 rounded-2xl flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300`}>
        <button 
          onClick={() => onView(list)} 
          className="p-3 bg-white text-gray-800 rounded-full hover:bg-green-500 hover:text-white transition-colors shadow-lg"
          title="View"
        >
          <Eye size={20} />
        </button>
        <button 
          onClick={() => onEdit(list)} 
          className="p-3 bg-white text-gray-800 rounded-full hover:bg-blue-500 hover:text-white transition-colors shadow-lg"
          title="Edit"
        >
          <Pencil size={20} />
        </button>
        <button 
          onClick={() => onDelete(list.id)} 
          className="p-3 bg-white text-red-500 rounded-full hover:bg-red-500 hover:text-white transition-colors shadow-lg"
          title="Delete"
        >
          <Trash2 size={20} />
        </button>
      </div>
    </div>
  );
};

const Lists = () => {
  const { isDarkMode } = useTheme();
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('All');
  const [lists, setLists] = useState([]);
  const [selectedList, setSelectedList] = useState(null);
  const [viewMode, setViewMode] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch lists from backend
  useEffect(() => {
    const fetchLists = async () => {
      if (!user?.token) {
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/lists`, {
          headers: {
            'Authorization': `Bearer ${user.token}`,
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          const data = await response.json();
          if (data.success) {
            // Format lastUpdated to relative time
            const formattedLists = data.lists.map(list => ({
              ...list,
              lastUpdated: formatRelativeTime(new Date(list.lastUpdated)),
            }));
            setLists(formattedLists);
          }
        }
      } catch (error) {
        console.error('Error fetching lists:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchLists();
  }, [user]);

  // Helper function to format relative time
  const formatRelativeTime = (date) => {
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'just now';
    if (diffMins < 60) return `${diffMins} ${diffMins === 1 ? 'minute' : 'minutes'} ago`;
    if (diffHours < 24) return `${diffHours} ${diffHours === 1 ? 'hour' : 'hours'} ago`;
    if (diffDays < 7) return `${diffDays} ${diffDays === 1 ? 'day' : 'days'} ago`;
    return date.toLocaleDateString();
  };

  const filteredLists = useMemo(() => {
    return lists
      .filter(list => filter === 'All' || (filter === 'Shared' ? list.isShared : list.status === filter))
      .filter(list => list.name.toLowerCase().includes(searchTerm.toLowerCase()));
  }, [searchTerm, filter, lists]);
  
  const totalLists = lists.length;
  const activeLists = lists.filter(l => l.status === 'Active').length;
  const completedLists = totalLists - activeLists;

  const handleView = (list) => {
    setSelectedList(list);
    setViewMode('view');
  };

  const handleEdit = (list) => {
    setSelectedList(list);
    setViewMode('edit');
  };

  const handleDelete = async (listId) => {
    if (!window.confirm('Are you sure you want to delete this list?')) {
      return;
    }

    if (!user?.token) return;

    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/lists/${listId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${user.token}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        setLists(lists.filter(l => l.id !== listId));
      } else {
        alert('Failed to delete list');
      }
    } catch (error) {
      console.error('Error deleting list:', error);
      alert('Error deleting list');
    }
  };

  const handleSave = async (updatedList) => {
    if (!user?.token) return;

    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/lists/${updatedList.id}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${user.token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: updatedList.name,
          items: updatedList.items,
          status: updatedList.status,
          isShared: updatedList.isShared,
          color: updatedList.color,
          icon: updatedList.icon,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          const formattedList = {
            ...data.list,
            lastUpdated: formatRelativeTime(new Date(data.list.lastUpdated)),
          };
          setLists(lists.map(l => l.id === formattedList.id ? formattedList : l));
          setSelectedList(null);
          setViewMode(null);
        }
      } else {
        alert('Failed to save list');
      }
    } catch (error) {
      console.error('Error saving list:', error);
      alert('Error saving list');
    }
  };

  const handleClose = () => {
    setSelectedList(null);
    setViewMode(null);
  };

  if (loading) {
    return (
      <div className={`${isDarkMode ? 'bg-gray-900' : 'bg-gray-100'} min-h-screen font-sans transition-colors duration-300`}>
        <UserNavbar />
        <main className="w-full max-w-7xl mx-auto px-6 py-12 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
            <p className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>Loading lists...</p>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className={`${isDarkMode ? 'bg-gray-900' : 'bg-gray-100'} min-h-screen font-sans transition-colors duration-300`}>
      <UserNavbar />
      <main className="w-full max-w-7xl mx-auto px-6 py-12">
        <header className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
          <h1 className={`text-4xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>Your Grocery Lists</h1>
          <div className="flex items-center gap-3 w-full md:w-auto">
            <div className="relative w-full md:w-56">
              <Search size={20} className={`absolute left-3 top-1/2 -translate-y-1/2 ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`} />
              <input 
                type="text" 
                placeholder="Search lists..." 
                value={searchTerm} 
                onChange={(e) => setSearchTerm(e.target.value)}
                className={`w-full pl-10 pr-4 py-2.5 ${isDarkMode ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-500' : 'bg-white border-gray-300'} border rounded-lg focus:ring-2 focus:ring-green-500 outline-none`} 
              />
            </div>
            <div className="relative">
                <select 
                  value={filter} 
                  onChange={(e) => setFilter(e.target.value)}
                  className={`appearance-none w-full md:w-auto ${isDarkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-300 text-gray-700'} border py-2.5 pl-4 pr-10 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500`}
                >
                    <option>All</option>
                    <option>Active</option>
                    <option>Completed</option>
                    <option>Shared</option>
                </select>
                <ChevronDown size={20} className={`absolute right-3 top-1/2 -translate-y-1/2 ${isDarkMode ? 'text-gray-500' : 'text-gray-400'} pointer-events-none`}/>
            </div>
            <Link 
              to="/lists/create" 
              className="flex items-center gap-2 px-5 py-2.5 bg-green-600 text-white font-bold rounded-lg hover:bg-green-500 transition-transform transform hover:scale-105 shadow-sm"
            >
              <Plus size={20}/>
              <span className="hidden sm:inline">Create List</span>
            </Link>
          </div>
        </header>

        <section className={`grid grid-cols-2 md:grid-cols-4 gap-4 mb-10 ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} p-4 rounded-xl border transition-colors`}>
            <div className="text-center">
                <p className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>{totalLists}</p>
                <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Total Lists</p>
            </div>
            <div className="text-center">
                <p className="text-2xl font-bold text-green-500">{activeLists}</p>
                <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Active Lists</p>
            </div>
            <div className="text-center">
                <p className={`text-2xl font-bold ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>{completedLists}</p>
                <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Completed</p>
            </div>
            <div className="text-center">
                <p className="text-2xl font-bold text-blue-500">{lists.filter(l => l.isShared).length}</p>
                <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Shared Lists</p>
            </div>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredLists.length > 0 ? (
            filteredLists.map(list => (
              <ListCard 
                key={list.id} 
                list={list} 
                onView={handleView}
                onEdit={handleEdit}
                onDelete={handleDelete}
                isDark={isDarkMode}
              />
            ))
          ) : (
            <div className={`lg-col-span-3 text-center py-16 px-6 ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-2xl border transition-colors`}>
              <ShoppingCart size={48} className={`mx-auto mb-4 ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`} />
              <h3 className={`text-xl font-semibold ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                {lists.length === 0 ? 'No lists yet' : 'No lists found'}
              </h3>
              <p className={`${isDarkMode ? 'text-gray-500' : 'text-gray-500'} mt-2`}>
                {lists.length === 0 
                  ? 'Create your first grocery list to get started!' 
                  : 'Try adjusting your search or filter to find what you are looking for.'}
              </p>
              {lists.length === 0 && (
                <Link 
                  to="/lists/create" 
                  className="inline-flex items-center gap-2 mt-4 px-6 py-3 bg-green-600 text-white font-bold rounded-lg hover:bg-green-500 transition-transform transform hover:scale-105 shadow-sm"
                >
                  <Plus size={20}/>
                  Create Your First List
                </Link>
              )}
            </div>
          )}
        </section>
      </main>

      {/* Notepad View Modal */}
      {selectedList && (
        <NotepadView 
          list={selectedList} 
          onClose={handleClose} 
          onSave={handleSave}
          isDark={isDarkMode}
        />
      )}
    </div>
  );
};

export default Lists;
