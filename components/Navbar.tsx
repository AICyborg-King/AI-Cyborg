
import React, { useState } from 'react';

interface NavbarProps {
  onOpenChat: () => void;
  activeSection: string;
  isAuthenticated?: boolean;
  onLoginClick?: () => void;
  onLogout?: () => void;
  onSwitchView?: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ 
  onOpenChat, 
  activeSection, 
  isAuthenticated, 
  onLoginClick, 
  onLogout,
  onSwitchView 
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Home', id: 'home' },
    { label: 'About', id: 'about' },
    { label: 'Capabilities', id: 'features' },
    { label: 'Contact', id: 'contact' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    if (activeSection === 'dashboard') {
      onSwitchView?.();
      // Small delay to allow re-render before scrolling
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          const offset = 80;
          const bodyRect = document.body.getBoundingClientRect().top;
          const elementRect = element.getBoundingClientRect().top;
          const elementPosition = elementRect - bodyRect;
          window.scrollTo({ top: id === 'home' ? 0 : elementPosition - offset, behavior: 'smooth' });
        }
      }, 50);
    } else {
      const element = document.getElementById(id);
      if (element) {
        const offset = 80;
        const bodyRect = document.body.getBoundingClientRect().top;
        const elementRect = element.getBoundingClientRect().top;
        const elementPosition = elementRect - bodyRect;
        window.scrollTo({ top: id === 'home' ? 0 : elementPosition - offset, behavior: 'smooth' });
      }
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="fixed w-full z-50 px-6 py-4 flex justify-between items-center bg-black/80 backdrop-blur-xl border-b border-white/10">
      <div 
        className="text-2xl font-orbitron font-bold glow-text tracking-tighter flex items-center gap-2 cursor-pointer z-[60]" 
        onClick={() => { if(activeSection === 'dashboard') onSwitchView?.(); window.scrollTo({top: 0, behavior: 'smooth'})}}
      >
        <span className="w-8 h-8 bg-cyan-500 rounded flex items-center justify-center text-black text-xs font-black shadow-[0_0_15px_rgba(0,243,255,0.6)]">47</span>
        <span className="hidden sm:inline tracking-tighter">CYBORG <span className="text-white">47</span></span>
      </div>
      
      <div className="hidden md:flex items-center space-x-8 font-medium uppercase tracking-[0.2em] text-[10px]">
        {navLinks.map((link) => (
          <a
            key={link.id}
            href={`#${link.id}`}
            onClick={(e) => handleNavClick(e, link.id)}
            className={`transition-all duration-300 hover:text-cyan-400 relative py-2 ${
              activeSection === link.id ? 'text-cyan-400 active-nav-link font-bold' : 'text-gray-400'
            }`}
          >
            {link.label}
          </a>
        ))}
      </div>

      <div className="flex items-center gap-4">
        {isAuthenticated ? (
          <div className="flex items-center gap-3">
            <button 
              onClick={onSwitchView}
              className={`text-[10px] font-black uppercase tracking-widest px-4 py-2 rounded border border-cyan-500/50 hover:bg-cyan-500/10 transition ${activeSection === 'dashboard' ? 'bg-cyan-500 text-black shadow-[0_0_10px_rgba(0,243,255,0.3)]' : 'text-cyan-400'}`}
            >
              {activeSection === 'dashboard' ? 'Exit Command' : 'Command Center'}
            </button>
            <button 
              onClick={onLogout}
              className="text-gray-500 hover:text-red-400 transition text-[10px] uppercase font-bold"
            >
              Sign Out
            </button>
          </div>
        ) : (
          <button 
            onClick={onLoginClick}
            className="text-cyan-400 hover:text-white transition text-[10px] uppercase font-black tracking-widest px-4 py-2 border border-cyan-500/30 rounded bg-cyan-500/5 hover:bg-cyan-500/20 shadow-[0_0_10px_rgba(0,243,255,0.1)]"
          >
            Access Terminal
          </button>
        )}
        
        <button 
          onClick={onOpenChat}
          className="btn-neon px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-widest hidden sm:block"
        >
          Neural Link
        </button>

        <button 
          className="md:hidden text-cyan-400 text-xl z-[60] p-2"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <i className={`fas ${isMobileMenuOpen ? 'fa-times' : 'fa-bars'}`}></i>
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={`fixed inset-0 bg-black/95 backdrop-blur-2xl z-[50] flex flex-col items-center justify-center transition-all duration-500 md:hidden ${
        isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
      }`}>
        <div className="flex flex-col items-center space-y-8">
          {navLinks.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              onClick={(e) => handleNavClick(e, link.id)}
              className={`text-2xl font-orbitron font-bold uppercase tracking-[0.3em] transition-all ${
                activeSection === link.id ? 'text-cyan-400 glow-text' : 'text-gray-500'
              }`}
            >
              {link.label}
            </a>
          ))}
          {isAuthenticated && (
            <button onClick={onSwitchView} className="text-cyan-400 font-orbitron text-xl uppercase tracking-widest">
              {activeSection === 'dashboard' ? 'Exit Command' : 'Command Center'}
            </button>
          )}
          {!isAuthenticated && (
            <button onClick={onLoginClick} className="text-cyan-400 font-orbitron text-xl uppercase tracking-widest">
              Access Terminal
            </button>
          )}
          <button 
            onClick={() => { onOpenChat(); setIsMobileMenuOpen(false); }}
            className="btn-neon px-8 py-3 rounded-full text-sm font-black uppercase tracking-widest mt-4"
          >
            Neural Link
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
