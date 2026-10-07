import React, { useState } from 'react';
import { 
  Plus, Search, ArrowRight, ArrowLeft, 
  ExternalLink, Mail, Phone, DollarSign, CheckCircle2, Trash2, X 
} from 'lucide-react';
import type { Lead, PipelineStage } from '../../types';

interface CrmPipelineTabProps {
  leads: Lead[];
  onUpdateLeadStage: (leadId: string, newStage: PipelineStage) => void;
  onAddLead: (lead: Lead) => void;
  onDeleteLead: (leadId: string) => void;
  onAddNoteToLead: (leadId: string, note: string) => void;
  onConvertLeadToClient: (lead: Lead) => void;
  onOpenCreateInvoiceForClient: (clientName: string, clientEmail: string) => void;
}

const STAGES: { id: PipelineStage; label: string; color: string; badge: string }[] = [
  { id: 'new_lead', label: '1. New Leads', color: 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900', badge: 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300' },
  { id: 'audit_scheduled', label: '2. Audit Scheduled', color: 'border-blue-500/30 bg-blue-50/50 dark:bg-blue-950/20', badge: 'bg-blue-500/15 text-blue-600 dark:text-blue-400' },
  { id: 'proposal_sent', label: '3. Proposal Sent', color: 'border-amber-500/30 bg-amber-50/50 dark:bg-amber-950/20', badge: 'bg-amber-500/15 text-amber-600 dark:text-amber-400' },
  { id: 'active_client', label: '4. Active Retainer', color: 'border-emerald-500/30 bg-emerald-50/50 dark:bg-emerald-950/20', badge: 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400' },
  { id: 'churned', label: '5. Archived / Lost', color: 'border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/50', badge: 'bg-slate-200 dark:bg-slate-800 text-slate-500' },
];

export const CrmPipelineTab: React.FC<CrmPipelineTabProps> = ({
  leads,
  onUpdateLeadStage,
  onAddLead,
  onDeleteLead,
  onAddNoteToLead,
  onConvertLeadToClient,
  onOpenCreateInvoiceForClient,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [isAddLeadOpen, setIsAddLeadOpen] = useState(false);
  const [newNote, setNewNote] = useState('');
  const [mobileActiveStage, setMobileActiveStage] = useState<PipelineStage | 'all'>('all');

  // Form states for manual add
  const [newBrandName, setNewBrandName] = useState('');
  const [newWebsite, setNewWebsite] = useState('');
  const [newContact, setNewContact] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const [newSpend, setNewSpend] = useState<number>(20000);
  const [newCategory, setNewCategory] = useState('Apparel & Fashion');
  const [newBottleneck, setNewBottleneck] = useState('');

  const filteredLeads = leads.filter((lead) =>
    lead.brandName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    lead.contactName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    lead.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleManualAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newBrandName || !newEmail || !newContact) return;

    const lead: Lead = {
      id: `lead-${Date.now()}`,
      brandName: newBrandName,
      websiteUrl: newWebsite.startsWith('http') ? newWebsite : `https://${newWebsite || newBrandName.toLowerCase() + '.com'}`,
      contactName: newContact,
      email: newEmail,
      phone: newPhone,
      monthlySpend: Number(newSpend),
      category: newCategory,
      primaryBottleneck: newBottleneck || 'High Meta CPA; seeking 90-day scale sprint',
      stage: 'new_lead',
      notes: [`Manual entry created on ${new Date().toLocaleDateString()}`],
      createdAt: new Date().toISOString().slice(0, 10),
    };

    onAddLead(lead);
    setIsAddLeadOpen(false);
    setNewBrandName('');
    setNewWebsite('');
    setNewContact('');
    setNewEmail('');
    setNewPhone('');
    setNewSpend(20000);
    setNewBottleneck('');
  };

  const handleAddNote = () => {
    if (!selectedLead || !newNote.trim()) return;
    onAddNoteToLead(selectedLead.id, newNote.trim());
    setSelectedLead({
      ...selectedLead,
      notes: [...selectedLead.notes, `${new Date().toLocaleDateString()}: ${newNote.trim()}`],
    });
    setNewNote('');
  };

  return (
    <div className="space-y-6">
      {/* Search & Actions Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search brand, founder, or niche..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:border-indigo-500 outline-none transition-all shadow-sm"
          />
        </div>

        <button
          onClick={() => setIsAddLeadOpen(true)}
          className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 text-xs font-bold px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/30 transition-all active:scale-95"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Lead</span>
        </button>
      </div>

      {/* Mobile-First Stage Selector Chips */}
      <div className="md:hidden flex space-x-1.5 overflow-x-auto pb-2 -mx-2 px-2">
        <button
          onClick={() => setMobileActiveStage('all')}
          className={`px-3.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
            mobileActiveStage === 'all'
              ? 'bg-indigo-600 text-white shadow-md'
              : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800'
          }`}
        >
          All Stages ({filteredLeads.length})
        </button>
        {STAGES.map((s) => {
          const count = filteredLeads.filter((l) => l.stage === s.id).length;
          return (
            <button
              key={s.id}
              onClick={() => setMobileActiveStage(s.id)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
                mobileActiveStage === s.id
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800'
              }`}
            >
              {s.label} ({count})
            </button>
          );
        })}
      </div>

      {/* 5-Column Kanban Board */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-start">
        {STAGES.filter((col) => mobileActiveStage === 'all' || col.id === mobileActiveStage).map((col) => {
          const colLeads = filteredLeads.filter((l) => l.stage === col.id);
          return (
            <div
              key={col.id}
              className={`rounded-3xl border p-4 flex flex-col min-h-[500px] shadow-sm ${col.color}`}
            >
              {/* Column Header */}
              <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800 mb-3">
                <span className="text-xs font-bold text-slate-900 dark:text-white tracking-tight font-display">{col.label}</span>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${col.badge}`}>
                  {colLeads.length}
                </span>
              </div>

              {/* Lead Cards */}
              <div className="space-y-3 flex-1 overflow-y-auto">
                {colLeads.map((lead) => (
                  <div
                    key={lead.id}
                    onClick={() => setSelectedLead(lead)}
                    className="p-4 rounded-2xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800/80 hover:border-indigo-500/50 cursor-pointer shadow-sm hover:shadow-md transition-all group"
                  >
                    <div className="flex items-start justify-between">
                      <div className="font-bold text-xs text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                        {lead.brandName}
                      </div>
                      <span className="text-[10px] font-mono font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-md">
                        ${lead.monthlySpend >= 1000 ? `${Math.round(lead.monthlySpend / 1000)}k` : lead.monthlySpend}/mo
                      </span>
                    </div>

                    <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 flex items-center space-x-1">
                      <span>{lead.contactName}</span>
                      <span>•</span>
                      <span className="truncate">{lead.category}</span>
                    </div>

                    <p className="text-[11px] text-slate-600 dark:text-slate-400 mt-2 line-clamp-2 leading-relaxed bg-slate-50 dark:bg-slate-900/60 p-2 rounded-xl border border-slate-100 dark:border-slate-800/60">
                      {lead.primaryBottleneck}
                    </p>

                    {/* Quick Move Buttons */}
                    <div className="mt-3 pt-2.5 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-[10px]" onClick={(e) => e.stopPropagation()}>
                      <span className="text-slate-400">Move:</span>
                      <div className="flex space-x-1">
                        {col.id !== 'new_lead' && (
                          <button
                            onClick={() => {
                              const prevIdx = STAGES.findIndex((s) => s.id === col.id) - 1;
                              if (prevIdx >= 0) onUpdateLeadStage(lead.id, STAGES[prevIdx].id);
                            }}
                            className="p-1 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300"
                            title="Move back"
                          >
                            <ArrowLeft className="w-3 h-3" />
                          </button>
                        )}
                        {col.id !== 'churned' && (
                          <button
                            onClick={() => {
                              const nextIdx = STAGES.findIndex((s) => s.id === col.id) + 1;
                              if (nextIdx < STAGES.length) onUpdateLeadStage(lead.id, STAGES[nextIdx].id);
                            }}
                            className="p-1 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white"
                            title="Advance stage"
                          >
                            <ArrowRight className="w-3 h-3" />
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}

                {colLeads.length === 0 && (
                  <div className="h-32 flex items-center justify-center border border-dashed border-slate-200 dark:border-slate-800 rounded-2xl text-[11px] text-slate-400">
                    No leads in stage
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Lead Detail Drawer / Modal */}
      {selectedLead && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 dark:bg-black/85 backdrop-blur-md overflow-y-auto">
          <div className="relative w-full max-w-xl rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl p-6 sm:p-8 space-y-6 text-slate-900 dark:text-slate-100 max-h-[90vh] overflow-y-auto my-8">
            <button
              onClick={() => setSelectedLead(null)}
              className="absolute top-5 right-5 text-slate-400 hover:text-slate-900 dark:hover:text-white p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header */}
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white font-display">{selectedLead.brandName}</h3>
                <a
                  href={selectedLead.websiteUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-indigo-600 dark:text-indigo-400 hover:underline"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Lead ID: {selectedLead.id} • Created {selectedLead.createdAt}</p>
            </div>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs">
              <div>
                <span className="text-slate-500 dark:text-slate-400 block">Contact Name</span>
                <span className="font-bold text-slate-900 dark:text-white mt-0.5 block">{selectedLead.contactName}</span>
              </div>
              <div>
                <span className="text-slate-500 dark:text-slate-400 block">Monthly Spend</span>
                <span className="font-bold text-emerald-600 dark:text-emerald-400 mt-0.5 block font-mono">
                  ${selectedLead.monthlySpend.toLocaleString()}/mo
                </span>
              </div>
              <div>
                <span className="text-slate-500 dark:text-slate-400 block">Category</span>
                <span className="font-bold text-slate-900 dark:text-white mt-0.5 block">{selectedLead.category}</span>
              </div>
              <div className="col-span-2 sm:col-span-3 pt-2.5 border-t border-slate-200 dark:border-slate-800 flex items-center space-x-4">
                <div className="flex items-center space-x-1.5 text-slate-700 dark:text-slate-300">
                  <Mail className="w-3.5 h-3.5 text-indigo-500" />
                  <a href={`mailto:${selectedLead.email}`} className="hover:underline">{selectedLead.email}</a>
                </div>
                {selectedLead.phone && (
                  <div className="flex items-center space-x-1.5 text-slate-700 dark:text-slate-300">
                    <Phone className="w-3.5 h-3.5 text-emerald-500" />
                    <span>{selectedLead.phone}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Stage Selector */}
            <div>
              <label className="block text-xs font-bold text-slate-900 dark:text-white mb-2 uppercase tracking-wider font-display">
                Current Pipeline Stage
              </label>
              <div className="flex flex-wrap gap-2">
                {STAGES.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => {
                      onUpdateLeadStage(selectedLead.id, s.id);
                      setSelectedLead({ ...selectedLead, stage: s.id });
                    }}
                    className={`text-xs font-semibold px-3.5 py-1.5 rounded-xl border transition-all ${
                      selectedLead.stage === s.id
                        ? 'bg-indigo-600 border-indigo-600 text-white shadow-sm'
                        : 'bg-white dark:bg-slate-950 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Primary Bottleneck */}
            <div>
              <span className="block text-xs font-bold text-slate-900 dark:text-white mb-1.5 uppercase tracking-wider font-display">
                Reported Bottleneck / Diagnostic Goal
              </span>
              <p className="text-xs text-slate-700 dark:text-slate-300 bg-slate-50 dark:bg-slate-950 p-3 rounded-2xl border border-slate-200 dark:border-slate-800 leading-relaxed">
                {selectedLead.primaryBottleneck}
              </p>
            </div>

            {/* Activity Notes Log */}
            <div>
              <span className="block text-xs font-bold text-slate-900 dark:text-white mb-2 uppercase tracking-wider font-display">
                Activity & Call Notes ({selectedLead.notes.length})
              </span>
              <div className="space-y-2 mb-3 max-h-40 overflow-y-auto">
                {selectedLead.notes.map((note, idx) => (
                  <div key={idx} className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs text-slate-700 dark:text-slate-300">
                    {note}
                  </div>
                ))}
              </div>

              <div className="flex space-x-2">
                <input
                  type="text"
                  placeholder="Log discovery call note, audit feedback, or next step..."
                  value={newNote}
                  onChange={(e) => setNewNote(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handleAddNote();
                  }}
                  className="flex-1 px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:border-indigo-500 outline-none"
                />
                <button
                  onClick={handleAddNote}
                  className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-xs font-bold text-white transition-colors"
                >
                  Log Note
                </button>
              </div>
            </div>

            {/* Actions Bar */}
            <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3">
              <button
                onClick={() => {
                  if (confirm(`Delete lead "${selectedLead.brandName}"?`)) {
                    onDeleteLead(selectedLead.id);
                    setSelectedLead(null);
                  }
                }}
                className="text-xs text-rose-500 hover:underline flex items-center space-x-1"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Delete Lead</span>
              </button>

              <div className="flex items-center space-x-2">
                <button
                  onClick={() => {
                    onConvertLeadToClient(selectedLead);
                    setSelectedLead(null);
                  }}
                  className="inline-flex items-center space-x-1.5 text-xs font-bold px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white transition-colors shadow-sm"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Convert to Client</span>
                </button>

                <button
                  onClick={() => {
                    onOpenCreateInvoiceForClient(selectedLead.brandName, selectedLead.email);
                    setSelectedLead(null);
                  }}
                  className="inline-flex items-center space-x-1.5 text-xs font-bold px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white transition-colors shadow-sm"
                >
                  <DollarSign className="w-4 h-4" />
                  <span>Generate Invoice</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Lead Modal */}
      {isAddLeadOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 dark:bg-black/85 backdrop-blur-md overflow-y-auto">
          <div className="relative w-full max-w-md rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl p-6 sm:p-8 space-y-5 text-slate-900 dark:text-slate-100 my-8">
            <button
              onClick={() => setIsAddLeadOpen(false)}
              className="absolute top-5 right-5 text-slate-400 hover:text-slate-900 dark:hover:text-white p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-xl font-bold text-slate-900 dark:text-white font-display">Add Opportunity to CRM</h3>

            <form onSubmit={handleManualAddSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Brand Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Zenith Athletics"
                  value={newBrandName}
                  onChange={(e) => setNewBrandName(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs text-slate-900 dark:text-white outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Website URL</label>
                <input
                  type="text"
                  placeholder="e.g. https://zenithfit.com"
                  value={newWebsite}
                  onChange={(e) => setNewWebsite(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs text-slate-900 dark:text-white outline-none focus:border-indigo-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Founder / Contact *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Liam Scott"
                    value={newContact}
                    onChange={(e) => setNewContact(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs text-slate-900 dark:text-white outline-none focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Email *</label>
                  <input
                    type="email"
                    required
                    placeholder="liam@zenithfit.com"
                    value={newEmail}
                    onChange={(e) => setNewEmail(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs text-slate-900 dark:text-white outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Monthly Spend ($)</label>
                  <input
                    type="number"
                    min="1000"
                    step="1000"
                    value={newSpend}
                    onChange={(e) => setNewSpend(Number(e.target.value))}
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs text-slate-900 dark:text-white font-mono outline-none focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Category</label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs text-slate-900 dark:text-white outline-none focus:border-indigo-500"
                  >
                    <option>Apparel & Fashion</option>
                    <option>Beauty & Skincare</option>
                    <option>Health & Supplements</option>
                    <option>Home & Living</option>
                    <option>Pet Products</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Primary Growth Bottleneck</label>
                <input
                  type="text"
                  placeholder="e.g. ROAS dropped to 1.7x; need UGC sandbox testing"
                  value={newBottleneck}
                  onChange={(e) => setNewBottleneck(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs text-slate-900 dark:text-white outline-none focus:border-indigo-500"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-xs font-bold text-white transition-colors shadow-md shadow-indigo-600/25"
              >
                Save Lead to CRM
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
