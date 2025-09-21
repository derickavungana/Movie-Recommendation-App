'use client';

import Link from 'next/link';
import { useAuth } from '../context/AuthContext';
import { logout } from '../services/authService';

const AuthStatus = () => {
  const { currentUser } = useAuth(); // useAuth hook is now safely called within this component

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <div className="flex items-center space-x-4">
      {currentUser ? (
        <>
          <span className="text-sm font-medium hidden md:block">Welcome, {currentUser.email}</span>
          <button
            onClick={handleLogout}
            className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-sm font-medium transition-colors"
          >
            Logout
          </button>
        </>
      ) : (
        <Link href="/login">
          <div className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-sm font-medium transition-colors cursor-pointer">
            Login
          </div>
        </Link>
      )}
    </div>
  );
};

export default AuthStatus;