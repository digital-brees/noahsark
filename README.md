# Noah's Ark Veterinary Hospital — Website Prototype

Independently owned, AAHA-accredited small-animal hospital (dogs & cats) in **Williamsburg, VA**, caring for the community since **1983**. Built by **Digital Empathy**.

- **Live (existing) site:** https://www.noahsarkvet.com/
- **Domain:** noahsarkvet.com
- **Repo:** `digital-brees/noahsark` (pushes to `main`)
- **Local dev:** `py -3 -m http.server 8791` from the project root → http://localhost:8791/
- **Stack:** hand-coded static HTML/CSS/JS, no build step. Shared header/footer injected at runtime via `includes/load-partials.js`. Deploys on Vercel (Framework: Other).

---

## Aesthetic Direction & Rationale

**"Refined Modern Sans," evolved into a warm, photo-forward, light/editorial direction.** The brief: professional, light, cheerful, trustworthy, animated — never corporate, never "daycare." Early rounded/playful rounds were rejected; the warmth now comes from photography, generous space, and a soft periwinkle, not from shape or color saturation. Trust is conveyed through editorial restraint, not marketing devices (no badges/ratings/quotes).

Animation is a baseline expectation, all `prefers-reduced-motion` gated: sequenced hero load, an infinite trust marquee, a scroll-linked "Care for Every Stage" journey spine (SVG draw), and a pinned cinematic Values zoom-stage.

## Color Palette

| Token | Hex | Use |
|---|---|---|
| `--ink` | `#342D4F` | Brand indigo (matches the logo) — text, dark sections, primary surfaces |
| `--ink-soft` | `#5B5278` | Muted body copy (6.9:1 on paper) |
| `--ink-faint` | `#8C86A8` | Faint labels (decorative only) |
| `--paper` | `#FCFBFA` | Porcelain — crisp warm-white base (replaced an earlier cream that read dated) |
| `--paper-2` | `#F1F0F3` | Neutral mist — accent band / hover |
| `--sky` | `#EBEEFB` | Soft periwinkle wash — Story + Find Us sections |
| `--accent` | `#1FA6AC` | Teal — fills, marks on dark |
| `--accent-dk` | `#0E7378` | Deep teal — white-text buttons + links on light (AA) |
| `--accent-lt` | `#7FD0D4` | Light aqua — accent on dark ink |
| `#ffffff` | white | Cards / crisp surfaces |

**Hard rules:** no CSS gradients (solid scrims/overlays only; `mask-image` edge-fades allowed), no squiggle underlines, no wave dividers, no emoji (solid SVG icons). Color is punctuation, not fields.

## Typography

- **Headlines:** Bricolage Grotesque (variable, opsz + weights 400–700). No rounded display fonts.
- **Body / UI:** Inter.
- Fluid `clamp()` scale; body line-length constrained 50–62ch; tightened tracking on large heads.

## Copy Mode

**Provided — verbatim.** Homepage copy is from Alie's doc and must never be reworded; design changes only. Other pages port existing-site content verbatim where strong, generating only to fill gaps (with business name + Williamsburg, VA + correct heading hierarchy). About/Careers homepage copy still pending from Alie.

## Accessibility

Full **WCAG 2.1 AA** is the standard, baked in per page: contrast ≥4.5:1 (≥3:1 large/UI), keyboard operability with focus trap/restore on modals + mobile menu, visible `:focus-visible`, skip link → `<main id="main">`, semantic landmarks, meaningful/decorative alt, reduced-motion gating, labeled forms.

---

## Sitemap (~57 pages planned)

- **Top-level:** `index` (home), `about`, `team` ✓, `services` (hub), `blog`, `contact`, `careers`, `forms`, `breeds`
- **Service hubs (`services/`):** `wellness-care` ✓ (exemplar), `diagnostics`, `surgery`, `dental-care`, `end-of-life-care`, `emergency-care`
- **Blog (`blog/`):** 4 posts (cancer, heart disease, allergies, dog behavior) ✓
- **Resources:** `resources/educational-handouts`
- ~47 legacy per-condition service pages collapse into the hubs above, with 301s in `vercel.json` (see `REDIRECTS-AND-QA.md`).

## Build Status

- **Done / award-level:** homepage (`index.html`), `team.html`, `services/wellness-care.html` (the locked design exemplar), `services.html`, `blog.html` + 4 posts.
- **Old generation (pending upgrade — on hold for client approval of the first design):** `services/diagnostics`, `surgery`, `dental-care`, `end-of-life-care`, `emergency-care` — still plain Q&A, no body imagery; to receive the Wellness treatment once approved.
- **Placeholders (draft banners):** `about`, `careers`, `forms`, `breeds`, `resources/educational-handouts` — pending copy (Alie) + JotForm wiring.

## Analytics & Integrations

- **Google Tag Manager:** `GTM-592RD6LK` — single config spot in `includes/load-partials.js` (`GTM_ID`), inherited by every page automatically. (Source: Salesforce `Project__c.GTM_Code__c`.)
- **GA4 property:** `536219164` (on file; not yet wired separately — GTM container is the carrier).
- **Maps / GMB:** address links + map embed point at the real Google Business Profile (`https://maps.app.goo.gl/iam5n6XTq26e7s8U8`, place CID `0x1faa37ac9d2b5897`).
- **Appointments:** AllyDVM (`connect.allydvm.com/practice/noahsark_vh/...`). **Pharmacy:** GreatPetRx. **Forms:** to be wired through JotForm per the DE Standard.

## Assumptions / Sections Needing Real Content

- **All photography is Pexels stock placeholder** — the practice's Drive Team + Candid folders are empty. Swap for real Williamsburg/Noah's Ark imagery before launch (no image-rule violations in the placeholders: no vet faces/gloves in clinical settings).
- **Hero video** (`assets/media/hero.mp4`) is a generic placeholder — needs real clinic footage.
- **Emergency:** business-hours only (NO 24/7) — surfaced honestly sitewide; `emergency-care.html` still needs the real recommended after-hours ER (name/address/phone).
- **Forms** (contact, new client) pending JotForm. **Contact page** still needs a map embed, email, form, and emergency note.
- Doctor/staff bios are verbatim from the live site (short) — fuller bios are an easy future add.

## Launch Checklist (high level)

Swap `robots.txt` for `robots.production.txt` (+ sitemap line) · confirm real photography · finish JotForm forms · confirm live source-URL structure matches the `vercel.json` 301s · resubmit sitemap in GSC · sign-off (Cori + Dr. Sparkman). Full project state lives in `session-notes.md`.

---

*Designed by [Digital Empathy](https://digitalempathyinc.com).*
