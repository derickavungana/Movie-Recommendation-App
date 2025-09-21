// app/layout.tsx

import React from 'react';
import Link from 'next/link';
import Providers from './providers'; // Import the new providers component
import './globals.css';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <div className="min-h-screen bg-gray-900 text-white">
            <header className="bg-gray-800 p-4 shadow-md">
              <nav className="container mx-auto flex justify-between items-center">
                <Link href="/">
                  <div className="text-2xl font-bold text-blue-400 hover:text-blue-300 transition-colors cursor-pointer">
                    🎬 Movie App
                  </div>
                </Link>
                {/* Auth status will be handled by a separate client component if needed */}
              </nav>
            </header>
            <main className="container mx-auto p-4">{children}</main>
          </div>
        </Providers>
      </body>
    </html>
  );
}