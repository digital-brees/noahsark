# Noah's Ark Veterinary Hospital — Session Notes

**Status:** SERVICE RESTRUCTURE BUILT + DESIGN ITERATION IN PROGRESS (2026-06-09) — 5 service hubs + emergency + 4 blog posts + new dropdown nav + 46 301 redirects. Service-page DESIGN reworked after Brees feedback: cinematic video heroes, breadcrumbs removed, toggles removed, **Wellness rebuilt to the rich multi-section DE pattern (exemplar) — awaiting Brees sign-off before propagating to the other 5.** Team page redesign also complete. WCAG AA enforced.
**Started:** 2026-06-03
**Designer:** Brees
**Local dev:** `py -3 -m http.server 8791` (from project root) → http://localhost:8791/

---

## Service Restructure / SEO Migration (2026-06-09)
Built to two SEO build docs (`noahs-ark-5-page-build-doc` + `noahs-ark-blog-posts-build-doc`). Goal: collapse ~50 per-condition pages into **5 clean service hubs**, move educational content to **blog posts**, and 301 everything so nothing 404s. Full deliverable detail in **`REDIRECTS-AND-QA.md`** (redirect table, .htaccess block, QA checklist).

**Built (all on the locked design system + shared includes):**
- **5 service hubs** in `services/`: `wellness-care.html`, `diagnostics.html`, `surgery.html`, `dental-care.html`, `end-of-life-care.html`. Pattern: light `.page-hero` (eyebrow + H1 + intro), `<details>/<summary>` toggle accordions (collapsed by default, question H2s, answer-first prose), cross-link cards, navy `.cta-band`. FAQPage + VeterinaryCare JSON-LD each.
- **1 standalone Emergency page** `services/emergency-care.html` (Brees' decision — honest business-hours-only model, no 24/7; builder note to add after-hours ER).
- **4 blog posts** in `blog/`: `cancer-in-pets-signs-and-treatment`, `heart-disease-in-pets`, `pet-allergies-signs-testing-relief`, `dog-behavior-and-training`. `.prose` layout, BlogPosting + FAQPage JSON-LD. Built BEFORE redirecting sources.
- **Index/support pages (root):** `services.html` (hub grid, 6 cards), `blog.html` (4 posts + links OUT to protected articles), `breeds.html` (placeholder hub, links out — protected breed pages NOT touched). Plus factual placeholder pages so the new nav has no dead links: `about.html`, `careers.html`, `forms.html`, `contact.html` (real NAP/hours), `resources/educational-handouts.html`. Placeholders carry builder notes; About/Careers copy still pending Alie.
- **Redirects:** `vercel.json` (`cleanUrls:true`, 46 `permanent` 301s, no dup sources). Cancer + cardiology condition pages reconciled to the **blog posts** (not Diagnostics).

**Shared component changes (affect team.html too):**
- `includes/header.html` — rebuilt: navy **utility bar** (phone + Pet Portal + RX Refill + Online Store + Request Appointment, externals `target=_blank rel=noopener`) + **dropdown nav** (Home / About⌄[Team,Careers] / Services⌄[5 hubs + Emergency] / Resources⌄[Forms,Blog,Breeds,Educational Handouts] / Contact / Request Appointment). Old flat nav replaced.
- `includes/footer.html` — phone **804→757**, Care column replaced with the 5 hubs + Emergency, added Pet Portal/RX/Store utility links.
- `includes/load-partials.js` — added Esc-to-close for dropdowns (hover/`:focus-within` reveal handles the rest).
- `assets/css/site.css` — appended: `.util-bar`, dropdown nav (`.has-sub/.subnav`), `.page-hero/.crumbs`, `details.tog` toggles, `.prose`, `.crosslinks/.xcards`, `.cta-band/.cta-phone`, `.hub-grid/.hub-card`, `.post-list`, `.draft-flag`, `.footer-utility`. **Cache-bust bumped `?v=2`→`?v=3`** (updated on team.html too).

**Decisions made (Brees, this session):** phone = **(757) 564-9815** (applied site-wide incl. header/footer); Emergency = **standalone page**; build = **integrate into prototype** (not standalone files).

**Pending before launch:** confirm End-of-Life offering (remove draft banner) · add after-hours ER to emergency page · confirm live source-URL structure matches redirect `source` paths · wire real Breeds list + Forms (JotForm) + handouts · homepage (Alie copy) link the 5 hubs + emergency callout · resubmit sitemap in GSC · sign-off Cori & Dr. Sparkman.

**Known minor:** taller header (util bar + main) means team.html drifting-portrait hero `top:86px` may sit slightly under the bar — veil covers it, but nudge the offset if it bugs.

---

## Service-Page Design Iteration (2026-06-09, after Brees feedback)
Three rounds of feedback reshaped the service-page design. Key reference: **Lewis & Clark `wellness-and-prevention.html`** is the canonical DE service-page pattern (video hero → editorial intro w/ custom visual → numbered icon cards → split image+copy highlight → image CTA band). Noah's Ark service pages are being brought to that pattern in the LOCKED Noah's system (Bricolage/Inter, indigo+periwinkle, hairlines, solid-navy icon tiles, NO gradients/solid scrims only).

**Done across all 7 service surfaces (hub + 5 details + emergency):**
- **Cinematic full-bleed video heroes** (`.svc-hero`): `<video data-hero>` (hero.mp4 placeholder) + per-page poster + solid navy scrim + `.scrim-base`, white overlaid eyebrow/H1/intro, bottom-anchored. Header now transparent over hero (removed `data-header="solid"`), goes solid on scroll. Reduced-motion safe: video only plays via JS when motion allowed (no `autoplay` attr) — handled in `load-partials.js` `initHeroVideos()`.
- Per-page hero posters: wellness=owner-beagle, diagnostics=proficient-cat, surgery=owner-lab, dental=cta-join, end-of-life=team-hero, emergency+hub=hero-poster.
- **Breadcrumbs removed** site-wide (Brees disliked them). **Hero intros trimmed** to one tight line each (kept Williamsburg in title+H1+intro).
- **Toggles/accordions removed** (Brees: "we decided we weren't doing that" — they actually came from the SEO build doc spec). All converted to OPEN editorial Q&A (`.svc-block`, 2-col question/answer, hairline rhythm). FAQPage JSON-LD kept in head.

**Wellness = rebuilt EXEMPLAR (full rich pattern), awaiting sign-off:** hero → `.svc-intro` (copy + framed photo w/ "Since 1992" caption card) → `.svc-cards` (6 numbered icon cards: Exams/Vaccines/Parasites/Spay-Neuter/Microchip/Nutrition, navy icon tiles, periwinkle accent, hover lift) → `.svc-split` (parasite/Virginia highlight + photo) → `.svc-faq` (full Q&A, one section near bottom, backs schema) → `.cta-band--image` (photo + solid scrim). New CSS in site.css: `.svc-intro/.svc-cards/.svc-grid/.svc-card/.svc-split/.svc-faq/.cta-band--image`. **Wellness on `?v=5`; other pages still `?v=4`.**

**NEXT (pending Brees OK):** propagate the rich pattern to Diagnostics, Surgery, Dental, End-of-Life, Emergency (each: own icon cards + split + imagery), bump all to `?v=5`. Open Qs for Brees: (1) is the pattern right? (2) full-bleed vs split hero (L&C uses split mirroring its team hero); (3) unique per-service video clips vs wait for real clinic footage (only hero.mp4 placeholder exists now).

---

## Team Page Redesign (2026-06-09)
A full visual pass on `team.html` to make it less templated, more characterful, and full WCAG 2.1 AA. Body now sets `data-header="solid"` (header is light-page solid: navy logo/nav on white). `site.css` link cache-busted (`?v=2`).

- **HERO — drifting portrait grid (Woodhaven JoinBand-inspired):** replaced the dark video hero. Now a LIGHT hero — an 8×3 grid of the 12 real staff portraits (each used twice) drifting/panning slowly (staggered `hdrift` keyframes), sunk under a solid paper veil `rgba(251,250,247,.82)` so faces read as warm texture, not a directory (avoids redundancy with profiles below). Centered headline "The familiar faces behind the **care**". Decorative grid (`aria-hidden`, empty alts). Client brief: professional / light / cheerful / happy / animated.
  - `min-height:80vh`. Grid starts at `top:86px` (clears the fixed header so top-row heads aren't clipped). `object-position:center 18%` to frame heads high. **Portrait order is hand-tuned so no portrait's two copies are ever adjacent** (holds in both 8-col desktop and 4-col mobile reflow). Drift halts under `prefers-reduced-motion`.
  - OPEN: veil opacity dial (.82 now; lower=more cheerful faces, higher=subtler). Real candids/headshots will improve it (some current crops are loose, e.g. Pate beach shot).
- **SECTION 2 — interactive Values showcase (chose direction "L"):** replaced the flat 4-col value grid. Accessible tablist (value menu left) + crossfading image stage right with a solid-navy caption card (guaranteed contrast). Hover OR click switches; roving tabindex + arrow/Home/End keys; `role=tablist/tab/tabpanel`, `aria-selected/controls/labelledby`, inactive panels `aria-hidden`. Periwinkle active-bar + numbers + tick. Images: Compassion=owner-beagle, Drive=team-hero, Positive Attitude=cta-join, **Proficient=proficient-cat.jpg** (Pexels British Shorthair, swapped in per request so both species show). OPEN: hover-vs-click (currently both).
- **SECTION 3 — doctors now DARK:** added `.team-section.dark` (bg `--ink` #342D4F), white head text, white vet cards float with shadow. Gives page color rhythm: light hero → light values → dark docs → light staff → image CTA → dark footer.
- **JOIN CTA — full-bleed image, centered text:** replaced the old split-band (read "templated"). Full-bleed `cta-join.jpg`, solid navy scrim `rgba(26,21,38,.64)` (tuned so white body text clears 4.5:1), centered eyebrow/headline/buttons. No gradient.
- **Scratch/demo files (safe to delete):** `section2-directions.html`, `-v2/-v3/-v4.html`, `hero-directions.html`, `a11y-cta-compare.html`, `brand-navy-compare.html`. Used to pick directions with Brees.
- **WCAG hook active:** `~/.claude/hooks/wcag-*.sh` remind on every html/css edit + session stop; all edits checked.

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
