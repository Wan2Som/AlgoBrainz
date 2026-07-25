"use client";

import React, { useState } from 'react';
import { investorDatabase, investorTree, linearSearchInvestors } from '../utils/searchAlgorithms';

export default function InvestorDirectory() {
  const [targetAmount, setTargetAmount] = useState('');
  const [searchResult, setSearchResult] = useState(null);

  const handleLinearSearch = () => {
    const target = parseInt(targetAmount);
    if (!target) return;
    const res = linearSearchInvestors(investorDatabase, target);
    setSearchResult(res);
  };

  const handleBSTSearch = () => {
    const target = parseInt(targetAmount);
    if (!target) return;
    const res = investorTree.search(investorTree.root, target);
    setSearchResult(res);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500 max-w-4xl mx-auto">
      <header>
        <h2 className="text-3xl font-black text-white tracking-tight mb-2 flex items-center gap-3">
          Algorithm Directory
          <span className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
        </h2>
        <p className="text-sm text-slate-400 font-medium">Compare Baseline Linear Search vs. Optimized Binary Search Tree (BST).</p>
      </header>

      <div className="bg-slate-900/40 border border-white/5 p-6 rounded-2xl shadow-xl backdrop-blur-xl">
        <label className="text-[11px] font-black text-slate-500 uppercase tracking-widest block mb-2">
          Search by Funding Ticket Size (RM)
        </label>
        <div className="flex gap-4">
          <input 
            type="number" 
            value={targetAmount}
            onChange={(e) => setTargetAmount(e.target.value)}
            placeholder="e.g. 500000"
            className="flex-1 bg-slate-950 border border-slate-800 rounded-xl p-4 text-sm text-white focus:border-amber-500 outline-none transition-all"
          />
          <button onClick={handleLinearSearch} className="bg-slate-800 hover:bg-slate-700 text-white font-bold px-6 py-4 rounded-xl text-xs tracking-wider uppercase transition-colors">
            Linear O(n)
          </button>
          <button onClick={handleBSTSearch} className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-black px-6 py-4 rounded-xl text-xs tracking-wider uppercase transition-all shadow-lg">
            BST O(log n)
          </button>
        </div>
        <p className="text-xs text-slate-500 mt-3 font-medium">Available exact nodes: 50000, 100000, 150000, 200000, 250000, 300000, 500000</p>
      </div>

      {searchResult && (
        <div className="bg-slate-900/60 border border-amber-500/30 p-8 rounded-2xl shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          
          <h3 className="text-[10px] font-black uppercase tracking-widest text-amber-500 mb-4">Diagnostic Results</h3>
          
          <div className="grid grid-cols-2 gap-6 mb-6">
            <div className="bg-slate-950/50 p-4 rounded-xl border border-white/5">
              <span className="text-[10px] text-slate-500 uppercase font-bold block mb-1">Algorithm Used</span>
              <span className="text-lg font-black text-white">{searchResult.type}</span>
            </div>
            <div className="bg-slate-950/50 p-4 rounded-xl border border-white/5">
              <span className="text-[10px] text-slate-500 uppercase font-bold block mb-1">Operations (Steps)</span>
              <span className="text-lg font-black text-emerald-400">{searchResult.operations}</span>
            </div>
          </div>

          {searchResult.result ? (
            <div className="flex items-center justify-between bg-slate-950 border border-slate-800 p-5 rounded-xl">
              <div>
                <h4 className="text-xl font-bold text-white tracking-tight">{searchResult.result.name}</h4>
                <span className="text-xs text-slate-400 font-medium">{searchResult.result.type} Entity</span>
              </div>
              <span className="text-amber-500 font-black">RM {searchResult.result.ticketSize}</span>
            </div>
          ) : (
            <div className="bg-red-500/10 border border-red-500/20 p-5 rounded-xl text-center">
              <span className="text-red-400 font-bold text-sm tracking-wide">404 - No matching entity found for that ticket size.</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
