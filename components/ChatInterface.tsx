
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
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Lead detection logic
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
      console.log('Lead captured from chat sync.');
    }
  };

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    detectAndSaveLead(input); // Check for lead data
    setInput('');
    setIsLoading(true);

    const response = await chatWithCyborg([...messages, userMessage]);
    setMessages(prev => [...prev, { role: 'model', content: response }]);
    setIsLoading(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="w-full max-w-2xl h-[80vh] bg-[#0a0a0a] border border-cyan-500/30 rounded-2xl flex flex-col overflow-hidden shadow-[0_0_50px_rgba(0,243,255,0.1)]">
        {/* Header */}
        <div className="px-6 py-4 border-b border-white/10 flex justify-between items-center bg-black/40">
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse"></div>
            <h3 className="font-orbitron text-sm font-bold tracking-widest text-cyan-400">CYBORG 47 NEURAL INTERFACE</h3>
          </div>
          <button onClick={onClose} className="text-gray-500 hover:text-white transition">
            <i className="fas fa-times"></i>
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {messages.map((msg, i) => (
            <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[85%] px-4 py-3 rounded-xl text-sm leading-relaxed ${
                msg.role === 'user' 
                ? 'bg-cyan-500 text-black font-bold rounded-tr-none shadow-[0_0_15px_rgba(0,243,255,0.2)]' 
                : 'bg-white/5 border border-white/10 text-gray-200 rounded-tl-none'
              }`}>
                {msg.content}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-white/5 border border-white/10 px-4 py-3 rounded-xl rounded-tl-none">
                <div className="flex gap-1">
                  <div className="w-1.5 h-1.5 bg-cyan-500 rounded-full animate-bounce"></div>
                  <div className="w-1.5 h-1.5 bg-cyan-500 rounded-full animate-bounce delay-100"></div>
                  <div className="w-1.5 h-1.5 bg-cyan-500 rounded-full animate-bounce delay-200"></div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <form onSubmit={handleSend} className="p-4 bg-black/40 border-t border-white/10 flex gap-2">
          <input 
            type="text" 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Input neural string (Try mentioning your email)..."
            className="flex-1 bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-cyan-500/50 transition-colors text-white"
          />
          <button 
            type="submit" 
            disabled={isLoading}
            className="w-12 h-12 bg-cyan-500 text-black rounded-lg flex items-center justify-center hover:bg-cyan-400 transition-all disabled:opacity-50 shadow-[0_0_10px_rgba(0,243,255,0.3)]"
          >
            <i className="fas fa-paper-plane"></i>
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatInterface;
