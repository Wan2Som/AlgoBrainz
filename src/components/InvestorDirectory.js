"use client";

import React, { useState } from 'react';
import { investorDatabase, investorTree, linearSearchInvestors } from '../utils/searchAlgorithms';

export default function InvestorDirectory() {
  const [targetAmount, setTargetAmount] = useState('');
  const [searchResult, setSearchResult] = useState(null);
  const [step, setStep] = useState(1);

  const executeSearch = (type) => {
    const target = parseInt(targetAmount);
    if (!target) return;
    
    setStep(2);
    if (type === 'Linear') {
      setSearchResult(linearSearchInvestors(investorDatabase, target));
    } else {
      setSearchResult(investorTree.search(investorTree.root, target));
    }
  };

  const resetSearch = () => {
    setTargetAmount('');
    setSearchResult(null);
    setStep(1);
  };

  return (
    <div className="min-h-screen bg-[#0B1120] text-slate-300 font-sans p-8 max-w-5xl mx-auto">
      
      {/* STEP INDICATOR (Matches Screenshot 1) */}
      <div className="flex items-center justify-center gap-4 mb-16">
        <div className="flex items-center gap-2">
          <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${step === 1 ? 'bg-amber-500 text-black' : 'bg-slate-800 text-slate-500'}`}>1</div>
          <span className={`text-xs font-bold tracking-widest ${step === 1 ? 'text-amber-500' : 'text-slate-500'}`}>SEARCH CONFIG</span>
        </div>
        <div className="w-16 h-px bg-slate-800"></div>
        <div className="flex items-center gap-2">
          <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${step === 2 ? 'bg-amber-500 text-black' : 'bg-slate-800 text-slate-500'}`}>2</div>
          <span className={`text-xs font-bold tracking-widest ${step === 2 ? 'text-amber-500' : 'text-slate-500'}`}>DSA MATCH</span>
        </div>
      </div>

      {/* INPUT FORM (Matches Screenshot 2) */}
      {!searchResult && (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
          <h1 className="text-4xl font-black text-white mb-2 tracking-tight">Financial & Algorithmic Footprint</h1>
          <p className="text-slate-400 mb-10">Configure operational thresholds for your manual matrix calculation pipelines.</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div>
              <label className="text-xs font-black text-slate-500 uppercase tracking-widest block mb-3">Target Funding Amount (RM)</label>
              <input 
                type="number" 
                value={targetAmount}
                onChange={(e) => setTargetAmount(e.target.value)}
                placeholder="e.g. 150000"
                className="w-full bg-[#0B1120] border border-slate-800/80 rounded-xl p-4 text-white focus:border-amber-500 outline-none transition-all placeholder:text-slate-700"
              />
              <p className="text-[10px] text-slate-600 mt-2 ml-1">Available nodes: 50K, 100K, 150K, 200K, 250K, 300K, 500K</p>
            </div>
            
            <div>
              <label className="text-xs font-black text-slate-500 uppercase tracking-widest block mb-3">Data Structure Model</label>
              <div className="w-full bg-[#0B1120] border border-slate-800/80 rounded-xl p-4 text-slate-500 cursor-not-allowed">
                Hybrid (Linear & BST)
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between border-t border-slate-800/60 pt-8 mt-4">
            <span className="text-slate-500 text-sm font-bold flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-slate-600 animate-pulse"></span>
              AWAITING EXECUTION
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
                BST O(Log N) Match →
              </button>
            </div>
          </div>
        </div>
      )}

      {/* RESULTS VIEW (Matches Screenshot 3) */}
      {searchResult && (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="flex justify-between items-end mb-8">
            <div>
              <h1 className="text-4xl font-black text-white mb-2 tracking-tight">Diagnostic Telemetry 🚀</h1>
              <p className="text-slate-400">Real-time status analysis of algorithmic traversal.</p>
            </div>
            <button onClick={resetSearch} className="text-amber-500 font-bold hover:text-amber-400 mb-2">← RUN NEW QUERY</button>
          </div>

          {/* Metrics Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="bg-[#131B2A] border border-slate-800/60 rounded-2xl p-6">
              <span className="text-xs font-black text-slate-500 uppercase tracking-widest block mb-4">Algorithm Used</span>
              <span className="text-3xl font-black text-amber-500">{searchResult.type}</span>
            </div>
            <div className="bg-[#131B2A] border border-slate-800/60 rounded-2xl p-6">
              <span className="text-xs font-black text-slate-500 uppercase tracking-widest block mb-4">Traversal Steps</span>
              <span className="text-3xl font-black text-white">{searchResult.operations}</span>
            </div>
            <div className="bg-[#131B2A] border border-slate-800/60 rounded-2xl p-6">
              <span className="text-xs font-black text-slate-500 uppercase tracking-widest block mb-4">Resolution Status</span>
              <span className={`text-3xl font-black ${searchResult.result ? 'text-emerald-500' : 'text-red-500'}`}>
                {searchResult.result ? 'MATCH FOUND' : 'NULL'}
              </span>
            </div>
          </div>

          <h3 className="text-amber-500 font-black uppercase tracking-widest text-sm mb-6 flex items-center gap-3">
            <span className="w-2.5 h-2.5 bg-amber-500 rounded-full"></span> 
            Algorithmic Recommended Matches
          </h3>

          {/* The Rich Card */}
          {searchResult.result ? (
            <div className="bg-[#131B2A] border border-slate-800/60 rounded-2xl p-8 shadow-xl">
              <div className="flex flex-col md:flex-row justify-between items-start gap-8">
                
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-3 mb-4">
                    <h4 className="text-2xl font-black text-white tracking-tight">{searchResult.result.name}</h4>
                    <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px] font-black tracking-widest px-2.5 py-1 rounded">
                      {searchResult.result.match} MATCH
                    </span>
                    <span className="bg-slate-800 text-slate-300 border border-slate-700 text-[10px] font-black tracking-widest px-2.5 py-1 rounded uppercase">
                      {searchResult.result.type}
                    </span>
                  </div>
                  
                  <p className="text-slate-400 text-sm mb-8 leading-relaxed max-w-3xl">
                    {searchResult.result.desc}
                  </p>
                  
                  <div className="flex flex-wrap gap-4">
                    <div className="bg-[#0B1120] border border-slate-800/80 rounded-lg px-4 py-2.5 text-xs flex gap-2 items-center">
                      <span className="text-slate-500 font-bold uppercase tracking-wider">Focus:</span> 
                      <span className="text-slate-200 font-medium">{searchResult.result.focus}</span>
                    </div>
                    <div className="bg-[#0B1120] border border-slate-800/80 rounded-lg px-4 py-2.5 text-xs flex gap-2 items-center">
                      <span className="text-slate-500 font-bold uppercase tracking-wider">Stage:</span> 
                      <span className="text-slate-200 font-medium">{searchResult.result.stage}</span>
                    </div>
                    <div className="bg-[#0B1120] border border-slate-800/80 rounded-lg px-4 py-2.5 text-xs flex gap-2 items-center">
                      <span className="text-amber-500/70 font-bold uppercase tracking-wider">Ticket:</span> 
                      <span className="text-amber-500 font-black">RM {searchResult.result.ticketSize.toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-3 w-full md:w-auto shrink-0">
                  <button className="bg-amber-500 hover:bg-amber-400 text-[#0B1120] font-black px-8 py-3.5 rounded-xl text-xs tracking-widest uppercase transition-colors text-center w-full shadow-[0_0_15px_rgba(245,158,11,0.1)]">
                    Launch Portal
                  </button>
                  <button className="bg-transparent hover:bg-slate-800 border border-slate-700 text-white font-bold px-8 py-3.5 rounded-xl text-xs tracking-widest uppercase transition-colors text-center w-full">
                    View FAQ Guide
                  </button>
                </div>
                
              </div>
            </div>
          ) : (
            <div className="bg-[#131B2A] border border-red-500/20 rounded-2xl p-10 text-center">
              <h4 className="text-xl font-black text-white mb-2">No Entity Found</h4>
              <p className="text-slate-500">The algorithmic traversal completed in {searchResult.operations} steps but returned a null reference for RM {targetAmount}.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
