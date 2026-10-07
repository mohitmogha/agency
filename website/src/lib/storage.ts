import { AgencyData, Client, Invoice, Lead } from '../types';

const STORAGE_KEY = 'vanguard_agency_data_v1';

export const INITIAL_DATA: AgencyData = {
  leads: [
    {
      id: 'lead-1',
      brandName: 'Solana Botanical Skincare',
      websiteUrl: 'https://solanabotanicals.demo',
      contactName: 'Elena Rostova',
      email: 'elena@solanabotanicals.demo',
      phone: '+1 (415) 890-1234',
      monthlySpend: 18500,
      category: 'Beauty & Skincare',
      primaryBottleneck: 'Meta CPA doubled after iOS updates; ROAS stuck at 1.8x; need 3:2:2 creative testing system',
      stage: 'audit_scheduled',
      notes: [
        'Loom video audit sent on Monday. Founder replied within 2 hours asking for strategy call.',
        'Diagnostics call scheduled for Thursday 2 PM EST.',
      ],
      createdAt: '2026-10-02',
    },
    {
      id: 'lead-2',
      brandName: 'Nordic Ember Cookware',
      websiteUrl: 'https://nordicember.demo',
      contactName: 'Henrik Larsson',
      email: 'henrik@nordicember.demo',
      monthlySpend: 32000,
      category: 'Home & Kitchen',
      primaryBottleneck: 'Google PMax is eating budget with low margin items; need GMC custom labels and brand defense',
      stage: 'proposal_sent',
      notes: [
        'Audit completed: 78/100 score. Identified $6k/mo wasted on non-converting PMax display inventory.',
        'Sent proposal for $4,500/mo retainer + 6% scale bonus above $30k spend.',
      ],
      createdAt: '2026-09-28',
    },
    {
      id: 'lead-3',
      brandName: 'AeroVolt Activewear',
      websiteUrl: 'https://aerovoltfit.demo',
      contactName: 'Marcus Vance',
      email: 'marcus@aerovoltfit.demo',
      monthlySpend: 9500,
      category: 'Apparel & Athleisure',
      primaryBottleneck: 'Inquired through website form. Looking to scale past $50k/mo ahead of holiday season.',
      stage: 'new_lead',
      notes: [
        'Inbound form submission. Current AOV is $88 with 72% gross margins. Highly qualified candidate.',
      ],
      createdAt: '2026-10-05',
    },
  ],
  clients: [
    {
      id: 'client-1',
      brandName: 'LuxeSwim Coastal',
      websiteUrl: 'https://luxeswimwear.demo',
      contactName: 'Chloe Bennett',
      email: 'chloe@luxeswimwear.demo',
      monthlyRetainer: 4500,
      performanceFeePercent: 6,
      spendBaseline: 25000,
      currentSpend: 54000,
      metaSpend: 38000,
      googleSpend: 16000,
      currentRevenue: 226800,
      blendedMER: 4.20,
      targetROAS: 3.50,
      topCreativeAngle: 'Us vs Them comparison video showing compression fabric longevity',
      status: 'active',
      joinedDate: '2026-06-15',
    },
    {
      id: 'client-2',
      brandName: 'NaturaPet Organics',
      websiteUrl: 'https://naturapethealth.demo',
      contactName: 'David Chen',
      email: 'david@naturapethealth.demo',
      monthlyRetainer: 3500,
      performanceFeePercent: 6,
      spendBaseline: 20000,
      currentSpend: 38500,
      metaSpend: 26500,
      googleSpend: 12000,
      currentRevenue: 154000,
      blendedMER: 4.00,
      targetROAS: 3.20,
      topCreativeAngle: 'Founder dog story PAS format with vet review overlays',
      status: 'active',
      joinedDate: '2026-07-01',
    },
    {
      id: 'client-3',
      brandName: 'Aura Sleep Soundbar',
      websiteUrl: 'https://aurasleeplab.demo',
      contactName: 'Sarah Jenkins',
      email: 'sarah@aurasleeplab.demo',
      monthlyRetainer: 5000,
      performanceFeePercent: 8,
      spendBaseline: 30000,
      currentSpend: 62000,
      metaSpend: 42000,
      googleSpend: 20000,
      currentRevenue: 241800,
      blendedMER: 3.90,
      targetROAS: 3.40,
      topCreativeAngle: 'White noise frequency comparison UGC with unboxing hook',
      status: 'active',
      joinedDate: '2026-05-10',
    },
  ],
  invoices: [
    {
      id: 'inv-1',
      invoiceNumber: 'INV-2026-041',
      clientId: 'client-1',
      clientName: 'LuxeSwim Coastal',
      clientEmail: 'billing@luxeswimwear.demo',
      issueDate: '2026-10-01',
      dueDate: '2026-10-08',
      billingType: 'performance_hybrid',
      baseRetainer: 4500,
      spendManaged: 54000,
      performanceBonus: 1740, // 6% of (54k - 25k) = 1740
      lineItems: [
        {
          id: 'li-1',
          description: 'Omnichannel Media Buying Management (Meta ASC + Google PMax) - October 2026',
          quantity: 1,
          rate: 4500,
          amount: 4500,
        },
        {
          id: 'li-2',
          description: 'Performance Scale Incentive (6% of $29,000 spend above baseline @ 4.2x MER)',
          quantity: 1,
          rate: 1740,
          amount: 1740,
        },
        {
          id: 'li-3',
          description: 'Weekly UGC Creative Briefing & Sandbox Iteration Suite',
          quantity: 1,
          rate: 0,
          amount: 0,
        },
      ],
      subtotal: 6240,
      taxPercent: 0,
      taxAmount: 0,
      discountAmount: 0,
      totalAmount: 6240,
      status: 'paid',
      paymentNotes: 'Wire transfer received on Oct 3, 2026. Ref #WT-992384.',
      paidDate: '2026-10-03',
    },
    {
      id: 'inv-2',
      invoiceNumber: 'INV-2026-042',
      clientId: 'client-2',
      clientName: 'NaturaPet Organics',
      clientEmail: 'david@naturapethealth.demo',
      issueDate: '2026-10-01',
      dueDate: '2026-10-08',
      billingType: 'performance_hybrid',
      baseRetainer: 3500,
      spendManaged: 38500,
      performanceBonus: 1110, // 6% of (38.5k - 20k)
      lineItems: [
        {
          id: 'li-4',
          description: 'Growth Retainer: Meta & Google Advertising Management - October 2026',
          quantity: 1,
          rate: 3500,
          amount: 3500,
        },
        {
          id: 'li-5',
          description: 'Performance Incentive (6% of $18,500 incremental ad spend @ 4.0x MER)',
          quantity: 1,
          rate: 1110,
          amount: 1110,
        },
      ],
      subtotal: 4610,
      taxPercent: 0,
      taxAmount: 0,
      discountAmount: 0,
      totalAmount: 4610,
      status: 'sent',
      paymentNotes: 'Net-7 terms. ACH / Stripe link attached.',
    },
    {
      id: 'inv-3',
      invoiceNumber: 'INV-2026-043',
      clientId: 'client-3',
      clientName: 'Aura Sleep Soundbar',
      clientEmail: 'billing@aurasleeplab.demo',
      issueDate: '2026-10-01',
      dueDate: '2026-10-08',
      billingType: 'performance_hybrid',
      baseRetainer: 5000,
      spendManaged: 62000,
      performanceBonus: 2560, // 8% of (62k - 30k) = 2560
      lineItems: [
        {
          id: 'li-6',
          description: 'Enterprise Omnichannel Media Management - October 2026',
          quantity: 1,
          rate: 5000,
          amount: 5000,
        },
        {
          id: 'li-7',
          description: 'Performance Scale Incentive (8% of $32,000 spend above baseline @ 3.9x MER)',
          quantity: 1,
          rate: 2560,
          amount: 2560,
        },
      ],
      subtotal: 7560,
      taxPercent: 0,
      taxAmount: 0,
      discountAmount: 0,
      totalAmount: 7560,
      status: 'sent',
      paymentNotes: 'Invoice delivered via email to finance department.',
    },
  ],
};

export function loadAgencyData(): AgencyData {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_DATA));
      return INITIAL_DATA;
    }
    const parsed = JSON.parse(raw);
    return parsed;
  } catch (e) {
    console.error('Error loading agency data from localStorage', e);
    return INITIAL_DATA;
  }
}

export function saveAgencyData(data: AgencyData): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (e) {
    console.error('Error saving agency data to localStorage', e);
  }
}

export function resetAgencyData(): AgencyData {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_DATA));
  return INITIAL_DATA;
}

export function exportAgencyDataJSON(data: AgencyData): void {
  const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(data, null, 2));
  const downloadAnchor = document.createElement('a');
  downloadAnchor.setAttribute('href', dataStr);
  downloadAnchor.setAttribute('download', `vanguard_agency_backup_${new Date().toISOString().slice(0, 10)}.json`);
  document.body.appendChild(downloadAnchor);
  downloadAnchor.click();
  downloadAnchor.remove();
}
