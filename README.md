# Vanguard DTC | E-Commerce Performance Marketing Agency

An institutional-grade digital marketing agency system and web platform specializing in **Meta Ads (Facebook & Instagram)** and **Google Ads (PMax & Search)** exclusively for **Shopify E-Commerce & Direct-to-Consumer (DTC) brands**.

Includes complete **operational SOP playbooks**, **client onboarding audit templates**, **legal client agreements**, and a production-ready **Vite + React + Tailwind CSS web platform** featuring an **interactive ROAS simulator**, **lead intake funnel**, and full **Agency Command Center (CRM Pipeline & Billing/Invoicing Engine)** ready to deploy to **GitHub Pages**.

---

## 📁 Repository Structure

```
Agency/
├── .github/
│   └── workflows/
│       └── deploy.yml                       # Automated GitHub Pages CI/CD workflow
├── ADMIN_CREDENTIALS.md                     # Official staff credentials, PINs & RBAC access guide
├── backend/                                 # Standalone Node.js / Express REST API Backend
│   ├── server.js                            # Express REST endpoints (Auth, CRM, Invoices, Health)
│   ├── package.json                         # Backend dependencies
│   ├── .env.example                         # Environment config
│   └── README.md
├── playbooks/                               # Operational Service Delivery SOPs
│   ├── 01_agency_positioning_and_offer.md   # Positioning, ICP, pricing tiers & guarantees
│   ├── 02_meta_ads_delivery_sop.md          # 3:2:2 Dynamic Creative Testing & ASC scaling
│   ├── 03_google_ads_delivery_sop.md        # PMax SKU margin labels, Shopping & Brand defense
│   ├── 04_tracking_and_attribution_stack.md # Meta CAPI (EMQ > 8.5), GA4 & Blended MER
│   └── 05_client_acquisition_and_sales.md   # Loom video audit script & 2-call closing system
├── templates/                               # Contracts & Diagnostic Checklists
│   ├── client_onboarding_audit_checklist.md # 45-point e-commerce diagnostic inspection
│   └── agency_client_agreement.md           # Master Services Agreement (MSA) + SOW
└── website/                                 # Vite + React + Tailwind + PWA (GitHub Pages)
    ├── src/
    │   ├── components/
    │   │   ├── public/                      # Landing page, Hero, ROAS simulator, PWA banner
    │   │   └── dashboard/                   # CRM Kanban, Billing, Ad tracker, Admin & Backend
    │   ├── lib/
    │   │   ├── auth.ts                      # Staff RBAC authentication & audit logging
    │   │   ├── pwa.ts                       # PWA install prompt & service worker handlers
    │   │   ├── storage.ts                   # LocalStorage persistence & JSON export/backup
    │   │   └── theme.ts                     # Dark / Light theme synchronization
    │   ├── types/
    │   │   └── index.ts                     # TypeScript definitions for CRM, Billing & RBAC
    │   ├── App.tsx                          # Core application state & routing
    │   └── main.tsx
    ├── vite.config.ts                       # Configured with base: './' for GitHub Pages
    └── package.json
```

---

## 🚀 Quick Start (Local Development)

### 1. Run Website Locally
```powershell
cd c:\Users\hp-pc\Documents\Agency\website
npm run dev
```
Open `http://localhost:5173` to test the public agency website, the interactive ROAS calculator, the audit booking modal, and the Agency Command Center.

### 2. Build for Production / GitHub Pages
```powershell
cd c:\Users\hp-pc\Documents\Agency\website
npm run build
```
This compiles a 100% static build into `website/dist/` with relative asset links (`base: './'`).

---

## 🌐 Deploying to GitHub Pages ($0 Forever)

1. Create a new repository on your GitHub account (e.g., `agency-platform`).
2. Initialize git and push this repository:
   ```powershell
   cd c:\Users\hp-pc\Documents\Agency
   git init
   git add .
   git commit -m "feat: complete agency playbooks, CRM and billing platform"
   git branch -M main
   git remote add origin https://github.com/<YOUR-USERNAME>/<YOUR-REPO-NAME>.git
   git push -u origin main
   ```
3. In your GitHub repository:
   - Go to **Settings** $\rightarrow$ **Pages**.
   - Under **Build and deployment** > **Source**, select **GitHub Actions**.
4. The workflow in `.github/workflows/deploy.yml` will automatically build the site and publish it to:
   `https://<YOUR-USERNAME>.github.io/<YOUR-REPO-NAME>/`

---

## 💼 Agency Features Included

### 1. Public High-Converting Agency Presence
- **Interactive DTC Scale & ROAS Simulator**: Prospective clients move sliders for Ad Spend (\$5k–\$100k), AOV, Current ROAS, and Gross Margin to calculate exact potential revenue and profit increases.
- **Service Architecture**: Meta Advantage+ Shopping, 3:2:2 Dynamic Creative Testing, Google PMax Custom Labels, and Server-Side CAPI.
- **Case Study Teardowns**: Verified scaling metrics (e.g., LuxeSwim \$38k to \$226k/mo at 4.2x MER).
- **Interactive 45-Point Audit Request**: Multi-step lead capture funnel that automatically saves prospects into your local CRM database.

### 2. Agency Command Center (Dashboard)
- **Executive Overview**: Real-time Monthly Recurring Revenue (MRR), total managed ad spend, portfolio blended MER, and outstanding receivables.
- **5-Stage CRM Kanban Pipeline**:
  - Stages: `New Leads` $\rightarrow$ `Audit Scheduled` $\rightarrow$ `Proposal Sent` $\rightarrow$ `Active Retainer` $\rightarrow$ `Archived/Lost`.
  - Drag or click to advance leads, log discovery call notes, or convert leads into active clients with one click.
- **Billing & Invoicing Engine**:
  - Automatically calculates Retainer + Performance Bonus (% of spend above agreed baseline).
  - Track invoice statuses: `Draft`, `Sent`, `Paid`, `Overdue`.
  - Interactive **Printable / PDF Invoice Generator**: Clean `@media print` design with agency branding, itemized tables, payment terms, and wire/ACH instructions.
- **Client Ad Performance Hub**:
  - Multi-brand dashboard comparing Meta Spend vs. Google Spend, target ROAS vs. actual MER, and top-performing creative angles.
- **Data Safety & Portability**:
  - Stored persistently in browser `localStorage`.
  - **JSON Export / Backup**: 1-click download of all leads, client records, and invoices anytime.
