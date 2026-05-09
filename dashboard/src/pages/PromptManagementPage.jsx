import React, { useState, useEffect } from 'react';
import { Sparkles, Save, RotateCcw, CheckCircle } from 'lucide-react';

export default function PromptManagementPage() {
  const [prompt, setPrompt] = useState("");
  const [endCondition, setEndCondition] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetch('http://localhost:8000/api/config')
      .then(res => res.json())
      .then(data => {
        setPrompt(data.system_prompt || "");
        setEndCondition(data.end_condition || "");
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to load config", err);
        setLoading(false);
      });
  }, []);

  const handleSave = async () => {
    setSaving(true);
    try {
      await fetch('http://localhost:8000/api/config/prompt', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ system_prompt: prompt, end_condition: endCondition })
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
    <div className="page-fade" style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
      
      {/* Editor */}
      <div style={{ flex: '1 1 60%', display: 'flex', flexDirection: 'column', gap: '24px' }}>
        
        <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <h3 style={{ fontSize: '14px', fontWeight: 600, color: '#0f172a', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Sparkles size={16} color="#c40014" /> System Prompt
            </h3>
            <span style={{ fontSize: '12px', color: '#64748b' }}>
              {prompt.trim().split(/\s+/).filter(Boolean).length} words
            </span>
          </div>
          <textarea
            value={prompt}
            onChange={e => setPrompt(e.target.value)}
            className="input-field"
            style={{ minHeight: '250px', fontSize: '13px', fontFamily: 'monospace', background: '#f8fafc' }}
          />
        </div>

        <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <h3 style={{ fontSize: '14px', fontWeight: 600, color: '#0f172a' }}>
            Call End Condition
          </h3>
          <p style={{ fontSize: '12px', color: '#64748b' }}>Define exactly when the agent should terminate the call automatically.</p>
          <textarea
            value={endCondition}
            onChange={e => setEndCondition(e.target.value)}
            className="input-field"
            style={{ minHeight: '80px', fontSize: '13px', background: '#f8fafc' }}
          />
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: '16px' }}>
          {saved && <span style={{ fontSize: '13px', color: '#16a34a', display: 'flex', alignItems: 'center', gap: '4px' }}><CheckCircle size={14}/> Saved to Backend</span>}
          <button className="btn-primary" onClick={handleSave} disabled={saving}>
            <Save size={14} /> {saving ? "Saving..." : "Save Configuration"}
          </button>
        </div>
      </div>

      {/* Info Panel */}
      <div style={{ flex: '1 1 30%', display: 'flex', flexDirection: 'column', gap: '24px' }}>
        <div className="card" style={{ padding: '24px' }}>
          <h4 style={{ fontSize: '14px', fontWeight: 600, color: '#0f172a', marginBottom: '16px' }}>
            Prompt Guidelines
          </h4>
          <ul style={{ display: 'flex', flexDirection: 'column', gap: '12px', listStyle: 'none' }}>
            {['Keep responses to 1–2 sentences maximum.', 'Always address the user\'s latest message.', 'Never hallucinate or fabricate product details.', 'Transfer bulk orders (>500) immediately to sales.'].map((rule, i) => (
              <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '12px', color: '#475569', lineHeight: 1.5 }}>
                <span style={{ marginTop: '6px', width: '4px', height: '4px', borderRadius: '50%', background: '#c40014', flexShrink: 0 }} />
                {rule}
              </li>
            ))}
          </ul>
        </div>
      </div>

    </div>
  );
}
