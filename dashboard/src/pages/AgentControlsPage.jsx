import React, { useState } from 'react';
import { Bot, Power, RefreshCw, Volume2, Mic, Brain, Languages, Save } from 'lucide-react';

const VOICES = ['Simran', 'Meera', 'Arjun', 'Ananya', 'Rahul'];
const MODELS = ['gpt-4o', 'gpt-4o-mini', 'gpt-3.5-turbo'];
const LANGUAGES = ['Auto-detect', 'English', 'Kannada', 'Hindi', 'Tamil', 'Telugu', 'Malayalam'];

export default function AgentControlsPage() {
  const [agentOn, setAgentOn] = useState(false);
  const [voice, setVoice] = useState('Simran');
  const [model, setModel] = useState('gpt-4o');
  const [language, setLanguage] = useState('Auto-detect');
  const [pace, setPace] = useState(1.05);

  return (
    <div className="page-fade" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>

      {/* Header Card */}
      <div className="card" style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ 
            width: '56px', height: '56px', borderRadius: '12px', 
            background: agentOn ? '#dcfce7' : '#f1f5f9', 
            display: 'flex', alignItems: 'center', justifyContent: 'center' 
          }}>
            <Bot size={28} color={agentOn ? '#16a34a' : '#64748b'} />
          </div>
          <div>
            <h3 style={{ fontSize: '16px', fontWeight: 600, color: '#0f172a' }}>Agent: Riya</h3>
            <p style={{ fontSize: '12px', fontWeight: 500, color: agentOn ? '#16a34a' : '#64748b', marginTop: '4px' }}>
              {agentOn ? '● Online – Active' : '○ Offline – Stopped'}
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '12px' }}>
          <button className="btn-secondary">
            <RefreshCw size={14} /> Restart
          </button>
          <button 
            onClick={() => setAgentOn(!agentOn)}
            className="btn-primary" 
            style={{ background: agentOn ? '#16a34a' : '#c40014' }}
          >
            <Power size={14} /> {agentOn ? 'Stop Agent' : 'Start Agent'}
          </button>
        </div>
      </div>

      {/* Config Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
        
        {/* Model & Voice */}
        <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <h4 style={{ fontSize: '14px', fontWeight: 600, color: '#0f172a', borderBottom: '1px solid #e2e8f0', paddingBottom: '16px' }}>
            Model Configuration
          </h4>
          
          <div>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#475569', marginBottom: '12px' }}>LLM Model</label>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {MODELS.map(m => (
                <button key={m} onClick={() => setModel(m)} style={{
                  fontSize: '12px', padding: '8px 16px', borderRadius: '6px',
                  background: model === m ? '#c40014' : '#fff',
                  color: model === m ? '#fff' : '#475569',
                  border: model === m ? '1px solid #c40014' : '1px solid #e2e8f0',
                  cursor: 'pointer'
                }}>
                  {m}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#475569', marginBottom: '12px' }}>TTS Voice</label>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {VOICES.map(v => (
                <button key={v} onClick={() => setVoice(v)} style={{
                  fontSize: '12px', padding: '8px 16px', borderRadius: '6px',
                  background: voice === v ? '#c40014' : '#fff',
                  color: voice === v ? '#fff' : '#475569',
                  border: voice === v ? '1px solid #c40014' : '1px solid #e2e8f0',
                  cursor: 'pointer'
                }}>
                  {v}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Behavior */}
        <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <h4 style={{ fontSize: '14px', fontWeight: 600, color: '#0f172a', borderBottom: '1px solid #e2e8f0', paddingBottom: '16px' }}>
            Behavior Settings
          </h4>

          <div>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#475569', marginBottom: '12px' }}>Language</label>
            <select className="input-field" value={language} onChange={e => setLanguage(e.target.value)}>
              {LANGUAGES.map(l => <option key={l}>{l}</option>)}
            </select>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#475569', marginBottom: '12px' }}>
              Speech Pace: <span style={{ color: '#c40014' }}>{pace.toFixed(2)}x</span>
            </label>
            <input type="range" min="0.8" max="1.5" step="0.05" value={pace} onChange={e => setPace(Number(e.target.value))} style={{ width: '100%', accentColor: '#c40014' }} />
          </div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '16px', borderTop: '1px solid #e2e8f0' }}>
            <div>
              <p style={{ fontSize: '14px', fontWeight: 500, color: '#0f172a' }}>Allow Interruptions</p>
              <p style={{ fontSize: '12px', color: '#64748b', marginTop: '4px' }}>Agent stops speaking when user talks.</p>
            </div>
            <label className="toggle-switch">
              <input type="checkbox" defaultChecked />
              <span className="toggle-slider" />
            </label>
          </div>
        </div>

      </div>

      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <button className="btn-primary">
          <Save size={14} /> Save Configuration
        </button>
      </div>

    </div>
  );
}
