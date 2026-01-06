
export interface Message {
  role: 'user' | 'model';
  content: string;
}

export interface SkillItem {
  name: string;
  category: string;
  items: string[];
}

export interface Lead {
  id: string;
  email?: string;
  phone?: string;
  name?: string;
  country?: string;
  timestamp: string;
  content: string; // The message context or mission parameters
  status: 'new' | 'contacted' | 'archived';
}

export interface AuthState {
  isAuthenticated: boolean;
  user: string | null;
}
