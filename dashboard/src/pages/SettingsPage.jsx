import React from 'react';
import { Save, Globe, Bell, Shield, Webhook } from 'lucide-react';

const Section = ({ icon: Icon, title, children }) => (
  <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
    <h3 style={{ fontSize: '14px', fontWeight: 600, color: '#0f172a', display: 'flex', alignItems: 'center', gap: '8px', borderBottom: '1px solid #e2e8f0', paddingBottom: '16px' }}>
      <Icon size={16} color="#c40014" /> {title}
    </h3>
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>{children}</div>
  </div>
);

const Field = ({ label, hint, children }) => (
  <div>
    <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#475569', marginBottom: '8px' }}>{label}</label>
    {children}
    {hint && <p style={{ fontSize: '12px', color: '#94a3b8', marginTop: '6px' }}>{hint}</p>}
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
  return (
    <div className="page-fade" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '24px' }}>
        
        {/* General Settings */}
        <Section icon={Globe} title="General Settings">
          <Field label="Organization Name">
            <input className="input-field" defaultValue="OffiNeeds Corporate Gifting" />
          </Field>
          <Field label="Admin Email" hint="Used for system alerts and reports.">
            <input className="input-field" type="email" defaultValue="admin@offineeds.com" />
          </Field>
          <Field label="Timezone">
            <select className="input-field">
              <option>Asia/Kolkata (IST)</option>
              <option>UTC</option>
            </select>
          </Field>
        </Section>

        {/* Notifications */}
        <Section icon={Bell} title="Notifications">
          <Toggle label="Email Alerts on Hot Leads" desc="Receive email when Riya captures a hot lead." />
          <Toggle label="Call Transfer Notifications" desc="Alert when calls are transferred to sales." />
          <Toggle label="Agent Downtime Alerts" desc="Notify when Riya goes offline unexpectedly." />
        </Section>

        {/* Security */}
        <Section icon={Shield} title="Security & Access">
          <Field label="Session Timeout">
            <select className="input-field">
              <option>1 hour</option>
              <option>4 hours</option>
              <option>8 hours</option>
            </select>
          </Field>
          <Toggle label="Two-Factor Authentication" desc="Require OTP on admin login." />
          <Toggle label="Audit Logging" desc="Log all configuration changes with timestamps." />
        </Section>

        {/* Integrations */}
        <Section icon={Webhook} title="Integrations & Webhooks">
          <Field label="CRM Webhook URL" hint="POST lead data to your CRM after each call.">
            <input className="input-field" placeholder="https://crm.yourcompany.com/api/leads" />
          </Field>
          <Field label="Google Sheets Lead Export" hint="Auto-append leads to a connected Google Sheet.">
            <input className="input-field" placeholder="Google Sheets ID or URL" />
          </Field>
        </Section>

      </div>

      {/* Save Bar */}
      <div className="card" style={{ background: '#0f172a', borderColor: '#0f172a', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <p style={{ fontSize: '14px', fontWeight: 600, color: '#fff' }}>Save all settings</p>
          <p style={{ fontSize: '12px', color: '#94a3b8', marginTop: '4px' }}>Changes will apply immediately across the platform.</p>
        </div>
        <button className="btn-primary">
          <Save size={14} /> Save Settings
        </button>
      </div>

    </div>
  );
}
