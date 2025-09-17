import React from 'react';

const AdminSidebar = ({ activeTab, setActiveTab }) => {
  return (
    <div className="w-64 bg-gray-800 text-white min-h-screen">
      <div className="p-4 text-xl font-bold">Admin Panel</div>
      <nav className="mt-6">
        <div 
          className={`p-4 cursor-pointer ${activeTab === 'stats' ? 'bg-gray-700' : ''}`}
          onClick={() => setActiveTab('stats')}
        >
          Statistics
        </div>
        <div 
          className={`p-4 cursor-pointer ${activeTab === 'bookings' ? 'bg-gray-700' : ''}`}
          onClick={() => setActiveTab('bookings')}
        >
          Bookings
        </div>
        <div 
          className={`p-4 cursor-pointer ${activeTab === 'users' ? 'bg-gray-700' : ''}`}
          onClick={() => setActiveTab('users')}
        >
          Users
        </div>
        <div 
          className={`p-4 cursor-pointer ${activeTab === 'villas' ? 'bg-gray-700' : ''}`}
          onClick={() => setActiveTab('villas')}
        >
          Villas
        </div>
      </nav>
    </div>
  );
};

export default AdminSidebar;