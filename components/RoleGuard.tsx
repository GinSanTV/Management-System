
import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { UserRole } from '../types';

interface RoleGuardProps {
  children: React.ReactNode;
  allowedRoles: UserRole[];
  fallback?: React.ReactNode;
}

const RoleGuard: React.FC<RoleGuardProps> = ({ children, allowedRoles, fallback }) => {
  const { user, loading } = useAuth();

  if (loading) return <div className="p-8 text-yellow-400">CONNECTING TO NEURAL NET...</div>;

  if (!user || !allowedRoles.includes(user.role)) {
    return fallback ? <>{fallback}</> : (
      <div className="flex flex-col items-center justify-center h-screen bg-slate-900 text-white p-4">
        <h1 className="text-4xl font-orbitron text-red-500 mb-4 tracking-tighter">ACCESS DENIED</h1>
        <p className="text-lg opacity-70">Error 403: Your clearance level is insufficient for this sector.</p>
        <button 
          onClick={() => window.location.hash = '/'}
          className="mt-6 neon-button px-6 py-2"
        >
          Return to Deck
        </button>
      </div>
    );
  }

  return <>{children}</>;
};

export default RoleGuard;
