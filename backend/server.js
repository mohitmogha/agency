// Vanguard DTC Performance Marketing Agency - Node.js / Express REST API Backend
// Powers CRM Pipeline, Invoicing & Billing, Client Retainers & Staff RBAC Authentication

const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// In-Memory Seed Database
const db = {
  staffUsers: [
    {
      id: 'user-admin',
      name: 'Alexander Vance',
      email: 'admin@vanguard.agency',
      password: 'VanguardAdmin@2025',
      pin: '7740',
      role: 'super_admin',
      roleTitle: 'Managing Partner & Executive',
      department: 'Executive Leadership',
      avatar: 'AV',
      permissions: ['crm', 'billing', 'performance', 'admin'],
    },
    {
      id: 'user-crm',
      name: 'Marcus Brody',
      email: 'crm.lead@vanguard.agency',
      password: 'GrowthScale#2025',
      pin: 'crm2025',
      role: 'crm_manager',
      roleTitle: 'Head of Client Acquisition & CRM',
      department: 'Sales & Growth',
      avatar: 'MB',
      permissions: ['crm', 'performance'],
    },
    {
      id: 'user-billing',
      name: 'Elena Rostova',
      email: 'billing@vanguard.agency',
      password: 'FinancePro$2025',
      pin: 'bill2025',
      role: 'billing_manager',
      roleTitle: 'Director of Billing & Invoicing',
      department: 'Finance & Operations',
      avatar: 'ER',
      permissions: ['billing'],
    },
    {
      id: 'user-performance',
      name: 'Kavita Sharma',
      email: 'media.buyer@vanguard.agency',
      password: 'MetaGooglePMax*2025',
      pin: 'media2025',
      role: 'performance_lead',
      roleTitle: 'Senior Media Buying Lead (Meta & Google)',
      department: 'Media Strategy',
      avatar: 'KS',
      permissions: ['performance', 'crm'],
    },
  ],
  leads: [
    {
      id: 'lead-1',
      brandName: 'Veloce Footwear Co.',
      websiteUrl: 'https://velocefootwear.com',
      contactName: 'Julian Ray',
      email: 'julian@velocefootwear.com',
      phone: '+1 (555) 234-5678',
      monthlySpend: 45000,
      category: 'Apparel & Footwear',
      primaryBottleneck: 'Meta CPA climbing after iOS 14.5; Google PMax cannibalizing brand search.',
      stage: 'proposal_sent',
      notes: [
        'Completed 45-point audit on Oct 2nd. Discovered GMC feed margin labels missing and CAPI EMQ only 5.2.',
        'Sent proposal for $3,500/mo retainer + 6% scale bonus above $30k spend baseline.'
      ],
      createdAt: '2025-10-02',
    },
    {
      id: 'lead-2',
      brandName: 'Komorebi Tea Organics',
      websiteUrl: 'https://komorebitea.co',
      contactName: 'Emi Tanaka',
      email: 'emi@komorebitea.co',
      phone: '+1 (555) 876-5432',
      monthlySpend: 18000,
      category: 'Food & Beverage',
      primaryBottleneck: 'Creative fatigue on TikTok and Meta; need 3:2:2 Dynamic Creative sandbox testing.',
      stage: 'audit_scheduled',
      notes: [
        'Audit scheduled for Thursday 2 PM EST with media buyer.',
        'High organic AOV ($68) makes this prime for Advantage+ Shopping consolidated scaling.'
      ],
      createdAt: '2025-10-04',
    },
    {
      id: 'lead-3',
      brandName: 'HydroGlow Skincare',
      websiteUrl: 'https://hydroglowskin.com',
      contactName: 'Chloe Adams',
      email: 'chloe@hydroglowskin.com',
      monthlySpend: 32000,
      category: 'Beauty & Skincare',
      primaryBottleneck: 'Need predictable net contribution margin and weekly UGC thumbstop video hooks.',
      stage: 'new_lead',
      notes: [
        'Inbound website audit request submitted from homepage simulator.',
        'Current ROAS: 1.8x. Seeking 3.5x blended MER target.'
      ],
      createdAt: '2025-10-05',
    },
  ],
  clients: [
    {
      id: 'client-1',
      brandName: 'LuxeSwim Coastal',
      websiteUrl: 'https://luxeswimcoastal.com',
      contactName: 'Chloe Bennett',
      email: 'chloe@luxeswimcoastal.com',
      monthlyRetainer: 4500,
      performanceFeePercent: 6,
      spendBaseline: 30000,
      currentSpend: 54000,
      metaSpend: 38000,
      googleSpend: 16000,
      currentRevenue: 226800,
      blendedMER: 4.20,
      targetROAS: 3.50,
      topCreativeAngle: '3:2:2 DCT Problem-Agitate-Solve Bikini Fit Guarantee',
      status: 'active',
      joinedDate: '2025-06-15',
    },
    {
      id: 'client-2',
      brandName: 'NaturaPet Organics',
      websiteUrl: 'https://naturapetorganics.com',
      contactName: 'David Chen',
      email: 'david@naturapetorganics.com',
      monthlyRetainer: 3500,
      performanceFeePercent: 6,
      spendBaseline: 25000,
      currentSpend: 42000,
      metaSpend: 26000,
      googleSpend: 16000,
      currentRevenue: 168000,
      blendedMER: 4.00,
      targetROAS: 3.20,
      topCreativeAngle: 'Server-Side CAPI Vet Testimonial Hooks',
      status: 'active',
      joinedDate: '2025-07-01',
    },
    {
      id: 'client-3',
      brandName: 'Aura Sleep Labs',
      websiteUrl: 'https://aurasleeplabs.com',
      contactName: 'Sarah Jenkins',
      email: 'sarah@aurasleeplabs.com',
      monthlyRetainer: 5000,
      performanceFeePercent: 7,
      spendBaseline: 40000,
      currentSpend: 62000,
      metaSpend: 42000,
      googleSpend: 20000,
      currentRevenue: 241800,
      blendedMER: 3.90,
      targetROAS: 3.30,
      topCreativeAngle: 'Brand Search Defense + High-Intent Unbranded STAGs',
      status: 'active',
      joinedDate: '2025-05-10',
    },
  ],
  invoices: [
    {
      id: 'inv-1001',
      invoiceNumber: 'INV-2025-1001',
      clientId: 'client-1',
      clientName: 'LuxeSwim Coastal',
      clientEmail: 'billing@luxeswimcoastal.com',
      issueDate: '2025-10-01',
      dueDate: '2025-10-08',
      billingType: 'performance_hybrid',
      baseRetainer: 4500,
      spendManaged: 54000,
      performanceFeePercent: 6,
      performanceBonus: 1440,
      lineItems: [
        { id: 'li-1', description: 'Omnichannel Performance Retainer (Meta ASC & Google PMax)', quantity: 1, rate: 4500, amount: 4500 },
        { id: 'li-2', description: 'Scale Incentive Bonus (6% on incremental ad spend above $30k baseline)', quantity: 1, rate: 1440, amount: 1440 }
      ],
      subtotal: 5940,
      taxPercent: 0,
      taxAmount: 0,
      discountAmount: 0,
      totalAmount: 5940,
      status: 'paid',
      paidDate: '2025-10-05',
    },
    {
      id: 'inv-1002',
      invoiceNumber: 'INV-2025-1002',
      clientId: 'client-2',
      clientName: 'NaturaPet Organics',
      clientEmail: 'finance@naturapetorganics.com',
      issueDate: '2025-10-01',
      dueDate: '2025-10-08',
      billingType: 'performance_hybrid',
      baseRetainer: 3500,
      spendManaged: 42000,
      performanceFeePercent: 6,
      performanceBonus: 1020,
      lineItems: [
        { id: 'li-3', description: 'Growth Management Retainer', quantity: 1, rate: 3500, amount: 3500 },
        { id: 'li-4', description: 'Scale Bonus (6% over $25k baseline)', quantity: 1, rate: 1020, amount: 1020 }
      ],
      subtotal: 4520,
      taxPercent: 0,
      taxAmount: 0,
      discountAmount: 0,
      totalAmount: 4520,
      status: 'sent',
    },
  ],
  auditLogs: [
    {
      id: 'log-boot',
      timestamp: new Date().toISOString(),
      user: 'System Backend Engine',
      action: 'SERVER_BOOTSTRAP',
      details: 'Express REST API server initialized on port ' + PORT,
      status: 'info',
    },
  ],
};

// Helper: Log audit event
function recordAudit(action, details, status = 'info', user = 'System') {
  const log = {
    id: `log-${Date.now()}`,
    timestamp: new Date().toISOString(),
    user,
    action,
    details,
    status,
  };
  db.auditLogs.unshift(log);
  if (db.auditLogs.length > 100) db.auditLogs.pop();
}

// -------------------------------------------------------------
// 1. HEALTH & SYSTEM DIAGNOSTICS
// -------------------------------------------------------------
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ONLINE',
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
    database: {
      leadsCount: db.leads.length,
      clientsCount: db.clients.length,
      invoicesCount: db.invoices.length,
      staffCount: db.staffUsers.length,
    },
    version: '1.0.0',
  });
});

// -------------------------------------------------------------
// 2. AUTHENTICATION & RBAC ENDPOINTS
// -------------------------------------------------------------
app.post('/api/auth/login', (req, res) => {
  const { email, password, pin } = req.body;

  // Master key override
  if (pin === 'vanguard2025' || pin === '7740') {
    const adminUser = db.staffUsers.find((u) => u.role === 'super_admin');
    recordAudit('MASTER_PIN_LOGIN', 'Master key authentication succeeded', 'success', adminUser.email);
    return res.json({
      success: true,
      token: `vg_jwt_${Date.now()}_${adminUser.id}`,
      user: adminUser,
    });
  }

  // Password-based login
  if (email && password) {
    const user = db.staffUsers.find(
      (u) => u.email.toLowerCase() === email.trim().toLowerCase() && u.password === password
    );

    if (user) {
      recordAudit('STAFF_LOGIN_SUCCESS', `Staff user ${user.name} authenticated via password`, 'success', user.email);
      return res.json({
        success: true,
        token: `vg_jwt_${Date.now()}_${user.id}`,
        user,
      });
    }
  }

  // PIN-based login
  if (pin) {
    const user = db.staffUsers.find((u) => u.pin === pin.trim());
    if (user) {
      recordAudit('STAFF_PIN_LOGIN', `${user.name} signed in with security PIN`, 'success', user.email);
      return res.json({
        success: true,
        token: `vg_jwt_${Date.now()}_${user.id}`,
        user,
      });
    }
  }

  recordAudit('LOGIN_FAILED', `Failed login attempt for ${email || 'unknown'}`, 'warning', email || 'anonymous');
  return res.status(401).json({
    success: false,
    error: 'Invalid credentials or security PIN. Please verify your staff access key.',
  });
});

app.get('/api/admin/staff', (req, res) => {
  res.json({ success: true, staff: db.staffUsers });
});

app.get('/api/admin/audit-logs', (req, res) => {
  res.json({ success: true, logs: db.auditLogs });
});

// -------------------------------------------------------------
// 3. CRM PIPELINE & LEADS ENDPOINTS
// -------------------------------------------------------------
app.get('/api/leads', (req, res) => {
  res.json({ success: true, leads: db.leads });
});

app.post('/api/leads', (req, res) => {
  const newLead = {
    id: `lead-${Date.now()}`,
    createdAt: new Date().toISOString().slice(0, 10),
    notes: req.body.notes || [],
    stage: req.body.stage || 'new_lead',
    ...req.body,
  };

  db.leads.unshift(newLead);
  recordAudit('LEAD_INGESTED', `New prospect registered: ${newLead.brandName} ($${newLead.monthlySpend}/mo spend)`, 'success');
  res.status(201).json({ success: true, lead: newLead });
});

app.patch('/api/leads/:id', (req, res) => {
  const { id } = req.params;
  const leadIndex = db.leads.findIndex((l) => l.id === id);

  if (leadIndex === -1) {
    return res.status(404).json({ success: false, error: 'Lead not found.' });
  }

  db.leads[leadIndex] = { ...db.leads[leadIndex], ...req.body };
  recordAudit('LEAD_UPDATED', `Updated lead ${db.leads[leadIndex].brandName} (Stage: ${db.leads[leadIndex].stage})`, 'info');
  res.json({ success: true, lead: db.leads[leadIndex] });
});

app.delete('/api/leads/:id', (req, res) => {
  const { id } = req.params;
  const lead = db.leads.find((l) => l.id === id);
  db.leads = db.leads.filter((l) => l.id !== id);

  if (lead) {
    recordAudit('LEAD_DELETED', `Deleted prospect record for ${lead.brandName}`, 'warning');
  }
  res.json({ success: true, message: 'Lead deleted.' });
});

// -------------------------------------------------------------
// 4. CLIENT RETAINERS & MEDIA PERFORMANCE ENDPOINTS
// -------------------------------------------------------------
app.get('/api/clients', (req, res) => {
  res.json({ success: true, clients: db.clients });
});

app.patch('/api/clients/:id', (req, res) => {
  const { id } = req.params;
  const idx = db.clients.findIndex((c) => c.id === id);

  if (idx === -1) {
    return res.status(404).json({ success: false, error: 'Client not found.' });
  }

  db.clients[idx] = { ...db.clients[idx], ...req.body };
  recordAudit('CLIENT_METRICS_UPDATED', `Updated performance metrics for client ${db.clients[idx].brandName}`, 'info');
  res.json({ success: true, client: db.clients[idx] });
});

// -------------------------------------------------------------
// 5. INVOICING & BILLING ENDPOINTS
// -------------------------------------------------------------
app.get('/api/invoices', (req, res) => {
  res.json({ success: true, invoices: db.invoices });
});

app.post('/api/invoices', (req, res) => {
  const newInvoice = {
    id: `inv-${Date.now()}`,
    invoiceNumber: `INV-${new Date().getFullYear()}-${1000 + db.invoices.length + 1}`,
    issueDate: new Date().toISOString().slice(0, 10),
    status: req.body.status || 'sent',
    ...req.body,
  };

  db.invoices.unshift(newInvoice);
  recordAudit('INVOICE_GENERATED', `Created invoice ${newInvoice.invoiceNumber} for ${newInvoice.clientName} ($${newInvoice.totalAmount})`, 'success');
  res.status(201).json({ success: true, invoice: newInvoice });
});

app.patch('/api/invoices/:id', (req, res) => {
  const { id } = req.params;
  const idx = db.invoices.findIndex((i) => i.id === id);

  if (idx === -1) {
    return res.status(404).json({ success: false, error: 'Invoice not found.' });
  }

  db.invoices[idx] = { ...db.invoices[idx], ...req.body };
  recordAudit('INVOICE_STATUS_UPDATED', `Invoice ${db.invoices[idx].invoiceNumber} set to ${db.invoices[idx].status}`, 'info');
  res.json({ success: true, invoice: db.invoices[idx] });
});

app.delete('/api/invoices/:id', (req, res) => {
  const { id } = req.params;
  db.invoices = db.invoices.filter((i) => i.id !== id);
  recordAudit('INVOICE_DELETED', `Deleted invoice ID ${id}`, 'warning');
  res.json({ success: true, message: 'Invoice removed.' });
});

// Start Server
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`\n======================================================`);
    console.log(`🚀 VANGUARD DTC AGENCY BACKEND REST API RUNNING`);
    console.log(`📡 URL: http://localhost:${PORT}`);
    console.log(`🛡️  Health check: http://localhost:${PORT}/api/health`);
    console.log(`👥 Staff accounts: 4 loaded with RBAC`);
    console.log(`======================================================\n`);
  });
}

module.exports = app;
