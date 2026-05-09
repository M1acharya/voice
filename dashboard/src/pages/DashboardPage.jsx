import React from 'react';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, PieChart, Pie, Cell, Legend
} from 'recharts';
import StatCard from '../components/StatCard';
import { statsCards, recentCalls, callVolumeData, intentData, currentAgent } from '../data/mockData';
import { PhoneCall, Clock, ArrowUpRight, Bot, Cpu } from 'lucide-react';
import clsx from 'clsx';

const STATUS_STYLES = {
  Completed:   'bg-green-100 text-green-700',
  Transferred: 'bg-blue-100 text-blue-700',
  'No Answer': 'bg-gray-100 text-gray-500',
};

const PIE_COLORS = ['#c40014', '#1c2434', '#3b82f6', '#10b981', '#f59e0b'];

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-100 px-3 py-2.5 text-xs">
      <p className="font-600 text-gray-700 mb-1">{label}</p>
      {payload.map(p => (
        <p key={p.dataKey} style={{ color: p.color }} className="font-500">
          {p.name}: {p.value}
        </p>
      ))}
    </div>
  );
};

export default function DashboardPage() {
  return (
    <div className="page-fade space-y-6">

      {/* Agent Overview Banner */}
      <div className="bg-gradient-to-r from-[#1c2434] to-[#243146] rounded-2xl p-5 text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-[#c40014] flex items-center justify-center shadow-lg">
            <Bot size={22} className="text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <p className="font-700 text-base">{currentAgent.name}</p>
              <span className="flex items-center gap-1 text-[10px] bg-green-500/20 text-green-300 px-2 py-0.5 rounded-full font-600">
                <span className="w-1.5 h-1.5 bg-green-400 rounded-full" />
                Online
              </span>
            </div>
            <p className="text-white/60 text-[12px] mt-0.5">
              {currentAgent.model} · {currentAgent.stt} · {currentAgent.tts}
            </p>
          </div>
        </div>
        <div className="flex flex-wrap gap-3 text-[11px]">
          {[
            { label: 'Uptime',    value: currentAgent.uptime },
            { label: 'Voice',     value: currentAgent.voice },
            { label: 'Language',  value: 'Auto-detect' },
          ].map(({ label, value }) => (
            <div key={label} className="bg-white/10 rounded-xl px-3 py-2 text-center">
              <p className="text-white/50 font-500">{label}</p>
              <p className="font-700 text-white mt-0.5">{value}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
        {statsCards.map(card => (
          <StatCard key={card.id} {...card} />
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">

        {/* Call Volume Area Chart */}
        <div className="xl:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-700 text-[#1c2434] text-sm">Call Volume – Today</h3>
              <p className="text-[11px] text-gray-400 mt-0.5">Inbound vs Outbound by hour</p>
            </div>
            <div className="flex items-center gap-3 text-[11px]">
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-[#c40014]" />Inbound</span>
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-[#1c2434]" />Outbound</span>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={callVolumeData} margin={{ top: 5, right: 5, bottom: 0, left: -20 }}>
              <defs>
                <linearGradient id="gradIn" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#c40014" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="#c40014" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="gradOut" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#1c2434" stopOpacity={0.12} />
                  <stop offset="95%" stopColor="#1c2434" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
              <XAxis dataKey="hour" tick={{ fontSize: 10, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 10, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Area type="monotone" dataKey="inbound"  name="Inbound"  stroke="#c40014" strokeWidth={2} fill="url(#gradIn)" />
              <Area type="monotone" dataKey="outbound" name="Outbound" stroke="#1c2434" strokeWidth={2} fill="url(#gradOut)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Intent Pie Chart */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
          <h3 className="font-700 text-[#1c2434] text-sm mb-1">Call Intent Breakdown</h3>
          <p className="text-[11px] text-gray-400 mb-3">Top customer intents today</p>
          <ResponsiveContainer width="100%" height={160}>
            <PieChart>
              <Pie data={intentData} cx="50%" cy="50%" innerRadius={45} outerRadius={72}
                dataKey="value" paddingAngle={3}>
                {intentData.map((_, i) => (
                  <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(v) => `${v}%`} />
            </PieChart>
          </ResponsiveContainer>
          <ul className="mt-2 space-y-1.5">
            {intentData.map((d, i) => (
              <li key={d.name} className="flex items-center justify-between text-[11px]">
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full" style={{ background: PIE_COLORS[i] }} />
                  <span className="text-gray-600">{d.name}</span>
                </span>
                <span className="font-600 text-gray-800">{d.value}%</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Recent Calls Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
          <div>
            <h3 className="font-700 text-[#1c2434] text-sm">Recent Calls</h3>
            <p className="text-[11px] text-gray-400 mt-0.5">Last 10 call sessions handled by Riya</p>
          </div>
          <button className="flex items-center gap-1 text-[12px] text-[#c40014] font-600 hover:underline">
            View All <ArrowUpRight size={13} />
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 text-gray-500 text-[11px] font-600 uppercase tracking-wide">
                <th className="text-left px-5 py-3">Call ID</th>
                <th className="text-left px-4 py-3">Caller</th>
                <th className="text-left px-4 py-3 hidden md:table-cell">Type</th>
                <th className="text-left px-4 py-3 hidden lg:table-cell">Intent</th>
                <th className="text-left px-4 py-3 hidden sm:table-cell">Duration</th>
                <th className="text-left px-4 py-3 hidden lg:table-cell">Time</th>
                <th className="text-left px-4 py-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {recentCalls.map((call, idx) => (
                <tr key={call.id} className={clsx('border-t border-gray-50 hover:bg-gray-50/60 transition-colors', idx % 2 === 0 ? '' : '')}>
                  <td className="px-5 py-3 font-600 text-[#c40014] text-[12px]">{call.id}</td>
                  <td className="px-4 py-3">
                    <p className="font-600 text-gray-800 text-[13px]">{call.caller}</p>
                    <p className="text-[11px] text-gray-400">{call.number}</p>
                  </td>
                  <td className="px-4 py-3 hidden md:table-cell">
                    <span className={clsx('text-[11px] font-600 px-2 py-0.5 rounded-full',
                      call.type === 'Inbound' ? 'bg-blue-50 text-blue-700' : 'bg-purple-50 text-purple-700'
                    )}>
                      {call.type}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-[12px] text-gray-600 hidden lg:table-cell">{call.intent}</td>
                  <td className="px-4 py-3 hidden sm:table-cell">
                    <span className="flex items-center gap-1 text-[12px] text-gray-600">
                      <Clock size={12} /> {call.duration}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-[12px] text-gray-400 hidden lg:table-cell">{call.time}</td>
                  <td className="px-4 py-3">
                    <span className={clsx('text-[11px] font-600 px-2 py-0.5 rounded-full', STATUS_STYLES[call.status])}>
                      {call.status}
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
}
