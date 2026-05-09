import React from 'react';
import { EyeOff, Plus, Trash2, RefreshCw } from 'lucide-react';
import { apiKeys } from '../data/mockData';

export default function ApiKeysPage() {
  return (
    <div className="page-fade" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <p style={{ fontSize: '14px', color: '#64748b' }}>
          Manage API credentials for LLM, STT, TTS, and infrastructure services.
        </p>
        <button className="btn-primary">
          <Plus size={14} /> Add New Key
        </button>
      </div>

      <div className="card" style={{ padding: 0 }}>
        <div style={{ padding: '24px', borderBottom: '1px solid #e2e8f0' }}>
          <h3 style={{ fontSize: '14px', fontWeight: 600, color: '#0f172a' }}>Active API Keys</h3>
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table>
            <thead>
              <tr>
                <th>Service</th>
                <th>API Key</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {apiKeys.length > 0 ? (
                apiKeys.map(k => (
                  <tr key={k.id}>
                    <td style={{ fontWeight: 500 }}>{k.name}</td>
                    <td>
                      <code style={{ fontSize: '12px', background: '#f1f5f9', padding: '4px 8px', borderRadius: '4px', fontFamily: 'monospace' }}>
                        ••••••••••••••••
                      </code>
                    </td>
                    <td><span className="badge badge-green">Active</span></td>
                    <td>
                      <div style={{ display: 'flex', gap: '12px' }}>
                        <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#64748b' }}><RefreshCw size={16} /></button>
                        <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#dc2626' }}><Trash2 size={16} /></button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" style={{ textAlign: 'center', padding: '48px', color: '#64748b', fontSize: '14px' }}>
                    No API keys configured yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="card" style={{ background: '#f8fafc', border: '1px dashed #cbd5e1' }}>
        <p style={{ fontSize: '14px', fontWeight: 600, color: '#0f172a', marginBottom: '4px' }}>Security Best Practices</p>
        <p style={{ fontSize: '12px', color: '#64748b' }}>Rotate API keys every 90 days. Never share keys in logs or commits. Use environment variables in production.</p>
      </div>

    </div>
  );
}
