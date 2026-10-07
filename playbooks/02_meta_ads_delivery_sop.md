# Meta Ads Delivery SOP: The DTC Scale Engine

## 1. Modern Account Architecture Philosophy

In the modern post-iOS14 / Andromeda AI era, **ad creative is the targeting**. Granular interest stacking and hyper-segmented lookalike audiences degrade algorithmic efficiency and inflate CPMs. 

We utilize a **Consolidated Account Structure (CAS)** with three primary campaign tiers:

```
┌─────────────────────────────────────────────────────────────┐
│                 ACCOUNT STRUCTURE SCHEMATIC                 │
├─────────────────────────────────────────────────────────────┤
│  1. Creative Sandbox (ABO Testing)                          │
│     ├── Ad Set A: Angle 1 (Problem-Agitation)               │
│     ├── Ad Set B: Angle 2 (Comparison / Us vs Them)         │
│     └── Ad Set C: Angle 3 (Social Proof / Unboxing)         │
│                                                             │
│  2. Advantage+ Shopping Campaign (ASC - Scaling Engine)     │
│     ├── Validated Winners from Sandbox (Post IDs)           │
│     └── Existing Customer Cap: 5% - 8%                      │
│                                                             │
│  3. Catalog & Retention (DPA / Advantage+ Catalog)          │
│     └── ViewContent & AddToCart (Last 14-30 Days)           │
└─────────────────────────────────────────────────────────────┘
```

---

## 2. Dynamic Creative Testing (DCT) - The 3:2:2 Method

Every single creative concept undergoes systematic statistical testing before entering the scale campaigns.

### The 3:2:2 Setup Protocol
- **Campaign Type**: Auction, Website Purchases.
- **Budgeting**: Ad Set Budget Optimization (ABO).
- **Ad Set Audience**: Broad targeting (Age, Gender if relevant, Country, No interests, No lookalikes).
- **Dynamic Creative Feature**: Enabled.
- **Asset Allocation per Ad Set**:
  - **3 Creatives**: 3 different video hooks (first 3 seconds) or 3 visually distinct static layouts.
  - **2 Primary Text Copies**: 1 short punchy copy (bullet points/offer) + 1 long-form narrative or review copy.
  - **2 Headlines**: 1 benefit-driven headline + 1 urgency/social proof headline (e.g., "Over 12,000+ Happy Customers ★★★★★").
- **Budget Rule**: Set daily ad set budget = $1.5 \times \text{Target CPA}$.
- **Test Duration**: Run for 72 hours or until the ad set generates at least 50 link clicks and \$100+ spend.

### Graduation Criteria (What Makes a "Winner"):
1. **Thumbstop Rate (3-sec video plays / Impressions)** $\ge 35\%$.
2. **Click-Through Rate (CTR Link Click)** $\ge 1.6\%$.
3. **Cost Per Unique Add To Cart (ATC)** $\le 1.2\times$ Target.
4. **Front-End ROAS** $\ge$ Break-Even ROAS threshold.

---

## 3. The Scaling Engine: Advantage+ Shopping Campaigns (ASC)

Once an ad creative graduates from the DCT Sandbox:
1. Extract the **Existing Post ID** from the winning DCT breakdown (via Facebook Page Posts in Business Manager).
2. Insert the winning Post ID into the active **Advantage+ Shopping Campaign (ASC)**.
3. This retains all accumulated social proof, comments, likes, and algorithmic conversion weight.

### Advantage+ Best Practices
- **Existing Customer Budget Cap**: Set to 5%–10% maximum to ensure 90%+ of spend is acquiring net-new first-time buyers.
- **Audience Exclusions**: Exclude past 60-day purchasers if not using ASC caps.
- **Number of Creatives**: Maintain between 8 and 15 active diverse creatives (mix of 60% UGC Video, 25% Static Carousel/Infographics, 15% Catalog).

---

## 4. Retargeting & Bottom-of-Funnel (BoF)

- Modern Meta algorithms retarget automatically through broad audiences. However, a dedicated **Dynamic Product Ad (DPA)** catalog campaign provides dedicated coverage for high-intent abandonment.
- **Catalog Campaign**: Advantage+ Catalog Ads targeting people who viewed product or added to cart in the last 14 days, excluding 30-day purchasers.
- **Offer Dynamic Overlays**: Include free shipping badge or bundle discount in creative overlay.

---

## 5. Creative Production Briefing Framework

We provide clients with weekly production briefs categorized into four core styles:

### A. The "Problem / Agitation / Solution" (PAS)
- **0:00 - 0:03 (Hook)**: Call out customer frustration directly ("Stop throwing money away on skincare that ruins your barrier").
- **0:03 - 0:15 (Agitation)**: Demonstrate the pain point or traditional failure.
- **0:15 - 0:35 (The Fix)**: Introduce client's product, key mechanism of action, before/after visual.
- **0:35 - 0:45 (Call to Action)**: Limited time bundle offer + risk-free guarantee.

### B. "Us vs. Them" Split Screen
- Side-by-side comparison between generic competitor vs. Client brand highlighting ingredient quality, build materials, or results.

### C. Press & Authority Stack
- Mashup of top press quotes (Forbes, Vogue, GQ) overlaid on aesthetic product shots with customer unboxing reactions.

---

## 6. Daily Optimization & Scaling Rules

| Scenario | Trigger | Action |
| :--- | :--- | :--- |
| **Strong Performance** | Blended MER > Target & ASC ROAS > Target over 3 days | Increase ASC budget by 15%–20% every 48 hours |
| **Creative Fatigue** | Frequency > 3.0 & CTR drops by > 25% over 7 days | Introduce 2 new graduated DCT winners into ASC; pause declining ads |
| **Underperformance** | Spend > 2x Target CPA with 0 conversions | Pause non-performing ad set in Sandbox; do not touch scaling ASC abruptly |
| **Weekend Surge** | Friday - Sunday historically higher conversions | Temporarily increase ASC budget by 15% on Friday morning, normalize Monday |
