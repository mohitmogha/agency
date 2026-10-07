import { useState, useEffect } from 'react';
import type { 
  AgencyData, Lead, Client, Invoice, PipelineStage, InvoiceStatus 
} from './types';
import { 
  loadAgencyData, saveAgencyData, resetAgencyData, exportAgencyDataJSON 
} from './lib/storage';
import { getInitialTheme, applyTheme } from './lib/theme';
import type { ThemeMode } from './lib/theme';
import { isTeamAuthenticated, logoutTeam } from './lib/auth';

// Public Components
import { Navbar } from './components/public/Navbar';
import { Hero } from './components/public/Hero';
import { RoasCalculator } from './components/public/RoasCalculator';
import { CapabilitiesBento } from './components/public/CapabilitiesBento';
import { ComparisonSection } from './components/public/ComparisonSection';
import { CaseStudies } from './components/public/CaseStudies';
import { MobileStickyBar } from './components/public/MobileStickyBar';
import { PwaInstallBanner } from './components/public/PwaInstallBanner';
import { AuditModal } from './components/public/AuditModal';
import { Footer } from './components/public/Footer';

// Dashboard & Auth Components
import { DashboardHeader } from './components/dashboard/DashboardHeader';
import type { DashboardTab } from './components/dashboard/DashboardHeader';
import { OverviewTab } from './components/dashboard/OverviewTab';
import { CrmPipelineTab } from './components/dashboard/CrmPipelineTab';
import { BillingTab } from './components/dashboard/BillingTab';
import { PerformanceHubTab } from './components/dashboard/PerformanceHubTab';
import { AdminBackendTab } from './components/dashboard/AdminBackendTab';
import { TeamAuthModal } from './components/dashboard/TeamAuthModal';

import { ShieldCheck, ArrowRight, Sparkles } from 'lucide-react';

export function App() {
  const [agencyData, setAgencyData] = useState<AgencyData>(() => loadAgencyData());
  const [viewMode, setViewMode] = useState<'public' | 'dashboard'>('public');
  const [dashboardTab, setDashboardTab] = useState<DashboardTab>('overview');
  const [isAuditModalOpen, setIsAuditModalOpen] = useState<boolean>(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => isTeamAuthenticated());
  const [prefilledSpend, setPrefilledSpend] = useState<number>(25000);
  const [theme, setTheme] = useState<ThemeMode>(() => getInitialTheme());

  // Billing prefill states from CRM
  const [prefillInvoiceClientName, setPrefillInvoiceClientName] = useState<string>('');
  const [prefillInvoiceClientEmail, setPrefillInvoiceClientEmail] = useState<string>('');

  // Sync theme with DOM root class & localStorage
  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  const handleToggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  // Keyboard shortcut listener for internal staff portal access (Alt + P or Ctrl + Shift + P)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.altKey && e.key.toLowerCase() === 'p') || (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === 'p')) {
        e.preventDefault();
        if (isAuthenticated) {
          setViewMode((prev) => (prev === 'public' ? 'dashboard' : 'public'));
        } else {
          setIsAuthModalOpen(true);
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isAuthenticated]);

  // Check URL hash for direct internal portal link (#portal)
  useEffect(() => {
    if (window.location.hash === '#portal' || window.location.search.includes('portal=true')) {
      if (isTeamAuthenticated()) {
        setViewMode('dashboard');
      } else {
        setIsAuthModalOpen(true);
      }
    }
  }, []);

  // Save to localStorage whenever agencyData updates
  useEffect(() => {
    saveAgencyData(agencyData);
  }, [agencyData]);

  // Lead Actions
  const handleAddLead = (newLead: Lead) => {
    setAgencyData((prev) => ({
      ...prev,
      leads: [newLead, ...prev.leads],
    }));
  };

  const handleUpdateLeadStage = (leadId: string, newStage: PipelineStage) => {
    setAgencyData((prev) => ({
      ...prev,
      leads: prev.leads.map((l) => (l.id === leadId ? { ...l, stage: newStage } : l)),
    }));
  };

  const handleDeleteLead = (leadId: string) => {
    setAgencyData((prev) => ({
      ...prev,
      leads: prev.leads.filter((l) => l.id !== leadId),
    }));
  };

  const handleAddNoteToLead = (leadId: string, noteText: string) => {
    setAgencyData((prev) => ({
      ...prev,
      leads: prev.leads.map((l) =>
        l.id === leadId
          ? { ...l, notes: [...l.notes, `${new Date().toLocaleDateString()}: ${noteText}`] }
          : l
      ),
    }));
  };

  const handleConvertLeadToClient = (lead: Lead) => {
    const exists = agencyData.clients.some((c) => c.brandName.toLowerCase() === lead.brandName.toLowerCase());
    if (exists) {
      alert(`Client "${lead.brandName}" is already registered as an active client.`);
      return;
    }

    const newClient: Client = {
      id: `client-${Date.now()}`,
      brandName: lead.brandName,
      websiteUrl: lead.websiteUrl,
      contactName: lead.contactName,
      email: lead.email,
      monthlyRetainer: 3500,
      performanceFeePercent: 6,
      spendBaseline: lead.monthlySpend,
      currentSpend: lead.monthlySpend,
      metaSpend: Math.round(lead.monthlySpend * 0.7),
      googleSpend: Math.round(lead.monthlySpend * 0.3),
      currentRevenue: Math.round(lead.monthlySpend * 3.5),
      blendedMER: 3.5,
      targetROAS: 3.2,
      topCreativeAngle: '3:2:2 Dynamic Creative Sandbox PAS format',
      status: 'active',
      joinedDate: new Date().toISOString().slice(0, 10),
    };

    setAgencyData((prev) => ({
      ...prev,
      clients: [newClient, ...prev.clients],
      leads: prev.leads.map((l) => (l.id === lead.id ? { ...l, stage: 'active_client' } : l)),
    }));

    alert(`Successfully converted "${lead.brandName}" into an Active Retainer Client!`);
  };

  // Invoice Actions
  const handleAddInvoice = (newInvoice: Invoice) => {
    setAgencyData((prev) => ({
      ...prev,
      invoices: [newInvoice, ...prev.invoices],
    }));
  };

  const handleUpdateInvoiceStatus = (invoiceId: string, status: InvoiceStatus) => {
    setAgencyData((prev) => ({
      ...prev,
      invoices: prev.invoices.map((inv) =>
        inv.id === invoiceId
          ? {
              ...inv,
              status,
              paidDate: status === 'paid' ? new Date().toISOString().slice(0, 10) : inv.paidDate,
            }
          : inv
      ),
    }));
  };

  const handleDeleteInvoice = (invoiceId: string) => {
    setAgencyData((prev) => ({
      ...prev,
      invoices: prev.invoices.filter((i) => i.id !== invoiceId),
    }));
  };

  // Client Update
  const handleUpdateClient = (updatedClient: Client) => {
    setAgencyData((prev) => ({
      ...prev,
      clients: prev.clients.map((c) => (c.id === updatedClient.id ? updatedClient : c)),
    }));
  };

  // Export & Reset
  const handleExportJSON = () => {
    exportAgencyDataJSON(agencyData);
  };

  const handleResetData = () => {
    const data = resetAgencyData();
    setAgencyData(data);
  };

  // Auth Handlers
  const handleAuthSuccess = () => {
    setIsAuthenticated(true);
    setViewMode('dashboard');
  };

  const handleSignOut = () => {
    logoutTeam();
    setIsAuthenticated(false);
    setViewMode('public');
  };

  const handleOpenTeamLogin = () => {
    if (isAuthenticated) {
      setViewMode('dashboard');
    } else {
      setIsAuthModalOpen(true);
    }
  };

  // Navigation helpers
  const handleOpenAuditWithSpend = (spend: number) => {
    setPrefilledSpend(spend);
    setIsAuditModalOpen(true);
  };

  const handleOpenCreateInvoiceForClient = (name: string, email: string) => {
    setPrefillInvoiceClientName(name);
    setPrefillInvoiceClientEmail(email);
    setViewMode('dashboard');
    setDashboardTab('billing');
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#080C14] text-slate-900 dark:text-slate-100 selection:bg-indigo-500 selection:text-white transition-colors duration-200">
      {viewMode === 'public' ? (
        /* PUBLIC AGENCY WEBSITE (No public portal links visible) */
        <div className="flex flex-col min-h-screen pb-16 md:pb-0">
          <Navbar
            theme={theme}
            onToggleTheme={handleToggleTheme}
            onOpenAuditModal={() => setIsAuditModalOpen(true)}
            scrollToSection={scrollToSection}
          />

          <main className="flex-1">
            <Hero
              onOpenAuditModal={() => setIsAuditModalOpen(true)}
              onScrollToCalculator={() => scrollToSection('calculator')}
            />

            <RoasCalculator
              onOpenAuditModalWithSpend={handleOpenAuditWithSpend}
            />

            <CapabilitiesBento />

            <ComparisonSection />

            <CaseStudies />

            {/* 90-Day Guarantee Section */}
            <section id="guarantee" className="py-20 border-t border-slate-200 dark:border-slate-800 bg-slate-100/70 dark:bg-slate-900/60 transition-colors">
              <div className="max-w-4xl mx-auto px-4 text-center">
                <div className="w-16 h-16 rounded-3xl bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto mb-6 shadow-lg shadow-emerald-500/10">
                  <ShieldCheck className="w-8 h-8" />
                </div>
                <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-emerald-100 dark:bg-emerald-500/10 text-emerald-800 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-500/20 text-xs font-bold mb-4 font-mono whitespace-nowrap">
                  <Sparkles className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                  <span>Zero Risk Performance SLA</span>
                </div>
                <h3 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-4 font-display">
                  The 90-Day Guaranteed Scale Sprint
                </h3>
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-base sm:text-lg max-w-2xl mx-auto mb-8 font-normal">
                  We don't lock you into 12-month agency contracts. If we don’t achieve your agreed target Blended MER and scale your net store revenue within 90 days, we work completely free until we hit it.
                </p>
                <button
                  onClick={() => setIsAuditModalOpen(true)}
                  className="inline-flex items-center space-x-2 text-xs sm:text-sm font-extrabold px-6 sm:px-8 py-3.5 sm:py-4 rounded-full bg-indigo-600 hover:bg-indigo-500 text-white shadow-xl shadow-indigo-600/30 transition-all hover:scale-105 active:scale-95 whitespace-nowrap max-w-full"
                >
                  <Sparkles className="w-4 h-4 text-emerald-300 shrink-0" />
                  <span>Apply for a Q4 Growth Sprint</span>
                  <ArrowRight className="w-4 h-4 ml-1 shrink-0" />
                </button>
              </div>
            </section>
          </main>

          <Footer
            theme={theme}
            onToggleTheme={handleToggleTheme}
            onOpenAuditModal={() => setIsAuditModalOpen(true)}
            onOpenTeamLogin={handleOpenTeamLogin}
            scrollToSection={scrollToSection}
          />

          {/* Mobile Sticky Action Bar (Client-Facing Only) */}
          <MobileStickyBar
            onOpenAuditModal={() => setIsAuditModalOpen(true)}
            onScrollToCalculator={() => scrollToSection('calculator')}
            onScrollToCapabilities={() => scrollToSection('capabilities')}
          />

          {/* Native PWA Installation Banner */}
          <PwaInstallBanner />

          {/* Lead Audit Modal */}
          <AuditModal
            isOpen={isAuditModalOpen}
            onClose={() => setIsAuditModalOpen(false)}
            prefilledSpend={prefilledSpend}
            onLeadCreated={(lead) => handleAddLead(lead)}
            onNavigateToDashboard={() => {
              if (isAuthenticated) {
                setViewMode('dashboard');
                setDashboardTab('crm');
              } else {
                setIsAuthModalOpen(true);
              }
            }}
          />

          {/* Internal Team Authentication Gate Modal */}
          <TeamAuthModal
            isOpen={isAuthModalOpen}
            onClose={() => setIsAuthModalOpen(false)}
            onSuccess={handleAuthSuccess}
          />
        </div>
      ) : (
        /* AGENCY COMMAND CENTER DASHBOARD (Protected by Auth) */
        <div className="flex flex-col min-h-screen">
          <DashboardHeader
            currentTab={dashboardTab}
            onSelectTab={setDashboardTab}
            onBackToPublicSite={() => setViewMode('public')}
            onSignOut={handleSignOut}
            agencyData={agencyData}
            onExportData={handleExportJSON}
            onResetData={handleResetData}
            theme={theme}
            onToggleTheme={handleToggleTheme}
          />

          <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {dashboardTab === 'overview' && (
              <OverviewTab
                agencyData={agencyData}
                onNavigateToTab={(tab) => setDashboardTab(tab)}
                onOpenCreateInvoice={() => setDashboardTab('billing')}
                onOpenAddLead={() => setDashboardTab('crm')}
              />
            )}

            {dashboardTab === 'crm' && (
              <CrmPipelineTab
                leads={agencyData.leads}
                onUpdateLeadStage={handleUpdateLeadStage}
                onAddLead={handleAddLead}
                onDeleteLead={handleDeleteLead}
                onAddNoteToLead={handleAddNoteToLead}
                onConvertLeadToClient={handleConvertLeadToClient}
                onOpenCreateInvoiceForClient={handleOpenCreateInvoiceForClient}
              />
            )}

            {dashboardTab === 'billing' && (
              <BillingTab
                invoices={agencyData.invoices}
                clients={agencyData.clients}
                onAddInvoice={handleAddInvoice}
                onUpdateInvoiceStatus={handleUpdateInvoiceStatus}
                onDeleteInvoice={handleDeleteInvoice}
                prefillClientName={prefillInvoiceClientName}
                prefillClientEmail={prefillInvoiceClientEmail}
              />
            )}

            {dashboardTab === 'performance' && (
              <PerformanceHubTab
                clients={agencyData.clients}
                onUpdateClient={handleUpdateClient}
                onOpenCreateInvoiceForClient={handleOpenCreateInvoiceForClient}
              />
            )}

            {dashboardTab === 'admin' && (
              <AdminBackendTab
                agencyData={agencyData}
                onExportData={handleExportJSON}
                onResetData={handleResetData}
              />
            )}
          </main>
        </div>
      )}
    </div>
  );
}

export default App;
