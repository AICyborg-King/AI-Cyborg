
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="py-12 border-t border-white/5 text-center px-6">
      <div className="text-xl font-orbitron font-bold mb-6 opacity-50 tracking-widest">AI CYBORG 47</div>
      <p className="text-gray-600 text-xs mb-8 tracking-[0.3em]">© 2026 NEURAL INTERFACE CORP. ALL RIGHTS RESERVED.</p>
      <div className="flex justify-center space-x-8 text-gray-400">
        <a href="#" className="hover:text-cyan-400 transition-colors"><i className="fab fa-twitter text-lg"></i></a>
        <a href="#" className="hover:text-cyan-400 transition-colors"><i className="fab fa-github text-lg"></i></a>
        <a href="#" className="hover:text-cyan-400 transition-colors"><i className="fab fa-discord text-lg"></i></a>
        <a href="#" className="hover:text-cyan-400 transition-colors"><i className="fab fa-linkedin text-lg"></i></a>
      </div>
    </footer>
  );
};

export default Footer;
