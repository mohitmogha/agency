import React from 'react';
import { Layers, Zap, ShoppingBag, Database, Check, ArrowUpRight } from 'lucide-react';

export const Services: React.FC = () => {
  return (
    <section id="services" className="py-20 md:py-28 relative bg-m3-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-google-blue/10 border border-google-blue/30 text-m3-primary text-xs font-semibold mb-4">
            <Layers className="w-3.5 h-3.5" />
            <span>The Omnichannel Scale Framework</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-4 font-sans">
            Engineered Exclusively for Shopify DTC
          </h2>
          <p className="text-base sm:text-lg text-m3-on-surface-variant">
            We don't spread budgets thin across vanity networks. We master the two platforms that drive over 90% of all profitable e-commerce customer acquisition.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Pillar 1: Meta Ads - Google Blue Accent */}
          <div className="p-8 rounded-m3-2xl bg-m3-surface-container border border-m3-outline/60 hover:border-google-blue transition-all duration-300 shadow-m3-2 hover:shadow-m3-3 flex flex-col justify-between group">
            <div>
              <div className="w-14 h-14 rounded-2xl bg-google-blue/15 border border-google-blue/30 flex items-center justify-center mb-6 group-hover:scale-105 transition-transform">
                <Zap className="w-7 h-7 text-google-blue-light" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2 font-sans">Meta Ads Engine</h3>
              <p className="text-sm text-m3-on-surface-variant mb-6 leading-relaxed">
                Consolidated algorithmic scaling for Facebook & Instagram that drives high-volume, first-time customer acquisition.
              </p>

              <ul className="space-y-3.5 text-sm text-m3-on-surface">
                <li className="flex items-start space-x-2.5">
                  <Check className="w-4 h-4 text-google-blue-light shrink-0 mt-0.5" />
                  <span><strong>3:2:2 Dynamic Creative Sandbox</strong> isolating winning hooks and headlines.</span>
                </li>
                <li className="flex items-start space-x-2.5">
                  <Check className="w-4 h-4 text-google-blue-light shrink-0 mt-0.5" />
                  <span><strong>Advantage+ Shopping (ASC)</strong> loaded with validated winner Post IDs.</span>
                </li>
                <li className="flex items-start space-x-2.5">
                  <Check className="w-4 h-4 text-google-blue-light shrink-0 mt-0.5" />
                  <span><strong>Dynamic Catalog DPA</strong> retargeting view content & abandoned cart users.</span>
                </li>
                <li className="flex items-start space-x-2.5">
                  <Check className="w-4 h-4 text-google-blue-light shrink-0 mt-0.5" />
                  <span>Weekly UGC & static creative briefs for continuous angle diversification.</span>
                </li>
              </ul>
            </div>

            <div className="mt-8 pt-4 border-t border-m3-outline-variant/50 flex items-center justify-between text-xs font-semibold text-google-blue-light">
              <span>High-Volume Demand Gen</span>
              <ArrowUpRight className="w-4 h-4" />
            </div>
          </div>

          {/* Pillar 2: Google Ads - Google Green Accent */}
          <div className="p-8 rounded-m3-2xl bg-m3-surface-container border border-m3-outline/60 hover:border-google-green transition-all duration-300 shadow-m3-2 hover:shadow-m3-3 flex flex-col justify-between group">
            <div>
              <div className="w-14 h-14 rounded-2xl bg-google-green/15 border border-google-green/30 flex items-center justify-center mb-6 group-hover:scale-105 transition-transform">
                <ShoppingBag className="w-7 h-7 text-google-green" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2 font-sans">Google PMax & Search</h3>
              <p className="text-sm text-m3-on-surface-variant mb-6 leading-relaxed">
                Capturing high-intent buyers actively searching for your category, hero products, and brand solutions.
              </p>

              <ul className="space-y-3.5 text-sm text-m3-on-surface">
                <li className="flex items-start space-x-2.5">
                  <Check className="w-4 h-4 text-google-green shrink-0 mt-0.5" />
                  <span><strong>PMax SKU Segmentation</strong> using GMC Custom Labels (High-Margin vs Hero).</span>
                </li>
                <li className="flex items-start space-x-2.5">
                  <Check className="w-4 h-4 text-google-green shrink-0 mt-0.5" />
                  <span><strong>GMC Feed Enrichment</strong>: SEO title rewrites, GTIN hygiene & attributes.</span>
                </li>
                <li className="flex items-start space-x-2.5">
                  <Check className="w-4 h-4 text-google-green shrink-0 mt-0.5" />
                  <span><strong>Brand Search Defense</strong> defending organic rank against competitor bidding.</span>
                </li>
                <li className="flex items-start space-x-2.5">
                  <Check className="w-4 h-4 text-google-green shrink-0 mt-0.5" />
                  <span>High-intent Non-Brand STAGs with rigorous negative keyword exclusions.</span>
                </li>
              </ul>
            </div>

            <div className="mt-8 pt-4 border-t border-m3-outline-variant/50 flex items-center justify-between text-xs font-semibold text-google-green">
              <span>High-Intent Demand Capture</span>
              <ArrowUpRight className="w-4 h-4" />
            </div>
          </div>

          {/* Pillar 3: Tracking & Attribution - Google Yellow Accent */}
          <div className="p-8 rounded-m3-2xl bg-m3-surface-container border border-m3-outline/60 hover:border-google-yellow transition-all duration-300 shadow-m3-2 hover:shadow-m3-3 flex flex-col justify-between group">
            <div>
              <div className="w-14 h-14 rounded-2xl bg-google-yellow/15 border border-google-yellow/30 flex items-center justify-center mb-6 group-hover:scale-105 transition-transform">
                <Database className="w-7 h-7 text-google-yellow" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2 font-sans">Attribution & CAPI</h3>
              <p className="text-sm text-m3-on-surface-variant mb-6 leading-relaxed">
                Eliminating data signal loss so ad network AI models optimize for high-AOV customers with maximum match quality.
              </p>

              <ul className="space-y-3.5 text-sm text-m3-on-surface">
                <li className="flex items-start space-x-2.5">
                  <Check className="w-4 h-4 text-google-yellow shrink-0 mt-0.5" />
                  <span><strong>Meta Conversions API (CAPI)</strong> setup guaranteeing EMQ scores $\ge$ 8.5/10.</span>
                </li>
                <li className="flex items-start space-x-2.5">
                  <Check className="w-4 h-4 text-google-yellow shrink-0 mt-0.5" />
                  <span><strong>Enhanced E-Commerce GA4</strong> tracking with payment gateway referral exclusions.</span>
                </li>
                <li className="flex items-start space-x-2.5">
                  <Check className="w-4 h-4 text-google-yellow shrink-0 mt-0.5" />
                  <span><strong>Blended MER Framework</strong> tracking true Contribution Margin & Cash Flow.</span>
                </li>
                <li className="flex items-start space-x-2.5">
                  <Check className="w-4 h-4 text-google-yellow shrink-0 mt-0.5" />
                  <span>Third-party attribution sync (Triple Whale, Northbeam, Lifetimely).</span>
                </li>
              </ul>
            </div>

            <div className="mt-8 pt-4 border-t border-m3-outline-variant/50 flex items-center justify-between text-xs font-semibold text-google-yellow">
              <span>Signal Precision & Net Profit</span>
              <ArrowUpRight className="w-4 h-4" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
