import React, { useState } from 'react';
import { Sparkles, Save, RotateCcw } from 'lucide-react';
import { systemPrompt } from '../data/mockData';

export default function PromptManagementPage() {
  const [prompt, setPrompt] = useState(systemPrompt);

  return (
    <div className="page-fade" style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
      
      {/* Editor */}
      <div className="card" style={{ flex: '1 1 60%', display: 'flex', flexDirection: 'column', gap: '16px' }}>
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
          style={{ minHeight: '400px', fontSize: '13px', fontFamily: 'monospace', background: '#f8fafc' }}
        />

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '8px' }}>
          <button className="btn-secondary" onClick={() => setPrompt(systemPrompt)}>
            <RotateCcw size={14} /> Reset
          </button>
          <button className="btn-primary">
            <Save size={14} /> Save Prompt
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
            {[
              'Keep responses to 1–2 sentences maximum.',
              'Always address the user\'s latest message.',
              'Never hallucinate or fabricate product details.',
              'Transfer bulk orders (>500) immediately to sales.',
            ].map((rule, i) => (
              <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '12px', color: '#475569', lineHeight: 1.5 }}>
                <span style={{ marginTop: '6px', width: '4px', height: '4px', borderRadius: '50%', background: '#c40014', flexShrink: 0 }} />
                {rule}
              </li>
            ))}
          </ul>
        </div>

        <div className="card" style={{ background: '#0f172a', borderColor: '#0f172a', color: '#fff' }}>
          <h4 style={{ fontSize: '14px', fontWeight: 600, marginBottom: '16px' }}>Variables</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {[
              ['{customer_name}', 'Caller name'],
              ['{query}', 'Pre-collected requirement'],
              ['{quantity}', 'Units mentioned'],
              ['{source}', 'Call direction'],
            ].map(([key, desc]) => (
              <div key={key} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '12px' }}>
                <code style={{ color: '#f87171', fontFamily: 'monospace' }}>{key}</code>
                <span style={{ color: '#94a3b8' }}>{desc}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
}
