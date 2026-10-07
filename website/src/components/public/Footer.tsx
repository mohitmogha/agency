import React from 'react';
import { TrendingUp, ShieldCheck, Sun, Moon, Lock } from 'lucide-react';
import type { ThemeMode } from '../../lib/theme';

interface FooterProps {
  theme: ThemeMode;
  onToggleTheme: () => void;
  onOpenAuditModal: () => void;
  onOpenTeamLogin: () => void;
  scrollToSection?: (id: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ 
  theme, 
  onToggleTheme, 
  onOpenAuditModal, 
  onOpenTeamLogin,
  scrollToSection,
}) => {
  return (
    <footer className="border-t border-slate-200 dark:border-slate-800/80 bg-white dark:bg-[#070A12] text-slate-600 dark:text-slate-400 py-16 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-slate-200 dark:border-slate-800/80">
          {/* Col 1: Brand & Positioning */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-emerald-400 p-[1px] shadow-sm shrink-0">
                <div className="w-full h-full bg-white dark:bg-[#0B0F19] rounded-[11px] flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-xl font-extrabold text-slate-900 dark:text-white tracking-tight font-display whitespace-nowrap">
                  VANGUARD DTC
                </span>
                <span className="text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20 whitespace-nowrap">
                  PWA Ready
                </span>
              </div>
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-400 max-w-sm leading-relaxed">
              Global E-Commerce & DTC Performance Marketing Agency scaling Shopify brands with algorithmic media buying, server-side attribution, and continuous creative testing.
            </p>
            <div className="flex items-center space-x-2 text-xs text-emerald-600 dark:text-emerald-400 font-medium">
              <ShieldCheck className="w-4 h-4 shrink-0" />
              <span>Strict 90-Day Guaranteed MER Performance SLAs</span>
            </div>
          </div>

          {/* Col 2: Services & Playbooks */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider font-display">
              Growth Capabilities
            </h4>
            <ul className="space-y-2 text-xs">
              <li 
                onClick={() => scrollToSection?.('capabilities')} 
                className="hover:text-indigo-600 dark:hover:text-indigo-400 cursor-pointer transition-colors"
              >
                3:2:2 Dynamic Creative Testing
              </li>
              <li 
                onClick={() => scrollToSection?.('capabilities')} 
                className="hover:text-indigo-600 dark:hover:text-indigo-400 cursor-pointer transition-colors"
              >
                Advantage+ Shopping Campaigns (ASC)
              </li>
              <li 
                onClick={() => scrollToSection?.('capabilities')} 
                className="hover:text-indigo-600 dark:hover:text-indigo-400 cursor-pointer transition-colors"
              >
                Google PMax SKU Margin Segmentation
              </li>
              <li 
                onClick={() => scrollToSection?.('capabilities')} 
                className="hover:text-indigo-600 dark:hover:text-indigo-400 cursor-pointer transition-colors"
              >
                Meta CAPI & Server-Side GTM (EMQ &gt; 8.8)
              </li>
              <li 
                onClick={() => scrollToSection?.('capabilities')} 
                className="hover:text-indigo-600 dark:hover:text-indigo-400 cursor-pointer transition-colors"
              >
                Shopify Mobile CRO & Checkout
              </li>
            </ul>
          </div>

          {/* Col 3: Brand Navigation & Theme */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider font-display">
              Brand Solutions
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={onOpenAuditModal}
                  className="hover:text-emerald-700 dark:hover:text-emerald-300 text-left text-emerald-600 dark:text-emerald-400 font-bold transition-colors whitespace-nowrap"
                >
                  Request 45-Pt Account Audit
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection?.('calculator')}
                  className="hover:text-indigo-600 dark:hover:text-indigo-400 text-left transition-colors whitespace-nowrap"
                >
                  Simulate Net ROAS & Profit
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection?.('case-studies')}
                  className="hover:text-indigo-600 dark:hover:text-indigo-400 text-left transition-colors whitespace-nowrap"
                >
                  Verified DTC Case Studies
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection?.('guarantee')}
                  className="hover:text-indigo-600 dark:hover:text-indigo-400 text-left transition-colors whitespace-nowrap"
                >
                  The 90-Day Guaranteed Scale Sprint
                </button>
              </li>
              <li className="pt-2">
                <button
                  onClick={onToggleTheme}
                  className="inline-flex items-center space-x-2 text-xs text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors whitespace-nowrap"
                >
                  {theme === 'dark' ? <Sun className="w-3.5 h-3.5 text-amber-400 shrink-0" /> : <Moon className="w-3.5 h-3.5 text-indigo-600 shrink-0" />}
                  <span>Switch to {theme === 'dark' ? 'Light' : 'Dark'} Mode</span>
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Legal & Discreet Internal Staff Access */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 dark:text-slate-500 gap-4">
          <div className="text-center sm:text-left">
            &copy; {new Date().getFullYear()} Vanguard DTC Media. Progressive Web App (PWA). All rights reserved.
          </div>
          <div className="flex flex-wrap items-center justify-center sm:justify-end gap-x-5 gap-y-2">
            <span className="hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200 cursor-pointer transition-colors whitespace-nowrap">
              Privacy Policy
            </span>
            <span className="hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200 cursor-pointer transition-colors whitespace-nowrap">
              Terms of Service
            </span>
            <span className="hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200 cursor-pointer transition-colors whitespace-nowrap">
              Master Services Agreement
            </span>

            {/* Discreet Internal Team Access Trigger */}
            <button
              onClick={onOpenTeamLogin}
              className="inline-flex items-center space-x-1.5 text-slate-400 dark:text-slate-600 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors py-1 px-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-900 whitespace-nowrap"
              title="Authorized Agency Personnel Only (Alt + P)"
            >
              <Lock className="w-3 h-3 shrink-0" />
              <span className="text-[11px] font-mono">Staff Access</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
