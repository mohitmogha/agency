import React, { useState } from 'react';
import { 
  Lock, Shield, KeyRound, AlertCircle, ArrowRight, X, 
  CheckCircle2, Mail, Users, Sparkles, Eye, EyeOff 
} from 'lucide-react';
import { 
  authenticateWithCredentials, verifyTeamPasscode, 
  DEFAULT_STAFF_USERS, getStaffUsers 
} from '../../lib/auth';
import type { StaffUser } from '../../types';

interface TeamAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export const TeamAuthModal: React.FC<TeamAuthModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
}) => {
  const [authMode, setAuthMode] = useState<'password' | 'pin'>('password');
  const [email, setEmail] = useState('admin@vanguard.agency');
  const [password, setPassword] = useState('VanguardAdmin@2025');
  const [pin, setPin] = useState('7740');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [authenticatedRole, setAuthenticatedRole] = useState<string>('Super Admin');

  if (!isOpen) return null;

  const staffUsers = getStaffUsers();

  const handleSelectPreconfiguredUser = (u: StaffUser) => {
    setEmail(u.email);
    setPassword(u.password);
    setPin(u.pin);
    setError(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (authMode === 'password') {
      if (!email.trim() || !password.trim()) {
        setError('Please enter both your email address and password.');
        return;
      }

      const result = authenticateWithCredentials(email, password);
      if (result.success && result.user) {
        setIsSuccess(true);
        setAuthenticatedRole(result.user.roleTitle);
        setTimeout(() => {
          setIsSuccess(false);
          onSuccess();
          onClose();
        }, 600);
      } else {
        setError(result.error || 'Invalid credentials. Please verify your email and password.');
      }
    } else {
      // PIN Mode
      if (!pin.trim()) {
        setError('Please enter your security PIN or master passkey.');
        return;
      }

      const verified = verifyTeamPasscode(pin, email);
      if (verified) {
        setIsSuccess(true);
        setTimeout(() => {
          setIsSuccess(false);
          onSuccess();
          onClose();
        }, 600);
      } else {
        setError('Invalid security PIN. Try 7740, crm2025, bill2025, or vanguard2025.');
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg rounded-3xl bg-white dark:bg-[#0E131F] border border-slate-200 dark:border-slate-800 shadow-2xl p-6 sm:p-8 space-y-6 text-slate-900 dark:text-white max-h-[92vh] overflow-y-auto">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-slate-700 dark:hover:text-white p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="text-center space-y-2">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-indigo-600 to-emerald-500 p-[2px] mx-auto shadow-lg shadow-indigo-500/20">
            <div className="w-full h-full bg-white dark:bg-[#0B0F19] rounded-[14px] flex items-center justify-center">
              {isSuccess ? (
                <CheckCircle2 className="w-7 h-7 text-emerald-500 animate-in zoom-in" />
              ) : (
                <Lock className="w-7 h-7 text-indigo-600 dark:text-indigo-400" />
              )}
            </div>
          </div>
          <div className="inline-flex items-center space-x-1 px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800/80 text-[11px] font-bold text-slate-700 dark:text-slate-300 font-mono">
            <Shield className="w-3.5 h-3.5 text-indigo-500" />
            <span>Restricted Agency Portal & Backend Access</span>
          </div>
          <h3 className="text-2xl font-bold font-display tracking-tight text-slate-900 dark:text-white">
            Agency Command Center
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
            Authorized personnel only. Enter staff credentials or select a pre-configured role below.
          </p>
        </div>

        {/* 1-Click Role Quick Autofill Bar */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 font-mono">
            <span>Quick Autofill by Role:</span>
            <span className="text-indigo-600 dark:text-indigo-400">1-Click</span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5">
            {staffUsers.map((u) => {
              const isSelected = email === u.email;
              return (
                <button
                  key={u.id}
                  type="button"
                  onClick={() => handleSelectPreconfiguredUser(u)}
                  className={`p-2 rounded-xl text-left border transition-all text-xs ${
                    isSelected
                      ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm'
                      : 'bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-indigo-400'
                  }`}
                >
                  <div className="font-bold truncate text-[11px]">{u.name.split(' ')[0]}</div>
                  <div className={`text-[9px] uppercase font-mono truncate ${isSelected ? 'text-indigo-100' : 'text-slate-500 dark:text-slate-400'}`}>
                    {u.role.replace('_', ' ')}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Auth Mode Toggle (Password vs Quick PIN) */}
        <div className="flex rounded-xl bg-slate-100 dark:bg-slate-900 p-1 border border-slate-200 dark:border-slate-800 text-xs font-bold">
          <button
            type="button"
            onClick={() => setAuthMode('password')}
            className={`flex-1 py-2 rounded-lg transition-all ${
              authMode === 'password'
                ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-sm'
                : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Email & Password
          </button>
          <button
            type="button"
            onClick={() => setAuthMode('pin')}
            className={`flex-1 py-2 rounded-lg transition-all ${
              authMode === 'pin'
                ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-sm'
                : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Quick Security PIN
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          {error && (
            <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-600 dark:text-rose-400 flex items-center space-x-2 animate-in shake duration-200">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span className="font-medium">{error}</span>
            </div>
          )}

          {authMode === 'password' ? (
            <>
              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-bold mb-1.5 uppercase tracking-wider text-[11px]">
                  Staff Business Email *
                </label>
                <div className="relative">
                  <input
                    type="email"
                    required
                    placeholder="e.g. admin@vanguard.agency"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 pl-10 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 text-xs transition-colors"
                  />
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5 pointer-events-none" />
                </div>
              </div>

              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-bold mb-1.5 uppercase tracking-wider text-[11px]">
                  Password *
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    placeholder="Enter account password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-3 pl-10 pr-10 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 text-xs font-mono transition-colors"
                  />
                  <KeyRound className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5 pointer-events-none" />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-3 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div>
              <label className="block text-slate-700 dark:text-slate-300 font-bold mb-1.5 uppercase tracking-wider text-[11px]">
                Security Key / PIN *
              </label>
              <div className="relative">
                <input
                  type="password"
                  required
                  autoFocus
                  placeholder="Enter PIN (e.g. 7740, crm2025, or vanguard2025)"
                  value={pin}
                  onChange={(e) => setPin(e.target.value)}
                  className="w-full px-4 py-3 pl-10 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 font-mono text-sm tracking-wider transition-colors"
                />
                <KeyRound className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5 pointer-events-none" />
              </div>
              <p className="text-[10px] text-slate-500 mt-1">
                Accepted: Staff PINs (<code className="text-indigo-600 dark:text-indigo-400">7740</code>, <code className="text-indigo-600 dark:text-indigo-400">crm2025</code>, <code className="text-indigo-600 dark:text-indigo-400">bill2025</code>, <code className="text-indigo-600 dark:text-indigo-400">media2025</code>) or master key <code className="text-indigo-600 dark:text-indigo-400">vanguard2025</code>.
              </p>
            </div>
          )}

          <button
            type="submit"
            disabled={isSuccess}
            className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-600 active:scale-95 text-white font-extrabold text-xs shadow-lg shadow-indigo-600/30 transition-all flex items-center justify-center space-x-2"
          >
            {isSuccess ? (
              <>
                <CheckCircle2 className="w-4 h-4 text-white animate-spin" />
                <span>Access Granted: {authenticatedRole}...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 text-emerald-300" />
                <span>Authenticate & Launch Admin Panel</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};
