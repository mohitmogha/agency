import React, { useState } from 'react';
import { 
  Plus, Printer, CheckCircle2, Clock, 
  DollarSign, Trash2, X, FileText, ArrowUpRight 
} from 'lucide-react';
import type { Invoice, InvoiceLineItem, InvoiceStatus, Client } from '../../types';

interface BillingTabProps {
  invoices: Invoice[];
  clients: Client[];
  onAddInvoice: (invoice: Invoice) => void;
  onUpdateInvoiceStatus: (invoiceId: string, status: InvoiceStatus) => void;
  onDeleteInvoice: (invoiceId: string) => void;
  prefillClientName?: string;
  prefillClientEmail?: string;
}

export const BillingTab: React.FC<BillingTabProps> = ({
  invoices,
  clients,
  onAddInvoice,
  onUpdateInvoiceStatus,
  onDeleteInvoice,
  prefillClientName,
  prefillClientEmail,
}) => {
  const [filter, setFilter] = useState<string>('all');
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [selectedInvoiceForPrint, setSelectedInvoiceForPrint] = useState<Invoice | null>(null);

  // Form states for Create Invoice
  const [selectedClientId, setSelectedClientId] = useState<string>(clients[0]?.id || 'custom');
  const [clientName, setClientName] = useState<string>(prefillClientName || clients[0]?.brandName || '');
  const [clientEmail, setClientEmail] = useState<string>(prefillClientEmail || clients[0]?.email || '');
  const [billingType, setBillingType] = useState<'fixed_retainer' | 'performance_hybrid' | 'one_time'>('performance_hybrid');
  const [baseRetainer, setBaseRetainer] = useState<number>(3500);
  const [spendManaged, setSpendManaged] = useState<number>(35000);
  const [taxPercent, setTaxPercent] = useState<number>(0);
  const [discountAmount, setDiscountAmount] = useState<number>(0);
  const [dueDate, setDueDate] = useState<string>(() => {
    const d = new Date();
    d.setDate(d.getDate() + 7);
    return d.toISOString().slice(0, 10);
  });

  const [lineItems, setLineItems] = useState<InvoiceLineItem[]>([
    {
      id: 'item-1',
      description: 'Omnichannel Growth Retainer (Meta ASC & Google PMax Management)',
      quantity: 1,
      rate: 3500,
      amount: 3500,
    },
    {
      id: 'item-2',
      description: 'Scale Incentive Bonus (6% on incremental ad spend above $20k baseline)',
      quantity: 1,
      rate: 900,
      amount: 900,
    },
  ]);

  const handleClientSelectChange = (cId: string) => {
    setSelectedClientId(cId);
    if (cId === 'custom') {
      setClientName('');
      setClientEmail('');
      return;
    }
    const found = clients.find((c) => c.id === cId);
    if (found) {
      setClientName(found.brandName);
      setClientEmail(found.email);
      setBaseRetainer(found.monthlyRetainer);
      setSpendManaged(found.currentSpend);

      const incrementalSpend = Math.max(0, found.currentSpend - found.spendBaseline);
      const bonus = Math.round(incrementalSpend * (found.performanceFeePercent / 100));

      setLineItems([
        {
          id: 'item-1',
          description: `Omnichannel Ad Management (Meta ASC + Google PMax) - ${new Date().toLocaleString('default', { month: 'long', year: 'numeric' })}`,
          quantity: 1,
          rate: found.monthlyRetainer,
          amount: found.monthlyRetainer,
        },
        ...(bonus > 0 ? [{
          id: 'item-2',
          description: `Performance Scale Incentive (${found.performanceFeePercent}% of $${incrementalSpend.toLocaleString()} spend above $${found.spendBaseline.toLocaleString()} @ ${found.blendedMER}x MER)`,
          quantity: 1,
          rate: bonus,
          amount: bonus,
        }] : []),
      ]);
    }
  };

  const handleAddLineItem = () => {
    setLineItems([
      ...lineItems,
      {
        id: `item-${Date.now()}`,
        description: 'Creative Studio UGC Batch (5 Modular Video Ads)',
        quantity: 1,
        rate: 1500,
        amount: 1500,
      },
    ]);
  };

  const handleUpdateLineItem = (id: string, field: keyof InvoiceLineItem, value: any) => {
    setLineItems(
      lineItems.map((item) => {
        if (item.id !== id) return item;
        const updated = { ...item, [field]: value };
        if (field === 'quantity' || field === 'rate') {
          updated.amount = (Number(updated.quantity) || 0) * (Number(updated.rate) || 0);
        }
        return updated;
      })
    );
  };

  const handleRemoveLineItem = (id: string) => {
    setLineItems(lineItems.filter((item) => item.id !== id));
  };

  const subtotal = lineItems.reduce((acc, item) => acc + (item.amount || 0), 0);
  const taxAmount = Math.round(subtotal * (taxPercent / 100));
  const totalAmount = Math.max(0, subtotal + taxAmount - discountAmount);

  const handleCreateInvoiceSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName || !clientEmail || lineItems.length === 0) {
      alert('Please fill all required fields and have at least one line item.');
      return;
    }

    const newInvoice: Invoice = {
      id: `inv-${Date.now()}`,
      invoiceNumber: `INV-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`,
      clientId: selectedClientId,
      clientName,
      clientEmail,
      issueDate: new Date().toISOString().slice(0, 10),
      dueDate,
      billingType,
      baseRetainer,
      spendManaged,
      performanceFeePercent: 6,
      performanceBonus: lineItems.find((i) => i.description.includes('Performance'))?.amount || 0,
      lineItems,
      subtotal,
      taxPercent,
      taxAmount,
      discountAmount,
      totalAmount,
      status: 'sent',
      paymentNotes: 'Payment due within 7 days. Remit payment via ACH Wire or corporate card.',
    };

    onAddInvoice(newInvoice);
    setIsCreateOpen(false);
  };

  const filteredInvoices = invoices.filter((inv) => {
    if (filter === 'all') return true;
    return inv.status === filter;
  });

  const totalCollected = invoices.filter((i) => i.status === 'paid').reduce((acc, i) => acc + i.totalAmount, 0);
  const totalPending = invoices.filter((i) => i.status === 'sent').reduce((acc, i) => acc + i.totalAmount, 0);
  const totalInvoiced = invoices.reduce((acc, i) => acc + i.totalAmount, 0);

  return (
    <div className="space-y-8">
      {/* Top Financial Metric Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl">
          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mb-2 font-medium">
            <span>Total Collected (Paid)</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
          </div>
          <div className="text-3xl font-extrabold text-emerald-600 dark:text-emerald-400 font-mono">
            ${totalCollected.toLocaleString()}
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 font-medium">Settled into agency bank account</p>
        </div>

        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl">
          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mb-2 font-medium">
            <span>Pending Receivables</span>
            <Clock className="w-4 h-4 text-amber-500" />
          </div>
          <div className="text-3xl font-extrabold text-amber-600 dark:text-amber-400 font-mono">
            ${totalPending.toLocaleString()}
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 font-medium">Awaiting client payment (Net-7)</p>
        </div>

        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl">
          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mb-2 font-medium">
            <span>Total Invoiced YTD</span>
            <DollarSign className="w-4 h-4 text-indigo-500" />
          </div>
          <div className="text-3xl font-extrabold text-slate-900 dark:text-white font-mono">
            ${totalInvoiced.toLocaleString()}
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 font-medium">Across all retainers & performance fees</p>
        </div>
      </div>

      {/* Action and Filter Controls */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Status Filter Chips */}
        <div className="flex items-center space-x-1.5 p-1.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm overflow-x-auto w-full sm:w-auto">
          {['all', 'sent', 'paid', 'draft', 'overdue'].map((tab) => (
            <button
              key={tab}
              onClick={() => setFilter(tab)}
              className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
                filter === tab
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/25'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              {tab === 'all' ? 'All Invoices' : tab}
            </button>
          ))}
        </div>

        <button
          onClick={() => setIsCreateOpen(true)}
          className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 text-xs font-extrabold px-6 py-3 rounded-full bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/25 transition-all active:scale-95"
        >
          <Plus className="w-4 h-4" />
          <span>Create New Invoice</span>
        </button>
      </div>

      {/* Invoices List Table */}
      <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 dark:bg-slate-950/60 text-slate-600 dark:text-slate-400 font-bold border-b border-slate-200 dark:border-slate-800 uppercase tracking-wider text-[11px]">
              <tr>
                <th className="py-4 px-5">Invoice #</th>
                <th className="py-4 px-5">Client Brand</th>
                <th className="py-4 px-5">Issue Date</th>
                <th className="py-4 px-5">Due Date</th>
                <th className="py-4 px-5">Total Amount</th>
                <th className="py-4 px-5">Status</th>
                <th className="py-4 px-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
              {filteredInvoices.map((inv) => (
                <tr key={inv.id} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/50 transition-colors">
                  <td className="py-4 px-5 font-mono font-bold text-slate-900 dark:text-white flex items-center space-x-2">
                    <FileText className="w-3.5 h-3.5 text-indigo-500 shrink-0" />
                    <span>{inv.invoiceNumber}</span>
                  </td>
                  <td className="py-4 px-5">
                    <div className="font-semibold text-slate-900 dark:text-white">{inv.clientName}</div>
                    <div className="text-[11px] text-slate-500 dark:text-slate-400">{inv.clientEmail}</div>
                  </td>
                  <td className="py-4 px-5 font-mono text-slate-500 dark:text-slate-400">{inv.issueDate}</td>
                  <td className="py-4 px-5 font-mono text-slate-500 dark:text-slate-400">{inv.dueDate}</td>
                  <td className="py-4 px-5 font-mono font-bold text-slate-900 dark:text-white text-sm">
                    ${inv.totalAmount.toLocaleString()}
                  </td>
                  <td className="py-4 px-5">
                    <span
                      className={`text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-full border ${
                        inv.status === 'paid'
                          ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20'
                          : inv.status === 'sent'
                          ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20'
                          : inv.status === 'overdue'
                          ? 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700'
                      }`}
                    >
                      {inv.status}
                    </span>
                  </td>
                  <td className="py-4 px-5 text-right">
                    <div className="inline-flex items-center space-x-1.5">
                      {/* View & Print */}
                      <button
                        onClick={() => setSelectedInvoiceForPrint(inv)}
                        className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 transition-colors shadow-sm"
                        title="View / Print Invoice"
                      >
                        <Printer className="w-3.5 h-3.5" />
                      </button>

                      {/* Toggle Paid */}
                      {inv.status !== 'paid' && (
                        <button
                          onClick={() => onUpdateInvoiceStatus(inv.id, 'paid')}
                          className="px-3 py-1 rounded-xl bg-emerald-500/15 hover:bg-emerald-600 text-emerald-600 dark:text-emerald-400 hover:text-white border border-emerald-500/30 text-[11px] font-bold transition-colors"
                          title="Mark Paid"
                        >
                          Mark Paid
                        </button>
                      )}

                      {/* Delete */}
                      <button
                        onClick={() => {
                          if (confirm(`Delete invoice ${inv.invoiceNumber}?`)) {
                            onDeleteInvoice(inv.id);
                          }
                        }}
                        className="p-2 rounded-xl hover:bg-rose-500/10 text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 transition-colors"
                        title="Delete"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {filteredInvoices.length === 0 && (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-slate-500 dark:text-slate-400 text-xs">
                    No invoices found matching criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* CREATE INVOICE MODAL */}
      {isCreateOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="relative w-full max-w-2xl rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl p-6 sm:p-8 space-y-6 text-slate-900 dark:text-white max-h-[92vh] overflow-y-auto animate-in fade-in zoom-in-95 duration-200">
            <button
              onClick={() => setIsCreateOpen(false)}
              className="absolute top-5 right-5 text-slate-400 hover:text-slate-700 dark:hover:text-white p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div>
              <span className="text-[10px] uppercase font-bold tracking-wider text-indigo-600 dark:text-indigo-400 font-mono">
                Financial Operations
              </span>
              <h3 className="text-2xl font-bold font-display mt-0.5">Generate Client Invoice</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Configure retainers and automated performance bonuses based on ad spend and ROAS targets.
              </p>
            </div>

            <form onSubmit={handleCreateInvoiceSubmit} className="space-y-4">
              {/* Select Client */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Select Client
                </label>
                <select
                  value={selectedClientId}
                  onChange={(e) => handleClientSelectChange(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs text-slate-900 dark:text-white outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                >
                  {clients.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.brandName} (${c.monthlyRetainer}/mo base + {c.performanceFeePercent}% over ${c.spendBaseline.toLocaleString()})
                    </option>
                  ))}
                  <option value="custom">Custom / New Brand</option>
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Brand Name *</label>
                  <input
                    type="text"
                    required
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs text-slate-900 dark:text-white outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Billing Email *</label>
                  <input
                    type="email"
                    required
                    value={clientEmail}
                    onChange={(e) => setClientEmail(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs text-slate-900 dark:text-white outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Billing Model</label>
                  <select
                    value={billingType}
                    onChange={(e: any) => setBillingType(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs text-slate-900 dark:text-white outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                  >
                    <option value="performance_hybrid">Performance Hybrid (Retainer + % Spend)</option>
                    <option value="fixed_retainer">Fixed Monthly Retainer</option>
                    <option value="one_time">One-Time Project / Audit Setup</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Payment Due Date</label>
                  <input
                    type="date"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs text-slate-900 dark:text-white outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                  />
                </div>
              </div>

              {/* Dynamic Line Items Table */}
              <div className="pt-2">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-extrabold text-slate-900 dark:text-white uppercase tracking-wider font-sans">
                    Line Items ({lineItems.length})
                  </span>
                  <button
                    type="button"
                    onClick={handleAddLineItem}
                    className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 flex items-center space-x-1"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Item</span>
                  </button>
                </div>

                <div className="space-y-2 max-h-48 overflow-y-auto">
                  {lineItems.map((item) => (
                    <div
                      key={item.id}
                      className="grid grid-cols-12 gap-2 p-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 items-center text-xs"
                    >
                      <input
                        type="text"
                        placeholder="Item description"
                        value={item.description}
                        onChange={(e) => handleUpdateLineItem(item.id, 'description', e.target.value)}
                        className="col-span-7 bg-transparent border-none text-slate-900 dark:text-white outline-none px-1"
                      />
                      <input
                        type="number"
                        min="1"
                        placeholder="Qty"
                        value={item.quantity}
                        onChange={(e) => handleUpdateLineItem(item.id, 'quantity', Number(e.target.value))}
                        className="col-span-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg p-1.5 text-center text-slate-900 dark:text-white outline-none font-mono"
                      />
                      <input
                        type="number"
                        min="0"
                        placeholder="Rate"
                        value={item.rate}
                        onChange={(e) => handleUpdateLineItem(item.id, 'rate', Number(e.target.value))}
                        className="col-span-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg p-1.5 text-right text-slate-900 dark:text-white outline-none font-mono"
                      />
                      <button
                        type="button"
                        onClick={() => handleRemoveLineItem(item.id)}
                        className="col-span-1 text-slate-400 hover:text-rose-500 p-1 text-center transition-colors"
                      >
                        <Trash2 className="w-3.5 h-3.5 mx-auto" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Financial Calculation Totals */}
              <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-2 text-xs">
                <div className="flex justify-between text-slate-600 dark:text-slate-400 font-medium">
                  <span>Subtotal:</span>
                  <span className="font-mono text-slate-900 dark:text-white font-bold">${subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center text-slate-600 dark:text-slate-400 font-medium">
                  <span>Tax %:</span>
                  <input
                    type="number"
                    min="0"
                    max="30"
                    value={taxPercent}
                    onChange={(e) => setTaxPercent(Number(e.target.value))}
                    className="w-16 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg p-1.5 text-right text-slate-900 dark:text-white font-mono text-xs"
                  />
                </div>
                <div className="flex justify-between text-base font-bold text-slate-900 dark:text-white pt-2 border-t border-slate-200 dark:border-slate-800">
                  <span>Total Amount Due:</span>
                  <span className="text-emerald-600 dark:text-emerald-400 font-mono text-xl font-extrabold">${totalAmount.toLocaleString()}</span>
                </div>
              </div>

              <div className="pt-2 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setIsCreateOpen(false)}
                  className="px-5 py-2.5 rounded-full bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-xs font-bold text-slate-700 dark:text-slate-300 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-full bg-indigo-600 hover:bg-indigo-500 text-xs font-bold text-white shadow-lg shadow-indigo-600/25 transition-all active:scale-95"
                >
                  Generate & Send Invoice
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* PRINTABLE / PDF INVOICE PREVIEW MODAL */}
      {selectedInvoiceForPrint && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
          <div className="relative w-full max-w-3xl rounded-3xl bg-white text-slate-900 shadow-2xl p-8 sm:p-12 space-y-8 my-8 print:my-0 print:p-0">
            {/* Top Toolbar (Hidden on print) */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-200 no-print">
              <span className="text-xs font-extrabold uppercase tracking-wider text-slate-500 font-mono">
                Official Agency Invoice
              </span>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => window.print()}
                  className="inline-flex items-center space-x-2 px-5 py-2 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-md transition-colors"
                >
                  <Printer className="w-4 h-4" />
                  <span>Print / Save as PDF</span>
                </button>
                <button
                  onClick={() => setSelectedInvoiceForPrint(null)}
                  className="p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* INVOICE CONTENT (Print Styled) */}
            <div className="space-y-8 font-sans invoice-card">
              {/* Invoice Header */}
              <div className="flex justify-between items-start">
                <div>
                  <div className="text-2xl font-black tracking-tight text-slate-900 font-display">VANGUARD DTC</div>
                  <div className="text-xs font-bold text-indigo-600 tracking-widest uppercase">Performance Marketing Agency</div>
                  <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                    740 Commerce Boulevard, Suite 500<br />
                    hello@vanguarddtc.agency • +1 (800) 555-DTC1
                  </p>
                </div>

                <div className="text-right">
                  <div className="text-2xl font-extrabold font-mono text-slate-900">{selectedInvoiceForPrint.invoiceNumber}</div>
                  <div className="text-xs text-slate-500 mt-1">Date: {selectedInvoiceForPrint.issueDate}</div>
                  <div className="text-xs font-bold text-rose-600 mt-0.5">Due Date: {selectedInvoiceForPrint.dueDate}</div>
                </div>
              </div>

              {/* Bill To */}
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200">
                <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">Bill To:</div>
                <div className="text-base font-bold text-slate-900">{selectedInvoiceForPrint.clientName}</div>
                <div className="text-xs text-slate-600">{selectedInvoiceForPrint.clientEmail}</div>
                <div className="text-xs text-slate-500 mt-1">Shopify E-Commerce Partner Account</div>
              </div>

              {/* Line Items Table */}
              <div>
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b-2 border-slate-900 text-slate-800 font-bold uppercase text-[11px]">
                      <th className="py-2.5">Description</th>
                      <th className="py-2.5 text-center">Qty</th>
                      <th className="py-2.5 text-right">Rate</th>
                      <th className="py-2.5 text-right">Amount</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    {selectedInvoiceForPrint.lineItems.map((item) => (
                      <tr key={item.id}>
                        <td className="py-3 pr-4 font-medium text-slate-800">{item.description}</td>
                        <td className="py-3 text-center text-slate-600 font-mono">{item.quantity}</td>
                        <td className="py-3 text-right text-slate-600 font-mono">${item.rate.toLocaleString()}</td>
                        <td className="py-3 text-right font-bold text-slate-900 font-mono">${item.amount.toLocaleString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Totals */}
              <div className="flex justify-end pt-4 border-t border-slate-200">
                <div className="w-64 space-y-2 text-xs">
                  <div className="flex justify-between text-slate-600">
                    <span>Subtotal:</span>
                    <span className="font-mono font-semibold">${selectedInvoiceForPrint.subtotal.toLocaleString()}</span>
                  </div>
                  {selectedInvoiceForPrint.taxAmount > 0 && (
                    <div className="flex justify-between text-slate-600">
                      <span>Tax ({selectedInvoiceForPrint.taxPercent}%):</span>
                      <span className="font-mono">${selectedInvoiceForPrint.taxAmount.toLocaleString()}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-base font-extrabold text-slate-900 pt-2 border-t-2 border-slate-900">
                    <span>Total Due (USD):</span>
                    <span className="font-mono text-emerald-600 text-lg">${selectedInvoiceForPrint.totalAmount.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              {/* Payment Details Remittance */}
              <div className="pt-6 border-t border-slate-200 text-xs text-slate-600 space-y-1">
                <div className="font-bold text-slate-900 uppercase tracking-wider text-[11px]">Remittance & Wire Instructions:</div>
                <p>Bank: Silicon Valley Bank • Account Name: Vanguard Media LLC</p>
                <p>Routing: 121000358 • Account #: 984028472910</p>
                <p className="text-[11px] text-slate-500 pt-2">{selectedInvoiceForPrint.paymentNotes}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
