
import React from 'react';
import LeadForm from './LeadForm';

const Contact: React.FC = () => {
  return (
    <section id="contact" className="py-24 px-6 bg-gradient-to-b from-transparent via-cyan-900/5 to-transparent">
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          
          {/* Left: Info & WhatsApp */}
          <div className="scroll-reveal opacity-0 translate-y-10 transition-all duration-700 ease-out">
            <div className="mb-8">
              <h2 className="text-5xl md:text-6xl font-orbitron font-black mb-6 leading-none tracking-tighter uppercase">
                INITIATE <span className="text-cyan-400">PROTOCOL</span>
              </h2>
              <p className="text-xl text-gray-400 max-w-xl leading-relaxed font-light">
                Connect directly with the AI Cyborg 47 architecture. Your data will be encrypted and synchronized to our command center.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-center gap-6 p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-cyan-500/30 transition-all">
                <div className="w-12 h-12 rounded-full bg-cyan-500/10 flex items-center justify-center text-cyan-400 text-xl">
                  <i className="fas fa-map-marker-alt"></i>
                </div>
                <div>
                  <h4 className="text-[10px] uppercase font-black tracking-widest text-gray-500">Node Location</h4>
                  <p className="text-white font-orbitron">Global Operations Hub</p>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <button 
                  onClick={() => window.open('https://wa.me/12185359124', '_blank')}
                  className="flex flex-col p-6 rounded-2xl bg-black/40 border border-white/5 hover:border-green-500/50 transition-all group text-left"
                >
                  <span className="text-[10px] uppercase tracking-widest text-gray-500 mb-2">Global Comms</span>
                  <span className="text-lg font-orbitron mb-4 text-gray-200">+1 (218) 535 9124</span>
                  <div className="text-green-500 text-xs font-bold flex items-center gap-2">
                    <i className="fab fa-whatsapp"></i> OPEN CHANNEL
                  </div>
                </button>

                <button 
                  onClick={() => window.open('https://wa.me/2348066723856', '_blank')}
                  className="flex flex-col p-6 rounded-2xl bg-black/40 border border-white/5 hover:border-green-500/50 transition-all group text-left"
                >
                  <span className="text-[10px] uppercase tracking-widest text-gray-500 mb-2">Regional Comms</span>
                  <span className="text-lg font-orbitron mb-4 text-gray-200">+234 806 672 3856</span>
                  <div className="text-green-500 text-xs font-bold flex items-center gap-2">
                    <i className="fab fa-whatsapp"></i> OPEN CHANNEL
                  </div>
                </button>
              </div>
            </div>
          </div>

          {/* Right: The New Form */}
          <div className="scroll-reveal opacity-0 translate-y-10 transition-all duration-700 ease-out delay-200">
            <LeadForm />
          </div>

        </div>
      </div>
    </section>
  );
};

export default Contact;
