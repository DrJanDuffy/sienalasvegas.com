# NAP and schema consistency (SEO)

Use this checklist when adding or editing pages so schema and visible NAP stay aligned with Google Business Profile.

## Canonical NAP (from `lib/site-config.ts`)

- **Name:** Dr. Jan Duffy — Berkshire Hathaway HomeServices Nevada Properties (use `agentInfo`, `officeInfo`, or `siteConfig` as appropriate).
- **Phone (schema):** `+17025001942` (E.164-style in JSON-LD). Display format: `(702) 500-1942` or use `agentInfo.phoneFormatted` / `agentInfo.phoneTel`.
- **Address:** 10525 Siena Monte Avenue, Las Vegas, NV 89135 — use `officeInfo.address` in code; do not hardcode a different street or city for the agent/office.

## Schema checklist

- [ ] Every page that includes RealEstateAgent or LocalBusiness schema uses the same telephone value (`+17025001942` or from `agentInfo.phoneTel` without the `tel:` prefix for `telephone`).
- [ ] Address in schema matches `officeInfo.address` (street, city, state, zip, country).
- [ ] No page introduces a second, conflicting agent phone or office address for Dr. Jan Duffy / BHHS.
- [ ] Community-specific pages (e.g. Siena HOA) may use a different org/phone for that entity only; agent NAP elsewhere must still match site-config.

## When to use `generateSitemaps()`

If the site grows to many hundreds or thousands of URLs (or multiple domains), switch from the single `app/sitemap.ts` export to Next.js App Router `generateSitemaps()` and multiple sitemap segments so crawlers get a sitemap index. Until then, the single sitemap is sufficient.
