# Vanguard DTC Agency - Backend REST API Service

This backend service powers the Vanguard DTC Agency Command Center with endpoints for:
1. **RBAC Staff Authentication** (`/api/auth/login`)
2. **CRM Pipeline & Inbound Leads** (`/api/leads`)
3. **Invoicing & Performance Billing** (`/api/invoices`)
4. **Client Retainers & Ad Performance Tracking** (`/api/clients`)
5. **Security & Audit Logs** (`/api/admin/audit-logs`)
6. **System Health Diagnostics** (`/api/health`)

---

## 🚀 Quick Start (Local Setup)

### 1. Install Dependencies
```bash
cd backend
npm install
```

### 2. Run the Backend API Server
```bash
npm start
```
By default, the server runs on `http://localhost:5000`.

To run with live reload during development:
```bash
npm run dev
```

---

## 📡 API Endpoints Reference

### Authentication & Staff Access
| Method | Route | Description |
|---|---|---|
| `POST` | `/api/auth/login` | Authenticate staff member via email+password or PIN |
| `GET` | `/api/admin/staff` | Retrieve all registered staff profiles and permissions |
| `GET` | `/api/admin/audit-logs` | Retrieve real-time security and operational event logs |

### CRM & Leads
| Method | Route | Description |
|---|---|---|
| `GET` | `/api/leads` | Retrieve all CRM prospects across all pipeline stages |
| `POST` | `/api/leads` | Create or ingest a new website audit inquiry |
| `PATCH` | `/api/leads/:id` | Update lead stage, notes, or contact info |
| `DELETE` | `/api/leads/:id` | Remove a lead from the pipeline |

### Invoicing & Billing
| Method | Route | Description |
|---|---|---|
| `GET` | `/api/invoices` | List all client retainers and performance fee invoices |
| `POST` | `/api/invoices` | Generate a new invoice with line items and fee calculation |
| `PATCH` | `/api/invoices/:id` | Update payment status (`draft`, `sent`, `paid`, `overdue`) |
| `DELETE` | `/api/invoices/:id` | Delete an invoice |

### Client Retainers & Performance
| Method | Route | Description |
|---|---|---|
| `GET` | `/api/clients` | Retrieve all active Shopify DTC clients and MER targets |
| `PATCH` | `/api/clients/:id` | Update client ad spend, revenue, and creative angles |

### System Health
| Method | Route | Description |
|---|---|---|
| `GET` | `/api/health` | Check service uptime, latency, and database record counts |

---

## 🛡️ Default Staff Credentials

| Role | Name | Email | Password | PIN |
|---|---|---|---|---|
| **Super Admin** | Alexander Vance | `admin@vanguard.agency` | `VanguardAdmin@2025` | `7740` |
| **CRM Manager** | Marcus Brody | `crm.lead@vanguard.agency` | `GrowthScale#2025` | `crm2025` |
| **Billing Director** | Elena Rostova | `billing@vanguard.agency` | `FinancePro$2025` | `bill2025` |
| **Media Buying Lead** | Kavita Sharma | `media.buyer@vanguard.agency` | `MetaGooglePMax*2025` | `media2025` |

**Master Security Key**: `vanguard2025`
