import React, { useState } from 'react';
import { 
  ShieldCheck, Key, Server, Users, Copy, Check, Eye, EyeOff, 
  Terminal, Database, Download, RotateCcw, Activity, RefreshCw, 
  UserCheck, AlertCircle, Clock, ShieldAlert, Cpu, ArrowRight 
} from 'lucide-react';
import type { AgencyData, StaffUser, BackendAuditLog } from '../../types';
import { 
  getStaffUsers, getAuditLogs, getAuthenticatedStaffUser, 
  authenticateWithCredentials, addAuditLog 
} from '../../lib/auth';

interface AdminBackendTabProps {
  agencyData: AgencyData;
  onExportData: () => void;
  onResetData: () => void;
  onUserSwitch?: (user: StaffUser) => void;
}

export const AdminBackendTab: React.FC<AdminBackendTabProps> = ({
  agencyData,
  onExportData,
  onResetData,
  onUserSwitch,
}) => {
  const [staffList, setStaffList] = useState<StaffUser[]>(() => getStaffUsers());
  const [auditLogs, setAuditLogs] = useState<BackendAuditLog[]>(() => getAuditLogs());
  const [showPasswords, setShowPasswords] = useState<Record<string, boolean>>({});
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [activeTabSection, setActiveTabSection] = useState<'credentials' | 'backend' | 'audit'>('credentials');
  const currentUser = getAuthenticatedStaffUser();

  const togglePasswordVisibility = (userId: string) => {
    setShowPasswords((prev) => ({ ...prev, [userId]: !prev[userId] }));
  };

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleQuickSwitchUser = (user: StaffUser) => {
    const res = authenticateWithCredentials(user.email, user.password);
    if (res.success && res.user) {
      addAuditLog('QUICK_ROLE_SWITCH', `Switched active session to ${user.name} (${user.roleTitle})`, 'info', user.email);
      setAuditLogs(getAuditLogs());
      if (onUserSwitch) {
        onUserSwitch(res.user);
      } else {
        window.location.reload();
      }
    }
  };

  const refreshLogs = () => {
    setAuditLogs(getAuditLogs());
  };

  // Mock Backend REST endpoints stats
  const simulatedEndpoints = [
    { method: 'GET', path: '/api/v1/leads', description: 'Fetch all CRM pipeline leads & stage records', status: '200 OK', latency: '11ms', records: agencyData.leads.length },
    { method: 'POST', path: '/api/v1/leads', description: 'Ingest new website audit inquiries into CRM', status: '201 Created', latency: '24ms', records: '+' },
    { method: 'GET', path: '/api/v1/invoices', description: 'Query client invoices, retainers & payment states', status: '200 OK', latency: '14ms', records: agencyData.invoices.length },
    { method: 'POST', path: '/api/v1/invoices', description: 'Generate invoice with automated performance bonuses', status: '201 Created', latency: '28ms', records: '+' },
    { method: 'GET', path: '/api/v1/clients', description: 'Retrieve active retainers & ad spend allocations', status: '200 OK', latency: '8ms', records: agencyData.clients.length },
    { method: 'POST', path: '/api/v1/auth/login', description: 'Authenticate staff user with RBAC bearer token', status: '200 OK', latency: '16ms', records: staffList.length },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Top Banner: Status & Active Session Identity */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white border border-indigo-900/50 shadow-2xl relative overflow-hidden">
        <div className="absolute right-0 top-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <span className="flex h-2.5 w-2.5 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
              </span>
              <span className="text-xs font-mono font-bold tracking-wider text-emerald-400 uppercase">
                Backend API & RBAC Security Engine Online
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold font-display tracking-tight text-white">
              Admin & Credentials Control Panel
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
              Manage internal staff credentials for CRM, Invoicing & Billing, Media Buying, and inspect the backend data engine powering your agency portal.
            </p>
          </div>

          {/* Current User Session Badge */}
          <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 flex items-center space-x-3.5 shrink-0">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-indigo-500 to-emerald-400 flex items-center justify-center text-white font-extrabold text-base shadow-md">
              {currentUser?.avatar || 'SA'}
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-sm font-bold text-white">{currentUser?.name || 'Alexander Vance'}</span>
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  {currentUser?.role || 'super_admin'}
                </span>
              </div>
              <p className="text-xs text-slate-300 mt-0.5">{currentUser?.email || 'admin@vanguard.agency'}</p>
              <div className="flex items-center space-x-1.5 mt-1 text-[10px] text-emerald-400 font-mono">
                <ShieldCheck className="w-3 h-3" />
                <span>Full System Privileges</span>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Nav Sub-tabs */}
        <div className="mt-6 pt-6 border-t border-white/10 flex items-center space-x-2 overflow-x-auto">
          <button
            onClick={() => setActiveTabSection('credentials')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center space-x-2 whitespace-nowrap ${
              activeTabSection === 'credentials'
                ? 'bg-white text-slate-900 shadow-md'
                : 'text-slate-300 hover:text-white hover:bg-white/10'
            }`}
          >
            <Key className="w-3.5 h-3.5" />
            <span>Staff Credentials & Roles</span>
            <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-200">
              {staffList.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTabSection('backend')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center space-x-2 whitespace-nowrap ${
              activeTabSection === 'backend'
                ? 'bg-white text-slate-900 shadow-md'
                : 'text-slate-300 hover:text-white hover:bg-white/10'
            }`}
          >
            <Server className="w-3.5 h-3.5" />
            <span>Backend Engine & API</span>
            <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-200 font-mono">
              6 REST APIs
            </span>
          </button>

          <button
            onClick={() => setActiveTabSection('audit')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center space-x-2 whitespace-nowrap ${
              activeTabSection === 'audit'
                ? 'bg-white text-slate-900 shadow-md'
                : 'text-slate-300 hover:text-white hover:bg-white/10'
            }`}
          >
            <Clock className="w-3.5 h-3.5" />
            <span>Security & Audit Logs</span>
            <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-slate-700 text-slate-300">
              {auditLogs.length}
            </span>
          </button>
        </div>
      </div>

      {/* SECTION 1: STAFF CREDENTIALS DIRECTORY */}
      {activeTabSection === 'credentials' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white font-display flex items-center space-x-2">
                <Users className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                <span>Authorized Staff Credentials & Access Keys</span>
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                Use these pre-configured credentials to sign into the Agency Command Center via Email + Password or Quick PIN.
              </p>
            </div>

            <div className="p-2.5 rounded-xl bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800 text-xs text-indigo-900 dark:text-indigo-200 flex items-center space-x-2">
              <ShieldAlert className="w-4 h-4 text-indigo-600 dark:text-indigo-400 shrink-0" />
              <span>Master Security Override: <strong className="font-mono">vanguard2025</strong></span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {staffList.map((user) => {
              const isCurrent = currentUser?.email === user.email;
              const isPasswordShown = !!showPasswords[user.id];

              return (
                <div
                  key={user.id}
                  className={`p-6 rounded-3xl border transition-all shadow-md relative flex flex-col justify-between ${
                    isCurrent
                      ? 'bg-indigo-50/50 dark:bg-indigo-950/20 border-indigo-400 dark:border-indigo-600 ring-2 ring-indigo-500/30'
                      : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
                  }`}
                >
                  <div className="space-y-4">
                    {/* Header with Avatar and Role */}
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 rounded-2xl bg-indigo-100 dark:bg-indigo-900/60 text-indigo-700 dark:text-indigo-300 font-extrabold flex items-center justify-center text-sm shadow-inner">
                          {user.avatar}
                        </div>
                        <div>
                          <div className="flex items-center space-x-2">
                            <h4 className="font-bold text-sm text-slate-900 dark:text-white font-display">
                              {user.name}
                            </h4>
                            {isCurrent && (
                              <span className="text-[10px] bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded-full font-mono font-bold">
                                ACTIVE NOW
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-indigo-600 dark:text-indigo-400 font-semibold">{user.roleTitle}</p>
                          <span className="text-[10px] text-slate-500 dark:text-slate-400">{user.department}</span>
                        </div>
                      </div>

                      <span className="text-[11px] font-mono font-bold px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                        {user.role}
                      </span>
                    </div>

                    {/* Credentials Data Box */}
                    <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-2.5 text-xs font-mono">
                      {/* Email */}
                      <div className="flex items-center justify-between">
                        <span className="text-slate-500 dark:text-slate-400">Email:</span>
                        <div className="flex items-center space-x-1.5">
                          <span className="font-bold text-slate-900 dark:text-white select-all">{user.email}</span>
                          <button
                            onClick={() => copyToClipboard(user.email, `${user.id}-email`)}
                            className="p-1 rounded hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-700 dark:hover:text-white transition-colors"
                            title="Copy email"
                          >
                            {copiedId === `${user.id}-email` ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                          </button>
                        </div>
                      </div>

                      {/* Password */}
                      <div className="flex items-center justify-between">
                        <span className="text-slate-500 dark:text-slate-400">Password:</span>
                        <div className="flex items-center space-x-1.5">
                          <span className="font-bold text-slate-900 dark:text-white select-all">
                            {isPasswordShown ? user.password : '•••••••••••••'}
                          </span>
                          <button
                            onClick={() => togglePasswordVisibility(user.id)}
                            className="p-1 rounded hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-700 dark:hover:text-white transition-colors"
                            title={isPasswordShown ? "Hide password" : "Show password"}
                          >
                            {isPasswordShown ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                          </button>
                          <button
                            onClick={() => copyToClipboard(user.password, `${user.id}-pwd`)}
                            className="p-1 rounded hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-700 dark:hover:text-white transition-colors"
                            title="Copy password"
                          >
                            {copiedId === `${user.id}-pwd` ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                          </button>
                        </div>
                      </div>

                      {/* PIN */}
                      <div className="flex items-center justify-between">
                        <span className="text-slate-500 dark:text-slate-400">Quick PIN:</span>
                        <div className="flex items-center space-x-1.5">
                          <span className="font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                            {user.pin}
                          </span>
                          <button
                            onClick={() => copyToClipboard(user.pin, `${user.id}-pin`)}
                            className="p-1 rounded hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-700 dark:hover:text-white transition-colors"
                            title="Copy PIN"
                          >
                            {copiedId === `${user.id}-pin` ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Permissions list */}
                    <div>
                      <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block mb-1.5 font-sans">
                        RBAC Permissions:
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {user.permissions.map((perm) => (
                          <span
                            key={perm}
                            className="text-[10px] font-semibold px-2.5 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 uppercase"
                          >
                            ✓ {perm}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Quick Switch Action */}
                  <div className="pt-4 mt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                    <span className="text-[11px] text-slate-500">
                      {user.lastLogin ? `Last login: ${new Date(user.lastLogin).toLocaleDateString()}` : 'Never logged in'}
                    </span>
                    <button
                      onClick={() => handleQuickSwitchUser(user)}
                      className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 ${
                        isCurrent
                          ? 'bg-slate-100 dark:bg-slate-800 text-slate-500 cursor-default'
                          : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-md shadow-indigo-600/20 active:scale-95'
                      }`}
                      disabled={isCurrent}
                    >
                      <UserCheck className="w-3.5 h-3.5" />
                      <span>{isCurrent ? 'Current Session' : 'Quick Switch Session'}</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* SECTION 2: BACKEND ENGINE & SIMULATED REST API */}
      {activeTabSection === 'backend' && (
        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white font-display flex items-center space-x-2">
              <Cpu className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
              <span>Backend REST API Engine & Data Layer</span>
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
              Architecture specs for the simulated and standalone Node/Express backend powering CRM leads, billing invoices, and client ad metrics.
            </p>
          </div>

          {/* Database Diagnostics Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
              <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
                <span>Leads In DB</span>
                <Users className="w-4 h-4 text-blue-500" />
              </div>
              <div className="text-2xl font-black text-slate-900 dark:text-white font-mono">
                {agencyData.leads.length}
              </div>
              <span className="text-[11px] text-slate-500">Auto-persisted to LocalDB</span>
            </div>

            <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
              <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
                <span>Invoices Generated</span>
                <Database className="w-4 h-4 text-emerald-500" />
              </div>
              <div className="text-2xl font-black text-emerald-600 dark:text-emerald-400 font-mono">
                {agencyData.invoices.length}
              </div>
              <span className="text-[11px] text-slate-500">Retainer & Performance fees</span>
            </div>

            <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
              <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
                <span>Active Retainers</span>
                <Activity className="w-4 h-4 text-indigo-500" />
              </div>
              <div className="text-2xl font-black text-indigo-600 dark:text-indigo-400 font-mono">
                {agencyData.clients.filter((c) => c.status === 'active').length}
              </div>
              <span className="text-[11px] text-slate-500">Shopify DTC Brand Accounts</span>
            </div>

            <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
              <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
                <span>API Status</span>
                <Server className="w-4 h-4 text-emerald-500" />
              </div>
              <div className="text-2xl font-black text-emerald-600 dark:text-emerald-400 font-mono">
                HEALTHY
              </div>
              <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-bold">Latency: &lt; 15ms</span>
            </div>
          </div>

          {/* Simulated API Endpoints Table */}
          <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden shadow-xl">
            <div className="p-4 sm:p-5 border-b border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/50 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Terminal className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                <span className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white font-mono">
                  Active REST Endpoints (v1)
                </span>
              </div>
              <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-mono font-bold">
                CORS: Enabled • JSON Format
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 dark:bg-slate-950/80 text-slate-600 dark:text-slate-400 font-bold border-b border-slate-200 dark:border-slate-800 uppercase text-[10px] tracking-wider font-mono">
                  <tr>
                    <th className="py-3 px-5">Method</th>
                    <th className="py-3 px-5">Route Path</th>
                    <th className="py-3 px-5">Description</th>
                    <th className="py-3 px-5">Status</th>
                    <th className="py-3 px-5">Latency</th>
                    <th className="py-3 px-5 text-right">Items</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 dark:divide-slate-800 font-mono">
                  {simulatedEndpoints.map((ep, idx) => (
                    <tr key={idx} className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
                      <td className="py-3.5 px-5">
                        <span
                          className={`text-[10px] font-extrabold px-2 py-0.5 rounded ${
                            ep.method === 'GET'
                              ? 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20'
                              : 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20'
                          }`}
                        >
                          {ep.method}
                        </span>
                      </td>
                      <td className="py-3.5 px-5 font-bold text-slate-900 dark:text-white">
                        {ep.path}
                      </td>
                      <td className="py-3.5 px-5 font-sans text-slate-600 dark:text-slate-400">
                        {ep.description}
                      </td>
                      <td className="py-3.5 px-5">
                        <span className="text-emerald-600 dark:text-emerald-400 font-bold">
                          {ep.status}
                        </span>
                      </td>
                      <td className="py-3.5 px-5 text-slate-500">
                        {ep.latency}
                      </td>
                      <td className="py-3.5 px-5 text-right font-bold text-slate-900 dark:text-white">
                        {ep.records}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Database Operations Controls */}
          <div className="p-6 rounded-3xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4">
            <h4 className="text-sm font-bold text-slate-900 dark:text-white font-display">
              Database Maintenance & Migration
            </h4>
            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={onExportData}
                className="inline-flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-md shadow-indigo-600/25 transition-all"
              >
                <Download className="w-4 h-4" />
                <span>Export Entire Agency Database (JSON)</span>
              </button>

              <button
                onClick={() => {
                  if (confirm('Reset database to default seed state? All test leads and invoices will be restored to defaults.')) {
                    onResetData();
                  }
                }}
                className="inline-flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-bold text-xs transition-colors"
              >
                <RotateCcw className="w-4 h-4 text-slate-500" />
                <span>Reset Seed Data</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* SECTION 3: SECURITY & AUDIT ACTIVITY LOGS */}
      {activeTabSection === 'audit' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white font-display flex items-center space-x-2">
                <Clock className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                <span>Security Audit & Access Event Stream</span>
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                Real-time chronological ledger of authentication attempts, administrative switches, and database transactions.
              </p>
            </div>

            <button
              onClick={refreshLogs}
              className="p-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 transition-colors flex items-center space-x-1.5 text-xs font-bold"
              title="Refresh log stream"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Refresh</span>
            </button>
          </div>

          <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden shadow-xl">
            <div className="divide-y divide-slate-200 dark:divide-slate-800">
              {auditLogs.map((log) => (
                <div key={log.id} className="p-4 sm:p-5 flex items-start justify-between gap-4 text-xs hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2.5">
                      <span
                        className={`text-[10px] font-mono font-extrabold uppercase px-2 py-0.5 rounded-full border ${
                          log.status === 'success'
                            ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20'
                            : log.status === 'warning'
                            ? 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20'
                            : 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20'
                        }`}
                      >
                        {log.action}
                      </span>
                      <span className="font-bold text-slate-900 dark:text-white font-mono">{log.user}</span>
                    </div>
                    <p className="text-slate-600 dark:text-slate-300">{log.details}</p>
                  </div>

                  <span className="text-[11px] text-slate-400 font-mono shrink-0">
                    {new Date(log.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                  </span>
                </div>
              ))}

              {auditLogs.length === 0 && (
                <div className="py-12 text-center text-slate-500 text-xs">
                  No security events recorded.
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
