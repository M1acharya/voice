// Centralized mock data for the OffiNeeds Voice Assistant Dashboard

export const AGENT_STATUS = {
  ONLINE: 'online',
  OFFLINE: 'offline',
  BUSY: 'busy',
};

export const currentAgent = {
  name: 'Riya',
  status: AGENT_STATUS.ONLINE,
  model: 'GPT-4o',
  stt: 'Sarvam STT v3',
  tts: 'Sarvam Bulbul v3',
  voice: 'Simran',
  language: 'Auto-detect (6 langs)',
  uptime: '4h 37m',
};

export const statsCards = [
  {
    id: 'total-calls',
    label: 'Total Calls Today',
    value: '1,284',
    delta: '+12.4%',
    positive: true,
    icon: 'PhoneCall',
    color: 'blue',
  },
  {
    id: 'active-calls',
    label: 'Active Calls',
    value: '23',
    delta: 'Live now',
    positive: true,
    icon: 'PhoneIncoming',
    color: 'green',
  },
  {
    id: 'active-agents',
    label: 'Active Agents',
    value: '3',
    delta: '1 idle',
    positive: null,
    icon: 'Bot',
    color: 'purple',
  },
  {
    id: 'api-status',
    label: 'API Health',
    value: '99.8%',
    delta: 'All systems normal',
    positive: true,
    icon: 'Activity',
    color: 'red',
  },
  {
    id: 'system-health',
    label: 'System Health',
    value: 'Optimal',
    delta: 'Latency: 142ms',
    positive: true,
    icon: 'ShieldCheck',
    color: 'teal',
  },
  {
    id: 'live-status',
    label: 'Live Status',
    value: 'Operational',
    delta: 'Riya is active',
    positive: true,
    icon: 'Radio',
    color: 'orange',
  },
];

export const recentCalls = [
  { id: 'C-2041', caller: 'Priya Sharma', number: '+91 98765 43210', type: 'Inbound', duration: '3m 42s', status: 'Completed', time: '10:24 AM', intent: 'Corporate Gifting' },
  { id: 'C-2040', caller: 'Rajesh Mehta', number: '+91 91234 56789', type: 'Outbound', duration: '5m 11s', status: 'Transferred', time: '10:17 AM', intent: 'Bulk Order >500' },
  { id: 'C-2039', caller: 'Ananya Rao', number: '+91 87654 32109', type: 'Inbound', duration: '2m 04s', status: 'Completed', time: '10:05 AM', intent: 'Welcome Kits' },
  { id: 'C-2038', caller: 'Vikram Nair', number: '+91 99001 23456', type: 'Outbound', duration: '1m 58s', status: 'No Answer', time: '09:52 AM', intent: 'Follow-up' },
  { id: 'C-2037', caller: 'Deepa Krishnan', number: '+91 88990 11223', type: 'Inbound', duration: '6m 30s', status: 'Completed', time: '09:40 AM', intent: 'Employee Hampers' },
  { id: 'C-2036', caller: 'Arjun Patel', number: '+91 76543 21098', type: 'Inbound', duration: '4m 15s', status: 'Completed', time: '09:28 AM', intent: 'Onboarding Kits' },
];

export const leads = [
  { id: 'L-501', name: 'Priya Sharma', company: 'Infosys Ltd.', email: 'priya.s@infosys.com', phone: '+91 98765 43210', requirement: 'Corporate Gifting – 200 units', status: 'Hot', time: '10:24 AM' },
  { id: 'L-500', name: 'Ananya Rao', company: 'Wipro Bangalore', email: 'ananya.r@wipro.com', phone: '+91 87654 32109', requirement: 'Welcome Kits – 50 units', status: 'Warm', time: '10:05 AM' },
  { id: 'L-499', name: 'Deepa Krishnan', company: 'Capgemini India', email: 'deepa.k@capgemini.com', phone: '+91 88990 11223', requirement: 'Employee Hampers – 150 units', status: 'Hot', time: '09:40 AM' },
  { id: 'L-498', name: 'Arjun Patel', company: 'TCS Pune', email: 'arjun.p@tcs.com', phone: '+91 76543 21098', requirement: 'Onboarding Kits – 80 units', status: 'Warm', time: '09:28 AM' },
  { id: 'L-497', name: 'Suresh Kumar', company: 'HCL Tech', email: 'suresh.k@hcl.com', phone: '+91 95112 34567', requirement: 'Swag Kits – 300 units', status: 'Cold', time: 'Yesterday' },
];

export const callVolumeData = [
  { hour: '6AM', inbound: 4, outbound: 2 },
  { hour: '7AM', inbound: 12, outbound: 5 },
  { hour: '8AM', inbound: 28, outbound: 18 },
  { hour: '9AM', inbound: 65, outbound: 42 },
  { hour: '10AM', inbound: 98, outbound: 74 },
  { hour: '11AM', inbound: 112, outbound: 88 },
  { hour: '12PM', inbound: 86, outbound: 60 },
  { hour: '1PM', inbound: 72, outbound: 54 },
  { hour: '2PM', inbound: 89, outbound: 63 },
  { hour: '3PM', inbound: 104, outbound: 77 },
  { hour: '4PM', inbound: 91, outbound: 68 },
  { hour: '5PM', inbound: 56, outbound: 40 },
];

export const intentData = [
  { name: 'Corporate Gifting', value: 38 },
  { name: 'Welcome Kits', value: 22 },
  { name: 'Employee Hampers', value: 18 },
  { name: 'Onboarding Kits', value: 12 },
  { name: 'Bulk Orders', value: 10 },
];

export const apiKeys = [
  { id: 'key-1', name: 'OpenAI GPT-4o', key: 'sk-proj-••••••••••••••••Xk9L', service: 'LLM', status: 'Active', lastUsed: '2 min ago' },
  { id: 'key-2', name: 'Sarvam AI – STT', key: '••••••••••••••••4mNz', service: 'Speech-to-Text', status: 'Active', lastUsed: '1 min ago' },
  { id: 'key-3', name: 'Sarvam AI – TTS', key: '••••••••••••••••9pKq', service: 'Text-to-Speech', status: 'Active', lastUsed: '1 min ago' },
  { id: 'key-4', name: 'LiveKit Server', key: 'APIKey-••••••••LK3x', service: 'RTC Infrastructure', status: 'Active', lastUsed: '5 min ago' },
];

export const systemPrompt = `You are Riya, a highly professional AI voice assistant from OffiNeeds Corporate Gifting.

PRIMARY OBJECTIVE:
Your ONLY responsibility is to understand the user's gifting requirement, collect lead information naturally, handle objections politely, transfer serious or bulk requests to sales, and keep the conversation short, fast, and human-like.

LANGUAGE:
Automatically switch language based on user input. Supported: English, Kannada, Hindi, Tamil, Telugu, Malayalam.

RULES:
- Maximum 1–2 short sentences per response.
- Never hallucinate or go off-topic.
- Minimum order quantity: 5 units.
- Standard delivery: 6–7 working days.
- For bulk orders (>500 units), transfer to sales immediately.`;
