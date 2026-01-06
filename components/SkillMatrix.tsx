
import React from 'react';
import { SkillItem } from '../types';

const skills: SkillItem[] = [
  {
    name: 'AI & VOICE AGENTS',
    category: 'text-cyan-400',
    items: [
      'AI Voice Call Agents (Inbound/Outbound)',
      'Appointment Booking & Lead Qual Agents',
      'Custom LLM Tooling & Prompt Engineering',
      'Vapi AI & ElevenLabs Voice Cloning',
      'Twilio Voice & IVR Orchestration',
      'Realtime AI Streaming (Voice & Chat)'
    ]
  },
  {
    name: 'AUTOMATION & WORKFLOWS',
    category: 'text-purple-400',
    items: [
      'Make.com (Integromat) & Zapier Expert',
      'n8n & Latenode Architecture',
      'GoHighLevel (GHL) Advanced Automation',
      'Webhooks & API Orchestration',
      'Event-driven & Scheduled Workflows',
      'Business Process Automation'
    ]
  },
  {
    name: 'WEB & APP DEV',
    category: 'text-blue-400',
    items: [
      'Wix Studio & Velo Backend Expert',
      'FlutterFlow & Bubble.io MVP Development',
      'Shopify & WordPress Integration',
      'Sales Funnels & Landing Page Optimization',
      'Token Websites & Presale Pages',
      'AI-powered App UI/UX Integration'
    ]
  },
  {
    name: 'CRM & SALES SYSTEMS',
    category: 'text-green-400',
    items: [
      'GoHighLevel & HubSpot Setup',
      'Email Campaign Automation (Klaviyo)',
      'Pipeline & Booking System Automation',
      'Customer Support Automation',
      'Stripe/PayPal Payment Gateway Integration',
      'Inventory & Order Sync Automation'
    ]
  }
];

const SkillMatrix: React.FC = () => {
  return (
    <div className="grid md:grid-cols-2 gap-8">
      {skills.map((skill, idx) => (
        <div key={idx} className="glass-card p-6 rounded-xl group hover:border-white/20 transition-all">
          <h4 className={`${skill.category} font-bold mb-4 flex items-center gap-2 font-orbitron text-sm tracking-widest`}>
            <i className={`fas ${idx % 2 === 0 ? 'fa-robot' : 'fa-cog'}`}></i> {skill.name}
          </h4>
          <ul className="text-gray-400 text-sm space-y-2">
            {skill.items.map((item, i) => (
              <li key={i} className="hover:text-gray-200 transition-colors">• {item}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default SkillMatrix;
