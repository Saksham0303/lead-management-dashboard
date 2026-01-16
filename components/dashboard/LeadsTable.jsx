'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

const statusColors = {
  new: 'bg-blue-500/20 text-blue-200 border-blue-500/30',
  contacted: 'bg-yellow-500/20 text-yellow-200 border-yellow-500/30',
  qualified: 'bg-orange-500/20 text-orange-200 border-orange-500/30',
  converted: 'bg-green-500/20 text-green-200 border-green-500/30',
};

const statusLabels = {
  new: 'New',
  contacted: 'Contacted',
  qualified: 'Qualified',
  converted: 'Converted',
};

export default function LeadsTable({ leads }) {
  const router = useRouter();
  const [hoveredRow, setHoveredRow] = useState(null);

  const handleRowClick = (leadId) => {
    router.push(`/leads/${leadId}`);
  };

  if (leads.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-slate-300">No leads found matching your criteria.</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-white/10 bg-white/5">
            <th className="text-left p-4 text-sm font-semibold text-slate-300">Name</th>
            <th className="text-left p-4 text-sm font-semibold text-slate-300">Email</th>
            <th className="text-left p-4 text-sm font-semibold text-slate-300">Company</th>
            <th className="text-left p-4 text-sm font-semibold text-slate-300">Status</th>
          </tr>
        </thead>
        <tbody>
          {leads.map((lead, idx) => (
            <tr
              key={lead._id || idx}
              onClick={() => handleRowClick(lead._id)}
              onMouseEnter={() => setHoveredRow(idx)}
              onMouseLeave={() => setHoveredRow(null)}
              className={`border-b border-white/5 cursor-pointer transition-all duration-300 ${
                hoveredRow === idx ? 'bg-gradient-to-r from-purple-500/10 to-pink-500/10 scale-[1.01]' : ''
              }`}
            >
              <td className="p-4">
                <span className={`font-medium text-white transition-all duration-300 ${
                  hoveredRow === idx ? 'translate-x-2' : ''
                } inline-block`}>
                  {lead.name}
                </span>
              </td>
              <td className="p-4 text-slate-300">{lead.email}</td>
              <td className="p-4 text-slate-300">{lead.company || '-'}</td>
              <td className="p-4">
                <span className={`px-3 py-1 rounded-full text-xs font-medium border transition-all duration-300 inline-block ${
                  statusColors[lead.status]
                } ${hoveredRow === idx ? 'scale-110 shadow-lg' : ''}`}>
                  {statusLabels[lead.status]}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
