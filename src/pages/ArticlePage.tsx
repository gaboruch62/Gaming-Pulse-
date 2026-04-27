import React, { useState, useEffect } from 'react';
import { 
  ArrowRight, 
  Share2, 
  MessageSquare, 
  ThumbsUp, 
  ThumbsDown, 
  ChevronRight,
  TrendingUp,
  Mail,
  Zap,
  Bookmark,
  Link2,
  TableOfContents
} from 'lucide-react';
import { motion } from 'motion/react';
import { PlatformBadge, Tag, PulseScore } from '../components/common';

export const ArticlePage = ({ onNavigate }: { onNavigate: (page: string) => void }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="mt-20 md:mt-32 max-w-[1600px] mx-auto px-4 md:px-6 grid grid-cols-12 gap-8 md:gap-10 overflow-hidden">
      
      {/* LEFT SIDEBAR (Sticky Navigation Tools) */}
      <aside className="hidden xl:block col-span-3">
         <div className="sticky top-44 space-y-12">
            <section aria-labelledby="toc-heading">
              <h4 id="toc-heading" className="text-[10px] font-mono font-black text-brand-cyan tracking-[0.3em] uppercase mb-6 flex items-center gap-2">
                <TableOfContents size={14} aria-hidden="true" /> Intel_Matrix
              </h4>
              <ul className="space-y-4 font-mono text-[10px] uppercase font-bold text-brand-muted tracking-widest" role="list">
                <li role="listitem">
                  <button aria-label="Skip to section: The Announcement" className="hover:text-brand-lime cursor-pointer transition-colors border-l-2 border-brand-lime pl-3 text-left uppercase w-full">01. The_Announcement</button>
                </li>
                <li role="listitem">
                  <button aria-label="Skip to section: Platform Breakdown" className="hover:text-brand-lime cursor-pointer transition-colors border-l-2 border-transparent pl-3 text-left uppercase w-full">02. Platform_Breakdown</button>
                </li>
                <li role="listitem">
                  <button aria-label="Skip to section: World Scale" className="hover:text-brand-lime cursor-pointer transition-colors border-l-2 border-transparent pl-3 text-left uppercase w-full">03. World_Scale</button>
                </li>
                <li role="listitem">
                  <button aria-label="Skip to section: Verdict" className="hover:text-brand-lime cursor-pointer transition-colors border-l-2 border-transparent pl-3 text-left uppercase w-full">04. Verdict</button>
                </li>
              </ul>
            </section>

            <section className="bg-brand-card border border-brand-border p-4 shadow-xl">
               <h4 className="text-[10px] font-mono font-black text-brand-cyan tracking-[0.3em] uppercase mb-4">Trending_Nodes</h4>
               <div className="space-y-4">
                  {[1, 2, 3].map(i => (
                    <div key={i} className="group cursor-pointer">
                       <h5 className="text-[11px] font-black italic uppercase leading-tight group-hover:text-brand-lime mb-1">STALKER 2 PATCH 1.0.4</h5>
                       <PlatformBadge platform="PC" />
                    </div>
                  ))}
               </div>
            </section>

            <section className="bg-brand-lime p-4">
               <h4 className="text-[11px] font-black italic text-brand-bg uppercase mb-2">STAY_IN_THE_ZONE</h4>
               <p className="text-[10px] text-brand-bg font-bold opacity-80 mb-4 font-mono">PULSE ENERGY: ZERO LAG, ALL DRIVE.</p>
               <button className="w-full bg-brand-bg text-white font-heading py-2 text-[10px] font-black italic">GRAB_REFILL</button>
            </section>
         </div>
      </aside>

      {/* ARTICLE CONTENT */}
      <div className="col-span-12 xl:col-span-6 space-y-12 pb-32">
        
        {/* 2. ARTICLE HERO */}
        <header className="space-y-8">
           <nav className="flex items-center gap-2 font-mono text-[10px] uppercase font-bold text-brand-muted tracking-widest">
              <span onClick={() => onNavigate('home')} className="hover:text-brand-cyan cursor-pointer transition-colors">Home</span>
              <ChevronRight size={12} />
              <span className="hover:text-brand-cyan cursor-pointer transition-colors">News</span>
              <ChevronRight size={12} />
              <span className="text-brand-cyan">PC</span>
           </nav>

           <div className="flex gap-3">
              <PlatformBadge platform="PS5" />
              <Tag type="breaking">INTEL_LEAK</Tag>
           </div>

           <h1 className="text-[clamp(32px,10vw,72px)] font-black italic uppercase tracking-tighter leading-[0.95] md:leading-[0.9] text-white">
              GTA VI Release Date Confirmed: <span className="text-brand-cyan">Everything We Know</span>
           </h1>

           <p className="text-lg md:text-xl text-brand-text/70 italic font-medium leading-relaxed max-w-2xl">
              Rockstar Games finally shatters the silence with a timestamp heard 'round the world. Welcome back to Vice City.
           </p>

           <div className="flex flex-col md:flex-row md:items-center justify-between py-6 border-y border-brand-border px-1 gap-6 md:gap-0">
              <div className="flex items-center gap-4">
                 <img src="https://i.pravatar.cc/48?u=marcus" className="w-12 h-12 rounded-full grayscale border border-brand-cyan" alt="Marcus" loading="lazy" />
                 <div className="space-y-0.5">
                    <div className="text-sm font-black italic">Marcus Webb</div>
                    <div className="text-[10px] font-mono font-bold text-brand-muted uppercase flex flex-wrap gap-x-3 gap-y-1">
                       <span className="text-brand-lime">Senior Editor</span>
                       <span>April 27, 2025</span>
                       <span>6 MIN READ</span>
                    </div>
                 </div>
              </div>
              <div className="flex gap-2">
                 {[
                   { icon: Share2, label: 'Share' },
                   { icon: MessageSquare, label: 'Comments' },
                   { icon: Bookmark, label: 'Save' },
                   { icon: Link2, label: 'Link' }
                 ].map((item, i) => (
                   <button key={i} aria-label={item.label} className="p-3 md:p-2 border border-brand-border hover:border-brand-cyan hover:text-brand-cyan transition-all rounded-sm text-brand-muted min-w-[44px] min-h-[44px] flex items-center justify-center">
                     <item.icon size={16} className="md:size-[14px]" aria-hidden="true" />
                   </button>
                 ))}
              </div>
           </div>
        </header>

        {/* 3. FEATURED IMAGE BLOCK */}
        <figure className="relative group">
           <div className="aspect-[16/9] bg-gradient-to-br from-brand-cyan/20 to-brand-red/20 border border-brand-border overflow-hidden relative">
              <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=1200')] bg-cover bg-center grayscale opacity-60"></div>
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                 <PulseScore score={94} size="lg" />
              </div>
           </div>
           <figcaption className="mt-3 text-[10px] font-mono font-bold text-brand-muted italic uppercase text-center tracking-widest">
              // CONCEPT ART_V.2 // VICE CITY DISTRICT 04_NEON SECTOR
           </figcaption>
        </figure>

        {/* 4. ARTICLE BODY */}
        <section className="prose prose-invert prose-stone max-w-none text-brand-text/90 leading-loose space-y-8">
           <p className="text-lg">
             The tremors of anticipation have finally coalesced into hard data. Rockstar Games, the architects of modern open-world philosophy, have confirmed that <span className="text-brand-cyan font-bold">Grand Theft Auto VI</span> is slated for a worldwide deployment in <span className="text-brand-lime font-bold">November 2025</span>. This isn't just a release date; it's a recalibration of the entire industry's internal clock.
           </p>

           <h2 className="text-3xl font-black italic uppercase tracking-tighter text-white pt-8">Next-Gen Verticality and Scope</h2>
           <p>
             Vice City is no longer just a neon-soaked nostalgia trip. According to leaked internal documentation, the metropolitan area of Leonida is built with a 1:1 scale philosophy for major interiors. This means the transition from high-speed chases to intricate heist planning happens without a single loading stall across current-gen hardware. 
           </p>

           <blockquote className="border-l-4 border-brand-cyan bg-brand-secondary p-8 my-10 italic">
              <span className="text-4xl text-brand-cyan font-serif leading-none h-4 block mb-4">“</span>
              The scale of the simulation isn't measured in miles, but in the density of human-like AI interactions. We are moving beyond scripted encounters into a living ecosystem where every citizen has a persistent logic.
              <footer className="mt-4 text-xs font-mono font-black text-brand-muted uppercase">— Lead Engine Architect at Rockstar North</footer>
           </blockquote>

           <h3 className="text-xl font-black italic uppercase text-brand-cyan">The "Leonida" Effect</h3>
           <p>
             The state of Leonida spans across three distinct urban centers connected by a dense, procedural wilderness system. Early benchmarks suggest a level of foliage and water simulation that leverages advanced ray-traced global illumination to a degree never seen in consumer software.
           </p>

           <div className="bg-brand-card border border-brand-cyan/30 p-6 flex items-center justify-between group cursor-pointer hover:border-brand-cyan transition-all">
              <div className="flex gap-4 items-center">
                 <div className="w-12 h-12 bg-brand-cyan/10 flex items-center justify-center text-brand-cyan">
                    <Zap size={24} />
                 </div>
                 <div>
                    <h5 className="text-xs font-black italic text-brand-muted uppercase mb-1">ALSO_READ // INTEL_FEED</h5>
                    <h4 className="text-sm font-black italic uppercase text-white group-hover:text-brand-cyan">GTA VI Map Size Compared to Los Santos</h4>
                 </div>
              </div>
              <ArrowRight className="text-brand-cyan group-hover:translate-x-2 transition-transform" size={20} />
           </div>

           <p>
             For the first time in the series, the dual-protagonist system (codenamed "Lucia & Jason") introduces a synchronous swap mechanic. This allows players to coordinate tactical maneuvers from two different perspectives in real-time, effectively doubling the complexity of the dynamic heist encounters.
           </p>

           <div className="bg-brand-secondary border border-brand-border p-8 space-y-6">
              <h4 className="text-sm font-black italic font-heading flex items-center gap-2 border-b border-white/5 pb-4">
                 <Zap size={16} className="text-brand-lime" /> QUICK_FACTS
              </h4>
              <ul className="space-y-4 font-mono text-[11px] font-bold text-brand-muted uppercase tracking-widest list-none p-0">
                 <li className="flex gap-3"><span className="text-brand-cyan">[0]</span> NOVEMBER 2025 RELEASE WINDOW</li>
                 <li className="flex gap-3"><span className="text-brand-cyan">[1]</span> DUAL-PROTAGONIST SWAP MECHANIC</li>
                 <li className="flex gap-3"><span className="text-brand-cyan">[2]</span> LEONIDA STATE WITH 3 MAJOR CITIES</li>
                 <li className="flex gap-3"><span className="text-brand-cyan">[3]</span> 1:1 INTERIOR SCALE RATIO</li>
                 <li className="flex gap-3"><span className="text-brand-cyan">[4]</span> DEBUTING EXCLUSIVE RAY-TRACED GI</li>
              </ul>
           </div>
        </section>

        {/* 5. TAGS ROW */}
        <div className="flex flex-wrap gap-2 pt-8 border-t border-white/5">
           {['#GTA6', '#RockstarGames', '#PC', '#PS5', '#Xbox'].map(tag => (
             <span key={tag} className="px-3 py-1 bg-brand-bg border border-brand-border text-[9px] font-mono font-bold text-brand-muted hover:border-brand-cyan hover:text-brand-cyan cursor-pointer transition-all uppercase tracking-widest">
                {tag}
             </span>
           ))}
        </div>

        {/* 6. PULSE VERDICT BOX */}
        <section className="bg-brand-secondary border border-brand-cyan/20 p-6 md:p-8 shadow-2xl relative overflow-hidden group">
           <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity hidden md:block">
              <Zap size={120} className="text-brand-cyan" />
           </div>
           <h2 className="text-2xl md:text-3xl font-black italic font-heading text-brand-cyan mb-6">THE_PULSE_VERDICT</h2>
           <p className="text-sm text-brand-text/80 leading-relaxed mb-8 italic">
              Rockstar isn't just selling a game; they're selling a vision of the mid-2020s simulation frontier. If the internal benchmarks hold true, GTA VI will be the definitive software event of the decade.
           </p>
           <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 md:gap-0">
              <div className="flex flex-col md:flex-row md:items-center gap-6">
                 <PulseScore score={94} size="md" />
                 <div>
                    <h5 className="text-[10px] font-mono font-black text-brand-muted uppercase tracking-[0.2em] mb-3">Was this intel useful?</h5>
                    <div className="flex flex-wrap gap-2">
                       <button className="flex items-center gap-2 px-4 py-3 bg-brand-bg border border-white/10 text-[10px] font-mono font-bold hover:border-brand-lime hover:text-brand-lime transition-all min-h-[44px]">
                          <ThumbsUp size={14} /> AFFIRMATIVE
                       </button>
                       <button className="flex items-center gap-2 px-4 py-3 bg-brand-bg border border-white/10 text-[10px] font-mono font-bold hover:border-brand-red hover:text-brand-red transition-all min-h-[44px]">
                          <ThumbsDown size={14} /> NEGATIVE
                       </button>
                    </div>
                 </div>
              </div>
              <div className="text-right border-t border-white/5 pt-6 md:border-t-0 md:pt-0">
                 <div className="text-xl md:text-[24px] font-black italic tracking-tighter text-brand-lime">LEVEL_5_CLEARANCE</div>
                 <div className="text-[9px] font-mono font-bold text-brand-muted uppercase tracking-widest">HIVE_MIND_APPROVED</div>
              </div>
           </div>
        </section>

        {/* 7. AUTHOR BIO CARD */}
        <section className="bg-brand-card border border-brand-border p-6 md:p-8 flex flex-col md:flex-row items-center gap-6 md:gap-8">
           <img src="https://i.pravatar.cc/100?u=marcus" className="w-20 h-20 md:w-24 md:h-24 rounded-full border-2 border-brand-cyan grayscale" alt="Marcus" loading="lazy" />
           <div className="space-y-4 flex-1 text-center md:text-left">
              <div>
                 <h4 className="text-xl md:text-2xl font-black italic uppercase leading-none mb-1">Marcus Webb</h4>
                 <p className="text-[9px] md:text-[10px] font-mono font-black text-brand-cyan uppercase tracking-widest">Senior Technical Analyst // Field Intel</p>
              </div>
              <p className="text-xs text-brand-muted leading-relaxed">
                Covering the intersection of high-fidelity graphics and open-world simulation since 2012. Marcus specializes in engine deep-dives and narrative structure analysis.
              </p>
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 md:gap-0">
                 <div className="text-[10px] font-mono font-bold text-brand-muted uppercase">642 INTEL_LOGS PUBLISHED</div>
                 <button className="bg-brand-cyan text-brand-bg font-heading px-6 py-3 md:py-2 text-[10px] font-black italic tracking-widest hover:shadow-neon-cyan transition-all min-h-[44px]">FOLLOW_PULSE</button>
              </div>
           </div>
        </section>

        {/* 8. COMMENTS SECTION */}
        <section className="space-y-10 pt-10 border-t border-white/5">
           <h2 className="text-3xl font-black italic font-heading flex items-center gap-3">
              JOIN_THE_CONVERSATION <span className="text-xs bg-brand-cyan text-brand-bg px-2 py-0.5 font-black italic not-italic">128</span>
           </h2>

           <div className="space-y-4">
              <div className="bg-brand-bg border border-brand-border p-4">
                 <textarea 
                   placeholder="TRANSMIT_YOUR_THOUGHTS..." 
                   className="w-full bg-transparent border-none focus:ring-0 text-sm font-mono text-brand-text placeholder:text-brand-muted/40 h-24 resize-none"
                 />
                 <div className="flex justify-between items-center pt-4 border-t border-white/5">
                    <span className="text-[8px] font-mono font-bold text-brand-muted uppercase">ENCRYPTED_LINE_ACTIVE</span>
                    <button className="bg-brand-lime text-brand-bg font-heading px-6 py-2 text-xs font-black italic hover:shadow-neon-lime transition-all">POST_INTEL</button>
                 </div>
              </div>

              {[
                { name: "ZeroDay", comment: "The trailer looks insane. If Vice City actually looks like that on a base PS5, I'm sold.", likes: 42 },
                { name: "GhostProtocol", comment: "November 2025? Time to hibernate for 6 months then.", likes: 112 },
                { name: "NeonRaider", comment: "I'm more interested in the ray-tracing implementation. Rockstar usually pushes the tech envelope hard.", likes: 28 },
              ].map((c, i) => (
                <div key={i} className="bg-brand-card p-6 border border-white/5 space-y-4">
                   <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-brand-cyan/20 rounded-full flex items-center justify-center text-brand-cyan font-black text-[10px]">@{c.name[0]}</div>
                      <div>
                         <div className="text-[11px] font-black italic uppercase">{c.name}</div>
                         <div className="text-[9px] font-mono text-brand-muted">VERIFIED_GAMER // 2H AGO</div>
                      </div>
                   </div>
                   <p className="text-xs text-brand-muted leading-relaxed">{c.comment}</p>
                   <div className="flex gap-6 pt-2">
                      <button className="flex items-center gap-2 text-[9px] font-mono font-black text-brand-muted hover:text-brand-lime transition-all uppercase tracking-widest"><ThumbsUp size={10} /> {c.likes} SUPPORT</button>
                      <button className="flex items-center gap-2 text-[9px] font-mono font-black text-brand-muted hover:text-brand-cyan transition-all uppercase tracking-widest"><MessageSquare size={10} /> REPLY</button>
                   </div>
                </div>
              ))}
           </div>
        </section>

        {/* 9. RELATED ARTICLES */}
        <section className="space-y-10 pt-16 md:pt-20 border-t border-white/5">
           <h2 className="text-2xl md:text-3xl font-black italic font-heading">YOU_MIGHT_ALSO_LIKE</h2>
           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { title: "GTA VI MAP LEAK REVEALS 3 CITIES", plat: "PS5", score: 98 },
                { title: "INTEL CORE ULTRA GEN 2 SPECS", plat: "PC", score: 62 },
                { title: "NINTENDO SWITCH 2 PRICING", plat: "Nintendo", score: 79 },
              ].map((news, i) => (
                <article key={i} onClick={() => onNavigate('article')} className="bg-brand-card border border-brand-border p-3 group cursor-pointer hover:border-brand-cyan transition-all">
                  <div className="aspect-video bg-zinc-800 mb-4 relative overflow-hidden">
                     <div className="absolute inset-0 bg-gradient-to-tr from-brand-bg/80 to-transparent group-hover:scale-110 transition-transform duration-700"></div>
                     <div className="absolute top-2 right-2 flex gap-2">
                        <PulseScore score={news.score} size="sm" />
                     </div>
                  </div>
                  <PlatformBadge platform={news.plat} />
                  <h4 className="text-xs font-black italic uppercase leading-tight mt-2 group-hover:text-brand-cyan transition-colors">{news.title}</h4>
                </article>
              ))}
           </div>
        </section>
      </div>

      {/* RIGHT SIDEBAR (Ad & Newsletter) */}
      <aside className="hidden xl:block col-span-3">
         <div className="sticky top-44 space-y-12">
            <section className="bg-brand-card border border-brand-border p-6 shadow-xl space-y-6">
               <h3 className="text-xs font-black italic font-heading text-brand-lime uppercase tracking-widest">GET_THE_PULSE_WEEKLY</h3>
               <p className="text-[10px] text-brand-muted leading-relaxed font-mono font-bold">
                 Direct Intel. Major Drops. 
                 Zero Filler.
               </p>
               <div className="space-y-3">
                  <input type="email" placeholder="GAMER_ID@EMAIL.COM" className="w-full bg-brand-bg border border-brand-border py-4 px-4 font-mono text-[10px] focus:outline-none focus:border-brand-lime transition-all" />
                  <button className="w-full bg-brand-lime text-brand-bg font-heading py-4 text-xs font-black italic shadow-neon-lime">SUBSCRIBE</button>
               </div>
            </section>

            <div className="bg-gradient-to-b from-brand-cyan to-brand-red p-[1px] group">
               <div className="bg-brand-bg p-8 space-y-6">
                  <Tag type="review">PULSE ENERGY</Tag>
                  <h4 className="text-2xl font-black italic text-white tracking-tighter">MAX_FOCUS. ZERO_CRASH.</h4>
                  <button className="w-full py-4 bg-brand-cyan text-brand-bg font-heading text-xs font-black italic shadow-neon-cyan group-hover:scale-105 transition-all">GRAB_A_PACK</button>
               </div>
            </div>
         </div>
      </aside>
    </main>
  );
};
