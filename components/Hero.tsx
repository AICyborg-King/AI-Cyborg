import React from 'react';

interface HeroProps {
  onOpenChat: () => void;
}

const Hero: React.FC<HeroProps> = ({ onOpenChat }) => {
  const handleInitialize = () => {
    console.log("Protocol 47: Initializing Interface...");
    onOpenChat();
  };

  return (
    <section id="home" className="min-h-screen flex flex-col justify-center items-center text-center px-6 pt-20 relative overflow-hidden">
      {/* Decorative Glows - Using pointer-events-none to ensure they don't block clicks */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-[100px] animate-pulse pointer-events-none z-0"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-[100px] animate-pulse delay-700 pointer-events-none z-0"></div>

      <div className="mb-4 inline-block px-3 py-1 border border-cyan-500/30 rounded-full text-cyan-400 text-xs font-bold uppercase tracking-[0.2em] bg-cyan-500/10 animate-fade-in relative z-10">
        Next-Gen Neural Protocol Active
      </div>
      
      <h1 className="text-6xl md:text-8xl font-orbitron font-black mb-6 leading-tight tracking-tighter relative z-10 select-none">
        MEET <span className="bg-gradient-to-r from-cyan-400 via-purple-500 to-cyan-500 bg-clip-text text-transparent">AI CYBORG 47</span>
      </h1>
      
      <p className="max-w-2xl text-lg md:text-xl text-gray-400 mb-10 leading-relaxed font-light relative z-10">
        An advanced autonomous intelligence designed to bridge the gap between human intuition and machine precision. Faster. Smarter. Unstoppable.
      </p>

      {/* Button Layer - Explicitly high Z-index */}
      <div className="flex flex-col sm:flex-row gap-4 relative z-50">
        <button 
          onClick={handleInitialize}
          className="btn-neon px-8 py-4 rounded-lg font-orbitron text-sm uppercase tracking-widest flex items-center gap-2 justify-center active:scale-95 transition-transform shadow-[0_0_20px_rgba(0,243,255,0.2)]"
        >
          <i className="fas fa-terminal"></i> Initialize Interface
        </button>
        <a 
          href="#about" 
          className="px-8 py-4 bg-white text-black hover:bg-gray-200 rounded-lg font-orbitron text-sm uppercase tracking-widest transition flex items-center justify-center active:scale-95 shadow-xl"
        >
          Explore Protocol
        </a>
      </div>
      
      <div className="mt-20 flex space-x-12 opacity-30 grayscale hover:grayscale-0 transition duration-500 relative z-10">
        <i className="fab fa-node-js text-4xl hover:text-green-500 transition-colors cursor-pointer" title="Node.js"></i>
        <i className="fab fa-python text-4xl hover:text-blue-500 transition-colors cursor-pointer" title="Python"></i>
        <i className="fab fa-react text-4xl hover:text-cyan-400 transition-colors cursor-pointer" title="React"></i>
        <i className="fas fa-microchip text-4xl hover:text-red-500 transition-colors cursor-pointer" title="Systems"></i>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce text-cyan-500/50 z-10">
        <a href="#about"><i className="fas fa-chevron-down text-2xl"></i></a>
      </div>
    </section>
  );
};

export default Hero;