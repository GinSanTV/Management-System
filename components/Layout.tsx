
import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { UserRole } from '../types';
import Sidebar from './Sidebar';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();

  if (!user) return <>{children}</>;

  return (
    <div className="flex min-h-screen bg-[#191833]">
      <Sidebar />
      <main className="flex-1 overflow-y-auto p-4 md:p-8 pt-20 md:pt-8 transition-all duration-300">
        <header className="mb-8 flex justify-between items-center border-b border-yellow-400/20 pb-4">
          <div>
            <h2 className="text-yellow-400 font-orbitron text-sm uppercase tracking-[0.2em]">Sector Data Status</h2>
            <h1 className="text-3xl font-orbitron text-white">SYSTEM_DASHBOARD_v4.2</h1>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right hidden md:block">
              <p className="text-white font-bold">{user.displayName}</p>
              <p className="text-yellow-400 text-xs tracking-widest">{user.role}</p>
            </div>
            <div className="w-12 h-12 neon-border flex items-center justify-center bg-yellow-400 text-black font-bold text-xl">
              {user.displayName.charAt(0)}
            </div>
          </div>
        </header>
        {children}
      </main>
    </div>
  );
};

export default Layout;
