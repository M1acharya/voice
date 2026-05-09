import React, { useState } from 'react';
import { systemPrompt } from '../data/mockData';
import { Save, RotateCcw, Sparkles, Info } from 'lucide-react';

export default function PromptManagementPage() {
  const [prompt, setPrompt] = useState(systemPrompt);
  const [saved, setSaved] = useState(false);
  const wordCount = prompt.trim().split(/\s+/).filter(Boolean).length;

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="page-fade space-y-6">
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        {/* Editor */}
        <div className="xl:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-700 text-[#1c2434] text-sm flex items-center gap-2">
                <Sparkles size={16} className="text-[#c40014]" />
                System Prompt — Riya
              </h3>
              <p className="text-[11px] text-gray-400 mt-0.5">
                This is the core instruction set sent to the LLM for every call.
              </p>
            </div>
            <span className="text-[11px] text-gray-400 font-500">{wordCount} words</span>
          </div>

          <textarea
            value={prompt}
            onChange={e => setPrompt(e.target.value)}
            rows={20}
            className="w-full text-[13px] text-gray-700 bg-gray-50 border border-gray-200 rounded-xl p-4 resize-y outline-none focus:border-[#c40014] focus:ring-2 focus:ring-red-100 transition-all font-mono leading-relaxed"
          />

          <div className="flex items-center justify-between mt-4 flex-wrap gap-3">
            <button
              onClick={() => setPrompt(systemPrompt)}
              className="flex items-center gap-2 text-[12px] text-gray-500 hover:text-gray-700 font-600 border border-gray-200 rounded-xl px-4 py-2 hover:bg-gray-50 transition-all"
            >
              <RotateCcw size={13} />
              Reset to Default
            </button>
            <button
              onClick={handleSave}
              className="flex items-center gap-2 text-[12px] text-white bg-[#c40014] hover:bg-[#a0000f] rounded-xl px-5 py-2 font-600 transition-all shadow-sm"
            >
              <Save size={13} />
              {saved ? 'Saved!' : 'Save Prompt'}
            </button>
          </div>
        </div>

        {/* Prompt Info Panel */}
        <div className="space-y-4">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
            <h4 className="font-700 text-[#1c2434] text-sm mb-3 flex items-center gap-2">
              <Info size={15} className="text-[#c40014]" /> Prompt Guidelines
            </h4>
            <ul className="space-y-2.5 text-[12px] text-gray-600">
              {[
                'Keep responses to 1–2 sentences maximum.',
                'Always address the user\'s latest message.',
                'Never hallucinate or fabricate product details.',
                'Maintain a professional, human-like tone.',
                'Language must follow user\'s language automatically.',
                'Transfer bulk orders (>500) immediately to sales.',
                'Do not repeat greetings after the call starts.',
              ].map(rule => (
                <li key={rule} className="flex items-start gap-2">
                  <span className="mt-1 w-1.5 h-1.5 rounded-full bg-[#c40014] flex-shrink-0" />
                  {rule}
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-[#1c2434] rounded-2xl p-5 text-white">
            <h4 className="font-700 text-sm mb-3">Prompt Variables</h4>
            <ul className="space-y-2 text-[12px]">
              {[
                ['{customer_name}', 'Caller\'s full name'],
                ['{query}',         'Pre-collected requirement'],
                ['{quantity}',      'Units mentioned'],
                ['{source}',        'inbound-call / outbound-call'],
              ].map(([key, desc]) => (
                <li key={key} className="flex items-start justify-between gap-2">
                  <code className="text-[#ff6b6b] font-600 font-mono">{key}</code>
                  <span className="text-white/60 text-right">{desc}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4">
            <p className="text-[11px] text-amber-800 font-600 mb-1">⚠ Changes apply to new calls only</p>
            <p className="text-[11px] text-amber-700">
              Existing active calls will not be interrupted. The updated prompt takes effect for all sessions started after saving.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
