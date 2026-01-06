
import React, { useState, useEffect } from 'react';

interface LoginProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (user: string) => void;
}

const Login: React.FC<LoginProps> = ({ isOpen, onClose, onLoginSuccess }) => {
  const [isRegistering, setIsRegistering] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isScanning, setIsScanning] = useState(false);
  const [terminalText, setTerminalText] = useState(['> SYSTEM IDLE', '> WAITING FOR CREDENTIALS...']);

  const addToTerminal = (text: string) => {
    setTerminalText(prev => [...prev.slice(-4), `> ${text}`]);
  };

  const getStoredUsers = () => {
    const users = localStorage.getItem('cyborg_users');
    return users ? JSON.parse(users) : { 'admin': 'protocol_47' };
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsScanning(true);
    
    addToTerminal(isRegistering ? 'INITIALIZING REGISTRATION...' : 'UPLOADING PACKETS...');
    
    setTimeout(() => addToTerminal('INITIATING BIOMETRIC SCAN...'), 500);
    setTimeout(() => addToTerminal('VERIFYING NEURAL SIGNATURE...'), 1000);

    setTimeout(() => {
      const users = getStoredUsers();

      if (isRegistering) {
        if (users[username]) {
          setError('ERROR: IDENTITY ALREADY EXISTS.');
          addToTerminal('REGISTRATION ABORTED: CONFLICT DETECTED.');
          setIsScanning(false);
        } else {
          // Save new user
          users[username] = password;
          localStorage.setItem('cyborg_users', JSON.stringify(users));
          addToTerminal('PROFILE CREATED. SECURING NEURAL LINK...');
          setTimeout(() => onLoginSuccess(username), 800);
        }
      } else {
        // Login logic
        if (users[username] === password) {
          addToTerminal('ACCESS GRANTED. WELCOME ARCHITECT.');
          setTimeout(() => onLoginSuccess(username), 800);
        } else {
          setError('CRITICAL ERROR: ACCESS DENIED.');
          addToTerminal('ERROR: AUTHENTICATION FAILURE.');
          setIsScanning(false);
        }
      }
    }, 2000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black overflow-hidden font-orbitron">
      {/* Background Digital Rain Effect */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-500/10 to-transparent animate-pulse"></div>
        <div className="flex justify-around w-full h-full text-[8px] font-mono text-cyan-500 overflow-hidden leading-none">
          {Array.from({ length: 20 }).map((_, i) => (
            <div key={i} className="flex flex-col animate-[bounce_3s_infinite]" style={{ animationDelay: `${i * 0.2}s` }}>
              {Array.from({ length: 50 }).map((_, j) => (
                <span key={j}>{Math.random().toString(36).substring(2, 3)}</span>
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,118,0.06))] bg-[length:100%_4px,3px_100%] z-10"></div>

      <div className="w-full max-w-xl p-8 relative z-20">
        <div className="glass-card rounded-none border-2 border-cyan-500/50 p-8 shadow-[0_0_50px_rgba(0,243,255,0.2)]">
          {/* Header */}
          <div className="flex justify-between items-center mb-10 border-b border-cyan-500/30 pb-4">
            <div className="flex items-center gap-4">
              <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse shadow-[0_0_10px_#ff0000]"></div>
              <h2 className="text-xl font-black text-cyan-400 tracking-[0.3em]">
                {isRegistering ? 'CREATE IDENTITY' : 'SECURE GATEWAY'}
              </h2>
            </div>
            <button onClick={onClose} className="text-cyan-500/50 hover:text-cyan-400 transition text-sm">
              [ ESC ]
            </button>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Left: Scan Visualizer */}
            <div className="flex flex-col items-center justify-center p-6 bg-cyan-500/5 border border-cyan-500/20 relative overflow-hidden group">
              <div className={`w-32 h-32 rounded-full border-2 border-dashed border-cyan-500/30 flex items-center justify-center relative ${isScanning ? 'animate-spin-slow' : ''}`}>
                 <i className={`fas ${isScanning ? 'fa-dna text-cyan-400 scale-125' : isRegistering ? 'fa-user-plus text-cyan-500/40' : 'fa-fingerprint text-cyan-500/40'} text-5xl transition-all duration-500`}></i>
              </div>
              {isScanning && (
                <div className="absolute top-0 left-0 w-full h-1 bg-cyan-400 shadow-[0_0_15px_#00f3ff] animate-[scan_2s_infinite]"></div>
              )}
              <div className="mt-4 text-[10px] uppercase font-bold text-cyan-500/60 tracking-widest text-center">
                {isScanning ? 'Syncing Neural Pathways' : isRegistering ? 'Registration Protocol Ready' : 'Biometric Link Ready'}
              </div>
            </div>

            {/* Right: Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-1">
                <label className="text-[9px] font-black uppercase text-cyan-500/60 tracking-widest block">Subject ID</label>
                <input 
                  type="text" 
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full bg-black/50 border border-cyan-500/30 px-4 py-2 text-sm text-cyan-100 placeholder:text-cyan-900 focus:outline-none focus:border-cyan-400 transition-all font-mono"
                  placeholder="USERNAME"
                  disabled={isScanning}
                  autoComplete="off"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="text-[9px] font-black uppercase text-cyan-500/60 tracking-widest block">Neural Key</label>
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-black/50 border border-cyan-500/30 px-4 py-2 text-sm text-cyan-100 placeholder:text-cyan-900 focus:outline-none focus:border-cyan-400 transition-all font-mono"
                  placeholder="********"
                  disabled={isScanning}
                  required
                />
              </div>

              <button 
                type="submit" 
                disabled={isScanning || !username || !password}
                className={`w-full h-12 text-black font-black uppercase text-xs tracking-widest transition-all active:scale-95 disabled:opacity-30 flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(0,243,255,0.4)] ${isRegistering ? 'bg-purple-500 hover:bg-purple-400 shadow-purple-500/40' : 'bg-cyan-500 hover:bg-cyan-400'}`}
              >
                {isScanning ? <i className="fas fa-circle-notch fa-spin"></i> : <i className="fas fa-bolt"></i>}
                {isScanning ? 'UPLOADING...' : isRegistering ? 'CREATE PROFILE' : 'INITIATE LOGIN'}
              </button>

              <div className="text-center">
                <button
                  type="button"
                  onClick={() => setIsRegistering(!isRegistering)}
                  className="text-[9px] text-cyan-500/50 hover:text-cyan-400 transition uppercase tracking-widest font-bold border-b border-transparent hover:border-cyan-400/30"
                >
                  {isRegistering ? '[ Switch to Login ]' : '[ Register New Identity ]'}
                </button>
              </div>
            </form>
          </div>

          {/* Terminal Feedback Area */}
          <div className="mt-8 bg-black/60 border border-cyan-500/20 p-4 font-mono text-[10px] min-h-[80px]">
            {terminalText.map((text, i) => (
              <div key={i} className={i === terminalText.length - 1 ? "text-cyan-400 animate-pulse" : "text-cyan-900"}>
                {text}
              </div>
            ))}
            {error && <div className="text-red-500 mt-2 font-black animate-bounce">!! {error} !!</div>}
          </div>

          <div className="mt-6 flex justify-between items-center text-[9px] text-cyan-900 uppercase font-black tracking-widest">
            <span>Protocol: v4.7.2</span>
            <span>Auth: Multi-User Local Sync</span>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes scan {
          0% { top: 0; }
          100% { top: 100%; }
        }
        .animate-spin-slow {
          animation: spin 8s linear infinite;
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default Login;
