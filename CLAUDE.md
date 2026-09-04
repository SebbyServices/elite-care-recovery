# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

> **Operating manual for Claude Code sessions on this project.**
> Read this file first, every session, before touching code.

---

## Project Snapshot

- **Client:** Elite Care Recovery LLC (Miami, FL)
- **Business:** Distributor of the NICE1 Cold + Compression Recovery System (post-op equipment rental)
- **Owner contact:** Chris Pierce: (305) 804-5214
- **Site contact email:** `info@elitecarerecovery.net` (live on all three pages as of commit `ac73254`)
- **Domain:** `elitecarerecovery.net`: purchased and live. Root `CNAME` file contains `www.elitecarerecovery.net`
- **Repo:** `github.com/SebbyServices/elite-care-recovery`: GitHub Pages serves `main` at repo root
- **Engagement type:** Free demo site to show capability → upsell to paid retainer or productized package
- **Developer:** SebbyIT Consulting, Corp.

**Deploy = push to `main`.** There is no staging branch and no CI. A bad push is live within a minute.
**Do not hand-edit `CNAME` casually.** Git history shows it created/deleted four times because editing the
custom-domain field in GitHub Pages Settings rewrites the file and conflicts with local edits. Change it in
one place (Settings *or* the file), then pull.

---

## Tech Stack: LOCKED

**Do not change without explicit approval.**

- Plain HTML5 + CSS3 + vanilla JS
- No build step, no npm, no bundler, no framework
- No Tailwind, no React, no Vue, no Astro
- Single `styles.css`, single `main.js`
- Google Fonts loaded via `<link>` (Playfair Display + Inter)
- Inline SVG icons only. No icon libraries
- Form: Formspree free tier. **Live ID `xeedwqvp`** is already wired into `index.html`. Do not revert it to a placeholder.

**Why locked:** The client is non-technical, the site is hosted on GitHub Pages, and the handoff has to be readable by any web dev. Adding a framework would create maintenance debt that doesn't match this engagement's value tier.

---

## Source of Truth: Read These in Order

1. **`BUILD_PROMPT.md`**: full site spec covering page structure, sections, copy placement, design tokens, technical requirements
2. **`CONTENT_DECK.md`**: verbatim approved copy from the client (bio, vision, mission, objectives, product info). If anything in `BUILD_PROMPT.md` conflicts with this file, **`CONTENT_DECK.md` wins**.
3. **`README.md`**: what ships with the repo (local dev, deploy, Formspree setup, pre-launch checklist)
4. **`HANDOFF.md`**: the client-facing launch guide sent to John. Written *for a non-technical reader*; if you change how the site is deployed, maintained, or how the form works, update this file too or the client's instructions go stale.
5. **`CLAUDE.md`**: this file (how to operate on this project)

If any of these are missing or contradictory, stop and ask Sebastian before generating code.

---

## Brand & Design Tokens

```css
:root {
  --color-bg: #FAF7F2;           /* warm off-white / cream */
  --color-bg-alt: #F2EDE5;       /* deeper cream, alt sections */
  --color-charcoal: #1A1A1A;     /* primary text */
  --color-charcoal-soft: #3A3A3A;/* secondary text */
  --color-blue: #1E6BFF;         /* Elite Care signature blue (from logo) */
  --color-blue-dark: #0F4FCC;    /* hover state */
  --color-gold: #B8965A;         /* sparse luxury accent */
  --color-border: #E5DFD3;
  --color-shadow: rgba(26, 26, 26, 0.08);
}
```

**Color discipline:**
- Charcoal = text. Cream = background. Blue = CTAs + logo.
- Gold is an accent used for hairlines, small dividers, and stat underlines. **Never** a background, button fill, or large element.
- Always force `background-color` on `html`, `body`, and section wrappers. Never rely on inherited backgrounds.
- Always pair text color and background color explicitly (no opacity-based text).

**Typography:**
- Headlines: Playfair Display (serif, weight 500–700), editorial feel, tight leading (1.1), letter-spacing -0.02em
- Body: Inter (400 body, 500 emphasis, 600 nav/buttons)
- Fluid scale via `clamp()`. H1 hero: `clamp(2.5rem, 5vw, 4.5rem)`
- Body size: 17px (`1.0625rem`) with line-height 1.65. Audience skews older, so prioritize readability

**Layout:**
- Max content width: 1200px
- Section padding: `clamp(4rem, 8vw, 8rem)` vertical
- Generous whitespace > density
- Border radius: 4px or 0 (sharp/editorial). **Never** pills, never round buttons.

---

## Site Architecture

```
/
├── index.html         Homepage (hero → benefits → product → how it works → stats → reserve form)
├── about.html         About Us (story → stats band → why us → blue CTA band)
├── culture.html       Vision → Mission → Core Values → Objectives → blue CTA band
├── styles.css         Every style in the project (~1240 lines)
├── main.js            Every behavior in the project (~205 lines)
├── favicon.svg        At root, not in assets/. Referenced as href="favicon.svg"
├── CNAME              www.elitecarerecovery.net (GitHub Pages custom domain)
├── assets/            logo, nice-lifestyle.png, flyer-front.png, nice-product-brochure.pdf
├── BUILD_PROMPT.md    Spec
├── CONTENT_DECK.md    Approved copy
├── HANDOFF.md         Client launch guide
├── CLAUDE.md
└── README.md
```

`proposal.html` is a **standalone sales/audit document** (self-contained `<style>` block, not linked from
the site, currently untracked). It is not a site page. Never add it to nav, and don't refactor it to use
`styles.css`.

**Three pages only for v1.** Do not add blog, services, testimonials, or pricing pages without approval.

---

## Architecture: What Requires Reading Multiple Files

Three flat HTML pages sharing one stylesheet and one script. The important structure is what's *duplicated*
and what's *implicit*.

### The nav, mobile menu, and footer are copy-pasted into all three pages

There is no templating. `<nav>`, the `.mobile-menu` overlay, and `<footer>` exist verbatim in `index.html`,
`about.html`, and `culture.html`. **Any change to them must be applied three times.** Verify with:

```bash
diff <(sed -n '/<nav>/,/<\/nav>/p' index.html) <(sed -n '/<nav>/,/<\/nav>/p' about.html)
```

The only *intended* divergence: the reserve form lives on the homepage, so subpages link
`index.html#reserve` where the homepage links `#reserve` (in both the nav CTA button and the footer quick
links). Preserve that asymmetry. Making them identical breaks the subpage CTAs.

`index.html`'s footer additionally carries three `<!-- TODO: ... -->` comments (contact email, 24/7 delivery
claim, social handles) that the subpages don't. That's the only other difference.

### `.mobile-menu` sits *outside* `<nav>` on purpose

Marked in the HTML as "outside nav to fix fixed positioning bug". A positioned ancestor would trap the
fixed overlay. Do not move it back inside `<nav>` while tidying markup.

### Section backgrounds are class-driven, not inline

`styles.css:135-160` defines the alternating rhythm as element-scoped utilities. Sections take a class; they
never take an inline `background-color`:

| Class | Effect |
|---|---|
| `section.bg-cream` | `--color-bg` |
| `section.bg-cream-alt` | `--color-bg-alt` |
| `section.bg-charcoal` | charcoal bg, white text, **gold eyebrows** (auto-handled) |
| `section.bg-blue` | signature blue bg, white text. Used for the bottom CTA bands on About/Culture |

The bare `section` selector supplies `padding: clamp(4rem, 8vw, 8rem) 0`, so a new `<section>` gets correct
vertical rhythm for free. Wrap inner content in `.container` (max-width 1200px). `.split-50-50` is the
two-column grid: one column below 1024px, two above.

### `styles.css` is organized as 11 banner-commented blocks

In order: Root/base → Navigation → Hero → Buttons → Cards → Forms → Image Placeholders → Typography
Utilities → Footer → Accessibility & Focus States → Responsive Media Queries. Add new rules inside the
matching block rather than appending to the end. Find them with `grep -n '^/\* ===' styles.css`.

Mobile-first: media queries are `min-width` at 640/768/1024/1280px. The single `max-width: 1023px` query
(styles.css:278) is deliberate. It hides desktop nav links below the mobile-menu breakpoint. There's also a
`@media print` block at the end.

### `main.js`: five behaviors, no framework, no DOMContentLoaded

Loaded as a plain `<script src="main.js">` at the end of `<body>` on all three pages, so it executes with
the DOM already parsed. Behaviors: sticky-nav `.scrolled` toggle at 50px → mobile menu (click delegation on
`document` + Escape key + outside-click) → smooth scroll for `a[href^="#"]` → Formspree fetch submit →
IntersectionObserver fade-in.

Two things that surprise people:

1. **The fade-in CSS is injected at runtime.** `main.js` appends a `<style>` block to `<head>` defining
   `.fade-out` / `.fade-in` / `@keyframes fadeInUp`. Searching `styles.css` for those classes finds nothing.
   Every `section`, `.card`, and `.step-card` is set to `.fade-out` on load and revealed on intersection, 
   so **a section that never intersects stays invisible**. Watch this when adding above-the-fold content.
2. **The form handler binds `document.querySelector('form')`**: the *first* form on the page only. A second
   form anywhere would silently get no JS enhancement. It also `preventDefault()`s unconditionally, so the
   no-JS POST fallback only applies when JS fails to load at all.

`setActiveNavLink()` at the bottom derives the active nav item from `window.location.pathname` and adds
`.active` to the matching `.nav-links a`. **New pages need no JS change**, just matching `href`.

---

## Development Commands

Since this project has **no build step**, development is streamlined:

```bash
# Serve locally (recommended for testing forms & relative links)
python3 -m http.server 8000
# Then visit http://localhost:8000 in your browser

# Or use any simple HTTP server:
npx http-server .
```

**No linting, formatting, or test runner needed.** Code review happens via:
- Manual browser testing at 375px, 768px, 1280px viewports
- Chrome DevTools Lighthouse audit (Performance 90+, Accessibility 95+, Best Practices 95+)
- HTML validation: paste URLs into [validator.w3.org](https://validator.w3.org/)
- Accessibility testing: Tab through all pages with keyboard only; use browser's accessibility inspector

**Hot reload workflow:**
1. Edit `.html`, `.css`, or `.js` file
2. Save
3. Refresh browser (Cmd+R or F5)
4. No cache issues since no build step

---

## Common Patterns

Reusable patterns for adding content to this site. **Styling lives in `styles.css`.** The existing pages
use classes, not inline `style` attributes. Match that; don't introduce inline styles.

### Adding a new section to a page
```html
<!-- Alternate against the section above it: bg-cream / bg-cream-alt -->
<section class="bg-cream-alt">
  <div class="container">
    <p class="eyebrow">Section Label</p>
    <h2>Section Title</h2>
    <p>Section content here.</p>
  </div>
</section>
```
`.eyebrow` is the uppercase gold label above a headline, it auto-recolors inside `.bg-charcoal`.
The section is invisible until it intersects the viewport (see the `main.js` note above).

### Image placeholder (when asset missing)
Use the `.image-placeholder` class already defined in the Image Placeholders block of `styles.css`:
```html
<div class="image-placeholder">
  <p>Placeholder: 800x600, "Photo of NICE1 in clinical setting"</p>
</div>
```

### Form input
Inputs are styled by the Forms block in `styles.css`; markup only needs the label association:
```html
<div class="form-group">
  <label for="name">Full Name</label>
  <input type="text" name="name" id="name" required />
</div>
```
Focus rings come from the Accessibility & Focus States block (gold, 2px, 2px offset), don't override them.

### Adding a new page
1. Copy an existing page and strip the `<main>` contents, this carries nav, mobile menu, footer, script tag, and the skip link
2. Update `<title>`, `<meta name="description">`, and the Open Graph tags
3. Add the nav link to `.nav-links` **and** `.mobile-menu` in all existing pages (three files, two places each)
4. Point in-page CTAs at `index.html#reserve`, not `#reserve`, the form only exists on the homepage
5. No `main.js` change needed; `setActiveNavLink()` picks up the new page from its `href`
6. Test at 375px, 768px, 1280px

---

## Behavioral Rules for Claude Code on This Project

### 1. Stay in the lane
- v1 is a **marketing brochure site**. Three pages. One form. No more.
- Do NOT add features the client didn't ask for (no chat widgets, no cookie banners beyond minimal, no analytics beyond what Sebastian approves, no booking calendars, no payment integration).
- If something feels like it'd be cool to add, write it as a follow-up note in `README.md`'s pre-launch checklist instead of building it.

### 2. Premium > clever
- This is a **white-glove, family-owned medical service brand**. The aesthetic target is high-end concierge medicine, not SaaS startup.
- More whitespace, calmer pacing, editorial typography. Lean serif headlines, restrained color, gold used sparingly.
- Reject any temptation toward gradients, neon, glassmorphism, playful illustrations, animated emoji, or trend-chasing UI.

### 3. Contrast and readability are non-negotiable
- Audience skews 50+ post-op patients. Type must be legible.
- Always explicitly set background + text color. Never trust inheritance.
- Minimum body size 16px; we're using 17px for headroom.
- Test focus states, older users tab through forms.

### 4. Accessibility is table stakes
- Semantic HTML (`<header>`, `<nav>`, `<main>`, `<section>`, `<footer>`, `<article>`)
- Alt text on all images (descriptive, not "image of")
- ARIA labels on icon-only buttons
- Visible focus states (gold outline on tab)
- Skip-to-content link for keyboard users
- Form labels properly associated with inputs

### 5. No HTML walls
- Build the site as separate `.html` files with shared `styles.css` and `main.js`.
- Do NOT paste entire pages into single `<div>` blobs.
- Use semantic sections. Comment major sections in HTML.

### 6. Image placeholders, not lorem ipsum images
- When an image asset doesn't exist, render a **styled placeholder div** with a dashed gold border and descriptive text inside (see `BUILD_PROMPT.md` for the exact pattern).
- Never use `https://via.placeholder.com` or external placeholder services.
- Never leave broken `<img>` tags.

### 7. Formspree is live: leave the ID alone
- `index.html` posts to `https://formspree.io/f/xeedwqvp`. This is the client's real form. Never replace it with a placeholder, and never point it at a test endpoint "just to try something."
- Keep `method="POST"` and the real `action` on the `<form>` element so submission degrades gracefully if `main.js` fails to load.
- Free tier = 50 submissions/month. Don't burn quota with repeated live submits; test the UI states by stubbing `fetch` in DevTools instead.

### 8. Mobile-first
- Start with mobile styles. Expand with `min-width` media queries at 640px, 768px, 1024px, 1280px.
- Touch targets minimum 44x44px.
- Test that the hero, nav, and form work on a 375px viewport.

### 9. Honor the alternating-section rhythm
- Sections alternate `.bg-cream` / `.bg-cream-alt`, apply the class, never an inline background.
- The Stats band breaks the rhythm with `.bg-charcoal` for dramatic contrast.
- The bottom CTA bands on About and Culture use `.bg-blue` for energy and reinforcement.
- Inserting a section means re-checking the sections *below* it, two adjacent `.bg-cream` sections read as one undifferentiated block.

### 10. Keep JS minimal
`main.js` is responsible for **five things only**:
1. Sticky nav: toggle `.scrolled` class after 50px scroll
2. Mobile hamburger menu open/close
3. Smooth scroll for anchor links (`#reserve`, `#how-it-works`)
4. Form UX: "Sending…" state, success message on Formspree JSON response
5. Intersection-observer fade-in for sections (plus the small `setActiveNavLink()` helper)

No tracking, no analytics, no third-party scripts beyond Google Fonts. If Sebastian adds GA later, it gets a dedicated approval.

---

## Hot Watch Items

These are issues the client raised or that came up during scoping. Flag in `README.md` and call out in build commits when relevant.

- [x] **Contact email**: resolved to `info@elitecarerecovery.net` (commit `ac73254`). Superseded the brochure's `Johnpierce@orthoflowrecovery.com` and the flyer's `johnpierce08@outlook.com`. Older docs in this repo (`README.md`, `HANDOFF.md`) still cite the outlook address: the live HTML is correct, those docs are stale. The `<!-- TODO: Confirm contact email -->` comments in `index.html` can be removed once John confirms.
- [x] **Domain + Formspree**: both live. `CNAME` → `www.elitecarerecovery.net`; form ID `xeedwqvp` wired in.
- [ ] **"24/7 emergency delivery"**: placeholder in footer, TODO comment at `index.html:354`. Remove if not accurate.
- [ ] **Real brothers' photo**: homepage About preview + About page hero currently use styled placeholders.
- [ ] **Hero video**: the `<video>` element in `index.html` already points at `assets/hero-video.mp4`, **which does not exist**. It renders the `nice-lifestyle.png` poster instead, so this is invisible to users but produces a 404 in the network tab. Either drop the real file in or remove the `<source>` before a Lighthouse/Best-Practices pass.
- [ ] **Social handles**: footer icons link to `#` until provided.
- [ ] **HIPAA disclaimer**: boilerplate; have client review before launch.
- [ ] **Bilingual (Spanish) version**: not in v1. Flag for v2.
- [ ] **Reviews / testimonials**: not in v1. Client mentioned they want reviews but not on this page yet.

---

## Known Limitations & Future v2 Work

**v1 is intentionally lean.** The following are NOT bugs, they're deliberate scope boundaries:

**v1 Constraints:**
- Single-language (English only; Spanish translation is v2)
- No testimonials/reviews section (client wants them, but not in v1 build)
- No blog or resource library
- Form goes to email only; no Airtable automation
- No analytics beyond what Formspree collects
- No booking/scheduling system
- No patient portal or login

**What's needed from the client before launch** (see `README.md` pre-launch checklist):
- Real photo of the two Pierce brothers (currently styled placeholder)
- Optional: short video for hero section (30–60s loop of NICE1 in use)
- Confirmation of business hours and "24/7 emergency delivery" claim
- Correct contact email (brochure shows one address, flyer shows another)
- Social media handles (Instagram, Facebook)
- Domain purchase + DNS configuration

**Planned v2 upgrades** (if client signs retainer or fixed engagement):
- Airtable integration: Formspree → Google Apps Script → Airtable CRM
- Spanish translation (all pages)
- Testimonials/reviews section
- Blog or case studies
- Google Analytics
- Booking calendar integration (if they offer scheduling)
- Newsletter signup
- Email automation (welcome series, follow-ups)
- SEO optimization (currently minimal, they market via flyers, not organic)

**If client requests v2 features before launch,** add to `README.md` pre-launch checklist and defer. Don't build them into v1.

---

## Content Discipline

- **No copy invention.** All client-facing prose comes from `CONTENT_DECK.md` (verbatim from client) or expands on it in tone consistent with the existing voice.
- **Tone:** Warm but professional. Family-run, not folksy. Premium but not cold. Think: concierge medicine, luxury orthopedics, high-end wellness.
- **NICE attribution:** Elite Care is a **distributor**, not the manufacturer. The product is the NICE1, made by NICE Recovery System, LLC. Don't claim Elite Care invented or built the device. Phrasing like "we distribute," "we deliver," "powered by NICE" is correct. Don't strip NICE branding from the product photos.

---

## Testing & QA Checklist

Run this before marking any change as complete:

**Responsive Testing (required):**
- [ ] 375px viewport (iPhone SE): hero, nav, form stack correctly; no horizontal scroll
- [ ] 768px viewport (iPad portrait): two-column layouts work; touch targets 44x44px minimum
- [ ] 1280px viewport (desktop): max-width 1200px respected; whitespace balanced
- [ ] All three pages tested at each breakpoint

**Lighthouse Audit** (Chrome DevTools → Lighthouse tab):
- [ ] Performance ≥ 90
- [ ] Accessibility ≥ 95
- [ ] Best Practices ≥ 95
- [ ] SEO ≥ 90 (if applicable)
- Click "Analyze" for each page (index.html, about.html, culture.html)

**Accessibility (WCAG 2.1 AA):**
- [ ] Tab through entire page with keyboard only, all interactive elements reachable
- [ ] All `<img>` tags have descriptive `alt` text (not "image of")
- [ ] Form labels associated with inputs (`<label for="id">`)
- [ ] Focus states visible (gold outline, 2px, 2px offset)
- [ ] No color-only information (e.g., red text alone doesn't convey error, also add icon or text)
- [ ] Contrast ratio ≥ 4.5:1 for body text, ≥ 3:1 for large text

**HTML/CSS Validation:**
- [ ] Run each page URL through [validator.w3.org](https://validator.w3.org/), 0 errors, 0 warnings
- [ ] No broken links (internal or external)
- [ ] All CSS variables correctly named (check for typos like `--color-charcoal` vs `--color-charcoal-soft`)

**Form Testing:**
- [ ] Submit form locally → check browser console for errors
- [ ] "Sending…" state displays while submitting; success message appears after
- [ ] Error path shows the fallback phone number (stub `fetch` to reject rather than spending Formspree quota)

**Cross-page consistency (this repo's #1 regression source):**
- [ ] Any nav / mobile-menu / footer edit landed in **all three** HTML files
- [ ] Subpages still use `index.html#reserve`; homepage still uses `#reserve`
- [ ] New/edited sections still alternate `.bg-cream` / `.bg-cream-alt` correctly
- [ ] Scroll the full page, every section faded in (nothing stuck at `opacity: 0`)

**Browser Compatibility:**
- [ ] Safari (macOS + iOS)
- [ ] Chrome/Edge (latest)
- [ ] Firefox (latest)
- [ ] No console errors in any browser

**Content Check:**
- [ ] All copy matches `CONTENT_DECK.md` (no invention)
- [ ] Brand colors used correctly (gold sparingly, blue for CTAs only)
- [ ] Fonts: Playfair Display + Inter loaded correctly; fallbacks work
- [ ] No typos or grammatical errors

---

## Definition of Done (v1)

Site is shippable when:

1. All items in Testing & QA Checklist above ✓
2. Navigation works across pages (sticky, hamburger on mobile)
3. All images either real or styled placeholders with descriptive notes
4. `README.md` pre-launch checklist is current and accurate
5. Repo deploys cleanly to GitHub Pages from `main` branch
6. No external dependencies beyond Google Fonts and Formspree
7. Sebastian has reviewed and approved before the link goes to John

---

## Out of Scope for v1 (Do Not Build)

- E-commerce / online checkout
- Patient portal / login system
- Booking calendar / scheduling app
- Reviews / testimonials section
- Blog / news / resources page
- Bilingual (Spanish) translation
- Airtable direct integration (Formspree → email → manual entry for v1)
- CMS or admin panel
- Live chat widget
- Cookie consent banner (no tracking beyond Formspree's own)
- Newsletter signup
- Surgeon/provider portal

If the client requests any of these later, it becomes a **v2 paid engagement**, not free-tier scope creep.

---

## Engagement Strategy Notes (for Sebastian: not the build)

- This is a **free demo** to show capability and get Elite Care on the SebbyIT roster.
- The conversion play: once they see a clean, working site, pitch them either a **fixed package** (e.g., $1,500 site + Formspree-to-Airtable integration + Google Business Profile setup) or a **monthly retainer** (e.g., $500–$1,000/mo for site maintenance, content updates, flyer design, future reviews integration).
- They already use Airtable as CRM. Future paid work: Airtable form integration, automation, lead nurture sequences.
- They have a marketing budget (flyers, distribution), that's the wedge for a paid marketing retainer once trust is established.
- Don't position the demo as charity. Frame it as: "I'll build the v1 free so you can see what's possible. If you want to evolve it, here's what that engagement looks like."

---

## Last Updated

- May 28, 2026, Initial creation alongside `BUILD_PROMPT.md` and `CONTENT_DECK.md`
- May 28, 2026, Added Development Commands, Common Patterns, Testing & QA Checklist, Known Limitations & v2 Roadmap sections
- Aug 15, 2026, Reconciled with shipped code: domain/Formspree/contact-email now live (were listed as pending); added Architecture section (duplicated nav-footer, `bg-*` section utilities, `styles.css` block layout, `main.js` runtime-injected fade CSS + single-form selector); corrected Common Patterns to class-based markup; noted missing `assets/hero-video.mp4`; flagged `proposal.html` as a non-site document
