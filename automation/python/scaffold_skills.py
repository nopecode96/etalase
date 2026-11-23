#!/usr/bin/env python3
"""
Scaffolds all 7-pillar AI Agent Skills for etalase.online
Strictly aligned with .agents/skills/product-marketing.md
"""
import os
from pathlib import Path

BASE_DIR = Path("/opt/etalase/.agents/skills")

SKILLS = {
    # SEO & Content
    "seo/seo-audit.md": """# Skill: SEO Audit for etalase.online Storefronts

> Must read `.agents/skills/product-marketing.md` first.

## Goal
Conduct automated technical and on-page SEO audits for tenant storefronts (`[slug].etalase.online`) and main landing pages.

## Checklist
1. **Title & Meta Tags:** Ensure `<title>` contains Brand Name + Primary Category + City/Region.
2. **Schema.org:** Verify `WebSite`, `Store`, `Product`, or `BlogPosting` JSON-LD is injected correctly.
3. **Open Graph & Twitter Cards:** Validate `og:image` (1200x630) and `og:description` match tenant bio.
4. **Mobile Responsiveness & Core Web Vitals:** Ensure fast LCP (<2.0s) and zero CLS on 3G/4G SEA mobile connections.
""",

    "seo/site-arch.md": """# Skill: Site Architecture & Subdomain Routing

> Must read `.agents/skills/product-marketing.md` first.

## Goal
Maintain search engine indexing architecture across multi-tenant subdomains and custom domains.

## Principles
1. Tenant subdomains (`[slug].etalase.online`) must have self-referencing canonical tags.
2. Custom domains (`namabrand.com`) must override subdomain canonical to prevent duplicate content penalties.
3. Sitemap: Generate XML sitemaps for verified stores and programmatic tools (`/tools`).
""",

    "seo/programmatic-seo.md": """# Skill: Programmatic SEO Engine

> Must read `.agents/skills/product-marketing.md` first.

## Goal
Generate high-converting landing pages dynamically for regional long-tail queries across Southeast Asia.

## Regional Keyword Matrices
* **Indonesia:** `etalase bio link [niche]`, `link toko bio [kota]`, `cara jualan tanpa potongan shopee`.
* **Malaysia:** `bio link beg kuning tiktok`, `kedai online whatsapp malaysia`.
* **Thailand:** `ลิงก์ในไบโอขายของ`, `ร้านค้าไลน์ shopping`.
* **Vietnam:** `bio link bán hàng zalo`, `tạo web bán hàng cá nhân`.
""",

    "seo/schema.md": """# Skill: Schema & Structured Data

> Must read `.agents/skills/product-marketing.md` first.

## Goal
Implement valid Schema.org microdata for Google Rich Snippets in Southeast Asian SERPs.

## Key Schemas
* **Product:** Price, currency (IDR, MYR, SGD, THB, VND), availability, aggregateRating.
* **Store / LocalBusiness:** Name, geo coordinates, openingHours, telephone (WhatsApp).
* **BlogPosting:** Headline, author, datePublished, image, publisher.
""",

    "seo/content.md": """# Skill: SEO Content Strategy

> Must read `.agents/skills/product-marketing.md` first.

## Goal
Produce keyword-optimized educational guides and comparisons for creators and local business owners.

## Guidelines
1. Focus on transactional search intent (e.g., "alternatif lynk id", "komisi shopee vs etalase").
2. Include clear step-by-step screenshots or video walkthroughs.
3. Insert non-intrusive CTAs: "Buka etalase gratis dalam 30 detik".
""",

    "seo/aso.md": """# Skill: App & Bio Link Search Optimization (ASO / Social Search)

> Must read `.agents/skills/product-marketing.md` first.

## Goal
Optimize TikTok, Instagram, and YouTube profile search visibility driving traffic into `[slug].etalase.online`.

## Strategy
* Inject keyword-rich usernames and bio hooks.
* Highlight "Klik link di bio" in short-form video scripts.
* Use localized emojis: 🛒, 🛍️, 📦, 📲.
""",

    "seo/link-build.md": """# Skill: Link Building & Digital PR

> Must read `.agents/skills/product-marketing.md` first.

## Goal
Earn high-authority dofollow backlinks from regional startup directories, creator roundups, and media outlets.

## Angles
1. "Startup lokal alternatif Linktree dengan 0% komisi untuk UMKM."
2. "Revolusi Bio Link Asia Tenggara: Integrasi QRIS Cross-Border & Chat-First Commerce."
""",

    # CRO
    "cro/cro.md": """# Skill: Conversion Rate Optimization (CRO)

> Must read `.agents/skills/product-marketing.md` first.

## Goal
Maximize visitor-to-buyer and visitor-to-signup conversion rates across all etalase.online properties.

## Golden Rules
1. **Frictionless Mobile Checkout:** Max 2 fields for chat orders (Nama & WA).
2. **Visual Urgency:** Subtle badges like "Stok Terbatas" or "Diskon Berakhir Hari Ini".
3. **Contrast:** CTAs must contrast sharply against the template background color.
""",

    "cro/signup.md": """# Skill: Signup CRO & Onboarding Optimization

> Must read `.agents/skills/product-marketing.md` first.

## Goal
Maintain >70% landing-to-signup completion rate via 1-step Google OAuth.

## Best Practices
* Big Google Button: "Lanjutkan dengan Google - Gratis Selamanya".
* Instant Slug Claim: Let users type `etalase.online/[namamu]` before pressing Google Connect.
* Zero Password policy: Eliminate email verification and password requirements.
""",

    "cro/popups.md": """# Skill: Lead Magnets & Non-Intrusive Prompts

> Must read `.agents/skills/product-marketing.md` first.

## Goal
Capture WhatsApp numbers of hesitant storefront visitors without harming UX or Google SEO ranking.

## Implementation
* Exit-intent sheet on mobile web.
* Offer free checklist/lead magnet in exchange for WhatsApp number.
""",

    "cro/paywalls.md": """# Skill: Pro Tier Paywalls & Feature Locks

> Must read `.agents/skills/product-marketing.md` first.

## Goal
Convert Free tenants to Pro ($6/mo or Rp 79rb/bln) when they attempt to use Pro features.

## Locked Features
* Custom Domain (`namabrand.com`).
* White-label (remove `etalase.online` footer watermark).
* 8+ Pro Templates & Custom CSS/Fonts.
* WhatsApp Cart Recovery & AsistenCuan Bundling.
""",

    # Content & Copy
    "content-copy/copy-edit.md": """# Skill: Copy Editing & Tone Polish

> Must read `.agents/skills/product-marketing.md` first.

## Goal
Refine sales copy, product descriptions, and landing pages to ensure crisp, persuasive delivery.

## Checkpoints
* Cut passive voice: Change "Produk ini dibuat untuk..." to "Raih omset 2x lipat dengan...".
* Localize currency and regional idioms.
* Ensure headings are benefit-driven, not feature-driven.
""",

    "content-copy/cold-email.md": """# Skill: Cold Email & B2B Outreach

> Must read `.agents/skills/product-marketing.md` first.

## Goal
Outreach to top TikTok/Shopee affiliates and local agencies offering white-glove onboarding.

## Structure
* Subject: Ide visual storefront untuk {{BrandName}}
* Pain point: Potongan komisi platform 10-15% menggerus margin.
* Solution: etalase.online 0% komisi chat order + link demo siap pakai.
""",

    "content-copy/emails.md": """# Skill: Lifecycle & Transactional Email Copy

> Must read `.agents/skills/product-marketing.md` first.

## Goal
Deliver engaging automated email updates for tenant receipts, payout notices, and milestone celebrations.
""",

    "content-copy/social.md": """# Skill: Short-Form Social Copy (TikTok, Reels, Threads)

> Must read `.agents/skills/product-marketing.md` first.

## Goal
Craft hooks, captions, and script outlines highlighting creator monetization and business tips.
""",

    "content-copy/video.md": """# Skill: Video Sales Letter & Reel Scripting

> Must read `.agents/skills/product-marketing.md` first.

## Framework: Hook -> Problem -> Proof -> CTA
1. Hook (0-3s): "Berhenti taruh link marketplace biasa di bio TikTok kamu!"
2. Problem (3-15s): "Potongan 12% dan pembeli gampang kabur ke toko sebelah."
3. Proof (15-40s): Tunjukkan etalase.online: tampilan katalog visual + QRIS instan.
4. CTA (40-60s): "Bikin etalase kamu sekarang, gratis di etalase.online."
""",

    "content-copy/image.md": """# Skill: Visual Creative & Banner Copy

> Must read `.agents/skills/product-marketing.md` first.

## Goal
Guide text layout, badges, and typography on promotional banners and Story 9:16 templates.
""",

    # Paid & Measurement
    "paid/ads.md": """# Skill: Meta & TikTok Ads Strategy

> Must read `.agents/skills/product-marketing.md` first.

## Goal
Run profitable top-of-funnel customer acquisition campaigns for etalase.online Pro & DFY tiers.
""",

    "paid/ad-creative.md": """# Skill: Ad Creative Optimization

> Must read `.agents/skills/product-marketing.md` first.

## Goal
Develop high-CTR visual assets comparing traditional bio link vs visual storefront etalase.online.
""",

    "paid/ab-testing.md": """# Skill: A/B Testing & Multivariate Experiments

> Must read `.agents/skills/product-marketing.md` first.

## Goal
Experiment with headline variations, pricing displays, and CTA colors on high-traffic pages.
""",

    "paid/analytics.md": """# Skill: Analytics & Attribution Tracking

> Must read `.agents/skills/product-marketing.md` first.

## Goal
Track Meta Pixel, TikTok Pixel, and GA4 events (PageView, ViewContent, InitiateCheckout, Purchase).
""",

    # Growth & Retention
    "growth/referrals.md": """# Skill: Tenant Referral & Affiliate System

> Must read `.agents/skills/product-marketing.md` first.

## Goal
Incentivize existing tenants to invite other creators with recurring 20% commission on Pro subscriptions.
""",

    "growth/free-tools.md": """# Skill: Free Tools as Growth Engine

> Must read `.agents/skills/product-marketing.md` first.

## Goal
Leverage `/tools` (WhatsApp Link Generator & Marketplace Fee Calculator) to capture top-of-funnel leads.
""",

    "growth/churn-prevent.md": """# Skill: Churn Prevention & Reactivation

> Must read `.agents/skills/product-marketing.md` first.

## Goal
Detect tenants with zero products or expiring Pro plans and deliver proactive WhatsApp assistance.
""",

    "growth/community.md": """# Skill: Creator Community & Masterclass

> Must read `.agents/skills/product-marketing.md` first.

## Goal
Foster active creator community on Telegram/WhatsApp sharing weekly monetization playbooks.
""",

    "growth/lead-magnet.md": """# Skill: Lead Magnet Factory

> Must read `.agents/skills/product-marketing.md` first.

## Goal
Build reusable downloadable PDF checklists and Notion templates to accelerate tenant list building.
""",

    "growth/co-mktg.md": """# Skill: Co-Marketing & Agency Partnerships

> Must read `.agents/skills/product-marketing.md` first.

## Goal
Partner with digital agencies and creator managers to bundle etalase.online with influencer management services.
""",

    # Sales & GTM
    "sales-gtm/revops.md": """# Skill: Revenue Operations & Payout Tracking

> Must read `.agents/skills/product-marketing.md` first.

## Goal
Maintain accurate revenue metrics in Mabes Super Admin, reconciling Borderpay QRIS and PayPal settlements.
""",

    "sales-gtm/sales-enable.md": """# Skill: Sales Enablement & Demo Scripts

> Must read `.agents/skills/product-marketing.md` first.

## Goal
Equip sales reps with objection-handling scripts for offline retail, property sales, and F&B owners.
""",

    "sales-gtm/launch.md": """# Skill: Feature Launch Playbook

> Must read `.agents/skills/product-marketing.md` first.

## Goal
Coordinate release announcements across Product Hunt, social media, email, and WhatsApp blasts.
""",

    "sales-gtm/competitors.md": """# Skill: Competitive Intelligence

> Must read `.agents/skills/product-marketing.md` first.

## Goal
Track pricing changes, fee increases, and feature updates of Lynk.id, Mayar, and Linktree.
""",

    "sales-gtm/comp-profile.md": """# Skill: Competitor Comparison Profiles

> Must read `.agents/skills/product-marketing.md` first.

## Goal
Generate side-by-side comparison tables highlighting etalase.online 0% chat fee, cross-border QRIS, and multi-template visual superiority.
""",

    "sales-gtm/directory.md": """# Skill: Public Storefront Directory & Showcase

> Must read `.agents/skills/product-marketing.md` first.

## Goal
Index top-performing verified stores on the public showcase to inspire new creators and boost tenant backlinks.
""",

    "sales-gtm/prospecting.md": """# Skill: DFY Lead Prospecting

> Must read `.agents/skills/product-marketing.md` first.

## Goal
Source local business prospects on Instagram & Google Maps who have outdated linktree links or PDFs.
""",

    # Strategy
    "strategy/mktg-ideas.md": """# Skill: Creative Marketing Ideation

> Must read `.agents/skills/product-marketing.md` first.

## Goal
Brainstorm viral guerilla marketing stunts and regional creator challenges (e.g., #BukaEtalase).
""",

    "strategy/mktg-psych.md": """# Skill: Consumer Psychology & Behavioral Nudges

> Must read `.agents/skills/product-marketing.md` first.

## Goal
Apply behavioral economics (scarcity, social proof, anchoring) to storefront and checkout UI.
""",

    "strategy/customer-research.md": """# Skill: Customer Research & Voice of Customer

> Must read `.agents/skills/product-marketing.md` first.

## Goal
Extract qualitative insights from tenant feedback and customer support tickets to prioritize roadmap features.
""",

    "strategy/reverse-eng-mktg.md": """# Skill: Reverse Engineering Competitor Campaigns

> Must read `.agents/skills/product-marketing.md` first.

## Goal
Deconstruct top performing ad creatives and landing page funnels of regional SaaS leaders.
"""
}

def main():
    print(f"Scaffolding {len(SKILLS)} AI agent skill files...")
    created = 0
    for rel_path, content in SKILLS.items():
        file_path = BASE_DIR / rel_path
        file_path.parent.mkdir(parents=True, exist_ok=True)
        if not file_path.exists():
            file_path.write_text(content.strip() + "\\n", encoding="utf-8")
            created += 1
            print(f"  + Created: {rel_path}")
        else:
            print(f"  = Exists: {rel_path}")
    print(f"✨ Finished scaffolding. Created {created} new skill files.")

if __name__ == "__main__":
    main()
