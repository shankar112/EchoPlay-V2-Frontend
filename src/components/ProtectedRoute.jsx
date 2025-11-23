// src/components/ProtectedRoute.jsx
import React from 'react';
import { Navigate, Outlet, useOutletContext } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Loader from './Loader';

const ProtectedRoute = () => {
  const { user, loading } = useAuth();
  
  // 1. Grab the context (setCurrentTrack) from App.jsx
  const context = useOutletContext(); 

  if (loading) return <Loader text="Authenticating..." />;
  if (!user) return <Navigate to="/login" replace />;

  // 2. Pass that context down to the children (Home, etc.)
  return <Outlet context={context} />;
};

export default ProtectedRoute;