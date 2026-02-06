
import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { UserRole } from '../types';
import { 
  LayoutDashboard, 
  Users, 
  Clock, 
  LifeBuoy, 
  Package, 
  CheckSquare, 
  Settings, 
  LogOut,
  ShieldAlert,
  Menu,
  X
} from 'lucide-react';

const Sidebar: React.FC = () => {
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '#/dashboard', roles: Object.values(UserRole) },
    { icon: Users, label: 'Employees', path: '#/employees', roles: [UserRole.ADMIN, UserRole.MANAGER] },
    { icon: Clock, label: 'Time Logs', path: '#/time-tracking', roles: Object.values(UserRole) },
    { icon: CheckSquare, label: 'Tasks', path: '#/tasks', roles: Object.values(UserRole) },
    { icon: Package, label: 'Inventory', path: '#/products', roles: [UserRole.ADMIN, UserRole.MANAGER, UserRole.SUPPORT] },
    { icon: LifeBuoy, label: 'Support', path: '#/support', roles: [UserRole.ADMIN, UserRole.MANAGER, UserRole.SUPPORT] },
    { icon: ShieldAlert, label: 'Admin Panel', path: '#/admin', roles: [UserRole.ADMIN] },
  ];

  const filteredItems = menuItems.filter(item => item.roles.includes(user?.role || UserRole.GUEST));

  return (
    <>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 left-4 z-50 md:hidden bg-yellow-400 p-2 rounded text-black shadow-lg"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      <aside className={`
        fixed top-0 left-0 z-40 h-screen w-64 bg-[#191833] border-r border-yellow-400/30
        transition-transform duration-300 ease-in-out flex flex-col
        ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}>
        <div className="p-6 border-b border-yellow-400/20">
          <h1 className="text-2xl font-orbitron font-black text-yellow-400 tracking-tighter">
            NEON<span className="text-white">GUARD</span>
          </h1>
          <p className="text-[10px] text-yellow-400/50 uppercase tracking-[0.3em] mt-1">Enterprise OS 2.5</p>
        </div>

        <nav className="flex-1 overflow-y-auto py-6 px-4 space-y-2">
          {filteredItems.map((item) => (
            <a
              key={item.label}
              href={item.path}
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-4 p-3 rounded text-white/70 hover:text-black hover:bg-yellow-400 transition-all group"
            >
              <item.icon size={20} className="group-hover:scale-110 transition-transform" />
              <span className="font-medium tracking-wide">{item.label}</span>
            </a>
          ))}
        </nav>

        <div className="p-4 border-t border-yellow-400/20">
          <button
            onClick={logout}
            className="flex items-center gap-4 w-full p-3 rounded text-red-400 hover:bg-red-500/10 transition-colors"
          >
            <LogOut size={20} />
            <span className="font-bold uppercase text-sm tracking-widest">Logout System</span>
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
