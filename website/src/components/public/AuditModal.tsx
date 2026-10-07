import React, { useState } from 'react';
import { X, Sparkles, CheckCircle2, ArrowRight, ShieldCheck } from 'lucide-react';
import type { Lead } from '../../types';

interface AuditModalProps {
  isOpen: boolean;
  onClose: () => void;
  prefilledSpend?: number;
  onLeadCreated: (newLead: Lead) => void;
  onNavigateToDashboard: () => void;
}

export const AuditModal: React.FC<AuditModalProps> = ({
  isOpen,
  onClose,
  prefilledSpend,
  onLeadCreated,
  onNavigateToDashboard,
}) => {
  const [step, setStep] = useState<number>(1);
  const [brandName, setBrandName] = useState<string>('');
  const [websiteUrl, setWebsiteUrl] = useState<string>('');
  const [category, setCategory] = useState<string>('Apparel & Fashion');
  const [monthlySpend, setMonthlySpend] = useState<number>(prefilledSpend || 20000);
  const [bottleneck, setBottleneck] = useState<string>('High Meta CPA & ad creative fatigue');
  const [contactName, setContactName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!brandName || !email || !contactName) return;

    const newLead: Lead = {
      id: `lead-${Date.now()}`,
      brandName,
      websiteUrl: websiteUrl.startsWith('http') ? websiteUrl : `https://${websiteUrl || brandName.toLowerCase().replace(/\s+/g, '') + '.com'}`,
      contactName,
      email,
      phone,
      monthlySpend: Number(monthlySpend),
      category,
      primaryBottleneck: bottleneck,
      stage: 'new_lead',
      notes: [
        `Inbound website lead created on ${new Date().toLocaleDateString()}. Monthly spend reported: $${monthlySpend.toLocaleString()}.`,
        `Reported bottleneck: "${bottleneck}"`,
      ],
      createdAt: new Date().toISOString().slice(0, 10),
    };

    onLeadCreated(newLead);
    setIsSubmitted(true);
  };

  const handleResetAndClose = () => {
    setIsSubmitted(false);
    setStep(1);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 dark:bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-lg rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl p-5 sm:p-8 overflow-hidden text-slate-900 dark:text-slate-100 my-8">
        {/* Close Button */}
        <button
          onClick={handleResetAndClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-slate-900 dark:hover:text-white p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {isSubmitted ? (
          <div className="text-center py-6 space-y-5">
            <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 flex items-center justify-center mx-auto shadow-sm">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2 font-display">
                Audit Request Registered!
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-sm mx-auto leading-relaxed">
                Your 45-point brand diagnostic is underway for <strong className="text-slate-900 dark:text-white">{brandName}</strong>. 
                Our senior media buyer will analyze your account within 24 hours.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-left text-xs space-y-2">
              <div className="flex justify-between">
                <span className="text-slate-500 dark:text-slate-400">Brand:</span>
                <span className="font-bold text-slate-900 dark:text-white">{brandName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500 dark:text-slate-400">Status in CRM:</span>
                <span className="font-bold text-emerald-600 dark:text-emerald-400 font-mono">Stage: New Lead (Auto-Ingested)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500 dark:text-slate-400">Monthly Ad Spend:</span>
                <span className="font-bold text-indigo-600 dark:text-indigo-400 font-mono">${Number(monthlySpend).toLocaleString()}/mo</span>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={handleResetAndClose}
                className="w-full inline-flex items-center justify-center space-x-2 text-xs font-bold py-3.5 px-4 rounded-full bg-indigo-600 hover:bg-indigo-500 text-white transition-all shadow-lg shadow-indigo-600/30 whitespace-nowrap"
              >
                <span>Return to Vanguard DTC</span>
                <ArrowRight className="w-4 h-4 shrink-0" />
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20 text-xs font-bold mb-2">
                <Sparkles className="w-3.5 h-3.5 text-emerald-500" />
                <span>Complimentary 45-Point Audit</span>
              </div>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight font-display">
                Claim Your DTC Diagnostic
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                We analyze your Meta Pixel EMQ, 3-sec thumbstop rates, and Google PMax feed margin segmentation.
              </p>
            </div>

            {/* Stepper Progress */}
            <div className="flex items-center space-x-2 p-1 rounded-xl bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs font-bold">
              <span className={`flex-1 text-center py-1.5 rounded-lg transition-all ${step === 1 ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-500'}`}>
                1. Brand Info
              </span>
              <span className={`flex-1 text-center py-1.5 rounded-lg transition-all ${step === 2 ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-500'}`}>
                2. Contact & Delivery
              </span>
            </div>

            {step === 1 && (
              <div className="space-y-3.5">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Brand Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Apex Outdoor Wear"
                    value={brandName}
                    onChange={(e) => setBrandName(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 text-sm text-slate-900 dark:text-white placeholder-slate-400 outline-none focus:border-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Shopify Website URL</label>
                  <input
                    type="text"
                    placeholder="e.g. apexoutdoor.com"
                    value={websiteUrl}
                    onChange={(e) => setWebsiteUrl(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 text-sm text-slate-900 dark:text-white placeholder-slate-400 outline-none focus:border-indigo-500"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Product Category</label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="w-full px-3 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 text-xs text-slate-900 dark:text-white outline-none focus:border-indigo-500"
                    >
                      <option>Apparel & Fashion</option>
                      <option>Beauty & Skincare</option>
                      <option>Health & Supplements</option>
                      <option>Home & Living</option>
                      <option>Consumer Electronics</option>
                      <option>Pet Products</option>
                      <option>Food & Beverage</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Monthly Ad Spend ($)</label>
                    <input
                      type="number"
                      min="1000"
                      step="1000"
                      value={monthlySpend}
                      onChange={(e) => setMonthlySpend(Number(e.target.value))}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 text-sm font-mono text-slate-900 dark:text-white outline-none focus:border-indigo-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Biggest Current Bottleneck</label>
                  <select
                    value={bottleneck}
                    onChange={(e) => setBottleneck(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 text-xs text-slate-900 dark:text-white outline-none focus:border-indigo-500"
                  >
                    <option>High Meta CPA & ad creative fatigue</option>
                    <option>Google PMax ROAS dropping & cannibalizing search</option>
                    <option>Signal loss & broken attribution post-iOS 14</option>
                    <option>Need to scale profitably past $50k-$100k/mo</option>
                    <option>High AOV but low conversion rate</option>
                  </select>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    if (brandName.trim()) setStep(2);
                  }}
                  disabled={!brandName.trim()}
                  className="w-full mt-2 inline-flex items-center justify-center space-x-2 text-sm font-bold py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white transition-all shadow-lg shadow-indigo-600/30 whitespace-nowrap"
                >
                  <span>Continue to Step 2</span>
                  <ArrowRight className="w-4 h-4 shrink-0" />
                </button>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-3.5">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Founder / Contact Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Alex Morgan"
                    value={contactName}
                    onChange={(e) => setContactName(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 text-sm text-slate-900 dark:text-white placeholder-slate-400 outline-none focus:border-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Business Email (Where to send audit) *</label>
                  <input
                    type="email"
                    required
                    placeholder="e.g. alex@apexoutdoor.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 text-sm text-slate-900 dark:text-white placeholder-slate-400 outline-none focus:border-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Phone Number (Optional for SMS reminder)</label>
                  <input
                    type="tel"
                    placeholder="+1 (555) 000-0000"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 text-sm text-slate-900 dark:text-white placeholder-slate-400 outline-none focus:border-indigo-500"
                  />
                </div>

                <div className="flex items-center space-x-2 text-[11px] text-slate-500 dark:text-slate-400 pt-1">
                  <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>Strict NDA: 100% confidential under agency privacy standards.</span>
                </div>

                <div className="flex space-x-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="w-1/3 text-xs font-semibold py-3.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 transition-colors whitespace-nowrap"
                  >
                    Back
                  </button>

                  <button
                    type="submit"
                    className="w-2/3 inline-flex items-center justify-center space-x-1.5 sm:space-x-2 text-xs sm:text-sm font-bold py-3.5 px-3 rounded-xl bg-gradient-to-r from-indigo-600 via-indigo-500 to-emerald-500 text-white shadow-xl shadow-indigo-600/30 hover:brightness-110 transition-all active:scale-95 whitespace-nowrap"
                  >
                    <Sparkles className="w-4 h-4 text-emerald-200 shrink-0" />
                    <span className="whitespace-nowrap">Generate Free Audit</span>
                  </button>
                </div>
              </div>
            )}
          </form>
        )}
      </div>
    </div>
  );
};
