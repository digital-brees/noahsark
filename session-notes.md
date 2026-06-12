# Noah's Ark Veterinary Hospital — Session Notes

## Bridging + sticky hero + image dedup/balance + wellness video + prototype lock (2026-06-12, Brees) — DONE, all pages on `site.css?v=59` / `load-partials.js?v=14`
Big iteration + polish session, then locked for client review. All copy still verbatim.

- **SECTION BRIDGING (curved ledges).** Homepage sections lift onto each other with a 40px rounded top + soft upward shadow (the hard color seams become layered ledges). Applied to `.home-story`, `.journey`, `.vz`, `.home-place`, and the trailing `.svc-faq` + `.cta-band` (homepage-scoped). Built/chosen from scratch sandbox `bridging-proto.html` — Brees kept ONLY the curved-panel treatment; **dropped the teal seam-thread and the Find-Us map-straddle** from the proto. `.home-place` sits flush (margin-top:0) so it doesn't collide with the pinned Values zoom-stage. Lift -52px / radius 40 (mobile -36 / 28).
- **STICKY HERO reveal (homepage).** `.home-hero` → `position:sticky;top:0;z-index:0` so it stays pinned while sections scroll up over it. Hero also bumped **90vh → 100vh** (Brees: "more hero, less white space"); Story top-padding trimmed. Reduced-motion fallback drops the sticky. **Two bleed fixes:** (1) FAQ/CTA were static so they painted *under* the z-index:0 hero → gave them z-index 6/7; (2) `.cta-band{margin-top:74px}` left a transparent gap that exposed the pinned video → closed it on the homepage. (Lesson: a sticky z-index:0 hero shows through any static section OR any margin gap above an opaque section.)
- **REUSABLE `.bridge` util (team + wellness).** Added `class="bridge"` to those pages' `<main>`; `.bridge > section:not(:first-of-type)` gets the curve. Relies on DOM-order paint (no z-index needed; heroes here aren't sticky). **`svc-feature` opted OUT** (`.bridge > .svc-feature{...0}`) — its sky-spill + floating dark card clashed with the curve (Brees: "remove the curve here"). First-section "gray band" on the wellness hero = the lift exposing the hero's scrimmed video strip; fixed by tightening `.carely-hero__inner` padding-bottom **76→60px** (NOT by going flush — flush makes the rounded corners reveal the white page bg = invisible curve).
- **WELLNESS HERO → VIDEO** (Brees: "should be a video, not a still"). `carely-hero__bg` img → `<video data-hero>` = `wellness-hero.mp4` (Pexels "boy playing with his dog" in a lush green park, walking/playing so panting-OK, 1.1MB) + `wellness-hero-poster.jpg`. CSS now covers `.carely-hero__bg video`. **Removed the "Wellness & Prevention" pill eyebrow** (H1 leads, matches homepage). Rejected 2 video candidates first (panting close-up; guide-dog w/ harness+cane).
- **IMAGE DEDUP + CAT/DOG BALANCE (home + team + wellness).** Full audit → **every image placement on the 3 live pages is now a unique file** (verified 0 dupes, fixed an accidental same-page `cat-intro`). Strict **ABAB** cat/dog in every grid/value-showcase; ~14 dog / 13 cat site-wide. **Sourced 15 new Pexels stills** (`idx-*`, `team-*`, `well-*`) — rejected ~6 candidates for panting-at-rest dogs or dry/desert landscapes (Brees: "look like Virginia not New Mexico"; the old `value-drive.jpg` was high-desert sagebrush). Hero VIDEO stays a dog; stills lean cat to offset. **Orphaned (unused, kept in repo):** `value-compassion`, `value-drive`, `card-exam`, `card-parasite`, `card-nutrition`, `card-microchip`.
- **FOOTER "Request Appointment" button** was `.btn-primary` (ink bg) on the ink footer = invisible. Now `.footer-brand .ftr-cta` = **light-teal (`--accent-lt`) bg + ink text** (7.4:1 AA), hovers to white.
- **MENU dropdown loosened** (Brees: "too tight"): `.subnav a` padding 11/14 → **16/22**, font 14.5→15, item `gap` 1→8px, container padding 10→14, min-width 236→252.
- **PROTOTYPE LOCK (client review).** `lockPrototype()` in `load-partials.js` greys out (`.is-locked` = opacity .4 + not-allowed) and disables (preventDefault + aria-disabled + tabindex -1) **every link except Home, Team, and Wellness & Prevention** (matched by resolved `a.pathname`, depth-proof). Runs after header/footer inject + on page content. Dropdowns still open on hover so the active Team/Wellness items show among greyed siblings. **Launch removal:** delete the `lockPrototype()` call + the `.is-locked` rule (both commented).
- **FEEDBUCKET** review widget added to the `<head>` of the 3 demo pages (key `DkTFVvCKanwCYWNvzmsR`, commented "remove at launch"). Scoped to the 3 navigable pages; widget UI is outside the link-lock.
- **Cache normalized** to `site.css?v=59` + `load-partials.js?v=14` across all 21 pages.
- **Scratch:** `bridging-proto.html` (noindex sandbox, safe to delete).
- **OPEN:** real Williamsburg photography still pending (all imagery is Pexels stock); the dental hero has a cat poster over the generic placeholder `hero.mp4`; service pages still parked (share one video, a generation behind); blog posts still have no imagery; Feedbucket only on the 3 demo pages (offer: site-wide via load-partials like GTM). At launch: remove prototype lock + Feedbucket, un-park service pages.


## Standards audit + fixes, GTM/GMB/media (2026-06-11 pm, Brees) — DONE, all pages on `site.css?v=48` / `load-partials.js?v=13`
Ran a 3-reviewer audit of the site vs the vet-website-designer skill + DE global rules, then actioned Brees' calls. All copy still verbatim.

- **GTM wired site-wide (was MISSING — hard standard violation).** Container `GTM-592RD6LK` (from Salesforce `Project__c.GTM_Code__c`; GA4 prop `536219164` also on file) injected from ONE spot: `GTM_ID` const at the top of `load-partials.js`. Every page already loads that shared file, so GTM is inherited automatically; new pages need zero steps. Caveat: injects from end-of-body shared script (fires slightly later than a `<head>` snippet; `<noscript>` is best-effort) — known stopgap until Neuron.
- **README.md created** (Step 7 deliverable): aesthetic direction, palette, fonts, copy mode, sitemap, build status, integrations, assumptions.
- **GMB links fixed → real listing.** Found the practice's canonical Google Business Profile from the live site: share link `https://maps.app.goo.gl/iam5n6XTq26e7s8U8`, place CID `0x89b08db21c345753:0x1faa37ac9d2b5897`, coords `37.363977,-76.767599`. Footer + homepage address links now use the share link; homepage map embed locked to the exact `ll` coords (hybrid satellite). (Contact page's inline address link still on the old form — parked with the rest of the contact-page work.)
- **Cache normalized** to `site.css?v=44` / `load-partials.js?v=13` across all pages (cleared the audit-flagged version skew), then bumped through `v=48` over the session.
- **HOME HERO VIDEO = real footage.** Brees picked Pexels "morning walk with dog" (ID 5740002). Downloaded, compressed via ffmpeg (no audio, scaled 1600px, CRF28, faststart → 2.6 MB) to `assets/media/home-hero.mp4` + extracted `home-hero-poster.jpg`. Index hero points to these (its OWN files — generic `hero.mp4` left for the parked service pages). **NEW IMAGE RULE (Brees, now in global `Claude Projects/CLAUDE.md`):** no dogs panting except outdoors playing/walking (panting indoors/at-rest reads as stressed); use cats for calm indoor shots. Applied when curating — dropped indoor dog-hug clips.
- **Facebook icon** added — header utility bar (`.util-social`, left-aligned via margin-right:auto, survives the mobile breakpoint) + footer social row (`.footer-social`, circular button). Links `https://www.facebook.com/noahsarkvet.page/`. (Live site also has Twitter/Pinterest — offered, not added yet.)
- **LOGO white-block BUG fixed.** Both `assets/logo/noahs-ark-{navy,white}.png` were fully OPAQUE with a solid white background (0 transparent px) — the white one was white-on-white, rendering a white block on the dark header/footer. Regenerated both from the navy logo's shape via PIL (solid-color + alpha mask from ink coverage → no fringe): navy-on-transparent + white-on-transparent. Cache-busted logo `src`s to `?v=2` in header + footer.
- **Logo 50% bigger:** header `.brand img` 54→81px, footer 64→96px.
- **Hero eyebrow removed** (homepage) — H1 now leads; `.seq` cascade still works.
- **Button arrows removed** — `.btn .arrow{display:none}` (text-link arrows kept, e.g. `.textlink`/`.xcard`/`.hub-card`).
- **Quick wins:** (1) team Values reordered + spelling to MATCH HOMEPAGE — `01 Compassion · 02 Positive Attitude · 03 Proficiency · 04 Drive` (was Compassion/Drive/Positive Attitude/Proficient); each value kept its image, ARIA wiring intact. (2) removed dead reduced-motion shim in team.html (targeted a nonexistent `.team-hero .bg video`). (3) footer email `info@noahsarkvet.com` added (mailto, envelope icon) between phone + hours.
- **Footer email** now present (was an audit gap).

**Audit items still OPEN:** service-page propagation (5 pages a generation behind — PARKED until client approves first design); contact page completion (map/email/form/emergency/GMB link — PARKED); section bridging (flat color hard-cuts); two "could-be-any-vet-site" blocks (wellness `.svc-cards` grid, homepage `.journey` uniform cards); H1 weight 600 vs skill's 700 (taste). External/blocked: real Williamsburg photography (Drive empty), JotForm forms, emergency after-hours ER, about/careers copy (Alie), Vercel connect, launch swap. Media still queued: Wellness/Story ginger-cat still (ID 31595492); hero-scrim check over the brighter video.

## Homepage polish pass (2026-06-11, Brees) — DONE, all pages on `site.css?v=39`, index on `site.css?v=43` / `load-partials.js?v=12`
Iteration session on the homepage. All copy still VERBATIM from Alie's doc (Brees reaffirmed mid-session: design only, never reword).

- **PALETTE — cream → porcelain (site-wide token swap).** Brees flagged the old `--paper` #FBFAF7 as a dated "magnolia/early-2000s" cream (yellow-green undertone), worst in the big open FAQ block. Built a live comparison (`warmth-options.html`, 5 tones) → chose **Porcelain `#FCFBFA`** (crisp warm-white, undertone neutralized). Also retuned `--paper-2` greige #F2EFE9 → **`#F1F0F3`** (neutral mist, kills the last beige cast in dropdown hovers / img placeholders). Cascades to EVERY page. Cache normalized to `site.css?v=39` across all 20 HTML pages. NOTE: a couple of hardcoded warm scrims (e.g. team.html drifting-portrait veil `rgba(251,250,247,…)`) sit over photos — left as-is, negligible; align later if wanted.
- **HERO trust band → infinite marquee.** Replaced the 4 static fade-in pills (`.trust-bar/.trust-chip`) with a continuous-drift **marquee strip** (`.trust-marquee/.trust-track/.trust-set/.trust-item/.trust-sep`): 4 trust signals glide left separated by the peak mark (teal), hairline-framed band, edge-fade mask, **pauses on hover/focus**, ~26s loop (2 duplicated sets, `trustScroll` translateX -50%). A11y: visible track `aria-hidden`, real `.trust-sr` visually-hidden `<ul>` carries the signals; reduced-motion freezes the drift. Removed the old `.seq:nth-child(5)` + `chipIn` rules.
- **HERO → video background.** `.home-hero__bg` `<img>` → `<video data-hero muted loop playsinline poster=hero-poster.jpg>` (src `hero.mp4` — still the generic placeholder clip; swap for real Williamsburg footage). Hooks the existing reduced-motion-safe `initHeroVideos()` (no autoplay attr; poster for reduced-motion). Dropped Ken-Burns zoom on video, kept it for the `<img>` fallback. Poster is `hero-poster.jpg` (was `hero-owner.jpg` still image).
- **VALUES zoom-stage — header-clip + readability fixes (`initValuesZoom`).** (1) Pinned scene top ~130px was hidden under the fixed header. Root cause: header is fetch-injected (async), so the one-time `headerH()` at init read 0. Fix: measure `headerH()` live and set `--vz-safe` inside `update()` (fires on scroll) so the intro title clears the header; camera centers each beat in the visible area BELOW the header (`ty = headerH + safeH/2 - ly*s`; `beatScale` uses `safeH/1040`). (2) In-card copy was unreadable (canvas card scaled down shrinks fonts) — raised scale multiplier `0.70 → 0.84` and bumped ready `.vz-beat__body p` `25 → 28px`; renders ~17–20px on normal screens. (3) Intro overlay was colliding with card 1 — narrowed `.vz.vz-ready .vz-overlay` max-width `460 → 380`, lede `40ch → 28ch`, +right padding → ~80px gap to the card.
- **SECTION 2 (Story) → sky background + editorial refine.** Background `--paper` → **`--sky`** (matches the Find Us section; brings brand periwinkle up early — rhythm: hero→sky→white→dark ink→sky→FAQ→CTA). Eyebrow swapped `pill-eyebrow--soft` → plain white `.pill-eyebrow` (soft would vanish on sky). Then, after a mockup round (Brees: trust treatments w/ badges/ratings/owner-quote all "felt like an ad" → pivoted to restrained editorial; and "copy should not change" → verbatim only), applied the **"Refined two-column"** treatment: headline `font-weight:600` + **"Since 1983" wrapped `<span class="accent">` in teal**, first `<p class="lead">` emphasized (ink, 500, larger), **hairline-divided stat ledger** (`.stat` border-left dividers, bigger numerals) for the existing 1983/40+/AAHA facts. `.stat dt` bumped `--ink-faint → --ink-soft` for AA on sky (6.1:1; teal keyword 4.85:1). Mobile guard <520px resets dividers. Mockup scratch files (`section2-trust-options.html`, `section2-editorial-options.html`) — safe to delete.
- **FIND US watermark reposition.** `.home-place__bg` per Brees' DevTools values: `top 50→60%`, `left -5→-43%`, `width min(640px,54%)→100%` (kept `translateY(-50%)`). Bigger VA silhouette, bleeds further off the left.
- **MAP → satellite.** Homepage map iframe switched to hybrid satellite (`&t=h&z=17` on the `output=embed` query). CAVEAT: free embed may not honor `t=` reliably — guaranteed fix is a Maps Embed API key (`maptype=satellite`), ties into the GMB-embed launch item.
- **FAQ breathing room.** Shared `.svc-faq` padding-top `96 → 120px`, `.faq-aside` sticky `top 112 → 152px` (header got taller) — also improves service-page FAQs (they pick it up on their next cache bump; only index bumped this round to v=43).

## Find Us — faint Virginia watermark (2026-06-10, Brees) — DONE, index on `site.css?v=33`
- Added a **decorative faint Virginia state silhouette** behind the homepage Neighborhood/"Find Us" section (`.home-place__bg`, inline SVG). Purely ornamental — grounds the section in place, NOT functional (the live Google map stays the functional element).
- Accurate state outline (real path from the `@svg-maps/usa` dataset, tight viewBox `982 250 150 86`), **single flat ink fill at 6% opacity** (no gradient, on-brand), **bleeds off the LEFT edge** behind the copy column so it doesn't read as a second contained map / compete with the map on the right. `aria-hidden`, `pointer-events:none`, content lifted above via z-index; text contrast untouched (AA fine).
- CSS: `.home-place` now `position:relative;overflow:hidden`; `.home-place__bg` absolute left-bleed; `.home-place__inner` z-index:1. Only the homepage uses `.home-place`, so bumped ONLY `index.html` (`site.css?v=32 → v=33`).
- DIALS for later: opacity (6% = whisper; ~8–10% more present), size/position, fill-vs-hairline-outline, optional Williamsburg locator dot (left off to stay purely decorative).

## Header utility-bar cleanup (2026-06-10, Brees) — DONE, on `site.css?v=32`
- **Killed the duplicate "Request Appointment."** There were two — one in the navy utility (top) bar and one in the main nav. Removed the utility-bar one (`.util-appt`); kept the main-header `.nav-cta`. Mobile menu `.mm-cta` appointment button untouched (correct — desktop nav hidden on mobile).
- **Moved the phone** from the far-left of the utility bar to the right end, next to Online Store (where the appt button was). New utility order (right-aligned): Pet Portal · RX Refill · Online Store · (757) 564-9815.
- CSS: `.util-inner` → `justify-content:flex-end`; dropped `margin-right:auto` from `.util-phone`; removed unused `.util-appt` rules. Edited shared `includes/header.html` + `assets/css/site.css`.
- **Cache-bust bumped `site.css?v=31 → v=32` across ALL 20 HTML pages** (shared CSS change, so every page needs the new alignment; header HTML self-updates via fetch).
- Open (minor): on mobile (<940px) only the phone shows in the utility bar and it now right-aligns instead of left — fine, tweak if desired.

## Homepage Values + FAQ + GMB (2026-06-10, Brees session) — DONE, on `site.css?v=31` / `load-partials.js?v=10`
- **Values section REBUILT as a Catskill-style zoom-stage** (replaced the old `.vstory` sticky-crossfade). Desktop + motion-OK: the dark ink band pins (`.vz-ready`, stage 400vh) and a 5600×3900 canvas pans/zooms value→value (4 beats, smoothstep keyframes) along a drawn **teal thread** (reuses the homepage Signature spine language). Title sits top-left over card 1, **fades when you reach card 2**; camera **holds on card 4 then unpins straight into Neighborhood** (Brees cut the pull-back overview). Cards are white "photo cards" on ink, **text on OUTER edge / photo on INNER edge** so the thread never crosses copy. Card scale multiplier 0.70 (Brees: original 0.92 was too big). Mobile / reduced-motion / no-JS = clean **stacked fallback** (JS never adds `.vz-ready`). Engine = `initValuesZoom()` in `load-partials.js`; styles `.vz*` in `site.css` (replaced all `.vstory`/`.vimg`/`.vitem`). Built + tuned via scratch **`values-zoomstage-proto.html`** (kept in repo as sandbox — safe to delete later).
- **Homepage FAQ → collapsing accordion** (native `<details>/<summary>`, collapsed by default) to cut scroll (two long answers bloated the page). Reused the project's accessible toggle pattern; kept sticky aside, 01–07 numbering, question `<h3>`s, all copy, and FAQPage JSON-LD. +/- indicator, teal focus ring, reduced-motion gated. NOTE: this is the **homepage** FAQ — service pages stay open-editorial per the earlier "no toggles" call.
- **GMB linked to the map** (clears the flagged launch blocker): map embed + Neighborhood address + **shared footer address** now query by business **NAME + address**, resolving to Noah's Ark's real Google Business Profile (named pin, 4.7★/346 reviews, "View larger map" → their listing). Builder note updated: swap iframe `src` for the practice's GMB share/embed link or a Maps Embed API key + place_id for the exact canonical embed when provided.

---

**Status:** WELLNESS PAGE = NEW DESIGN-DIRECTION EXEMPLAR, IN ACTIVE ITERATION (2026-06-09 pm). After several rounds, Brees rejected the generic "modern vet" look ("any logo could be on this site") and we pivoted the **Wellness page** to a new direction modeled on the **CarelyGo Webflow template** (warm, photo-forward, light/cheerful, community). This is now the exemplar to validate before propagating to the other 5 service pages. See **"Wellness Redesign — CarelyGo Direction"** section below for full detail + OPEN DECISIONS (accent color coral vs teal is the live open question). Service restructure (5 hubs + emergency + 4 blog posts + dropdown nav + 46 301s) and Team page redesign remain done from earlier in the day.
**Started:** 2026-06-03
**Designer:** Brees
**Local dev:** `py -3 -m http.server 8791` (from project root) → http://localhost:8791/  · Wellness page is on `site.css?v=25` (bump on every css/js change — the HTML + JS are NOT auto-cache-busted, so hard-refresh / bump the `?v=` query when iterating).

---

## Wellness Redesign — CarelyGo Direction (2026-06-09 pm) — THE ACTIVE WORK
Canonical file: `services/wellness-care.html` + shared `assets/css/site.css` + `includes/load-partials.js`. This page is the lab for a new whole-site direction; nothing here has propagated to the other pages yet.

**How we got here (so we don't repeat dead ends):** started from the rich multi-section pattern → added parallax + a cinematic hero zoom (kept) → tried curved section edges (rejected) → floating rounded dark panel (rejected as "still blocky") → an "Ark/arch" concept w/ arched hero portal + peak mark + waterline (liked the *idea*, but) → Brees referenced **https://carelygo-template.webflow.io/** as the real target. Pivoted to that.

**IMPORTANT brand correction (Brees, this session):** the earlier "daycare" rejection was about the **COLORS**, NOT rounded shapes/curves. So curves, pills, rounded cards are all fair game. (The old MEMORY/session note implying "no wave dividers / rounded = daycare" was wrong — shapes were never the problem.)

**CarelyGo language, built in Noah's Ark palette/type (Bricolage + Inter):**
- **Hero** (`.carely-hero`): warm full-bleed photo (`hero-owner.jpg`, woman+golden at sunset), even solid scrim `rgba(26,21,38,.52)`, slow `heroZoom` for motion, header transparent over it. White **pill eyebrow** (`.pill-eyebrow`, white bg, ink text, our **peak mark** SVG inside) + big friendly H1 + community line ("here in the Williamsburg neighborhood since 1992") + Request button + phone. (Replaced the dark arched-portal hero — Brees: dark fought the Light/Cheerful brief.)
- **Intro** (`.svc-intro`, paper): copy + framed **cat** photo (`cat-intro.jpg`) w/ redesigned "Since 1992" mark (accent tick, anchored inside frame).
- **Service cards** = **photo cards** (`.pcards/.pcard`): warm pet photo fills a rounded card, a floating **white label panel** (`.pcard__label`) holds the service name + one line (dark text on white = AA-safe, no risky text-on-photo). 6 cards, 3 dogs/3 cats (`card-exam/vaccine/parasite/spay/microchip/nutrition.jpg`). Hover lifts + zooms. Section bg = **light purple `--sky`** (Brees request), white "What We Offer" pill on it.
- **`--sky` purple spills into the feature** (`.svc-feature::before` height:50%) so the next section's photo + dark card **straddle the purple→paper seam** (Brees's "de-blocking" sketch — content crossing the color boundary).
- **Feature** (`.svc-feature`): still the older **floating dark ink card overlapping an (arch-topped) photo** — works as contrast on the purple spill, but the leftover arch top + dark card are NOT yet reconciled to the CarelyGo language. TODO.
- **FAQ** (`.svc-faq`): editorial sticky-rail + numbered open Q&A (kept from earlier; questions are `<h3>`).
- **CTA**: still the old full-bleed image band — NOT yet reworked.

**Reusable pieces added to site.css:** `.pill-eyebrow` (+`--soft` sky variant), `.peak-eyebrow`, `.pcards/.pcard/.pcard__label`, `.carely-hero*`, `--sky` token, `heroZoom` keyframe, parallax engine in load-partials.js (`[data-parallax]`, reduced-motion gated), directional reveals (`.reveal-right`, `.reveal-delay-*`, svc-card nth-child cascade).

### ACCENT COLOR — LOCKED: TEAL (decided 2026-06-10, Brees)
**Teal** `#1FA6AC / #0E7378 / #7FD0D4` is the locked accent (`--accent` fills/marks · `--accent-dk` white-text buttons + marks/links on light, AA · `--accent-lt` accent text on dark ink). Already live in committed code (v25) — no token swap needed. Chosen via a side-by-side scratch (`accent-decision.html`, now deleted) on the real hero photo + `--sky` purple: teal pops cool-on-warm and stays crisp; Coral camouflaged into the warm sunset hero. Rejected along the way: periwinkle (retired — too same-hue as the purples, muddy), gold/amber ("omg no, worse"), Coral `#E8765A / #C24B33 / #F4A48F` (warm but blended into the hero).

### DONE 2026-06-10 (Brees session) — Wellness exemplar polish complete, now on `site.css?v=27`
1. **Accent LOCKED = Teal** (see decision block above). 2. **Feature reconciled:** dropped the arch (`.svc-feature__media` border-radius now `var(--r-lg)`), KEPT the dark indigo overlap card as the mid-page contrast anchor + the `--sky` purple spill straddle (Brees chose "keep dark card, drop arch"). 3. **CTA warmed:** swapped image to `owner-lab.jpg` (warm golden owner+dog), lightened scrim `.78`→`.68` to reveal the warmth, white text/pill (AA worst-case ~6:1), body bumped to `rgba(255,255,255,.9)`, phone icon→white (Brees chose "keep image band, warm it"). 4. **Pill-eyebrow consistency pass:** ALL section tags now one language — white `.pill-eyebrow` on dark/photo/color bg (hero, cards, feature card, CTA), `.pill-eyebrow--soft` (sky) on paper (intro, FAQ). Retired the plain `.eyebrow` + `.peak-eyebrow` instances on this page. Every pill carries the peak mark.

### NEXT (when we pick back up)
1. **Template the locked Wellness system across the other 5 service pages** (Diagnostics/Surgery/Dental/End-of-Life/Emergency): carely-hero, pcards on `--sky`, dark-card feature (no arch), warm photo CTA, unified pill eyebrows. Each needs its own imagery + copy but reuses the exact components. 2. Real local Williamsburg photography eventually (all current photos are Pexels stock placeholders). 3. Then homepage (await Alie copy), Vercel connect, JotForm forms.

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

## Team Page — Light Harmonize (2026-06-10)
Brought `team.html` into sync with the locked Wellness direction WITHOUT redesigning it (Brees chose "light harmonize"). The page already inherited **teal** automatically (it uses shared `var(--accent)` tokens — no hardcoded periwinkle hex), so only two things were out of sync, both fixed:
- **All 5 plain `.eyebrow` tags → unified pill-eyebrows** (same rule as Wellness): white `.pill-eyebrow` on hero (light photo veil), dark Doctors section, and Careers CTA (photo); `.pill-eyebrow--soft` (sky) on the paper Values + Support sections. Each carries the peak mark. Verified rendering on all 5.
- **Cache-bust bumped `?v=4` → `?v=27`** (was stale; shared CSS is the same file, the bump just forces a fresh fetch).
Design otherwise unchanged — the drifting-portrait hero, interactive Values showcase, dark Doctors, and full-bleed CTA all stand. (Team is an about/team page type, so it intentionally does NOT take the full CarelyGo warm/photo-forward service-page treatment.)

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

## HOMEPAGE — v1 BUILT (2026-06-10) — in review
`index.html` (was a 429-byte placeholder) is now the full homepage, built on the locked CarelyGo direction (teal, Bricolage+Inter, pill eyebrows, warm photo-forward), full WCAG 2.1 AA, all motion reduced-motion gated. Copy is **VERBATIM from Alie's doc** (Drive: "Noah's Ark Veterinary Hospital — Homepage Copy (For Review)", id `132Zr9_PdVzFEJMLqpxhFP9fm8CzTc_MZJ6GnWPSAaM0`).

**Sections (7) + storytelling treatments (refs: Catskill continuous-line spine + Woodhaven motion):**
1. **Hero** (`.home-hero`) — warm full-bleed `hero-owner.jpg`, scrim `.60`, Ken-Burns `heroZoom`. **Sequenced load**: pill → H1 → subhead → actions → trust-bar, then 4 trust chips fade in 1-by-1 (CSS `seqUp`/`chipIn`, reduced-motion = all visible). "Request an Appointment" (teal) + "Call Us" link. Trust chips have own dark bg for AA over photo.
2. **Story — Independently Owned Since 1983** (`.home-story`, paper) — 3 verbatim paras + `.stat-strip` (1983 / 40+ / AAHA; the 40+ **counts up** on scroll via `initCountUp`, `data-plain` opts the year out) + framed parallax `team-hero.jpg` w/ "Est. 1983" stamp.
3. **THE SIGNATURE — Care for Every Stage** (`.journey`, white) — scroll-linked **teal spine** (`initJourney` draws `.journey__line-fg` via stroke-dashoffset as the section passes through; reduced-motion = fully drawn static). 6 services as a life-journey, zig-zag (`nth-of-type(even)` flip — NOTE the inline `<svg>` is the track's first child, so must be nth-of-type not nth-child), node dots on the line, hover image-zoom. Links to the 5 service hubs (+ Senior→wellness).
4. **Values** (`.vstory`, DARK ink band) — **REDESIGNED 2026-06-10**: Brees rejected the first version (2×2 frosted-glass cards — "glass boxes are an AI giveaway"; section's job is TRUST). Now a **cinematic pinned, photo-anchored story**: a sticky full-height image column **crossfades** between 4 warm owner+pet photos as the 4 values scroll past as oversized editorial entries (big teal index, name, copy, hairline-divided — NO boxes); active value lights teal (`initValueStory`, IO center-band `rootMargin:-45% 0 -45%`). Reduced-motion/no-IO = first image holds + clean static stack (no dimming). Mobile (≤900px) = sticky media hidden, each value shows its own inline image stacked above the copy. **4 NEW images pulled from Pexels + optimized** (`assets/media/value-{compassion,positive,proficiency,drive}.jpg`, 1200×1800): compassion=woman hugging husky pup, positive=boy+dog sunny field, proficiency=woman holding cat soft-light, drive=man+dog hiking at sunset. All pet-owner lifestyle (faces OK per rules, no clinical/gloves). Still stock — swap for real Noah's Ark team/client photos when available.
5. **Neighborhood** (`.home-place`, sky) — copy + facts (address/hours/phone) + **Google map embed**. White pill (sky bg).
6. **FAQ** (`.svc-faq` reused) — 7 verbatim Qs, FAQPage JSON-LD.
7. **Closing CTA** (`.cta-band--image` reused) — "There's Room for Your Pet…", warm `cta-join.jpg`, teal button.
- JSON-LD: VeterinaryCare + FAQPage. `site.css?v=28`, `load-partials.js?v=8` (added `initJourney` + `initCountUp`).

**FOUNDING YEAR FIXED → 1983** (Brees confirmed): updated about.html (meta+H1), footer (shared), team.html (meta+pill), wellness (intro+cap) from "1992"→"1983". **Left Jill Moon's bio "since 1992" intact** (that's her real staff tenure — the likely source of the original mix-up).

**OPEN / follow-ups before launch:**
- **GMB link (flagged per skill):** the map + address use a generic `maps?q=address` embed — NOT the real Google Business Profile place. Need the practice's actual GMB listing URL. Builder note left in `index.html`. Applies to footer address too (currently plain text, not linked).
- **GTM (project-wide gap):** no Google Tag Manager on the site yet. Per DE Standard it must load on every page; needs the container ID from Salesforce `Project__c.GTM_Code__c`. Add across all pages before launch.
- **Imagery:** all homepage photos are existing Pexels stock placeholders reused from `assets/media/` (hero reuses the wellness hero shot; journey reuses card/owner photos — warm + on-brand but generic, not service-literal). Swap for real local Williamsburg photography (Drive folders still empty), and ideally give the homepage hero its own distinct shot vs wellness.
- Review hero scrim warmth (.60) vs the wellness hero (.52) — went heavier for AA on the extra small text (sub + chips).

## To Do / Next
- [ ] Homepage review w/ Brees → iterate → connect the 5 hubs are already linked from the journey
- [ ] GMB listing URL (map + footer/contact address links) — BLOCKING for accurate map
- [ ] GTM container ID from Salesforce → add site-wide
- [ ] Connect Vercel
- [ ] About, Contact, Services hub, Careers, Blog
- [ ] Service detail template → mass-produce ~47
- [ ] Real staff/patient photography (Drive Team + Candid folders empty) — portraits are branded placeholders
- [ ] Confirm live-site forms → JotForm per DE Standard
- [ ] Pull blog posts + service copy from live site

## Open Questions
- Which forms does the live site have (contact, new client, etc.)?
- Horizontal logo lockup available from client?
- Fuller doctor/staff bios from client?
