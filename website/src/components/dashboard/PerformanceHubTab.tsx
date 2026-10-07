import React, { useState } from 'react';
import { 
  BarChart2, DollarSign, ExternalLink, X, TrendingUp, Sparkles, CheckCircle2 
} from 'lucide-react';
import type { Client } from '../../types';

interface PerformanceHubTabProps {
  clients: Client[];
  onUpdateClient: (client: Client) => void;
  onOpenCreateInvoiceForClient: (clientName: string, clientEmail: string) => void;
}

export const PerformanceHubTab: React.FC<PerformanceHubTabProps> = ({
  clients,
  onUpdateClient,
  onOpenCreateInvoiceForClient,
}) => {
  const [editingClient, setEditingClient] = useState<Client | null>(null);

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingClient) return;
    onUpdateClient(editingClient);
    setEditingClient(null);
  };

  return (
    <div className="space-y-8">
      {/* Header Info Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl transition-colors">
        <div>
          <div className="flex items-center space-x-2 mb-1">
            <span className="text-xs uppercase font-extrabold tracking-wider text-indigo-600 dark:text-indigo-400 font-mono">
              Algorithmic Monitoring
            </span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white flex items-center space-x-3 font-display">
            <BarChart2 className="w-7 h-7 text-indigo-600 dark:text-indigo-400" />
            <span>Multi-Brand Ad Performance Hub</span>
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-2 max-w-2xl leading-relaxed">
            Real-time tracking of Meta ASC vs. Google PMax budget allocation, blended MER pacing, and high-converting UGC creative angles.
          </p>
        </div>
      </div>

      {/* Client Performance Cards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {clients.map((client) => {
          const isOverperforming = client.blendedMER >= client.targetROAS;
          const metaPercent = Math.round((client.metaSpend / (client.currentSpend || 1)) * 100);
          const googlePercent = 100 - metaPercent;

          return (
            <div
              key={client.id}
              className="p-6 sm:p-7 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-indigo-500/50 transition-all duration-300 shadow-lg hover:shadow-xl flex flex-col justify-between space-y-6 group"
            >
              <div>
                {/* Brand Header */}
                <div className="flex items-start justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
                  <div>
                    <div className="flex items-center space-x-2">
                      <h4 className="text-lg font-bold text-slate-900 dark:text-white font-display">{client.brandName}</h4>
                      <a
                        href={client.websiteUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                        title="Visit store"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </div>
                    <span className="text-xs text-slate-500 dark:text-slate-400">Partner since {client.joinedDate}</span>
                  </div>

                  <span
                    className={`text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-full border ${
                      isOverperforming
                        ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20'
                        : 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20'
                    }`}
                  >
                    {isOverperforming ? 'Scaling' : 'Optimizing'}
                  </span>
                </div>

                {/* Primary Numbers */}
                <div className="grid grid-cols-2 gap-3 my-5">
                  <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200/80 dark:border-slate-800/80">
                    <span className="text-[10px] uppercase tracking-wider text-slate-500 dark:text-slate-400 block font-semibold">
                      Monthly Spend
                    </span>
                    <span className="text-xl font-extrabold text-slate-900 dark:text-white font-mono mt-1 block">
                      ${client.currentSpend.toLocaleString()}
                    </span>
                    <span className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5 block font-medium">
                      Meta {metaPercent}% • Google {googlePercent}%
                    </span>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200/80 dark:border-slate-800/80">
                    <span className="text-[10px] uppercase tracking-wider text-slate-500 dark:text-slate-400 block font-semibold">
                      Store Net Rev
                    </span>
                    <span className="text-xl font-extrabold text-slate-900 dark:text-white font-mono mt-1 block">
                      ${client.currentRevenue.toLocaleString()}
                    </span>
                    <div className="flex items-center space-x-1.5 mt-0.5">
                      <span className="text-[10px] text-slate-500 dark:text-slate-400">MER:</span>
                      <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 font-mono">
                        {client.blendedMER.toFixed(2)}x
                      </span>
                      <span className="text-[10px] text-slate-400 dark:text-slate-500 font-mono">
                        (Goal: {client.targetROAS.toFixed(1)}x)
                      </span>
                    </div>
                  </div>
                </div>

                {/* Spend Breakdown Bar */}
                <div className="space-y-1.5 mb-5">
                  <div className="flex justify-between text-xs text-slate-600 dark:text-slate-400 font-medium">
                    <span>Meta: ${client.metaSpend.toLocaleString()}</span>
                    <span>Google: ${client.googleSpend.toLocaleString()}</span>
                  </div>
                  <div className="w-full h-2.5 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden flex">
                    <div 
                      className="bg-indigo-600 h-full transition-all duration-500" 
                      style={{ width: `${metaPercent}%` }} 
                      title={`Meta ${metaPercent}%`} 
                    />
                    <div 
                      className="bg-emerald-500 h-full transition-all duration-500" 
                      style={{ width: `${googlePercent}%` }} 
                      title={`Google ${googlePercent}%`} 
                    />
                  </div>
                </div>

                {/* Winning Angle */}
                <div className="p-4 rounded-2xl bg-indigo-50/50 dark:bg-indigo-950/20 border border-indigo-200/60 dark:border-indigo-900/40 text-xs">
                  <span className="text-[10px] uppercase font-extrabold tracking-wider text-indigo-600 dark:text-indigo-400 block mb-1">
                    Top Converting Creative Angle:
                  </span>
                  <p className="text-slate-700 dark:text-slate-300 italic font-medium leading-relaxed">
                    "{client.topCreativeAngle}"
                  </p>
                </div>
              </div>

              {/* Card Actions */}
              <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <button
                  onClick={() => setEditingClient(client)}
                  className="text-xs font-semibold text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white px-3.5 py-1.5 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                >
                  Adjust Metrics
                </button>

                <button
                  onClick={() => onOpenCreateInvoiceForClient(client.brandName, client.email)}
                  className="inline-flex items-center space-x-1.5 text-xs font-bold px-4 py-2 rounded-full bg-indigo-600 hover:bg-indigo-500 text-white shadow-md shadow-indigo-600/20 transition-all active:scale-95"
                >
                  <DollarSign className="w-3.5 h-3.5" />
                  <span>Bill Client</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Edit Client Modal */}
      {editingClient && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="relative w-full max-w-md rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl p-6 sm:p-8 space-y-6 text-slate-900 dark:text-white animate-in fade-in zoom-in-95 duration-200">
            <button
              onClick={() => setEditingClient(null)}
              className="absolute top-5 right-5 text-slate-400 hover:text-slate-700 dark:hover:text-white p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div>
              <span className="text-[10px] uppercase font-bold tracking-wider text-indigo-600 dark:text-indigo-400 font-mono">
                Performance Calibration
              </span>
              <h3 className="text-xl font-bold font-display mt-0.5">
                Update Metrics for {editingClient.brandName}
              </h3>
            </div>

            <form onSubmit={handleSaveEdit} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">
                  Meta Ad Spend ($)
                </label>
                <input
                  type="number"
                  value={editingClient.metaSpend}
                  onChange={(e) => {
                    const m = Number(e.target.value);
                    setEditingClient({
                      ...editingClient,
                      metaSpend: m,
                      currentSpend: m + editingClient.googleSpend,
                      blendedMER: parseFloat(((editingClient.currentRevenue) / (m + editingClient.googleSpend || 1)).toFixed(2)),
                    });
                  }}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white font-mono outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">
                  Google Ad Spend ($)
                </label>
                <input
                  type="number"
                  value={editingClient.googleSpend}
                  onChange={(e) => {
                    const g = Number(e.target.value);
                    setEditingClient({
                      ...editingClient,
                      googleSpend: g,
                      currentSpend: editingClient.metaSpend + g,
                      blendedMER: parseFloat(((editingClient.currentRevenue) / (editingClient.metaSpend + g || 1)).toFixed(2)),
                    });
                  }}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white font-mono outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">
                  Total Store Net Revenue ($)
                </label>
                <input
                  type="number"
                  value={editingClient.currentRevenue}
                  onChange={(e) => {
                    const rev = Number(e.target.value);
                    setEditingClient({
                      ...editingClient,
                      currentRevenue: rev,
                      blendedMER: parseFloat((rev / (editingClient.currentSpend || 1)).toFixed(2)),
                    });
                  }}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white font-mono outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">
                  Target ROAS / MER Goal (x)
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={editingClient.targetROAS}
                  onChange={(e) => setEditingClient({ ...editingClient, targetROAS: Number(e.target.value) })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white font-mono outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">
                  Top Performing Creative Angle
                </label>
                <input
                  type="text"
                  value={editingClient.topCreativeAngle}
                  onChange={(e) => setEditingClient({ ...editingClient, topCreativeAngle: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold transition-all shadow-lg shadow-indigo-600/25 active:scale-95"
              >
                Save & Recalculate
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
