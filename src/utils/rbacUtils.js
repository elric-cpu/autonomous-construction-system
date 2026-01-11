import { supabase } from '@/lib/customSupabaseClient';

export const ROLES = {
  ADMIN: 'admin',
  MANAGER: 'manager',
  STAFF: 'staff',
  CLIENT: 'client'
};

export const PERMISSIONS = {
  VIEW_JOBS: 'view_jobs',
  EDIT_JOBS: 'edit_jobs',
  CREATE_INVOICES: 'create_invoices',
  VIEW_REPORTS: 'view_reports',
  MANAGE_USERS: 'manage_users',
  MANAGE_SETTINGS: 'manage_settings'
};

const ROLE_PERMISSIONS = {
  [ROLES.ADMIN]: Object.values(PERMISSIONS),
  [ROLES.MANAGER]: [
    PERMISSIONS.VIEW_JOBS, 
    PERMISSIONS.EDIT_JOBS, 
    PERMISSIONS.CREATE_INVOICES, 
    PERMISSIONS.VIEW_REPORTS
  ],
  [ROLES.STAFF]: [
    PERMISSIONS.VIEW_JOBS, 
    PERMISSIONS.EDIT_JOBS,
    PERMISSIONS.CREATE_INVOICES
  ],
  [ROLES.CLIENT]: []
};

export const getUserRole = async (userId) => {
  const { data, error } = await supabase
    .from('public_users')
    .select('role')
    .eq('id', userId)
    .single();
    
  if (error) return null;
  return data?.role;
};

export const hasPermission = (userRole, permission) => {
  if (!userRole) return false;
  const permissions = ROLE_PERMISSIONS[userRole] || [];
  return permissions.includes(permission);
};

export const canViewJobs = (role) => hasPermission(role, PERMISSIONS.VIEW_JOBS);
export const canCreateInvoices = (role) => hasPermission(role, PERMISSIONS.CREATE_INVOICES);
export const canViewReports = (role) => hasPermission(role, PERMISSIONS.VIEW_REPORTS);
export const canManageUsers = (role) => hasPermission(role, PERMISSIONS.MANAGE_USERS);