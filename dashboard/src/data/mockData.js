// Production data store (Ready for API integration)

export const AGENT_STATUS = {
  ONLINE: 'online',
  OFFLINE: 'offline',
  BUSY: 'busy',
};

export const currentAgent = {
  name: 'Riya',
  status: AGENT_STATUS.OFFLINE,
  model: 'GPT-4o',
  stt: 'Sarvam STT v3',
  tts: 'Sarvam Bulbul v3',
  voice: 'Simran',
  language: 'Auto-detect',
  uptime: '0h 0m',
};

export const statsCards = [
  { id: 'total-calls',   label: 'Total Calls Today', value: '0', delta: '0%', positive: null, icon: 'PhoneCall', color: 'blue' },
  { id: 'active-calls',  label: 'Active Calls',      value: '0', delta: 'None', positive: null, icon: 'PhoneIncoming', color: 'green' },
  { id: 'active-agents', label: 'Active Agents',     value: '0', delta: 'Offline', positive: null, icon: 'Bot', color: 'purple' },
  { id: 'api-status',    label: 'API Health',        value: '100%', delta: 'Normal', positive: true, icon: 'Activity', color: 'red' },
  { id: 'system-health', label: 'System Health',     value: 'Optimal', delta: 'Latency: --', positive: true, icon: 'ShieldCheck', color: 'teal' },
  { id: 'live-status',   label: 'Live Status',       value: 'Standby', delta: 'Ready', positive: true, icon: 'Radio', color: 'orange' },
];

export const recentCalls = [];
export const leads = [];

export const callVolumeData = [
  { hour: '6AM', inbound: 0, outbound: 0 },
  { hour: '9AM', inbound: 0, outbound: 0 },
  { hour: '12PM', inbound: 0, outbound: 0 },
  { hour: '3PM', inbound: 0, outbound: 0 },
  { hour: '6PM', inbound: 0, outbound: 0 },
];

export const intentData = [];

export const apiKeys = [];

export const systemPrompt = `You are Riya, a highly professional AI voice assistant from OffiNeeds Corporate Gifting.

PRIMARY OBJECTIVE:
Your ONLY responsibility is to understand the user's gifting requirement, collect lead information naturally, handle objections politely, transfer serious or bulk requests to sales, and keep the conversation short, fast, and human-like.

LANGUAGE:
Automatically switch language based on user input. Supported: English, Kannada, Hindi, Tamil, Telugu, Malayalam.`;
