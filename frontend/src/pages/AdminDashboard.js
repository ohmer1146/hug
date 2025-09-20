import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import AdminSidebar from '../components/AdminSidebar';
import AdminStats from '../components/AdminStats';
import AdminBookings from '../components/AdminBookings';
import AdminUsers from '../components/AdminUsers';
import AdminVillas from '../components/AdminVillas';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('stats');
  const { user } = useAuth();

  if (!user || user.role !== 'admin') {
    return (
      <div className="admin-dashboard">
        <div className="admin-content">
          <div className="bg-white p-8 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-red-600 mb-4">Access Denied</h2>
            <p>You need administrator privileges to access this page.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-dashboard">
      <AdminSidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <div className="admin-content">
        <div className="admin-header">
          <h1 className="admin-title">Admin Dashboard</h1>
          <div className="admin-user">
            <div className="admin-user-avatar">
              <img src={user.avatar || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80"} alt={user.name} />
            </div>
            <div className="admin-user-name">{user.name}</div>
          </div>
        </div>
        
        {activeTab === 'stats' && <AdminStats />}
        {activeTab === 'bookings' && <AdminBookings />}
        {activeTab === 'users' && <AdminUsers />}
        {activeTab === 'villas' && <AdminVillas />}
      </div>
    </div>
  );
};

export default AdminDashboard;