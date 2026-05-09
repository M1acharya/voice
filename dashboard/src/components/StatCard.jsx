import React from 'react';
import {
  PhoneCall, PhoneIncoming, Bot, Activity,
  ShieldCheck, Radio, TrendingUp, TrendingDown, Minus
} from 'lucide-react';

const ICON_MAP = { PhoneCall, PhoneIncoming, Bot, Activity, ShieldCheck, Radio };

const COLOR_CONFIG = {
  blue:   { bg: '#eff6ff', icon: '#2563eb' },
  green:  { bg: '#f0fdf4', icon: '#16a34a' },
  purple: { bg: '#f5f3ff', icon: '#7c3aed' },
  red:    { bg: '#fff1f2', icon: '#c40014' },
  teal:   { bg: '#f0fdfa', icon: '#0d9488' },
  orange: { bg: '#fff7ed', icon: '#ea580c' },
};

export default function StatCard({ label, value, delta, positive, icon, color }) {
  const Icon = ICON_MAP[icon] || Activity;
  const cfg = COLOR_CONFIG[color] || COLOR_CONFIG.blue;
  const DeltaIcon = positive === true ? TrendingUp : positive === false ? TrendingDown : Minus;
  const deltaColor = positive === true ? '#16a34a' : positive === false ? '#dc2626' : '#6b7280';

  return (
    <div className="card" style={{ padding: '18px 20px' }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 14 }}>
        <div style={{
          width: 40, height: 40, borderRadius: 10,
          background: cfg.bg,
          display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0
        }}>
          <Icon size={18} color={cfg.icon} />
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 4, color: deltaColor }}>
          <DeltaIcon size={12} />
          <span style={{ fontSize: 12, fontWeight: 600 }}>{delta}</span>
        </div>
      </div>
      <p style={{ fontSize: 22, fontWeight: 700, color: '#1c2434', lineHeight: 1, marginBottom: 6 }}>{value}</p>
      <p style={{ fontSize: 12, color: '#6b7280', fontWeight: 500 }}>{label}</p>
    </div>
  );
}
