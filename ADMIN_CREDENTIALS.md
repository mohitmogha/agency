# 🛡️ Vanguard DTC Media — Admin Panel Access & Staff Credentials

This document provides official administrative credentials, role-based access control (RBAC) scopes, and backend integration instructions for the **Vanguard DTC Performance Marketing Agency Platform**.

---

## 🚪 How to Access the Admin Command Center

The Admin Portal is intentionally hidden from prospective client visitors on the public marketing site. Authorized staff can launch the portal via three convenient entry methods:

1. **Keyboard Shortcut**: Press `Alt + P` (or `Ctrl + Shift + P` on Windows/Linux) anywhere on the website.
2. **URL Hash Link**: Navigate to your site with `#portal` appended:  
   👉 `http://localhost:5173/#portal` (or `https://<your-username>.github.io/<repo>/#portal`)
3. **Discreet Footer Trigger**: Scroll to the footer legal section and click the **"Staff Access"** lock button.

---

## 👥 Staff Credentials Directory by Role

The platform includes 4 pre-configured role profiles. In the login modal, you can either:
- **Type Email & Password**
- **Enter Quick Security PIN**
- **Use the 1-Click Role Quick Autofill Buttons** at the top of the login modal

| # | Role & Department | Full Name | Email Address | Password | Security PIN | Permissions Scope |
|---|---|---|---|---|---|---|
| **1** | **Super Admin (Owner)**<br>*(Executive Leadership)* | Alexander Vance | `admin@vanguard.agency` | `VanguardAdmin@2025` | `7740` | **Full Access**:<br>• Executive Overview<br>• CRM & Leads<br>• Billing & Invoicing<br>• Media Buying Hub<br>• Admin & Backend Engine<br>• Full Database Export/Reset |
| **2** | **Head of CRM & Growth**<br>*(Sales & Client Acquisition)* | Marcus Brody | `crm.lead@vanguard.agency` | `GrowthScale#2025` | `crm2025` | **CRM & Growth**:<br>• 5-Stage Kanban Pipeline<br>• Lead Capture & Note Logs<br>• Convert to Retainer Client<br>• Client Ad Performance View |
| **3** | **Director of Invoicing & Billing**<br>*(Finance & Operations)* | Elena Rostova | `billing@vanguard.agency` | `FinancePro$2025` | `bill2025` | **Finance & Billing**:<br>• Invoicing Generation<br>• Retainer & Scale Fee Calculations<br>• Mark Paid & Status Tracking<br>• Browser-to-PDF Print Engine |
| **4** | **Senior Media Buying Lead**<br>*(Performance Marketing)* | Kavita Sharma | `media.buyer@vanguard.agency` | `MetaGooglePMax*2025` | `media2025` | **Media Performance**:<br>• Meta ASC & Google PMax Spend Split<br>• Blended MER & ROAS Tracking<br>• Winning Creative Angles & Hooks<br>• CRM Prospect Context |

### 🔑 Master Security Passkey Override
If you need immediate emergency administrative access without typing an email:
- **Master PIN / Passcode**: `vanguard2025` or `7740`
*(Automatically grants full Super Admin privileges)*

---

## ⚙️ Admin & Backend Panel Features

Inside the **Agency Command Center**, click the new **"Admin & Backend"** tab in the top navigation to access:

### 1. Staff Credentials Directory
- View, copy, or update credentials for all team members.
- Visual toggle to reveal passwords.
- **1-Click "Quick Switch Session"**: Switch between Super Admin, CRM Manager, Billing Director, and Media Buyer with a single tap to test permission views.

### 2. Backend REST API Engine
- Live health status: `ONLINE - Latency < 15ms`.
- REST route inspector with 6 live simulated endpoints:
  - `GET /api/v1/leads` (CRM leads pipeline)
  - `POST /api/v1/leads` (Website audit inquiries)
  - `GET /api/v1/invoices` (Client retainers & invoices)
  - `POST /api/v1/invoices` (Performance fee generator)
  - `GET /api/v1/clients` (Active DTC retainer accounts)
  - `POST /api/v1/auth/login` (Staff authentication with token)
- Database diagnostics: Counts of leads, active clients, generated invoices, and storage utilization.

### 3. Database Maintenance & Migration
- **Export Entire Agency Database (JSON)**: 1-click download of all CRM leads, clients, invoices, and settings.
- **Reset Seed Data**: 1-click reset to clean initial seed data whenever testing is complete.

### 4. Real-Time Security Audit Stream
- Chronological event ledger recording every login, failed attempt, session switch, and database change with exact timestamps and actor tags.

---

## 💻 Standalone Node.js / Express Backend (Optional)

The website is engineered to operate seamlessly as a 100% static application on **GitHub Pages** using client-side `localStorage` data persistence and a mock REST engine.

If you also wish to run a dedicated backend server on a VPS or cloud service (e.g. Render, Railway, AWS):
```bash
# 1. Navigate to the backend directory
cd backend

# 2. Install dependencies
npm install

# 3. Start the Express REST server
npm start
```
The standalone server will start at `http://localhost:5000` with full CORS support and REST endpoints matching the frontend client.
