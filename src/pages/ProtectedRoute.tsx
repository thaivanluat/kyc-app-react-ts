import React, { ReactNode, useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthenticatedContext, useAuth } from '../shared/context/Authenticated';
import Login from './auth/login/Login';

interface ProtectedRouteProps {
  element: React.ReactNode;
  officerOnly?: boolean;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ element, officerOnly = false }) => {
  const { user } = useAuth();

  // if (officerOnly && user?.role !== 'officer') {
  //   return <Navigate to="/login" />;
  // }

  return <>{element}</>;
};

export default ProtectedRoute;