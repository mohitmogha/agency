import React, { useState } from 'react';
import { Calculator, ArrowRight, TrendingUp, DollarSign, Target, Sparkles, CheckCircle2 } from 'lucide-react';

interface RoasCalculatorProps {
  onOpenAuditModalWithSpend: (spend: number) => void;
}

export const RoasCalculator: React.FC<RoasCalculatorProps> = ({ onOpenAuditModalWithSpend }) => {
  const [adSpend, setAdSpend] = useState<number>(25000);
  const [aov, setAov] = useState<number>(75);
  const [currentRoas, setCurrentRoas] = useState<number>(2.1);
  const [grossMargin, setGrossMargin] = useState<number>(70);

  // Calculations
  const currentRevenue = Math.round(adSpend * currentRoas);
  const projectedRoas = parseFloat((currentRoas + 1.15).toFixed(2));
  const projectedRevenue = Math.round(adSpend * projectedRoas);
  
  const additionalRevenue = projectedRevenue - currentRevenue;
  const additionalGrossProfit = Math.round(additionalRevenue * (grossMargin / 100));
  const estimatedWastedSpendSaved = Math.round(adSpend * 0.22); // 22% leak recovery

  let tierName = 'Tier 2: Omnichannel Scale';
  if (adSpend < 15000) {
    tierName = 'Tier 1: Growth Sprint';
  } else if (adSpend > 50000) {
    tierName = 'Tier 3: Enterprise Omnimax';
  }

  return (
    <section id="calculator" className="py-16 md:py-24 relative bg-slate-50 dark:bg-[#070A12] border-t border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-500/20 text-xs font-bold mb-3 shadow-sm">
            <Calculator className="w-3.5 h-3.5" />
            <span>Interactive Profit & Scale Simulator</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight font-display">
            How Much Net Profit Are You Leaving on the Table?
          </h2>
          <p className="text-base sm:text-lg text-slate-700 dark:text-slate-300 mt-3 font-normal">
            Drag the sliders below to see your store's immediate revenue expansion once we deploy Meta ASC, Google PMax feed margin labels, and Server-Side CAPI tracking.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start max-w-6xl mx-auto">
          {/* Controls Column */}
          <div className="lg:col-span-6 p-5 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center space-x-2 font-display">
                <DollarSign className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                <span>Your Current Store Metrics</span>
              </h3>
              <span className="text-[11px] font-mono font-bold text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 px-2.5 py-1 rounded-full border border-slate-200 dark:border-slate-700">
                Live Simulator
              </span>
            </div>

            {/* Slider 1: Monthly Ad Spend */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs sm:text-sm">
                <span className="font-bold text-slate-800 dark:text-slate-200">Monthly Ad Spend (Meta + Google)</span>
                <span className="font-mono font-extrabold text-indigo-700 dark:text-indigo-300 text-sm bg-indigo-50 dark:bg-indigo-950/60 px-3 py-1 rounded-full border border-indigo-200 dark:border-indigo-800">
                  ${adSpend.toLocaleString()}
                </span>
              </div>
              <input
                type="range"
                min="5000"
                max="100000"
                step="2500"
                value={adSpend}
                onChange={(e) => setAdSpend(Number(e.target.value))}
                className="w-full"
              />
              <div className="flex justify-between text-[11px] text-slate-600 dark:text-slate-400 font-mono font-semibold">
                <span>$5k</span>
                <span>$25k</span>
                <span>$50k</span>
                <span>$100k+</span>
              </div>
            </div>

            {/* Slider 2: Average Order Value (AOV) */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs sm:text-sm">
                <span className="font-bold text-slate-800 dark:text-slate-200">Average Order Value (AOV)</span>
                <span className="font-mono font-extrabold text-indigo-700 dark:text-indigo-300 text-sm bg-indigo-50 dark:bg-indigo-950/60 px-3 py-1 rounded-full border border-indigo-200 dark:border-indigo-800">
                  ${aov}
                </span>
              </div>
              <input
                type="range"
                min="25"
                max="250"
                step="5"
                value={aov}
                onChange={(e) => setAov(Number(e.target.value))}
                className="w-full"
              />
              <div className="flex justify-between text-[11px] text-slate-600 dark:text-slate-400 font-mono font-semibold">
                <span>$25</span>
                <span>$75</span>
                <span>$150</span>
                <span>$250+</span>
              </div>
            </div>

            {/* Slider 3: Current Blended ROAS */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs sm:text-sm">
                <span className="font-bold text-slate-800 dark:text-slate-200">Current Blended ROAS / MER</span>
                <span className="font-mono font-extrabold text-indigo-700 dark:text-indigo-300 text-sm bg-indigo-50 dark:bg-indigo-950/60 px-3 py-1 rounded-full border border-indigo-200 dark:border-indigo-800">
                  {currentRoas.toFixed(1)}x
                </span>
              </div>
              <input
                type="range"
                min="1.0"
                max="4.0"
                step="0.1"
                value={currentRoas}
                onChange={(e) => setCurrentRoas(Number(e.target.value))}
                className="w-full"
              />
              <div className="flex justify-between text-[11px] text-slate-600 dark:text-slate-400 font-mono font-semibold">
                <span>1.0x (Break-even)</span>
                <span>2.0x (Average)</span>
                <span>3.0x</span>
                <span>4.0x+</span>
              </div>
            </div>

            {/* Slider 4: Gross Margin % */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs sm:text-sm">
                <span className="font-bold text-slate-800 dark:text-slate-200">Product Gross Margin % (after COGS)</span>
                <span className="font-mono font-extrabold text-indigo-700 dark:text-indigo-300 text-sm bg-indigo-50 dark:bg-indigo-950/60 px-3 py-1 rounded-full border border-indigo-200 dark:border-indigo-800">
                  {grossMargin}%
                </span>
              </div>
              <input
                type="range"
                min="50"
                max="85"
                step="5"
                value={grossMargin}
                onChange={(e) => setGrossMargin(Number(e.target.value))}
                className="w-full"
              />
              <div className="flex justify-between text-[11px] text-slate-600 dark:text-slate-400 font-mono font-semibold">
                <span>50%</span>
                <span>65%</span>
                <span>75%</span>
                <span>85%</span>
              </div>
            </div>
          </div>

          {/* Results Projection Card */}
          <div className="lg:col-span-6 p-5 sm:p-8 rounded-3xl bg-slate-900 dark:bg-[#0E1422] text-white shadow-2xl relative overflow-hidden space-y-6 border border-slate-800 dark:border-slate-800">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center space-x-2">
                <Sparkles className="w-5 h-5 text-emerald-400" />
                <span className="text-sm font-bold uppercase tracking-wider font-display">
                  Projected 90-Day Output
                </span>
              </div>
              <span className="text-xs font-semibold px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-400/30">
                {tierName}
              </span>
            </div>

            {/* Big Uplift Numbers */}
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              <div className="p-3.5 sm:p-4 rounded-2xl bg-slate-950/80 border border-slate-800">
                <div className="text-[11px] sm:text-xs uppercase font-semibold text-slate-400">Current Monthly Rev</div>
                <div className="text-lg sm:text-2xl font-black text-white mt-1 font-mono">${currentRevenue.toLocaleString()}</div>
                <div className="text-[10px] sm:text-[11px] text-slate-400 mt-0.5">@ {currentRoas.toFixed(1)}x ROAS</div>
              </div>

              <div className="p-3.5 sm:p-4 rounded-2xl bg-emerald-950/40 border border-emerald-500/50 relative">
                <div className="text-[11px] sm:text-xs uppercase font-bold text-emerald-300 flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <span>Projected Rev</span>
                  <span className="text-[9px] sm:text-[10px] bg-emerald-500/20 px-1.5 py-0.5 rounded-full font-bold w-fit">+${additionalRevenue.toLocaleString()}</span>
                </div>
                <div className="text-lg sm:text-2xl font-black text-emerald-400 mt-1 font-mono">
                  ${projectedRevenue.toLocaleString()}
                </div>
                <div className="text-[10px] sm:text-[11px] text-emerald-300 font-medium mt-0.5">@ {projectedRoas.toFixed(2)}x Target MER</div>
              </div>
            </div>

            {/* Key Growth Metrics */}
            <div className="space-y-3 pt-1">
              <div className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-950/70 border border-slate-800">
                <div className="flex items-center space-x-2 text-xs sm:text-sm text-slate-200">
                  <TrendingUp className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span className="font-semibold">Added Gross Profit / Month</span>
                </div>
                <div className="font-mono font-black text-emerald-400 text-base sm:text-lg">
                  +${additionalGrossProfit.toLocaleString()}
                </div>
              </div>

              <div className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-950/70 border border-slate-800">
                <div className="flex items-center space-x-2 text-xs sm:text-sm text-slate-200">
                  <Target className="w-4 h-4 text-indigo-400 shrink-0" />
                  <span className="font-semibold">Wasted Ad Spend Recovered / Mo</span>
                </div>
                <div className="font-mono font-black text-indigo-300 text-base sm:text-lg">
                  ~${estimatedWastedSpendSaved.toLocaleString()}
                </div>
              </div>
            </div>

            {/* Included Guarantee */}
            <div className="p-4 rounded-2xl bg-indigo-950/40 border border-indigo-500/30 text-xs text-indigo-200 flex items-start space-x-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span>
                Backed by our <strong>Strict 90-Day Guaranteed Scale Sprint</strong>. If we don't hit your target MER and profit expansion, we work for free.
              </span>
            </div>

            <button
              onClick={() => onOpenAuditModalWithSpend(adSpend)}
              className="w-full py-3.5 sm:py-4 px-4 sm:px-6 rounded-full bg-gradient-to-r from-indigo-500 via-indigo-600 to-emerald-500 text-white font-extrabold text-xs sm:text-sm shadow-xl shadow-indigo-600/30 hover:brightness-110 active:scale-95 transition-all flex items-center justify-center space-x-2 whitespace-nowrap"
            >
              <span className="whitespace-nowrap">Unlock Guaranteed Scale Sprint</span>
              <ArrowRight className="w-4 h-4 shrink-0" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
