import React from 'react';
import { 
  TrendingUp, Users, CreditCard, DollarSign, ArrowUpRight, 
  Clock, Plus, Target, BarChart3 
} from 'lucide-react';
import type { AgencyData } from '../../types';

interface OverviewTabProps {
  agencyData: AgencyData;
  onNavigateToTab: (tab: 'crm' | 'billing' | 'performance') => void;
  onOpenCreateInvoice: () => void;
  onOpenAddLead: () => void;
}

export const OverviewTab: React.FC<OverviewTabProps> = ({
  agencyData,
  onNavigateToTab,
  onOpenCreateInvoice,
  onOpenAddLead,
}) => {
  const activeClients = agencyData.clients.filter((c) => c.status === 'active');
  const baseMRR = activeClients.reduce((sum, c) => sum + c.monthlyRetainer, 0);
  const totalManagedSpend = activeClients.reduce((sum, c) => sum + c.currentSpend, 0);
  const totalClientRevenue = activeClients.reduce((sum, c) => sum + c.currentRevenue, 0);
  
  const avgMER = activeClients.length > 0 
    ? (activeClients.reduce((sum, c) => sum + c.blendedMER, 0) / activeClients.length).toFixed(2)
    : '0.00';

  const pendingInvoices = agencyData.invoices.filter((i) => i.status === 'sent');
  const pendingReceivables = pendingInvoices.reduce((sum, i) => sum + i.totalAmount, 0);
  const paidInvoicesTotal = agencyData.invoices.filter((i) => i.status === 'paid').reduce((sum, i) => sum + i.totalAmount, 0);

  const stageCounts = {
    new_lead: agencyData.leads.filter((l) => l.stage === 'new_lead').length,
    audit_scheduled: agencyData.leads.filter((l) => l.stage === 'audit_scheduled').length,
    proposal_sent: agencyData.leads.filter((l) => l.stage === 'proposal_sent').length,
    active_client: agencyData.leads.filter((l) => l.stage === 'active_client').length,
  };

  return (
    <div className="space-y-8">
      {/* Top Banner / Welcome & Quick Action Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl">
        <div>
          <div className="flex items-center space-x-2 mb-1">
            <span className="text-xs uppercase font-extrabold tracking-wider text-indigo-600 dark:text-indigo-400 font-mono">
              Executive Command
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight font-display">
            Agency Operations Dashboard
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1">
            Real-time client ad spend pacing, sales pipeline, and cash flow tracking.
          </p>
        </div>

        <div className="flex items-center space-x-3 shrink-0">
          <button
            onClick={onOpenAddLead}
            className="inline-flex items-center space-x-2 text-xs font-bold px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700 transition-all shadow-sm active:scale-95"
          >
            <Plus className="w-4 h-4 text-emerald-500" />
            <span>Add Lead</span>
          </button>

          <button
            onClick={onOpenCreateInvoice}
            className="inline-flex items-center space-x-2 text-xs font-bold px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/30 transition-all active:scale-95"
          >
            <CreditCard className="w-4 h-4 text-white" />
            <span>Create Invoice</span>
          </button>
        </div>
      </div>

      {/* KPI 5-Card Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {/* Card 1: MRR */}
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-lg">
          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mb-2">
            <span>Base Retainer MRR</span>
            <DollarSign className="w-4 h-4 text-indigo-500" />
          </div>
          <div className="text-2xl font-black text-slate-900 dark:text-white font-mono">
            ${baseMRR.toLocaleString()}
          </div>
          <div className="text-[11px] text-emerald-600 dark:text-emerald-400 font-bold flex items-center space-x-1 mt-1">
            <span>+{activeClients.length} active retainer brands</span>
          </div>
        </div>

        {/* Card 2: Managed Ad Spend */}
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-lg">
          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mb-2">
            <span>Managed Spend / Mo</span>
            <TrendingUp className="w-4 h-4 text-blue-500" />
          </div>
          <div className="text-2xl font-black text-slate-900 dark:text-white font-mono">
            ${totalManagedSpend.toLocaleString()}
          </div>
          <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
            Meta + Google combined
          </div>
        </div>

        {/* Card 3: Portfolio MER */}
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-lg">
          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mb-2">
            <span>Portfolio Avg. MER</span>
            <Target className="w-4 h-4 text-emerald-500" />
          </div>
          <div className="text-2xl font-black text-emerald-600 dark:text-emerald-400 font-mono">
            {avgMER}x
          </div>
          <div className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold mt-1">
            Target exceeded (&gt;3.5x goal)
          </div>
        </div>

        {/* Card 4: Client Revenue */}
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-lg">
          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mb-2">
            <span>Generated Store Rev</span>
            <BarChart3 className="w-4 h-4 text-purple-500" />
          </div>
          <div className="text-2xl font-black text-slate-900 dark:text-white font-mono">
            ${totalClientRevenue.toLocaleString()}
          </div>
          <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
            Current billing cycle
          </div>
        </div>

        {/* Card 5: Outstanding Receivables */}
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-lg">
          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mb-2">
            <span>Pending Receivables</span>
            <Clock className="w-4 h-4 text-amber-500" />
          </div>
          <div className="text-2xl font-black text-amber-600 dark:text-amber-400 font-mono">
            ${pendingReceivables.toLocaleString()}
          </div>
          <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
            {pendingInvoices.length} invoices sent (Net-7)
          </div>
        </div>
      </div>

      {/* Pipeline Snapshot & Quick Review */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: CRM Pipeline Status */}
        <div className="lg:col-span-7 p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center space-x-2 font-display">
                <Users className="w-4 h-4 text-indigo-500" />
                <span>Sales & Client Acquisition Pipeline</span>
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Leads progressing toward 90-day scale sprints</p>
            </div>
            <button
              onClick={() => onNavigateToTab('crm')}
              className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center space-x-1"
            >
              <span>View Full CRM</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-center">
              <span className="text-[11px] uppercase tracking-wider text-slate-500 dark:text-slate-400 font-bold block">New Leads</span>
              <span className="text-2xl font-black text-slate-900 dark:text-white mt-1 block font-mono">{stageCounts.new_lead}</span>
            </div>
            <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-center">
              <span className="text-[11px] uppercase tracking-wider text-blue-600 dark:text-blue-400 font-bold block">Audit Booked</span>
              <span className="text-2xl font-black text-blue-600 dark:text-blue-400 mt-1 block font-mono">{stageCounts.audit_scheduled}</span>
            </div>
            <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-center">
              <span className="text-[11px] uppercase tracking-wider text-amber-600 dark:text-amber-400 font-bold block">Proposal Sent</span>
              <span className="text-2xl font-black text-amber-600 dark:text-amber-400 mt-1 block font-mono">{stageCounts.proposal_sent}</span>
            </div>
            <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-center">
              <span className="text-[11px] uppercase tracking-wider text-emerald-600 dark:text-emerald-400 font-bold block">Active Retainer</span>
              <span className="text-2xl font-black text-emerald-600 dark:text-emerald-400 mt-1 block font-mono">{stageCounts.active_client}</span>
            </div>
          </div>

          {/* Quick list of urgent leads */}
          <div className="space-y-3 pt-2">
            <span className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider block font-display">
              Recent Pipeline Opportunities
            </span>
            {agencyData.leads.slice(0, 3).map((lead) => (
              <div
                key={lead.id}
                className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950/70 border border-slate-200 dark:border-slate-800/80 hover:border-indigo-500/50 flex items-center justify-between transition-colors"
              >
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-bold text-slate-900 dark:text-white">{lead.brandName}</span>
                    <span className="text-[10px] bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 px-2 py-0.5 rounded-full font-mono">
                      ${lead.monthlySpend.toLocaleString()}/mo spend
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 truncate max-w-sm">{lead.primaryBottleneck}</p>
                </div>

                <div className="flex items-center space-x-2">
                  <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20">
                    {lead.stage.replace('_', ' ')}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Cash Flow & Invoicing Summary */}
        <div className="lg:col-span-5 p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center space-x-2 font-display">
                <CreditCard className="w-4 h-4 text-emerald-500" />
                <span>Invoicing & Cash Flow</span>
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Retainers & performance fee collections</p>
            </div>
            <button
              onClick={() => onNavigateToTab('billing')}
              className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center space-x-1"
            >
              <span>View Invoices</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-3">
            <div className="flex justify-between text-xs">
              <span className="text-slate-500 dark:text-slate-400">Total Collected (Paid):</span>
              <span className="font-bold text-emerald-600 dark:text-emerald-400 font-mono">${paidInvoicesTotal.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-slate-500 dark:text-slate-400">Awaiting Settlement:</span>
              <span className="font-bold text-amber-600 dark:text-amber-400 font-mono">${pendingReceivables.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-xs pt-2 border-t border-slate-200 dark:border-slate-800 font-semibold">
              <span className="text-slate-900 dark:text-white">Total Invoiced YTD:</span>
              <span className="text-slate-900 dark:text-white font-mono">${(paidInvoicesTotal + pendingReceivables).toLocaleString()}</span>
            </div>
          </div>

          {/* Quick list of invoices */}
          <div className="space-y-2.5">
            <span className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider block font-display">Latest Invoices</span>
            {agencyData.invoices.slice(0, 3).map((inv) => (
              <div
                key={inv.id}
                className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-950/70 border border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs"
              >
                <div>
                  <div className="font-bold text-slate-900 dark:text-white">{inv.clientName}</div>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400 font-mono">{inv.invoiceNumber} • Due {inv.dueDate}</div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-slate-900 dark:text-white font-mono">${inv.totalAmount.toLocaleString()}</div>
                  <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border ${
                    inv.status === 'paid' ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30' : 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30'
                  }`}>
                    {inv.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
