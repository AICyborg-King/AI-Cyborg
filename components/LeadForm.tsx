
import React, { useState } from 'react';
import { leadService, FORMSPREE_ENDPOINT } from '../services/leadService';

const LeadForm: React.FC = () => {
  const [formData, setFormData] = useState({ name: '', number: '', country: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    setErrorMessage('');

    // Artificial encryption delay for UI/UX
    setTimeout(async () => {
      const result = await leadService.saveLead({
        name: formData.name,
        phone: formData.number,
        country: formData.country,
        content: formData.message || 'Standard Data Uplink'
      });

      if (result.success) {
        setStatus('success');
        setFormData({ name: '', number: '', country: '', message: '' });
        setTimeout(() => setStatus('idle'), 5000);
      } else {
        setStatus('error');
        setErrorMessage(result.error || 'Transmission Interrupted');
        setTimeout(() => setStatus('idle'), 4000);
      }
    }, 1500);
  };

  return (
    <div className="glass-card p-8 rounded-2xl border border-cyan-500/30 relative overflow-hidden group">
      {/* Animated Top Border */}
      <div className={`absolute top-0 left-0 h-1 transition-all duration-1000 ${
        status === 'sending' ? 'w-full bg-cyan-500 animate-pulse' : 
        status === 'success' ? 'w-full bg-green-500' :
        status === 'error' ? 'w-full bg-red-500' : 'w-0 bg-cyan-500/30'
      }`}></div>
      
      <div className="mb-8 flex justify-between items-start">
        <div>
          <h3 className="text-2xl font-orbitron font-bold text-white mb-2 flex items-center gap-3">
            <i className={`fas ${status === 'sending' ? 'fa-sync fa-spin text-cyan-400' : 'fa-satellite-dish text-cyan-400'}`}></i>
            NEURAL UPLINK
          </h3>
          <p className="text-gray-500 text-[9px] uppercase tracking-[0.3em]">Protocol: {FORMSPREE_ENDPOINT ? 'FORMSPREE_RELAY_ACTIVE' : 'LOCAL_BUFFER_ONLY'}</p>
        </div>
        <div className="text-[10px] font-mono text-cyan-500/40 bg-cyan-500/5 px-2 py-1 rounded border border-cyan-500/10">
          SECURE_NODE_47
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase text-cyan-500/60 tracking-widest block">Subject Identity</label>
            <input 
              required
              type="text" 
              placeholder="FULL NAME"
              value={formData.name}
              onChange={e => setFormData({...formData, name: e.target.value})}
              className="w-full bg-black/60 border border-white/10 rounded-lg px-4 py-3 text-sm font-orbitron text-white focus:outline-none focus:border-cyan-500/50 transition-all placeholder:opacity-20"
            />
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase text-cyan-500/60 tracking-widest block">Comms Number</label>
              <input 
                required
                type="tel" 
                placeholder="PHONE NUMBER"
                value={formData.number}
                onChange={e => setFormData({...formData, number: e.target.value})}
                className="w-full bg-black/60 border border-white/10 rounded-lg px-4 py-3 text-sm font-orbitron text-white focus:outline-none focus:border-cyan-500/50 transition-all placeholder:opacity-20"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase text-cyan-500/60 tracking-widest block">Geographic Origin</label>
              <input 
                required
                type="text" 
                placeholder="COUNTRY"
                value={formData.country}
                onChange={e => setFormData({...formData, country: e.target.value})}
                className="w-full bg-black/60 border border-white/10 rounded-lg px-4 py-3 text-sm font-orbitron text-white focus:outline-none focus:border-cyan-500/50 transition-all placeholder:opacity-20"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase text-cyan-500/60 tracking-widest block">Mission Parameters</label>
            <textarea 
              rows={3}
              placeholder="DESCRIBE YOUR REQUIREMENTS..."
              value={formData.message}
              onChange={e => setFormData({...formData, message: e.target.value})}
              className="w-full bg-black/60 border border-white/10 rounded-lg px-4 py-3 text-sm font-orbitron text-white focus:outline-none focus:border-cyan-500/50 transition-all resize-none placeholder:opacity-20"
            ></textarea>
          </div>
        </div>

        <button 
          type="submit" 
          disabled={status === 'sending'}
          className={`group w-full py-4 rounded-lg font-orbitron font-black text-xs tracking-[0.4em] uppercase transition-all flex items-center justify-center gap-3 relative overflow-hidden
            ${status === 'success' ? 'bg-green-500 text-black shadow-[0_0_20px_rgba(34,197,94,0.4)]' : 
              status === 'error' ? 'bg-red-500 text-white' : 'btn-neon'}
          `}
        >
          {status === 'idle' && (
            <>
              <i className="fas fa-bolt group-hover:scale-125 transition-transform"></i>
              Initiate Relay
            </>
          )}
          {status === 'sending' && (
            <>
              <i className="fas fa-circle-notch fa-spin"></i>
              Syncing Neural Data...
            </>
          )}
          {status === 'success' && (
            <>
              <i className="fas fa-check-double"></i>
              Uplink Confirmed
            </>
          )}
          {status === 'error' && (
            <>
              <i className="fas fa-exclamation-triangle"></i>
              Relay Failed
            </>
          )}
        </button>

        {status === 'success' && (
          <div className="text-center animate-in slide-in-from-top-2 duration-500">
            <p className="text-[9px] text-green-400 font-mono tracking-widest uppercase">
              // Data packet secured in local buffer & external relay confirmed.
            </p>
          </div>
        )}

        {status === 'error' && (
          <div className="text-center text-red-400 animate-pulse">
            <p className="text-[9px] font-mono uppercase tracking-widest">
              Error: {errorMessage} // Retrying local backup...
            </p>
          </div>
        )}
      </form>
    </div>
  );
};

export default LeadForm;
