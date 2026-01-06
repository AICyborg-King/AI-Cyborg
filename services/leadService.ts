
import { Lead } from "../types";

const LEADS_KEY = 'cyborg_47_leads';

// User provided endpoint for reliable lead capture
export const FORMSPREE_ENDPOINT = 'https://formspree.io/f/meeobwng'; 

export const leadService = {
  getLeads: (): Lead[] => {
    const data = localStorage.getItem(LEADS_KEY);
    return data ? JSON.parse(data) : [];
  },

  saveLead: async (leadData: Partial<Lead>): Promise<{ success: boolean; error?: string }> => {
    const leads = leadService.getLeads();
    const newLead: Lead = {
      id: Math.random().toString(36).substr(2, 9),
      timestamp: new Date().toISOString(),
      status: 'new',
      content: '',
      ...leadData
    } as Lead;
    
    // Save locally first so it shows in the dashboard
    leads.unshift(newLead);
    localStorage.setItem(LEADS_KEY, JSON.stringify(leads));

    // Relay to Formspree
    if (FORMSPREE_ENDPOINT) {
      try {
        const response = await fetch(FORMSPREE_ENDPOINT, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify({
            subject: `New Neural Lead: ${newLead.name}`,
            name: newLead.name,
            phone: newLead.phone,
            country: newLead.country,
            message: newLead.content,
            _timestamp: newLead.timestamp,
            _id: newLead.id
          })
        });

        if (response.ok) {
          console.log('Neural Relay Successful: Data transmitted to Formspree.');
          return { success: true };
        } else {
          return { success: false, error: 'Relay rejected by external server.' };
        }
      } catch (err) {
        console.error('Relay Failure:', err);
        return { success: false, error: 'Neural link timeout.' };
      }
    }
    
    return { success: true }; // Local save always succeeds
  },

  updateLeadStatus: (id: string, status: Lead['status']): void => {
    const leads = leadService.getLeads().map(l => l.id === id ? { ...l, status } : l);
    localStorage.setItem(LEADS_KEY, JSON.stringify(leads));
  },

  deleteLead: (id: string): void => {
    const leads = leadService.getLeads().filter(l => l.id !== id);
    localStorage.setItem(LEADS_KEY, JSON.stringify(leads));
  },

  clearLeads: (): void => {
    localStorage.removeItem(LEADS_KEY);
  }
};
