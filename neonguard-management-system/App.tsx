
import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { UserRole } from './types';
import Layout from './components/Layout';
import RoleGuard from './components/RoleGuard';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';

// Simple placeholder components for missing pages
const Placeholder: React.FC<{ name: string }> = ({ name }) => (
  <div className="cyber-card p-12 text-center">
    <h2 className="text-4xl font-orbitron text-yellow-400 mb-4">{name}</h2>
    <p className="text-white/60 italic uppercase tracking-widest">Sector Under Construction - Check back after system sync</p>
  </div>
);

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) return <div className="flex items-center justify-center h-screen bg-[#191833] text-yellow-400 font-orbitron animate-pulse">SYNCHRONIZING_BIOMETRICS...</div>;
  if (!user) return <Navigate to="/login" replace />;
  return <Layout>{children}</Layout>;
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <HashRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } />

          <Route path="/employees" element={
            <ProtectedRoute>
              <RoleGuard allowedRoles={[UserRole.ADMIN, UserRole.MANAGER]}>
                <Placeholder name="EMPLOYEE_DATABASE" />
              </RoleGuard>
            </ProtectedRoute>
          } />

          <Route path="/time-tracking" element={
            <ProtectedRoute>
              <Placeholder name="CHRONO_LOGS" />
            </ProtectedRoute>
          } />

          <Route path="/tasks" element={
            <ProtectedRoute>
              <Placeholder name="DIRECTIVE_CONTROL" />
            </ProtectedRoute>
          } />

          <Route path="/products" element={
            <ProtectedRoute>
              <Placeholder name="INVENTORY_CORE" />
            </ProtectedRoute>
          } />

          <Route path="/support" element={
            <ProtectedRoute>
              <Placeholder name="ASSISTANCE_INTERFACE" />
            </ProtectedRoute>
          } />

          <Route path="/admin" element={
            <ProtectedRoute>
              <RoleGuard allowedRoles={[UserRole.ADMIN]}>
                <Placeholder name="ROOT_TERMINAL" />
              </RoleGuard>
            </ProtectedRoute>
          } />

          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </HashRouter>
    </AuthProvider>
  );
};

export default App;
