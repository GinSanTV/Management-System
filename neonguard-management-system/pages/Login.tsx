
import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { ShieldCheck, Lock, Mail, AlertTriangle } from 'lucide-react';

const Login: React.FC = () => {
  const [email, setEmail] = useState('admin@neonguard.cyber');
  const [password, setPassword] = useState('password');
  const [error, setError] = useState('');
  const [isResetMode, setIsResetMode] = useState(false);
  const { login, resetPassword } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      if (isResetMode) {
        await resetPassword(email);
        alert('Data recovery link transmitted.');
        setIsResetMode(false);
      } else {
        await login(email, password);
        window.location.hash = '/dashboard';
      }
    } catch (err: any) {
      setError(err.message || "UPLINK_FAILURE_DETECTED");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative p-4">
      {/* Background elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#191833] via-[#0d0c1d] to-[#191833]"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-yellow-400/5 blur-[120px] rounded-full"></div>
      
      <div className="relative w-full max-w-md">
        <div className="p-8 cyber-card neon-border backdrop-blur-md">
          <div className="flex justify-center mb-8">
            <div className="w-16 h-16 neon-border rounded-full flex items-center justify-center bg-yellow-400/10 text-yellow-400 shadow-[0_0_15px_rgba(255,211,0,0.4)]">
              <ShieldCheck size={40} />
            </div>
          </div>

          <h1 className="text-3xl font-orbitron font-black text-center text-white mb-2">
            NEON<span className="text-yellow-400">GUARD</span>
          </h1>
          <p className="text-center text-yellow-400/60 text-xs tracking-[0.4em] uppercase mb-8">
            Secure Access Gateway
          </p>

          {error && (
            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/50 text-red-500 flex items-center gap-3 animate-pulse">
              <AlertTriangle size={20} />
              <span className="text-sm font-bold uppercase">{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs uppercase tracking-widest text-yellow-400/80 font-bold ml-1">Identity Tag (Email)</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-yellow-400/50" size={18} />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-slate-900/50 border border-yellow-400/20 p-3 pl-10 text-white focus:outline-none focus:border-yellow-400 transition-colors"
                  placeholder="name@nexus.com"
                />
              </div>
            </div>

            {!isResetMode && (
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-widest text-yellow-400/80 font-bold ml-1">Access Phrase (Password)</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-yellow-400/50" size={18} />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-slate-900/50 border border-yellow-400/20 p-3 pl-10 text-white focus:outline-none focus:border-yellow-400 transition-colors"
                    placeholder="••••••••"
                  />
                </div>
              </div>
            )}

            <button type="submit" className="w-full neon-button py-4 text-lg mt-4 shadow-lg shadow-yellow-400/10">
              {isResetMode ? 'Initiate Recovery' : 'Authorize Entry'}
            </button>
          </form>

          <div className="mt-8 flex justify-between text-xs font-bold tracking-widest">
            <button 
              onClick={() => setIsResetMode(!isResetMode)}
              className="text-yellow-400/50 hover:text-yellow-400 transition-colors uppercase"
            >
              {isResetMode ? 'Back to Portal' : 'Lost Access Phrase?'}
            </button>
            <span className="text-white/20 uppercase">System v2.5.0-Final</span>
          </div>
        </div>
        
        <div className="mt-6 flex justify-center gap-4 text-[10px] uppercase tracking-[0.2em] text-white/30">
          <span>Encryption: AES-256</span>
          <span>•</span>
          <span>Status: Protected</span>
          <span>•</span>
          <span>Region: sector-7</span>
        </div>
      </div>
    </div>
  );
};

export default Login;
