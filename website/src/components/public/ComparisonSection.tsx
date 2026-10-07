import React from 'react';
import { Check, X, ShieldAlert, Sparkles, TrendingUp } from 'lucide-react';

export const ComparisonSection: React.FC = () => {
  const features = [
    {
      title: 'Pricing & Incentive Model',
      traditional: 'Fixed $6k-$10k/mo retainer regardless of results',
      inhouse: 'Heavy payroll & recruiter overhead ($150k+/yr salary)',
      vanguard: 'Performance-Hybrid: Low base + scale fee aligned with profit',
    },
    {
      title: 'Contract Terms & Risk',
      traditional: '6 to 12 month binding lock-in contracts',
      inhouse: 'Costly severance & long hiring ramp-up',
      vanguard: '90-Day Guaranteed Scale Sprint (Hit target MER or work free)',
    },
    {
      title: 'Attribution & Tracking',
      traditional: 'Relies on broken browser pixels & platform reports',
      inhouse: 'Requires expensive external data engineers',
      vanguard: 'Full Server-Side CAPI (EMQ > 8.8) + Blended MER single source of truth',
    },
    {
      title: 'Creative Production Engine',
      traditional: 'Waits for client to deliver creative assets',
      inhouse: 'Slow internal design queues',
      vanguard: 'Weekly UGC video scripts, thumbstop hooks & 3:2:2 DCT sandbox tests',
    },
    {
      title: 'Omnichannel Integration',
      traditional: 'Separate siloed media buyers who never talk to each other',
      inhouse: 'Single generalist trying to do everything',
      vanguard: 'Unified algorithmic engine: Meta ASC drives demand, Google PMax captures it',
    },
  ];

  return (
    <section id="comparison" className="py-16 md:py-24 relative bg-white dark:bg-[#080C14] border-t border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 text-xs font-bold mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>The Vanguard Advantage</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight font-display">
            Why High-Growth Brands Choose Us
          </h2>
          <p className="text-base sm:text-lg text-slate-700 dark:text-slate-300 mt-3 font-normal">
            Traditional agencies charge high retainers with zero skin in the game. In-house hires take months to ramp. We combine senior performance execution with guaranteed results.
          </p>
        </div>

        {/* Desktop View: Full 4-Column Comparison Table */}
        <div className="hidden md:block max-w-5xl mx-auto rounded-3xl bg-slate-50 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950">
                  <th className="py-5 px-6 font-extrabold text-slate-800 dark:text-slate-200 uppercase text-xs tracking-wider">
                    Dimension
                  </th>
                  <th className="py-5 px-6 font-bold text-slate-600 dark:text-slate-400 text-xs">
                    Traditional Agency
                  </th>
                  <th className="py-5 px-6 font-bold text-slate-600 dark:text-slate-400 text-xs">
                    In-House Hire
                  </th>
                  <th className="py-5 px-6 font-extrabold text-indigo-700 dark:text-indigo-300 bg-indigo-50/80 dark:bg-indigo-950/40 border-l border-r border-indigo-200 dark:border-indigo-800 text-xs">
                    Vanguard DTC Partner
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                {features.map((item, idx) => (
                  <tr key={idx} className="hover:bg-slate-100/70 dark:hover:bg-slate-800/50 transition-colors">
                    <td className="py-4 px-6 font-bold text-slate-900 dark:text-white">
                      {item.title}
                    </td>
                    <td className="py-4 px-6 text-slate-700 dark:text-slate-300">
                      <div className="flex items-start space-x-2">
                        <X className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                        <span>{item.traditional}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-slate-700 dark:text-slate-300">
                      <div className="flex items-start space-x-2">
                        <X className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                        <span>{item.inhouse}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-slate-900 dark:text-white font-semibold bg-indigo-50/80 dark:bg-indigo-950/40 border-l border-r border-indigo-200 dark:border-indigo-800">
                      <div className="flex items-start space-x-2">
                        <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                        <span className="text-indigo-950 dark:text-indigo-200 font-bold">{item.vanguard}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Mobile View: High-Impact Stacked Comparison Cards (No Awkward Horizontal Scroll) */}
        <div className="block md:hidden space-y-4 max-w-xl mx-auto">
          {features.map((item, idx) => (
            <div
              key={idx}
              className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-md space-y-3"
            >
              <h4 className="text-sm font-bold text-slate-900 dark:text-white font-display border-b border-slate-100 dark:border-slate-800 pb-2">
                {item.title}
              </h4>

              {/* Vanguard (Winner) */}
              <div className="p-3 rounded-xl bg-indigo-50/80 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800/60">
                <div className="flex items-center space-x-1.5 text-[10px] uppercase font-mono font-bold text-indigo-700 dark:text-indigo-400 mb-1">
                  <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                  <span>Vanguard DTC Partner</span>
                </div>
                <p className="text-xs font-bold text-slate-900 dark:text-white leading-relaxed">
                  {item.vanguard}
                </p>
              </div>

              {/* Other Options */}
              <div className="space-y-2 pt-1 text-xs">
                <div className="flex items-start space-x-2 text-slate-600 dark:text-slate-400">
                  <X className="w-3.5 h-3.5 text-rose-500 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-slate-700 dark:text-slate-300 mr-1">Traditional Agency:</span>
                    <span>{item.traditional}</span>
                  </div>
                </div>

                <div className="flex items-start space-x-2 text-slate-600 dark:text-slate-400">
                  <X className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-slate-700 dark:text-slate-300 mr-1">In-House Hire:</span>
                    <span>{item.inhouse}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
