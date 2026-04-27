import React, { ReactNode, useState, useEffect } from 'react';
import { 
  Zap, 
  Search, 
  History, 
  Monitor, 
  Mail,
  Cpu,
  Gamepad2,
  Smartphone,
  Menu,
  X,
  Home,
  Newspaper,
  Star,
  Users,
  Bookmark,
  Bell,
  ArrowUp,
  Tag as TagIcon
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// Re-export icons for global use
export { Zap, X, Bell, ArrowUp, Bookmark };

export const PlatformBadge: React.FC<{ platform: string }> = ({ platform }) => {
  const styles: Record<string, string> = {
    PC: 'bg-brand-cyan/20 text-brand-cyan border-brand-cyan/30',
    PS5: 'bg-blue-600/20 text-blue-400 border-blue-600/30',
    Xbox: 'bg-green-600/20 text-green-400 border-green-600/30',
    Nintendo: 'bg-red-600/20 text-red-400 border-red-600/30',
    Mobile: 'bg-yellow-600/20 text-yellow-400 border-yellow-600/30',
    VR: 'bg-purple-600/20 text-purple-400 border-purple-600/30',
  };

  return (
    <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-sm border font-mono text-[9px] uppercase tracking-wider font-bold ${styles[platform] || styles.PC}`}>
      {platform}
    </span>
  );
};

export const Tag = ({ type, children, className = "" }: { type: string, children: ReactNode, className?: string }) => {
  const styles: Record<string, string> = {
    breaking: 'bg-brand-red text-white animate-pulse',
    review: 'bg-brand-lime text-brand-bg',
    trailer: 'bg-brand-cyan text-brand-bg',
    rumor: 'bg-brand-muted/20 text-brand-muted border border-brand-muted/30',
    esports: 'bg-white text-brand-bg',
    live: 'bg-brand-red text-white flex items-center gap-1',
  };

  return (
    <span className={`inline-block px-1.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.15em] font-black ${styles[type.toLowerCase()] || 'bg-brand-secondary text-brand-text'} ${className}`}>
      {children}
    </span>
  );
};

export const PulseScore = ({ score, size = "md" }: { score: number, size?: "sm" | "md" | "lg" }) => {
  const getColor = (s: number) => {
    if (s >= 80) return 'text-brand-lime shadow-neon-lime border-brand-lime';
    if (s >= 50) return 'text-brand-cyan shadow-neon-cyan border-brand-cyan';
    return 'text-brand-red shadow-neon-red border-brand-red';
  };

  const sizes = {
    sm: 'w-10 h-10 border text-md',
    md: 'w-14 h-14 border-2 text-xl',
    lg: 'w-20 h-20 border-2 text-3xl',
  };

  return (
    <div className={`inline-flex flex-col items-center justify-center bg-brand-bg/80 backdrop-blur-sm font-heading italic ${sizes[size]} ${getColor(score)}`}>
      <span className="font-black leading-none">{score}</span>
      <span className="text-[7px] font-mono tracking-widest uppercase opacity-80">Pulse</span>
    </div>
  );
};

export const Navbar = ({ onNavigate, savedCount = 0 }: { onNavigate: (page: string) => void, savedCount?: number }) => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = ['Home', 'News', 'Reviews', 'Videos', 'Esports', 'Deals'];

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-[60] transition-all duration-500 border-b ${scrolled ? 'bg-brand-bg/95 backdrop-blur-md h-16 md:h-20 border-brand-cyan/20 shadow-2xl' : 'bg-transparent h-20 md:h-32 border-transparent'}`}>
        <div className="max-w-[1600px] mx-auto px-4 md:px-6 h-full flex flex-col justify-center">
          <div className="flex items-center justify-between">
            <div 
              role="button"
              aria-label="Go to home"
              onClick={() => { onNavigate('home'); setMenuOpen(false); }} 
              className="flex items-center gap-2 cursor-pointer group"
            >
              <div className="w-8 h-8 bg-brand-cyan flex items-center justify-center shadow-neon-cyan group-hover:rotate-12 transition-transform">
                <Zap size={20} className="text-brand-bg fill-current" aria-hidden="true" />
              </div>
              <h1 className="text-xl md:text-2xl font-black italic tracking-tighter font-heading group-hover:text-brand-cyan transition-colors">
                GAMING <span className="text-brand-cyan">PULSE</span>
              </h1>
            </div>

            <ul className="hidden lg:flex items-center gap-8 font-mono text-xs font-black uppercase tracking-widest" role="list">
              {navItems.map((item) => (
                <li key={item} 
                    role="listitem"
                    onClick={() => {
                      const page = item.toLowerCase();
                      if (page === 'home') onNavigate('home');
                      else if (page === 'reviews') onNavigate('reviews');
                      else if (page === 'esports') onNavigate('esports');
                      else if (page === 'deals') onNavigate('deals');
                      else onNavigate('news');
                    }}
                    className="cursor-pointer hover:text-brand-cyan transition-colors relative group py-2">
                  <button aria-label={`Navigate to ${item}`} className="flex items-center">
                    {item}
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-brand-cyan transition-all group-hover:w-full"></span>
                  </button>
                </li>
              ))}
            </ul>

            <div className="flex items-center gap-4 md:gap-6">
              <button 
                className="relative group/saved cursor-pointer bg-transparent border-none p-0"
                aria-label={`View ${savedCount} saved articles`}
              >
                <Bookmark size={18} className="text-brand-muted group-hover/saved:text-brand-cyan transition-colors" />
                {savedCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-brand-cyan text-brand-bg font-mono font-black text-[9px] px-1 rounded-sm animate-pulse">
                    {savedCount}
                  </span>
                )}
              </button>
              <button aria-label="Open search" className="bg-transparent border-none p-0">
                <Search size={18} className="text-brand-muted hover:text-brand-cyan cursor-pointer transition-colors" />
              </button>
              <button 
                aria-label="Get the drink - Pulse Energy"
                className="hidden md:block bg-brand-lime text-brand-bg font-heading px-6 py-2 text-xs font-black italic tracking-tighter hover:shadow-neon-lime transition-all active:scale-95"
              >
                GET THE DRINK
              </button>
              <button 
                onClick={() => setMenuOpen(!menuOpen)}
                aria-label={menuOpen ? "Close menu" : "Open menu"}
                aria-expanded={menuOpen}
                className="lg:hidden w-10 h-10 flex items-center justify-center border border-brand-border text-brand-cyan bg-brand-secondary active:scale-90 transition-transform"
              >
                {menuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[55] bg-brand-bg pt-24 px-6 md:hidden overflow-y-auto"
          >
            <div className="flex flex-col gap-6">
              <div className="space-y-4">
                <h3 className="text-[10px] font-mono font-black text-brand-cyan tracking-[0.3em] uppercase">SYSTEM_LINKS</h3>
                <div className="grid grid-cols-1 gap-2">
                  {navItems.map((item) => (
                    <button 
                      key={item}
                      onClick={() => { 
                        const page = item.toLowerCase();
                        if (page === 'home') onNavigate('home');
                        else if (page === 'reviews') onNavigate('reviews');
                        else if (page === 'esports') onNavigate('esports');
                        else if (page === 'deals') onNavigate('deals');
                        else onNavigate('news');
                        setMenuOpen(false); 
                      }}
                      className="w-full text-left py-4 px-4 border border-brand-border bg-brand-secondary font-heading italic font-black text-lg hover:border-brand-cyan transition-colors"
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-4 pt-6">
                <h3 className="text-[10px] font-mono font-black text-brand-cyan tracking-[0.3em] uppercase">QUICK_FILTERS</h3>
                <div className="grid grid-cols-3 gap-2">
                  {['PC', 'PS5', 'Xbox', 'Switch', 'Mobile', 'VR'].map(p => (
                    <div key={p} className="bg-brand-secondary border border-brand-border p-3 text-center">
                      <span className="text-[9px] font-mono font-black uppercase text-brand-muted">{p}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-8">
                <button className="w-full bg-brand-lime text-brand-bg font-heading py-4 font-black italic italic tracking-tighter shadow-neon-lime">
                  GET THE DRINK
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Bottom Navigation Bar */}
      <div className="fixed bottom-0 left-0 right-0 h-16 bg-brand-bg/95 backdrop-blur-md border-t border-brand-border z-[60] flex items-center justify-around md:hidden px-2 shadow-[0_-10px_20px_rgba(0,0,0,0.5)]">
        {[
          { label: 'Home', icon: Home, page: 'home' },
          { label: 'Deals', icon: TagIcon, page: 'deals' },
          { label: 'Reviews', icon: Star, page: 'reviews' },
          { label: 'Esports', icon: Users, page: 'esports' },
          { label: 'Search', icon: Search, page: 'home' },
        ].map((item) => (
          <button 
            key={item.label}
            onClick={() => onNavigate(item.page)}
            aria-label={`Navigate to ${item.label}`}
            className="flex flex-col items-center gap-1 text-brand-muted hover:text-brand-cyan transition-colors active:scale-95"
          >
            <item.icon size={20} aria-hidden="true" />
            <span className="text-[8px] font-mono font-black uppercase tracking-tighter">{item.label}</span>
          </button>
        ))}
      </div>
    </>
  );
};

export const Footer = () => (
  <footer className="mt-20 md:mt-32 relative group pb-24 md:pb-0" aria-label="Site Footer">
    <div className="absolute inset-0 bg-brand-secondary opacity-50 scanline pointer-events-none"></div>
    <div className="max-w-[1600px] mx-auto px-6 md:px-10 py-12 md:py-20 relative z-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12 md:gap-16">
        <div className="col-span-1 md:col-span-1 space-y-6">
          <h2 className="text-2xl font-black italic font-heading tracking-tighter">GAMING <span className="text-brand-cyan">PULSE™</span></h2>
          <p className="text-xs text-brand-muted leading-relaxed font-medium">
            The premier digital intelligence hub for serious gamers. 
            Fueled by PULSE Energy. Made for the grind.
          </p>
          <div className="flex gap-4">
             {[1, 2, 3, 4, 5].map(i => (
               <button 
                 key={i} 
                 aria-label={`Social link ${i}`}
                 className="w-8 h-8 rounded-sm bg-brand-card border border-brand-border hover:border-brand-cyan hover:text-brand-cyan transition-all grid place-items-center cursor-pointer"
               >
                  <Zap size={14} aria-hidden="true" />
               </button>
             ))}
          </div>
        </div>

        <div className="space-y-6">
          <h3 className="font-mono text-[10px] text-brand-cyan tracking-[0.3em] font-black uppercase">Platforms</h3>
          <ul className="space-y-3 font-mono text-[10px] uppercase font-bold text-brand-muted tracking-widest" role="list">
            {['PC_MASTER_RACE', 'PS5_PROTOCOLS', 'XBOX_HIVE', 'NINTENDO_SWITCH_CORE', 'VR_AR_DIMENSIONS'].map(l => (
              <li key={l} role="listitem">
                <button aria-label={`View ${l.replace(/_/g, ' ')} items`} className="hover:text-brand-lime cursor-pointer transition-colors text-left uppercase">
                  {l}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-6">
           <h3 className="font-mono text-[10px] text-brand-cyan tracking-[0.3em] font-black uppercase">Categories</h3>
           <ul className="space-y-3 font-mono text-[10px] uppercase font-bold text-brand-muted tracking-widest" role="list">
              {['BREAKING_INTEL', 'PULSE_REVIEWS', 'ESPORTS_LIVE', 'TECH_BENCHMARKS', 'GAME_DEALS'].map(l => (
                <li key={l} role="listitem">
                   <button aria-label={`View ${l.replace(/_/g, ' ')} items`} className="hover:text-brand-lime cursor-pointer transition-colors text-left uppercase">
                    {l}
                  </button>
                </li>
              ))}
           </ul>
        </div>

        <div className="space-y-6">
           <h3 className="font-mono text-[10px] text-brand-cyan tracking-[0.3em] font-black uppercase">System</h3>
           <ul className="space-y-3 font-mono text-[10px] uppercase font-bold text-brand-muted tracking-widest" role="list">
              {['PRIVACY_ENCRYPTION', 'TERMS_OF_ENGAGEMENT', 'ABOUT_GAMING_PULSE', 'CONTACT_HQ'].map(l => (
                <li key={l} role="listitem">
                   <button aria-label={`View ${l.replace(/_/g, ' ')} page`} className="hover:text-brand-lime cursor-pointer transition-colors text-left uppercase">
                    {l}
                  </button>
                </li>
              ))}
           </ul>
        </div>
      </div>

      <div className="mt-20 pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
         <div className="font-mono text-[10px] text-brand-muted uppercase tracking-[0.3em]">
            © 2026 PULSE ENERGY INTERACTIVE // MADE FOR GAMERS BY GAMERS
         </div>
         <div className="flex items-center gap-8">
            <div className="flex items-center gap-2 text-[10px] font-mono text-brand-lime">
               <History size={12} /> UPTIME: 99.9%
            </div>
            <div className="flex items-center gap-2 text-[10px] font-mono text-brand-cyan">
               <Monitor size={12} /> BUILD: 5.4.1-PULSE
            </div>
         </div>
      </div>
    </div>
  </footer>
);
