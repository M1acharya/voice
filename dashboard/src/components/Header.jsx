import React, { useState, useRef, useEffect } from 'react';
import { Menu, Bell, ChevronDown, LogOut, User, Settings, PhoneCall } from 'lucide-react';

const PAGE_TITLES = {
  'dashboard':          'Dashboard',
  'prompt-management':  'Prompt Management',
  'api-keys':           'API Keys',
  'agent-controls':     'Agent Controls',
  'live-calls':         'Live Calls',
  'leads':              'Leads',
  'settings':           'Settings',
};

const notifications = [
  { id: 1, text: 'Call C-2040 transferred to sales team', time: '3 min ago', unread: true },
  { id: 2, text: 'New lead: Priya Sharma (Infosys) – 200 units', time: '6 min ago', unread: true },
  { id: 3, text: 'Agent Riya uptime exceeded 4 hours', time: '22 min ago', unread: false },
  { id: 4, text: 'API Health check passed – All systems normal', time: '1 hr ago', unread: false },
];

export default function Header({ activePage, onMobileMenuOpen }) {
  const [notifOpen, setNotifOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const notifRef = useRef(null);
  const profileRef = useRef(null);

  useEffect(() => {
    function handle(e) {
      if (notifRef.current && !notifRef.current.contains(e.target)) setNotifOpen(false);
      if (profileRef.current && !profileRef.current.contains(e.target)) setProfileOpen(false);
    }
    document.addEventListener('mousedown', handle);
    return () => document.removeEventListener('mousedown', handle);
  }, []);

  const unread = notifications.filter(n => n.unread).length;

  return (
    <header style={{
      position: 'sticky', top: 0, zIndex: 10,
      background: '#fff',
      borderBottom: '1px solid #e5e7eb',
      boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
      height: 58,
      display: 'flex', alignItems: 'center',
      padding: '0 24px', gap: 16
    }}>
      {/* Hamburger */}
      <button onClick={onMobileMenuOpen} className="lg:hidden"
        style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 6, color: '#6b7280', borderRadius: 6 }}>
        <Menu size={20} />
      </button>

      {/* Page Title */}
      <div style={{ flex: 1 }}>
        <p style={{ fontSize: 16, fontWeight: 600, color: '#1c2434', lineHeight: 1.3 }}>
          {PAGE_TITLES[activePage] || 'Dashboard'}
        </p>
        <p style={{ fontSize: 12, color: '#9ca3af', marginTop: 1 }}>
          OffiNeeds Voice Assistant Admin
        </p>
      </div>

      {/* Right Controls */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>

        {/* Live Pill */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: 6,
          background: '#f0fdf4', border: '1px solid #bbf7d0',
          borderRadius: 20, padding: '5px 12px'
        }} className="hidden sm:flex">
          <span style={{
            width: 7, height: 7, borderRadius: '50%',
            background: '#22c55e', flexShrink: 0
          }} className="live-pulse" />
          <span style={{ fontSize: 12, fontWeight: 600, color: '#15803d' }}>Riya Live</span>
        </div>

        {/* Notifications */}
        <div ref={notifRef} style={{ position: 'relative' }}>
          <button
            onClick={() => setNotifOpen(v => !v)}
            style={{
              position: 'relative', background: 'none', border: 'none',
              cursor: 'pointer', padding: 8, borderRadius: 8, color: '#6b7280',
              display: 'flex', alignItems: 'center'
            }}
          >
            <Bell size={18} />
            {unread > 0 && (
              <span style={{
                position: 'absolute', top: 4, right: 4,
                width: 16, height: 16, background: '#c40014',
                color: '#fff', fontSize: 10, fontWeight: 700,
                borderRadius: '50%',
                display: 'flex', alignItems: 'center', justifyContent: 'center'
              }}>{unread}</span>
            )}
          </button>

          {notifOpen && (
            <div style={{
              position: 'absolute', right: 0, top: 44,
              width: 320, background: '#fff',
              borderRadius: 12, boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
              border: '1px solid #e5e7eb', overflow: 'hidden', zIndex: 100
            }}>
              <div style={{ padding: '12px 16px', borderBottom: '1px solid #e5e7eb', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <p style={{ fontSize: 14, fontWeight: 600, color: '#1c2434' }}>Notifications</p>
                <span style={{ fontSize: 11, fontWeight: 600, background: '#c40014', color: '#fff', padding: '2px 8px', borderRadius: 10 }}>{unread} new</span>
              </div>
              {notifications.map(n => (
                <div key={n.id} style={{
                  display: 'flex', gap: 12, padding: '11px 16px',
                  borderBottom: '1px solid #f3f4f6',
                  background: n.unread ? '#fff9f9' : '#fff'
                }}>
                  <span style={{ width: 7, height: 7, borderRadius: '50%', background: n.unread ? '#c40014' : '#d1d5db', flexShrink: 0, marginTop: 5 }} />
                  <div>
                    <p style={{ fontSize: 13, color: '#374151', fontWeight: n.unread ? 500 : 400, lineHeight: 1.4 }}>{n.text}</p>
                    <p style={{ fontSize: 11, color: '#9ca3af', marginTop: 3 }}>{n.time}</p>
                  </div>
                </div>
              ))}
              <div style={{ padding: '10px 16px', textAlign: 'center' }}>
                <button style={{ fontSize: 12, color: '#c40014', fontWeight: 600, background: 'none', border: 'none', cursor: 'pointer' }}>
                  View all notifications
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Profile */}
        <div ref={profileRef} style={{ position: 'relative' }}>
          <button onClick={() => setProfileOpen(v => !v)} style={{
            display: 'flex', alignItems: 'center', gap: 8,
            background: 'none', border: 'none', cursor: 'pointer',
            padding: '4px 8px', borderRadius: 8
          }}>
            <div style={{
              width: 32, height: 32, borderRadius: '50%',
              background: 'linear-gradient(135deg, #c40014, #ff4d60)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 13, fontWeight: 700, color: '#fff', flexShrink: 0
            }}>A</div>
            <div className="hidden sm:block" style={{ textAlign: 'left' }}>
              <p style={{ fontSize: 13, fontWeight: 600, color: '#1c2434', lineHeight: 1.3 }}>Admin</p>
              <p style={{ fontSize: 11, color: '#9ca3af' }}>Super Admin</p>
            </div>
            <ChevronDown size={14} color="#9ca3af" />
          </button>

          {profileOpen && (
            <div style={{
              position: 'absolute', right: 0, top: 44,
              width: 200, background: '#fff',
              borderRadius: 12, boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
              border: '1px solid #e5e7eb', overflow: 'hidden', zIndex: 100
            }}>
              <div style={{ padding: '12px 16px', borderBottom: '1px solid #e5e7eb' }}>
                <p style={{ fontSize: 14, fontWeight: 600, color: '#1c2434' }}>Admin User</p>
                <p style={{ fontSize: 12, color: '#6b7280', marginTop: 2 }}>admin@offineeds.com</p>
              </div>
              {[
                { icon: User, label: 'My Profile' },
                { icon: Settings, label: 'Settings' },
                { icon: PhoneCall, label: 'Agent Logs' },
              ].map(({ icon: Icon, label }) => (
                <button key={label} style={{
                  width: '100%', display: 'flex', alignItems: 'center', gap: 10,
                  padding: '9px 16px', fontSize: 13, color: '#374151', fontWeight: 400,
                  background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left'
                }}
                onMouseEnter={e => e.currentTarget.style.background = '#f9fafb'}
                onMouseLeave={e => e.currentTarget.style.background = 'none'}>
                  <Icon size={14} color="#9ca3af" /> {label}
                </button>
              ))}
              <div style={{ borderTop: '1px solid #e5e7eb' }}>
                <button style={{
                  width: '100%', display: 'flex', alignItems: 'center', gap: 10,
                  padding: '9px 16px', fontSize: 13, color: '#b91c1c', fontWeight: 500,
                  background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left'
                }}
                onMouseEnter={e => e.currentTarget.style.background = '#fff9f9'}
                onMouseLeave={e => e.currentTarget.style.background = 'none'}>
                  <LogOut size={14} /> Sign Out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
