import React, { ReactNode, useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthenticatedContext, useAuth } from '../shared/context/Authenticated';
import Login from './auth/login/Login';
import PermissionDenied from './common/permission-denied';

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowRoles?: string[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, allowRoles }) => {
  const { user } = useAuth();

  // if (officerOnly && user?.role !== 'officer') {
  //   return <Navigate to="/login" />;
  // }

  if (allowRoles?.includes(user?.role as string)) {
    return <>{children}</>;
  } else {
    return <PermissionDenied></PermissionDenied>
  }
};

export default ProtectedRoute;