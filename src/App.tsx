import React, { useState, useEffect } from 'react';
import { Navbar, Footer, X, Bell, ArrowUp, Zap } from './components/common';
import { HomePage } from './pages/HomePage';
import { ArticlePage } from './pages/ArticlePage';
import { ReviewsPage } from './pages/ReviewsPage';
import { EsportsPage } from './pages/EsportsPage';
import { DealsPage } from './pages/DealsPage';
import { AnimatePresence, motion } from 'motion/react';

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showTopButton, setShowTopButton] = useState(false);
  const [showNewsletter, setShowNewsletter] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [savedArticles, setSavedArticles] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('saved_articles');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
          const progress = (window.scrollY / scrollHeight) * 100;
          setScrollProgress(progress);
          setShowTopButton(window.scrollY > 400);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Newsletter bar delay
    if (!sessionStorage.getItem('newsletter_closed')) {
      const timer = setTimeout(() => setShowNewsletter(true), 3000);
      return () => clearTimeout(timer);
    }
  }, []);

  useEffect(() => {
    // Exit-intent (desktop) and time-based (mobile)
    const isMobile = /Mobi|Android/i.test(navigator.userAgent);
    
    if (localStorage.getItem('popup_shown')) return;

    if (!isMobile) {
      const handleMouseMove = (e: MouseEvent) => {
        if (e.clientY < window.innerHeight * 0.1) {
          setShowPopup(true);
          localStorage.setItem('popup_shown', 'true');
          document.removeEventListener('mousemove', handleMouseMove);
        }
      };
      document.addEventListener('mousemove', handleMouseMove);
      return () => document.removeEventListener('mousemove', handleMouseMove);
    } else {
      const timer = setTimeout(() => {
        setShowPopup(true);
        localStorage.setItem('popup_shown', 'true');
      }, 45000);
      return () => clearTimeout(timer);
    }
  }, []);

  useEffect(() => {
    // Notification prompt
    const timer = setTimeout(() => {
      if (Notification.permission !== 'granted') {
        setShowNotification(true);
      }
    }, 20000);
    return () => clearTimeout(timer);
  }, []);

    const toggleSaveArticle = (id: string) => {
      setSavedArticles(prev => {
        const newSaved = prev.includes(id) 
          ? prev.filter(item => item !== id)
          : [...prev, id];
        try {
          localStorage.setItem('saved_articles', JSON.stringify(newSaved));
        } catch (e) {}
        return newSaved;
      });
    };

  const handleNotificationRequest = async () => {
    const permission = await Notification.requestPermission();
    if (permission === 'granted') {
      new Notification('Gaming Pulse', { body: 'Welcome to the inner circle!' });
    }
    setShowNotification(false);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigate = (page: string) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  return (
    <div className="min-h-screen bg-brand-bg flex flex-col font-body text-brand-text relative overflow-x-hidden selection:bg-brand-cyan selection:text-brand-bg">
      {/* Read Progress Bar */}
      <div className="fixed top-0 left-0 h-1 bg-brand-cyan z-[200] transition-all duration-100 ease-out" 
           style={{ width: `${scrollProgress}%` }}>
      </div>

      <div className="scanline z-[100]"></div>
      
      {/* Noise Grain Overlay */}
      <svg className="hidden">
        <filter id="noiseFilter">
          <feTurbulence type="fractalNoise" baseFrequency="0.6" numOctaves="3" stitchTiles="stitch" />
        </filter>
      </svg>
      <div className="noise z-[99] pointer-events-none" style={{ filter: 'url(#noiseFilter)' }}></div>

      <AnimatePresence>
        {showNewsletter && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 40, opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="fixed top-0 left-0 right-0 z-[110] bg-brand-cyan text-brand-bg flex items-center justify-center px-4 overflow-hidden"
          >
            <div className="max-w-[1600px] w-full flex items-center justify-between">
              <div className="flex-1 text-center font-mono text-[10px] md:text-xs font-black uppercase tracking-wider">
                Join 2.4M gamers — Get the weekly Pulse digest <span className="hidden sm:inline">FREE →</span>
              </div>
              <div className="flex items-center gap-3">
                <input 
                  type="email" 
                  placeholder="EMAIL_ADDR" 
                  className="bg-brand-bg/10 border-b border-brand-bg/30 text-[10px] px-2 py-0.5 placeholder:text-brand-bg/50 focus:outline-none"
                />
                <button className="bg-brand-bg text-brand-cyan text-[10px] font-black px-3 py-0.5 italic">JOIN</button>
                <X 
                  size={16} 
                  className="cursor-pointer hover:rotate-90 transition-transform" 
                  onClick={() => { setShowNewsletter(false); sessionStorage.setItem('newsletter_closed', 'true'); }} 
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <Navbar onNavigate={handleNavigate} savedCount={savedArticles.length} />

      <AnimatePresence mode="wait">
        <motion.div
          key={currentPage}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 10 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
        >
          {currentPage === 'home' ? (
            <HomePage 
              onNavigate={handleNavigate} 
              savedArticles={savedArticles}
              onToggleSave={toggleSaveArticle}
            />
          ) : currentPage === 'reviews' ? (
            <ReviewsPage onNavigate={handleNavigate} />
          ) : currentPage === 'esports' ? (
            <EsportsPage onNavigate={handleNavigate} />
          ) : currentPage === 'deals' ? (
            <DealsPage onNavigate={handleNavigate} />
          ) : (
            <ArticlePage onNavigate={handleNavigate} />
          )}
        </motion.div>
      </AnimatePresence>

      <Footer />

      {/* Back to Top */}
      <AnimatePresence>
        {showTopButton && (
          <motion.button
            initial={{ opacity: 0, scale: 0.5, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.5, y: 20 }}
            onClick={scrollToTop}
            className="fixed bottom-20 md:bottom-10 right-6 w-12 h-12 bg-zinc-900 border border-brand-cyan text-brand-cyan rounded-full flex items-center justify-center shadow-neon-cyan z-[50] group active:scale-90 transition-transform"
          >
            <ArrowUp size={24} className="group-hover:-translate-y-1 transition-transform" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Push Notification Toast */}
      <AnimatePresence>
        {showNotification && (
          <motion.div
            initial={{ x: 300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 300, opacity: 0 }}
            className="fixed bottom-24 md:bottom-10 right-6 z-[80] bg-brand-secondary border-l-4 border-brand-lime p-5 shadow-2xl max-w-xs"
          >
            <div className="flex gap-4">
              <div className="w-10 h-10 bg-brand-lime flex items-center justify-center shrink-0">
                <Bell size={20} className="text-brand-bg" />
              </div>
              <div className="space-y-3">
                <div>
                  <h4 className="font-heading italic font-black text-sm">INTEL_ALERT</h4>
                  <p className="text-xs text-brand-muted">Get breaking gaming news instantly in your browser.</p>
                </div>
                <div className="flex gap-2">
                  <button 
                    onClick={handleNotificationRequest}
                    className="flex-1 bg-brand-lime text-brand-bg font-mono font-black text-[10px] py-2 uppercase italic"
                  >
                    Enable Alerts
                  </button>
                  <button 
                    onClick={() => setShowNotification(false)}
                    className="px-4 border border-brand-border text-brand-muted font-mono font-black text-[10px] py-2 uppercase hover:text-white transition-colors"
                  >
                    Later
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Exit Intent Popup */}
      <AnimatePresence>
        {showPopup && (
          <div className="fixed inset-0 z-[150] flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowPopup(false)}
              className="absolute inset-0 bg-brand-bg/90 backdrop-blur-md"
            ></motion.div>
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative bg-brand-secondary border-2 border-brand-lime p-8 md:p-12 max-w-xl w-full overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-4">
                <X size={24} className="text-brand-muted cursor-pointer hover:text-brand-lime" onClick={() => setShowPopup(false)} />
              </div>
              <div className="space-y-6 text-center relative z-10">
                <div className="w-16 h-16 bg-brand-lime flex items-center justify-center mx-auto shadow-neon-lime mb-8 rotate-3">
                  <Zap size={40} className="text-brand-bg fill-current" />
                </div>
                <h2 className="text-4xl md:text-5xl font-black italic font-heading tracking-tighter">WAIT — FREE <span className="text-brand-lime">PULSE Energy?</span></h2>
                <p className="text-brand-muted leading-relaxed">
                  Subscribe to our internal whitelist and get entered into our monthly prize draw for a <span className="text-white font-bold">12-Pack of PULSE Energy</span>.
                </p>
                <div className="space-y-4 pt-4">
                  <input 
                    type="email" 
                    placeholder="ENTER_YOUR_SIGNAL_ADDRESS"
                    className="w-full bg-brand-bg border border-brand-border p-4 font-heading italic text-lg focus:border-brand-lime outline-none transition-colors"
                  />
                  <button className="w-full bg-brand-lime text-brand-bg font-heading py-5 font-black italic text-xl shadow-neon-lime hover:scale-[1.02] active:scale-95 transition-all uppercase tracking-tighter">
                    CLAIM MY ENTRY
                  </button>
                  <button 
                    onClick={() => setShowPopup(false)}
                    className="text-[10px] font-mono font-black text-brand-muted uppercase tracking-widest hover:text-brand-red transition-colors"
                  >
                    No thanks, I don't want free energy drinks
                  </button>
                </div>
              </div>
              <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-brand-lime opacity-5 blur-[100px] rounded-full"></div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
