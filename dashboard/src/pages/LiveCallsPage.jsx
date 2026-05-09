import React from 'react';
import { Phone, Search, Download } from 'lucide-react';

export default function LiveCallsPage() {
  const calls = []; // Production empty state

  return (
    <div className="page-fade" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      
      {/* Summary */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '24px' }}>
        {[
          { label: 'Active Calls', value: '0' },
          { label: 'On Hold',      value: '0' },
          { label: 'Total Live',   value: '0' },
        ].map(({ label, value }) => (
          <div key={label} className="card" style={{ padding: '24px', textAlign: 'center' }}>
            <p style={{ fontSize: '32px', fontWeight: 600, color: '#0f172a' }}>{value}</p>
            <p style={{ fontSize: '12px', fontWeight: 500, color: '#64748b', marginTop: '4px' }}>{label}</p>
          </div>
        ))}
      </div>

      {/* Toolbar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h3 style={{ fontSize: '16px', fontWeight: 600, color: '#0f172a' }}>Live Monitor</h3>
        <button className="btn-secondary">
          <Search size={16} /> Filter
        </button>
      </div>

      {/* Empty State */}
      {calls.length === 0 && (
        <div className="card" style={{ padding: '64px 24px', textAlign: 'center' }}>
          <div style={{ width: '64px', height: '64px', background: '#f1f5f9', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
            <Phone size={24} color="#94a3b8" />
          </div>
          <p style={{ fontSize: '16px', fontWeight: 500, color: '#0f172a', marginBottom: '8px' }}>No active calls right now</p>
          <p style={{ fontSize: '14px', color: '#64748b' }}>When Riya answers a call, it will appear here in real-time.</p>
        </div>
      )}
    </div>
  );
}
