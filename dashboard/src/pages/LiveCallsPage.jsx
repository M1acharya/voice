import React, { useState, useEffect } from 'react';
import { Phone, Clock, User, PhoneOff, Mic, Volume2 } from 'lucide-react';
import clsx from 'clsx';

const LIVE_CALLS_MOCK = [
  { id: 'LC-001', caller: 'Neha Gupta', number: '+91 97654 32100', type: 'Inbound', duration: 0, intent: 'Employee Hampers – 100 units', city: 'Bangalore', status: 'active' },
  { id: 'LC-002', caller: 'Suresh Verma', number: '+91 86543 21099', type: 'Outbound', duration: 0, intent: 'Follow-up: Welcome Kits', city: 'Mumbai', status: 'active' },
  { id: 'LC-003', caller: 'Pooja Iyer', number: '+91 75432 10988', type: 'Inbound', duration: 0, intent: 'Corporate Gifting – Budget Query', city: 'Hyderabad', status: 'hold' },
];

function useLiveDurations(calls) {
  const [durations, setDurations] = useState(calls.map((_, i) => 60 + i * 45));
  useEffect(() => {
    const timer = setInterval(() => {
      setDurations(d => d.map(t => t + 1));
    }, 1000);
    return () => clearInterval(timer);
  }, []);
  return durations;
}

function fmtDuration(secs) {
  const m = Math.floor(secs / 60).toString().padStart(2, '0');
  const s = (secs % 60).toString().padStart(2, '0');
  return `${m}:${s}`;
}

export default function LiveCallsPage() {
  const [calls, setCalls] = useState(LIVE_CALLS_MOCK);
  const durations = useLiveDurations(calls);

  return (
    <div className="page-fade space-y-6">

      {/* Summary */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: 'Active Calls', value: calls.filter(c => c.status === 'active').length, color: 'text-green-600', bg: 'bg-green-50' },
          { label: 'On Hold',      value: calls.filter(c => c.status === 'hold').length,   color: 'text-amber-600',  bg: 'bg-amber-50' },
          { label: 'Total Live',   value: calls.length,                                    color: 'text-[#c40014]',  bg: 'bg-red-50' },
        ].map(({ label, value, color, bg }) => (
          <div key={label} className={clsx('rounded-2xl p-4 text-center shadow-sm border border-white', bg)}>
            <p className={clsx('text-2xl font-800', color)}>{value}</p>
            <p className="text-[11px] text-gray-600 font-600 mt-0.5">{label}</p>
          </div>
        ))}
      </div>

      {/* Live Call Cards */}
      <div className="space-y-3">
        {calls.map((call, idx) => (
          <div key={call.id} className={clsx(
            'bg-white rounded-2xl shadow-sm border p-5 transition-all',
            call.status === 'active' ? 'border-green-200' : 'border-amber-200'
          )}>
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div className="flex items-center gap-4">
                <div className={clsx('w-11 h-11 rounded-xl flex items-center justify-center',
                  call.status === 'active' ? 'bg-green-50' : 'bg-amber-50')}>
                  {call.status === 'active'
                    ? <Mic size={18} className="text-green-600 animate-pulse" />
                    : <Phone size={18} className="text-amber-600" />
                  }
                </div>
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <p className="font-700 text-[#1c2434] text-sm">{call.caller}</p>
                    <span className="text-[10px] font-600 text-gray-500">{call.id}</span>
                    <span className={clsx('text-[10px] font-600 px-2 py-0.5 rounded-full',
                      call.type === 'Inbound' ? 'bg-blue-50 text-blue-700' : 'bg-purple-50 text-purple-700'
                    )}>{call.type}</span>
                    <span className={clsx('text-[10px] font-600 px-2 py-0.5 rounded-full',
                      call.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'
                    )}>
                      {call.status === 'active' ? '● Live' : '⏸ On Hold'}
                    </span>
                  </div>
                  <p className="text-[12px] text-gray-500 mt-0.5">{call.number} · {call.city}</p>
                  <p className="text-[12px] text-gray-600 mt-1 font-500">{call.intent}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 self-start sm:self-center">
                <div className="text-center">
                  <p className="text-[18px] font-800 text-[#1c2434] font-mono tabular-nums">{fmtDuration(durations[idx])}</p>
                  <p className="text-[10px] text-gray-400">Duration</p>
                </div>
                <button className="p-2 rounded-xl bg-red-50 text-[#c40014] hover:bg-red-100 transition-colors" title="End call">
                  <PhoneOff size={16} />
                </button>
              </div>
            </div>

            {/* Audio waveform placeholder */}
            {call.status === 'active' && (
              <div className="mt-3 flex items-center gap-0.5 h-6">
                {Array.from({ length: 40 }).map((_, i) => (
                  <div key={i}
                    className="w-1 bg-[#c40014] rounded-full opacity-60"
                    style={{
                      height: `${Math.random() * 80 + 10}%`,
                      animationDelay: `${i * 40}ms`,
                    }}
                  />
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {calls.length === 0 && (
        <div className="text-center py-20 text-gray-400">
          <Phone size={40} className="mx-auto mb-3 opacity-30" />
          <p className="font-600">No active calls right now</p>
          <p className="text-[12px] mt-1">Riya is standing by to handle incoming calls</p>
        </div>
      )}
    </div>
  );
}
