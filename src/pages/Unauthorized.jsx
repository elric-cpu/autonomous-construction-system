import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ShieldAlert } from 'lucide-react';
import SEO from '@/components/SEO';

const Unauthorized = () => {
  return (
    <>
      <SEO title="Access Denied" />
      <div className="flex flex-col items-center justify-center min-h-[70vh] bg-white px-4 text-center">
        <ShieldAlert className="w-20 h-20 text-maroon mb-6" />
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Access Denied</h1>
        <p className="text-gray-500 max-w-md mb-8">
          You do not have the necessary permissions to view this page. If you believe this is an error, please contact your administrator.
        </p>
        <div className="flex gap-4">
            <Link to="/">
                <Button variant="outline">Go Home</Button>
            </Link>
            <Link to="/staff-portal">
                <Button className="bg-maroon hover:bg-maroon/90">Staff Dashboard</Button>
            </Link>
        </div>
      </div>
    </>
  );
};

export default Unauthorized;