import React from 'react';
import {
  PhoneCall, PhoneIncoming, Bot, Activity,
  ShieldCheck, Radio, TrendingUp, TrendingDown, Minus
} from 'lucide-react';

const ICON_MAP = { PhoneCall, PhoneIncoming, Bot, Activity, ShieldCheck, Radio };

export default function StatCard({ label, value, delta, positive, icon }) {
  const Icon = ICON_MAP[icon] || Activity;

  // Render neutral state if positive is null/offline
  const deltaColor = positive === true ? '#16a34a' : positive === false ? '#dc2626' : '#64748b';
  const DeltaIcon = positive === true ? TrendingUp : positive === false ? TrendingDown : Minus;

  return (
    <div className="card" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
        <div>
          <p style={{ fontSize: '14px', fontWeight: 500, color: '#64748b', marginBottom: '8px' }}>
            {label}
          </p>
          <p style={{ fontSize: '28px', fontWeight: 600, color: '#0f172a', lineHeight: 1 }}>
            {value}
          </p>
        </div>
        <div style={{ padding: '8px', background: '#f8fafc', borderRadius: '8px' }}>
          <Icon size={20} color="#64748b" />
        </div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: 'auto' }}>
        <DeltaIcon size={14} color={deltaColor} />
        <span style={{ fontSize: '12px', color: deltaColor, fontWeight: 500 }}>
          {delta}
        </span>
      </div>
    </div>
  );
}
