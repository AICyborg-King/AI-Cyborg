
import React from 'react';
import SkillMatrix from './SkillMatrix';

const About: React.FC = () => {
  return (
    <section id="about" className="py-24 px-6 max-w-7xl mx-auto border-t border-white/5">
      <div className="grid lg:grid-cols-12 gap-12">
        {/* Left Side: Core Identity */}
        <div className="lg:col-span-4 scroll-reveal opacity-0 translate-y-10 transition-all duration-700 ease-out">
          <h2 className="text-4xl font-orbitron font-bold mb-6 italic bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">ABOUT THE ARCHITECT</h2>
          <div className="glass-card p-6 rounded-2xl border-l-4 border-l-cyan-500 mb-8 hover:bg-white/5 transition-colors">
            <p className="text-gray-300 leading-relaxed mb-4 italic">
              "Building income-ready solutions, not just demos. A complete, honest, no-fluff map of skills designed for the future economy."
            </p>
            <div className="space-y-4">
              <div className="flex items-center gap-3 group">
                <i className="fas fa-brain text-cyan-400 group-hover:scale-110 transition-transform"></i>
                <span className="font-orbitron text-sm uppercase tracking-tighter">AI Systems Builder</span>
              </div>
              <div className="flex items-center gap-3 group">
                <i className="fas fa-project-diagram text-purple-400 group-hover:scale-110 transition-transform"></i>
                <span className="font-orbitron text-sm uppercase tracking-tighter">Automation Architect</span>
              </div>
              <div className="flex items-center gap-3 group">
                <i className="fas fa-microphone-alt text-green-400 group-hover:scale-110 transition-transform"></i>
                <span className="font-orbitron text-sm uppercase tracking-tighter">Voice Agent Specialist</span>
              </div>
            </div>
          </div>

          <h3 className="font-orbitron text-xl mb-4 text-cyan-400 italic">CORE IDENTITY</h3>
          <div className="flex flex-wrap gap-2">
            {['Full-Stack Integrator', 'Web/App Solutions', 'Systems Thinking', 'Problem Decomposition'].map(skill => (
              <span key={skill} className="bg-cyan-500/10 border border-cyan-500/20 px-3 py-1 rounded-sm text-xs text-gray-200 hover:border-cyan-400/50 transition-colors">
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Right Side: Skill Matrix */}
        <div className="lg:col-span-8 scroll-reveal opacity-0 translate-y-10 transition-all duration-700 ease-out delay-200">
          <SkillMatrix />
        </div>
      </div>

      {/* Differentiation Banner */}
      <div className="mt-16 glass-card p-8 rounded-2xl border border-cyan-500/20 scroll-reveal opacity-0 translate-y-10 transition-all duration-700 ease-out delay-300">
        <h3 className="text-center font-orbitron text-2xl mb-8 glow-text">DIFFERENTIATION ENGINE</h3>
        <div className="grid md:grid-cols-4 gap-6 text-center">
          <div>
            <h5 className="text-white font-bold mb-2">Systems First</h5>
            <p className="text-xs text-gray-500 italic">Income-ready solutions, deployed with precision.</p>
          </div>
          <div>
            <h5 className="text-white font-bold mb-2">Cross-Stack</h5>
            <p className="text-xs text-gray-500 italic">Seamlessly bridging no-code, low-code, and native APIs.</p>
          </div>
          <div>
            <h5 className="text-white font-bold mb-2">Business Savvy</h5>
            <p className="text-xs text-gray-500 italic">Translating business needs into technical reality.</p>
          </div>
          <div>
            <h5 className="text-white font-bold mb-2">Resilience</h5>
            <p className="text-xs text-gray-500 italic">Faith-driven discipline and extreme operational resilience.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
