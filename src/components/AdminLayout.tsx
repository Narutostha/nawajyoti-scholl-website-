import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from './ui/button';
import { signOut } from '../lib/auth';

interface AdminLayoutProps {
  children: React.ReactNode;
  title: string;
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({ children, title }) => {
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate('/admin/login');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <img
              src="/navajyoti.jpg"
              alt="Nava Jyoti School"
              className="h-10 w-10 rounded"
            />
            <h1 className="ml-3 text-2xl font-bold text-gray-900">
              {title}
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              onClick={() => navigate('/admin/dashboard')}
            >
              Dashboard
            </Button>
            <Button
              variant="outline"
              onClick={handleSignOut}
              className="text-gray-600 hover:text-gray-900"
            >
              Sign out
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {children}
      </main>
    </div>
  );
};