# sienalasvegas.com — Optimization checklist

Use this when editing the app or after syncing from Vercel/GitHub. Aligns with 2026 best practices and workspace standards.

## Performance (Core Web Vitals)

- [ ] **Images:** Use `next/image` with `sizes` and `priority` for above-the-fold; lazy load below. Prefer WebP/AVIF via Next.js config.
- [ ] **Fonts:** Use `next/font` (e.g. Geist or local) to avoid layout shift and extra network.
- [ ] **JS:** Rely on server components by default; add `"use client"` only where needed (forms, widgets).
- [ ] **Static:** Pre-render static pages; use ISR (`revalidate`) where content changes occasionally.
- [ ] **LCP:** Largest contentful paint under 2.5s — optimize hero image and main content load. Hero uses `priority` and `sizes="100vw"` on the first image.
- [ ] **Bundle analyzer:** Run `npm run analyze` (or `ANALYZE=true next build`) to generate client/edge/server bundle reports in `.next/` for identifying large chunks and code-splitting opportunities.
- [ ] **Third-party images and cache:** RealScout listing images (CloudFront) and the RealScout script are served by third parties; we cannot set their cache TTL or image format/sizing. Improvements would require RealScout or a proxy. First-party assets use Vercel/Next defaults.
- [ ] **Render-blocking CSS:** The main stylesheet is injected by Next.js and can block initial render. Geist font is loaded via `next/font`. If your Next.js version supports `experimental.optimizeCss` (e.g. with critters), consider enabling it to inline critical CSS; otherwise document and rely on preconnect + deferred scripts.

## Vercel and build

- [ ] **vercel.json:** Security and cache headers are set (see repo root). Add more in repo if needed; avoid duplicating in Dashboard.
- [ ] **Build:** Use `vercel build` for production checks. Node 24.x in `package.json` `engines` and Dashboard.
- [ ] **Output:** Next.js standalone or default; ensure no duplicate static routes.

## SEO and local (GBP)

- [ ] **NAP:** Business name, address, phone match Google Business Profile on every page (visible + JSON-LD).
- [ ] **Schema:** LocalBusiness (and RealEstateAgent if applicable) on all pages; FAQ schema where FAQs exist.
- [ ] **Meta:** Unique `title`, `description`, and H1 per page; include location and service area.
- [ ] **Canonical and social:** Every page sets its own canonical URL, Open Graph, and Twitter metadata via `buildPageMetadata()` in `lib/metadata.ts`. Do not rely on layout for canonical—each page exports metadata (or `generateMetadata` for dynamic routes) with the correct path.
- [ ] **One H1 per page:** Each page must have exactly one main `<h1>` that matches the page topic and (where sensible) includes location or service. No structural change to content unless a page is missing an H1 or has multiple H1s. Homepage H1 is in HeroSection; inner pages use a single hero-style H1.
- [ ] **Sitemap / robots:** Generated and linked; allow crawlers where appropriate.

## GEO (Generative Engine Optimization)

Optimize content and schema so AI answer engines (Google AI Overviews, Perplexity, ChatGPT, etc.) can retrieve, cite, and attribute the site. Complements traditional SEO and local GBP.

- [ ] **Direct-answer lead:** Key pages open with a 50–150 word summary immediately after the H1 so AI can extract a single, cited answer. Include who/what, location, and main service.
- [ ] **Schema for GEO:** Use FAQPage where FAQs exist; add WebPage schema with `dateModified` on important content pages (about, contact, key neighborhood/55+). Use Article/NewsArticle with dates on market/news pages; consider HowTo on process pages (e.g. buying, home valuation) when content is step-by-step.
- [ ] **Extractability:** Keep paragraphs under ~120 words; use clear H2/H3 (question-style where natural, e.g. "What is Green Valley?"); use bullets and tables for stats and lists so parsers can extract items.
- [ ] **Entity clarity:** One primary topic per page. Optionally link to authoritative sources (`sameAs` or in-content links) where it fits.
- [ ] **Freshness:** Set `dateModified` in WebPage/Article schema and show "Last updated" on market reports and FAQ where appropriate.
- [ ] **AI crawlers:** Default is to allow crawlers (no block of GPTBot, etc.). To allow or restrict AI crawlers explicitly, document the choice here and adjust `robots.txt` or metadata per Next.js docs if needed.

## AEO (Answer Engine Optimization)

Optimize for featured snippets and "position zero"—the direct answer shown before users click. Complements GEO and traditional SEO.

- [ ] **Snippet-style answer:** On key pages (e.g. FAQ, about, service pages), provide a 40–60 word direct answer in plain language immediately after the H1 that matches the page's main query (e.g. "What is Green Valley?", "Who is Dr. Jan Duffy?"). This is the block search and answer engines often extract for featured snippets.
- [ ] **Structured answers:** Use FAQPage and HowTo schema so answers are machine-extractable; keep schema in sync with visible content. Use real `<ul>`, `<ol>`, or `<table>` for lists and comparisons so engines can pull definition or step snippets.
- [ ] **Explicit dates and numbers:** Use specific dates (e.g. "January 2026") and exact numbers in copy and schema; avoid vague "recent" or "many." Show "Last updated" on time-sensitive pages (market reports, FAQ).
- [ ] **E-E-A-T for snippets:** Named author (Dr. Jan Duffy), credentials (license, BHHS), and clear service area help answer engines attribute and cite the site. Keep NAP and agent info visible and in schema.
- [ ] **Overlap with GEO:** Direct-answer leads, FAQ/HowTo schema, and "At a glance" blocks already support AEO; maintain them and add snippet-length (40–60 word) openings where a page targets a clear question.

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
