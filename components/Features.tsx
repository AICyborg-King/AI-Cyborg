
import React from 'react';

const Features: React.FC = () => {
  const capabilities = [
    {
      icon: 'fa-brain',
      color: 'text-cyan-400',
      bg: 'bg-cyan-500/20',
      title: 'Neural Processing',
      desc: 'Advanced pattern recognition and deep learning algorithms that adapt to your specific data environment in real-time.'
    },
    {
      icon: 'fa-shield-alt',
      color: 'text-purple-400',
      bg: 'bg-purple-500/20',
      title: 'Encryption Shield',
      desc: 'Military-grade data protection ensuring that all interactions and processed intelligence remain fully decentralized and secure.'
    },
    {
      icon: 'fa-bolt',
      color: 'text-green-400',
      bg: 'bg-green-500/20',
      title: 'Zero Latency',
      desc: 'Built on high-performance infrastructure to deliver near-instantaneous results, no matter the computational complexity.'
    }
  ];

  return (
    <section id="features" className="py-24 px-6 max-w-7xl mx-auto">
      <div className="text-center mb-16 scroll-reveal opacity-0 translate-y-10 transition-all duration-700 ease-out">
        <h2 className="text-4xl font-orbitron font-bold mb-4 italic uppercase tracking-tighter">CAPABILITIES</h2>
        <div className="h-1 w-20 bg-cyan-500 mx-auto"></div>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {capabilities.map((cap, i) => (
          <div key={i} className="glass-card p-8 rounded-2xl scroll-reveal opacity-0 translate-y-10 transition-all duration-700 ease-out" style={{ transitionDelay: `${i * 100}ms` }}>
            <div className={`w-12 h-12 ${cap.bg} rounded-lg flex items-center justify-center mb-6 ${cap.color}`}>
              <i className={`fas ${cap.icon} text-2xl`}></i>
            </div>
            <h3 className="text-xl font-orbitron font-bold mb-3">{cap.title}</h3>
            <p className="text-gray-400 leading-relaxed text-sm">{cap.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Features;
