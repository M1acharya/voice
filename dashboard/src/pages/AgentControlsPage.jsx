import React, { useState } from 'react';
import { currentAgent } from '../data/mockData';
import { Bot, Power, RefreshCw, Volume2, Mic, Brain, Languages, Save } from 'lucide-react';
import clsx from 'clsx';

const VOICES = ['Simran', 'Meera', 'Arjun', 'Ananya', 'Rahul'];
const MODELS = ['gpt-4o', 'gpt-4o-mini', 'gpt-3.5-turbo'];
const LANGUAGES = ['Auto-detect', 'English', 'Kannada', 'Hindi', 'Tamil', 'Telugu', 'Malayalam'];

export default function AgentControlsPage() {
  const [agentOn, setAgentOn] = useState(true);
  const [voice, setVoice] = useState('Simran');
  const [model, setModel] = useState('gpt-4o');
  const [language, setLanguage] = useState('Auto-detect');
  const [pace, setPace] = useState(1.05);
  const [interruptions, setInterruptions] = useState(true);
  const [saved, setSaved] = useState(false);

  return (
    <div className="page-fade space-y-6">

      {/* Agent Power Control */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className={clsx('w-14 h-14 rounded-2xl flex items-center justify-center shadow-inner',
              agentOn ? 'bg-green-50' : 'bg-gray-100')}>
              <Bot size={26} className={agentOn ? 'text-green-600' : 'text-gray-400'} />
            </div>
            <div>
              <h3 className="font-700 text-[#1c2434] text-base">Agent: Riya</h3>
              <p className={clsx('text-[12px] font-600 mt-0.5', agentOn ? 'text-green-600' : 'text-gray-400')}>
                {agentOn ? '● Online – Accepting Calls' : '○ Offline – Not Accepting Calls'}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => {}} // would trigger restart
              className="flex items-center gap-1.5 text-[12px] border border-gray-200 text-gray-600 rounded-xl px-4 py-2 hover:bg-gray-50 transition-all font-600"
            >
              <RefreshCw size={13} /> Restart Agent
            </button>
            <button
              onClick={() => setAgentOn(v => !v)}
              className={clsx(
                'flex items-center gap-1.5 text-[12px] font-600 rounded-xl px-4 py-2 transition-all shadow-sm',
                agentOn
                  ? 'bg-[#c40014] text-white hover:bg-[#a0000f]'
                  : 'bg-green-600 text-white hover:bg-green-700'
              )}
            >
              <Power size={13} />
              {agentOn ? 'Stop Agent' : 'Start Agent'}
            </button>
          </div>
        </div>

        {/* Status Row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6">
          {[
            { label: 'LLM Model',   value: model,              icon: Brain },
            { label: 'STT Engine',  value: 'Sarvam v3',        icon: Mic },
            { label: 'TTS Voice',   value: voice,              icon: Volume2 },
            { label: 'Language',    value: language,           icon: Languages },
          ].map(({ label, value, icon: Icon }) => (
            <div key={label} className="bg-gray-50 rounded-xl p-3">
              <div className="flex items-center gap-1.5 text-[10px] text-gray-500 font-600 uppercase tracking-wide mb-1">
                <Icon size={11} /> {label}
              </div>
              <p className="text-[13px] font-700 text-[#1c2434] truncate">{value}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Configuration */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">

        {/* Voice & LLM Settings */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 space-y-5">
          <h3 className="font-700 text-[#1c2434] text-sm border-b border-gray-100 pb-3">Voice & LLM Configuration</h3>

          {/* LLM Model */}
          <div>
            <label className="block text-[12px] font-600 text-gray-600 mb-2">LLM Model</label>
            <div className="flex flex-wrap gap-2">
              {MODELS.map(m => (
                <button key={m} onClick={() => setModel(m)}
                  className={clsx('text-[12px] font-600 px-3 py-1.5 rounded-xl border transition-all',
                    model === m ? 'bg-[#c40014] text-white border-[#c40014]' : 'border-gray-200 text-gray-600 hover:border-gray-300'
                  )}>
                  {m}
                </button>
              ))}
            </div>
          </div>

          {/* TTS Voice */}
          <div>
            <label className="block text-[12px] font-600 text-gray-600 mb-2">TTS Voice Speaker</label>
            <div className="flex flex-wrap gap-2">
              {VOICES.map(v => (
                <button key={v} onClick={() => setVoice(v)}
                  className={clsx('text-[12px] font-600 px-3 py-1.5 rounded-xl border transition-all',
                    voice === v ? 'bg-[#c40014] text-white border-[#c40014]' : 'border-gray-200 text-gray-600 hover:border-gray-300'
                  )}>
                  {v}
                </button>
              ))}
            </div>
          </div>

          {/* Pace */}
          <div>
            <label className="block text-[12px] font-600 text-gray-600 mb-2">
              Speech Pace: <span className="text-[#c40014]">{pace.toFixed(2)}x</span>
            </label>
            <input type="range" min={0.7} max={1.5} step={0.05} value={pace}
              onChange={e => setPace(parseFloat(e.target.value))}
              className="w-full accent-[#c40014]"
            />
            <div className="flex justify-between text-[10px] text-gray-400 mt-1">
              <span>0.7x Slow</span><span>1.0x Normal</span><span>1.5x Fast</span>
            </div>
          </div>
        </div>

        {/* Behavior Settings */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 space-y-5">
          <h3 className="font-700 text-[#1c2434] text-sm border-b border-gray-100 pb-3">Behaviour Settings</h3>

          {/* Language */}
          <div>
            <label className="block text-[12px] font-600 text-gray-600 mb-2">Language Mode</label>
            <select value={language} onChange={e => setLanguage(e.target.value)}
              className="w-full text-[13px] border border-gray-200 rounded-xl px-3 py-2.5 outline-none focus:border-[#c40014] focus:ring-2 focus:ring-red-100 transition-all bg-white">
              {LANGUAGES.map(l => <option key={l}>{l}</option>)}
            </select>
          </div>

          {/* Toggle settings */}
          {[
            { id: 'interruptions', label: 'Allow Call Interruptions',  desc: 'Agent pauses when caller speaks.',      val: interruptions, set: setInterruptions },
          ].map(({ id, label, desc, val, set }) => (
            <div key={id} className="flex items-center justify-between gap-3 py-2 border-b border-gray-50 last:border-0">
              <div>
                <p className="text-[13px] font-600 text-gray-800">{label}</p>
                <p className="text-[11px] text-gray-400 mt-0.5">{desc}</p>
              </div>
              <label className="toggle-switch flex-shrink-0">
                <input type="checkbox" checked={val} onChange={e => set(e.target.checked)} />
                <span className="toggle-slider" />
              </label>
            </div>
          ))}

          {/* Endpointing */}
          <div>
            <label className="block text-[12px] font-600 text-gray-600 mb-2">
              Min Endpointing Delay: <span className="text-[#c40014]">80ms</span>
            </label>
            <input type="range" min={50} max={500} step={10} defaultValue={80}
              className="w-full accent-[#c40014]"
            />
            <div className="flex justify-between text-[10px] text-gray-400 mt-1">
              <span>50ms</span><span>Optimal: 80ms</span><span>500ms</span>
            </div>
          </div>
        </div>
      </div>

      {/* Save */}
      <div className="flex justify-end">
        <button
          onClick={() => { setSaved(true); setTimeout(() => setSaved(false), 2000); }}
          className="flex items-center gap-2 bg-[#c40014] text-white text-[13px] font-600 px-6 py-2.5 rounded-xl hover:bg-[#a0000f] transition-all shadow-sm"
        >
          <Save size={14} />
          {saved ? 'Configuration Saved!' : 'Save Configuration'}
        </button>
      </div>
    </div>
  );
}
