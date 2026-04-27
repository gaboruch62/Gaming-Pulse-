import React, { useState, useEffect } from 'react';
import { 
  Trophy, 
  Flame, 
  Tv, 
  Calendar, 
  BarChart3, 
  ArrowRight, 
  Gamepad2,
  Clock,
  ExternalLink,
  Users
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Tag } from '../components/common';

const LiveMatchCard: React.FC<{ match: any }> = ({ match }) => {
  const [scoreA, setScoreA] = useState(match.scoreA);
  const [scoreB, setScoreB] = useState(match.scoreB);

  useEffect(() => {
    if (match.status === 'LIVE') {
      const interval = setInterval(() => {
        if (Math.random() > 0.8) {
          if (Math.random() > 0.5) setScoreA(s => s + 1);
          else setScoreB(s => s + 1);
        }
      }, 8000);
      return () => clearInterval(interval);
    }
  }, [match.status]);

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className={`bg-brand-card border ${match.status === 'LIVE' ? 'border-brand-red shadow-neon-red ring-1 ring-brand-red/20' : 'border-brand-border'} p-4 relative group cursor-pointer hover:border-brand-cyan transition-all`}
    >
      {match.status === 'LIVE' && (
        <div className="absolute -top-2 left-4 px-2 py-0.5 bg-brand-red text-white text-[8px] font-black uppercase flex items-center gap-1 animate-pulse z-10">
          <div className="w-1 h-1 bg-white rounded-full"></div> LIVE
        </div>
      )}
      
      <div className="flex justify-between items-center mb-4">
        <span className="text-[9px] font-mono font-black text-brand-muted uppercase tracking-widest">{match.tournament}</span>
        <Tag type={match.status === 'LIVE' ? 'breaking' : 'intel'}>{match.game}</Tag>
      </div>

      <div className="flex items-center justify-between gap-4 py-4">
        <div className="flex flex-col items-center gap-2 flex-1">
          <div className="w-10 h-10 bg-brand-secondary border border-white/5 rounded-sm flex items-center justify-center grayscale group-hover:grayscale-0 transition-all">
            <Users size={20} className="text-brand-muted" />
          </div>
          <span className="text-[10px] font-black uppercase text-center">{match.teamA}</span>
        </div>

        <div className="flex flex-col items-center justify-center">
           <div className={`text-2xl font-black italic tracking-tighter ${match.status === 'LIVE' ? 'text-brand-red' : 'text-brand-text'}`}>
             {scoreA} : {scoreB}
           </div>
           <span className="text-[8px] font-mono font-bold text-brand-muted uppercase">SCORE</span>
        </div>

        <div className="flex flex-col items-center gap-2 flex-1 text-right">
          <div className="w-10 h-10 bg-brand-secondary border border-white/5 rounded-sm flex items-center justify-center grayscale group-hover:grayscale-0 transition-all">
            <Users size={20} className="text-brand-muted" />
          </div>
          <span className="text-[10px] font-black uppercase text-center">{match.teamB}</span>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-white/5 flex items-center justify-between">
        <div className="flex items-center gap-2 text-[8px] font-mono text-brand-muted uppercase">
           <Clock size={10} /> {match.status === 'LIVE' ? 'WATCHING NOW' : match.time}
        </div>
        <button className="text-brand-cyan hover:translate-x-1 transition-transform">
           <ArrowRight size={14} />
        </button>
      </div>
    </motion.div>
  );
};

export const EsportsPage = ({ onNavigate }: { onNavigate: (page: string) => void }) => {
  const [tickerOffset, setTickerOffset] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTickerOffset(prev => (prev - 1) % 400);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  const liveMatches = [
    { id: 1, game: "CS2", teamA: "NAVI", teamB: "FAZE", scoreA: 11, scoreB: 9, status: "LIVE", tournament: "PGL MAJOR", time: "18:30" },
    { id: 2, game: "LOLL", teamA: "T1", teamB: "G2", scoreA: 2, scoreB: 1, status: "LIVE", tournament: "MSI 2025", time: "19:00" },
    { id: 3, game: "VAL", teamA: "SEN", teamB: "FNC", scoreA: 0, scoreB: 0, status: "UPCOMING", tournament: "MASTERS TOKYO", time: "21:00" },
    { id: 4, game: "DOTA", teamA: "TS", teamB: "GG", scoreA: 32, scoreB: 45, status: "LIVE", tournament: "TI14", time: "17:45" },
    { id: 5, game: "OW2", teamA: "LDN", teamB: "SEO", scoreA: 3, scoreB: 1, status: "FINISHED", tournament: "OWL FINALS", time: "CLOSED" },
    { id: 6, game: "CS2", teamA: "VIT", teamB: "Mouz", scoreA: 0, scoreB: 0, status: "UPCOMING", tournament: "ESL PRO LEAGUE", time: "01:30" },
  ];

  return (
    <main className="mt-20 md:mt-32 overflow-hidden">
      {/* HERO SECTION */}
      <section className="relative py-20 bg-brand-bg border-b border-brand-border overflow-hidden">
        <div className="absolute inset-0 scanline opacity-30 pointer-events-none"></div>
        <div className="max-w-[1600px] mx-auto px-6 relative z-10">
          <div className="flex flex-col items-center text-center">
             <div className="flex items-center gap-3 mb-6 px-4 py-1 bg-brand-red/10 border border-brand-red/30 text-brand-red font-mono text-[10px] font-black uppercase tracking-[0.3em] animate-pulse">
                <Flame size={12} fill="currentColor" /> LIVE_NOW_TRANSMISSION
             </div>
             <h1 className="text-6xl md:text-[140px] font-black italic tracking-tighter leading-[0.8] mb-8 animate-glitch" data-text="ESPORTS">
               ESPORTS
             </h1>
             <p className="text-lg md:text-xl font-black italic text-brand-text/70 uppercase tracking-tighter max-w-2xl">
               Tournaments. Results. Standings. <span className="text-brand-cyan">All live.</span>
             </p>
          </div>
        </div>
      </section>

      {/* LIVE SCORES TICKER */}
      <div className="h-10 bg-brand-secondary text-white overflow-hidden flex items-center whitespace-nowrap z-20 border-b border-brand-border relative cursor-default select-none">
        <div className="absolute left-0 h-full bg-brand-bg px-6 z-10 flex items-center font-black italic font-heading text-xs shadow-xl border-r border-brand-border">
          LIVE_SIGNAL
        </div>
        <motion.div 
          animate={{ x: [0, -2000] }}
          transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
          className="flex gap-20 font-mono text-[10px] font-black uppercase tracking-widest ml-40"
        >
          {liveMatches.map((m, i) => (
            <span key={i} className="flex items-center gap-4 text-brand-muted">
              {m.game} <span className="text-white">{m.teamA} {m.scoreA} : {m.scoreB} {m.teamB}</span>
              <span className="w-1.5 h-1.5 bg-brand-red rounded-full animate-pulse"></span>
            </span>
          ))}
        </motion.div>
      </div>

      <div className="max-w-[1600px] mx-auto px-6 py-12">
         {/* FEATURED TOURNAMENT */}
         <section className="mb-20">
            <div className="bg-brand-card border border-brand-border p-1 relative overflow-hidden group">
               <div className="bg-brand-secondary p-8 md:p-12 border border-white/5 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12">
                  <div className="lg:col-span-12 absolute top-0 right-0 p-12 opacity-5">
                    <Trophy size={200} className="text-white" />
                  </div>
                  
                  <div className="lg:col-span-8 space-y-8">
                     <div>
                        <div className="flex items-center gap-3 mb-6">
                           <Tag type="intel">ACTIVE_SZN_21</Tag>
                           <Tag type="breaking">PREMIUM_INTEL</Tag>
                        </div>
                        <h2 className="text-4xl md:text-7xl font-black italic leading-[0.9] tracking-tighter uppercase mb-4">
                           ESL PRO LEAGUE<br/><span className="text-brand-cyan">SEASON 21_FINAL</span>
                        </h2>
                        <div className="flex flex-wrap gap-8 py-6 border-y border-white/5">
                           <div>
                              <div className="text-[10px] font-mono font-black text-brand-cyan uppercase tracking-widest mb-1">PRIZE_POOL</div>
                              <div className="text-3xl font-black italic tracking-tighter">$1,250,000</div>
                           </div>
                           <div>
                              <div className="text-[10px] font-mono font-black text-brand-cyan uppercase tracking-widest mb-1">STAGE</div>
                              <div className="text-3xl font-black italic tracking-tighter">GROUP_B_SEMIS</div>
                           </div>
                           <div>
                              <div className="text-[10px] font-mono font-black text-brand-cyan uppercase tracking-widest mb-1">PARTICIPANTS</div>
                              <div className="text-3xl font-black italic tracking-tighter">32 TEAMS</div>
                           </div>
                        </div>
                     </div>

                     <div className="space-y-4">
                        <h4 className="text-[10px] font-mono font-black text-brand-muted tracking-widest uppercase mb-4">UPCOMING_BATTLES</h4>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                           {['VIT vs MOUZ', 'G2 vs SPIRIT', 'FAZE vs VP'].map((m, i) => (
                             <div key={i} className="bg-brand-bg p-4 border border-white/5 hover:border-brand-cyan transition-colors cursor-pointer group/item">
                                <div className="text-[9px] font-mono font-black text-brand-muted mb-2 uppercase">BO3 // {14 + i}:00 UTC</div>
                                <div className="text-sm font-black italic group-hover/item:text-brand-cyan transition-colors">{m}</div>
                             </div>
                           ))}
                        </div>
                        <button className="flex items-center gap-2 text-[10px] font-mono font-black uppercase text-brand-cyan hover:text-white transition-colors pt-4 tracking-[0.2em] group">
                           VIEW_FULL_BRACKET_PROTOCOL <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                        </button>
                     </div>
                  </div>
                  
                  <div className="lg:col-span-4 bg-brand-bg/50 border border-white/5 p-6 space-y-6">
                     <h3 className="text-xl font-black italic tracking-tighter uppercase mb-6 flex items-center gap-2">
                       <Tv size={20} className="text-brand-red" /> WATCH_STREAM
                     </h3>
                     <div className="aspect-video bg-zinc-900 overflow-hidden relative border border-white/10 group-hover:border-brand-red transition-all cursor-pointer">
                        <div className="absolute inset-0 flex items-center justify-center bg-brand-red/10">
                           <div className="w-12 h-12 bg-brand-red flex items-center justify-center rotate-45 group-hover:scale-110 transition-transform">
                              <ExternalLink size={24} className="text-white -rotate-45" />
                           </div>
                        </div>
                        <div className="absolute bottom-2 left-2 px-2 py-0.5 bg-brand-red text-[8px] font-black italic text-white animate-pulse">428K VIEWERS</div>
                     </div>
                     <div className="space-y-4 pt-4 border-t border-white/5">
                        <div className="flex justify-between items-center text-[10px] font-mono font-black uppercase">
                           <span className="text-brand-muted">NETWORK_STATUS</span>
                           <span className="text-brand-lime">STABLE</span>
                        </div>
                        <div className="flex justify-between items-center text-[10px] font-mono font-black uppercase">
                           <span className="text-brand-muted">ENCRYPTION</span>
                           <span className="text-brand-cyan">AES_256</span>
                        </div>
                     </div>
                  </div>
               </div>
               <div className="absolute inset-0 border border-white/10 pointer-events-none"></div>
            </div>
         </section>

         {/* LIVE SCORES GRID */}
         <section className="mb-20">
            <div className="flex items-center justify-between mb-10 border-b border-brand-border">
              <h2 className="text-3xl font-black italic font-heading pb-6 flex items-center gap-3">
                <BarChart3 className="text-brand-cyan" /> LIVE_ENGAGEMENTS
              </h2>
              <div className="flex gap-8 pb-6">
                 {['ALL', 'CS2', 'LOL', 'VAL', 'DOTA'].map(g => (
                   <button key={g} className="text-[10px] font-mono font-black uppercase text-brand-muted hover:text-brand-cyan transition-colors tracking-widest">{g}</button>
                 ))}
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
               {liveMatches.map(m => (
                 <LiveMatchCard key={m.id} match={m} />
               ))}
            </div>
         </section>

         {/* TOURNAMENT CALENDAR */}
         <section className="mb-20 grid grid-cols-12 gap-10">
            <div className="col-span-12 lg:col-span-8">
               <h2 className="text-2xl font-black italic mb-8 flex items-center gap-3">
                 <Calendar className="text-brand-cyan" /> DEPLOYMENT_CALENDAR
               </h2>
               <div className="bg-brand-secondary border border-brand-border overflow-hidden">
                  <div className="grid grid-cols-7 border-b border-brand-border">
                     {['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'].map((day, i) => (
                       <div key={day} className={`p-4 text-center border-r border-brand-border last:border-r-0 ${i === 2 ? 'bg-brand-cyan text-brand-bg' : ''} cursor-pointer hover:bg-brand-bg transition-colors group`}>
                          <div className={`text-[10px] font-mono font-black mb-1 ${i === 2 ? 'text-brand-bg' : 'text-brand-muted'}`}>{day}</div>
                          <div className={`text-lg font-black italic ${i === 2 ? 'text-brand-bg' : 'text-brand-text'}`}>{14 + i}</div>
                          {i % 2 === 0 && (
                            <div className={`mx-auto w-1.5 h-1.5 rounded-full mt-2 ${i === 2 ? 'bg-brand-bg' : 'bg-brand-cyan'}`}></div>
                          )}
                       </div>
                     ))}
                  </div>
                  <div className="divide-y divide-white/5">
                     {[
                       { event: "PGL Major Copenhagen", time: "14:00", teamA: "NAVI", teamB: "FAZE", prize: "$50,000", game: "CS2" },
                       { event: "LEC Spring Finals", time: "17:00", teamA: "G2", teamB: "FNC", prize: "$100,000", game: "LOL" },
                       { event: "VCT Masters Tokyo", time: "22:00", teamA: "SEN", teamB: "DRX", prize: "$25,000", game: "VAL" },
                     ].map((e, i) => (
                       <div key={i} className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-6 hover:bg-brand-bg/50 transition-colors cursor-pointer group">
                          <div className="flex items-center gap-6">
                             <div className="text-xl font-black italic text-brand-muted group-hover:text-brand-cyan transition-colors">{e.time}</div>
                             <div>
                                <div className="text-sm font-black italic uppercase mb-1">{e.event}</div>
                                <div className="text-[10px] font-mono font-bold text-brand-muted uppercase flex gap-4">
                                   <span>{e.game}</span>
                                   <span className="text-brand-lime">{e.prize} INTEL</span>
                                </div>
                             </div>
                          </div>
                          <div className="flex items-center gap-8">
                             <div className="flex items-center gap-4 text-sm font-black italic">
                                <span>{e.teamA}</span>
                                <span className="text-brand-muted px-2 py-0.5 bg-brand-bg border border-white/5 text-[9px]">VS</span>
                                <span>{e.teamB}</span>
                             </div>
                             <ArrowRight size={18} className="text-brand-muted group-hover:text-brand-cyan transition-colors" />
                          </div>
                       </div>
                     ))}
                  </div>
               </div>
            </div>

            {/* LEADERBOARD */}
            <div className="col-span-12 lg:col-span-4">
               <h2 className="text-2xl font-black italic mb-8 flex items-center gap-3">
                 <Trophy className="text-brand-lime" /> GLOBAL_STANDINGS
               </h2>
               <div className="bg-brand-card border border-brand-border overflow-hidden">
                  <table className="w-full text-left font-mono">
                     <thead className="bg-brand-secondary border-b border-brand-border">
                        <tr>
                           <th className="p-4 text-[10px] font-black text-brand-muted uppercase">RNK</th>
                           <th className="p-4 text-[10px] font-black text-brand-muted uppercase">SQUAD</th>
                           <th className="p-4 text-[10px] font-black text-brand-muted uppercase">PNT</th>
                        </tr>
                     </thead>
                     <tbody className="divide-y divide-white/5">
                        {[
                          { rank: 1, team: "NAVI", country: "🇺🇦", game: "CS2", points: "4,250", color: "text-amber-400" },
                          { rank: 2, team: "FAZE", country: "🇺🇸", game: "CS2", points: "3,980", color: "text-zinc-300" },
                          { rank: 3, team: "VITALITY", country: "🇫🇷", game: "CS2", points: "3,850", color: "text-amber-700" },
                          { rank: 4, team: "G2", country: "🇩🇪", game: "LOL", points: "3,420", color: "text-brand-muted" },
                          { rank: 5, team: "T1", country: "🇰🇷", game: "LOL", points: "3,210", color: "text-brand-muted" },
                        ].map((t, i) => (
                          <tr key={i} className="hover:bg-brand-secondary transition-colors group cursor-pointer">
                             <td className={`p-4 text-xl font-black italic ${t.color}`}>#{t.rank}</td>
                             <td className="p-4">
                                <div className="flex items-center gap-3">
                                   <span className="text-lg">{t.country}</span>
                                   <div>
                                      <div className="text-sm font-black italic group-hover:text-brand-cyan transition-colors">{t.team}</div>
                                      <div className="text-[9px] font-bold text-brand-muted uppercase">{t.game}</div>
                                   </div>
                                </div>
                             </td>
                             <td className="p-4 font-black italic text-brand-text/80">{t.points}</td>
                          </tr>
                        ))}
                     </tbody>
                  </table>
                  <div className="p-4 bg-brand-secondary border-t border-brand-border text-center">
                     <button className="text-[9px] font-black uppercase text-brand-muted hover:text-white transition-colors tracking-widest">VIEW_ALL_STANDINGS</button>
                  </div>
               </div>
            </div>
         </section>

         {/* ESPORTS NEWS FEED */}
         <section className="mb-20">
            <div className="flex items-center justify-between mb-10 border-b border-brand-border">
              <h2 className="text-3xl font-black italic font-heading pb-6">LATEST_FIELD_INTEL</h2>
              <button className="text-[10px] font-mono font-black uppercase text-brand-cyan hover:text-white transition-colors tracking-widest pb-6 underline underline-offset-8">ALL_ESPORTS_LOGS</button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
               {[
                 { title: "Team Liquid Signs 'S1mple' for 2025 Run", date: "2 HRS AGO", tag: "ROSTER" },
                 { title: "The Rise of Valorant in East Asia", date: "5 HRS AGO", tag: "ANALYSIS" },
                 { title: "Major Prize Pool Cut: Players Protest", date: "1 DAY AGO", tag: "ECONOMY" },
                 { title: "New Map Leaked for CDL Next SZN", date: "2 DAYS AGO", tag: "LEAK" },
               ].map((n, i) => (
                 <div key={i} className="group cursor-pointer">
                    <div className="aspect-video bg-zinc-900 mb-4 border border-brand-border group-hover:border-brand-cyan transition-all overflow-hidden relative grayscale group-hover:grayscale-0">
                       <div className="absolute inset-0 bg-brand-cyan/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    </div>
                    <Tag type="intel">{n.tag}</Tag>
                    <h4 className="text-lg font-black italic my-2 tracking-tighter leading-tight group-hover:text-brand-cyan transition-colors">{n.title}</h4>
                    <div className="text-[10px] font-mono font-bold text-brand-muted uppercase">{n.date}</div>
                 </div>
               ))}
            </div>
         </section>

         <div className="bg-brand-lime/10 border border-brand-lime/30 p-10 flex flex-col md:flex-row items-center justify-between gap-8 mb-24 relative overflow-hidden">
            <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-brand-lime opacity-5 blur-3xl rounded-full"></div>
            <div className="relative z-10">
               <h3 className="text-2xl font-black italic mb-2 tracking-tighter uppercase leading-none">JOIN_THE_PULSE_NETWORK</h3>
               <p className="text-[10px] font-mono font-black text-brand-muted uppercase tracking-widest leading-relaxed">BECOME_A_VERIFIED_OPERATIVE // GET_PRIORITY_TOURNAMENT_INTEL // EXCLUSIVE_DRINK_DROPS</p>
            </div>
            <button className="bg-brand-lime text-brand-bg font-heading px-10 py-4 font-black italic text-sm shadow-neon-lime hover:scale-105 transition-all active:scale-95 text-nowrap relative z-10">
              CREATE_ACCOUNT_SIGNAL
            </button>
         </div>
      </div>
    </main>
  );
};
