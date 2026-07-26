"use client";

import React, { useState } from 'react';
import { investorDatabase, investorTree, linearSearchInvestors, getClosestFallback } from '../utils/searchAlgorithms';

export default function InvestorDirectory({ onSaveToProfile }) {
  // 1. Initialized as empty strings so placeholders appear
  const [minTicket, setMinTicket] = useState("");
  const [maxTicket, setMaxTicket] = useState("");
  const [industry, setIndustry] = useState('All');
  const [searchResult, setSearchResult] = useState(null);
  const [step, setStep] = useState(1);
  const [isFallback, setIsFallback] = useState(false);
  
  // 2. New state to handle the fake loading screen
  const [isSearching, setIsSearching] = useState(false);
  const [activeAlgorithm, setActiveAlgorithm] = useState("");

  const executeSearch = (type) => {
    // If user leaves it blank, default to 0 and Infinity for the math to still work
    const min = minTicket === "" ? 0 : parseInt(minTicket);
    const max = maxTicket === "" ? Infinity : parseInt(maxTicket);
    
    setStep(2);
    setIsSearching(true);
    setActiveAlgorithm(type);
    
    // 3. Fake Delay: Linear takes 1500ms, BST takes 400ms
    const delay = type === 'Linear' ? 1500 : 400;

    setTimeout(() => {
      let res;
      if (type === 'Linear') {
        res = linearSearchInvestors(investorDatabase, min, max, industry);
        res.type = 'Linear Search O(N)';
      } else {
        res = investorTree.rangeSearch(investorTree.root, min, max, industry);
        res = res || { results: [], operations: 1 };
        res.type = 'BST Range Search O(log N + K)';
      }

      if (res.results.length === 0) {
        const fallbackData = getClosestFallback(investorDatabase, min, max, industry);
        setSearchResult({ 
          results: fallbackData, 
          operations: res.operations, 
          type: res.type 
        });
        setIsFallback(true);
      } else {
        setSearchResult(res);
        setIsFallback(false);
      }
      
      setIsSearching(false);
    }, delay);
  };

  const handleApplyMatches = () => {
    if (searchResult && searchResult.results.length > 0) {
      onSaveToProfile(searchResult.results, industry);
    }
  };

  const resetSearch = () => {
    setMinTicket("");
    setMaxTicket("");
    setIndustry('All');
    setSearchResult(null);
    setStep(1);
    setIsFallback(false);
    setIsSearching(false);
  };

  return (
    <div className="min-h-screen bg-[#0B1120] text-slate-300 font-sans p-8 max-w-5xl mx-auto">
      
      {/* STEP INDICATOR */}
      <div className="flex items-center justify-center gap-4 mb-16">
        <div className="flex items-center gap-2">
          <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${step === 1 ? 'bg-amber-500 text-black' : 'bg-slate-800 text-slate-500'}`}>1</div>
          <span className={`text-xs font-bold tracking-widest ${step === 1 ? 'text-amber-500' : 'text-slate-500'}`}>DIRECTORY FILTERS</span>
        </div>
        <div className="w-16 h-px bg-slate-800"></div>
        <div className="flex items-center gap-2">
          <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${step === 2 ? 'bg-amber-500 text-black' : 'bg-slate-800 text-slate-500'}`}>2</div>
          <span className={`text-xs font-bold tracking-widest ${step === 2 ? 'text-amber-500' : 'text-slate-500'}`}>DSA MATCH RESULTS</span>
        </div>
      </div>

      {/* INPUT FORM (Hidden while searching or showing results) */}
      {!searchResult && !isSearching && (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
          <h1 className="text-4xl font-black text-white mb-2 tracking-tight">Deterministic Search Directory</h1>
          <p className="text-slate-400 mb-10">Execute precise parameter-based traversal and data extraction directly across validated memory nodes.</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div>
              <label className="text-xs font-black text-slate-500 uppercase tracking-widest block mb-3">Industry Vertical</label>
              
              <select 
                value={industry}
                onChange={(e) => setIndustry(e.target.value)}
                className="w-full bg-[#0B1120] border border-slate-800/80 rounded-xl p-4 text-white focus:border-amber-500 outline-none transition-all"
              >
                <option value="All">All Industries</option>
                <option value="FinTech">FinTech</option>
                <option value="HealthTech">HealthTech</option>
                <option value="E-Commerce">E-Commerce</option>
                <option value="AgriTech">AgriTech</option>
                <option value="SaaS">SaaS</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-black text-slate-500 uppercase tracking-widest block mb-3">Target Funding Range (RM)</label>
              <div className="flex gap-3">
                <input 
                  type="number" 
                  value={minTicket}
                  onChange={(e) => setMinTicket(e.target.value)}
                  placeholder="Min (e.g. 50000)"
                  className="w-1/2 bg-[#0B1120] border border-slate-800/80 rounded-xl p-4 text-white focus:border-amber-500 outline-none transition-all placeholder:text-slate-700"
                />
                <input 
                  type="number" 
                  value={maxTicket}
                  onChange={(e) => setMaxTicket(e.target.value)}
                  placeholder="Max (e.g. 2000000)"
                  className="w-1/2 bg-[#0B1120] border border-slate-800/80 rounded-xl p-4 text-white focus:border-amber-500 outline-none transition-all placeholder:text-slate-700"
                />
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between border-t border-slate-800/60 pt-8 mt-4">
            <span className="text-slate-500 text-sm font-bold flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-slate-600 animate-pulse"></span>
              AWAITING SYSTEM EXECUTION
            </span>
            <div className="flex gap-4">
              <button 
                onClick={() => executeSearch('Linear')} 
                className="bg-slate-800 hover:bg-slate-700 text-white font-black px-8 py-4 rounded-xl text-sm tracking-widest uppercase transition-colors"
              >
                Linear O(N) Match →
              </button>
              <button 
                onClick={() => executeSearch('BST')} 
                className="bg-amber-500 hover:bg-amber-400 text-[#0B1120] font-black px-8 py-4 rounded-xl text-sm tracking-widest uppercase transition-colors shadow-[0_0_20px_rgba(245,158,11,0.15)]"
              >
                BST Range O(Log N) Match →
              </button>
            </div>
          </div>
        </div>
      )}

      {/* FAKE LOADING SCREEN */}
      {isSearching && (
        <div className="animate-in fade-in zoom-in duration-300 flex flex-col items-center justify-center py-32">
          <div className="w-16 h-16 border-4 border-slate-800 border-t-amber-500 rounded-full animate-spin mb-8"></div>
          <h2 className="text-2xl font-black text-white tracking-widest uppercase mb-3">
            Executing Traversal
          </h2>
          <p className="text-slate-500 font-bold uppercase text-xs tracking-widest animate-pulse flex items-center gap-2">
            <span className="w-2 h-2 bg-amber-500 rounded-full"></span>
            {activeAlgorithm === 'Linear' ? 'Scanning all memory nodes O(N)...' : 'Navigating Binary Search Tree O(Log N)...'}
          </p>
        </div>
      )}

      {/* RESULTS VIEW */}
      {searchResult && !isSearching && (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="flex justify-between items-end mb-8">
            <div>
              <h1 className="text-4xl font-black text-white mb-2 tracking-tight">Diagnostic Telemetry 🚀</h1>
              <p className="text-slate-400">Range query completed across memory buffers.</p>
            </div>
            <button onClick={resetSearch} className="text-amber-500 font-bold hover:text-amber-400 mb-2">← RUN NEW QUERY</button>
          </div>

          {/* Metrics Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="bg-[#131B2A] border border-slate-800/60 rounded-2xl p-6">
              <span className="text-xs font-black text-slate-500 uppercase tracking-widest block mb-4">Algorithm Used</span>
              <span className="text-xl font-black text-amber-500">{searchResult.type}</span>
            </div>
            <div className="bg-[#131B2A] border border-slate-800/60 rounded-2xl p-6">
              <span className="text-xs font-black text-slate-500 uppercase tracking-widest block mb-4">Traversal Steps</span>
              <span className="text-3xl font-black text-white">{searchResult.operations}</span>
            </div>
            <div className="bg-[#131B2A] border border-slate-800/60 rounded-2xl p-6">
              <span className="text-xs font-black text-slate-500 uppercase tracking-widest block mb-4">Matches Extracted</span>
              <span className={`text-3xl font-black ${isFallback ? 'text-amber-500' : 'text-emerald-500'}`}>
                {searchResult.results.length} NODES
              </span>
            </div>
          </div>

          {/* Fallback Notice Banner */}
          {isFallback && (
            <div className="bg-amber-500/10 border border-amber-500/40 rounded-xl p-4 mb-6 text-amber-500 text-sm font-bold flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></span>
              NO EXACT MATCHES FOUND IN RANGE. DISPLAYING CLOSEST ALTERNATIVES.
            </div>
          )}

          <h3 className="text-amber-500 font-black uppercase tracking-widest text-sm mb-6 flex items-center gap-3">
            <span className="w-2.5 h-2.5 bg-amber-500 rounded-full"></span> 
            Algorithmic Recommended Matches
          </h3>

          {/* List of Matched Cards */}
          <div className="space-y-6">
            {searchResult.results.length > 0 ? (
              searchResult.results.map((item) => (
                <div key={item.id} className="bg-[#131B2A] border border-slate-800/60 rounded-2xl p-8 shadow-xl hover:border-slate-700 transition-colors">
                  <div className="flex flex-col md:flex-row justify-between items-start gap-8">
                    <div className="flex-1">
                      
                      <div className="flex items-center gap-3 mb-4">
                        <h4 className="text-2xl font-black text-white tracking-tight">{item.name}</h4>
                        <span className="bg-slate-800 text-slate-300 border border-slate-700 text-[10px] font-black tracking-widest px-2.5 py-1 rounded uppercase">
                          {item.industry}
                        </span>
                      </div>
                      
                      <div className="flex flex-wrap gap-4 mt-6">
                        <div className="bg-[#0B1120] border border-slate-800/80 rounded-lg px-4 py-2.5 text-xs flex gap-2 items-center">
                          <span className="text-slate-500 font-bold uppercase tracking-wider">Industry:</span> 
                          <span className="text-slate-200 font-medium">{item.industry}</span>
                        </div>
                        <div className="bg-[#0B1120] border border-slate-800/80 rounded-lg px-4 py-2.5 text-xs flex gap-2 items-center">
                          <span className="text-amber-500/70 font-bold uppercase tracking-wider">Funding Range:</span> 
                          <span className="text-amber-500 font-black">
                            RM {item.minTicket.toLocaleString()} - RM {item.maxTicket.toLocaleString()}
                          </span>
                        </div>
                      </div>

                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="bg-[#131B2A] border border-red-500/20 rounded-2xl p-10 text-center">
                <h4 className="text-xl font-black text-white mb-2">No Matching Entities</h4>
                <p className="text-slate-500">The traversal completed in {searchResult.operations} steps but found zero records within your range/industry filter.</p>
              </div>
            )}
          </div>

          {/* Sync Button */}
          {searchResult.results.length > 0 && (
            <div className="mt-8 flex justify-end">
              <button 
                onClick={handleApplyMatches}
                className="bg-amber-500 hover:bg-amber-400 text-[#0B1120] font-black px-10 py-5 rounded-xl text-sm tracking-widest uppercase transition-colors shadow-[0_0_20px_rgba(245,158,11,0.2)]"
              >
                Sync Matches to Profile →
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
