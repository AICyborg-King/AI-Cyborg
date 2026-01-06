
import React, { useState, useEffect } from 'react';
import { leadService } from '../services/leadService';
import { Lead } from '../types';

const LeadsDashboard: React.FC = () => {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [filter, setFilter] = useState<'all' | 'new' | 'contacted'>('all');
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [isSyncing, setIsSyncing] = useState(false);

  const refreshLeads = () => {
    setIsSyncing(true);
    setTimeout(() => {
      setLeads(leadService.getLeads());
      setIsSyncing(false);
    }, 600);
  };

  useEffect(() => {
    refreshLeads();
  }, []);

  const handleDelete = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    if (confirm("Execute data deletion?")) {
      leadService.deleteLead(id);
      setLeads(leadService.getLeads());
    }
  };

  const toggleStatus = (e: React.MouseEvent, lead: Lead) => {
    e.stopPropagation();
    const nextStatus: Lead['status'] = lead.status === 'new' ? 'contacted' : 'new';
    leadService.updateLeadStatus(lead.id, nextStatus);
    setLeads(leadService.getLeads());
  };

  const handleClearAll = () => {
    if (confirm("Permanently wipe all neural lead data from local buffer?")) {
      leadService.clearLeads();
      setLeads([]);
    }
  };

  const filteredLeads = leads.filter(l => filter === 'all' || l.status === filter);

  return (
    <section className="pt-32 pb-24 px-6 max-w-7xl mx-auto min-h-[80vh] animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
        <div>
          <h1 className="text-4xl font-orbitron font-black text-white glow-text mb-2 tracking-tighter">COMMAND CENTER</h1>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
            <p className="text-cyan-400/60 uppercase text-[9px] tracking-[0.4em]">Neural Core: Operational // Local Buffer Sync: Active</p>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-4">
          <div className="bg-white/5 border border-white/10 p-1 rounded-lg flex">
            {['all', 'new', 'contacted'].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f as any)}
                className={`px-4 py-2 rounded text-[9px] uppercase font-black tracking-widest transition ${filter === f ? 'bg-cyan-500 text-black shadow-[0_0_10px_rgba(0,243,255,0.4)]' : 'text-gray-500 hover:text-gray-300'}`}
              >
                {f}
              </button>
            ))}
          </div>
          
          <button 
            onClick={refreshLeads}
            disabled={isSyncing}
            className="px-4 py-2 border border-cyan-500/30 text-cyan-400 hover:bg-cyan-500 hover:text-black rounded text-[9px] uppercase font-black tracking-widest transition flex items-center gap-2"
          >
            <i className={`fas fa-sync-alt ${isSyncing ? 'fa-spin' : ''}`}></i>
            {isSyncing ? 'Syncing...' : 'Sync Buffer'}
          </button>

          <button 
            onClick={handleClearAll}
            className="px-4 py-2 border border-red-500/30 text-red-400 hover:bg-red-500 hover:text-white rounded text-[9px] uppercase font-black tracking-widest transition"
          >
            Purge Buffer
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="glass-card p-6 rounded-xl border-l-4 border-l-cyan-500 group hover:bg-cyan-500/5 transition-all">
          <p className="text-gray-500 text-[10px] uppercase font-black tracking-[0.3em] mb-1">Active Packets</p>
          <p className="text-3xl font-orbitron font-black text-white group-hover:scale-110 transition-transform origin-left">{leads.length}</p>
        </div>
        <div className="glass-card p-6 rounded-xl border-l-4 border-l-purple-500 group hover:bg-purple-500/5 transition-all">
          <p className="text-gray-500 text-[10px] uppercase font-black tracking-[0.3em] mb-1">Unprocessed Syncs</p>
          <p className="text-3xl font-orbitron font-black text-white group-hover:scale-110 transition-transform origin-left">{leads.filter(l => l.status === 'new').length}</p>
        </div>
        <div className="glass-card p-6 rounded-xl border-l-4 border-l-green-500">
          <p className="text-gray-500 text-[10px] uppercase font-black tracking-[0.3em] mb-1">Uplink Status</p>
          <div className="flex items-center gap-3">
             <p className="text-2xl font-orbitron font-black text-green-400">ONLINE</p>
             <i className="fas fa-satellite text-green-500/40 animate-bounce"></i>
          </div>
        </div>
      </div>

      <div className="glass-card rounded-2xl overflow-hidden border-white/5 shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-black/40 border-b border-white/10">
              <tr>
                <th className="px-6 py-5 text-[9px] uppercase font-black text-cyan-500/60 tracking-[0.2em]">Identified Subject</th>
                <th className="px-6 py-5 text-[9px] uppercase font-black text-cyan-500/60 tracking-[0.2em]">Origin Node</th>
                <th className="px-6 py-5 text-[9px] uppercase font-black text-cyan-500/60 tracking-[0.2em]">Comms Vector</th>
                <th className="px-6 py-5 text-[9px] uppercase font-black text-cyan-500/60 tracking-[0.2em]">Neural Intent (Preview)</th>
                <th className="px-6 py-5 text-[9px] uppercase font-black text-cyan-500/60 tracking-[0.2em]">Uplink Date</th>
                <th className="px-6 py-5 text-[9px] uppercase font-black text-cyan-500/60 tracking-[0.2em]">Protocol Status</th>
                <th className="px-6 py-5 text-[9px] uppercase font-black text-cyan-500/60 tracking-[0.2em]">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredLeads.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-20 text-center text-gray-700 font-orbitron text-[10px] uppercase tracking-[0.5em] italic">
                    <i className="fas fa-microchip block text-4xl mb-4 opacity-10"></i>
                    Zero neural leads detected in current buffer.
                  </td>
                </tr>
              ) : (
                filteredLeads.map((lead) => (
                  <React.Fragment key={lead.id}>
                    <tr 
                      onClick={() => setExpandedId(expandedId === lead.id ? null : lead.id)}
                      className={`hover:bg-cyan-500/5 transition-all cursor-pointer group ${expandedId === lead.id ? 'bg-cyan-500/5 border-l-2 border-cyan-500' : ''}`}
                    >
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-3">
                           <div className="w-8 h-8 rounded bg-white/5 flex items-center justify-center text-xs text-cyan-400 font-black border border-white/10 group-hover:border-cyan-500/40 transition-colors">
                              {lead.name?.charAt(0) || '?'}
                           </div>
                           <div className="text-sm font-bold text-white tracking-tight">{lead.name || 'ANON_SUBJECT'}</div>
                        </div>
                      </td>
                      <td className="px-6 py-5">
                        <div className="text-[10px] text-purple-400 font-orbitron uppercase tracking-widest">{lead.country || 'TERRA_CORE'}</div>
                      </td>
                      <td className="px-6 py-5">
                        <div className="text-[10px] text-cyan-400 font-mono tracking-tight">{lead.phone || lead.email || 'NO_VECTOR'}</div>
                      </td>
                      <td className="px-6 py-5">
                        <div className="text-[10px] text-gray-500 italic line-clamp-1 max-w-[150px]">
                          {lead.content || 'System data uplink...'}
                        </div>
                      </td>
                      <td className="px-6 py-5">
                        <div className="text-[10px] text-gray-600 font-mono">
                          {new Date(lead.timestamp).toLocaleDateString()}
                          <span className="block opacity-30">{new Date(lead.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                        </div>
                      </td>
                      <td className="px-6 py-5">
                        <button 
                          onClick={(e) => toggleStatus(e, lead)}
                          className={`text-[8px] font-black uppercase tracking-widest px-3 py-1 rounded transition-all border ${
                            lead.status === 'new' 
                            ? 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30 hover:bg-cyan-500 hover:text-black' 
                            : 'bg-green-500/10 text-green-500 border-green-500/30 hover:bg-green-500 hover:text-black'
                          }`}
                        >
                          {lead.status}
                        </button>
                      </td>
                      <td className="px-6 py-5">
                        <button 
                          onClick={(e) => handleDelete(e, lead.id)}
                          className="w-8 h-8 rounded-full flex items-center justify-center text-gray-700 hover:text-red-500 hover:bg-red-500/10 transition"
                        >
                          <i className="fas fa-trash-alt text-xs"></i>
                        </button>
                      </td>
                    </tr>
                    {expandedId === lead.id && (
                      <tr className="bg-black/60">
                        <td colSpan={7} className="px-8 py-6 border-b border-cyan-500/20">
                          <div className="animate-in slide-in-from-top-4 duration-300">
                             <h4 className="text-[9px] font-black uppercase text-cyan-500/50 tracking-widest mb-4 flex items-center gap-2">
                               <i className="fas fa-terminal"></i> Mission Parameters Decrypted
                             </h4>
                             <div className="bg-cyan-500/5 border border-cyan-500/20 p-6 rounded-xl font-mono text-sm text-cyan-100 leading-relaxed shadow-inner">
                                {lead.content || 'NO_ADDITIONAL_DATA_FOUND_IN_BUFFER'}
                             </div>
                             <div className="mt-4 flex gap-4">
                               <div className="px-3 py-1 bg-white/5 border border-white/10 rounded text-[9px] text-gray-500 uppercase font-bold">
                                 Packet ID: {lead.id}
                               </div>
                               <div className="px-3 py-1 bg-white/5 border border-white/10 rounded text-[9px] text-gray-500 uppercase font-bold">
                                 Source Type: {lead.name === 'Chat Lead' ? 'NEURAL_CHAT' : 'UPLINK_FORM'}
                               </div>
                             </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="mt-12 text-center">
        <p className="text-[9px] text-gray-600 font-mono uppercase tracking-[0.5em]">
          End of Lead Buffer // Encryption: 256-bit AES Local Storage Sync
        </p>
      </div>
    </section>
  );
};

export default LeadsDashboard;
