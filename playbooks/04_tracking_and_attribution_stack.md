# Tracking, Attribution & Analytics Infrastructure Playbook

## 1. The Attribution Crisis & The Solution

Ever since Apple's iOS 14.5 ATT framework and browser cookie restrictions, client-side browser pixels (Meta Pixel, Google Tag) lose up to 35%–50% of real purchase signals. 

Without clean data:
- Ad platforms cannot train their AI algorithms to find high-value purchasers.
- Retargeting audience pools shrink by 60%+.
- Ad managers misattribute revenue and scale the wrong ad creatives.

Our agency deploys a **First-Party Server-Side Tracking Stack** to eliminate signal loss and maintain 90%+ data fidelity.

---

## 2. Meta Conversions API (CAPI) Standard

Every onboarding client must have Meta CAPI active with an **Event Match Quality (EMQ) score $\ge 8.0 / 10$**.

```
┌─────────────────────────────────────────────────────────────┐
│                 DUAL-PIXEL & CAPI DATA FLOW                 │
├─────────────────────────────────────────────────────────────┤
│  Client Shopify Store                                       │
│     ├── 1. Browser Event (Meta Pixel JS)                    │
│     │      └── Unique Event ID: purchase_10482              │
│     │                                                       │
│     └── 2. Server Event (Shopify Server -> Meta Graph API)  │
│            └── Unique Event ID: purchase_10482              │
│            └── Hashed Customer Email, Phone, IP, User Agent │
│                                                             │
│  Meta Graph Ingestion Engine                                │
│     └── Deduplicates via Event ID                           │
│     └── Matches 92%+ of purchases back to exact ad click!   │
└─────────────────────────────────────────────────────────────┘
```

### Critical CAPI Parameters Checklist:
- `event_id`: Unique transaction token sent simultaneously on browser and server events for deduplication.
- `em`: SHA256 hashed customer email.
- `ph`: SHA256 hashed phone number in E.164 format.
- `fbp`: First-party Facebook browser cookie.
- `fbc`: Facebook click ID (captured from URL parameter `fbclid`).
- `client_ip_address` & `client_user_agent`.

---

## 3. Google Analytics 4 (GA4) & Server-Side GTM

### E-Commerce Events Required:
1. `view_item_list` (Collection / Catalog view).
2. `view_item` (Product detail page).
3. `add_to_cart` (Cart increment).
4. `begin_checkout` (Initiate checkout).
5. `add_shipping_info` & `add_payment_info`.
6. `purchase` (Transaction with order ID, currency, value, tax, shipping, and item SKU array).

### Cross-Domain & Shopify Checkout Tracking:
- Configure GA4 measurement ID inside Shopify Customer Events or Google & YouTube channel app.
- Set up referral exclusions for payment gateways (e.g., `paypal.com`, `pay.shopify.com`, `stripe.com`) so organic checkout redirects do not overwrite the original paid acquisition source.

---

## 4. The Blended Performance Metrics Framework

In omnichannel marketing, platform-reported ROAS will always double-count conversions (Meta will claim a purchase and Google will also claim the same purchase). 

Therefore, our agency makes budget decisions based on **Single Source of Truth Blended Metrics**:

### Core Formulas:

$$1.\ \text{Marketing Efficiency Ratio (MER)} = \frac{\text{Total Store Net Revenue}}{\text{Total Combined Ad Spend (Meta + Google)}}$$

$$2.\ \text{Customer Acquisition Cost (Blended CAC)} = \frac{\text{Total Combined Ad Spend}}{\text{Total First-Time Customers Acquired}}$$

$$3.\ \text{Net Contribution Margin (Contribution Margin Dollars)} = \text{Net Revenue} - \text{COGS} - \text{Total Ad Spend} - \text{Pick/Pack/Shipping}$$

### Scalability Benchmark Table:

| Gross Margin | Minimum Break-Even MER | Target Scaling MER | Aggressive Scale MER |
| :---: | :---: | :---: | :---: |
| **80%** | 1.45x | 2.50x – 3.20x | 3.50x+ |
| **70%** | 1.65x | 2.80x – 3.60x | 4.00x+ |
| **60%** | 1.95x | 3.30x – 4.20x | 4.50x+ |

---

## 5. Third-Party Attribution Tools (Triple Whale / Northbeam)

For clients spending over \$25,000/month:
- Integrate **Triple Whale** or **Northbeam** for first-party click tracking pixel (Triple Pixel).
- Use **Linear / First-Click attribution** to identify which top-of-funnel Meta ads initially introduced the customer, and **Last-Click attribution** on Google Ads to see which search queries closed the sale.
