
import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Features from './components/Features';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ChatInterface from './components/ChatInterface';
import Login from './components/Login';
import LeadsDashboard from './components/LeadsDashboard';
import { AuthState } from './types';

const App: React.FC = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [auth, setAuth] = useState<AuthState>({ isAuthenticated: false, user: null });
  const [view, setView] = useState<'landing' | 'dashboard'>('landing');

  useEffect(() => {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('opacity-100', 'translate-y-0');
          entry.target.classList.remove('opacity-0', 'translate-y-10');
        }
      });
    }, { threshold: 0.1 });

    const revealElements = document.querySelectorAll('.scroll-reveal');
    revealElements.forEach(el => revealObserver.observe(el));

    const activeSectionObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, { threshold: 0.5 });

    const sections = ['home', 'about', 'features', 'contact'];
    sections.forEach(id => {
      const el = document.getElementById(id);
      if (el) activeSectionObserver.observe(el);
    });

    return () => {
      revealObserver.disconnect();
      activeSectionObserver.disconnect();
    };
  }, [view]);

  const handleLoginSuccess = (user: string) => {
    setAuth({ isAuthenticated: true, user });
    setIsLoginOpen(false);
    setView('dashboard');
  };

  const handleLogout = () => {
    setAuth({ isAuthenticated: false, user: null });
    setView('landing');
  };

  if (view === 'dashboard' && auth.isAuthenticated) {
    return (
      <div className="relative min-h-screen bg-[#050505]">
        <div className="grid-bg"></div>
        <Navbar 
          onOpenChat={() => setIsChatOpen(true)} 
          activeSection="dashboard" 
          isAuthenticated={auth.isAuthenticated}
          onLogout={handleLogout}
          onSwitchView={() => setView('landing')}
        />
        <LeadsDashboard />
        <ChatInterface isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-[#050505]">
      <div className="grid-bg"></div>
      
      <Navbar 
        onOpenChat={() => setIsChatOpen(true)} 
        activeSection={activeSection} 
        isAuthenticated={auth.isAuthenticated}
        onLoginClick={() => setIsLoginOpen(true)}
        onSwitchView={() => setView('dashboard')}
      />
      
      <main>
        <Hero onOpenChat={() => setIsChatOpen(true)} />
        <About />
        <Features />
        <Contact />
      </main>

      <Footer />

      <button 
        onClick={() => setIsChatOpen(true)}
        className="fixed bottom-8 right-8 z-40 w-16 h-16 rounded-full bg-cyan-500 text-black flex items-center justify-center shadow-[0_0_20px_rgba(0,243,255,0.5)] hover:scale-110 transition-transform active:scale-95 group"
        aria-label="Open Neural Interface"
      >
        <i className="fas fa-robot text-2xl group-hover:animate-pulse"></i>
      </button>

      <ChatInterface isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
      <Login isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} onLoginSuccess={handleLoginSuccess} />
    </div>
  );
};

export default App;
