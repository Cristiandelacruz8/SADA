export interface User {
  id: string;
  name: string;
  role: string;
  avatar: string;
  status: 'online' | 'offline' | 'away';
}

export interface Case {
  id: string;
  clientName: string;
  tier: string;
  lastInteraction: string;
  value: number;
  growth: string;
  status: 'OPEN' | 'PENDING' | 'RESOLVED' | 'AT RISK';
  riskProfile: 'Low' | 'Moderate' | 'High';
  exposure: number;
  slaCountdown: string;
}

export interface Message {
  id: string;
  sender: string;
  content: string;
  timestamp: string;
  channel: 'SMS' | 'WhatsApp' | 'Email' | 'Voice' | 'Internal';
  isAgent: boolean;
}

export interface Conversation {
  id: string;
  participant: string;
  participantRole: string;
  lastMessage: string;
  timestamp: string;
  status: 'active' | 'resolved' | 'unassigned';
  priority: boolean;
  channel: string;
  avatar: string;
  typing?: boolean;
}

export interface Interaction {
  id: string;
  type: string;
  description: string;
  timestamp: string;
  agent?: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  avatar: string;
  resolved: number;
  rating: number;
  sla: number;
  goalProgress: number;
  focus: { name: string; color: string }[];
  trend: number[];
  status: 'online' | 'offline';
}
