import React, { useState, useEffect } from 'react';
import { 
  Tag as TagIcon, 
  Clock, 
  ArrowRight, 
  AlertCircle, 
  Star, 
  ShoppingCart, 
  Bell, 
  BellOff,
  Zap,
  ChevronRight,
  Monitor,
  Cpu,
  MousePointer2,
  Gamepad2
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { PlatformBadge, Tag } from '../components/common';

const Countdown = ({ targetTime }: { targetTime?: number }) => {
  const [timeLeft, setTimeLeft] = useState<{h: string, m: string, s: string}>({ h: '00', m: '00', s: '00' });

  useEffect(() => {
    const timer = setInterval(() => {
      let diff;
      if (targetTime) {
        diff = targetTime - Date.now();
      } else {
        // Default to midnight tonight
        const now = new Date();
        const midnight = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 0, 0, 0);
        diff = midnight.getTime() - now.getTime();
      }

      if (diff <= 0) {
        setTimeLeft({ h: '00', m: '00', s: '00' });
        clearInterval(timer);
      } else {
        const h = Math.floor(diff / (1000 * 60 * 60)).toString().padStart(2, '0');
        const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)).toString().padStart(2, '0');
        const s = Math.floor((diff % (1000 * 60)) / 1000).toString().padStart(2, '0');
        setTimeLeft({ h, m, s });
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [targetTime]);

  return (
    <div className="flex gap-2 font-heading text-3xl font-black italic">
      <div className="bg-white border-2 border-black px-3 py-1 text-black shadow-comic-sm">{timeLeft.h}</div>
      <div className="py-1 text-white drop-shadow-[2px_2px_0px_#000]">:</div>
      <div className="bg-white border-2 border-black px-3 py-1 text-black shadow-comic-sm">{timeLeft.m}</div>
      <div className="py-1 text-white drop-shadow-[2px_2px_0px_#000]">:</div>
      <div className="bg-brand-red border-2 border-black px-3 py-1 text-white shadow-comic-sm">{timeLeft.s}</div>
    </div>
  );
};

const DealCard: React.FC<{ deal: any }> = ({ deal }) => {
  const [alerted, setAlerted] = useState(false);

  const getDiscountColor = (pct: number) => {
    if (pct >= 50) return 'bg-brand-red text-white';
    if (pct >= 25) return 'bg-orange-500 text-white';
    return 'bg-brand-cyan text-brand-bg';
  };

  return (
    <motion.article 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-white border-4 border-black hover:-translate-y-2 hover:shadow-[10px_10px_0px_#EE1D23] transition-all duration-300 flex flex-col group shadow-comic"
    >
      <div className={`aspect-square relative overflow-hidden bg-gradient-to-br ${deal.color} border-b-4 border-black`}>
        <div className="absolute inset-0 halftone opacity-30"></div>
        <div className="absolute top-2 left-2">
           <PlatformBadge platform={deal.platform} />
        </div>
        <div className={`absolute top-2 right-2 px-2 py-1 font-heading italic font-extrabold text-lg border-2 border-black rotate-3 ${getDiscountColor(deal.discount)}`}>
           {deal.discount}% OFF!
        </div>
      </div>

      <div className="p-4 flex-1 flex flex-col">
        <h3 className="text-2xl font-heading font-black italic uppercase mb-4 leading-[0.8] group-hover:text-brand-red transition-colors text-black">
          {deal.title}
        </h3>
        
        <div className="mt-auto">
          <div className="flex items-baseline gap-2 mb-4 bg-zinc-100 p-2 border-2 border-black rotate-[-1deg]">
             <span className="text-2xl font-heading font-black italic text-brand-red">${deal.salePrice}</span>
             <span className="text-sm text-black/40 line-through font-bold">${deal.originalPrice}</span>
          </div>
          
          <div className="flex gap-2">
            <button className="flex-1 comic-btn bg-brand-red text-white py-3 text-lg">
               GET IT!
            </button>
          </div>
        </div>
      </div>
    </motion.article>
  );
};

export const DealsPage = ({ onNavigate }: { onNavigate: (page: string) => void }) => {
  const [activeTab, setActiveTab] = useState('ALL');
  
  const platforms = ['ALL', 'PC/STEAM', 'PS5', 'XBOX', 'NINTENDO', 'MOBILE'];
  const categories = ['ALL', 'GAMES', 'DLC', 'HARDWARE', 'ACCESSORIES', 'SUBSCRIPTIONS'];

  const flashDeals = [
    { title: "Ghost of Tsushima", price: "$29.99", discount: 50, color: "from-red-900/40" },
    { title: "DualSense Edge", price: "$179.99", discount: 10, color: "from-blue-900/40" },
    { title: "Game Pass 3mo", price: "$14.99", discount: 66, color: "from-green-900/40" },
    { title: "Elden Ring", price: "$35.99", discount: 40, color: "from-purple-900/40" },
    { title: "Steam Deck 512", price: "$399", discount: 20, color: "from-cyan-900/40" },
    { title: "Logitech G Pro", price: "$89", discount: 45, color: "from-amber-900/40" },
  ];

  const gridDeals = [
    { id: 1, title: "God of War Ragnarök", originalPrice: 69.99, salePrice: 34.99, discount: 50, platform: "PS5", store: "PSN", rating: 5, color: "from-blue-900/40" },
    { id: 2, title: "Cyberpunk 2077", originalPrice: 59.99, salePrice: 29.99, discount: 50, platform: "PC", store: "STEAM", rating: 4, color: "from-red-900/40" },
    { id: 3, title: "Xbox Series X", originalPrice: 499, salePrice: 449, discount: 10, platform: "XBOX", store: "XBOX", rating: 5, color: "from-green-900/40" },
    { id: 4, title: "Super Mario Odyssey", originalPrice: 59.99, salePrice: 41.99, discount: 30, platform: "NINTENDO", store: "ESHOP", rating: 5, color: "from-red-900/40" },
    { id: 5, title: "FFVII Rebirth", originalPrice: 69.99, salePrice: 59.99, discount: 14, platform: "PS5", store: "PSN", rating: 5, color: "from-cyan-900/40" },
    { id: 6, title: "Hades II (EA)", originalPrice: 29.99, salePrice: 24.99, discount: 16, platform: "PC", store: "STEAM", rating: 5, color: "from-purple-900/40" },
    { id: 7, title: "DualSense White", originalPrice: 69.99, salePrice: 49.99, discount: 28, platform: "PS5", store: "PSN", rating: 4, color: "from-blue-500/20" },
    { id: 8, title: "Switch Lite Coral", originalPrice: 199, salePrice: 179, discount: 10, platform: "NINTENDO", store: "ESHOP", rating: 4, color: "from-pink-600/20" },
    { id: 9, title: "Starfield Premium", originalPrice: 99.99, salePrice: 59.99, discount: 40, platform: "XBOX", store: "XBOX", rating: 3, color: "from-amber-600/20" },
    { id: 10, title: "Razer DeathAdder", originalPrice: 69.99, salePrice: 39.99, discount: 42, platform: "PC", store: "AMAZON", rating: 5, color: "from-green-600/20" },
    { id: 11, title: "PS Plus 12mo", originalPrice: 79.99, salePrice: 59.99, discount: 25, platform: "PS5", store: "PSN", rating: 4, color: "from-blue-900/40" },
    { id: 12, title: "Among Us", originalPrice: 4.99, salePrice: 1.99, discount: 60, platform: "PC", store: "EPIC", rating: 4, color: "from-red-500/20" },
  ];

  return (
    <main className="mt-20 md:mt-32 overflow-hidden">
      {/* HERO SECTION */}
      <section className="relative py-24 bg-brand-red border-b-8 border-black shadow-[0_10px_0_rgba(0,0,0,1)] overflow-hidden">
        <div className="absolute inset-0 halftone opacity-20 pointer-events-none"></div>
        <div className="max-w-[1600px] mx-auto px-6 relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="text-center md:text-left">
             <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 bg-white border-2 border-black text-brand-red font-heading text-lg font-black uppercase tracking-widest rotate-[-1deg]">
                <Zap size={20} fill="currentColor" /> MARKET_ACTIVE!
             </div>
             <h1 className="text-[clamp(60px,15vw,160px)] font-black italic tracking-wider leading-[0.8] mb-8 text-white drop-shadow-[8px_8px_0px_#000]">
               DEALS!
             </h1>
          </div>
          
          <div className="bg-white border-4 border-black p-8 flex flex-col items-center gap-4 relative group shadow-comic rotate-2">
             <div className="absolute -top-5 left-1/2 -translate-x-1/2 px-4 py-2 bg-brand-lime text-black border-2 border-black text-lg font-heading font-black uppercase tracking-widest italic">
                DAILY_RESET!
             </div>
             <div className="text-xs font-heading font-black text-black uppercase tracking-widest mb-2">DEALS_EXPIRE_IN:</div>
             <Countdown />
          </div>
        </div>
      </section>

      {/* FLASH DEALS SCANNER */}
      <div className="bg-brand-secondary border-b border-brand-border py-4 overflow-hidden overflow-x-auto no-scrollbar">
         <div className="max-w-[1600px] mx-auto px-6 flex items-center gap-6">
            <div className="flex items-center gap-3 shrink-0 pr-6 border-r border-white/10 uppercase italic font-black text-xs font-heading">
               <AlertCircle size={14} className="text-brand-red animate-pulse" /> FLASH_SCAN
            </div>
            {flashDeals.map((deal, i) => (
              <div key={i} className="flex items-center gap-4 bg-brand-bg border border-white/5 p-2 pr-6 hover:border-brand-lime transition-colors cursor-pointer group">
                 <div className={`w-10 h-10 bg-gradient-to-br ${deal.color} shrink-0`}></div>
                 <div className="text-nowrap">
                    <div className="text-[10px] font-black uppercase leading-none mb-1 group-hover:text-brand-lime transition-colors">{deal.title}</div>
                    <div className="flex items-center gap-2">
                       <span className="text-xs font-black italic text-brand-lime">{deal.price}</span>
                       <span className="text-[8px] font-black text-brand-red">-{deal.discount}%</span>
                    </div>
                 </div>
              </div>
            ))}
         </div>
      </div>

      <div className="max-w-[1600px] mx-auto px-6 py-12">
        {/* DEAL OF THE DAY HERO CARD */}        <section className="mb-20">
           <div className="bg-white border-8 border-black shadow-comic relative group overflow-hidden">
              <div className="absolute inset-0 halftone opacity-10 pointer-events-none"></div>
              <div className="grid grid-cols-1 lg:grid-cols-2">
                 <div className="aspect-video relative overflow-hidden bg-zinc-100 border-b-4 lg:border-b-0 lg:border-r-4 border-black">
                    <img 
                      src="https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2670&auto=format&fit=crop" 
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 hover:scale-110" 
                      alt="Pro Controller" 
                    />
                    <div className="absolute top-6 left-6 flex gap-3">
                       <Tag type="breaking">DEAL_OF_THE_DAY!</Tag>
                       <PlatformBadge platform="PC" />
                    </div>
                 </div>

                 <div className="p-8 md:p-12 flex flex-col justify-center bg-white">
                    <div className="flex items-center justify-between mb-8">
                       <div className="flex items-center gap-2 px-4 py-2 bg-brand-red text-white text-xl font-heading font-black uppercase tracking-widest italic border-2 border-black rotate-[-3deg] shadow-comic-sm">
                          75% OFF!!
                       </div>
                       <div className="text-right">
                          <div className="text-xs font-heading font-black text-black uppercase mb-1">SALE_ENDS_IN:</div>
                          <div className="text-3xl font-heading font-black italic text-brand-red drop-shadow-[2px_2px_0px_#000]">04:12:10</div>
                       </div>
                    </div>
                    
                    <h2 className="text-5xl md:text-8xl font-heading font-black italic leading-[0.8] tracking-tighter uppercase mb-8 text-black drop-shadow-[4px_4px_0px_#2FAADF]">
                       ELITE SERIES 2<br/><span className="text-brand-red">CORE_CONTROLLER</span>
                    </h2>

                    <div className="flex items-baseline gap-4 mb-8 py-8 border-y-4 border-black">
                       <span className="text-6xl font-heading font-black italic tracking-tighter text-black">$49.99</span>
                       <span className="text-2xl text-black/40 line-through font-heading font-black italic tracking-tighter">$129.99</span>
                    </div>

                    <div className="flex flex-col sm:flex-row items-center gap-6">
                       <button className="comic-btn w-full sm:flex-1 bg-brand-red text-white py-6 text-2xl">
                          GET DEAL NOW! <ArrowRight size={24} className="inline ml-2" />
                       </button>
                    </div>
                 </div>
              </div>
           </div>
        </section>


        {/* FILTER ROW */}
        <section className="mb-12 space-y-8 border-b border-brand-border pb-10">
           <div className="flex flex-wrap items-center gap-10">
              <div className="space-y-3">
                 <h4 className="text-[10px] font-mono font-black text-brand-cyan tracking-[0.2em] uppercase">SYSTEM_NODE</h4>
                 <div className="flex flex-wrap gap-4">
                    {platforms.map(p => (
                      <button 
                         key={p} 
                         onClick={() => setActiveTab(p)}
                         className={`text-[11px] font-black italic uppercase tracking-widest pb-1 transition-all border-b-2 ${activeTab === p ? 'text-brand-cyan border-brand-cyan' : 'text-brand-muted border-transparent hover:text-white'}`}
                      >
                         {p}
                      </button>
                    ))}
                 </div>
              </div>
              
              <div className="space-y-3">
                 <h4 className="text-[10px] font-mono font-black text-brand-muted tracking-[0.2em] uppercase">SORT_PROTOCOL</h4>
                 <div className="bg-brand-secondary border border-brand-border px-4 py-2 text-[10px] font-black uppercase italic tracking-widest cursor-pointer flex items-center gap-4 hover:border-brand-cyan transition-colors">
                    BIGGEST_DISCOUNT <ChevronRight size={14} className="rotate-90" />
                 </div>
              </div>
           </div>
        </section>

        {/* DEALS GRID */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-24">
           {gridDeals.map((deal) => (
             <DealCard key={deal.id} deal={deal} />
           ))}
        </section>

        {/* CROSS-SELL BANNER */}
        <section className="mb-24">
           <div className="bg-brand-lime p-1 grid grid-cols-1 md:grid-cols-12 items-stretch shadow-neon-lime relative overflow-hidden group">
              <div className="md:col-span-8 bg-brand-bg p-8 md:p-12 relative z-10">
                 <div className="flex items-center gap-3 mb-6">
                    <Tag type="intel">PULSE_EXTRACT</Tag>
                    <Star size={14} className="text-brand-lime fill-current" />
                 </div>
                 <h2 className="text-4xl md:text-6xl font-black italic leading-[0.9] tracking-tighter uppercase mb-6">
                    STACK YOUR SETUP:<br/><span className="text-brand-lime">FUEL + GAMES</span>
                 </h2>
                 <p className="text-brand-muted text-lg max-w-xl mb-10 leading-relaxed font-black italic italic tracking-tight">
                    Order a 24-Pack of <span className="text-white">PULSE Energy Original</span> and receive Two Game Vouchers (Up to $60 Value each) instantly on the platform of your choice.
                 </p>
                 <button className="bg-brand-lime text-brand-bg font-heading px-10 py-5 text-xl font-black italic shadow-neon-lime hover:scale-105 transition-all active:scale-95 uppercase tracking-tighter">
                   SECURE_THE_FUEL
                 </button>
              </div>
              <div className="md:col-span-4 bg-zinc-900 flex flex-col items-center justify-center p-10 border-l border-white/10 relative">
                 <div className="absolute top-0 right-0 p-8 opacity-5">
                    <Zap size={200} className="text-brand-lime" />
                 </div>
                 <div className="relative text-center space-y-6">
                    <div className="w-24 h-48 bg-brand-lime mx-auto flex items-center justify-center relative translate-y-4">
                       <div className="text-brand-bg text-4xl font-black italic -rotate-90">PULSE</div>
                    </div>
                    <div className="text-[10px] font-mono font-black text-brand-muted uppercase tracking-[0.3em]">SUPPLY_DROP_ACTIVE</div>
                 </div>
              </div>
           </div>
        </section>

        {/* PRICE TRACKER CALLOUT */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-24">
           <div className="bg-brand-secondary border border-brand-border p-10 flex flex-col justify-center">
              <h2 className="text-3xl font-black italic mb-6 flex items-center gap-3">
                 <Bell className="text-brand-cyan" /> PRICE DROP ALERTS
              </h2>
              <p className="text-brand-muted mb-10 text-sm leading-relaxed uppercase font-bold tracking-widest">
                 Never pay full price again. Tell us what you're watching — we'll notify you via encrypted signal when prices hit your target.
              </p>
              <div className="space-y-4">
                 <input 
                   type="text" 
                   placeholder="SEARCH_FOR_GAME_INTEL" 
                   className="w-full bg-brand-bg border border-brand-border p-4 font-mono text-xs focus:border-brand-cyan outline-none transition-colors"
                 />
                 <div className="flex flex-col sm:flex-row gap-4">
                    <input 
                      type="email" 
                      placeholder="SIGNAL_ADDRESS" 
                      className="flex-1 bg-brand-bg border border-brand-border p-4 font-mono text-xs focus:border-brand-cyan outline-none transition-colors"
                    />
                    <button className="bg-brand-cyan text-brand-bg font-heading px-8 py-4 font-black italic text-sm tracking-widest hover:shadow-neon-cyan transition-all">
                       TRACK_IT
                    </button>
                 </div>
              </div>
           </div>
           
           <div className="grid grid-cols-2 gap-6">
              {[
                { icon: Monitor, label: 'PC_HARDWARE', count: 142 },
                { icon: Gamepad2, label: 'CORE_CONSOLES', count: 28 },
                { icon: MousePointer2, label: 'PERIPHERALS', count: 567 },
                { icon: Cpu, label: 'COMPONENTS', count: 89 }
              ].map((item, i) => (
                <div key={i} className="bg-brand-card border border-brand-border p-6 flex flex-col items-center justify-center text-center hover:border-white transition-all cursor-pointer group">
                   <div className="w-12 h-12 rounded-sm bg-brand-secondary border border-white/5 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <item.icon size={24} className="text-brand-muted group-hover:text-brand-cyan" />
                   </div>
                   <div className="text-xl font-black italic mb-1">{item.count}</div>
                   <div className="text-[10px] font-mono font-black text-brand-muted uppercase tracking-widest">{item.label}</div>
                </div>
              ))}
           </div>
        </section>
      </div>
    </main>
  );
};
