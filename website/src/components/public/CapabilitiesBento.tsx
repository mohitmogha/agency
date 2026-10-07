import React from 'react';
import { 
  Zap, ShoppingBag, Database, Video, Sparkles, 
  ArrowUpRight, Check, Repeat, Smartphone, Layers 
} from 'lucide-react';

export const CapabilitiesBento: React.FC = () => {
  return (
    <section id="capabilities" className="py-16 md:py-24 relative bg-white dark:bg-[#080C14] border-t border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-indigo-50 dark:bg-indigo-500/10 text-indigo-700 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-500/20 text-xs font-bold mb-3 shadow-sm">
            <Layers className="w-3.5 h-3.5" />
            <span>Full-Funnel Capabilities Matrix</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight font-display">
            Built for Scale. Engineered for Profit.
          </h2>
          <p className="text-base sm:text-lg text-slate-700 dark:text-slate-300 mt-3 font-normal">
            We don't manage ad accounts in silos. We deploy an interconnected acquisition, creative, and attribution ecosystem designed to maximize blended contribution margin.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 max-w-6xl mx-auto">
          {/* Bento Card 1: Meta Ads Machine (Span 7) */}
          <div className="md:col-span-7 p-6 sm:p-8 rounded-3xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-lg dark:shadow-xl hover:border-indigo-500/50 transition-all duration-300 flex flex-col justify-between group">
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-600 dark:text-indigo-400 group-hover:scale-105 transition-transform">
                  <Zap className="w-6 h-6" />
                </div>
                <span className="text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-indigo-100 dark:bg-indigo-500/10 text-indigo-700 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-500/20">
                  Demand Generation
                </span>
              </div>

              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2 font-display">
                Meta Performance Machine
              </h3>
              <p className="text-sm text-slate-700 dark:text-slate-300 mb-6 leading-relaxed">
                Consolidated algorithmic media buying for Facebook & Instagram that turns ad creatives into predictive conversion engines.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-800 dark:text-slate-200">
                <div className="flex items-start space-x-2 p-3 rounded-2xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 shadow-sm">
                  <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span><strong>3:2:2 Dynamic Creative Testing</strong> (Hooks, Headlines, Visuals)</span>
                </div>
                <div className="flex items-start space-x-2 p-3 rounded-2xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 shadow-sm">
                  <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span><strong>Advantage+ Shopping (ASC)</strong> with Post ID preservation</span>
                </div>
                <div className="flex items-start space-x-2 p-3 rounded-2xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 shadow-sm">
                  <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span><strong>Catalog Retargeting (DPA)</strong> for view & cart recovery</span>
                </div>
                <div className="flex items-start space-x-2 p-3 rounded-2xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 shadow-sm">
                  <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span><strong>Thumbstop Rate &gt; 35%</strong> optimization protocols</span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs font-bold text-indigo-600 dark:text-indigo-400">
              <span>Goal: High-Volume New Customer Acquisition</span>
              <ArrowUpRight className="w-4 h-4" />
            </div>
          </div>

          {/* Bento Card 2: Google PMax & Feed Engine (Span 5) */}
          <div className="md:col-span-5 p-6 sm:p-8 rounded-3xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-lg dark:shadow-xl hover:border-emerald-500/50 transition-all duration-300 flex flex-col justify-between group">
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-600 dark:text-emerald-400 group-hover:scale-105 transition-transform">
                  <ShoppingBag className="w-6 h-6" />
                </div>
                <span className="text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-500/20">
                  Demand Capture
                </span>
              </div>

              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2 font-display">
                Google PMax & Intent
              </h3>
              <p className="text-sm text-slate-700 dark:text-slate-300 mb-6 leading-relaxed">
                Harvesting active, ready-to-buy intent across Google Shopping, Search, and YouTube with precise feed segmentation.
              </p>

              <ul className="space-y-2.5 text-xs text-slate-800 dark:text-slate-200">
                <li className="flex items-start space-x-2">
                  <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span><strong>GMC Custom Labels</strong>: High-Margin vs Hero SKUs</span>
                </li>
                <li className="flex items-start space-x-2">
                  <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span><strong>Brand Search Defense</strong> defending top organic ranks</span>
                </li>
                <li className="flex items-start space-x-2">
                  <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span><strong>High-Intent Search STAGs</strong> for unbranded keywords</span>
                </li>
                <li className="flex items-start space-x-2">
                  <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span><strong>Negative Keyword Mastery</strong> eliminating budget waste</span>
                </li>
              </ul>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs font-bold text-emerald-600 dark:text-emerald-400">
              <span>Goal: High-ROAS Purchase Intent</span>
              <ArrowUpRight className="w-4 h-4" />
            </div>
          </div>

          {/* Bento Card 3: Server-Side CAPI & Attribution (Span 4) */}
          <div className="md:col-span-4 p-6 sm:p-8 rounded-3xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-lg dark:shadow-xl hover:border-cyan-500/50 transition-all duration-300 flex flex-col justify-between group">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-600 dark:text-cyan-400 mb-6 group-hover:scale-105 transition-transform">
                <Database className="w-6 h-6" />
              </div>

              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2 font-display">
                First-Party Attribution
              </h3>
              <p className="text-xs text-slate-700 dark:text-slate-300 mb-4 leading-relaxed">
                Server-side Meta Conversions API (CAPI) and GA4 enhanced e-commerce eliminating iOS signal loss.
              </p>

              <div className="p-3.5 rounded-2xl bg-cyan-50 dark:bg-cyan-950/40 border border-cyan-200 dark:border-cyan-800/60 text-xs text-cyan-900 dark:text-cyan-200 mb-4">
                <div className="font-extrabold text-sm font-mono text-cyan-700 dark:text-cyan-300">EMQ &gt; 9.0 / 10</div>
                <div className="text-[11px] mt-0.5">Deduplicated purchase events with zero latency</div>
              </div>
            </div>

            <div className="text-xs font-bold text-cyan-600 dark:text-cyan-400 flex items-center justify-between pt-2">
              <span>Triple Whale / Northbeam Sync</span>
              <ArrowUpRight className="w-4 h-4" />
            </div>
          </div>

          {/* Bento Card 4: UGC & Creative Studio (Span 4) */}
          <div className="md:col-span-4 p-6 sm:p-8 rounded-3xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-lg dark:shadow-xl hover:border-violet-500/50 transition-all duration-300 flex flex-col justify-between group">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center text-violet-600 dark:text-violet-400 mb-6 group-hover:scale-105 transition-transform">
                <Video className="w-6 h-6" />
              </div>

              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2 font-display">
                Creative & UGC Studio
              </h3>
              <p className="text-xs text-slate-700 dark:text-slate-300 mb-4 leading-relaxed">
                Weekly creative briefs, thumbstop hook variations, problem-agitation video scripts, and high-CTR statics.
              </p>

              <ul className="space-y-1.5 text-xs text-slate-800 dark:text-slate-200">
                <li className="flex items-center space-x-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-violet-500"></span>
                  <span>4 Proven Angles: PAS, Us vs Them, Demo, Press</span>
                </li>
                <li className="flex items-center space-x-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-violet-500"></span>
                  <span>Continuous Creative Fatigue Defense</span>
                </li>
              </ul>
            </div>

            <div className="text-xs font-bold text-violet-600 dark:text-violet-400 flex items-center justify-between pt-4">
              <span>Weekly New Ad Assets Delivered</span>
              <ArrowUpRight className="w-4 h-4" />
            </div>
          </div>

          {/* Bento Card 5: Shopify CRO & LTV Scaling (Span 4) */}
          <div className="md:col-span-4 p-6 sm:p-8 rounded-3xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-lg dark:shadow-xl hover:border-amber-500/50 transition-all duration-300 flex flex-col justify-between group">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-600 dark:text-amber-400 mb-6 group-hover:scale-105 transition-transform">
                <Smartphone className="w-6 h-6" />
              </div>

              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2 font-display">
                Shopify CRO & LTV Expansion
              </h3>
              <p className="text-xs text-slate-700 dark:text-slate-300 mb-4 leading-relaxed">
                Traffic is only half the battle. We audit product pages, checkout flows, and post-purchase retention upsells.
              </p>

              <ul className="space-y-1.5 text-xs text-slate-800 dark:text-slate-200">
                <li className="flex items-center space-x-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
                  <span>Mobile Sticky Add-To-Cart & Speed Audit</span>
                </li>
                <li className="flex items-center space-x-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
                  <span>Post-Purchase Upsell Revenue Lift (+18%)</span>
                </li>
              </ul>
            </div>

            <div className="text-xs font-bold text-amber-600 dark:text-amber-400 flex items-center justify-between pt-4">
              <span>Contribution Margin Focus</span>
              <ArrowUpRight className="w-4 h-4" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
