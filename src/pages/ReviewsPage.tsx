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
      className="group bg-brand-card border border-brand-border hover:border-brand-cyan hover:shadow-neon-cyan transition-all duration-500 flex flex-col relative overflow-hidden"
    >
      <div className={`aspect-video w-full relative overflow-hidden bg-gradient-to-br ${review.color}`}>
        <div className="absolute inset-0 flex items-center justify-center opacity-10">
          <Gamepad2 size={120} className="text-white" />
        </div>
        <div className="absolute top-4 left-4 flex flex-wrap gap-2">
          {review.platforms.map((p: string) => (
             <PlatformBadge key={p} platform={p} />
          ))}
        </div>
        <div className="absolute top-4 right-4 group-hover:scale-110 transition-transform duration-500">
           <PulseScore score={review.score} size="sm" />
        </div>
        {/* Animated Score Bar on Hover */}
        <div className="absolute bottom-0 left-0 h-1 bg-brand-cyan transition-all duration-700 ease-out w-0 group-hover:w-full"></div>
      </div>

      <div className="p-6 flex-1 flex flex-col">
        <div className="flex items-center gap-2 mb-3">
          <Tag type="intel">{review.genre}</Tag>
          <span className={`text-[9px] font-mono font-black py-0.5 px-2 rounded-sm ${getVerdictColor(review.verdict)}`}>
            {review.verdict}
          </span>
        </div>
        
        <h3 className="text-xl font-black italic mb-2 tracking-tighter group-hover:text-brand-cyan transition-colors">
          {review.title}
        </h3>
        <p className="text-[10px] font-mono font-bold text-brand-muted uppercase mb-4">
          Developed by <span className="text-brand-text">{review.developer}</span>
        </p>

        <p className="text-xs text-brand-text/70 italic leading-relaxed mb-6 line-clamp-2">
          "{review.quote}"
        </p>

        <div className="mt-auto pt-6 border-t border-white/5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-brand-bg border border-brand-border flex items-center justify-center overflow-hidden">
               <User size={14} className="text-brand-muted" />
            </div>
            <div>
              <div className="text-[9px] font-black italic">{review.author}</div>
              <div className="text-[8px] font-mono font-bold text-brand-muted">{review.date}</div>
            </div>
          </div>
          <button className="text-brand-cyan hover:translate-x-1 transition-transform">
            <ArrowRight size={18} />
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
      <section className="relative py-20 md:py-32 bg-brand-bg overflow-hidden">
        <div className="absolute inset-0 bg-brand-secondary opacity-50 scanline pointer-events-none"></div>
        <div className="max-w-[1600px] mx-auto px-6 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-block px-4 py-1 bg-brand-cyan/10 border border-brand-cyan/30 text-brand-cyan font-mono text-[10px] font-black uppercase tracking-[0.3em] mb-8"
          >
            FIELD_INTELLIGENCE_REPORTS
          </motion.div>
          <h1 className="text-6xl md:text-[120px] font-black italic tracking-tighter leading-[0.8] mb-8 animate-glitch">
            REVIEWS
          </h1>
          <p className="text-xl md:text-2xl font-black italic text-brand-text/70 mb-12 uppercase tracking-tighter">
            Honest scores. <span className="text-brand-cyan">Zero sponsored opinions.</span>
          </p>
          
          <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-20 border-y border-white/5 py-10">
             <div className="text-center">
                <div className="text-4xl font-black italic text-brand-cyan mb-1">2,847</div>
                <div className="text-[10px] font-mono font-black text-brand-muted uppercase tracking-widest">REVIEWS_LOGGED</div>
             </div>
             <div className="text-center">
                <div className="text-4xl font-black italic text-brand-lime mb-1">94.2%</div>
                <div className="text-[10px] font-mono font-black text-brand-muted uppercase tracking-widest">ACCURACY_RATING</div>
             </div>
             <div className="text-center">
                <div className="text-4xl font-black italic text-brand-red mb-1">112</div>
                <div className="text-[10px] font-mono font-black text-brand-muted uppercase tracking-widest">GAMES_SKIPPED</div>
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
        <section className="bg-brand-secondary/50 border border-brand-border p-10 mb-24 relative overflow-hidden">
           <div className="absolute top-0 right-0 p-10 opacity-5">
              <Star size={120} className="text-white" />
           </div>
           <div className="max-w-4xl">
              <h2 className="text-3xl font-black italic mb-8 flex items-center gap-3">
                <Zap className="text-brand-cyan" /> HOW WE SCORE
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                 <div className="space-y-3">
                    <div className="flex items-center gap-3">
                       <div className="w-3 h-3 bg-brand-lime rounded-full" />
                       <span className="text-xs font-black italic tracking-widest">80 - 100</span>
                    </div>
                    <p className="text-[10px] text-brand-muted leading-relaxed uppercase font-bold">
                       Essential intel. High tactical value. Masterpieces that define their genre.
                    </p>
                 </div>
                 <div className="space-y-3">
                    <div className="flex items-center gap-3">
                       <div className="w-3 h-3 bg-yellow-400 rounded-full" />
                       <span className="text-xs font-black italic tracking-widest">60 - 79</span>
                    </div>
                    <p className="text-[10px] text-brand-muted leading-relaxed uppercase font-bold">
                       Solid equipment. Performs as expected but lacks the cutting-edge refinement.
                    </p>
                 </div>
                 <div className="space-y-3">
                    <div className="flex items-center gap-3">
                       <div className="w-3 h-3 bg-brand-red rounded-full" />
                       <span className="text-xs font-black italic tracking-widest">BELOW 60</span>
                    </div>
                    <p className="text-[10px] text-brand-muted leading-relaxed uppercase font-bold">
                       Critical failure. Avoid deployment. Poorly optimized or fundamentally broken.
                    </p>
                 </div>
              </div>
              <div className="mt-12 pt-8 border-t border-white/5 flex items-center gap-6">
                 <div className="w-12 h-12 bg-white flex items-center justify-center shrink-0 shadow-neon-white">
                    <ShieldCheck className="text-brand-bg" size={24} />
                 </div>
                 <div className="space-y-1">
                    <h4 className="text-sm font-black italic">OUR_REVIEWS_ARE_NEVER_SPONSORED</h4>
                    <p className="text-[10px] font-mono font-bold text-brand-muted uppercase tracking-widest">INTEGRITY_INDEX: 100% // NO ADS // OWNED BY THE COMMUNITY</p>
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
