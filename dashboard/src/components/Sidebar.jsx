import React, { useState } from 'react';
import {
  LayoutDashboard, MessageSquare, Key, Bot, PhoneCall,
  Users, Settings, X, ChevronDown, ChevronRight
} from 'lucide-react';

const MENU_GROUPS = [
  {
    id: 'grp-dashboard',
    label: 'Dashboard',
    icon: LayoutDashboard,
    items: [
      { id: 'dashboard',  label: 'Overview' },
      { id: 'live-calls', label: 'Live Calls' },
      { id: 'leads',      label: 'Leads' },
    ]
  },
  {
    id: 'grp-agent',
    label: 'Agent Setup',
    icon: Bot,
    items: [
      { id: 'prompt-management', label: 'Prompt Management' },
      { id: 'agent-controls',    label: 'Agent Controls' },
    ]
  },
  {
    id: 'grp-system',
    label: 'System',
    icon: Settings,
    items: [
      { id: 'api-keys', label: 'API Keys' },
      { id: 'settings', label: 'Settings' },
    ]
  }
];

export default function Sidebar({ activePage, onNavigate, isMobileOpen, onMobileClose, isCollapsed }) {
  // Keep all groups expanded by default
  const [expanded, setExpanded] = useState({
    'grp-dashboard': true,
    'grp-agent': true,
    'grp-system': true
  });

  const toggleGroup = (id) => {
    setExpanded(prev => ({ ...prev, [id]: !prev[id] }));
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
        transition: 'transform 0.3s ease',
      }}
      className={`
        ${isMobileOpen ? 'translate-x-0' : 'max-lg:-translate-x-full'}
        ${isCollapsed ? 'lg:-translate-x-full' : 'lg:translate-x-0'}
      `}
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
        <nav className="sidebar-scroll" style={{ flex: 1, overflowY: 'auto', padding: '20px 12px', minHeight: 0 }}>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {MENU_GROUPS.map(group => {
              const isExpanded = expanded[group.id];
              
              return (
                <div key={group.id}>
                  {/* Parent Item */}
                  <button
                    onClick={() => toggleGroup(group.id)}
                    style={{
                      width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                      background: 'none', border: 'none', padding: '6px 8px', cursor: 'pointer',
                      color: 'rgba(255,255,255,0.8)', transition: '0.2s'
                    }}
                    onMouseEnter={e => e.currentTarget.style.color = '#fff'}
                    onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.8)'}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'inherit' }}>
                      <group.icon size={16} />
                      <span style={{ fontSize: '13px', fontWeight: 600, color: 'inherit' }}>{group.label}</span>
                    </div>
                    {isExpanded ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                  </button>

                  {/* Sub Items with Vertical Line */}
                  {isExpanded && (
                    <div style={{
                      marginTop: '6px',
                      marginLeft: '15px',          // Aligns line under the icon center
                      paddingLeft: '14px',         // Space between line and text
                      borderLeft: '1px solid rgba(255,255,255,0.15)',
                      display: 'flex', flexDirection: 'column', gap: '2px'
                    }}>
                      {group.items.map(item => {
                        const isActive = activePage === item.id;
                        return (
                          <button
                            key={item.id}
                            onClick={() => { onNavigate(item.id); onMobileClose?.(); }}
                            style={{
                              width: '100%', textAlign: 'left',
                              padding: '8px 12px', borderRadius: '6px',
                              background: isActive ? '#c40014' : 'transparent',
                              color: isActive ? '#fff' : 'rgba(255,255,255,0.55)',
                              border: 'none', cursor: 'pointer',
                              fontSize: '13px', fontWeight: isActive ? 600 : 500,
                              transition: 'all 0.15s ease',
                              position: 'relative'
                            }}
                            onMouseEnter={e => {
                              if (!isActive) {
                                e.currentTarget.style.color = '#fff';
                                e.currentTarget.style.background = 'rgba(255,255,255,0.06)';
                              }
                            }}
                            onMouseLeave={e => {
                              if (!isActive) {
                                e.currentTarget.style.color = 'rgba(255,255,255,0.55)';
                                e.currentTarget.style.background = 'transparent';
                              }
                            }}
                          >
                            {/* Little horizontal notch pointing to active item */}
                            {isActive && (
                              <span style={{
                                position: 'absolute', left: '-15px', top: '50%',
                                transform: 'translateY(-50%)',
                                width: '15px', height: '1px',
                                background: '#c40014'
                              }} />
                            )}
                            {item.label}
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
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
