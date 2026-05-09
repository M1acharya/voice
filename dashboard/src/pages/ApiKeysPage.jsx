import React, { useState, useEffect } from 'react';
import { Key, Save, CheckCircle } from 'lucide-react';

export default function ApiKeysPage() {
  const [keys, setKeys] = useState({ openai: '', livekit: '', sarvam: '' });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetch('http://localhost:8000/api/config')
      .then(res => res.json())
      .then(data => {
        if (data.api_keys) setKeys(data.api_keys);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const handleSave = async () => {
    setSaving(true);
    try {
      await fetch('http://localhost:8000/api/config/apikeys', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(keys)
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
      
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <p style={{ fontSize: '14px', color: '#64748b' }}>
          Manage API credentials. These keys are securely passed to the backend agent.
        </p>
      </div>

      <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        
        <div>
          <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#475569', marginBottom: '8px' }}>OpenAI API Key</label>
          <input 
            type="password" 
            className="input-field" 
            value={keys.openai} 
            onChange={e => setKeys({...keys, openai: e.target.value})} 
            placeholder="sk-..." 
          />
        </div>

        <div>
          <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#475569', marginBottom: '8px' }}>LiveKit API Key</label>
          <input 
            type="password" 
            className="input-field" 
            value={keys.livekit} 
            onChange={e => setKeys({...keys, livekit: e.target.value})} 
            placeholder="API..." 
          />
        </div>

        <div>
          <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#475569', marginBottom: '8px' }}>Sarvam AI API Key (STT/TTS)</label>
          <input 
            type="password" 
            className="input-field" 
            value={keys.sarvam} 
            onChange={e => setKeys({...keys, sarvam: e.target.value})} 
          />
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: '16px', marginTop: '12px' }}>
          {saved && <span style={{ fontSize: '13px', color: '#16a34a', display: 'flex', alignItems: 'center', gap: '4px' }}><CheckCircle size={14}/> Saved to Backend</span>}
          <button className="btn-primary" onClick={handleSave} disabled={saving}>
            <Save size={14} /> {saving ? "Saving..." : "Update Keys"}
          </button>
        </div>

      </div>

      <div className="card" style={{ background: '#f8fafc', border: '1px dashed #cbd5e1' }}>
        <p style={{ fontSize: '14px', fontWeight: 600, color: '#0f172a', marginBottom: '4px' }}>Security Best Practices</p>
        <p style={{ fontSize: '12px', color: '#64748b' }}>Keys are updated dynamically on the backend. No restart required.</p>
      </div>

    </div>
  );
}
