import React, { useState, useRef, useEffect } from 'react';
import { chatWithCyborg } from '../services/geminiService';
import { leadService } from '../services/leadService';
import { Message } from '../types';

interface ChatInterfaceProps {
  isOpen: boolean;
  onClose: () => void;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', content: "Neural link established. I am AI CYBORG 47. State your protocol requirements or inquiry." }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  // Default to ONLINE as we should assume the environment is correctly configured.
  const [systemStatus, setSystemStatus] = useState<'ONLINE' | 'OFFLINE' | 'SYNCING'>('ONLINE');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const detectAndSaveLead = (text: string) => {
    const emailRegex = /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/gi;
    const phoneRegex = /(\+?\d{1,4}?[\s-]?\(?\d{1,3}?\)?[\s-]?\d{1,4}[\s-]?\d{1,4}[\s-]?\d{1,9})/g;
    
    const emails = text.match(emailRegex);
    const phones = text.match(phoneRegex);

    if (emails || phones) {
      leadService.saveLead({
        email: emails ? emails[0] : undefined,
        phone: phones ? phones[0] : undefined,
        content: text,
        name: 'Chat Lead'
      });
    }
  };

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    detectAndSaveLead(input);
    setInput('');
    setIsLoading(true);
    setSystemStatus('SYNCING');

    try {
      const response = await chatWithCyborg([...messages, userMessage]);
      setMessages(prev => [...prev, { role: 'model', content: response }]);
      
      // If the response indicates a critical credential error, update status
      const isCriticalError = response.includes("ACCESS DENIED") || response.includes("SYNC FAILURE");
      setSystemStatus(isCriticalError ? 'OFFLINE' : 'ONLINE');
    } catch (err) {
      setMessages(prev => [...prev, { role: 'model', content: "CRITICAL SYSTEM ERROR: Neural uplink timed out. Check connectivity." }]);
      setSystemStatus('OFFLINE');
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-in fade-in duration-300">
      <div className="w-full max-w-2xl h-[85vh] bg-[#050505] border border-cyan-500/40 rounded-lg flex flex-col overflow-hidden shadow-[0_0_100px_rgba(0,243,255,0.15)] relative">
        {/* Scanline Overlay */}
        <div className="absolute inset-0 pointer-events-none opacity-5 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,118,0.06))] bg-[length:100%_4px,3px_100%]"></div>

        {/* Header */}
        <div className="px-6 py-4 border-b border-cyan-500/20 flex justify-between items-center bg-black/60 relative z-10">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className={`w-3 h-3 rounded-full ${systemStatus === 'ONLINE' ? 'bg-cyan-500' : systemStatus === 'OFFLINE' ? 'bg-red-500' : 'bg-yellow-500'} animate-pulse`}></div>
              <div className={`absolute inset-0 w-3 h-3 rounded-full ${systemStatus === 'ONLINE' ? 'bg-cyan-400' : 'bg-red-400'} animate-ping opacity-50`}></div>
            </div>
            <div>
              <h3 className="font-orbitron text-xs font-black tracking-[0.3em] text-cyan-400 uppercase">CYBORG_47 // {systemStatus}_ACTIVE</h3>
              <p className="text-[8px] text-gray-500 uppercase tracking-widest font-mono">Signal strength: {systemStatus === 'OFFLINE' ? '0%' : '100%'}</p>
            </div>
          </div>
          <button onClick={onClose} className="text-gray-500 hover:text-cyan-400 transition-colors p-2">
            <i className="fas fa-times text-lg"></i>
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 relative z-10 font-rajdhani">
          {messages.map((msg, i) => (
            <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-in slide-in-from-bottom-2 duration-300`}>
              <div className={`max-w-[90%] px-5 py-3 rounded-sm text-sm border ${
                msg.role === 'user' 
                ? 'bg-cyan-500/10 border-cyan-500/40 text-cyan-100 rounded-tr-none' 
                : 'bg-white/5 border-white/10 text-gray-300 rounded-tl-none relative before:absolute before:left-[-1px] before:top-[-1px] before:w-2 before:h-2 before:border-t-2 before:border-l-2 before:border-cyan-500/60'
              }`}>
                {msg.role === 'model' && (
                  <div className="text-[8px] uppercase font-bold text-cyan-500/50 mb-1 tracking-widest">Received from C47:</div>
                )}
                {msg.role === 'user' && (
                  <div className="text-[8px] uppercase font-bold text-cyan-500/50 mb-1 tracking-widest text-right">Transmitting:</div>
                )}
                <div className="whitespace-pre-wrap leading-relaxed">{msg.content}</div>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-white/5 border border-white/10 px-5 py-3 rounded-sm flex items-center gap-3">
                <span className="text-[10px] text-cyan-500 font-mono animate-pulse">DECRYPTING...</span>
                <div className="flex gap-1">
                  <div className="w-1 h-1 bg-cyan-500 rounded-full animate-bounce"></div>
                  <div className="w-1 h-1 bg-cyan-500 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                  <div className="w-1 h-1 bg-cyan-500 rounded-full animate-bounce [animation-delay:0.4s]"></div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <form onSubmit={handleSend} className="p-4 bg-black/60 border-t border-cyan-500/20 flex gap-3 relative z-10">
          <div className="flex-1 relative group">
            <input 
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Enter neural string..."
              className="w-full bg-white/5 border border-white/10 rounded-sm px-4 py-3 text-sm focus:outline-none focus:border-cyan-500/50 transition-all text-white font-mono placeholder:text-gray-700"
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] text-cyan-500/30 font-black pointer-events-none group-focus-within:text-cyan-500/60 transition-colors">
              [ENTER]
            </div>
          </div>
          <button 
            type="submit" 
            disabled={isLoading || !input.trim()}
            className="w-12 h-12 bg-cyan-600/20 border border-cyan-500/40 text-cyan-400 rounded-sm flex items-center justify-center hover:bg-cyan-500 hover:text-black transition-all disabled:opacity-20 disabled:grayscale"
          >
            <i className={`fas ${isLoading ? 'fa-spinner fa-spin' : 'fa-paper-plane'}`}></i>
          </button>
        </form>

        {/* Footer Status */}
        <div className="px-6 py-2 bg-cyan-500/5 flex justify-between items-center text-[8px] font-mono text-cyan-500/40 uppercase tracking-[0.2em] relative z-10">
          <span>Security: AES-256 Enabled</span>
          <span>Node: {location.hostname}</span>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;