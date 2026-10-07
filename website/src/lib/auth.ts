// Team Authentication & RBAC Service for Internal Agency Portal & Backend
import type { StaffUser, UserRole, BackendAuditLog } from '../types';

const AUTH_KEY = 'vanguard_internal_team_auth';
const AUDIT_LOG_KEY = 'vanguard_backend_audit_logs';
const STAFF_USERS_KEY = 'vanguard_staff_users_directory';

export interface AuthState {
  isAuthenticated: boolean;
  userEmail?: string;
  authenticatedAt?: string;
  user?: StaffUser;
}

// Default pre-configured staff credentials directory
export const DEFAULT_STAFF_USERS: StaffUser[] = [
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
];

const MASTER_OVERRIDE_PASSCODES = ['vanguard2025', '7740', 'scale2025', 'admin@vanguard'];

// Load staff users from localStorage or initialize with defaults
export function getStaffUsers(): StaffUser[] {
  if (typeof window === 'undefined') return DEFAULT_STAFF_USERS;
  try {
    const raw = localStorage.getItem(STAFF_USERS_KEY);
    if (!raw) {
      localStorage.setItem(STAFF_USERS_KEY, JSON.stringify(DEFAULT_STAFF_USERS));
      return DEFAULT_STAFF_USERS;
    }
    return JSON.parse(raw) as StaffUser[];
  } catch {
    return DEFAULT_STAFF_USERS;
  }
}

export function saveStaffUsers(users: StaffUser[]): void {
  if (typeof window !== 'undefined') {
    localStorage.setItem(STAFF_USERS_KEY, JSON.stringify(users));
  }
}

// Audit logging
export function getAuditLogs(): BackendAuditLog[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(AUDIT_LOG_KEY);
    if (!raw) {
      const initialLogs: BackendAuditLog[] = [
        {
          id: 'log-seed-1',
          timestamp: new Date(Date.now() - 3600000 * 2).toISOString(),
          user: 'System Backend Engine',
          action: 'DATABASE_INITIALIZATION',
          details: 'Initialized seed CRM leads, retainers, and performance metrics.',
          status: 'info',
        },
        {
          id: 'log-seed-2',
          timestamp: new Date(Date.now() - 1800000).toISOString(),
          user: 'System Security Gateway',
          action: 'RBAC_POLICIES_ENFORCED',
          details: 'Loaded 4 staff credential profiles with granular permission scopes.',
          status: 'success',
        },
      ];
      localStorage.setItem(AUDIT_LOG_KEY, JSON.stringify(initialLogs));
      return initialLogs;
    }
    return JSON.parse(raw) as BackendAuditLog[];
  } catch {
    return [];
  }
}

export function addAuditLog(
  action: string,
  details: string,
  status: 'success' | 'warning' | 'info' = 'info',
  user?: string
): void {
  if (typeof window === 'undefined') return;
  try {
    const logs = getAuditLogs();
    const currentUser = user || getAuthenticatedUser();
    const newLog: BackendAuditLog = {
      id: `log-${Date.now()}`,
      timestamp: new Date().toISOString(),
      user: currentUser,
      action,
      details,
      status,
    };
    const updated = [newLog, ...logs].slice(0, 50); // keep recent 50
    localStorage.setItem(AUDIT_LOG_KEY, JSON.stringify(updated));
  } catch {
    // Fail silently in non-browser env
  }
}

// Session state
export function isTeamAuthenticated(): boolean {
  if (typeof window === 'undefined') return false;
  try {
    const stored = localStorage.getItem(AUTH_KEY);
    if (!stored) return false;
    const parsed = JSON.parse(stored) as AuthState;
    return !!parsed.isAuthenticated;
  } catch {
    return false;
  }
}

export function getAuthenticatedStaffUser(): StaffUser | null {
  if (typeof window === 'undefined') return null;
  try {
    const stored = localStorage.getItem(AUTH_KEY);
    if (!stored) return null;
    const parsed = JSON.parse(stored) as AuthState;
    return parsed.user || null;
  } catch {
    return null;
  }
}

export function getAuthenticatedUser(): string {
  const staff = getAuthenticatedStaffUser();
  if (staff) return `${staff.name} (${staff.roleTitle})`;
  if (typeof window === 'undefined') return 'Team Member';
  try {
    const stored = localStorage.getItem(AUTH_KEY);
    if (!stored) return 'Team Member';
    const parsed = JSON.parse(stored) as AuthState;
    return parsed.userEmail || 'Team Member';
  } catch {
    return 'Team Member';
  }
}

// Authenticate via Email + Password
export function authenticateWithCredentials(email: string, password: string): { success: boolean; user?: StaffUser; error?: string } {
  const users = getStaffUsers();
  const normalizedEmail = email.trim().toLowerCase();
  const matched = users.find((u) => u.email.toLowerCase() === normalizedEmail && u.password === password);

  if (matched) {
    const now = new Date().toISOString();
    matched.lastLogin = now;
    saveStaffUsers(users.map((u) => (u.id === matched.id ? matched : u)));

    const authData: AuthState = {
      isAuthenticated: true,
      userEmail: matched.email,
      authenticatedAt: now,
      user: matched,
    };
    localStorage.setItem(AUTH_KEY, JSON.stringify(authData));
    addAuditLog('STAFF_LOGIN_SUCCESS', `User ${matched.name} logged in with role ${matched.role}.`, 'success', matched.email);
    return { success: true, user: matched };
  }

  addAuditLog('STAFF_LOGIN_FAILED', `Failed credential authentication attempt for email: ${email}`, 'warning', email);
  return { success: false, error: 'Invalid email address or password. Please verify credentials.' };
}

// Authenticate via Security PIN or Master Key (Preserves legacy support)
export function verifyTeamPasscode(passcode: string, email?: string): boolean {
  const normalized = passcode.trim().toLowerCase();
  const users = getStaffUsers();

  // Check individual staff PINs first
  const staffMatch = users.find(
    (u) => u.pin.toLowerCase() === normalized || (email && u.email.toLowerCase() === email.trim().toLowerCase() && u.pin.toLowerCase() === normalized)
  );

  if (staffMatch) {
    const authData: AuthState = {
      isAuthenticated: true,
      userEmail: staffMatch.email,
      authenticatedAt: new Date().toISOString(),
      user: staffMatch,
    };
    localStorage.setItem(AUTH_KEY, JSON.stringify(authData));
    addAuditLog('STAFF_PIN_LOGIN', `${staffMatch.name} signed in using PIN. Role: ${staffMatch.roleTitle}`, 'success', staffMatch.email);
    return true;
  }

  // Check master keys (maps to Super Admin Alexander Vance)
  const isMasterKey = MASTER_OVERRIDE_PASSCODES.some((p) => p.toLowerCase() === normalized);
  if (isMasterKey) {
    const superAdmin = users.find((u) => u.role === 'super_admin') || DEFAULT_STAFF_USERS[0];
    const authData: AuthState = {
      isAuthenticated: true,
      userEmail: email?.trim() || superAdmin.email,
      authenticatedAt: new Date().toISOString(),
      user: superAdmin,
    };
    localStorage.setItem(AUTH_KEY, JSON.stringify(authData));
    addAuditLog('MASTER_KEY_LOGIN', `Authorized access granted via master security key (${normalized}).`, 'success', superAdmin.email);
    return true;
  }

  addAuditLog('INVALID_AUTH_ATTEMPT', `Failed access attempt with security key: ${passcode}`, 'warning');
  return false;
}

export function logoutTeam(): void {
  const currentUser = getAuthenticatedUser();
  if (typeof window !== 'undefined') {
    localStorage.removeItem(AUTH_KEY);
    addAuditLog('STAFF_LOGOUT', `User ${currentUser} signed out of Command Center.`, 'info', currentUser);
  }
}
