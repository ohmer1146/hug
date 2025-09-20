import React from 'react';
import './AdminSidebar.css';

const AdminSidebar = ({ activeTab, setActiveTab }) => {
  const navItems = [
    { id: 'stats', icon: 'fas fa-chart-pie', text: 'สถิติ' },
    { id: 'bookings', icon: 'fas fa-calendar-check', text: 'การจอง' },
    { id: 'users', icon: 'fas fa-users', text: 'ผู้ใช้' },
    { id: 'villas', icon: 'fas fa-home', text: 'วิลล่า' },
  ];

  return (
    <div className="admin-sidebar">
      <div className="admin-logo">
        <i className="fas fa-home admin-logo-icon"></i>
        <span className="admin-logo-text">HomeHug Admin</span>
      </div>
      
      <nav className="admin-nav">
        {navItems.map(item => (
          <div
            key={item.id}
            className={`admin-nav-item ${activeTab === item.id ? 'active' : ''}`}
            onClick={() => setActiveTab(item.id)}
          >
            <i className={item.icon}></i>
            <span className="admin-nav-text">{item.text}</span>
          </div>
        ))}
      </nav>
    </div>
  );
};

export default AdminSidebar;