
import React from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line, AreaChart, Area
} from 'recharts';
import { Activity, Zap, Cpu, Server, Database, Globe } from 'lucide-react';

const data = [
  { name: '00h', power: 400, load: 240, amt: 2400 },
  { name: '04h', power: 300, load: 139, amt: 2210 },
  { name: '08h', power: 200, load: 980, amt: 2290 },
  { name: '12h', power: 278, load: 390, amt: 2000 },
  { name: '16h', power: 189, load: 480, amt: 2181 },
  { name: '20h', power: 239, load: 380, amt: 2500 },
  { name: '23h', power: 349, load: 430, amt: 2100 },
];

const StatCard: React.FC<{ icon: any, label: string, value: string, trend: string, color: string }> = ({ icon: Icon, label, value, trend, color }) => (
  <div className="cyber-card p-6 border-b-0 border-r-0 border-t-0 bg-slate-900/40">
    <div className="flex items-start justify-between">
      <div>
        <p className="text-xs text-white/50 uppercase tracking-[0.2em] mb-1">{label}</p>
        <h3 className="text-2xl font-orbitron font-bold text-white mb-2">{value}</h3>
        <p className={`text-xs font-bold ${trend.startsWith('+') ? 'text-green-400' : 'text-red-400'}`}>
          {trend} <span className="text-white/30 ml-1">since last boot</span>
        </p>
      </div>
      <div className={`p-3 rounded bg-slate-800 border border-${color}-500/50 text-${color}-400`}>
        <Icon size={24} />
      </div>
    </div>
  </div>
);

const Dashboard: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Top Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={Zap} label="Core Load" value="42.8%" trend="+2.4%" color="yellow" />
        <StatCard icon={Activity} label="Active Nodes" value="1,204" trend="+12" color="cyan" />
        <StatCard icon={Cpu} label="Processing" value="8.4 GHz" trend="-0.1%" color="magenta" />
        <StatCard icon={Database} label="Sync Rate" value="99.99%" trend="+0.01%" color="blue" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Chart */}
        <div className="lg:col-span-2 cyber-card p-6">
          <h3 className="text-lg font-orbitron text-yellow-400 mb-6 flex items-center gap-2">
            <Server size={18} />
            GRID_POWER_CONSUMPTION
          </h3>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorPower" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#FFD300" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#FFD300" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="name" stroke="#64748b" fontSize={12} />
                <YAxis stroke="#64748b" fontSize={12} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #FFD300', color: '#fff' }}
                  itemStyle={{ color: '#FFD300' }}
                />
                <Area type="monotone" dataKey="power" stroke="#FFD300" fillOpacity={1} fill="url(#colorPower)" strokeWidth={3} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Secondary Info Panel */}
        <div className="cyber-card p-6 flex flex-col">
          <h3 className="text-lg font-orbitron text-yellow-400 mb-6 flex items-center gap-2">
            <Globe size={18} />
            NODE_REGIONS
          </h3>
          <div className="flex-1 flex flex-col justify-between">
            <div className="space-y-4">
              {[
                { label: 'Neo-Tokyo', val: 78, color: 'bg-yellow-400' },
                { label: 'Berlin-Underground', val: 45, color: 'bg-cyan-400' },
                { label: 'Night-City', val: 92, color: 'bg-magenta-500' },
                { label: 'San-Frandisco', val: 61, color: 'bg-blue-400' }
              ].map(region => (
                <div key={region.label}>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-white/70 uppercase tracking-widest">{region.label}</span>
                    <span className="text-yellow-400 font-bold">{region.val}%</span>
                  </div>
                  <div className="w-full bg-white/5 h-1 rounded-full overflow-hidden">
                    <div className={`${region.color} h-full transition-all duration-1000`} style={{ width: `${region.val}%` }}></div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-8 p-4 bg-yellow-400/5 border border-yellow-400/20 rounded">
              <p className="text-[10px] text-yellow-400/50 uppercase mb-2">System Message</p>
              <p className="text-xs leading-relaxed italic text-white/80">
                "All operational nodes are within acceptable parameters. No anomalies detected in Sector 7."
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Task Preview */}
      <div className="cyber-card p-6">
        <h3 className="text-lg font-orbitron text-yellow-400 mb-6">URGENT_DIRECTIVES</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-white/5 text-[10px] uppercase tracking-[0.2em] text-white/40">
                <th className="pb-4 font-normal">Directive_ID</th>
                <th className="pb-4 font-normal">Objective</th>
                <th className="pb-4 font-normal">Priority</th>
                <th className="pb-4 font-normal">Assigned_Unit</th>
                <th className="pb-4 font-normal">Status</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {[
                { id: 'DIR-402', task: 'Reroute Power to Lab B', prio: 'CRITICAL', unit: 'Nexus-7', status: 'IN_PROGRESS' },
                { id: 'DIR-881', task: 'Update Encryption Protocols', prio: 'HIGH', unit: 'Cyber-9', status: 'PENDING' },
                { id: 'DIR-102', task: 'Clean Node Cluster 4', prio: 'LOW', unit: 'Bot-Alpha', status: 'COMPLETED' },
              ].map((row, idx) => (
                <tr key={idx} className="border-b border-white/5 last:border-0 hover:bg-white/5 transition-colors">
                  <td className="py-4 font-mono text-yellow-400/70">{row.id}</td>
                  <td className="py-4 font-bold">{row.task}</td>
                  <td className="py-4">
                    <span className={`px-2 py-0.5 text-[10px] rounded ${row.prio === 'CRITICAL' ? 'bg-red-500/20 text-red-500' : 'bg-blue-500/20 text-blue-400'}`}>
                      {row.prio}
                    </span>
                  </td>
                  <td className="py-4 text-white/60">{row.unit}</td>
                  <td className="py-4">
                    <span className="flex items-center gap-2">
                      <span className={`w-2 h-2 rounded-full ${row.status === 'COMPLETED' ? 'bg-green-500' : 'bg-yellow-400 animate-pulse'}`}></span>
                      {row.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
