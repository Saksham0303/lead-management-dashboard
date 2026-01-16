export const mockLeads = [
  {
    id: '1',
    name: 'Sarah Johnson',
    email: 'sarah.johnson@techcorp.com',
    company: 'TechCorp Inc',
    status: 'new',
    phone: '+1 (555) 123-4567',
    source: 'Website',
    createdAt: '2024-01-15',
    notes: 'Interested in enterprise plan. Follow up next week.',
    budget: '$50,000',
    industry: 'Technology'
  },
  {
    id: '2',
    name: 'Michael Chen',
    email: 'michael.chen@innovate.com',
    company: 'Innovate Solutions',
    status: 'contacted',
    phone: '+1 (555) 234-5678',
    source: 'LinkedIn',
    createdAt: '2024-01-14',
    notes: 'Demo scheduled for next Tuesday.',
    budget: '$75,000',
    industry: 'Software'
  },
  {
    id: '3',
    name: 'Emily Rodriguez',
    email: 'emily.r@marketpro.com',
    company: 'MarketPro',
    status: 'converted',
    phone: '+1 (555) 345-6789',
    source: 'Referral',
    createdAt: '2024-01-13',
    notes: 'Signed contract for annual subscription.',
    budget: '$100,000',
    industry: 'Marketing'
  },
  {
    id: '4',
    name: 'David Kim',
    email: 'david.kim@designstudio.com',
    company: 'Design Studio',
    status: 'qualified',
    phone: '+1 (555) 456-7890',
    source: 'Website',
    createdAt: '2024-01-12',
    notes: 'Very interested. Waiting for budget approval.',
    budget: '$30,000',
    industry: 'Design'
  },
  {
    id: '5',
    name: 'Jennifer Martinez',
    email: 'j.martinez@globaltech.com',
    company: 'Global Tech',
    status: 'new',
    phone: '+1 (555) 567-8901',
    source: 'Cold Outreach',
    createdAt: '2024-01-11',
    notes: 'Initial contact made. Need to send proposal.',
    budget: '$60,000',
    industry: 'Technology'
  },
  {
    id: '6',
    name: 'Robert Taylor',
    email: 'robert.t@financeplus.com',
    company: 'Finance Plus',
    status: 'contacted',
    phone: '+1 (555) 678-9012',
    source: 'Trade Show',
    createdAt: '2024-01-10',
    notes: 'Discussed pricing options. Following up this week.',
    budget: '$120,000',
    industry: 'Finance'
  },
  {
    id: '7',
    name: 'Amanda Wilson',
    email: 'a.wilson@healthsys.com',
    company: 'HealthSys',
    status: 'qualified',
    phone: '+1 (555) 789-0123',
    source: 'Website',
    createdAt: '2024-01-09',
    notes: 'Ready to move forward. Waiting for legal review.',
    budget: '$85,000',
    industry: 'Healthcare'
  },
  {
    id: '8',
    name: 'James Brown',
    email: 'james.brown@retailco.com',
    company: 'RetailCo',
    status: 'converted',
    phone: '+1 (555) 890-1234',
    source: 'Referral',
    createdAt: '2024-01-08',
    notes: 'Successfully onboarded. Training scheduled.',
    budget: '$45,000',
    industry: 'Retail'
  },
  {
    id: '9',
    name: 'Lisa Anderson',
    email: 'lisa.a@edutech.com',
    company: 'EduTech',
    status: 'new',
    phone: '+1 (555) 901-2345',
    source: 'LinkedIn',
    createdAt: '2024-01-07',
    notes: 'Exploring options for online platform.',
    budget: '$40,000',
    industry: 'Education'
  },
  {
    id: '10',
    name: 'Christopher Lee',
    email: 'chris.lee@logistics.com',
    company: 'Logistics Pro',
    status: 'contacted',
    phone: '+1 (555) 012-3456',
    source: 'Cold Outreach',
    createdAt: '2024-01-06',
    notes: 'Sent detailed proposal. Awaiting feedback.',
    budget: '$95,000',
    industry: 'Logistics'
  }
];

export const getLeadById = (id) => {
  return mockLeads.find(lead => lead.id === id);
};

export const getAnalytics = () => {
  const total = mockLeads.length;
  const converted = mockLeads.filter(lead => lead.status === 'converted').length;
  const newLeads = mockLeads.filter(lead => lead.status === 'new').length;

  return {
    total,
    converted,
    newLeads,
    conversionRate: total > 0 ? Math.round((converted / total) * 100) : 0
  };
};

export const filterLeads = (leads, searchTerm, statusFilter) => {
  return leads.filter(lead => {
    const matchesSearch = searchTerm === '' ||
      lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.company.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === 'all' || lead.status === statusFilter;

    return matchesSearch && matchesStatus;
  });
};
