# sienalasvegas.com — Optimization checklist

Use this when editing the app or after syncing from Vercel/GitHub. Aligns with 2026 best practices and workspace standards.

## Performance (Core Web Vitals)

- [ ] **Images:** Use `next/image` with `sizes` and `priority` for above-the-fold; lazy load below. Prefer WebP/AVIF via Next.js config.
- [ ] **Fonts:** Use `next/font` (e.g. Geist or local) to avoid layout shift and extra network.
- [ ] **JS:** Rely on server components by default; add `"use client"` only where needed (forms, widgets).
- [ ] **Static:** Pre-render static pages; use ISR (`revalidate`) where content changes occasionally.
- [ ] **LCP:** Largest contentful paint under 2.5s — optimize hero image and main content load.

## Vercel and build

- [ ] **vercel.json:** Security and cache headers are set (see repo root). Add more in repo if needed; avoid duplicating in Dashboard.
- [ ] **Build:** Use `vercel build` for production checks. Node 24.x in `package.json` `engines` and Dashboard.
- [ ] **Output:** Next.js standalone or default; ensure no duplicate static routes.

## SEO and local (GBP)

- [ ] **NAP:** Business name, address, phone match Google Business Profile on every page (visible + JSON-LD).
- [ ] **Schema:** LocalBusiness (and RealEstateAgent if applicable) on all pages; FAQ schema where FAQs exist.
- [ ] **Meta:** Unique `title`, `description`, and H1 per page; include location and service area.
- [ ] **Sitemap / robots:** Generated and linked; allow crawlers where appropriate.

## Security

- [ ] **Headers:** X-Content-Type-Options, X-Frame-Options, Referrer-Policy (in vercel.json). Add CSP in next.config or headers if needed.
- [ ] **Secrets:** No env vars or tokens in repo; use Vercel Environment Variables / Secrets.
- [ ] **Forms:** Use Turnstile or similar where required; validate and rate-limit server-side.

## Real estate and compliance

- [ ] **IDX/MLS:** If used, show MLS disclaimer and attribution; do not change `components/idx/*` without approval.
- [ ] **Fair housing:** No discriminatory content; link to fair housing where appropriate (e.g. footer).

## After changes

- [ ] Run type-check and lint (`npm run type-check`, lint script if present).
- [ ] Test production build locally or via Vercel preview.
- [ ] Confirm deployment (Git push → Vercel) and spot-check production URL.
