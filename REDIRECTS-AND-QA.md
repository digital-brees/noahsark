# Noah's Ark — Service Restructure: Redirects & QA

Build date: 2026-06-09 · Built into the existing prototype (locked design system + shared header/footer includes).

## What was built

**5 service hubs** (`/services/…`): Wellness & Prevention, Diagnostics, Surgery, Dental Care, End of Life Care — each with the toggle/accordion structure (native `<details>/<summary>`, collapsed by default), one `<h1>`, "Williamsburg" in title + H1 + intro, bottom CTA, FAQPage + VeterinaryCare JSON-LD, and cross-links.

**1 standalone Emergency page** (`/services/emergency-care`) — your decision; honest about the business-hours-only model (no 24/7). Has a builder note to add the recommended after-hours ER.

**4 blog posts** (`/blog/…`): Cancer in Pets, Heart Disease in Pets, Pet Allergies, Dog Behavior & Training — answer-first prose under question H2s, BlogPosting + FAQPage JSON-LD, CTA to the relevant hub. **Published before their source pages are redirected** (per the migration order).

**Index/support pages**: `/services` hub, `/blog` index (links the 4 posts + links out to the protected high-traffic articles), `/breeds` index, plus factual placeholder pages for About, Careers, Forms, Contact, and Educational Handouts so the new nav has no dead links.

**Nav + footer restructure**: utility bar (phone + Pet Portal + RX Refill + Online Store + Request Appointment, externals open in new tab) + dropdown nav (Home / About⌄ / Services⌄ / Resources⌄ / Contact / Request Appointment). Old per-condition mega-menu removed. Footer Care column replaced with the 5 hubs; Pharmacy kept as a utility link.

## The 3 decisions (your answers)

1. **Phone: (757) 564-9815.** Applied everywhere on the new pages **and** updated in the shared header + footer, so the whole prototype now shows 757 (the old 804 was hard-coded in `includes/footer.html`). ✅ Site-wide fix done.
2. **Emergency: standalone page** built at `/services/emergency-care`. ✅
3. **End of Life:** built, but copy is newly written — page carries a visible **draft banner** to confirm hospice/euthanasia offering with the practice before launch. ⚠️ Remove banner once confirmed.

## 301 redirect table (old URL → new destination)

> Live now in `vercel.json` (`cleanUrls: true`, all `permanent: true`). **46 redirects, no duplicate sources.**
> Note the reconciliation: cancer & cardiology condition pages go to the **blog posts**, not Diagnostics.

| Old URL | 301 destination |
|---|---|
| /dogs/preventive-care-dog-health | /services/wellness-care |
| /cats/veterinary-preventive-care | /services/wellness-care |
| /cats/feline-wellness-checkups | /services/wellness-care |
| /cats/vaccinations | /services/wellness-care |
| /dogs/dog-vaccinations | /services/wellness-care |
| /services/pet-vaccinations | /services/wellness-care |
| /cats/fleas-and-ticks-for-cats | /services/wellness-care |
| /dogs/parasites/flea-and-tick-for-dogs | /services/wellness-care |
| /cats/heartworms-in-cats | /services/wellness-care |
| /dogs/parasites/heartworms-in-dogs | /services/wellness-care |
| /dogs/parasites/deworming-dogs | /services/wellness-care |
| /cats/cat-microchip | /services/wellness-care |
| /dogs/dog-microchip | /services/wellness-care |
| /services/pet-microchipping | /services/wellness-care |
| /cats/spay-neuter | /services/wellness-care |
| /dogs/spay-neuter | /services/wellness-care |
| /services/spay-and-neuter | /services/wellness-care |
| /cats/kitten-care | /services/wellness-care |
| /dogs/puppy-care | /services/wellness-care |
| /cats/senior-cat-care | /services/wellness-care |
| /dogs/senior-dog-care | /services/wellness-care |
| /cats/feline-nutrition-cat-food | /services/wellness-care |
| /dogs/dog-nutrition | /services/wellness-care |
| /cats/feline-diagnostic-imaging | /services/diagnostics |
| /dogs/canine-ultrasound-mri-x-rays-medical-imaging | /services/diagnostics |
| /services/digital-radiology | /services/diagnostics |
| /cats/blood-tests-for-cats | /services/diagnostics |
| /dogs/laboratory-blood-tests | /services/diagnostics |
| /cats/cat-dental-care | /services/dental-care |
| /dogs/dog-dental-care | /services/dental-care |
| /services/dentistry | /services/dental-care |
| /cats/cat-surgery | /services/surgery |
| /dogs/canine-surgery | /services/surgery |
| /services/surgery-0 | /services/surgery |
| /cats/what-know-when-your-cat-needs-anesthesia | /services/surgery |
| /services/pain-management | /services/surgery |
| /dogs/laser-therapy-for-dogs | /services/surgery |
| /cats/laser-therapy-pain-relief-for-cats | /services/surgery |
| /dogs/dog-cancer | /blog/cancer-in-pets-signs-and-treatment |
| /cats/cat-cancer | /blog/cancer-in-pets-signs-and-treatment |
| /cats/heart-disease-in-cats | /blog/heart-disease-in-pets |
| /dogs/dog-cardiologist | /blog/heart-disease-in-pets |
| /dogs/dog-allergies | /blog/pet-allergies-signs-testing-relief |
| /cats/cat-skin-conditions | /blog/pet-allergies-signs-testing-relief |
| /dogs/dog-behavior-dog-training | /blog/dog-behavior-and-training |
| /dogs/dog-pregnancy | /6-signs-of-pregnancy-in-dogs *(existing article — not modified)* |

### .htaccess equivalent (if not deploying on Vercel)
```apache
Redirect 301 /dogs/preventive-care-dog-health        /services/wellness-care
Redirect 301 /cats/veterinary-preventive-care        /services/wellness-care
Redirect 301 /cats/feline-wellness-checkups          /services/wellness-care
Redirect 301 /cats/vaccinations                      /services/wellness-care
Redirect 301 /dogs/dog-vaccinations                  /services/wellness-care
Redirect 301 /services/pet-vaccinations              /services/wellness-care
Redirect 301 /cats/fleas-and-ticks-for-cats          /services/wellness-care
Redirect 301 /dogs/parasites/flea-and-tick-for-dogs  /services/wellness-care
Redirect 301 /cats/heartworms-in-cats                /services/wellness-care
Redirect 301 /dogs/parasites/heartworms-in-dogs      /services/wellness-care
Redirect 301 /dogs/parasites/deworming-dogs          /services/wellness-care
Redirect 301 /cats/cat-microchip                     /services/wellness-care
Redirect 301 /dogs/dog-microchip                     /services/wellness-care
Redirect 301 /services/pet-microchipping             /services/wellness-care
Redirect 301 /cats/spay-neuter                       /services/wellness-care
Redirect 301 /dogs/spay-neuter                       /services/wellness-care
Redirect 301 /services/spay-and-neuter               /services/wellness-care
Redirect 301 /cats/kitten-care                       /services/wellness-care
Redirect 301 /dogs/puppy-care                        /services/wellness-care
Redirect 301 /cats/senior-cat-care                   /services/wellness-care
Redirect 301 /dogs/senior-dog-care                   /services/wellness-care
Redirect 301 /cats/feline-nutrition-cat-food         /services/wellness-care
Redirect 301 /dogs/dog-nutrition                     /services/wellness-care
Redirect 301 /cats/feline-diagnostic-imaging         /services/diagnostics
Redirect 301 /dogs/canine-ultrasound-mri-x-rays-medical-imaging /services/diagnostics
Redirect 301 /services/digital-radiology             /services/diagnostics
Redirect 301 /cats/blood-tests-for-cats              /services/diagnostics
Redirect 301 /dogs/laboratory-blood-tests            /services/diagnostics
Redirect 301 /cats/cat-dental-care                   /services/dental-care
Redirect 301 /dogs/dog-dental-care                   /services/dental-care
Redirect 301 /services/dentistry                     /services/dental-care
Redirect 301 /cats/cat-surgery                       /services/surgery
Redirect 301 /dogs/canine-surgery                    /services/surgery
Redirect 301 /services/surgery-0                     /services/surgery
Redirect 301 /cats/what-know-when-your-cat-needs-anesthesia /services/surgery
Redirect 301 /services/pain-management               /services/surgery
Redirect 301 /dogs/laser-therapy-for-dogs            /services/surgery
Redirect 301 /cats/laser-therapy-pain-relief-for-cats /services/surgery
Redirect 301 /dogs/dog-cancer                        /blog/cancer-in-pets-signs-and-treatment
Redirect 301 /cats/cat-cancer                        /blog/cancer-in-pets-signs-and-treatment
Redirect 301 /cats/heart-disease-in-cats             /blog/heart-disease-in-pets
Redirect 301 /dogs/dog-cardiologist                  /blog/heart-disease-in-pets
Redirect 301 /dogs/dog-allergies                     /blog/pet-allergies-signs-testing-relief
Redirect 301 /cats/cat-skin-conditions               /blog/pet-allergies-signs-testing-relief
Redirect 301 /dogs/dog-behavior-dog-training         /blog/dog-behavior-and-training
Redirect 301 /dogs/dog-pregnancy                     /6-signs-of-pregnancy-in-dogs
```

> ⚠️ **Assumption to confirm:** source URLs are treated as root-relative (`/dogs/…`, `/cats/…`, `/services/…`) matching the live noahsarkvet.com structure. If the live paths differ, adjust the `source` values before going live.

## Leave untouched — DO NOT redirect or edit (protected, ~94% of organic traffic)
- All `/blog` and `/services/.../blog/...` posts
- All `/breeds/` pages
- `/6-signs-of-pregnancy-in-dogs`, `/11-symptoms-of-heat-exhaustion-in-dogs`, `/is-dry-food-bad-for-cats`, `/pet-owners-guide-williamsburg-virginia`
- `/services/pharmacy` (kept as a utility/order link)

## QA checklist

- [x] **No 404s from retired URLs** — every old URL in both docs has a 301 (46 total, validated; no duplicate sources).
- [x] **Blog posts published before source redirects** — 4 posts built; redirects point to them.
- [x] **Protected pages untouched** — no edits to any blog/breed/protected article; linked, not modified (blog index + breeds index link out to them, dog-pregnancy redirects into the existing article).
- [x] **"Williamsburg" in title + H1 + intro** of all 5 service pages + emergency (validated programmatically).
- [x] **One `<h1>` per page; toggle titles are H2s** (`<summary>` content).
- [x] **FAQPage + VeterinaryCare/Service JSON-LD** on service pages; **BlogPosting + FAQPage** on posts — all JSON-LD validated as parseable.
- [x] **Collapsed-by-default toggles, no JS required** — native `<details>/<summary>`.
- [x] **Nav points only to the 5 hubs (+ Emergency)**; old mega-menu removed; Pharmacy kept as utility link.
- [x] **Hubs and posts cross-linked** per the "internal links out" lines.
- [x] **All internal links resolve** (0 broken; all 16 nav targets exist).
- [x] **757 phone** applied site-wide (header + footer updated from 804).
- [x] **WCAG**: skip link, focus-visible, keyboard-operable dropdowns (focus-within + Esc), labeled landmarks, decorative SVGs `aria-hidden`, reduced-motion respected, draft banner contrast AA.

### Still to do before launch
- [ ] Confirm **End of Life** offering with the practice; remove the draft banner.
- [ ] Add the recommended **after-hours emergency hospital** to `/services/emergency-care` (builder note in place).
- [ ] Confirm the **live source URL structure** matches the redirect `source` paths.
- [ ] Wire the real **Breeds** page list and **Forms** (JotForm) / Educational Handouts content.
- [ ] When the homepage is built (pending Alie's copy), link the 5 hubs + an emergency callout.
- [ ] **Resubmit the sitemap** in Google Search Console after deploy.
- [ ] Send to **Cori & Dr. Sparkman** for sign-off.
