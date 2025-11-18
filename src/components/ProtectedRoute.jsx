// src/components/ProtectedRoute.jsx
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = () => {
  const { user, loading } = useAuth();

  // 1. If still loading, show a spinner or nothing
  if (loading) {
    return <div>Loading...</div>; 
  }

  // 2. If no user is logged in, redirect to Login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // 3. If user is logged in, render the child routes (Outlet)
  return <Outlet />;
};

export default ProtectedRoute;