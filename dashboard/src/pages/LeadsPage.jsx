import React, { useState } from 'react';
import { leads } from '../data/mockData';
import { Search, Download, Filter, Mail, Phone, Building2, ArrowUpRight } from 'lucide-react';
import clsx from 'clsx';

const STATUS_STYLES = {
  Hot:  'bg-red-100 text-red-700',
  Warm: 'bg-amber-100 text-amber-700',
  Cold: 'bg-blue-100 text-blue-700',
};

export default function LeadsPage() {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('All');

  const filtered = leads.filter(l => {
    const matchSearch = l.name.toLowerCase().includes(search.toLowerCase()) ||
      l.company.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === 'All' || l.status === filter;
    return matchSearch && matchFilter;
  });

  return (
    <div className="page-fade space-y-6">

      {/* Summary Badges */}
      <div className="flex flex-wrap gap-3">
        {['All', 'Hot', 'Warm', 'Cold'].map(s => (
          <button key={s} onClick={() => setFilter(s)}
            className={clsx('text-[12px] font-600 px-4 py-1.5 rounded-full border transition-all',
              filter === s
                ? 'bg-[#c40014] text-white border-[#c40014]'
                : 'border-gray-200 text-gray-600 hover:border-gray-300 bg-white'
            )}>
            {s} {s === 'All' ? `(${leads.length})` :
              `(${leads.filter(l => l.status === s).length})`}
          </button>
        ))}
      </div>

      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="relative w-full sm:w-72">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search by name or company…"
            className="w-full text-[13px] border border-gray-200 rounded-xl pl-9 pr-4 py-2.5 outline-none focus:border-[#c40014] focus:ring-2 focus:ring-red-100 transition-all"
          />
        </div>
        <button className="flex items-center gap-1.5 text-[12px] font-600 border border-gray-200 text-gray-600 rounded-xl px-4 py-2.5 hover:bg-gray-50 transition-all">
          <Download size={13} /> Export CSV
        </button>
      </div>

      {/* Leads Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 text-[11px] text-gray-500 font-600 uppercase tracking-wide">
                <th className="text-left px-5 py-3">Lead</th>
                <th className="text-left px-4 py-3 hidden md:table-cell">Company</th>
                <th className="text-left px-4 py-3 hidden lg:table-cell">Contact</th>
                <th className="text-left px-4 py-3 hidden xl:table-cell">Requirement</th>
                <th className="text-left px-4 py-3">Status</th>
                <th className="text-left px-4 py-3 hidden sm:table-cell">Time</th>
                <th className="text-left px-4 py-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(lead => (
                <tr key={lead.id} className="border-t border-gray-50 hover:bg-gray-50/60 transition-colors">
                  <td className="px-5 py-4">
                    <p className="font-700 text-gray-800 text-[13px]">{lead.name}</p>
                    <p className="text-[10px] text-[#c40014] font-600 mt-0.5">{lead.id}</p>
                  </td>
                  <td className="px-4 py-4 hidden md:table-cell">
                    <span className="flex items-center gap-1.5 text-[12px] text-gray-600 font-500">
                      <Building2 size={13} className="text-gray-400" /> {lead.company}
                    </span>
                  </td>
                  <td className="px-4 py-4 hidden lg:table-cell">
                    <p className="flex items-center gap-1.5 text-[11px] text-gray-600 mb-0.5">
                      <Mail size={11} className="text-gray-400" /> {lead.email}
                    </p>
                    <p className="flex items-center gap-1.5 text-[11px] text-gray-600">
                      <Phone size={11} className="text-gray-400" /> {lead.phone}
                    </p>
                  </td>
                  <td className="px-4 py-4 text-[12px] text-gray-600 hidden xl:table-cell">{lead.requirement}</td>
                  <td className="px-4 py-4">
                    <span className={clsx('text-[11px] font-700 px-2.5 py-1 rounded-full', STATUS_STYLES[lead.status])}>
                      {lead.status}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-[12px] text-gray-400 hidden sm:table-cell">{lead.time}</td>
                  <td className="px-4 py-4">
                    <button className="text-[11px] font-600 text-[#c40014] hover:underline flex items-center gap-0.5">
                      View <ArrowUpRight size={11} />
                    </button>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={7} className="text-center py-12 text-gray-400 text-[13px]">
                    No leads match your search.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
