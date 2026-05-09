import React from 'react';
import {
  LayoutDashboard, MessageSquare, Key, Bot, PhoneCall,
  Users, Settings, X
} from 'lucide-react';

const NAV_ITEMS = [
  { id: 'dashboard',          label: 'Dashboard',         icon: LayoutDashboard },
  { id: 'prompt-management',  label: 'Prompt Management', icon: MessageSquare },
  { id: 'api-keys',           label: 'API Keys',          icon: Key },
  { id: 'agent-controls',     label: 'Agent Controls',    icon: Bot },
  { id: 'live-calls',         label: 'Live Calls',        icon: PhoneCall },
];

const BOTTOM_NAV = [
  { id: 'leads',    label: 'Leads',    icon: Users },
  { id: 'settings', label: 'Settings', icon: Settings },
];

export default function Sidebar({ activePage, onNavigate, isMobileOpen, onMobileClose }) {
  const NavItem = ({ id, label, icon: Icon }) => {
    const active = activePage === id;
    return (
      <li>
        <button
          onClick={() => { onNavigate(id); onMobileClose?.(); }}
          className={`sidebar-nav-item${active ? ' active' : ''}`}
        >
          <Icon size={16} style={{ flexShrink: 0 }} />
          <span style={{ flex: 1 }}>{label}</span>
        </button>
      </li>
    );
  };

  return (
    <>
      {/* Mobile backdrop */}
      {isMobileOpen && (
        <div
          onClick={onMobileClose}
          style={{
            position: 'fixed', inset: 0,
            background: 'rgba(0,0,0,0.45)', zIndex: 20
          }}
          className="lg:hidden"
        />
      )}

      <aside style={{
        position: 'fixed', top: 0, left: 0,
        width: 240, height: '100vh',
        background: '#1c2434',
        display: 'flex', flexDirection: 'column',
        zIndex: 30,
        transform: isMobileOpen ? 'translateX(0)' : undefined,
        transition: 'transform 0.25s ease',
      }}
      className={isMobileOpen ? '' : 'max-lg:-translate-x-full'}
      >
        {/* Logo */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '18px 16px 16px',
          borderBottom: '1px solid rgba(255,255,255,0.08)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{
              width: 32, height: 32, borderRadius: 8,
              background: '#c40014',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              flexShrink: 0
            }}>
              <PhoneCall size={15} color="#fff" />
            </div>
            <div>
              <p style={{ fontSize: 14, fontWeight: 700, color: '#fff', lineHeight: 1.2 }}>OffiNeeds</p>
              <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.45)', fontWeight: 400, marginTop: 2 }}>Voice Assistant</p>
            </div>
          </div>
          <button onClick={onMobileClose} className="lg:hidden"
            style={{ color: 'rgba(255,255,255,0.5)', background: 'none', border: 'none', cursor: 'pointer', padding: 4 }}>
            <X size={16} />
          </button>
        </div>

        {/* Navigation */}
        <nav style={{ flex: 1, overflowY: 'auto', padding: '12px 10px' }}>
          <p style={{ fontSize: 10, fontWeight: 600, color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase', letterSpacing: '0.08em', padding: '4px 8px 8px' }}>
            Main Menu
          </p>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 2 }}>
            {NAV_ITEMS.map(item => <NavItem key={item.id} {...item} />)}
          </ul>

          <p style={{ fontSize: 10, fontWeight: 600, color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase', letterSpacing: '0.08em', padding: '20px 8px 8px' }}>
            Management
          </p>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 2 }}>
            {BOTTOM_NAV.map(item => <NavItem key={item.id} {...item} />)}
          </ul>
        </nav>

        {/* Agent Status Footer */}
        <div style={{
          padding: '12px 10px 16px',
          borderTop: '1px solid rgba(255,255,255,0.08)'
        }}>
          <div style={{
            display: 'flex', alignItems: 'center', gap: 10,
            background: 'rgba(255,255,255,0.06)',
            borderRadius: 10, padding: '10px 12px'
          }}>
            <div style={{ position: 'relative', flexShrink: 0 }}>
              <div style={{
                width: 32, height: 32, borderRadius: '50%',
                background: 'linear-gradient(135deg, #c40014, #ff4d60)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 13, fontWeight: 700, color: '#fff'
              }}>R</div>
              <span style={{
                position: 'absolute', bottom: -1, right: -1,
                width: 9, height: 9, background: '#22c55e',
                borderRadius: '50%', border: '2px solid #1c2434'
              }} />
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <p style={{ fontSize: 13, fontWeight: 600, color: '#fff', lineHeight: 1.3 }}>Riya</p>
              <p style={{ fontSize: 11, color: '#22c55e', fontWeight: 500, marginTop: 1 }}>Online · GPT-4o</p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
