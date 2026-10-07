import React, { useState } from 'react';
import { 
  TrendingUp, Sparkles, ShieldCheck, 
  Sun, Moon, Menu, X, ArrowRight 
} from 'lucide-react';
import type { ThemeMode } from '../../lib/theme';

interface NavbarProps {
  theme: ThemeMode;
  onToggleTheme: () => void;
  onOpenAuditModal: () => void;
  scrollToSection: (id: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  theme,
  onToggleTheme,
  onOpenAuditModal,
  scrollToSection,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleMobileNavClick = (sectionId: string) => {
    setMobileMenuOpen(false);
    scrollToSection(sectionId);
  };

  return (
    <nav className="sticky top-0 z-50 w-full backdrop-blur-xl bg-white/85 dark:bg-[#080C14]/90 border-b border-slate-200/80 dark:border-slate-800/80 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-2 sm:gap-4">
        {/* Brand Logo with Glowing Neon Mark */}
        <div 
          className="flex items-center space-x-2.5 sm:space-x-3 cursor-pointer select-none group shrink-0" 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <div className="relative shrink-0">
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-emerald-400 p-[2px] shadow-lg shadow-indigo-500/25 group-hover:scale-105 transition-transform duration-300">
              <div className="w-full h-full bg-white dark:bg-[#0B0F19] rounded-[14px] flex items-center justify-center">
                <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-indigo-600 dark:text-indigo-400" />
              </div>
            </div>
            <div className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-emerald-500 rounded-full border-2 border-white dark:border-[#080C14] animate-pulse" />
          </div>
          <div className="shrink-0">
            <div className="flex items-center space-x-1.5 sm:space-x-2">
              <span className="text-lg sm:text-xl font-extrabold tracking-tight text-slate-900 dark:text-white font-display whitespace-nowrap">
                VANGUARD
              </span>
              <span className="text-[9px] sm:text-[10px] font-extrabold uppercase tracking-widest px-1.5 sm:px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20 whitespace-nowrap">
                DTC
              </span>
            </div>
            <p className="text-[9px] sm:text-[10px] text-slate-500 dark:text-slate-400 font-semibold tracking-wider uppercase whitespace-nowrap">
              Omnichannel Growth Partner
            </p>
          </div>
        </div>

        {/* Desktop Nav Links - Clean Floating Pill (Strictly Single Line) */}
        <div className="hidden lg:flex items-center space-x-1 p-1.5 rounded-full bg-slate-100/90 dark:bg-slate-900/90 border border-slate-200/90 dark:border-slate-800/90 text-xs font-semibold text-slate-600 dark:text-slate-300 shadow-sm shrink-0">
          <button 
            onClick={() => scrollToSection('capabilities')}
            className="px-4 py-2 rounded-full hover:text-slate-900 dark:hover:text-white hover:bg-white dark:hover:bg-slate-800 transition-all whitespace-nowrap shrink-0"
          >
            Capabilities
          </button>
          <button 
            onClick={() => scrollToSection('calculator')}
            className="px-4 py-2 rounded-full hover:text-slate-900 dark:hover:text-white hover:bg-white dark:hover:bg-slate-800 transition-all whitespace-nowrap shrink-0"
          >
            ROAS Simulator
          </button>
          <button 
            onClick={() => scrollToSection('case-studies')}
            className="px-4 py-2 rounded-full hover:text-slate-900 dark:hover:text-white hover:bg-white dark:hover:bg-slate-800 transition-all flex items-center space-x-1.5 whitespace-nowrap shrink-0"
          >
            <span className="whitespace-nowrap">Case Studies</span>
            <span className="text-[9px] bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 font-extrabold px-1.5 py-0.5 rounded-full whitespace-nowrap">
              4.1x MER
            </span>
          </button>
          <button 
            onClick={() => scrollToSection('comparison')}
            className="px-4 py-2 rounded-full hover:text-slate-900 dark:hover:text-white hover:bg-white dark:hover:bg-slate-800 transition-all whitespace-nowrap shrink-0"
          >
            Why Us
          </button>
          <button 
            onClick={() => scrollToSection('guarantee')}
            className="px-4 py-2 rounded-full hover:text-slate-900 dark:hover:text-white hover:bg-white dark:hover:bg-slate-800 transition-all flex items-center space-x-1.5 whitespace-nowrap shrink-0"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
            <span className="whitespace-nowrap">90-Day Sprint</span>
          </button>
        </div>

        {/* Action Controls: Theme Switcher and Primary Client CTA (Mobile-Optimized) */}
        <div className="flex items-center space-x-2 sm:space-x-2.5 shrink-0">
          {/* Dark / Light Mode Toggle Button */}
          <button
            onClick={onToggleTheme}
            className="p-2 sm:p-2.5 rounded-full bg-slate-100 hover:bg-slate-200 dark:bg-slate-900 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 transition-all shadow-sm active:scale-95 shrink-0"
            title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} mode`}
          >
            {theme === 'dark' ? (
              <Sun className="w-4 h-4 text-amber-400 animate-spin-once" />
            ) : (
              <Moon className="w-4 h-4 text-indigo-600" />
            )}
          </button>

          {/* High-Converting Primary CTA (Hidden on mobile <sm to avoid bar crowding; bottom bar has mobile CTA) */}
          <button
            onClick={onOpenAuditModal}
            className="hidden sm:inline-flex items-center space-x-2 text-xs sm:text-sm font-extrabold px-5 sm:px-6 py-2.5 sm:py-3 rounded-full bg-gradient-to-r from-indigo-600 via-indigo-500 to-emerald-500 text-white shadow-lg shadow-indigo-600/30 hover:shadow-indigo-600/50 hover:brightness-110 transition-all active:scale-95 shrink-0 whitespace-nowrap"
          >
            <Sparkles className="w-4 h-4 text-emerald-200 shrink-0" />
            <span className="whitespace-nowrap">Free 45-Pt Audit</span>
          </button>

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 sm:p-2.5 rounded-full bg-slate-100 dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 shrink-0"
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation Menu (Client-Facing Only) */}
      {mobileMenuOpen && (
        <div className="lg:hidden px-4 pt-3 pb-6 bg-white/95 dark:bg-[#0B0F19]/95 backdrop-blur-2xl border-b border-slate-200 dark:border-slate-800 space-y-3 animate-in slide-in-from-top duration-200">
          <div className="grid grid-cols-2 gap-2 text-xs font-semibold">
            <button
              onClick={() => handleMobileNavClick('capabilities')}
              className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-900 text-left text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-800 whitespace-nowrap"
            >
              Capabilities
            </button>
            <button
              onClick={() => handleMobileNavClick('calculator')}
              className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-900 text-left text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-800 whitespace-nowrap"
            >
              ROAS Simulator
            </button>
            <button
              onClick={() => handleMobileNavClick('case-studies')}
              className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-900 text-left text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-800 flex items-center justify-between"
            >
              <span className="whitespace-nowrap">Case Studies</span>
              <span className="text-[10px] text-emerald-500 font-bold whitespace-nowrap">4.1x MER</span>
            </button>
            <button
              onClick={() => handleMobileNavClick('comparison')}
              className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-900 text-left text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-800 whitespace-nowrap"
            >
              Why Vanguard
            </button>
            <button
              onClick={() => handleMobileNavClick('guarantee')}
              className="col-span-2 p-3 rounded-2xl bg-slate-50 dark:bg-slate-900 text-left text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-800 flex items-center space-x-2"
            >
              <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
              <span className="whitespace-nowrap">90-Day Guaranteed Scale Sprint</span>
            </button>
          </div>

          <div className="pt-2 flex flex-col sm:flex-row gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAuditModal();
              }}
              className="w-full py-3.5 px-4 rounded-full bg-gradient-to-r from-indigo-600 via-indigo-500 to-emerald-500 text-white font-extrabold text-xs flex items-center justify-center space-x-2 shadow-lg shadow-indigo-600/30 whitespace-nowrap active:scale-95"
            >
              <Sparkles className="w-4 h-4 text-emerald-200 shrink-0" />
              <span className="whitespace-nowrap">Apply for Free 45-Pt Growth Audit</span>
              <ArrowRight className="w-4 h-4 ml-1 shrink-0" />
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};
