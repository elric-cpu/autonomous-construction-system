import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/customSupabaseClient';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from '@/components/ui/label';
import { Loader2, Plus, Edit, Trash2, Search, UserCheck, UserX } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const { toast } = useToast();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('public_users')
      .select('*')
      .order('created_at', { ascending: false });
      
    if (!error) setUsers(data || []);
    setLoading(false);
  };

  const filteredUsers = users.filter(user => 
    user.email.toLowerCase().includes(search.toLowerCase()) || 
    (user.full_name && user.full_name.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-maroon">User Management</h1>
        <AddUserModal onUserAdded={fetchUsers} />
      </div>

      <div className="bg-white rounded-lg border shadow-sm p-4 mb-6">
        <div className="relative max-w-md">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input 
                placeholder="Search users..." 
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="pl-9"
            />
        </div>
      </div>

      <div className="bg-white rounded-lg border shadow-sm overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>User</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Created</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
                <TableRow>
                    <TableCell colSpan={5} className="text-center py-8">
                        <Loader2 className="w-6 h-6 animate-spin mx-auto text-maroon" />
                    </TableCell>
                </TableRow>
            ) : filteredUsers.length === 0 ? (
                <TableRow>
                    <TableCell colSpan={5} className="text-center py-8 text-gray-500">
                        No users found
                    </TableCell>
                </TableRow>
            ) : (
                filteredUsers.map(user => (
                    <TableRow key={user.id}>
                        <TableCell>
                            <div>
                                <div className="font-medium">{user.full_name || 'No Name'}</div>
                                <div className="text-sm text-gray-500">{user.email}</div>
                            </div>
                        </TableCell>
                        <TableCell>
                            <Badge variant="outline" className="capitalize">{user.role}</Badge>
                        </TableCell>
                        <TableCell>
                             <Badge className={user.is_active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                                {user.is_active ? 'Active' : 'Inactive'}
                             </Badge>
                        </TableCell>
                        <TableCell className="text-sm text-gray-500">
                            {new Date(user.created_at).toLocaleDateString()}
                        </TableCell>
                        <TableCell className="text-right">
                             <div className="flex justify-end gap-2">
                                <EditUserModal user={user} onUpdate={fetchUsers} />
                             </div>
                        </TableCell>
                    </TableRow>
                ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

const AddUserModal = ({ onUserAdded }) => {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const { toast } = useToast();
    const [formData, setFormData] = useState({
        email: '',
        fullName: '',
        role: 'staff'
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        // In a real app, this would call an Edge Function to create the user in Auth + Public table
        // Since we are client side only, we'll simulate adding an invitation
        try {
            const { error } = await supabase.from('user_invitations').insert({
                email: formData.email,
                role: formData.role,
                token: crypto.randomUUID(),
                expires_at: new Date(Date.now() + 86400000).toISOString() // 24h
            });
            
            if (error) throw error;
            
            toast({ title: "Invitation Created", description: "User can now sign up with this email." });
            setOpen(false);
            setFormData({ email: '', fullName: '', role: 'staff' });
        } catch (err) {
             toast({ variant: "destructive", title: "Error", description: err.message });
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className="bg-maroon hover:bg-maroon/90"><Plus className="w-4 h-4 mr-2"/> Add User</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Invite New User</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4 py-4">
                    <div className="space-y-2">
                        <Label>Email Address</Label>
                        <Input value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} required type="email" />
                    </div>
                    <div className="space-y-2">
                        <Label>Role</Label>
                        <Select value={formData.role} onValueChange={v => setFormData({...formData, role: v})}>
                            <SelectTrigger>
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="staff">Staff</SelectItem>
                                <SelectItem value="manager">Manager</SelectItem>
                                <SelectItem value="admin">Admin</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <Button type="submit" className="w-full bg-maroon" disabled={loading}>
                        {loading && <Loader2 className="w-4 h-4 mr-2 animate-spin"/>} Send Invite
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    );
};

const EditUserModal = ({ user, onUpdate }) => {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const { toast } = useToast();
    const [formData, setFormData] = useState({ ...user });

    const handleUpdate = async () => {
        setLoading(true);
        try {
            const { error } = await supabase
                .from('public_users')
                .update({ role: formData.role, is_active: formData.is_active, full_name: formData.full_name })
                .eq('id', user.id);
            
            if (error) throw error;
            toast({ title: "User updated" });
            onUpdate();
            setOpen(false);
        } catch (err) {
            toast({ variant: "destructive", title: "Error", description: err.message });
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                 <Button variant="ghost" size="icon"><Edit className="w-4 h-4 text-gray-500" /></Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Edit User: {user.full_name}</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 py-4">
                    <div className="space-y-2">
                        <Label>Full Name</Label>
                        <Input value={formData.full_name || ''} onChange={e => setFormData({...formData, full_name: e.target.value})} />
                    </div>
                    <div className="space-y-2">
                        <Label>Role</Label>
                         <Select value={formData.role} onValueChange={v => setFormData({...formData, role: v})}>
                            <SelectTrigger>
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="staff">Staff</SelectItem>
                                <SelectItem value="manager">Manager</SelectItem>
                                <SelectItem value="admin">Admin</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="flex items-center justify-between border p-3 rounded-md">
                        <Label>Account Status</Label>
                        <Button 
                            variant={formData.is_active ? "destructive" : "default"}
                            size="sm"
                            type="button"
                            onClick={() => setFormData({...formData, is_active: !formData.is_active})}
                        >
                            {formData.is_active ? 'Deactivate' : 'Activate'}
                        </Button>
                    </div>
                    <Button onClick={handleUpdate} className="w-full bg-maroon" disabled={loading}>
                        {loading && <Loader2 className="w-4 h-4 mr-2 animate-spin"/>} Save Changes
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default UserManagement;