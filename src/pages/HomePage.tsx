import React, { useState, useEffect } from 'react';
import { 
  Monitor, 
  ArrowRight, 
  Flame, 
  Star, 
  PlayCircle,
  Play,
  TrendingUp,
  Zap,
  Bookmark,
  Clock,
  Shield,
  Gamepad2,
  Activity,
  Newspaper,
  Tv,
  X
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { PlatformBadge, Tag, PulseScore } from '../components/common';

const StatsBar = () => {
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
    <div className="bg-brand-lime border-y-4 border-black py-4 overflow-hidden shadow-[inset_0_4px_10px_rgba(0,0,0,0.2)]">
      <div className="max-w-[1600px] mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4 bg-white border-2 border-black p-2 shadow-comic-sm">
          <div className="flex -space-x-1">
            {[1, 2, 3].map(i => (
              <img key={i} src={`https://i.pravatar.cc/32?u=${i}`} className="w-6 h-6 border focus:outline-none" alt="user" />
            ))}
          </div>
          <p className="text-[10px] font-heading font-black uppercase text-black tracking-widest">
            ACTIVE HEROES: <span className="text-brand-red">{format(counts.views)}</span>
          </p>
        </div>
        
        <div className="flex items-center gap-8 md:gap-16">
          <div className="text-center">
            <div className="text-xl font-black italic text-black font-heading">{format(counts.articles)}</div>
            <div className="text-[8px] font-heading font-black text-black/60 uppercase">INTEL_LOGS</div>
          </div>
          <div className="text-center">
            <div className="text-xl font-black italic text-brand-red font-heading">{format(counts.reviews)}</div>
            <div className="text-[8px] font-heading font-black text-black/60 uppercase">POLISHED_REVIEWS</div>
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
  const [newsData, setNewsData] = useState<any[]>([]);
  const [visibleCount, setVisibleCount] = useState(12);
  const [loading, setLoading] = useState(true);
  const [selectedNews, setSelectedNews] = useState<any>(null);
  const platforms = ['ALL', 'PC', 'PS5', 'XBOX', 'NINTENDO', 'MOBILE', 'VR'];

  const fetchNews = async () => {
    try {
      const response = await fetch('/api/news');
      if (response.ok) {
        const data = await response.json();
        setNewsData(data);
      }
    } catch (error) {
      console.error("Failed to fetch news:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
    const interval = setInterval(fetchNews, 15 * 60 * 1000); // 15 minutes
    return () => clearInterval(interval);
  }, []);

  // Infinite Scroll Handler
  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 500) {
        setVisibleCount(prev => prev + 6);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const filteredNews = activePlatform === 'ALL' 
    ? newsData 
    : newsData.filter(n => 
        n.platform?.toUpperCase() === activePlatform || 
        n.source?.toUpperCase() === activePlatform ||
        n.type?.toUpperCase() === activePlatform
      );

  const displayNews = filteredNews.slice(0, visibleCount);

  const [mouseX, setMouseX] = useState(0);
  const [mouseY, setMouseY] = useState(0);

  const handleMouseMove = (e: React.MouseEvent) => {
    setMouseX((e.clientX / window.innerWidth - 0.5) * 50);
    setMouseY((e.clientY / window.innerHeight - 0.5) * 50);
  };

  // Dynamic background colors based on hero news
  const getHeroTheme = () => {
    const title = newsData[0]?.title?.toUpperCase() || "";
    if (title.includes("GTA") || title.includes("CRIMINAL")) return "from-brand-red/20";
    if (title.includes("SILKSONG") || title.includes("VOID") || title.includes("HOLLOW")) return "from-purple-900/30";
    if (title.includes("VALORANT") || title.includes("CYBER")) return "from-brand-cyan/20";
    if (title.includes("ZELDA") || title.includes("NINTENDO")) return "from-brand-lime/20";
    return "from-zinc-900/40";
  };

  return (
    <main 
      className="mt-20 md:mt-32 overflow-hidden relative" 
      id="main-content"
      onMouseMove={handleMouseMove}
    >
      {/* 2-LAYER PARALLAX BACKGROUND */}
      <div className="fixed inset-0 z-[-1] pointer-events-none overflow-hidden bg-black">
         {/* LAYER 1: DISTANT COMIC PANELS (MOUSE FOLLOW) */}
         <motion.div 
           animate={{ x: mouseX * 0.5, y: mouseY * 0.5 }}
           transition={{ type: "spring", stiffness: 30, damping: 20 }}
           className="absolute inset-[-100px] parallax-comic-bg opacity-10" 
         />
         
         {/* LAYER 2: ANIMATED GRADIENT VIGNETTE */}
         <motion.div 
           animate={{ 
             scale: [1, 1.1, 1],
             opacity: [0.4, 0.6, 0.4]
           }}
           transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
           className={`absolute inset-0 bg-gradient-to-br ${getHeroTheme()} via-black to-black animate-gradient`}
         />
         <div className="absolute inset-0 vignette-overlay opacity-80" />
         <div className="absolute inset-0 halftone opacity-20" />
      </div>

      {/* 1. NEWS TICKER (LIVE DATA) */}
      <div className="bg-brand-red border-y-4 border-black py-2 overflow-hidden relative z-50">
        <motion.div 
          animate={{ x: [0, -2000] }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
          className="flex whitespace-nowrap gap-12"
        >
          {loading ? (
             <span className="font-heading text-xl text-white italic uppercase font-black">SCANNING_FREQUENCIES... SIGNAL_SEARCH_IN_PROGRESS...</span>
          ) : newsData.slice(0, 10).map((n, i) => (
             <div key={i} className="flex items-center gap-4">
                <Flame size={16} fill="white" className="text-white animate-pulse" />
                <span className="font-heading text-xl text-white italic uppercase font-black drop-shadow-[2px_2px_0px_#000]">
                  {n.title} — SOURCE: {n.source} — [{n.date}]
                </span>
             </div>
          ))}
        </motion.div>
      </div>

      {/* HERO SECTION */}
      <section className="relative w-full h-[85vh] md:h-[75vh] min-h-[600px] overflow-hidden group border-b-8 border-black shadow-[0_15px_0_rgba(238,29,35,1)]" aria-labelledby="hero-heading">
        <div className="absolute inset-0 bg-brand-cyan overflow-hidden">
           <motion.img 
             initial={{ scale: 1.2, x: -50 }}
             animate={{ scale: 1, x: 0 }}
             transition={{ duration: 10, repeat: Infinity, repeatType: "mirror", ease: "linear" }}
             src={newsData[0]?.heroImage || newsData[0]?.image || "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=2670&auto=format&fit=crop"} 
             className="w-full h-full object-cover" 
             alt="Featured News"
             style={{ filter: 'contrast(1.6) saturate(1.8) brightness(0.6)' }}
             loading="eager"
           />
           <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent"></div>
           <div className="absolute inset-0 halftone opacity-40 mix-blend-overlay pointer-events-none"></div>
           
           {/* Animated Comic Layers */}
           <motion.div 
             animate={{ y: [0, -15, 0], rotate: [-2, 2, -2] }}
             transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
             className="absolute top-[20%] right-[10%] w-64 h-64 bg-yellow-400 border-8 border-black shadow-comic-red hidden lg:flex flex-col items-center justify-center -rotate-6 z-20 p-4"
           >
              <Zap size={60} className="text-black mb-2 fill-current" />
              <span className="text-black font-heading font-black italic text-5xl text-center leading-[0.8]">BIG<br/><span className="text-3xl">NEWS!</span></span>
           </motion.div>

           <motion.div 
             animate={{ x: [-20, 20, -20], y: [0, 10, 0] }}
             transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
             className="absolute bottom-[40%] left-[5%] w-48 h-32 bg-brand-cyan border-4 border-black shadow-comic hidden xl:flex items-center justify-center rotate-3 z-20 opacity-90"
           >
              <span className="text-white font-heading font-black italic text-4xl text-center leading-none">BOOM!</span>
           </motion.div>

           {/* Floating Geometric Accents */}
           <div className="absolute inset-0 overflow-hidden pointer-events-none">
              {[...Array(5)].map((_, i) => (
                <motion.div 
                   key={i}
                   animate={{ 
                     y: [Math.random() * 100, Math.random() * -100],
                     x: [Math.random() * 100, Math.random() * -100],
                     rotate: [0, 360]
                   }}
                   transition={{ duration: 20 + i * 5, repeat: Infinity, ease: "linear" }}
                   className="absolute w-20 h-2 bg-brand-red border-2 border-black"
                   style={{ 
                     top: `${20 + i * 15}%`, 
                     left: `${10 + i * 20}%`,
                     opacity: 0.3
                   }}
                />
              ))}
           </div>
        </div>
        
        <div className="relative z-10 h-full max-w-[1600px] mx-auto px-4 md:px-6 flex flex-col justify-end pb-16 md:pb-24">
          <div className="flex items-center gap-4 mb-6">
            <motion.div
               animate={{ rotate: [-2, 2, -2] }}
               transition={{ duration: 0.5, repeat: Infinity }}
            >
               <Tag type="breaking" className="!text-3xl !px-8 !py-3 !border-4 !border-black shadow-comic bg-yellow-400 text-black">HOT_INTEL!</Tag>
            </motion.div>
            <div className="bg-brand-cyan border-4 border-black px-6 py-2 rotate-2 shadow-comic-sm hidden md:block">
               <PlatformBadge platform={newsData[0]?.type === 'Video' ? 'VR' : 'PC'} />
            </div>
          </div>
          <h1 id="hero-heading" className="text-[clamp(38px,9vw,110px)] font-black italic uppercase tracking-widest max-w-6xl leading-[0.75] mb-12 text-white drop-shadow-[10px_10px_0px_#EE1D23] filter drop-shadow-[0_0_20px_rgba(0,0,0,0.8)]">
            {newsData[0]?.title || "SCANNING FOR RECENT COMBAT LOGS..."}
          </h1>
          
          <div className="flex flex-col md:flex-row md:items-center gap-10">
            <button 
              onClick={() => newsData[0] && setSelectedNews(newsData[0])}
              className="group relative comic-btn bg-brand-red text-white text-2xl px-12 py-6 overflow-hidden hover:scale-110 active:scale-95 transition-transform"
            >
              <span className="relative z-10 flex items-center gap-3">
                <Bookmark size={28} /> READ_INTEL!
              </span>
              <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity"></div>
            </button>
            <div className="flex flex-col">
               <span className="text-brand-lime font-heading font-black italic text-xl drop-shadow-md">SOURCE: {newsData[0]?.source || 'HIVE_MIND'}</span>
               <span className="text-white/70 font-heading italic text-lg">{newsData[0]?.date || 'RECENT'}</span>
            </div>
            {newsData[0] && (
               <div className="hidden md:block ml-auto">
                 <PulseScore score={newsData[0].score || 94} size="lg" />
               </div>
            )}
          </div>
        </div>
      </section>

      <StatsBar />

      <div className="max-w-[1600px] mx-auto px-4 md:px-6 py-12 md:py-24 grid grid-cols-12 gap-10 md:gap-16">
        <section className="col-span-12 xl:col-span-9" aria-labelledby="latest-news-heading">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 mb-16 border-b-8 border-black pb-10 relative overflow-hidden">
            <div className="absolute -left-10 bottom-0 w-32 h-2 bg-brand-red rotate-[-5deg]"></div>
            <h2 id="latest-news-heading" className="text-5xl md:text-8xl font-black italic tracking-tighter flex items-center gap-8 text-white drop-shadow-[6px_6px_0px_#000] rotate-[-1.5deg]">
               <div className="w-16 h-16 bg-brand-cyan border-4 border-black shadow-comic-sm shrink-0 flex items-center justify-center rotate-6">
                 <Monitor className="text-white" size={32} strokeWidth={3} />
               </div>
               LATEST_LOGS!
            </h2>
            
            <nav className="flex flex-wrap gap-4" aria-label="Platform filter">
               {platforms.map(p => (
                 <button 
                   key={p} 
                   onClick={() => { setActivePlatform(p); setVisibleCount(12); }}
                   aria-pressed={activePlatform === p}
                   className={`px-6 py-3 border-4 border-black font-heading text-lg font-black italic tracking-widest transition-all ${activePlatform === p ? 'bg-brand-red text-white -translate-y-2 shadow-[8px_8px_0px_rgba(0,0,0,1)]' : 'bg-white text-black hover:bg-brand-cyan hover:text-white hover:-translate-y-1'}`}
                 >
                   {p}
                 </button>
               ))}
            </nav>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
            {loading ? (
              [...Array(6)].map((_, i) => (
                <div key={i} className="bg-white border-4 border-black shadow-comic p-4 animate-pulse h-80">
                   <div className="bg-zinc-200 h-40 border-2 border-black mb-4"></div>
                   <div className="h-4 bg-zinc-200 w-3/4 mb-2"></div>
                   <div className="h-4 bg-zinc-200 w-1/2"></div>
                </div>
              ))
            ) : displayNews.map((news: any, i: number) => (
              <NewsItem 
                key={news.id || i} 
                news={news} 
                i={i} 
                onSelect={setSelectedNews}
                className={i % 7 === 0 ? "sm:col-span-2 lg:col-span-2 row-span-2" : ""}
              />
            ))}
          </div>

          {/* NEW: TRAILERS SECTION */}
          <div className="mt-24 bg-zinc-900 border-8 border-black p-8 md:p-12 relative overflow-hidden shadow-[16px_16px_0px_#00AEEF] -rotate-[1deg]">
            <div className="absolute inset-0 halftone opacity-30 pointer-events-none"></div>
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-brand-cyan opacity-20 blur-3xl rounded-full"></div>
            <div className="relative z-10">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-12">
                <div className="flex items-center gap-4">
                  <div className="bg-brand-cyan p-3 border-4 border-black rotate-[-6deg] shadow-comic-sm">
                    <Tv size={32} className="text-white" />
                  </div>
                  <h2 className="text-4xl md:text-7xl font-black italic font-heading text-white drop-shadow-[4px_4px_0px_#00AEEF] tracking-tighter">
                    DEEP_SPACE_TRAILERS
                  </h2>
                </div>
                <div className="bg-yellow-400 border-4 border-black px-4 py-1 rotate-3 shadow-comic-sm hidden md:block">
                   <span className="text-black font-heading font-black italic text-xl">LIVE_FEED!</span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                {newsData.filter(n => n.type === 'VIDEO').slice(0, 4).map((video) => (
                  <motion.div 
                    key={video.id}
                    whileHover={{ scale: 1.02, rotate: 1 }}
                    className="flex flex-col md:flex-row gap-6 bg-white border-4 border-black p-4 shadow-comic transition-all cursor-pointer group"
                    onClick={() => setSelectedNews(video)}
                  >
                    <div className="w-full md:w-56 aspect-video border-4 border-black overflow-hidden relative shrink-0 bg-black">
                      <img 
                        src={video.image} 
                        className="w-full h-full object-cover group-hover:scale-125 transition-transform duration-700" 
                        style={{ filter: 'contrast(1.6) saturate(2) brightness(0.8)' }}
                        alt={video.title}
                      />
                      <div className="absolute inset-0 flex items-center justify-center bg-brand-cyan/20 group-hover:bg-transparent transition-colors">
                        <div className="bg-white/90 p-2 border-2 border-black rotate-12 group-hover:scale-110 transition-transform">
                          <Play size={20} fill="black" className="text-black" />
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col justify-center gap-2">
                      <Tag type="breaking" className="text-[10px] border-2 border-black">NEW_SIGNAL</Tag>
                      <h3 className="text-xl md:text-2xl font-heading font-black italic text-black leading-[0.9] uppercase line-clamp-3 tracking-tighter">
                        {video.title}
                      </h3>
                      <div className="mt-2 flex items-center gap-2">
                         <div className="w-4 h-4 bg-black rounded-full"></div>
                         <span className="text-[10px] font-heading font-bold text-black/60 uppercase tracking-widest">{video.source}</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <aside className="col-span-12 xl:col-span-3 space-y-12">
           {/* FAST LOOT (MICRO NEWS) */}
           <div className="bg-brand-red border-8 border-black p-8 relative shadow-comic-sm">
              <h2 className="text-3xl font-heading font-black italic text-white mb-8 tracking-tighter flex items-center gap-3">
                 <Zap size={24} className="fill-current" /> FAST_LOOT!
              </h2>
              <div className="space-y-10">
                 {newsData.slice(10, 16).map((n, i) => (
                   <div key={i} className="relative">
                      <SpeechBubble 
                        news={n} 
                        index={i} 
                        onSelect={setSelectedNews} 
                      />
                   </div>
                 ))}
              </div>
           </div>

           {/* RELEASE CALENDAR */}
           <div className="bg-white border-8 border-black p-8 shadow-comic">
              <h2 className="text-3xl font-heading font-black italic text-black mb-6 tracking-tighter flex items-center gap-3">
                 <Clock className="text-brand-red" size={24} /> DROP_DATES
              </h2>
              <div className="space-y-4">
                 {[
                   { date: "MAY 15", game: "ELDEN RING: DLC", plat: "ALL" },
                   { date: "JUN 04", game: "STARFIELD EXP", plat: "Xbox/PC" },
                   { date: "SEP 09", game: "WARHAMMER 40K", plat: "PS5/PC" }
                 ].map((d, i) => (
                   <div key={i} className="flex items-center gap-4 border-b-2 border-black/10 pb-3 last:border-0 hover:translate-x-1 transition-transform">
                      <div className="bg-black text-white font-heading font-black text-xs px-2 py-1 rotate-[-2deg] shrink-0">{d.date}</div>
                      <div className="flex flex-col">
                         <span className="text-sm font-heading font-black italic uppercase leading-none">{d.game}</span>
                         <span className="text-[10px] text-brand-red font-bold uppercase">{d.plat}</span>
                      </div>
                   </div>
                 ))}
              </div>
           </div>

           {/* MOST PLAYED */}
           <div className="bg-yellow-400 border-8 border-black p-8 shadow-comic-sm">
              <h2 className="text-2xl font-heading font-black italic text-black mb-6 flex items-center gap-3">
                 <Activity size={24} /> LIVE_COUNT
              </h2>
              <div className="space-y-6">
                 {[
                   { game: "LEAGUE OF LEGENDS", players: "10.2M" },
                   { game: "FORTNITE", players: "8.5M" },
                   { game: "VALORANT", players: "4.1M" }
                 ].map((p, i) => (
                   <div key={i} className="flex flex-col gap-1">
                      <div className="flex justify-between items-end">
                         <span className="text-xs font-heading font-black italic uppercase truncate max-w-[150px]">{p.game}</span>
                         <span className="text-[10px] font-mono font-bold text-black/60">{p.players}</span>
                      </div>
                      <div className="h-4 bg-white border-2 border-black relative overflow-hidden">
                         <motion.div 
                           initial={{ width: 0 }}
                           animate={{ width: `${Math.random() * 60 + 40}%` }}
                           className="absolute top-0 left-0 h-full bg-black shadow-[2px_0_0_#FFF]"
                         />
                      </div>
                   </div>
                 ))}
              </div>
           </div>
        </aside>
      </div>

      {/* REVIEWS SECTION */}
      <section className="bg-brand-secondary border-y-8 border-black py-20 relative overflow-hidden" aria-labelledby="reviews-heading">
        <div className="absolute inset-0 halftone opacity-5 pointer-events-none"></div>
        <div className="max-w-[1600px] mx-auto px-4 md:px-6 relative z-10">
            <h2 id="reviews-heading" className="text-5xl md:text-8xl font-black italic font-heading text-white mb-16 tracking-tighter drop-shadow-[6px_6px_0px_#EE1D23] rotate-[-1deg]">
               FIELD_REPORTS
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
              {[
                { game: "STALKER 2", plat: "PC", score: 89, verdict: "MUST_PLAY!", color: "bg-brand-lime" },
                { game: "BO6", plat: "PS5", score: 78, verdict: "WORTH_IT", color: "bg-brand-cyan" },
                { game: "CONCORD", plat: "PC", score: 32, verdict: "SKIP_IT!", color: "bg-brand-red" },
              ].map((review, i) => (
                <div key={i} className="bg-white border-4 border-black p-6 relative overflow-hidden group shadow-comic hover:scale-[1.02] transition-transform">
                  <div className={`absolute top-0 left-0 w-full h-2 ${review.color} border-b-2 border-black`}></div>
                  <div className="flex justify-between items-start mb-6 pt-2">
                    <div className="flex-1 pr-4">
                      <h4 className="text-3xl font-heading font-black italic tracking-tighter mb-2 text-black leading-none">{review.game}</h4>
                      <PlatformBadge platform={review.plat} />
                    </div>
                    <PulseScore score={review.score} />
                  </div>
                  <div className="h-3 w-full bg-zinc-200 border-2 border-black mb-6 relative">
                     <motion.div 
                       initial={{ width: 0 }}
                       whileInView={{ width: `${review.score}%` }}
                       className={`absolute top-0 left-0 h-full ${review.color}`} 
                     />
                  </div>
                  <p className="text-sm text-black font-bold italic leading-tight mb-6 line-clamp-3 uppercase">
                    "A VISCERAL EXPERIENCE THAT TRULY ENCAPSULATES THE DARK FUTURE THEME!"
                  </p>
                  <span className={`inline-block text-[14px] font-heading font-black italic px-4 py-1 border-2 border-black shadow-comic-sm ${review.color} text-black`}>
                    {review.verdict}
                  </span>
                </div>
              ))}
            </div>
        </div>
      </section>

      {/* Reader Modal */}
      <AnimatePresence>
        {selectedNews && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedNews(null)}
              className="absolute inset-0 bg-black/95 backdrop-blur-md"
            ></motion.div>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.8, y: 100, rotate: -5 }}
              animate={{ opacity: 1, scale: 1, y: 0, rotate: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 100, rotate: 5 }}
              className="relative w-full max-w-6xl bg-white border-[10px] border-black shadow-[30px_30px_0px_rgba(238,29,35,1)] overflow-hidden flex flex-col md:flex-row max-h-[90vh]"
            >
              <button 
                onClick={() => setSelectedNews(null)}
                className="absolute top-6 right-6 z-50 bg-brand-red text-white p-3 border-4 border-black hover:rotate-90 transition-transform shadow-comic-sm"
              >
                <X size={40} strokeWidth={4} />
              </button>

              <div className="w-full md:w-7/12 bg-black relative flex items-center justify-center min-h-[300px]">
                 {selectedNews.embed ? (
                   <div className="w-full h-full relative">
                     <iframe 
                        src={`${selectedNews.embed}?autoplay=1`}
                        className="w-full aspect-video border-none relative z-10"
                        allow="autoplay; encrypted-media"
                     />
                     <div className="absolute inset-0 bg-brand-cyan/20 blur-3xl opacity-30"></div>
                   </div>
                 ) : (
                   <div className="w-full h-full p-4">
                     <div className="w-full h-full border-4 border-white shadow-comic overflow-hidden relative">
                        <img 
                          src={selectedNews.image} 
                          className="w-full h-full object-cover" 
                          style={{ filter: 'contrast(1.6) saturate(1.8) grayscale(20%)' }}
                          alt={selectedNews.title}
                        />
                        <div className="absolute inset-0 halftone opacity-40 mix-blend-multiply"></div>
                        <div className="absolute top-4 left-4 bg-yellow-400 border-4 border-black px-4 py-1 rotate-[-4deg] shadow-comic-sm">
                           <span className="text-black font-heading font-black italic text-2xl">VISUAL_LOG!</span>
                        </div>
                     </div>
                   </div>
                 )}
              </div>

              <div className="w-full md:w-5/12 p-8 md:p-12 overflow-y-auto bg-white flex flex-col pt-20 md:pt-16">
                 <div className="flex items-center gap-3 mb-6">
                    <Tag type={selectedNews.type?.toLowerCase() === 'video' ? 'breaking' : 'intel'} className="!text-xl !border-4 !border-black shadow-comic-sm">
                      {selectedNews.type || 'NEWS_REPORTS'}
                    </Tag>
                    {selectedNews.platform && <PlatformBadge platform={selectedNews.platform} />}
                 </div>
                 <h2 className="text-4xl md:text-6xl font-heading font-black italic uppercase leading-[0.85] text-black mb-8 tracking-tighter drop-shadow-[2px_2px_0px_#EE1D23]">
                   {selectedNews.title}
                 </h2>
                 <div className="bg-zinc-100 border-4 border-black p-6 mb-10 rotate-1 shadow-comic-sm relative">
                    <div className="absolute -top-3 -right-3 bg-brand-cyan border-2 border-black p-1">
                       <Shield size={16} className="text-white" />
                    </div>
                    <p className="text-lg md:text-xl text-black font-bold italic leading-tight uppercase line-clamp-8">
                      {selectedNews.description || "NO_DESCRIPTION_PROVIDED_BY_SOURCE_SIGNAL."}
                    </p>
                 </div>
                 <div className="mt-auto pt-8 border-t-8 border-black flex flex-col gap-6">
                    <div className="flex justify-between items-center bg-black text-white p-4 -rotate-1 border-2 border-black">
                       <div className="flex flex-col">
                          <span className="text-[10px] font-heading font-black uppercase text-brand-cyan">FREQUENCY_SOURCE</span>
                          <span className="text-sm font-heading font-black uppercase text-white truncate max-w-[150px]">{selectedNews.source}</span>
                       </div>
                       <div className="flex flex-col items-end">
                          <span className="text-[10px] font-heading font-black uppercase text-brand-red">TIMESTAMP_LOG</span>
                          <span className="text-sm font-heading font-bold text-white/70 uppercase">{selectedNews.date}</span>
                       </div>
                    </div>
                    <button 
                      onClick={() => window.open(selectedNews.url, '_blank')}
                      className="comic-btn bg-brand-cyan text-white text-2xl w-full border-[6px]"
                    >
                      OPEN_LIVE_LINK!
                    </button>
                 </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </main>
  );
};

const SpeechBubble: React.FC<{ news: any, index: number, onSelect: (n: any) => void }> = ({ news, index, onSelect }) => {
  const [clicked, setClicked] = useState(false);

  const handleClick = (e: React.MouseEvent) => {
    setClicked(true);
    onSelect(news);
    setTimeout(() => setClicked(false), 800);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.5, rotate: -10, y: 20 }}
      whileInView={{ opacity: 1, scale: 1, rotate: index % 2 === 0 ? -1 : 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ 
        delay: (index % 6) * 0.15, 
        type: "spring", 
        stiffness: 150, 
        damping: 12 
      }}
      whileHover={{ scale: 1.05, translateZ: 20 }}
      className="relative group cursor-pointer" 
      onClick={handleClick}
    >
      <div className="bg-white border-4 border-black p-4 rounded-3xl rounded-bl-none shadow-comic-sm transition-all group-hover:bg-brand-cyan/10 group-hover:border-black">
          <p className="text-sm font-heading font-black italic leading-tight text-black line-clamp-2 uppercase">
            "{news.title}"
          </p>
      </div>
      <div className="w-0 h-0 border-l-[15px] border-l-transparent border-t-[15px] border-t-black absolute left-0 bottom-[-15px]"></div>
      
      <AnimatePresence>
        {clicked && <SparkEffect key="spark" />}
      </AnimatePresence>
    </motion.div>
  );
};

const SparkEffect = () => {
  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center pointer-events-none">
       {[...Array(8)].map((_, i) => (
         <motion.div
           key={i}
           initial={{ scale: 0, x: 0, y: 0 }}
           animate={{ 
             scale: [0, 1.5, 0], 
             x: (Math.random() - 0.5) * 150, 
             y: (Math.random() - 0.5) * 150,
             rotate: Math.random() * 360
           }}
           exit={{ opacity: 0 }}
           transition={{ duration: 0.6, ease: "easeOut" }}
           className="absolute w-8 h-8 bg-yellow-400 border-2 border-black"
           style={{ clipPath: 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)' }}
         />
       ))}
    </div>
  );
};

// Sub-component for News Cards with Video Hover Effect

const NewsItem: React.FC<{ news: any, i: number, onSelect: (n: any) => void, className?: string }> = ({ news, i, onSelect, className = "" }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.article 
      onClick={() => onSelect(news)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: (i % 6) * 0.1, type: "spring", stiffness: 100 }}
      className={`group bg-white border-4 border-black shadow-comic hover:-translate-y-4 hover:shadow-[16px_16px_0px_#EE1D23] transition-all p-4 cursor-pointer relative flex flex-col h-full pop-out-container ${className}`}
    >
      <div className="aspect-video relative overflow-hidden mb-4 border-4 border-black bg-zinc-100">
        <AnimatePresence mode="wait">
          {!isHovered || !news.embed ? (
            <motion.div 
               key="image-container"
               className="w-full h-full relative"
               initial={{ opacity: 1 }}
               exit={{ opacity: 0 }}
            >
               <motion.img 
                  src={news.image} 
                  className="w-full h-full object-cover grayscale transition-all duration-[600ms] group-hover:grayscale-0 group-hover:scale-125 pop-out-image" 
                  style={{ filter: 'contrast(1.5) saturate(1.8)' }}
                  alt={news.title}
               />
               <motion.div 
                 initial={{ opacity: 0 }}
                 whileHover={{ opacity: 0.1 }}
                 className="absolute inset-0 bg-brand-cyan mix-blend-overlay" 
               />
            </motion.div>
          ) : (
            <motion.div 
               key="video"
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               exit={{ opacity: 0 }}
               className="absolute inset-0 bg-black"
            >
               <iframe 
                 src={`${news.embed}?autoplay=1&mute=1&controls=0&modestbranding=1&rel=0&iv_load_policy=3&disablekb=1&loop=1&playlist=${news.id}`}
                 className="w-full h-full border-none pointer-events-none scale-110"
                 allow="autoplay; encrypted-media"
               />
               <div className="absolute inset-0 bg-brand-red/10 border-4 border-brand-red pointer-events-none"></div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="absolute inset-0 halftone opacity-30 pointer-events-none group-hover:opacity-10 transition-opacity"></div>
        
        <div className="absolute top-2 left-2 flex gap-2 z-20">
           <Tag type={news.type?.toLowerCase() === 'reddit' ? 'trending' : news.type?.toLowerCase() === 'video' ? 'breaking' : 'intel'} className="!border-2 !border-black shadow-comic-sm">
             {news.type || 'NEWS'}
           </Tag>
        </div>

        {news.type === 'Video' && !isHovered && (
          <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
             <div className="w-14 h-14 bg-brand-red border-4 border-black flex items-center justify-center rotate-3 group-hover:scale-150 transition-transform shadow-comic-sm">
                <Play size={28} fill="white" className="ml-1 text-white" />
             </div>
          </div>
        )}

        <div className="absolute -bottom-2 -right-2 z-30 group-hover:-bottom-4 group-hover:-right-4 transition-all">
           <PulseScore score={news.score || 85} size="sm" />
        </div>
      </div>
      
      <div className="px-1 space-y-3 flex-1 flex flex-col">
        {news.platform && <PlatformBadge platform={news.platform} />}
        <h3 className="text-xl md:text-2xl font-heading font-black italic leading-[0.95] text-black group-hover:text-brand-red transition-colors line-clamp-3 uppercase tracking-tighter drop-shadow-[1px_1px_0px_#fff]">
          {news.title}
        </h3>
        <div className="mt-auto pt-4 border-t-4 border-black flex items-center justify-between">
           <span className="text-[10px] font-heading font-black text-black uppercase tracking-widest bg-yellow-400 px-2 py-0.5 border-2 border-black -rotate-1">{news.source}</span>
           <span className="text-[10px] font-heading font-bold text-black/50 uppercase">{news.date}</span>
        </div>
      </div>
    </motion.article>
  );
};
