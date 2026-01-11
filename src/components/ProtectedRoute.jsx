import React, { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/SupabaseAuthContext';
import { Loader2 } from 'lucide-react';
import { hasPermission, getUserRole } from '@/utils/rbacUtils';

const ProtectedRoute = ({ children, requiredRole, requiredPermission }) => {
  const { user, loading: authLoading } = useAuth();
  const [roleLoading, setRoleLoading] = useState(true);
  const [userRole, setUserRole] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const fetchRole = async () => {
      if (user) {
        const role = await getUserRole(user.id);
        setUserRole(role);
      }
      setRoleLoading(false);
    };

    if (!authLoading) {
      fetchRole();
    }
  }, [user, authLoading]);

  if (authLoading || roleLoading) {
    return (
      <div className="h-screen w-full flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-maroon" />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (requiredRole && userRole !== requiredRole && userRole !== 'admin') {
    return <Navigate to="/unauthorized" replace />;
  }

  if (requiredPermission && !hasPermission(userRole, requiredPermission)) {
     return <Navigate to="/unauthorized" replace />;
  }

  return children;
};

export default ProtectedRoute;