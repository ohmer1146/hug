import React from 'react';

const AdminStats = () => {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Statistics</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded shadow">
          <h3 className="font-semibold">Total Users</h3>
          <p className="text-2xl">0</p>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <h3 className="font-semibold">Total Bookings</h3>
          <p className="text-2xl">0</p>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <h3 className="font-semibold">Total Revenue</h3>
          <p className="text-2xl">$0</p>
        </div>
      </div>
    </div>
  );
};

export default AdminStats;