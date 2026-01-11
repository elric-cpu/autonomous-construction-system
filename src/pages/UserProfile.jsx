import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/SupabaseAuthContext';
import { getCurrentUser } from '@/utils/authUtils';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Loader2, LogOut, Shield, Mail, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const UserProfile = () => {
  const { user, signOut } = useAuth();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const loadProfile = async () => {
        if (user) {
            const data = await getCurrentUser();
            setProfile(data);
        }
        setLoading(false);
    };
    loadProfile();
  }, [user]);

  const handleLogout = async () => {
      await signOut();
      navigate('/login');
  };

  if (loading) return <div className="p-8 flex justify-center"><Loader2 className="animate-spin text-maroon" /></div>;

  return (
    <div className="container mx-auto py-8 px-4 max-w-2xl">
      <Card>
        <CardHeader className="text-center">
             <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center text-2xl font-bold text-gray-500">
                {profile?.full_name?.charAt(0) || user?.email?.charAt(0).toUpperCase()}
             </div>
            <CardTitle className="text-2xl">{profile?.full_name || 'User'}</CardTitle>
            <CardDescription>{user?.email}</CardDescription>
            <div className="mt-2">
                <Badge variant="secondary" className="capitalize">{profile?.role || 'Staff'}</Badge>
            </div>
        </CardHeader>
        <CardContent className="space-y-6">
            <div className="grid gap-4">
                <div className="flex items-center gap-4 border p-4 rounded-lg">
                    <div className="bg-blue-100 p-2 rounded-full"><Mail className="w-5 h-5 text-blue-600" /></div>
                    <div>
                        <div className="text-sm text-gray-500">Email Address</div>
                        <div className="font-medium">{user?.email}</div>
                    </div>
                </div>
                <div className="flex items-center gap-4 border p-4 rounded-lg">
                    <div className="bg-purple-100 p-2 rounded-full"><Shield className="w-5 h-5 text-purple-600" /></div>
                    <div>
                        <div className="text-sm text-gray-500">Role & Permissions</div>
                        <div className="font-medium capitalize">{profile?.role || 'Staff Access'}</div>
                    </div>
                </div>
                <div className="flex items-center gap-4 border p-4 rounded-lg">
                    <div className="bg-orange-100 p-2 rounded-full"><User className="w-5 h-5 text-orange-600" /></div>
                    <div>
                        <div className="text-sm text-gray-500">Member Since</div>
                        <div className="font-medium">{new Date(user?.created_at).toLocaleDateString()}</div>
                    </div>
                </div>
            </div>

            <div className="pt-6 border-t">
                <Button variant="destructive" className="w-full" onClick={handleLogout}>
                    <LogOut className="w-4 h-4 mr-2" /> Sign Out
                </Button>
            </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserProfile;