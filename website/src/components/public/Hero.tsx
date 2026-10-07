import React from 'react';
import { 
  ArrowRight, CheckCircle2, TrendingUp, Sparkles, 
  ShieldCheck, Zap, Star, Shield, Activity, 
  BarChart3, Layers, Video
} from 'lucide-react';

interface HeroProps {
  onOpenAuditModal: () => void;
  onScrollToCalculator: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenAuditModal, onScrollToCalculator }) => {
  const clientLogos = [
    { name: 'LuxeSwim Coastal', category: 'Apparel', tag: '+496% Scaled' },
    { name: 'NaturaPet Organics', category: 'Supplements', tag: '4.0x MER' },
    { name: 'Aura Sleep Labs', category: 'Sleep Tech', tag: '+648% Net Profit' },
    { name: 'Solana Botanicals', category: 'Clean Skincare', tag: '9.2 CAPI' },
    { name: 'Nordic Ember', category: 'Cookware', tag: 'PMax Hero' },
  ];

  return (
    <section className="relative overflow-hidden pt-8 pb-16 md:pt-16 md:pb-24 bg-grid-pattern transition-colors">
      {/* Background radial glow blurs */}
      <div className="absolute top-1/3 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[350px] sm:w-[550px] h-[350px] sm:h-[450px] bg-gradient-to-tr from-indigo-500/15 via-cyan-500/10 to-emerald-500/10 blur-[130px] rounded-full pointer-events-none" />
      <div className="absolute top-1/2 right-10 w-[300px] sm:w-[450px] h-[300px] sm:h-[350px] bg-indigo-500/10 dark:bg-indigo-600/15 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* TWO-PART HERO: Left (Text & CTA) + Right (Motion Graphics Creative) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* LEFT COLUMN: Text, Value Proposition & Conversion CTAs */}
          <div className="lg:col-span-7 space-y-6 text-left">
            {/* Animated Urgency & Trust Pill Badge */}
            <div className="inline-flex max-w-full items-center gap-1.5 sm:gap-2 px-3 sm:px-3.5 py-1.5 rounded-full bg-indigo-50 dark:bg-indigo-500/10 border border-indigo-200 dark:border-indigo-500/30 text-indigo-700 dark:text-indigo-300 text-[11px] sm:text-xs font-bold shadow-sm">
              <span className="relative flex h-2 w-2 shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="hidden sm:inline whitespace-nowrap">Verified Google & Meta Ads Partner</span>
              <span className="sm:hidden whitespace-nowrap">Google & Meta Partner</span>
              <span className="text-slate-300 dark:text-slate-700">•</span>
              <span className="text-emerald-700 dark:text-emerald-400 font-extrabold whitespace-nowrap">Q4 Sprints Open</span>
            </div>

            {/* High-Impact Headline with Rich High-Contrast Typography */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-[1.1] font-display">
              Scale Your Shopify Store Past $100k/mo With{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-cyan-600 to-emerald-600 dark:from-indigo-400 dark:via-cyan-400 dark:to-emerald-400">
                Predictable MER.
              </span>
            </h1>

            {/* Subtitle / Value Prop */}
            <p className="text-base sm:text-lg text-slate-700 dark:text-slate-300 max-w-xl leading-relaxed font-normal">
              We eliminate guesswork in media buying. We deploy consolidated <strong className="text-slate-900 dark:text-white font-bold">Meta Advantage+ Shopping</strong>, <strong className="text-slate-900 dark:text-white font-bold">3:2:2 Dynamic Creative sandboxes</strong>, and high-margin <strong className="text-slate-900 dark:text-white font-bold">Google PMax feeds</strong> engineered strictly for net contribution margin.
            </p>

            {/* CTA Buttons (Single Line, High-Converting) */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
              <button
                onClick={onOpenAuditModal}
                className="inline-flex items-center justify-center space-x-2 text-xs sm:text-sm font-extrabold px-6 sm:px-8 py-3.5 sm:py-4 rounded-full bg-gradient-to-r from-indigo-600 via-indigo-500 to-emerald-500 text-white shadow-xl shadow-indigo-600/25 hover:shadow-indigo-600/40 hover:scale-[1.02] active:scale-95 transition-all whitespace-nowrap group shrink-0"
              >
                <Sparkles className="w-4 h-4 text-emerald-200 shrink-0" />
                <span className="whitespace-nowrap">Claim Free 45-Pt Audit</span>
                <ArrowRight className="w-4 h-4 shrink-0 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={onScrollToCalculator}
                className="inline-flex items-center justify-center space-x-2 text-xs sm:text-sm font-bold px-6 sm:px-7 py-3.5 sm:py-4 rounded-full bg-white dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-900 dark:text-slate-100 border border-slate-300 dark:border-slate-800 transition-all shadow-sm active:scale-95 whitespace-nowrap shrink-0"
              >
                <TrendingUp className="w-4 h-4 text-indigo-600 dark:text-indigo-400 shrink-0" />
                <span className="whitespace-nowrap">Simulate Net ROAS</span>
              </button>
            </div>

            {/* Social Proof & Trust Guarantee Row */}
            <div className="pt-3 flex flex-col sm:flex-row items-start sm:items-center gap-4 border-t border-slate-200 dark:border-slate-800/80">
              <div className="flex items-center space-x-2">
                <div className="flex -space-x-2">
                  <div className="w-7 h-7 rounded-full bg-indigo-500 text-white text-[10px] font-bold flex items-center justify-center ring-2 ring-white dark:ring-slate-900">
                    JD
                  </div>
                  <div className="w-7 h-7 rounded-full bg-emerald-500 text-white text-[10px] font-bold flex items-center justify-center ring-2 ring-white dark:ring-slate-900">
                    SK
                  </div>
                  <div className="w-7 h-7 rounded-full bg-cyan-500 text-white text-[10px] font-bold flex items-center justify-center ring-2 ring-white dark:ring-slate-900">
                    ML
                  </div>
                  <div className="w-7 h-7 rounded-full bg-amber-500 text-white text-[10px] font-bold flex items-center justify-center ring-2 ring-white dark:ring-slate-900">
                    RB
                  </div>
                </div>
                <div className="flex items-center space-x-0.5 text-amber-500">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
              </div>

              <div className="text-xs text-slate-600 dark:text-slate-400 font-medium">
                <span className="font-bold text-slate-900 dark:text-white">4.12x Avg MER</span> across <span className="font-bold text-slate-900 dark:text-white">$18.4M+</span> ad spend • <span className="text-emerald-600 dark:text-emerald-400 font-semibold">90-Day Guarantee</span>
              </div>
            </div>

            {/* Trust Badges Pills */}
            <div className="flex flex-wrap items-center gap-2 text-[11px] font-semibold text-slate-700 dark:text-slate-300">
              <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-lg bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                <span>Zero Long-Term Lock-in</span>
              </div>
              <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-lg bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                <CheckCircle2 className="w-3.5 h-3.5 text-indigo-500 shrink-0" />
                <span>Server-Side CAPI (EMQ &gt; 8.8)</span>
              </div>
              <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-lg bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                <CheckCircle2 className="w-3.5 h-3.5 text-cyan-500 shrink-0" />
                <span>100% Client Asset Ownership</span>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Creative Motion Graphics Dashboard Showcase */}
          <div className="lg:col-span-5 relative mt-6 lg:mt-0 max-w-md mx-auto lg:max-w-none w-full">
            {/* Ambient Background Glow Orb */}
            <div className="absolute -inset-2 bg-gradient-to-r from-indigo-500/20 via-cyan-500/20 to-emerald-500/20 rounded-3xl blur-2xl opacity-60 animate-pulse-glow pointer-events-none" />

            {/* Main Glassmorphic Campaign Engine Container */}
            <div className="relative rounded-3xl bg-white dark:bg-[#0E1422] border border-slate-200 dark:border-slate-800 shadow-2xl p-5 sm:p-6 space-y-4 backdrop-blur-xl">
              
              {/* Top Engine Header Status Bar */}
              <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800/80">
                <div className="flex items-center space-x-2">
                  <div className="flex space-x-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                    <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                  </div>
                  <span className="text-xs font-mono font-bold text-slate-800 dark:text-slate-200 ml-1">
                    vanguard_engine.live
                  </span>
                </div>

                <div className="flex items-center space-x-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[10px] font-mono font-bold text-emerald-600 dark:text-emerald-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span>OPTIMIZING</span>
                </div>
              </div>

              {/* CARD 1: Live Meta Advantage+ Shopping with Animated SVG Trendline */}
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800/90 shadow-sm relative overflow-hidden group">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <div className="w-7 h-7 rounded-lg bg-indigo-600 flex items-center justify-center text-white shadow-sm">
                      <Zap className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-900 dark:text-white font-display">
                        Meta Advantage+ Shopping
                      </div>
                      <div className="text-[10px] text-slate-500 dark:text-slate-400 font-mono">
                        3:2:2 Dynamic Creative Testing
                      </div>
                    </div>
                  </div>
                  <span className="text-xs font-extrabold text-emerald-600 dark:text-emerald-400 font-mono bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                    +318% Rev
                  </span>
                </div>

                {/* Live Metrics Row */}
                <div className="grid grid-cols-3 gap-1.5 sm:gap-2 my-2.5 text-left">
                  <div className="p-1.5 sm:p-2 rounded-xl bg-white dark:bg-slate-950 border border-slate-200/80 dark:border-slate-800">
                    <span className="text-[9px] uppercase font-bold text-slate-500 dark:text-slate-400 block truncate">Blended MER</span>
                    <span className="text-sm sm:text-base font-extrabold text-slate-900 dark:text-white font-mono">4.38x</span>
                  </div>
                  <div className="p-1.5 sm:p-2 rounded-xl bg-white dark:bg-slate-950 border border-slate-200/80 dark:border-slate-800">
                    <span className="text-[9px] uppercase font-bold text-slate-500 dark:text-slate-400 block truncate">CPA</span>
                    <span className="text-sm sm:text-base font-extrabold text-emerald-600 dark:text-emerald-400 font-mono">$18.20</span>
                  </div>
                  <div className="p-1.5 sm:p-2 rounded-xl bg-white dark:bg-slate-950 border border-slate-200/80 dark:border-slate-800">
                    <span className="text-[9px] uppercase font-bold text-slate-500 dark:text-slate-400 block truncate">Thumbstop</span>
                    <span className="text-sm sm:text-base font-extrabold text-indigo-600 dark:text-indigo-400 font-mono">44.8%</span>
                  </div>
                </div>

                {/* Animated SVG Trend Waveform */}
                <div className="h-14 w-full relative">
                  <svg className="w-full h-full overflow-visible" viewBox="0 0 300 60" preserveAspectRatio="none">
                    <defs>
                      <linearGradient id="gradientWave" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#6366F1" stopOpacity="0.35" />
                        <stop offset="100%" stopColor="#6366F1" stopOpacity="0.0" />
                      </linearGradient>
                    </defs>
                    <path
                      d="M 0 45 Q 40 40 80 25 T 160 30 T 230 12 T 300 8 L 300 60 L 0 60 Z"
                      fill="url(#gradientWave)"
                    />
                    <path
                      d="M 0 45 Q 40 40 80 25 T 160 30 T 230 12 T 300 8"
                      fill="none"
                      stroke="#4F46E5"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                    />
                    {/* Glowing animated peak circle node */}
                    <circle cx="230" cy="12" r="4.5" fill="#10B981" className="animate-ping opacity-75" />
                    <circle cx="230" cy="12" r="3.5" fill="#10B981" stroke="#ffffff" strokeWidth="1.5" />
                    <circle cx="300" cy="8" r="4" fill="#6366F1" stroke="#ffffff" strokeWidth="1.5" />
                  </svg>
                </div>
              </div>

              {/* CARD 2: Floating Motion Graphics Card - Google PMax Margin Segment */}
              <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800/90 shadow-sm animate-float-slow">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-6 h-6 rounded-md bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold text-xs">
                      G
                    </div>
                    <div>
                      <span className="text-xs font-bold text-slate-900 dark:text-white">Google PMax SKU Segmentation</span>
                      <span className="block text-[10px] text-slate-500 dark:text-slate-400">High Margin Tier (&gt;70% GP)</span>
                    </div>
                  </div>
                  <span className="font-mono text-xs font-bold text-slate-900 dark:text-white bg-white dark:bg-slate-950 px-2 py-0.5 rounded border border-slate-200 dark:border-slate-800">
                    $48.2k Value
                  </span>
                </div>
              </div>

              {/* CARD 3: Creative Video Audio-Equalizer Motion Graphics */}
              <div className="p-3.5 rounded-2xl bg-indigo-50/60 dark:bg-indigo-950/30 border border-indigo-200/50 dark:border-indigo-900/40 flex items-center justify-between">
                <div className="flex items-center space-x-2.5">
                  <div className="w-7 h-7 rounded-lg bg-indigo-500/20 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
                    <Video className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-900 dark:text-white">UGC Thumbstop Hook #3</div>
                    <div className="text-[10px] text-indigo-700 dark:text-indigo-300 font-medium">Founder Problem-Agitate-Solve</div>
                  </div>
                </div>

                {/* Animated motion equalizer bars */}
                <div className="flex items-end space-x-1 h-6">
                  <div className="w-1 bg-indigo-600 rounded-full animate-bar-1" />
                  <div className="w-1 bg-emerald-500 rounded-full animate-bar-2" />
                  <div className="w-1 bg-cyan-500 rounded-full animate-bar-3" />
                  <div className="w-1 bg-indigo-500 rounded-full animate-bar-4" />
                  <div className="w-1 bg-emerald-400 rounded-full animate-bar-5" />
                  <div className="w-1 bg-indigo-600 rounded-full animate-bar-6" />
                </div>
              </div>

              {/* CARD 4: Floating CAPI Server-Side Signal Pill (Bottom Floating Animation) */}
              <div className="p-2.5 rounded-xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 shadow-md flex items-center justify-between text-xs animate-float-reverse">
                <div className="flex items-center space-x-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span className="font-semibold text-slate-900 dark:text-white">Server-Side CAPI Gateway</span>
                </div>
                <div className="flex items-center space-x-1 font-mono text-[11px] font-bold text-emerald-600 dark:text-emerald-400">
                  <Activity className="w-3.5 h-3.5 animate-pulse" />
                  <span>EMQ: 9.4/10 Verified</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Live Client Categories Ticker Ribbon (High-Contrast) */}
        <div className="mt-14 sm:mt-18 pt-8 border-t border-slate-200 dark:border-slate-800/80">
          <p className="text-center text-[11px] font-extrabold uppercase tracking-widest text-slate-500 dark:text-slate-400 mb-6 font-mono">
            Proven Performance Across High-Growth Categories
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 max-w-5xl mx-auto">
            {clientLogos.map((brand, idx) => (
              <div
                key={idx}
                className={`p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm text-center hover:border-indigo-500/50 transition-colors ${
                  idx === 4 ? 'col-span-2 sm:col-span-1' : ''
                }`}
              >
                <div className="text-xs font-bold text-slate-900 dark:text-white truncate">
                  {brand.name}
                </div>
                <div className="flex items-center justify-center space-x-1 mt-1">
                  <span className="text-[10px] text-slate-500 dark:text-slate-400 font-medium">{brand.category}</span>
                  <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold font-mono">
                    {brand.tag}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Big Impact Metric Ribbon (Clean High-Contrast in Light & Dark Mode with Responsive Dividers) */}
        <div className="mt-8 max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 p-4 sm:p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl">
          <div className="p-3 sm:p-4 text-center border-r border-b md:border-b-0 border-slate-200 dark:border-slate-800">
            <div className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white font-mono tracking-tight">$18.4M+</div>
            <div className="text-[10px] sm:text-[11px] uppercase tracking-wider text-slate-600 dark:text-slate-400 mt-1 font-bold">Tracked DTC Rev</div>
          </div>
          <div className="p-3 sm:p-4 text-center border-b md:border-b-0 md:border-r border-slate-200 dark:border-slate-800">
            <div className="text-2xl sm:text-3xl font-black text-emerald-600 dark:text-emerald-400 font-mono tracking-tight">4.12x</div>
            <div className="text-[10px] sm:text-[11px] uppercase tracking-wider text-slate-600 dark:text-slate-400 mt-1 font-bold">Avg Blended MER</div>
          </div>
          <div className="p-3 sm:p-4 text-center border-r border-slate-200 dark:border-slate-800">
            <div className="text-2xl sm:text-3xl font-black text-indigo-600 dark:text-indigo-400 font-mono tracking-tight">94.2%</div>
            <div className="text-[10px] sm:text-[11px] uppercase tracking-wider text-slate-600 dark:text-slate-400 mt-1 font-bold">CAPI Signal Match</div>
          </div>
          <div className="p-3 sm:p-4 text-center">
            <div className="text-2xl sm:text-3xl font-black text-cyan-600 dark:text-cyan-400 font-mono tracking-tight">340+</div>
            <div className="text-[10px] sm:text-[11px] uppercase tracking-wider text-slate-600 dark:text-slate-400 mt-1 font-bold">Weekly UGC Angles</div>
          </div>
        </div>

      </div>
    </section>
  );
};
