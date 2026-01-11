import { supabase } from '@/lib/customSupabaseClient';

export const signUpUser = async (email, password, fullName, companyName = null) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: fullName,
        company_name: companyName // Passed to trigger if needed
      }
    }
  });
  
  if (error) throw error;
  return data;
};

export const loginUser = async (email, password) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  });
  
  if (error) throw error;
  
  // Log activity
  if (data.user) {
    await logActivity(data.user.id, 'login', 'auth', null);
  }
  
  return data;
};

export const logoutUser = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
};

export const getCurrentUser = async () => {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;

  // Fetch public profile
  const { data: profile } = await supabase
    .from('public_users')
    .select('*')
    .eq('id', user.id)
    .single();

  return { ...user, ...profile };
};

export const resetPassword = async (email) => {
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${window.location.origin}/reset-password`,
  });
  if (error) throw error;
};

export const updateUserProfile = async (userId, updates) => {
  const { data, error } = await supabase
    .from('public_users')
    .update(updates)
    .eq('id', userId)
    .select()
    .single();
    
  if (error) throw error;
  return data;
};

export const changePassword = async (newPassword) => {
  const { error } = await supabase.auth.updateUser({
    password: newPassword
  });
  if (error) throw error;
};

// Activity Logger Helper
const logActivity = async (userId, action, resourceType, resourceId, details = {}) => {
  try {
    await supabase.from('user_activity').insert({
      user_id: userId,
      action,
      resource_type: resourceType,
      resource_id: resourceId,
      details
    });
  } catch (err) {
    console.error('Failed to log activity:', err);
  }
};