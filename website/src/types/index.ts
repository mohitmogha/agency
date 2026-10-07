export type PipelineStage = 
  | 'new_lead' 
  | 'audit_scheduled' 
  | 'proposal_sent' 
  | 'active_client' 
  | 'churned';

export interface Lead {
  id: string;
  brandName: string;
  websiteUrl: string;
  contactName: string;
  email: string;
  phone?: string;
  monthlySpend: number;
  category: string;
  primaryBottleneck: string;
  stage: PipelineStage;
  notes: string[];
  createdAt: string;
}

export interface Client {
  id: string;
  brandName: string;
  websiteUrl: string;
  contactName: string;
  email: string;
  monthlyRetainer: number;
  performanceFeePercent: number; // e.g. 6%
  spendBaseline: number; // e.g. $25,000
  currentSpend: number;
  metaSpend: number;
  googleSpend: number;
  currentRevenue: number;
  blendedMER: number;
  targetROAS: number;
  topCreativeAngle: string;
  status: 'active' | 'paused' | 'offboarded';
  joinedDate: string;
}

export interface InvoiceLineItem {
  id: string;
  description: string;
  quantity: number;
  rate: number;
  amount: number;
}

export type InvoiceStatus = 'draft' | 'sent' | 'paid' | 'overdue';

export interface Invoice {
  id: string;
  invoiceNumber: string;
  clientId: string;
  clientName: string;
  clientEmail: string;
  issueDate: string;
  dueDate: string;
  billingType: 'fixed_retainer' | 'performance_hybrid' | 'one_time';
  baseRetainer: number;
  spendManaged?: number;
  performanceFeePercent?: number;
  performanceBonus?: number;
  lineItems: InvoiceLineItem[];
  subtotal: number;
  taxPercent: number;
  taxAmount: number;
  discountAmount: number;
  totalAmount: number;
  status: InvoiceStatus;
  paymentNotes?: string;
  paidDate?: string;
}

export interface AgencyData {
  leads: Lead[];
  clients: Client[];
  invoices: Invoice[];
}

export type UserRole = 'super_admin' | 'crm_manager' | 'billing_manager' | 'performance_lead';

export interface StaffUser {
  id: string;
  name: string;
  email: string;
  password: string;
  pin: string;
  role: UserRole;
  roleTitle: string;
  department: string;
  avatar: string;
  permissions: ('crm' | 'billing' | 'performance' | 'admin')[];
  lastLogin?: string;
}

export interface BackendAuditLog {
  id: string;
  timestamp: string;
  user: string;
  action: string;
  details: string;
  status: 'success' | 'warning' | 'info';
}
