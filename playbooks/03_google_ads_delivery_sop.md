# Google Ads Delivery SOP: Intent Capture & PMax Scaling

## 1. Omnichannel Google Ads Philosophy for DTC

While Meta Ads excels at **demand generation** (interrupting users with irresistible creative), Google Ads excels at **demand capture** (harvesting active purchase intent when consumers search for solutions, categories, or specific products).

For a scalable Shopify DTC brand, our Google Ads architecture operates across three synchronized tiers:

```
┌─────────────────────────────────────────────────────────────┐
│                 GOOGLE ADS DTC ARCHITECTURE                 │
├─────────────────────────────────────────────────────────────┤
│  1. Performance Max (PMax) - Scaled Shopping Engine         │
│     ├── Hero SKUs / High Margin Assets                      │
│     ├── Core Catalog Asset Groups (Audience Signals)        │
│     └── Feed-Only Catch-All Asset Group (Low Cost)          │
│                                                             │
│  2. High-Intent Non-Brand Search Campaigns                  │
│     ├── Problem-Solving Queries (Exact / Phrase)            │
│     └── Category / Product Category Terms                   │
│                                                             │
│  3. Brand Protection Campaign                               │
│     └── Exact Match Brand Keywords (Defend Organic Top Spot)│
└─────────────────────────────────────────────────────────────┘
```

---

## 2. Google Merchant Center (GMC) & Product Feed Optimization

80% of Google Shopping and PMax performance is dictated by **Product Feed Quality**. Before launching ad campaigns, we optimize the client's feed:

### Feed Optimization Standards:
1. **Product Titles**: Follow the algorithmic hierarchy:
   $$\text{[Brand]} + \text{[Gender/Fit]} + \text{[Product Type]} + \text{[Key Feature/Material]} + \text{[Color/Size/SKU]}$$
   *Example*: `Apex Wear Men's Merino Wool Waterproof Hiking Jacket - Olive Green (L)`
2. **Product Categories**: Map precisely to the deepest Google Product Category (GPC) taxonomy rather than generic top-level IDs.
3. **Product Types**: Use custom breadcrumb paths (`Clothing > Men > Outerwear > Jackets`).
4. **Custom Labels Architecture**:
   - `custom_label_0` (Profit Margin): `High-Margin (>75%)` | `Med-Margin (60-74%)` | `Low-Margin (<60%)`.
   - `custom_label_1` (Sales Velocity): `Hero-Bestseller` | `Steady-Seller` | `Slow-Mover`.
   - `custom_label_2` (Seasonality/Status): `Core-All-Year` | `Summer` | `Holiday` | `Clearance`.

---

## 3. Performance Max (PMax) Campaign Structure

### Campaign Segmentation:
- **Campaign 1: PMax Hero Products**: Top 20% SKUs driving 80% of store revenue. Given 70% of total Google ad budget with aggressive ROAS targets.
- **Campaign 2: PMax Catalog Coverage**: Remainder of product catalog with a conservative tROAS to discover hidden winners.
- **Campaign 3 (Optional): PMax Feed-Only (Zombie Campaign)**: An asset group with NO headlines, descriptions, or images (Shopping feed only) to capture ultra-low CPC shopping clicks without cannibalizing YouTube/Display.

### Asset Group & Audience Signals:
- High-quality 1:1, 16:9, and 9:16 lifestyle assets + 15 to 30 second vertical video assets.
- **Audience Signals**:
  - Customer Match: Upload active customer list (minimum 1,000 hashed emails).
  - High-Intent Custom Segments: Search terms people have searched on Google (top 15 competitor brand names, top industry queries).
  - In-Market & Affinity Audiences matching product vertical.

---

## 4. Search Campaigns: High-Intent Capture & Brand Defense

### Non-Brand Search:
- Focused exclusively on **Problem & Solution intent** where consumers are actively comparing products.
- Match Types: Exact Match (`[buy merino wool jacket]`) and Phrase Match (`"best waterproof hiking jacket"`).
- Single Theme Ad Groups (STAG) to maintain 9/10+ Quality Scores.
- Negative Keyword Master List: Exclude terms like `free`, `wholesale`, `jobs`, `cheap`, `diy`, `how to make`, `returns`.

### Brand Search Defense:
- Exact match client brand name and core misspellings.
- Manual CPC or Maximize Clicks with bid cap (\$0.20 – \$0.50).
- Prevents competitors from bidding on brand name and stealing 15%–30% of organic customer search volume.

---

## 5. Bid Strategy & Scaling Protocol

1. **Phase 1 (Learning - Days 1 to 14)**:
   - Start with **Maximize Conversions** (or Maximize Conversion Value without tROAS) to build at least 30 conversions in 30 days.
2. **Phase 2 (Optimization - Days 15 to 45)**:
   - Set **Maximize Conversion Value with target ROAS (tROAS)**.
   - Initial tROAS = Average historical ROAS of the past 14 days minus 10% (gives room to bid aggressively).
3. **Phase 3 (Scaling)**:
   - To increase volume and spend: Lower tROAS by 10%–15%.
   - To improve efficiency and margins: Increase tROAS by 10%–15%.
