# Skill: Site Architecture & Subdomain Routing

> Must read `.agents/skills/product-marketing.md` first.

## Goal
Maintain search engine indexing architecture across multi-tenant subdomains and custom domains.

## Principles
1. Tenant subdomains (`[slug].etalase.online`) must have self-referencing canonical tags.
2. Custom domains (`namabrand.com`) must override subdomain canonical to prevent duplicate content penalties.
3. Sitemap: Generate XML sitemaps for verified stores and programmatic tools (`/tools`).\n