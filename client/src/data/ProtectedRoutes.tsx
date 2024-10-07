import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

// ProtectedRoute Component
const ProtectedRoute = ({ element }: { element: JSX.Element }) => {
  const authToken = localStorage.getItem('authToken');
  const location = useLocation();

  return authToken ? element : <Navigate to={`/login?redirect=${encodeURIComponent(location.pathname)}`} />;
};

export default ProtectedRoute;
