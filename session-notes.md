# Noah's Ark Veterinary Hospital — Session Notes

**Status:** Team page built on locked design system. Design system finalized.
**Started:** 2026-06-03
**Designer:** Brees
**Local dev:** `py -3 -m http.server 8791` (from project root) → http://localhost:8791/

---

## Client Summary
- **Practice:** Noah's Ark Veterinary Hospital
- **Location:** 7297 Richmond Rd., Williamsburg, VA 23188
- **Phone:** (804) 331-8734
- **Hours:** Mon–Fri 7:30a–6:00p · Sat 7:30a–12:00p · Sun closed
- **Species:** Dogs & cats
- **Doctors:** Dr. Sean A. Sparkman (owner, since 2014; AVMA/AAHA/VVMA/GPVMA), Dr. Jenny Robinson (DVM, Williamsburg native), Dr. Matthew Pate (DVM, Auburn)
- **Support staff (9):** Cori Wallace (LVT/Practice Mgr), Siedah Clark (LVT), Catie Gregory (LVT), Matt Doubles (Vet Asst), Ardis Crespo (Vet Asst), Shannon Davenport (Treatment Asst), Carol Ely (CSR/Supervisor), April McDonald (CSR), Jill Moon (Bookkeeper, since 1992 — longest service)
- **Accreditation:** AAHA + AVMA
- **Positioning:** Independently/family-owned (since 1992), relationship-first — "treat you as a friend, not a number." Themes: "Putting Pets First," "Protecting the Lifelong Love of Pets."
- **Emergency:** NO 24-hour emergency. Emergency care during BUSINESS HOURS only. (Surface accurately — never imply 24/7.)
- **On-site:** Laser therapy, digital radiology, in-house lab, full pharmacy.
- **Core Values:** Compassion · Drive · Positive Attitude · Proficient.
- **Existing site:** https://www.noahsarkvet.com/ | **Domain:** noahsarkvet.com

## Repo / Infra
- **Project folder:** `C:\Users\brees\Claude Projects\Noah's Ark\` (standalone git repo)
- **GitHub:** `digital-brees/noahsark` (pushes to `main`)
- **Vercel:** not yet connected — Add New Project → import `digital-brees/noahsark` → Framework: Other
- robots.txt blocks all (preview default); robots.production.txt ready for launch swap.

## Drive Assets
- **Folder:** `Noah's Ark Veterinary Hospital (noahsarkvet.com)` — ID `1GQo9NF1XDInXghE4BBZVSyxJ6kjn0zih` (Brees' accounts)
  - Logo → `primary-logo.png` (ID `1_ykr0drAmj0xIkFFt3wHwjjFk4j34UF-`) ✓ downloaded
  - Services Navigation List (ID `1nlyhyr-YOEFFfMiBM147SsXSw-kbn2A20yVL2zerPEQ`) — ~45 cat/dog/general services
  - Core Values doc [IN PROGRESS] (ID `1Avbcx-zY7H2zJnlxly52UxwgBOOMwaCyRzE0k7_USCk`)
  - Team folder (ID `1KR4ZHpCnEuBwjU0fCSKFijNNSv9VJT9s`) — **EMPTY** (real portraits pending)
  - Candid photos folder (ID `1KTDdyct04HwV0ZuY6h_2uqP8I5KwRR-k`) — **EMPTY**

## Copy Mode
- **Existing site content** — port team bios, services, blog, forms from live noahsarkvet.com. Verbatim where strong; generate to fill gaps (SEO/AEO, business name + Williamsburg VA, correct heading hierarchy).
- Alie's homepage copy doc NOT yet written → homepage build is on hold for copy. **That's why we started with the TEAM page.**
- Team bios on team.html are VERBATIM from the live site (they're short on the live site — fuller bios are an easy future content add).

## LOCKED DESIGN SYSTEM (`assets/css/site.css`)
Direction chosen: **"Refined Modern Sans"** (after explicit feedback that earlier rounded/playful versions read "daycare").
- **Type:** Bricolage Grotesque (headlines, sharp/modern) + Inter (body/UI). Baloo/Fraunces REMOVED — rounded fonts read juvenile.
- **Palette (3 only):**
  - `--ink` **#342D4F** brand indigo (the LOGO color) — text, dark sections, primary buttons, icon tiles. (2026-06-08: re-anchored from #212B66 back to the true brand primary #342D4F for brand fidelity — re-unifies the UI with the navy logo lockup. Accessibility-neutral: near-identical luminance, all contrast ratios still pass. Supporting tints retuned to the same plum-indigo hue: --ink-soft #5B5278 (6.9:1 on paper), --ink-faint #8C86A8, --line/--shadow rgba(52,45,79,...).)
  - `--paper` **#FBFAF7** clean warm near-white — base
  - `--paper-2` **#F2EFE9** soft greige — accent band / hover only
  - `--accent` **#7C8AD9** periwinkle (+ `--accent-dk` #5E6CC0) — CTA, eyebrow ticks, link underlines, hovers, footer icons
  - white `#fff` for crisp surfaces/cards
- **Tone rules (hard-won):** NO rounded display fonts, NO squiggle/hand-drawn underlines, NO wave dividers, NO emoji (use solid-fill SVG icons), NO gradients (solid scrims/overlays only). Color = punctuation, not fields. Warmth comes from photography + paper undertone + space, NOT from shape.
- **Components:** hairline rules (eyebrow tick, value-column dividers), small radii (6–16px), editorial/left-aligned heads, generous whitespace. Buttons: ink-primary warming to periwinkle on hover (8px radius, not pills).
- **Neutral rhythm:** white → near-white → soft greige stepping; warm beige only as hover wash / single band.

## Logo
- Real logo from live site (matches Drive). Logo navy = **#342D4F** — and the site ink is now anchored on #342D4F too, so logo and UI match exactly (2026-06-08).
- `assets/logo/noahs-ark-navy.png` (transparent) + `assets/logo/noahs-ark-white.png` (recolored white for dark bg).
- Header: white logo over hero → swaps to navy when scrolled/solid. Footer: white logo. NOTE: logo is a SQUARE STACKED lockup — reads small/compact in nav. Possible future ask: horizontal lockup from client.

## Global Architecture
- Shared header/footer via `includes/` (fetch-injected, depth-aware) → `includes/header.html`, `includes/footer.html`, `includes/load-partials.js`.
- Pages set `data-page` (active nav), `data-base` (path depth), `data-header="solid"` (optional).
- `load-partials.js` also runs the global `.reveal` IntersectionObserver scroll-reveal + mobile menu + sticky-header scroll state.

## Sitemap (APPROVED — ~57 pages)
- **Top-level:** index, about, team ✓, services (hub), blog (+ posts), contact, **careers**
- **Service hubs (3):** cat-care, dog-care, general-services
- **Service detail (~47):** one per Services Navigation List item, from a shared template
- **Forms:** wire through JotForm per DE Standard (confirm which forms exist on live site)
- **Build order:** design system ✓ → (homepage on hold for copy) → core pages → ONE service template (sign-off) → mass-produce service pages + blog

## Built This Session
- **team.html** — COMPLETE on locked system:
  - Editorial hero — **now a looping muted autoplay VIDEO** (`hero.mp4` + `hero-poster.jpg` poster) replacing the still `team-hero.jpg`. Solid navy scrim, left-aligned, bottom-anchored. NOTE: hero.mp4 is the homepage scratch clip (generic placeholder) — swap for real clinic footage when available (Drive Candid folder empty).
  - **REAL bios + portraits ported from live site (2026-06-05):** all 12 staff now use real photos in `assets/team/` (downloaded from noahsarkvet.com, came as AVIF → converted to true JPEG via ffmpeg, ≤1600px, ~1MB total). Bios upgraded from trimmed → FULL verbatim text (support staff gained full detail: Matt's dogs/hobbies, April's pets, Jill's family, Cori's VALVT/interests, etc.). Roster confirmed unchanged: Sparkman, Robinson, Pate (stray `dr._rolley.jpg` on their server is NOT a current vet — red herring).
    - Vet img files: `sparkman.jpg`, `robinson.jpg`, `pate.jpg`. Staff img files: `cori_wallace/siedah_clark/catie_gregory/matt_doubles/ardis_crespo/shannon_davenport/carol_ely/april_mcdonald/jill_moon.jpg`.
    - Pate's portrait is a wide family-on-beach shot → center-crops in the 4/5 vet card. Fine for now; swap for a tighter headshot if client provides one.
    - STAFF array in team.html `<script>` now carries `img:` field per person; render loop + bio modal use real image (placehold.co kept only as never-firing fallback).
  - Values: 4 numbered columns w/ hairline dividers on WHITE, solid-navy SVG icon tiles, warm hover wash
  - Veterinarians: 3 cards (credential chips, teaser, "Read full bio" → modal, verbatim bios)
  - Support team: 9 cards injected via JS, click → same modal (verbatim bios)
  - Join CTA: **image-led split band** (navy panel + `cta-join.jpg` photo, periwinkle button) — replaced earlier flat box
  - Bio modal (photo + role + cred chips + bio), Esc/scrim close
- **Assets:** `assets/media/` — team-hero.jpg, cta-join.jpg, hero.mp4 + hero-poster.jpg (homepage hero scratch), owner-beagle/lab.jpg (scratch)
- **Scratch/iteration files (not real pages):** `hero-compare.html`, `hero-blend.html`, `accent-lab.html` — kept for reference; safe to delete later.

## Design Journey (so future sessions don't repeat rejected paths)
- Homepage hero explored first (hero-compare A/B → hero-blend) but homepage paused (no copy). DO NOT chase rounded/playful — REJECTED as "daycare."
- Accent color: yellow/ochre REJECTED → teal REJECTED ("not sure") → **periwinkle #7C8AD9 chosen** (cool, distinct from navy).
- Purple changed from #342D4F → **#212B66** per Brees.
- Base lightened twice toward white to kill "dated beige" feel.

## Accessibility (WCAG 2.1 AA pass — 2026-06-08)
Full a11y pass on the built surfaces (team.html + shared header/footer/css/js):
- **CTA contrast fix (touches locked palette):** solid CTA buttons changed from navy-on-periwinkle #7C8AD9 (**4.05:1, FAILED**) to **white on --accent-dk #5E6CC0 (4.79:1, PASS)**. Affects `.btn-accent`, `.nav-cta`, `.mm-cta`; `.btn-primary` hover also moved off periwinkle. Decorative periwinkle (eyebrow ticks, link underlines, hover washes) UNCHANGED at #7C8AD9. Brees chose "Option B" from `a11y-cta-compare.html` (scratch comparison page, safe to delete).
- **Skip link** ("Skip to main content") added as first focusable in header.html → targets `<main id="main" tabindex="-1">`. Styled in site.css.
- **Visible focus** — global `:focus-visible` ring (periwinkle, white on navy footer). No outlines suppressed anywhere.
- **Bio modal** — added `aria-labelledby="mName"`, focus moves to close button on open, focus trapped (Tab/Shift+Tab cycle), focus restored to trigger on close, Escape closes.
- **Mobile menu** — `aria-controls` on hamburger, focus moves to close button on open + back to hamburger on close, focus trap + Escape-to-close in load-partials.js.
- **Reduced motion** — hero video no longer autoplays under `prefers-reduced-motion` (poster shown); modal/card hover animations disabled in that mode.
- **Footer copyright** opacity raised .5→.66 to clear 4.5:1 on navy.
- NOTE: when homepage + other pages are built, reuse the same patterns (skip link target id=main, accent-dk CTAs, focus-visible inherited from site.css).

## To Do / Next
- [ ] Connect Vercel
- [ ] Homepage — WAITING on Alie's copy
- [ ] About, Contact, Services hub, Careers, Blog
- [ ] Service detail template → mass-produce ~47
- [ ] Real staff/patient photography (Drive Team + Candid folders empty) — portraits are branded placeholders
- [ ] Confirm live-site forms → JotForm per DE Standard
- [ ] Pull blog posts + service copy from live site

## Open Questions
- Which forms does the live site have (contact, new client, etc.)?
- Horizontal logo lockup available from client?
- Fuller doctor/staff bios from client?
