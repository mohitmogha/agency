import React from 'react';
import { Sparkles, Calculator, Layers } from 'lucide-react';

interface MobileStickyBarProps {
  onOpenAuditModal: () => void;
  onScrollToCalculator: () => void;
  onScrollToCapabilities?: () => void;
}

export const MobileStickyBar: React.FC<MobileStickyBarProps> = ({
  onOpenAuditModal,
  onScrollToCalculator,
  onScrollToCapabilities,
}) => {
  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 p-2.5 bg-white/95 dark:bg-[#080C14]/95 backdrop-blur-xl border-t border-slate-200 dark:border-slate-800 shadow-2xl safe-area-bottom">
      <div className="flex items-center space-x-2">
        <button
          onClick={onScrollToCalculator}
          className="p-3 rounded-2xl bg-slate-100 dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 flex items-center justify-center shrink-0 active:scale-95 transition-transform"
          title="ROAS Simulator"
        >
          <Calculator className="w-5 h-5 text-indigo-500" />
        </button>

        {onScrollToCapabilities && (
          <button
            onClick={onScrollToCapabilities}
            className="p-3 rounded-2xl bg-slate-100 dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 flex items-center justify-center shrink-0 active:scale-95 transition-transform"
            title="Full-Funnel Capabilities"
          >
            <Layers className="w-5 h-5 text-emerald-500" />
          </button>
        )}

        <button
          onClick={onOpenAuditModal}
          className="flex-1 py-3 px-4 rounded-full bg-gradient-to-r from-indigo-600 via-indigo-500 to-emerald-500 text-white font-extrabold text-xs flex items-center justify-center space-x-2 shadow-lg shadow-indigo-600/30 active:scale-95 transition-all whitespace-nowrap"
        >
          <Sparkles className="w-4 h-4 text-emerald-200 shrink-0" />
          <span className="whitespace-nowrap">Claim Free 45-Pt Audit</span>
        </button>
      </div>
    </div>
  );
};
