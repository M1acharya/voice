import React, { useState } from 'react';
import { Save, Bell, Shield, Database, Globe, Mail, Webhook, ChevronRight } from 'lucide-react';

const Section = ({ icon: Icon, title, children }) => (
  <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
    <h3 className="flex items-center gap-2 font-700 text-[#1c2434] text-sm mb-5 pb-3 border-b border-gray-100">
      <Icon size={16} className="text-[#c40014]" /> {title}
    </h3>
    <div className="space-y-4">{children}</div>
  </div>
);

const Field = ({ label, hint, children }) => (
  <div>
    <label className="block text-[12px] font-600 text-gray-600 mb-1.5">{label}</label>
    {children}
    {hint && <p className="text-[11px] text-gray-400 mt-1">{hint}</p>}
  </div>
);

const Toggle = ({ label, desc, defaultChecked }) => {
  const [on, setOn] = useState(defaultChecked ?? true);
  return (
    <div className="flex items-center justify-between gap-3 py-2 border-b border-gray-50 last:border-0">
      <div>
        <p className="text-[13px] font-600 text-gray-800">{label}</p>
        {desc && <p className="text-[11px] text-gray-400 mt-0.5">{desc}</p>}
      </div>
      <label className="toggle-switch flex-shrink-0">
        <input type="checkbox" checked={on} onChange={e => setOn(e.target.checked)} />
        <span className="toggle-slider" />
      </label>
    </div>
  );
};

export default function SettingsPage() {
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="page-fade space-y-6">

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">

        {/* General Settings */}
        <Section icon={Globe} title="General Settings">
          <Field label="Organization Name">
            <input defaultValue="OffiNeeds Corporate Gifting"
              className="w-full text-[13px] border border-gray-200 rounded-xl px-3 py-2.5 outline-none focus:border-[#c40014] focus:ring-2 focus:ring-red-100 transition-all" />
          </Field>
          <Field label="Admin Email" hint="Used for system alerts and reports.">
            <input type="email" defaultValue="admin@offineeds.com"
              className="w-full text-[13px] border border-gray-200 rounded-xl px-3 py-2.5 outline-none focus:border-[#c40014] focus:ring-2 focus:ring-red-100 transition-all" />
          </Field>
          <Field label="Timezone">
            <select className="w-full text-[13px] border border-gray-200 rounded-xl px-3 py-2.5 outline-none focus:border-[#c40014] bg-white">
              <option>Asia/Kolkata (IST)</option>
              <option>Asia/Dubai (GST)</option>
              <option>America/New_York (EST)</option>
            </select>
          </Field>
          <Field label="Business Hours">
            <div className="flex items-center gap-2">
              <input type="time" defaultValue="09:00"
                className="flex-1 text-[13px] border border-gray-200 rounded-xl px-3 py-2 outline-none focus:border-[#c40014]" />
              <span className="text-gray-400 text-sm">to</span>
              <input type="time" defaultValue="18:30"
                className="flex-1 text-[13px] border border-gray-200 rounded-xl px-3 py-2 outline-none focus:border-[#c40014]" />
            </div>
          </Field>
        </Section>

        {/* Notification Settings */}
        <Section icon={Bell} title="Notifications">
          <Toggle label="Email Alerts on Hot Leads"    desc="Receive email when Riya captures a hot lead." defaultChecked={true} />
          <Toggle label="Call Transfer Notifications"  desc="Alert when calls are transferred to sales."   defaultChecked={true} />
          <Toggle label="Daily Summary Report"         desc="Automated email every day at 7:00 PM."        defaultChecked={true} />
          <Toggle label="Agent Downtime Alerts"        desc="Notify when Riya goes offline unexpectedly."  defaultChecked={true} />
          <Toggle label="API Key Expiry Warnings"      desc="30-day advance notice before key expiry."     defaultChecked={false} />
        </Section>

        {/* Security */}
        <Section icon={Shield} title="Security & Access">
          <Field label="Session Timeout" hint="Admin session expires after inactivity.">
            <select className="w-full text-[13px] border border-gray-200 rounded-xl px-3 py-2.5 outline-none focus:border-[#c40014] bg-white">
              <option>30 minutes</option>
              <option>1 hour</option>
              <option>4 hours</option>
              <option>8 hours</option>
            </select>
          </Field>
          <Toggle label="Two-Factor Authentication" desc="Require OTP on admin login." defaultChecked={false} />
          <Toggle label="Audit Logging"            desc="Log all configuration changes with timestamps." defaultChecked={true} />
          <div>
            <label className="block text-[12px] font-600 text-gray-600 mb-1.5">Change Admin Password</label>
            <button className="flex items-center gap-1.5 text-[12px] font-600 border border-gray-200 text-gray-600 rounded-xl px-4 py-2 hover:bg-gray-50 transition-all">
              Reset Password <ChevronRight size={13} />
            </button>
          </div>
        </Section>

        {/* Integrations */}
        <Section icon={Webhook} title="Integrations & Webhooks">
          <Field label="CRM Webhook URL" hint="POST lead data to your CRM after each call.">
            <input placeholder="https://crm.yourcompany.com/api/leads"
              className="w-full text-[13px] border border-gray-200 rounded-xl px-3 py-2.5 outline-none focus:border-[#c40014] focus:ring-2 focus:ring-red-100 transition-all" />
          </Field>
          <Field label="Slack Alert Webhook" hint="Receive instant Slack alerts for hot leads.">
            <input placeholder="https://hooks.slack.com/services/…"
              className="w-full text-[13px] border border-gray-200 rounded-xl px-3 py-2.5 outline-none focus:border-[#c40014] focus:ring-2 focus:ring-red-100 transition-all" />
          </Field>
          <Field label="Google Sheets Lead Export" hint="Auto-append leads to a connected Google Sheet.">
            <input placeholder="Google Sheets ID or URL"
              className="w-full text-[13px] border border-gray-200 rounded-xl px-3 py-2.5 outline-none focus:border-[#c40014] focus:ring-2 focus:ring-red-100 transition-all" />
          </Field>
          <Toggle label="Enable Webhook Delivery" desc="Send POST events on every lead capture." defaultChecked={false} />
        </Section>
      </div>

      {/* Data Retention */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <h3 className="flex items-center gap-2 font-700 text-[#1c2434] text-sm mb-5 pb-3 border-b border-gray-100">
          <Database size={16} className="text-[#c40014]" /> Data Retention & Privacy
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Field label="Call Logs Retention">
            <select className="w-full text-[13px] border border-gray-200 rounded-xl px-3 py-2.5 outline-none focus:border-[#c40014] bg-white">
              <option>30 days</option>
              <option>60 days</option>
              <option>90 days</option>
              <option>1 year</option>
            </select>
          </Field>
          <Field label="Lead Data Retention">
            <select className="w-full text-[13px] border border-gray-200 rounded-xl px-3 py-2.5 outline-none focus:border-[#c40014] bg-white">
              <option>6 months</option>
              <option>1 year</option>
              <option>Indefinite</option>
            </select>
          </Field>
          <Field label="Transcript Storage">
            <select className="w-full text-[13px] border border-gray-200 rounded-xl px-3 py-2.5 outline-none focus:border-[#c40014] bg-white">
              <option>Disabled</option>
              <option>30 days</option>
              <option>90 days</option>
            </select>
          </Field>
        </div>
      </div>

      {/* Save Bar */}
      <div className="flex items-center justify-between bg-[#1c2434] rounded-2xl px-6 py-4">
        <div>
          <p className="text-white font-700 text-sm">Save all settings</p>
          <p className="text-white/50 text-[11px] mt-0.5">Changes will apply immediately across the platform.</p>
        </div>
        <button
          onClick={handleSave}
          className="flex items-center gap-2 bg-[#c40014] text-white text-[13px] font-600 px-6 py-2.5 rounded-xl hover:bg-[#a0000f] transition-all shadow-sm"
        >
          <Save size={14} />
          {saved ? 'Settings Saved!' : 'Save Settings'}
        </button>
      </div>
    </div>
  );
}
