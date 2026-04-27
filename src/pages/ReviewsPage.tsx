import React, { useState } from 'react';
import { 
  Star, 
  ArrowRight, 
  Filter, 
  ChevronDown, 
  CheckCircle2, 
  XCircle,
  Trophy,
  Gamepad2,
  Calendar,
  User,
  Zap
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { PlatformBadge, Tag, PulseScore } from '../components/common';

const ReviewCard: React.FC<{ review: any, index: number }> = ({ review, index }) => {
  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-brand-lime border-brand-lime';
    if (score >= 60) return 'text-yellow-400 border-yellow-400';
    return 'text-brand-red border-brand-red';
  };

  const getVerdictColor = (verdict: string) => {
    switch (verdict) {
      case 'ESSENTIAL': return 'bg-brand-lime text-brand-bg';
      case 'GREAT': return 'bg-brand-cyan text-brand-bg';
      case 'GOOD': return 'bg-blue-500 text-white';
      case 'AVERAGE': return 'bg-yellow-500 text-brand-bg';
      case 'SKIP': return 'bg-brand-red text-white';
      default: return 'bg-zinc-700 text-white';
    }
  };

  return (
    <motion.article 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="group bg-white border-4 border-black hover:-translate-y-2 hover:shadow-[10px_10px_0px_#EE1D23] transition-all duration-500 flex flex-col relative overflow-hidden shadow-comic"
    >
      <div className={`aspect-video w-full relative overflow-hidden bg-gradient-to-br ${review.color} border-b-4 border-black`}>
        <div className="absolute inset-0 halftone opacity-20"></div>
        <div className="absolute top-4 left-4 flex flex-wrap gap-2">
          {review.platforms.map((p: string) => (
             <PlatformBadge key={p} platform={p} />
          ))}
        </div>
        <div className="absolute top-4 right-4 group-hover:scale-110 transition-transform duration-500 p-1 bg-white border-2 border-black rotate-[-3deg]">
           <PulseScore score={review.score} size="sm" />
        </div>
      </div>

      <div className="p-6 flex-1 flex flex-col bg-white">
        <div className="flex items-center gap-2 mb-3">
          <Tag type="intel">{review.genre}</Tag>
          <span className={`text-[12px] font-heading font-black italic py-1 px-4 border-2 border-black rotate-3 ${getVerdictColor(review.verdict)} text-black`}>
            {review.verdict}!
          </span>
        </div>
        
        <h3 className="text-3xl font-heading font-black italic mb-2 tracking-tighter group-hover:text-brand-red transition-colors text-black leading-none uppercase">
          {review.title}
        </h3>

        <p className="text-sm text-black font-bold italic leading-tight mb-6 line-clamp-2 uppercase">
          "{review.quote}"
        </p>

        <div className="mt-auto pt-6 border-t-2 border-black flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="text-sm font-heading font-black italic text-black uppercase">{review.author}</div>
          </div>
          <button className="comic-btn bg-brand-lime p-2">
            <ArrowRight size={18} className="text-black" />
          </button>
        </div>
      </div>
    </motion.article>
  );
};

export const ReviewsPage = ({ onNavigate }: { onNavigate: (page: string) => void }) => {
  const [activePlatform, setActivePlatform] = useState('ALL');
  const [scoreFilter, setScoreFilter] = useState('All');
  const [sortBy, setSortBy] = useState('Latest');

  const platforms = ['ALL', 'PC', 'PS5', 'XBOX', 'NINTENDO', 'MOBILE', 'VR'];
  const scoreRanges = ['All', '90–100', '80–89', '70–79', 'Below 70'];

  const reviews = [
    { id: 1, title: "Cyberpunk 2077: Phantom Liberty", developer: "CD Projekt Red", platforms: ["PC", "PS5", "Xbox"], genre: "RPG", score: 92, verdict: "ESSENTIAL", quote: "A redemptive masterpiece that redefines the genre's boundaries.", author: "JAXON DRIFT", date: "SEP 2024", color: "from-yellow-600/40 to-black" },
    { id: 2, title: "Super Mario Wonder", developer: "Nintendo EPD", platforms: ["Nintendo"], genre: "Platformer", score: 94, verdict: "ESSENTIAL", quote: "Pure, distilled joy in every frame. A psychedelic platforming triumph.", author: "MARCUS WEBB", date: "OCT 2024", color: "from-red-600/40 to-black" },
    { id: 3, title: "Lies of P", developer: "Neowiz Games", platforms: ["PC", "PS5"], genre: "Soulslike", score: 86, verdict: "GREAT", quote: "The best Soulslike not made by FromSoftware, with a dark, clockwork heart.", author: "CYRUS VANCE", date: "OCT 2024", color: "from-blue-800/40 to-black" },
    { id: 4, title: "Starfield", developer: "Bethesda Game Studios", platforms: ["PC", "Xbox"], genre: "RPG", score: 78, verdict: "GOOD", quote: "Staggering in scale but occasionally lost in the void of its own ambition.", author: "ELARA KANE", date: "SEP 2024", color: "from-indigo-900/40 to-black" },
    { id: 5, title: "Alan Wake 2", developer: "Remedy Entertainment", platforms: ["PC", "PS5", "Xbox"], genre: "Horror", score: 91, verdict: "GREAT", quote: "A mind-bending psychological thriller that blurs reality and fiction.", author: "JAXON DRIFT", date: "NOV 2024", color: "from-gray-800/40 to-black" },
    { id: 6, title: "Baldur's Gate 3", developer: "Larian Studios", platforms: ["PC", "PS5", "Xbox"], genre: "RPG", score: 97, verdict: "ESSENTIAL", quote: "A new gold standard for RPGs. Your choices actually matter here.", author: "MARCUS WEBB", date: "AUG 2024", color: "from-purple-900/40 to-black" },
    { id: 7, title: "Assassin's Creed Mirage", developer: "Ubisoft", platforms: ["PC", "PS5", "Xbox"], genre: "Action", score: 72, verdict: "AVERAGE", quote: "A back-to-basics approach that feels a bit too familiar in 2024.", author: "CYRUS VANCE", date: "OCT 2024", color: "from-amber-600/40 to-black" },
    { id: 8, title: "Modern Warfare III", developer: "Sledgehammer Games", platforms: ["PC", "PS5", "Xbox"], genre: "Shooter", score: 58, verdict: "SKIP", quote: "A glorified DLC that struggles to justify its premium price tag.", author: "ELARA KANE", date: "NOV 2024", color: "from-red-900/40 to-black" },
  ];

  return (
    <main className="mt-20 md:mt-32 overflow-hidden">
      {/* PAGE HERO */}
      <section className="relative py-24 md:py-40 bg-brand-red border-b-8 border-black shadow-[0_10px_0_rgba(0,0,0,1)] overflow-hidden">
        <div className="absolute inset-0 halftone opacity-20 pointer-events-none"></div>
        <div className="max-w-[1600px] mx-auto px-6 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-block px-4 py-2 bg-white border-2 border-black text-brand-red font-heading text-lg font-black uppercase tracking-widest mb-8 rotate-[-1deg]"
          >
            FIELD_REPORTS!
          </motion.div>
          <h1 className="text-[clamp(60px,15vw,160px)] font-black italic tracking-wider leading-[0.8] mb-8 text-white drop-shadow-[8px_8px_0px_#000]">
            REVIEWS!
          </h1>
          <p className="text-2xl md:text-4xl font-heading font-black italic text-white mb-12 uppercase tracking-tighter drop-shadow-[2px_2px_0px_#000]">
            Honest scores. <span className="text-brand-lime">Zero sponsored opinions!</span>
          </p>
          
          <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-20 py-10">
             <div className="text-center p-6 bg-white border-4 border-black shadow-comic rotate-[-2deg]">
                <div className="text-5xl font-heading font-black italic text-brand-red mb-1">2,847</div>
                <div className="text-xs font-heading font-black text-black uppercase tracking-widest">REVIEWS_LOGGED!</div>
             </div>
             <div className="text-center p-6 bg-white border-4 border-black shadow-comic rotate-[1deg]">
                <div className="text-5xl font-heading font-black italic text-brand-lime mb-1">94.2%</div>
                <div className="text-xs font-heading font-black text-black uppercase tracking-widest">ACCURACY!</div>
             </div>
          </div>
        </div>
      </section>

      {/* PLATFORM FILTERS */}
      <section className="bg-brand-secondary border-y border-brand-border h-16 sticky top-16 md:top-20 z-40">
        <div className="max-w-[1600px] mx-auto h-full flex items-center px-6 overflow-x-auto no-scrollbar">
          <div className="flex items-center gap-10">
            {platforms.map((p) => (
              <button 
                key={p} 
                onClick={() => setActivePlatform(p)}
                className={`font-mono text-[11px] font-black uppercase tracking-[0.2em] relative py-5 transition-all text-nowrap
                  ${activePlatform === p ? 'text-brand-cyan flex items-center gap-2' : 'text-brand-muted hover:text-brand-text'}`}
              >
                {activePlatform === p && <div className="w-1.5 h-1.5 bg-brand-cyan rounded-full animate-pulse" />}
                {p}
                {activePlatform === p && (
                  <motion.div layoutId="platUnderline" className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-cyan" />
                )}
              </button>
            ))}
          </div>
        </div>
      </section>

      <div className="max-w-[1600px] mx-auto px-6 py-12">
        {/* FEATURED REVIEW */}
        <section className="mb-20">
           <div className="bg-brand-card border-2 border-brand-lime shadow-neon-lime relative group overflow-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-2">
                 <div className="aspect-video relative overflow-hidden bg-brand-bg">
                    <img 
                      src="https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=2670&auto=format&fit=crop" 
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" 
                      alt="Elden Ring" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-brand-bg via-transparent to-transparent"></div>
                    <div className="absolute top-6 left-6 flex gap-3">
                       <Tag type="breaking">FEATURED_INTEL</Tag>
                       <PlatformBadge platform="PC" />
                       <PlatformBadge platform="PS5" />
                    </div>
                 </div>
                 <div className="p-8 md:p-12 flex flex-col justify-center relative">
                    <div className="absolute top-12 right-12">
                       <div className="relative">
                          <PulseScore score={97} size="lg" />
                       </div>
                    </div>
                    
                    <div className="space-y-6">
                       <div>
                          <h2 className="text-4xl md:text-6xl font-black italic tracking-tighter uppercase leading-[0.9] mb-4">
                            ELDEN RING:<br/><span className="text-brand-lime">NIGHTREIGN</span>
                          </h2>
                          <div className="flex items-center gap-4 text-xs font-mono font-black text-brand-muted uppercase">
                             <span>FROM_SOFTWARE</span>
                             <span>/</span>
                             <span>ACTION_RPG</span>
                          </div>
                       </div>

                       <div className="grid grid-cols-1 md:grid-cols-2 gap-8 py-8 border-y border-white/5">
                          <div className="space-y-3">
                             <h4 className="text-[10px] font-mono font-black text-brand-lime tracking-widest uppercase">PROS(+)</h4>
                             <ul className="space-y-2">
                                {["Peerless world design", "Intuitive difficulty spikes", "Sublime lighting engine"].map(p => (
                                  <li key={p} className="flex items-center gap-2 text-xs font-medium text-brand-text/80">
                                     <CheckCircle2 size={14} className="text-brand-lime shrink-0" /> {p}
                                  </li>
                                ))}
                             </ul>
                          </div>
                          <div className="space-y-3">
                             <h4 className="text-[10px] font-mono font-black text-brand-red tracking-widest uppercase">CONS(-)</h4>
                             <ul className="space-y-2">
                                {["Performance hit in DLC zones", "Minimal UI can be cryptic"].map(p => (
                                  <li key={p} className="flex items-center gap-2 text-xs font-medium text-brand-text/80">
                                     <XCircle size={14} className="text-brand-red shrink-0" /> {p}
                                  </li>
                                ))}
                             </ul>
                          </div>
                       </div>

                       <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                             <div className="px-6 py-2 bg-brand-lime text-brand-bg font-heading italic font-black text-sm tracking-tighter">
                                ESSENTIAL
                             </div>
                             <p className="text-xs font-medium text-brand-muted italic max-w-xs">
                                "The defining masterpiece of the generation just got better."
                             </p>
                          </div>
                          <button className="hidden md:flex items-center gap-3 bg-brand-bg border border-brand-border px-8 py-4 text-xs font-black italic tracking-widest hover:border-brand-lime hover:text-brand-lime transition-all">
                             READ_FULL_REVIEW <ArrowRight size={16} />
                          </button>
                       </div>
                    </div>
                 </div>
              </div>
           </div>
        </section>

        {/* SCORE FILTER ROW */}
        <section className="mb-12 flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-brand-border pb-8">
           <div className="space-y-4">
              <h4 className="text-[10px] font-mono font-black text-brand-muted tracking-widest uppercase">FILTER_BY_SCORE</h4>
              <div className="flex flex-wrap gap-2">
                 {scoreRanges.map(range => (
                   <button 
                    key={range}
                    onClick={() => setScoreFilter(range)}
                    className={`px-4 py-2 text-[10px] font-mono font-black border transition-all ${scoreFilter === range ? 'bg-white text-brand-bg border-white' : 'bg-brand-secondary border-brand-border text-brand-muted hover:border-brand-text'}`}
                   >
                     {range}
                   </button>
                 ))}
              </div>
           </div>
           <div className="space-y-4 md:text-right">
              <h4 className="text-[10px] font-mono font-black text-brand-muted tracking-widest uppercase">SORT_INTEL</h4>
              <div className="inline-flex items-center gap-4 bg-brand-secondary border border-brand-border px-4 py-2 cursor-pointer group">
                 <span className="text-[10px] font-mono font-black uppercase tracking-widest">{sortBy}</span>
                 <ChevronDown size={14} className="text-brand-muted group-hover:text-brand-cyan transition-colors" />
              </div>
           </div>
        </section>

        {/* REVIEWS GRID */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-24">
           {reviews.map((review, i) => (
             <ReviewCard key={review.id} review={review} index={i} />
           ))}
        </section>

        {/* SCORE EXPLAINER */}
        <section className="bg-white border-8 border-black p-10 mb-24 relative overflow-hidden rotate-[-1deg] shadow-comic">
           <div className="absolute inset-0 halftone opacity-10 pointer-events-none"></div>
           <div className="max-w-4xl relative z-10">
              <h2 className="text-5xl font-black italic font-heading text-black mb-10 flex items-center gap-4">
                <Zap size={40} className="text-brand-red fill-current" /> HOW_WE_SCORE!
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                 <div className="space-y-4 p-4 border-4 border-black bg-brand-lime shadow-comic-sm">
                    <div className="flex items-center gap-3">
                       <span className="text-3xl font-heading font-black italic text-black tracking-widest">80-100</span>
                    </div>
                    <p className="text-lg font-heading font-black text-black leading-none uppercase italic">
                       MASTERPIECE! DEFINES THE GENRE!
                    </p>
                 </div>
                 <div className="space-y-4 p-4 border-4 border-black bg-brand-cyan shadow-comic-sm">
                    <div className="flex items-center gap-3">
                       <span className="text-3xl font-heading font-black italic text-black tracking-widest">60-79</span>
                    </div>
                    <p className="text-lg font-heading font-black text-black leading-none uppercase italic">
                       SOLID EFFORT! WORTH A PLAY!
                    </p>
                 </div>
                 <div className="space-y-4 p-4 border-4 border-black bg-brand-red shadow-comic-sm">
                    <div className="flex items-center gap-3">
                       <span className="text-3xl font-heading font-black italic text-white tracking-widest">0-59</span>
                    </div>
                    <p className="text-lg font-heading font-black text-white leading-none uppercase italic">
                       CRITICAL FAILURE! SKIP IT!!
                    </p>
                 </div>
              </div>
           </div>
        </section>

        {/* PLATFORM DEEP DIVES (Animated Tabs) */}
        <section className="mb-24">
           <div className="flex items-center justify-between mb-10 border-b border-brand-border">
              <h2 className="text-3xl font-black italic font-heading pb-6">SYSTEM_DEEP_DIVES</h2>
              <div className="flex gap-8 pb-6">
                 {['PS5', 'XBOX', 'PC', 'SWITCH'].map(p => (
                   <button key={p} className="text-[10px] font-mono font-black uppercase text-brand-muted hover:text-brand-cyan transition-colors tracking-widest">{p}</button>
                 ))}
              </div>
           </div>
           
           <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="group bg-brand-card border border-brand-border p-4 hover:border-brand-cyan transition-all cursor-pointer">
                   <div className="aspect-video bg-zinc-900 mb-4 border border-white/5 opacity-50 group-hover:opacity-100 transition-opacity"></div>
                   <h4 className="text-sm font-black italic mb-2 tracking-tighter">NEWEST INTEL ON THE PLATFORM #{i}</h4>
                   <div className="flex items-center justify-between">
                      <PlatformBadge platform="PC" />
                      <span className="text-[10px] font-mono font-black text-brand-lime">84</span>
                   </div>
                </div>
              ))}
           </div>
        </section>
      </div>
    </main>
  );
};

const ShieldCheck = ({ className, size }: { className?: string, size?: number }) => (
  <svg 
    width={size || 24} 
    height={size || 24} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    <path d="m9 12 2 2 4-4" />
  </svg>
);
