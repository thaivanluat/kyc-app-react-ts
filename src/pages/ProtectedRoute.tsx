import React, { ReactNode, useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthenticatedContext, useAuth } from '../shared/context/Authenticated';

interface ProtectedRouteProps {
  element: React.ReactNode;
  officerOnly?: boolean;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ element, officerOnly = false }) => {
  const { user } = useAuth();

  // if (officerOnly && user?.role !== 'officer') {
  //   return <Navigate to="/login" />;
  // }

  return user ? <>{element}</> : <Navigate to="/auth/login" />;
};

export default ProtectedRoute;