import React, { FC } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { Role } from '../../types/roles';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { useTranslation } from 'react-i18next';

interface ProtectedRouteProps {
  allowedRoles?: Role[];
}

export const ProtectedRoute: FC<ProtectedRouteProps> = ({ allowedRoles }) => {
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  const profile = useSelector((state: RootState) => state.auth.profile);
  const { t } = useTranslation();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (allowedRoles && profile?.role) {
    if (!allowedRoles.includes(profile.role as Role)) {
      return <h1>{t('no-access')}</h1>;
    }
  }

  return <Outlet />;
};
