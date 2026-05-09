import React from 'react';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, PieChart, Pie, Cell
} from 'recharts';
import StatCard from '../components/StatCard';
import { statsCards, recentCalls, callVolumeData, intentData, currentAgent } from '../data/mockData';
import { Bot, ArrowUpRight } from 'lucide-react';

const PIE_COLORS = ['#c40014', '#1e293b', '#3b82f6', '#10b981', '#f59e0b'];

export default function DashboardPage() {
  return (
    <div className="page-fade" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>

      {/* Agent Overview Banner */}
      <div className="card" style={{ padding: '24px', display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ width: '48px', height: '48px', borderRadius: '8px', background: '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Bot size={24} color="#64748b" />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <p style={{ fontSize: '16px', fontWeight: 600, color: '#0f172a' }}>{currentAgent.name}</p>
              <span className="badge" style={{ background: '#f1f5f9', color: '#64748b' }}>Offline</span>
            </div>
            <p style={{ fontSize: '12px', color: '#64748b', marginTop: '4px' }}>
              {currentAgent.model} · {currentAgent.stt} · {currentAgent.tts}
            </p>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '24px' }}>
        {statsCards.map(card => (
          <StatCard key={card.id} {...card} />
        ))}
      </div>

      {/* Charts Row */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '24px' }}>
        <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <h3 style={{ fontSize: '14px', fontWeight: 600, color: '#0f172a' }}>Call Volume – Today</h3>
          <div style={{ width: '100%', height: '300px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={callVolumeData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                <XAxis dataKey="hour" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} />
                <Tooltip 
                  contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '12px' }}
                />
                <Area type="monotone" dataKey="inbound" stroke="#c40014" fill="#fef2f2" strokeWidth={2} />
                <Area type="monotone" dataKey="outbound" stroke="#1e293b" fill="#f8fafc" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Recent Calls Table */}
      <div className="card" style={{ padding: '0' }}>
        <div style={{ padding: '24px', borderBottom: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h3 style={{ fontSize: '14px', fontWeight: 600, color: '#0f172a' }}>Recent Calls</h3>
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table>
            <thead>
              <tr>
                <th>Call ID</th>
                <th>Caller</th>
                <th>Type</th>
                <th>Duration</th>
                <th>Time</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {recentCalls.length > 0 ? (
                recentCalls.map(call => (
                  <tr key={call.id}>
                    <td style={{ fontWeight: 500 }}>{call.id}</td>
                    <td>{call.caller}</td>
                    <td>{call.type}</td>
                    <td>{call.duration}</td>
                    <td>{call.time}</td>
                    <td><span className="badge badge-gray">{call.status}</span></td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" style={{ textAlign: 'center', padding: '48px', color: '#64748b', fontSize: '14px' }}>
                    No call data available for today.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
