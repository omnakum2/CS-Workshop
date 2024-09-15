import React from 'react';
import { Navigate } from 'react-router-dom';

interface ProtectedRouteProps {
  element: React.ReactElement;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ element }) => {
  const isAuthenticated = Boolean(localStorage.getItem("auth"));

  return isAuthenticated ? element : <Navigate to="/" />;
};

export default ProtectedRoute;
