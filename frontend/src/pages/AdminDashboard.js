// frontend/src/pages/AdminDashboard.js
import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import AdminSidebar from '../components/AdminSidebar';
import AdminStats from '../components/AdminStats';
import AdminBookings from '../components/AdminBookings';
import AdminUsers from '../components/AdminUsers';
import AdminVillas from '../components/AdminVillas';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('stats');
  const { user } = useAuth();

  if (!user || user.role !== 'admin') {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Access Denied</h2>
          <p>You need administrator privileges to access this page.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      <AdminSidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <div className="flex-1 p-8">
        <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>
        
        {activeTab === 'stats' && <AdminStats />}
        {activeTab === 'bookings' && <AdminBookings />}
        {activeTab === 'users' && <AdminUsers />}
        {activeTab === 'villas' && <AdminVillas />}
      </div>
    </div>
  );
};

export default AdminDashboard;