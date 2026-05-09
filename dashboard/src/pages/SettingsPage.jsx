import React, { useState, useEffect } from 'react';
import { Save, Globe, Bell, Shield, Webhook, CheckCircle } from 'lucide-react';

const Section = ({ icon: Icon, title, children }) => (
  <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
    <h3 style={{ fontSize: '14px', fontWeight: 600, color: '#0f172a', display: 'flex', alignItems: 'center', gap: '8px', borderBottom: '1px solid #e2e8f0', paddingBottom: '16px' }}>
      <Icon size={16} color="#c40014" /> {title}
    </h3>
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>{children}</div>
  </div>
);

const Toggle = ({ label, desc }) => (
  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 0', borderBottom: '1px solid #f1f5f9' }}>
    <div>
      <p style={{ fontSize: '14px', fontWeight: 500, color: '#0f172a' }}>{label}</p>
      {desc && <p style={{ fontSize: '12px', color: '#64748b', marginTop: '4px' }}>{desc}</p>}
    </div>
    <label className="toggle-switch">
      <input type="checkbox" defaultChecked />
      <span className="toggle-slider" />
    </label>
  </div>
);

export default function SettingsPage() {
  const [admin, setAdmin] = useState({ username: '', password: '' });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetch('http://localhost:8000/api/config')
      .then(res => res.json())
      .then(data => {
        if (data.admin) setAdmin(data.admin);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const handleSaveAdmin = async () => {
    setSaving(true);
    try {
      await fetch('http://localhost:8000/api/config/admin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(admin)
      });
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (err) {
      console.error(err);
    }
    setSaving(false);
  };

  if (loading) return <p>Loading configuration...</p>;

  return (
    <div className="page-fade" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '24px' }}>
        
        {/* Security & Access (Admin Credentials) */}
        <Section icon={Shield} title="Admin Credentials">
          <div>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#475569', marginBottom: '8px' }}>Username</label>
            <input 
              className="input-field" 
              value={admin.username} 
              onChange={e => setAdmin({...admin, username: e.target.value})} 
            />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#475569', marginBottom: '8px' }}>Password</label>
            <input 
              type="password"
              className="input-field" 
              value={admin.password} 
              onChange={e => setAdmin({...admin, password: e.target.value})} 
            />
          </div>
          <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: '16px', marginTop: '8px' }}>
            {saved && <span style={{ fontSize: '13px', color: '#16a34a', display: 'flex', alignItems: 'center', gap: '4px' }}><CheckCircle size={14}/> Updated</span>}
            <button className="btn-primary" onClick={handleSaveAdmin} disabled={saving}>
              <Save size={14} /> {saving ? "Saving..." : "Update Credentials"}
            </button>
          </div>
        </Section>

        {/* Notifications */}
        <Section icon={Bell} title="Notifications">
          <Toggle label="Email Alerts on Hot Leads" desc="Receive email when Riya captures a hot lead." />
          <Toggle label="Call Transfer Notifications" desc="Alert when calls are transferred to sales." />
          <Toggle label="Agent Downtime Alerts" desc="Notify when Riya goes offline unexpectedly." />
        </Section>

      </div>
    </div>
  );
}
