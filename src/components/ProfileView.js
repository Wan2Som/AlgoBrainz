"use client";

import React, { useState, useEffect } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db, auth } from '../app/lib/firebaseConfig';

const STATIC_NEWS = {
  'FinTech': [
    { source: "The Edge Malaysia", title: "CGC Digital, Credit Bureau Malaysia partner to help MSMEs become financing-ready", url: "https://theedgemalaysia.com/node/811813" },
    { source: "Fintech News Malaysia", title: "MBSB Bank Offers Three General Takaful Products With Zurich", url: "https://fintechnews.my/59780/banking/mbsb-takaful/" }
  ],
  'HealthTech': [
    { source: "Digital News Asia", title: "Gobi Partners invests in Valiance Health to drive Malaysia's shift towards value-based healthcare", url: "https://www.digitalnewsasia.com/startups/gobi-partners-invests-valiance-health-drive-malaysias-shift-towards-value-based-healthcare" },
    { source: "Tech in Asia", title: "Singapore medtech firm Biobot raises $15.4m for US push", url: "https://www.techinasia.com/news/singapore-medtech-biobot-raises-154m-push" }
  ],
  'E-Commerce': [
    { source: "Vulcan Post", title: "Shopee reigns supreme in SEA E-commerce as TikTok Shop grows fourfold to surpass Lazada", url: "https://vulcanpost.com/865393/shopee-reigns-southeast-asia-e-commerce-tiktok-shop-surpasses-lazada/" },
    { source: "The Edge Malaysia", title: "Big Asia stock funds turn to laggards to cut risk from AI swings", url: "https://theedgemalaysia.com/node/812011" }
  ],
  'AgriTech': [
    { source: "The Star", title: "Laos-Indonesia Agritech programme boosts coffee production partnership", url: "https://www.thestar.com.my/aseanplus/aseanplus-news/2026/06/29/laos-indonesia-agritech-programme-boosts-coffee-production-partnership" },
    { source: "The Star", title: "Greening Asia with agritech", url: "https://www.thestar.com.my/news/education/2025/08/24/greening-asia-with-agritech" }
  ],
  'SaaS': [
    { source: "Digital News Asia", title: "Singapore-based Ropedia raises US$22mil in pre-series A, aims to scale data infrastructure for physical AI", url: "https://www.digitalnewsasia.com/startups/singapore-based-ropedia-raises-us22mil-pre-series-aims-scale-data-infrastructure-physical" },
    { source: "The SaaS News", title: "Catena Labs Raises $30M in Series A", url: "https://www.thesaasnews.com/news/catena-labs-raises-30m-in-series-a/" }
  ]
};

export default function ProfileView() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [news, setNews] = useState([]);

  useEffect(() => {
    const fetchProfileData = async () => {
      if (!auth.currentUser) return;
      
      try {
        const docRef = doc(db, "smes", auth.currentUser.uid);
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
          const profileData = docSnap.data();
          setProfile(profileData);
          
          // As long as your save function pushes 'sector' to Firebase, this dynamically updates!
          const sectorNews = STATIC_NEWS[profileData.sector] || STATIC_NEWS['FinTech'];
          setNews(sectorNews);
        }
      } catch (error) {
        console.error("Error fetching dashboard telemetry:", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchProfileData();
  }, []);

  if (loading) {
    return <div className="p-8 text-amber-500 animate-pulse font-bold tracking-widest uppercase">Loading Profile Matrix...</div>;
  }

  if (!profile) return null;

  const matches = profile.recommendations || [];

  return (
    <div className="space-y-8 animate-in fade-in duration-500 max-w-5xl mx-auto pb-12">
      
      {/* Header */}
      <div>
        <h1 className="text-3xl font-black text-white tracking-tighter flex items-center gap-3">
          Welcome back, {profile.startupName || "Founder"} <span className="text-2xl">👋</span>
        </h1>
        <p className="text-sm text-slate-400 font-medium">Real-time status analysis telemetry loops.</p>
      </div>

      {/* Top Grid: Metrics & Static News */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Total Matches Metric */}
        <div className="bg-slate-900/40 border border-white/5 p-8 rounded-2xl shadow-xl flex flex-col justify-center">
          <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-2">Total Verified Matches</span>
          <span className="text-6xl font-black text-amber-500 tracking-tighter">
            {matches.length}
          </span>
        </div>

        {/* Static Market Intelligence Wire */}
        <div className="lg:col-span-2 bg-slate-900/40 border border-white/5 p-6 rounded-2xl shadow-xl flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-sm font-black text-white tracking-widest flex items-center gap-2 uppercase">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              Market Intelligence Wire
            </h3>
            <span className="bg-slate-800 text-slate-300 text-[9px] font-black px-3 py-1 rounded-full uppercase tracking-wider border border-slate-700/50">
              {profile.sector || "General"} Focus
            </span>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {news.map((item, idx) => (
              <div key={idx} className="bg-slate-950/50 border border-slate-800/60 p-5 rounded-xl hover:border-amber-500/30 transition-colors flex flex-col justify-between">
                <h4 className="text-sm font-bold text-white mb-3 leading-snug">{item.title}</h4>
                <div className="flex justify-between items-center mt-auto pt-4 border-t border-slate-800/50">
                  <span className="text-[10px] text-slate-500 font-semibold">{item.source}</span>
                  <a href={item.url} target="_blank" rel="noopener noreferrer" className="text-[10px] text-blue-400 font-bold hover:text-blue-300 cursor-pointer transition-colors">
                    Read Wire ↗
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recommended Matches List */}
      <div>
        <h3 className="text-xl font-black text-white tracking-tight flex items-center gap-2 mb-6">
          <span className="w-3 h-3 rounded-full bg-amber-500" />
          Synchronized Directory Matches
        </h3>

        {matches.length === 0 ? (
          <div className="bg-slate-900/40 border border-slate-800 rounded-2xl p-8 text-center">
            <p className="text-slate-400 font-semibold uppercase tracking-widest">No matches synchronized yet. Run a directory search to begin.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {matches.map((match, idx) => (
              <div key={idx} className="bg-slate-900/40 border border-white/5 p-6 rounded-2xl shadow-lg hover:border-amber-500/30 transition-all group relative overflow-hidden">
                
                <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-amber-500/10 transition-colors pointer-events-none" />

                <div className="flex flex-col md:flex-row gap-6 justify-between items-start md:items-center relative z-10">
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-3 mb-2">
                      <h4 className="text-xl font-black text-white tracking-tight">{match.name}</h4>
                      
                      {/* AI Match Score (Will hide if using Deterministic Data) */}
                      {(match.matchScore || match.match) && (
                        <span className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[10px] font-extrabold px-2.5 py-0.5 rounded-full uppercase tracking-wider whitespace-nowrap">
                          {match.matchScore || match.match} Match
                        </span>
                      )}

                      {/* Generic Type/Industry Badge */}
                      <span className="bg-slate-800 text-slate-300 text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider whitespace-nowrap">
                        {match.type || match.industry}
                      </span>
                    </div>
                    
                    {/* AI Explanation (Will hide if using Deterministic Data) */}
                    {(match.explanation || match.desc) && (
                      <p className="text-sm text-slate-400 mb-4 pr-4">{match.explanation || match.desc}</p>
                    )}
                    
                    <div className="flex flex-wrap gap-4 text-xs font-semibold text-slate-300 mt-3">
                      <div className="flex items-center gap-1.5 bg-slate-950/50 px-3 py-1.5 rounded-lg border border-slate-800">
                        <span className="text-slate-500 uppercase text-[9px] tracking-widest">Industry:</span> {match.focus || match.industry}
                      </div>
                      
                      {/* Stage Badge (AI Only) */}
                      {match.stage && (
                        <div className="flex items-center gap-1.5 bg-slate-950/50 px-3 py-1.5 rounded-lg border border-slate-800">
                          <span className="text-slate-500 uppercase text-[9px] tracking-widest">Stage:</span> {match.stage}
                        </div>
                      )}

                      {/* Dynamic Ticket Size (Handles both AI fixed size and Deterministic range) */}
                      <div className="flex items-center gap-1.5 bg-slate-950/50 px-3 py-1.5 rounded-lg border border-slate-800">
                        <span className="text-amber-500/70 uppercase text-[9px] tracking-widest">Funding:</span> 
                        {match.ticketSize 
                          ? `RM ${match.ticketSize.toLocaleString()}`
                          : `RM ${match.minTicket?.toLocaleString()} - RM ${match.maxTicket?.toLocaleString()}`
                        }
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-row md:flex-col gap-3 w-full md:w-auto shrink-0 mt-4 md:mt-0">
                    <button 
                      onClick={() => window.open(match.portalUrl, '_blank')}
                      className="flex-1 text-center bg-amber-500 hover:bg-amber-400 text-slate-950 font-black px-6 py-3 rounded-xl text-xs tracking-wider uppercase transition-all shadow-[0_0_10px_rgba(245,158,11,0.3)]"
                    >
                      Launch Portal ↗
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
