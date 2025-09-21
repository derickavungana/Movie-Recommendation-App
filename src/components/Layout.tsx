import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useAuth } from '../context/AuthContext';
import { logout } from '../services/authService';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { currentUser } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Head>
        <title>Movie App</title>
        <meta name="description" content="A simple movie recommendation app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className="bg-gray-800 p-4 shadow-md">
        <nav className="container mx-auto flex justify-between items-center">
          <Link href="/">
            <a className="text-2xl font-bold text-blue-400 hover:text-blue-300 transition-colors">
              🎬 Movie App
            </a>
          </Link>
          <div className="flex items-center space-x-4">
            {currentUser ? (
              <>
                <span className="text-sm font-medium hidden md:block">
                  Welcome, {currentUser.email}
                </span>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-sm font-medium transition-colors"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link href="/login">
                <a className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-sm font-medium transition-colors">
                  Login
                </a>
              </Link>
            )}
          </div>
        </nav>
      </header>

      <main className="container mx-auto p-4">{children}</main>
    </div>
  );
};

export default Layout;