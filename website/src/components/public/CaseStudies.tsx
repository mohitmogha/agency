import React, { useState } from 'react';
import { Award, ArrowUpRight, TrendingUp } from 'lucide-react';

export const CaseStudies: React.FC = () => {
  const [selectedFilter, setSelectedFilter] = useState('All');

  const cases = [
    {
      brand: 'LuxeSwim Coastal',
      category: 'Apparel & Fashion',
      timeline: '90-Day Sprint',
      challenge: 'ROAS plateaued at 1.9x on Meta due to creative fatigue; Google PMax spend was wasted on out-of-stock items.',
      solution: 'Rebuilt into 3:2:2 Dynamic Creative Sandbox with 8 new UGC briefs/month. Segmented GMC feed with Custom Labels into hero margin SKUs.',
      metrics: [
        { label: 'Monthly Revenue', before: '$38,000', after: '$226,800', change: '+496%' },
        { label: 'Blended MER', before: '1.92x', after: '4.20x', change: '+118%' },
        { label: 'Managed Ad Spend', before: '$19,500', after: '$54,000', change: '+176%' },
      ],
      quote: "Vanguard completely transformed our cash flow. We went from stressing about ad fatigue to scaling spend with complete predictability.",
      author: "Chloe B., Founder",
      badgeColor: 'border-indigo-500/30 text-indigo-700 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-500/10',
    },
    {
      brand: 'NaturaPet Organics',
      category: 'Pet Care & Nutrition',
      timeline: '60-Day Overhaul',
      challenge: 'High customer acquisition cost ($52 CPA) left no room for profitability; Meta pixel EMQ score was only 4.8.',
      solution: 'Deployed Server-Side Meta CAPI (EMQ score 9.1). Introduced PAS video formats targeting pet joint health, paired with High-Intent Google Search.',
      metrics: [
        { label: 'Monthly Revenue', before: '$22,000', after: '$154,000', change: '+600%' },
        { label: 'Blended MER', before: '2.10x', after: '4.00x', change: '+90%' },
        { label: 'CPA Reduction', before: '$52.40', after: '$26.80', change: '-48%' },
      ],
      quote: "The server-side CAPI fix alone recovered 30% of our lost conversions. Our campaigns finally have the data to scale.",
      author: "David C., Head of Growth",
      badgeColor: 'border-emerald-500/30 text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-500/10',
    },
    {
      brand: 'Aura Sleep Labs',
      category: 'Consumer Hardware & Tech',
      timeline: '120-Day Scale',
      challenge: 'High AOV ($189) caused long conversion delays; competitors were bidding on their brand name and stealing 25% of purchase intent.',
      solution: 'Implemented Brand Search Defense campaigns with bid caps. Built Advantage+ Shopping catalog retargeting and comparison static ads.',
      metrics: [
        { label: 'Monthly Revenue', before: '$45,000', after: '$241,800', change: '+437%' },
        { label: 'Blended MER', before: '2.25x', after: '3.90x', change: '+73%' },
        { label: 'Net Profit Boost', before: '$8,200/mo', after: '$61,400/mo', change: '+648%' },
      ],
      quote: "Their performance-hybrid model meant they were as obsessed with our bottom line as we were. True partners.",
      author: "Sarah J., Co-Founder",
      badgeColor: 'border-cyan-500/30 text-cyan-700 dark:text-cyan-400 bg-cyan-50 dark:bg-cyan-500/10',
    },
  ];

  const filteredCases = selectedFilter === 'All'
    ? cases
    : cases.filter(c => c.category.includes(selectedFilter));

  return (
    <section id="case-studies" className="py-16 md:py-24 relative bg-slate-50 dark:bg-[#070B12] border-t border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-indigo-50 dark:bg-indigo-500/10 text-indigo-700 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-500/20 text-xs font-bold mb-3 shadow-sm">
            <Award className="w-3.5 h-3.5" />
            <span>Proven Track Record</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight font-display">
            Real DTC Brands. Verified Numbers.
          </h2>
          <p className="text-base sm:text-lg text-slate-700 dark:text-slate-300 mt-3 font-normal">
            We don't showcase vanity screenshot impressions. We showcase verified revenue, ad spend, and net contribution margin.
          </p>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
            {['All', 'Apparel', 'Pet Care', 'Tech'].map((filter) => (
              <button
                key={filter}
                onClick={() => setSelectedFilter(filter)}
                className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all whitespace-nowrap ${
                  selectedFilter === filter
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/25'
                    : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:text-slate-950 dark:hover:text-white shadow-sm'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {filteredCases.map((cs, idx) => (
            <div
              key={idx}
              className="p-5 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-indigo-500/50 transition-all duration-300 shadow-xl flex flex-col justify-between"
            >
              <div>
                {/* Header */}
                <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800 mb-6 gap-2">
                  <div className="min-w-0">
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white font-display truncate">{cs.brand}</h3>
                    <p className="text-xs text-indigo-600 dark:text-indigo-400 font-bold truncate">{cs.category}</p>
                  </div>
                  <span className={`text-[11px] font-bold px-3 py-1 rounded-full border shrink-0 whitespace-nowrap ${cs.badgeColor}`}>
                    {cs.timeline}
                  </span>
                </div>

                {/* Metrics Table */}
                <div className="space-y-3 mb-6 p-3.5 sm:p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
                  {cs.metrics.map((m, mIdx) => (
                    <div key={mIdx} className="flex justify-between items-center text-xs gap-1.5">
                      <span className="text-slate-600 dark:text-slate-400 font-bold truncate">{m.label}</span>
                      <div className="flex items-center space-x-1.5 sm:space-x-2 shrink-0">
                        <span className="text-slate-400 line-through text-[10px] sm:text-[11px] font-mono">{m.before}</span>
                        <span className="font-extrabold text-slate-900 dark:text-white font-mono text-xs sm:text-sm">{m.after}</span>
                        <span className="font-extrabold text-emerald-700 dark:text-emerald-400 font-mono text-[10px] sm:text-[11px] bg-emerald-50 dark:bg-emerald-500/10 px-1.5 sm:px-2 py-0.5 rounded-md border border-emerald-200 dark:border-emerald-500/20 whitespace-nowrap">
                          {m.change}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Breakdown */}
                <div className="space-y-3 text-xs mb-6 leading-relaxed">
                  <div>
                    <strong className="text-slate-700 dark:text-slate-300 block mb-1 uppercase text-[10px] tracking-wider font-extrabold">The Problem:</strong>
                    <p className="text-slate-600 dark:text-slate-400 font-normal">{cs.challenge}</p>
                  </div>
                  <div>
                    <strong className="text-indigo-700 dark:text-indigo-400 block mb-1 uppercase text-[10px] tracking-wider font-extrabold">The Solution Deployed:</strong>
                    <p className="text-slate-800 dark:text-slate-200 font-medium">{cs.solution}</p>
                  </div>
                </div>
              </div>

              {/* Quote Footer */}
              <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex items-start space-x-3">
                <div className="w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-500/10 text-indigo-700 dark:text-indigo-400 font-bold flex items-center justify-center text-xs shrink-0">
                  {cs.brand.charAt(0)}
                </div>
                <div>
                  <p className="text-xs italic text-slate-600 dark:text-slate-300 mb-1 leading-relaxed">"{cs.quote}"</p>
                  <div className="text-[11px] font-bold text-slate-900 dark:text-white">{cs.author}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
