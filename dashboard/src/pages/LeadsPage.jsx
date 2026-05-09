import React, { useState } from 'react';
import { Search, Download, Inbox } from 'lucide-react';
import { leads } from '../data/mockData';

export default function LeadsPage() {
  const [filter, setFilter] = useState('All');

  return (
    <div className="page-fade" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>

      {/* Toolbar */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', gap: '8px' }}>
          {['All', 'Hot', 'Warm', 'Cold'].map(s => (
            <button key={s} onClick={() => setFilter(s)}
              style={{
                fontSize: '12px', fontWeight: 500, padding: '6px 16px', borderRadius: '20px',
                background: filter === s ? '#c40014' : '#fff',
                color: filter === s ? '#fff' : '#64748b',
                border: filter === s ? '1px solid #c40014' : '1px solid #e2e8f0',
                cursor: 'pointer', transition: '0.2s'
              }}>
              {s}
            </button>
          ))}
        </div>
        
        <div style={{ display: 'flex', gap: '12px' }}>
          <div style={{ position: 'relative' }}>
            <Search size={16} color="#94a3b8" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
            <input 
              placeholder="Search leads..." 
              className="input-field"
              style={{ paddingLeft: '36px', width: '250px' }} 
            />
          </div>
          <button className="btn-secondary">
            <Download size={16} /> Export
          </button>
        </div>
      </div>

      {/* Leads Table */}
      <div className="card" style={{ padding: 0 }}>
        <div style={{ overflowX: 'auto' }}>
          <table>
            <thead>
              <tr>
                <th>Lead Details</th>
                <th>Company</th>
                <th>Contact</th>
                <th>Requirement</th>
                <th>Status</th>
                <th>Time</th>
              </tr>
            </thead>
            <tbody>
              {leads.length > 0 ? (
                leads.map(lead => (
                  <tr key={lead.id}>
                    <td>
                      <p style={{ fontSize: '14px', fontWeight: 500, color: '#0f172a' }}>{lead.name}</p>
                      <p style={{ fontSize: '12px', color: '#64748b', marginTop: '2px' }}>{lead.id}</p>
                    </td>
                    <td>{lead.company}</td>
                    <td>
                      <p style={{ fontSize: '12px', color: '#333' }}>{lead.email}</p>
                      <p style={{ fontSize: '12px', color: '#64748b', marginTop: '2px' }}>{lead.phone}</p>
                    </td>
                    <td>{lead.requirement}</td>
                    <td><span className="badge badge-gray">{lead.status}</span></td>
                    <td style={{ fontSize: '12px', color: '#64748b' }}>{lead.time}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" style={{ textAlign: 'center', padding: '64px 24px' }}>
                    <div style={{ width: '48px', height: '48px', background: '#f8fafc', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px' }}>
                      <Inbox size={20} color="#94a3b8" />
                    </div>
                    <p style={{ fontSize: '14px', fontWeight: 500, color: '#0f172a', marginBottom: '4px' }}>No leads captured yet</p>
                    <p style={{ fontSize: '12px', color: '#64748b' }}>Leads will appear here automatically when Riya captures them.</p>
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
