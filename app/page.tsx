'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';


type Lead = {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  status: 'new' | 'contacted' | 'qualified' | 'converted';
};

type Analytics = {
  total: number;
  converted: number;
  newLeads: number;
  contacted: number;
  qualified: number;
  conversionRate: number;
};

type StatusType = 'new' | 'contacted' | 'qualified' | 'converted';

function AnalyticsCard({ icon: Icon, label, value }: { icon: any; label: string; value: number | string }) {
  return (
    <div className="group relative backdrop-blur-sm bg-gradient-to-br from-slate-800/90 to-slate-900/90 rounded-2xl border border-amber-500/20 p-6 shadow-2xl hover:shadow-amber-500/20 hover:border-amber-500/40 transition-all duration-500 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 via-transparent to-amber-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      
      <div className="relative z-10 flex items-center justify-between">
        <div>
          <p className="text-sm text-slate-400 mb-2 font-medium tracking-wide uppercase group-hover:text-amber-300 transition-colors duration-300">{label}</p>
          <p className="text-4xl font-bold bg-gradient-to-r from-white via-amber-50 to-amber-100 bg-clip-text text-transparent group-hover:scale-105 transition-transform duration-300 inline-block">{value}</p>
        </div>
        <div className="p-4 bg-gradient-to-br from-amber-500 to-amber-600 rounded-xl shadow-lg shadow-amber-500/50 group-hover:shadow-amber-500/80 group-hover:scale-110 transition-all duration-500">
          <Icon className="w-7 h-7 text-white" />
        </div>
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-amber-500 to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700"></div>
    </div>
  );
}

function LeadsTable({ leads }: { leads: Lead[] }) {
  const [hoveredRow, setHoveredRow] = useState<number | null>(null);

  if (leads.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="text-slate-400 text-lg">No leads found matching your criteria.</p>
      </div>
    );
  }

  const statusColors: Record<StatusType, string> = {
    new: 'bg-blue-500/10 text-blue-300 border border-blue-400/30 shadow-sm shadow-blue-500/20',
    contacted: 'bg-amber-500/10 text-amber-300 border border-amber-400/30 shadow-sm shadow-amber-500/20',
    qualified: 'bg-emerald-500/10 text-emerald-300 border border-emerald-400/30 shadow-sm shadow-emerald-500/20',
    converted: 'bg-violet-500/10 text-violet-300 border border-violet-400/30 shadow-sm shadow-violet-500/20',
  };

  const statusLabels: Record<StatusType, string> = {
    new: 'New',
    contacted: 'Contacted',
    qualified: 'Qualified',
    converted: 'Converted',
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-slate-700/50 bg-slate-800/30">
            <th className="text-left p-5 text-sm font-semibold text-amber-400 uppercase tracking-wider">Name</th>
            <th className="text-left p-5 text-sm font-semibold text-amber-400 uppercase tracking-wider">Email</th>
            <th className="text-left p-5 text-sm font-semibold text-amber-400 uppercase tracking-wider">Company</th>
            <th className="text-left p-5 text-sm font-semibold text-amber-400 uppercase tracking-wider">Status</th>
          </tr>
        </thead>
        <tbody>
          {leads.map((lead, idx) => (
            <tr
              key={lead._id || idx}
              onMouseEnter={() => setHoveredRow(idx)}
              onMouseLeave={() => setHoveredRow(null)}
              className={`border-b border-slate-700/30 cursor-pointer transition-all duration-300 ${
                hoveredRow === idx 
                  ? 'bg-gradient-to-r from-amber-500/5 via-amber-500/10 to-transparent shadow-lg shadow-amber-500/5' 
                  : 'hover:bg-slate-800/30'
              }`}
            >
              <td className="p-5">
                <span className={`font-semibold text-slate-100 transition-all duration-300 ${
                  hoveredRow === idx ? 'translate-x-2 text-amber-100' : ''
                } inline-block`}>
                  {lead.name}
                </span>
              </td>
              <td className="p-5 text-slate-300 font-medium">{lead.email}</td>
              <td className="p-5 text-slate-300 font-medium">{lead.company || '-'}</td>
              <td className="p-5">
                <span className={`px-4 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-wide transition-all duration-300 inline-block ${
                  statusColors[lead.status]
                } ${hoveredRow === idx ? 'scale-105 shadow-md' : ''}`}>
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

const ITEMS_PER_PAGE = 6;
const API_URL = process.env.NEXT_PUBLIC_API_URL;


function Users({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
    </svg>
  );
}

function TrendingUp({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
    </svg>
  );
}

function UserPlus({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
    </svg>
  );
}

function Search({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
  );
}

function ChevronLeft({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
    </svg>
  );
}

function ChevronRight({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
    </svg>
  );
}

function ChevronDown({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
    </svg>
  );
}

export default function DashboardPage() {
  const router = useRouter();
  useEffect(() => {
    const isLoggedIn = sessionStorage.getItem('loggedIn');
  
    if (!isLoggedIn) {
      router.replace('/login');
    }
  }, [router]);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalLeads, setTotalLeads] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [mounted, setMounted] = useState<boolean>(false);
  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  const [analytics, setAnalytics] = useState<Analytics>({
    total: 0,
    converted: 0,
    newLeads: 0,
    contacted: 0,
    qualified: 0,
    conversionRate: 0,
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const fetchLeads = async () => {
      setLoading(true);
      try {
        const params = new URLSearchParams({
          page: currentPage.toString(),
          limit: ITEMS_PER_PAGE.toString(),
          search: searchTerm,
          status: statusFilter,
        });

        const res = await fetch(`${API_URL}/api/leads?${params}`);
        const data = await res.json();

        setLeads(data.leads);
        setTotalLeads(data.totalLeads);
        setTotalPages(data.totalPages);
      } catch (err) {
        console.error('Failed to fetch leads', err);
      } finally {
        setLoading(false);
      }
    };

    fetchLeads();
  }, [searchTerm, statusFilter, currentPage]);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const res = await fetch(`${API_URL}/api/leads/analytics`);
        const data = await res.json();
        setAnalytics(data);
      } catch (err) {
        console.error('Failed to fetch analytics', err);
      }
    };

    fetchAnalytics();
  }, []);

  const handleSearch = (value: string) => {
    setSearchTerm(value);
    setCurrentPage(1);
  };

  const handleStatusFilter = (value: string) => {
    setStatusFilter(value);
    setCurrentPage(1);
    setShowDropdown(false);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage((p) => p - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage((p) => p + 1);
  };

  const statusOptions = [
    { value: 'all', label: 'All Status' },
    { value: 'new', label: 'New' },
    { value: 'contacted', label: 'Contacted' },
    { value: 'qualified', label: 'Qualified' },
    { value: 'converted', label: 'Converted' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-amber-500/10 rounded-full mix-blend-overlay filter blur-3xl opacity-30 animate-blob"></div>
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-amber-600/10 rounded-full mix-blend-overlay filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-slate-700/20 rounded-full mix-blend-overlay filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
      </div>

      <div className="fixed inset-0 pointer-events-none opacity-5" 
           style={{
             backgroundImage: `linear-gradient(rgba(251, 191, 36, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(251, 191, 36, 0.1) 1px, transparent 1px)`,
             backgroundSize: '50px 50px'
           }}>
      </div>

      <div className={`relative max-w-7xl mx-auto px-6 py-10 transition-all duration-1000 ${
        mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      }`}>
       <div className="mb-10 flex items-start justify-between gap-4">
  <div>
    <h1 className="text-5xl font-bold mb-3 bg-gradient-to-r from-amber-200 via-amber-400 to-amber-200 bg-clip-text text-transparent tracking-tight">
      Lead Management Dashboard
    </h1>
    <p className="text-slate-400 text-lg font-light">
      Track and manage your sales leads with precision
    </p>
  </div>

  <button
    onClick={() => router.push('/login')}
    className="h-11 px-6 rounded-xl bg-amber-500 text-slate-900 font-semibold hover:bg-amber-400 transition-all shadow-lg shadow-amber-500/30"
  >
    Logout
  </button>
</div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {[
            { icon: Users, label: 'Total Leads', value: analytics.total, delay: '100' },
            { icon: TrendingUp, label: 'Converted', value: analytics.converted, delay: '200' },
            { icon: UserPlus, label: 'New Leads', value: analytics.newLeads, delay: '300' },
            { icon: TrendingUp, label: 'Conversion Rate', value: `${analytics.conversionRate}%`, delay: '400' },
          ].map((card, idx) => (
            <div
              key={idx}
              className={`transition-all duration-700 ${
                mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
              style={{ transitionDelay: `${card.delay}ms` }}
            >
              <AnalyticsCard icon={card.icon} label={card.label} value={card.value} />
            </div>
          ))}
        </div>

        <div className={`backdrop-blur-md bg-slate-900/60 rounded-3xl border border-amber-500/20 shadow-2xl shadow-amber-500/10 overflow-hidden transition-all duration-700 ${
          mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`} style={{ transitionDelay: '500ms' }}>
          <div className="p-7 border-b border-slate-700/50 bg-gradient-to-r from-slate-800/40 to-slate-900/40">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-amber-400/70 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search leads..."
                  value={searchTerm}
                  onChange={(e) => handleSearch(e.target.value)}
                  className="w-full pl-12 h-12 bg-slate-800/50 border border-slate-700/50 text-slate-100 placeholder-slate-500 focus:bg-slate-800/70 focus:border-amber-500/50 focus:ring-2 focus:ring-amber-500/20 focus:outline-none transition-all duration-300 rounded-xl"
                />
              </div>
              <div className="relative w-full sm:w-52">
                <button
                  onClick={() => setShowDropdown(!showDropdown)}
                  className="w-full h-12 px-4 bg-slate-800/50 border border-slate-700/50 text-slate-100 focus:bg-slate-800/70 focus:border-amber-500/50 focus:ring-2 focus:ring-amber-500/20 focus:outline-none transition-all duration-300 rounded-xl flex items-center justify-between"
                >
                  <span>{statusOptions.find(opt => opt.value === statusFilter)?.label}</span>
                  <ChevronDown className="w-4 h-4" />
                </button>
                {showDropdown && (
                  <div className="absolute top-full mt-2 w-full bg-slate-800 border border-slate-700 rounded-xl shadow-xl z-10">
                    {statusOptions.map(option => (
                      <button
                        key={option.value}
                        onClick={() => handleStatusFilter(option.value)}
                        className="w-full px-4 py-2.5 text-left text-slate-100 hover:bg-slate-700 hover:text-amber-300 transition-colors first:rounded-t-xl last:rounded-b-xl"
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {loading ? (
            <div className="p-16 text-center">
              <div className="inline-block w-14 h-14 border-4 border-amber-500 border-t-transparent rounded-full animate-spin"></div>
              <p className="text-slate-400 mt-5 text-lg font-light">Loading leads...</p>
            </div>
          ) : (
            <LeadsTable leads={leads} />
          )}

          {totalLeads > 0 && (
            <div className="p-7 border-t border-slate-700/50 bg-gradient-to-r from-slate-800/20 to-slate-900/20">
              <div className="flex items-center justify-between">
                <p className="text-sm text-slate-400 font-medium">
                  Showing <span className="text-amber-400 font-semibold">{(currentPage - 1) * ITEMS_PER_PAGE + 1}</span> to{' '}
                  <span className="text-amber-400 font-semibold">{Math.min(currentPage * ITEMS_PER_PAGE, totalLeads)}</span> of{' '}
                  <span className="text-amber-400 font-semibold">{totalLeads}</span> results
                </p>
                <div className="flex gap-3">
                  <button
                    onClick={handlePreviousPage}
                    disabled={currentPage === 1}
                    className="h-10 px-5 bg-slate-800/50 border border-slate-700/50 text-slate-100 hover:bg-slate-800 hover:border-amber-500/50 hover:text-amber-300 disabled:opacity-40 disabled:hover:bg-slate-800/50 disabled:hover:border-slate-700/50 disabled:cursor-not-allowed transition-all duration-300 rounded-lg font-medium flex items-center"
                  >
                    <ChevronLeft className="w-4 h-4 mr-1" />
                    Previous
                  </button>
                  <button
                    onClick={handleNextPage}
                    disabled={currentPage >= totalPages}
                    className="h-10 px-5 bg-slate-800/50 border border-slate-700/50 text-slate-100 hover:bg-slate-800 hover:border-amber-500/50 hover:text-amber-300 disabled:opacity-40 disabled:hover:bg-slate-800/50 disabled:hover:border-slate-700/50 disabled:cursor-not-allowed transition-all duration-300 rounded-lg font-medium flex items-center"
                  >
                    Next
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <style>{`
        @keyframes blob {
          0%, 100% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(40px, -60px) scale(1.15);
          }
          66% {
            transform: translate(-30px, 30px) scale(0.95);
          }
        }
        .animate-blob {
          animation: blob 8s infinite ease-in-out;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }
        .animate-spin {
          animation: spin 1s linear infinite;
        }
      `}</style>
    </div>
  );
}