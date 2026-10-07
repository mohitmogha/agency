import React from 'react';
import { 
  LayoutDashboard, Users, CreditCard, BarChart2, 
  Download, RotateCcw, ArrowLeft, TrendingUp, Sun, Moon, LogOut, ShieldCheck, Key 
} from 'lucide-react';
import type { AgencyData } from '../../types';
import type { ThemeMode } from '../../lib/theme';
import { getAuthenticatedStaffUser } from '../../lib/auth';

export type DashboardTab = 'overview' | 'crm' | 'billing' | 'performance' | 'admin';

interface DashboardHeaderProps {
  currentTab: DashboardTab;
  onSelectTab: (tab: DashboardTab) => void;
  onBackToPublicSite: () => void;
  onSignOut: () => void;
  agencyData: AgencyData;
  onExportData: () => void;
  onResetData: () => void;
  theme: ThemeMode;
  onToggleTheme: () => void;
}

export const DashboardHeader: React.FC<DashboardHeaderProps> = ({
  currentTab,
  onSelectTab,
  onBackToPublicSite,
  onSignOut,
  agencyData,
  onExportData,
  onResetData,
  theme,
  onToggleTheme,
}) => {
  const activeClientsCount = agencyData.clients.filter((c) => c.status === 'active').length;
  const activeLeadsCount = agencyData.leads.filter((l) => l.stage !== 'churned').length;
  const currentUser = getAuthenticatedStaffUser();

  return (
    <header className="border-b border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-[#080C14]/95 backdrop-blur-xl sticky top-0 z-40 shadow-sm transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-16 flex items-center justify-between gap-3">
          {/* Left: Brand & Return */}
          <div className="flex items-center space-x-3 sm:space-x-4 shrink-0">
            <button
              onClick={onBackToPublicSite}
              className="inline-flex items-center space-x-1.5 text-xs font-bold px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-900 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 transition-all shadow-sm whitespace-nowrap shrink-0"
            >
              <ArrowLeft className="w-3.5 h-3.5 shrink-0" />
              <span className="whitespace-nowrap">Public Site</span>
            </button>

            <div className="hidden sm:flex items-center space-x-2.5 border-l border-slate-200 dark:border-slate-800 pl-4 shrink-0">
              <div className="w-7 h-7 rounded-lg bg-indigo-600 flex items-center justify-center text-white shadow-sm shrink-0">
                <TrendingUp className="w-4 h-4 shrink-0" />
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-sm font-bold text-slate-900 dark:text-white tracking-tight font-display whitespace-nowrap">
                  Agency Command Center
                </span>
                <span className="text-[10px] bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded-full font-mono font-bold whitespace-nowrap">
                  {currentUser?.role ? currentUser.role.toUpperCase() : 'STAFF'}
                </span>
              </div>
            </div>
          </div>

          {/* Right: Data actions, Theme Toggle, and Sign Out */}
          <div className="flex items-center space-x-2 shrink-0">
            <button
              onClick={onToggleTheme}
              className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-900 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 transition-all shadow-sm shrink-0"
              title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} mode`}
            >
              {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400 shrink-0" /> : <Moon className="w-4 h-4 text-indigo-600 shrink-0" />}
            </button>

            <button
              onClick={onExportData}
              className="inline-flex items-center space-x-1.5 text-xs font-bold px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-900 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 transition-all shadow-sm whitespace-nowrap shrink-0"
              title="Download full JSON backup of leads, clients, and invoices"
            >
              <Download className="w-3.5 h-3.5 text-indigo-500 shrink-0" />
              <span className="hidden md:inline whitespace-nowrap">Backup</span>
            </button>

            <button
              onClick={() => {
                if (confirm('Reset agency demo database to default seed data?')) {
                  onResetData();
                }
              }}
              className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-900 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-slate-800 transition-all shadow-sm shrink-0"
              title="Reset data"
            >
              <RotateCcw className="w-3.5 h-3.5 shrink-0" />
            </button>

            {/* Lock / Sign Out Button */}
            <button
              onClick={onSignOut}
              className="inline-flex items-center space-x-1.5 text-xs font-bold px-3 py-2 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-600 dark:text-rose-400 border border-rose-500/20 transition-all shadow-sm whitespace-nowrap shrink-0"
              title="Sign out & Lock Command Center"
            >
              <LogOut className="w-3.5 h-3.5 shrink-0" />
              <span className="whitespace-nowrap">Sign Out</span>
            </button>
          </div>
        </div>

        {/* Tab Navigation (Single line horizontal scroll) */}
        <div className="flex space-x-1 sm:space-x-2 border-t border-slate-200 dark:border-slate-800/80 overflow-x-auto py-2">
          <button
            onClick={() => onSelectTab('overview')}
            className={`flex items-center space-x-2 py-2 px-3.5 text-xs font-bold rounded-xl transition-all whitespace-nowrap shrink-0 ${
              currentTab === 'overview'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/25'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-900'
            }`}
          >
            <LayoutDashboard className="w-4 h-4 shrink-0" />
            <span className="whitespace-nowrap">Overview</span>
          </button>

          <button
            onClick={() => onSelectTab('crm')}
            className={`flex items-center space-x-2 py-2 px-3.5 text-xs font-bold rounded-xl transition-all whitespace-nowrap shrink-0 ${
              currentTab === 'crm'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/25'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-900'
            }`}
          >
            <Users className="w-4 h-4 shrink-0" />
            <span className="whitespace-nowrap">CRM & Pipeline</span>
            <span className={`ml-1 text-[10px] px-1.5 py-0.2 rounded-full whitespace-nowrap ${
              currentTab === 'crm' ? 'bg-white/20 text-white' : 'bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
            }`}>
              {activeLeadsCount}
            </span>
          </button>

          <button
            onClick={() => onSelectTab('billing')}
            className={`flex items-center space-x-2 py-2 px-3.5 text-xs font-bold rounded-xl transition-all whitespace-nowrap shrink-0 ${
              currentTab === 'billing'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/25'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-900'
            }`}
          >
            <CreditCard className="w-4 h-4 shrink-0" />
            <span className="whitespace-nowrap">Billing & Invoices</span>
            <span className={`ml-1 text-[10px] px-1.5 py-0.2 rounded-full whitespace-nowrap ${
              currentTab === 'billing' ? 'bg-white/20 text-white' : 'bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
            }`}>
              {agencyData.invoices.length}
            </span>
          </button>

          <button
            onClick={() => onSelectTab('performance')}
            className={`flex items-center space-x-2 py-2 px-3.5 text-xs font-bold rounded-xl transition-all whitespace-nowrap shrink-0 ${
              currentTab === 'performance'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/25'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-900'
            }`}
          >
            <BarChart2 className="w-4 h-4 shrink-0" />
            <span className="whitespace-nowrap">Client Ad Performance</span>
            <span className="ml-1 text-[10px] px-1.5 py-0.2 rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 whitespace-nowrap">
              {activeClientsCount} active
            </span>
          </button>

          <button
            onClick={() => onSelectTab('admin')}
            className={`flex items-center space-x-2 py-2 px-3.5 text-xs font-bold rounded-xl transition-all whitespace-nowrap shrink-0 ${
              currentTab === 'admin'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/25'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-900'
            }`}
          >
            <ShieldCheck className="w-4 h-4 shrink-0 text-emerald-500" />
            <span className="whitespace-nowrap">Admin & Backend</span>
            <span className="ml-1 text-[10px] px-1.5 py-0.2 rounded-full bg-indigo-500/15 text-indigo-600 dark:text-indigo-400 font-mono font-bold whitespace-nowrap">
              RBAC
            </span>
          </button>
        </div>
      </div>
    </header>
  );
};
