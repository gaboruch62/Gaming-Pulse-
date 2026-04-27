import React, { useState, useEffect } from 'react';
import { 
  Monitor, 
  ArrowRight, 
  Flame, 
  Star, 
  PlayCircle,
  TrendingUp,
  Zap,
  Bookmark,
  Clock,
  Shield,
  Gamepad2,
  Activity
} from 'lucide-react';
import { motion } from 'motion/react';
import { PlatformBadge, Tag, PulseScore } from '../components/common';

const SocialProofStrip = () => {
  const [counts, setCounts] = useState({ views: 0, articles: 0, reviews: 0 });

  useEffect(() => {
    const interval = setInterval(() => {
      setCounts(prev => ({
        views: Math.min(prev.views + 12503, 2400000),
        articles: Math.min(prev.articles + 42, 12540),
        reviews: Math.min(prev.reviews + 12, 4200)
      }));
    }, 50);
    return () => clearInterval(interval);
  }, []);

  const format = (n: number) => n.toLocaleString();

  return (
    <div className="bg-brand-secondary/50 border-y border-brand-border py-4 overflow-hidden">
      <div className="max-w-[1600px] mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4 border-r border-brand-border pr-8">
          <div className="flex -space-x-2">
            {[1, 2, 3].map(i => (
              <img key={i} src={`https://i.pravatar.cc/32?u=${i}`} className="w-8 h-8 rounded-full border-2 border-brand-bg grayscale" alt="user" />
            ))}
          </div>
          <p className="text-[10px] font-mono font-black uppercase text-brand-muted tracking-widest">
            TRUSTED_BY <span className="text-white">{format(counts.views)}</span> GAMERS
          </p>
        </div>
        
        <div className="flex items-center gap-8 md:gap-16">
          <div className="text-center">
            <div className="text-sm font-black italic text-brand-cyan">{format(counts.articles)}</div>
            <div className="text-[8px] font-mono font-black text-brand-muted uppercase">INTEL_LOGS</div>
          </div>
          <div className="text-center">
            <div className="text-sm font-black italic text-brand-lime">{format(counts.reviews)}</div>
            <div className="text-[8px] font-mono font-black text-brand-muted uppercase">POLISHED_REVIEWS</div>
          </div>
          <div className="hidden lg:flex items-center gap-6 grayscale opacity-30 hover:grayscale-0 hover:opacity-100 transition-all duration-500">
             {['IGN', 'GAMESPOT', 'KOTAKU', 'PC_GAMER'].map(p => (
               <span key={p} className="text-[10px] font-black italic font-heading tracking-tighter">{p}</span>
             ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export const HomePage = ({ 
  onNavigate, 
  savedArticles = [], 
  onToggleSave = () => {} 
}: { 
  onNavigate: (page: string) => void,
  savedArticles?: string[],
  onToggleSave?: (id: string) => void
}) => {
  const [activePlatform, setActivePlatform] = useState('ALL');
  const platforms = ['ALL', 'PC', 'PS5', 'XBOX', 'NINTENDO', 'MOBILE', 'VR'];

  return (
    <main className="mt-20 md:mt-32 overflow-hidden" id="main-content">
      {/* HERO SECTION */}
      <section className="relative w-full h-[85vh] md:h-[70vh] min-h-[500px] overflow-hidden group" aria-labelledby="hero-heading">
        <div className="absolute inset-0 bg-zinc-900">
           <img 
             src="https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=2670&auto=format&fit=crop" 
             className="w-full h-full object-cover opacity-50 grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000" 
             alt="Vibrant gaming setup with neon aesthetics"
             loading="eager"
           />
           <div className="absolute inset-0 bg-gradient-to-t from-brand-bg via-brand-bg/40 to-transparent"></div>
        </div>
        
        <div className="relative z-10 h-full max-w-[1600px] mx-auto px-4 md:px-6 flex flex-col justify-end pb-12 md:pb-16">
          <div className="flex gap-3 mb-6">
            <Tag type="breaking">BREAKING</Tag>
            <PlatformBadge platform="PS5" />
          </div>
          <h1 id="hero-heading" className="text-[clamp(28px,8vw,72px)] font-black italic uppercase tracking-tighter max-w-4xl leading-[0.95] md:leading-[0.9] mb-6 group-hover:text-brand-cyan transition-colors">
            GTA VI RELEASE DATE OFFICIALLY CONFIRMED — <span className="text-brand-cyan">NOVEMBER 2025</span>
          </h1>
          <p className="text-brand-text text-base md:text-lg max-w-2xl mb-8 leading-relaxed opacity-80 line-clamp-3 md:line-clamp-none">
            Rockstar Games has finally broken the silence, confirming a worldwide release window for the most anticipated game of the decade. 
            New map details reveal a Vercetti-sized playground twice the scale of Los Santos.
          </p>
          
          <div className="flex flex-col md:flex-row md:items-center gap-6 md:gap-8">
            <button 
              onClick={() => onNavigate('article')}
              aria-label="Read full article: GTA VI release date confirmed"
              className="w-full md:w-auto bg-brand-cyan text-brand-bg font-heading px-8 py-5 md:py-4 text-sm font-black italic flex items-center justify-center gap-3 hover:translate-x-2 transition-all shadow-neon-cyan active:scale-95 min-h-[44px]">
              READ NOW <ArrowRight size={18} aria-hidden="true" />
            </button>
            
            <div className="flex items-center gap-4 border-l-0 md:border-l border-white/20 pl-0 md:pl-8 font-mono text-xs font-bold text-brand-muted">
              <img src="https://i.pravatar.cc/40?u=jaxon" className="w-10 h-10 grayscale rounded-full border border-brand-cyan" alt="author" />
              <div>
                <div className="text-brand-text font-black">Jaxon Drift</div>
                <div className="flex gap-2">
                  <span>3M AGO</span>
                  <span>•</span>
                  <span>8 MIN READ</span>
                </div>
              </div>
            </div>

            <div className="hidden md:block ml-auto">
              <PulseScore score={94} size="lg" />
            </div>
          </div>
        </div>
      </section>

      {/* SOCIAL PROOF STRIP */}
      <SocialProofStrip />

      {/* BREAKING TICKER */}
      <div className="h-10 bg-brand-red text-white overflow-hidden flex items-center whitespace-nowrap z-20 border-y border-brand-bg relative cursor-default select-none">
        <div className="absolute left-0 h-full bg-brand-red px-4 md:px-6 z-10 flex items-center font-black italic font-heading text-xs md:text-sm shadow-xl">
          <Flame size={16} className="mr-2 animate-bounce" /> BREAKING
        </div>
        <motion.div 
          animate={{ x: [0, -2000] }}
          transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
          className="flex gap-12 md:gap-16 font-mono text-[10px] md:text-[11px] font-black uppercase tracking-widest ml-32 md:ml-40"
        >
          {[
            "NEW RTX 5090 BENCHMARKS SMASH PREVIOUS RECORDS //",
            "SONY ANNOUNCES STATE OF PLAY FOR NEXT TUESDAY //",
            "HALLOW KNIGHT: SILKSONG RELEASED... PSYCHE! STILL WAITING //",
            "LEAGUE OF LEGENDS WORLDS HOST CITY REVEALED //",
            "STEAM DECK 2 SPECS LEAK ON CHINESE FORUMS //",
            "GAMING PULSE X ESPORTS ENERGY DRINK PARTNERSHIP ANNOUNCED //",
            "NEW RTX 5090 BENCHMARKS SMASH PREVIOUS RECORDS //",
            "SONY ANNOUNCES STATE OF PLAY FOR NEXT TUESDAY //"
          ].map((text, i) => (
            <span key={i} className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-white rounded-full"></span> {text}
            </span>
          ))}
        </motion.div>
      </div>

      {/* PLATFORM QUICK-FILTER TABS */}
      <section className="bg-brand-secondary border-b border-brand-border h-14 md:h-16 sticky top-16 md:top-20 z-40">
        <div className="max-w-[1600px] mx-auto h-full flex items-center px-4 md:px-6 overflow-x-auto no-scrollbar" role="tablist" aria-label="Platform filters">
          <div className="flex items-center gap-6 md:gap-10">
            {platforms.map((p) => (
              <button 
                key={p} 
                role="tab"
                aria-selected={activePlatform === p}
                aria-label={`Filter by ${p}`}
                onClick={() => setActivePlatform(p)}
                className={`font-mono text-[10px] md:text-[11px] font-black uppercase tracking-[0.2em] relative py-4 md:py-5 transition-all text-nowrap min-h-[48px]
                  ${activePlatform === p ? 'text-brand-cyan drop-shadow-sm' : 'text-brand-muted hover:text-brand-text'}`}
              >
                {p}
                {activePlatform === p && (
                  <motion.div 
                    layoutId="platformUnderline"
                    className="absolute bottom-0 left-0 right-0 h-1 bg-brand-cyan shadow-neon-cyan" 
                  />
                )}
              </button>
            ))}
          </div>
        </div>
      </section>

      <div className="max-w-[1600px] mx-auto px-4 md:px-6 py-8 md:py-12 grid grid-cols-12 gap-8 md:gap-10">
        <section className="col-span-12 xl:col-span-9">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl md:text-3xl font-black italic font-heading flex items-center gap-3">
              <Monitor className="text-brand-cyan" /> LATEST INTEL
            </h2>
            <div className="h-px flex-1 bg-brand-border mx-4 md:mx-8"></div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {[
              { id: '1', title: "Elden Ring DLC Part 2 Rumors Intensify", cat: "Rumor", platform: "PC", score: 88, color: "bg-purple-900/40" },
              { id: '2', title: "Liquid Wins Major Counter-Strike Trophy", cat: "Esports", platform: "PC", score: 92, color: "bg-blue-900/40" },
              { id: '3', title: "Nintendo Switch 2 Specs Revealed?", cat: "Industry", platform: "Nintendo", score: 74, color: "bg-red-900/40" },
              { id: '4', title: "Review: Dragon Age The Veilguard", cat: "Review", platform: "PS5", score: 85, color: "bg-amber-900/40" },
              { id: '5', title: "Trailer: Marvel Rivals Gameplay Leak", cat: "Trailer", platform: "Xbox", score: 81, color: "bg-green-900/40" },
              { id: '6', title: "Mobile Gaming Revenue Hits New Highs", cat: "Industry", platform: "Mobile", score: 68, color: "bg-cyan-900/40" },
            ].map((news, i) => (
              <motion.article 
                key={i}
                onClick={() => onNavigate('article')}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group bg-brand-card border border-brand-border hover:border-brand-cyan hover:shadow-neon-cyan hover:-translate-y-2 transition-all p-3 cursor-pointer relative"
              >
                <div className={`aspect-video ${news.color} relative overflow-hidden mb-4 border border-white/5`}>
                   <div className="absolute inset-0 flex items-center justify-center opacity-10">
                      <Zap size={64} className="group-hover:scale-125 transition-transform" />
                   </div>
                   <div className="absolute top-2 left-2 flex gap-2">
                      <Tag type={news.cat.toLowerCase()}>{news.cat}</Tag>
                   </div>
                   <div className="absolute top-2 right-2 flex flex-col items-end gap-2">
                      <button 
                        onClick={(e) => { e.stopPropagation(); onToggleSave(news.id); }}
                        aria-label={savedArticles.includes(news.id) ? "Unsave article" : "Save article"}
                        className={`p-2 rounded-sm border transition-all ${savedArticles.includes(news.id) ? 'bg-brand-cyan border-brand-cyan text-brand-bg' : 'bg-brand-bg/80 border-white/10 text-brand-muted hover:text-white'}`}
                      >
                         <Bookmark size={14} className={savedArticles.includes(news.id) ? 'fill-current' : ''} aria-hidden="true" />
                      </button>
                      <PulseScore score={news.score} size="sm" />
                   </div>
                </div>
                
                <div className="px-1 space-y-3">
                  <PlatformBadge platform={news.platform} />
                  <h3 className="text-xl font-black italic leading-tight group-hover:text-brand-cyan transition-colors">
                    {news.title}
                  </h3>
                  <p className="text-xs text-brand-muted line-clamp-2 leading-relaxed">
                    Industry sources suggest a new roadmap is being drafted for upcoming quarterly reports...
                  </p>
                  
                  <div className="flex items-center gap-3 pt-3 border-t border-brand-border">
                     <div className="w-6 h-6 bg-brand-cyan text-brand-bg font-black text-[10px] rounded-full grid place-items-center uppercase">GP</div>
                     <span className="text-[10px] font-mono font-bold text-brand-muted uppercase">By Xerox // Nov 24</span>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>

          {/* REVIEWS */}
          <div className="mt-16 md:mt-24">
            <h2 className="text-3xl md:text-4xl font-black italic font-heading whitespace-nowrap mb-8 md:mb-10">
              <Star className="text-brand-lime inline mr-2" /> LATEST REVIEWS
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
              {[
                { game: "STALKER 2", plat: "PC", score: 89, verdict: "MUST PLAY", color: "from-green-500" },
                { game: "BO6", plat: "PS5", score: 78, verdict: "WORTH IT", color: "from-blue-500" },
                { game: "CONCORD", plat: "PC", score: 32, verdict: "SKIP IT", color: "from-red-500" },
              ].map((review, i) => (
                <div key={i} className="bg-brand-secondary border border-white/5 p-6 relative overflow-hidden group">
                  <div className={`absolute top-0 left-0 w-1 h-full bg-gradient-to-b ${review.color} to-transparent`}></div>
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <h4 className="text-2xl font-black italic tracking-tighter mb-1 line-clamp-1">{review.game}</h4>
                      <PlatformBadge platform={review.plat} />
                    </div>
                    <PulseScore score={review.score} />
                  </div>
                  <div className="h-1 w-full bg-brand-bg relative overflow-hidden border border-white/5 mb-6">
                     <motion.div 
                       initial={{ width: 0 }}
                       whileInView={{ width: `${review.score}%` }}
                       className={`absolute top-0 left-0 h-full bg-brand-lime shadow-neon-lime`} 
                     />
                  </div>
                  <p className="text-xs text-brand-muted italic leading-relaxed mb-6 line-clamp-3">
                    "A visceral experience that truly encapsulates the dark future theme."
                  </p>
                  <span className={`text-[10px] font-black italic px-3 py-1 bg-brand-bg border ${review.score > 80 ? 'border-brand-lime text-brand-lime shadow-neon-lime' : 'border-brand-cyan text-brand-cyan'}`}>
                    {review.verdict}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <aside className="col-span-12 xl:col-span-3 space-y-10">
           {/* DEALS RADAR WIDGET */}
           <div className="bg-brand-secondary border border-brand-border p-6 overflow-hidden">
              <div className="flex items-center justify-between mb-8">
                 <h2 className="text-xl font-black italic font-heading flex items-center gap-3">
                    <Shield className="text-brand-lime" size={20} /> DEALS_RADAR
                 </h2>
                 <div className="flex items-center gap-1.5 px-2 py-0.5 bg-brand-red/10 border border-brand-red/30 rounded-sm">
                    <div className="w-1.5 h-1.5 bg-brand-red rounded-full animate-ping"></div>
                    <span className="text-[8px] font-mono font-black text-brand-red uppercase">3_EXPIRING</span>
                 </div>
              </div>
              
              <div className="space-y-4">
                 {[
                   { game: "Steam Deck OLED", off: "15% OFF", price: "$449" },
                   { game: "SSD 2TB Gen5", off: "30% OFF", price: "$189" },
                   { game: "Pulse Energy 12pk", off: "50% OFF", price: "$19.99" }
                 ].map((deal, i) => (
                   <div key={i} onClick={() => onNavigate('home')} className="p-4 bg-brand-bg border border-brand-border hover:border-brand-lime transition-all cursor-pointer group">
                      <div className="flex justify-between items-start mb-2">
                        <span className="text-[10px] font-mono font-black text-brand-muted uppercase">{deal.off}</span>
                        <Clock size={10} className="text-brand-red" />
                      </div>
                      <h4 className="text-xs font-black uppercase mb-2 group-hover:text-brand-lime transition-colors">{deal.game}</h4>
                      <div className="text-sm font-black italic text-brand-lime">{deal.price}</div>
                   </div>
                 ))}
                 <button className="w-full mt-4 text-[9px] font-mono font-black uppercase text-brand-muted hover:text-brand-cyan transition-colors underline underline-offset-4 tracking-[0.2em]">
                    VIEW_ALL_CATALOG_LOGS
                 </button>
              </div>
           </div>

           <div className="bg-brand-card border border-brand-border p-6 shadow-xl sticky top-44">
              <h2 className="text-xl font-black italic font-heading mb-8 flex items-center gap-3">
                 <TrendingUp className="text-brand-cyan" size={20} /> TRENDING_LOGS
              </h2>
              <div className="space-y-8">
                 {[1, 2, 3, 4, 5].map((i) => (
                   <div key={i} onClick={() => onNavigate('article')} className="flex gap-4 group cursor-pointer items-start">
                      <span className="text-3xl font-black font-heading italic text-white/5 group-hover:text-brand-cyan/20 transition-colors">{i}</span>
                      <div className="space-y-1 flex-1">
                         <h4 className="text-[12px] font-black italic leading-tight group-hover:text-brand-cyan transition-colors uppercase tracking-tight">
                           GTA VI MAP LEAK REVEALS 3 CITIES
                         </h4>
                         <PlatformBadge platform="PS5" />
                      </div>
                   </div>
                 ))}
              </div>
           </div>
        </aside>
      </div>
    </main>
  );
};
