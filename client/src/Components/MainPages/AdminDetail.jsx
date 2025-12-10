import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

const AdminDetail = () => {
  const location = useLocation();
  const [admin, setAdmin] = useState(null);

  const isAdminDashboard = location.pathname === '/admin/dashboard';

  useEffect(() => {
    if (isAdminDashboard) {
      const fetchAdminData = async () => {
        try {
          const res = await axios.get('/user/admin');
          setAdmin(res.data);
        } catch (err) {
          console.error('Error fetching admin data:', err);
        }
      };

      fetchAdminData();
    }
  }, [isAdminDashboard]);

  if (!isAdminDashboard || !admin) return null;

  return (
    <div className="admin-detail">
      <h2>Welcome, {admin.name}</h2>
      <p>Role: Admin</p>
      <p>Email: {admin.email}</p>
      <p>Create Date & Time: {admin.createdAt}</p>
    </div>
  );
};

export default AdminDetail;
