import React from 'react';
import { Navigate } from 'react-router';
import { useAppContext } from '../context/AppContext';

export default function HomeDashboard() {
  const { userRole } = useAppContext();

  // Redirect to role-specific dashboard
  if (userRole === 'doctor') {
    return <Navigate to="/doctor-home" replace />;
  }
  
  return <Navigate to="/patient-dashboard" replace />;
}