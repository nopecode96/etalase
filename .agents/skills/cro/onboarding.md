# Skill: Onboarding CRO

> **Pre-requisite:** Read `.agents/skills/product-marketing.md` first.

## Goal
Maximize activation rate: guide new signups from 0 to 1 published product within 5 minutes of Google Connect login.

## Strategy
1. **Zero Mandatory Forms:** Auto-generate store name from Google profile if not provided.
2. **Instant Slug Claim:** Real-time debounced check against `RESERVED_SLUGS` and existing DB stores.
3. **Template Auto-Selection:** Default to `clean-minimal` for broad compatibility.
4. **Ops-01 Webhook:** Trigger n8n onboarding drip: 1x welcome WhatsApp, followed 24h later with quick-setup tip if products count == 0.
