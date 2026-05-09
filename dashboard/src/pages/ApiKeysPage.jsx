import React, { useState } from 'react';
import { apiKeys } from '../data/mockData';
import { Eye, EyeOff, Plus, Trash2, RefreshCw, Copy, Check } from 'lucide-react';
import clsx from 'clsx';

export default function ApiKeysPage() {
  const [keys, setKeys] = useState(apiKeys);
  const [revealed, setRevealed] = useState({});
  const [copied, setCopied] = useState(null);

  const toggleReveal = (id) => setRevealed(r => ({ ...r, [id]: !r[id] }));

  const copyKey = (id, key) => {
    navigator.clipboard.writeText(key).catch(() => {});
    setCopied(id);
    setTimeout(() => setCopied(null), 1800);
  };

  return (
    <div className="page-fade space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-[12px] text-gray-500">
            Manage API credentials for LLM, STT, TTS, and infrastructure services.
          </p>
        </div>
        <button className="flex items-center gap-2 bg-[#c40014] text-white text-[12px] font-600 px-4 py-2 rounded-xl hover:bg-[#a0000f] transition-all shadow-sm">
          <Plus size={14} />
          Add New Key
        </button>
      </div>

      {/* Keys Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="px-5 py-4 border-b border-gray-100">
          <h3 className="font-700 text-[#1c2434] text-sm">Active API Keys</h3>
          <p className="text-[11px] text-gray-400 mt-0.5">All keys are encrypted at rest. Rotate regularly for security.</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 text-[11px] text-gray-500 font-600 uppercase tracking-wide">
                <th className="text-left px-5 py-3">Service</th>
                <th className="text-left px-4 py-3">API Key</th>
                <th className="text-left px-4 py-3 hidden md:table-cell">Category</th>
                <th className="text-left px-4 py-3 hidden lg:table-cell">Last Used</th>
                <th className="text-left px-4 py-3">Status</th>
                <th className="text-left px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {keys.map((k) => (
                <tr key={k.id} className="border-t border-gray-50 hover:bg-gray-50/60 transition-colors">
                  <td className="px-5 py-4">
                    <p className="font-600 text-gray-800 text-[13px]">{k.name}</p>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-2">
                      <code className="text-[12px] text-gray-700 font-mono bg-gray-100 px-2 py-1 rounded-lg">
                        {revealed[k.id] ? k.key : k.key.replace(/[^•]/g, '•').slice(0, 20) + '…'}
                      </code>
                      <button onClick={() => toggleReveal(k.id)} className="text-gray-400 hover:text-gray-600 transition-colors">
                        {revealed[k.id] ? <EyeOff size={14} /> : <Eye size={14} />}
                      </button>
                      <button onClick={() => copyKey(k.id, k.key)} className="text-gray-400 hover:text-[#c40014] transition-colors">
                        {copied === k.id ? <Check size={14} className="text-green-500" /> : <Copy size={14} />}
                      </button>
                    </div>
                  </td>
                  <td className="px-4 py-4 hidden md:table-cell">
                    <span className="text-[11px] font-600 bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full">{k.service}</span>
                  </td>
                  <td className="px-4 py-4 text-[12px] text-gray-500 hidden lg:table-cell">{k.lastUsed}</td>
                  <td className="px-4 py-4">
                    <span className="flex items-center gap-1.5 text-[11px] font-600 text-green-700">
                      <span className="w-1.5 h-1.5 bg-green-500 rounded-full" />
                      {k.status}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-2">
                      <button className="p-1.5 rounded-lg text-gray-400 hover:bg-blue-50 hover:text-blue-600 transition-colors" title="Rotate">
                        <RefreshCw size={14} />
                      </button>
                      <button className="p-1.5 rounded-lg text-gray-400 hover:bg-red-50 hover:text-[#c40014] transition-colors" title="Delete">
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Security Notice */}
      <div className="bg-[#1c2434] rounded-2xl p-5 flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <div className="flex-1">
          <p className="text-white font-700 text-sm mb-1">Security Best Practices</p>
          <p className="text-white/60 text-[12px]">
            Rotate API keys every 90 days. Never share keys in logs or commits. Use environment variables in production.
          </p>
        </div>
        <button className="text-[12px] font-600 text-white border border-white/20 rounded-xl px-4 py-2 hover:bg-white/10 transition-all flex-shrink-0">
          View Security Docs
        </button>
      </div>
    </div>
  );
}
