import React, { useState, useEffect } from 'react';

export const BottomNav: React.FC = () => {
  const [activeSection, setActiveSection] = useState('hero');
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const navItems = [
    { id: 'hero', label: 'Home', icon: '🏠' },
    { id: 'projects', label: 'Work', icon: '💼' },
    { id: 'skills', label: 'Skills', icon: '⚡' },
    { id: 'about', label: 'About', icon: '👤' },
    { id: 'contact', label: 'Contact', icon: '✉️' }
  ];

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY && currentScrollY > 150) {
        setIsVisible(false); // Hide on scroll down
      } else {
        setIsVisible(true); // Show on scroll up
      }
      setLastScrollY(currentScrollY);

      // Track active section in viewport
      const sections = ['hero', 'projects', 'skills', 'about', 'contact'];
      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= window.innerHeight * 0.4 && rect.bottom >= window.innerHeight * 0.2) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return (
    <nav
      className={`fixed bottom-4 left-1/2 -translate-x-1/2 z-40 md:hidden w-[92%] max-w-sm rounded-full bg-[#0c101c]/80 backdrop-blur-xl border border-white/10 p-1.5 shadow-[0_8px_32px_rgba(0,0,0,0.6)] transition-all duration-300 ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0 pointer-events-none'
      }`}
      role="navigation"
      aria-label="Mobile Bottom Navigation"
    >
      <div className="flex items-center justify-around relative">
        {navItems.map((item) => {
          const isActive = activeSection === item.id;
          return (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={() => setActiveSection(item.id)}
              className={`relative z-10 min-h-[44px] flex flex-col items-center justify-center py-1 px-3 rounded-full text-[10px] font-mono font-medium transition-colors ${
                isActive ? 'text-white' : 'text-white/60 hover:text-white'
              }`}
            >
              <span className="text-base mb-0.5">{item.icon}</span>
              <span>{item.label}</span>
              {isActive && (
                <span className="absolute inset-0 bg-[#5B5BFF]/30 border border-[#5B5BFF]/60 rounded-full -z-10 shadow-[0_0_12px_rgba(91,91,255,0.4)]" />
              )}
            </a>
          );
        })}
      </div>
    </nav>
  );
};
