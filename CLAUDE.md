# CLAUDE.md — Elite Care Recovery Project

> **Operating manual for Claude Code sessions on this project.**
> Read this file first, every session, before touching code.

---

## Project Snapshot

- **Client:** Elite Care Recovery LLC (Miami, FL)
- **Business:** Distributor of the NICE1 Cold + Compression Recovery System (post-op equipment rental)
- **Owner contact:** John Pierce — (786) 214-2659 — johnpierce08@outlook.com
- **Domain (pending purchase):** `elitecarerecovery.net`
- **Hosting:** GitHub Pages (free tier, free-host strategy for v1)
- **Engagement type:** Free demo site to show capability → upsell to paid retainer or productized package
- **Developer:** SebbyIT Consulting, Corp.

---

## Tech Stack — LOCKED

**Do not change without explicit approval.**

- Plain HTML5 + CSS3 + vanilla JS
- No build step, no npm, no bundler, no framework
- No Tailwind, no React, no Vue, no Astro
- Single `styles.css`, single `main.js`
- Google Fonts loaded via `<link>` (Playfair Display + Inter)
- Inline SVG icons only — no icon libraries
- Form: Formspree free tier (`https://formspree.io/f/REPLACE_WITH_FORM_ID`)

**Why locked:** The client is non-technical, the site is hosted on GitHub Pages, and the handoff has to be readable by any web dev. Adding a framework would create maintenance debt that doesn't match this engagement's value tier.

---

## Source of Truth — Read These in Order

1. **`BUILD_PROMPT.md`** — full site spec: page structure, sections, copy placement, design tokens, technical requirements
2. **`CONTENT_DECK.md`** — verbatim approved copy from the client (bio, vision, mission, objectives, product info). If anything in `BUILD_PROMPT.md` conflicts with this file, **`CONTENT_DECK.md` wins**.
3. **`README.md`** — what ships with the repo (local dev, deploy, Formspree setup, pre-launch checklist)
4. **`CLAUDE.md`** — this file (how to operate on this project)

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
- Gold is an accent — hairlines, small dividers, stat underlines. **Never** a background, button fill, or large element.
- Always force `background-color` on `html`, `body`, and section wrappers. Never rely on inherited backgrounds.
- Always pair text color and background color explicitly (no opacity-based text).

**Typography:**
- Headlines: Playfair Display (serif, weight 500–700), editorial feel, tight leading (1.1), letter-spacing -0.02em
- Body: Inter (400 body, 500 emphasis, 600 nav/buttons)
- Fluid scale via `clamp()` — H1 hero: `clamp(2.5rem, 5vw, 4.5rem)`
- Body size: 17px (`1.0625rem`) with line-height 1.65 — audience skews older, prioritize readability

**Layout:**
- Max content width: 1200px
- Section padding: `clamp(4rem, 8vw, 8rem)` vertical
- Generous whitespace > density
- Border radius: 4px or 0 (sharp/editorial). **Never** pills, never round buttons.

---

## Site Architecture

```
/
├── index.html         Homepage (hero → benefits → product → how it works → about preview → form)
├── about.html         About Us (brothers' story, 23 years stat, why us)
├── culture.html       Vision / Mission / Core Values / Objectives
├── styles.css
├── main.js
├── assets/
│   ├── elite-care-logo.png
│   ├── nice-lifestyle.png
│   ├── flyer-front.png
│   ├── nice-product-brochure.pdf
│   └── favicon.ico    (generate from logo)
├── BUILD_PROMPT.md
├── CONTENT_DECK.md
├── CLAUDE.md
└── README.md
```

**Three pages only for v1.** Do not add blog, services, testimonials, or pricing pages without approval.

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

Reusable patterns for adding content to this site:

### Adding a new section to a page
```html
<!-- Alternating background: use --color-bg or --color-bg-alt -->
<section style="background-color: var(--color-bg-alt);">
  <div class="container">
    <h2>Section Title</h2>
    <p>Section content here.</p>
  </div>
</section>
```

### Image placeholder (when asset missing)
```html
<!-- Styled gold-bordered placeholder, per BUILD_PROMPT.md pattern -->
<div class="image-placeholder" style="background-color: var(--color-bg-alt); border: 2px dashed var(--color-gold); padding: 2rem; text-align: center; border-radius: 4px;">
  <p style="color: var(--color-charcoal-soft); font-size: 0.875rem;">Placeholder: 800x600 image — "Photo of NICE1 in clinical setting"</p>
</div>
```

### Form input with accessible focus state
```html
<input 
  type="text" 
  name="name" 
  id="name"
  required
  style="border: 1px solid var(--color-border); padding: 0.75rem; font-size: 1rem; border-radius: 4px;"
/>
<!-- CSS handles focus: input:focus { outline: 2px solid var(--color-gold); outline-offset: 2px; } -->
```

### Adding a new page
1. Create `new-page.html` copying the nav/footer structure from `index.html`
2. Update `<title>` and `<meta description>`
3. Add link to new page in nav on all three existing pages
4. Update `main.js` to highlight active nav item (add class `active` to current page's nav link)
5. Test at all three breakpoints (375px, 768px, 1280px)

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
- Test focus states — older users tab through forms.

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

### 7. Formspree setup is post-build
- The form `action` should be `https://formspree.io/f/REPLACE_WITH_FORM_ID` until the client creates the Formspree account.
- Include a comment in `index.html` above the form: `<!-- TODO: Replace REPLACE_WITH_FORM_ID with the Formspree form ID before launch -->`
- Form must work as standard POST without JS as a fallback. JS only enhances the UX (loading state, success message).

### 8. Mobile-first
- Start with mobile styles. Expand with `min-width` media queries at 640px, 1024px, 1280px.
- Touch targets minimum 44x44px.
- Test that the hero, nav, and form work on a 375px viewport.

### 9. Honor the alternating-section rhythm
- Sections alternate between `--color-bg` (cream) and `--color-bg-alt` (deeper cream).
- The About Preview section and Stats section break the rhythm with a `--color-charcoal` band for dramatic contrast.
- The bottom CTA bands on About and Culture pages use `--color-blue` (signature electric blue) for energy and reinforcement.

### 10. Keep JS minimal
`main.js` is responsible for **five things only**:
1. Sticky nav: toggle `.scrolled` class after 50px scroll
2. Mobile hamburger menu open/close
3. Smooth scroll for anchor links (`#reserve`, `#how-it-works`)
4. Form UX: "Sending…" state, success message on Formspree JSON response
5. Optional: simple intersection-observer fade-in for sections

No tracking, no analytics, no third-party scripts beyond Google Fonts. If Sebastian adds GA later, it gets a dedicated approval.

---

## Hot Watch Items

These are issues the client raised or that came up during scoping. Flag in `README.md` and call out in build commits when relevant.

- [ ] **Contact email mismatch** — the NICE brochure shows `Johnpierce@orthoflowrecovery.com`; the flyer shows `johnpierce08@outlook.com`. Use the outlook address for v1 but flag for client confirmation.
- [ ] **"24/7 emergency delivery"** — placeholder in footer. Remove if not accurate.
- [ ] **Real brothers' photo** — homepage About preview + About page hero currently use styled placeholders.
- [ ] **Hero video** — using static image as `poster` for v1; spec the `<video>` element so a real video can drop in later without restructuring.
- [ ] **Social handles** — footer icons link to `#` until provided.
- [ ] **HIPAA disclaimer** — boilerplate; have client review before launch.
- [ ] **Bilingual (Spanish) version** — not in v1. Flag for v2.
- [ ] **Reviews / testimonials** — not in v1. Client mentioned they want reviews but not on this page yet.

---

## Known Limitations & Future v2 Work

**v1 is intentionally lean.** The following are NOT bugs — they're deliberate scope boundaries:

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
- SEO optimization (currently minimal — they market via flyers, not organic)

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
- [ ] Tab through entire page with keyboard only — all interactive elements reachable
- [ ] All `<img>` tags have descriptive `alt` text (not "image of")
- [ ] Form labels associated with inputs (`<label for="id">`)
- [ ] Focus states visible (gold outline, 2px, 2px offset)
- [ ] No color-only information (e.g., red text alone doesn't convey error — also add icon or text)
- [ ] Contrast ratio ≥ 4.5:1 for body text, ≥ 3:1 for large text

**HTML/CSS Validation:**
- [ ] Run each page URL through [validator.w3.org](https://validator.w3.org/) — 0 errors, 0 warnings
- [ ] No broken links (internal or external)
- [ ] All CSS variables correctly named (check for typos like `--color-charcoal` vs `--color-charcoal-soft`)

**Form Testing:**
- [ ] Submit form locally → check browser console for errors
- [ ] After Formspree ID is added: test real submission → confirm email received
- [ ] "Sending…" state displays while submitting
- [ ] Success message appears after submission

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

If the client requests any of these later, it becomes a **v2 paid engagement** — not free-tier scope creep.

---

## Engagement Strategy Notes (for Sebastian — not the build)

- This is a **free demo** to show capability and get Elite Care on the SebbyIT roster.
- The conversion play: once they see a clean, working site, pitch them either a **fixed package** (e.g., $1,500 site + Formspree-to-Airtable integration + Google Business Profile setup) or a **monthly retainer** (e.g., $500–$1,000/mo for site maintenance, content updates, flyer design, future reviews integration).
- They already use Airtable as CRM. Future paid work: Airtable form integration, automation, lead nurture sequences.
- They have a marketing budget (flyers, distribution) — that's the wedge for a paid marketing retainer once trust is established.
- Don't position the demo as charity. Frame it as: "I'll build the v1 free so you can see what's possible. If you want to evolve it, here's what that engagement looks like."

---

## Last Updated

- May 28, 2026 — Initial creation alongside `BUILD_PROMPT.md` and `CONTENT_DECK.md`
- May 28, 2026 — Added Development Commands, Common Patterns, Testing & QA Checklist, Known Limitations & v2 Roadmap sections
