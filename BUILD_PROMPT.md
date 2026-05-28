# Elite Care Recovery — v1 Static Site Build Prompt

## Mission

Build a 3-page premium static website for **Elite Care Recovery LLC**, a Miami-based distributor of the NICE Recovery System (cold + compression therapy equipment for post-op patients). Site will be hosted on GitHub Pages. Domain `elitecarerecovery.net` will be connected later.

This is a **v1 marketing site** — the lead capture form is the only conversion mechanism. No e-commerce, no patient portal, no SEO-heavy content (they market via flyers, not organic). Build it clean, ship it fast.

---

## Tech Stack (LOCKED — do not deviate)

- **Plain HTML5 + CSS3 + vanilla JS** (no build step, no framework, no npm)
- **No Tailwind, no React, no bundlers.** Just static files that work when opened in a browser.
- One CSS file (`styles.css`), one JS file (`main.js`)
- Form handled by **Formspree** (free tier) — placeholder action URL: `https://formspree.io/f/REPLACE_WITH_FORM_ID`
- Fonts: Use Google Fonts (Inter for body, Cormorant Garamond or Playfair Display for headlines — pick whichever feels more premium when rendered)
- Icons: Inline SVG only (no icon libraries). Use Lucide-style stroke icons.
- Must work on GitHub Pages with zero config (just `index.html` at root)

---

## Brand & Design Direction

### Aesthetic: **Premium / Concierge / White-Glove**

Pull cues from luxury wellness brands (think: high-end physical therapy, concierge medicine, luxury skincare). NOT clinical-sterile. NOT athletic-aggressive. The audience is post-op patients (often 50+, often anxious, often in pain) and their families — they want to feel cared for, not sold to.

### Color Palette

```css
--color-bg: #FAF7F2;          /* warm off-white / cream (primary background) */
--color-bg-alt: #F2EDE5;      /* slightly deeper cream for alternating sections */
--color-charcoal: #1A1A1A;    /* near-black, primary text */
--color-charcoal-soft: #3A3A3A; /* secondary text */
--color-blue: #1E6BFF;        /* Elite Care signature electric blue (from logo) */
--color-blue-dark: #0F4FCC;   /* hover states */
--color-gold: #B8965A;        /* warm gold accent (subtle — for hairlines, small flourishes only) */
--color-border: #E5DFD3;      /* subtle dividers */
--color-shadow: rgba(26, 26, 26, 0.08);
```

**Color usage rule:** Charcoal is the primary text color. Blue is for CTAs and the logo. Gold appears sparingly as a luxury accent (hairlines, small dividers, "23 Years" stat underline) — never as a background or large element. The cream background carries the warmth.

### Typography

- **Headings:** Playfair Display or Cormorant Garamond (serif, weight 500-700) — pick whichever has better weight options on Google Fonts when you build. Headlines should feel editorial, not corporate.
- **Body:** Inter (400 for body, 500 for emphasis, 600 for nav/buttons)
- **Scale:**
  - H1 (hero): clamp(2.5rem, 5vw, 4.5rem), tight leading (1.1), letter-spacing -0.02em
  - H2 (section): clamp(2rem, 3.5vw, 3rem)
  - H3: 1.5rem
  - Body: 1.0625rem (17px) with line-height 1.65 for readability (audience skews older)
  - Small/caption: 0.875rem

### Layout principles

- Max content width: 1200px
- Section padding: clamp(4rem, 8vw, 8rem) vertical
- Generous whitespace — premium feel comes from breathing room, not density
- Use thin gold (1px) horizontal rules as section separators on alternating sections
- Subtle box-shadows on cards (never harsh)
- Border radius: 4px (small, modern) or 0 (sharp/editorial) — pick one and be consistent. Avoid round/pill shapes — too playful for this brand.

### Contrast rule (CRITICAL)

Always explicitly define text color against background. Force `background-color` on `html`, `body`, and every section wrapper. Never rely on inherited backgrounds. Use solid hex values, not opacity-based text colors.

---

## Site Structure

```
/
├── index.html         (homepage)
├── about.html         (About Us)
├── culture.html       (Vision / Mission / Objectives)
├── styles.css
├── main.js
├── assets/
│   ├── elite-care-logo.png
│   ├── flyer-front.png
│   ├── nice-lifestyle.png
│   ├── nice-product-brochure.pdf
│   └── favicon.ico    (generate from logo — small blue chevron)
└── README.md
```

---

## Navigation (all pages — sticky on scroll)

**Style:** Logo left, nav right. Sticky on scroll with subtle background blur (`backdrop-filter: blur(10px)` and semi-transparent cream background once scrolled).

```
[ELITE CARE LOGO]                Home    About    Culture    [Reserve Now →]
```

- "Reserve Now" is a button (filled blue, white text, scrolls to the form section on homepage, or navigates to `index.html#reserve` from other pages)
- Active page indicated with thin gold underline
- Mobile: hamburger menu, slides in from right, full-height overlay with same items stacked

---

## Footer (all pages)

Full footer with these blocks (4 columns on desktop, stack on mobile):

**Column 1: Brand**
- Elite Care Logo (smaller)
- Tagline: "Recover Faster. Feel Better."
- One-line description: "Premium post-operative recovery equipment, delivered to your door."

**Column 2: Contact**
- Phone: (786) 214-2659
- Email: johnpierce08@outlook.com
- Service Area: Miami, FL & surrounding areas

**Column 3: Hours**
- Mon–Fri: 8:00 AM – 7:00 PM
- Sat: 9:00 AM – 4:00 PM
- Sun: By appointment
- 24/7 emergency delivery available *(placeholder — confirm with client)*

**Column 4: Quick Links**
- Home
- About Us
- Our Culture
- Reserve Equipment

**Bottom strip (full width, smaller text):**
- © 2026 Elite Care Recovery LLC. All rights reserved.
- HIPAA notice: "Elite Care Recovery is committed to protecting patient privacy in accordance with HIPAA standards."
- Social icons placeholder (Instagram, Facebook) — link to `#` for now

---

## PAGE 1: Homepage (`index.html`)

### Section structure (top to bottom):

1. **Hero** — Video background w/ image fallback
2. **Benefits** — 3-icon grid
3. **The Product** — NICE machine showcase
4. **How It Works** — 4-step process
5. **About Preview** — Brief teaser linking to About page
6. **Reserve Form** — Lead capture (anchor: `#reserve`)

### 1. Hero Section

**Background:** Video element with the NICE-on-couch lifestyle vibe. Since they don't have video yet, use the static image `assets/nice-lifestyle.png` as the `poster` AND as fallback. Implement like:

```html
<video autoplay muted loop playsinline poster="assets/nice-lifestyle.png">
  <!-- Video source placeholder — to be added later -->
  <source src="assets/hero-video.mp4" type="video/mp4">
</video>
```

If the video file doesn't exist, the poster image displays. This gracefully handles v1 (no video) → v2 (video added).

**Overlay:** Dark gradient overlay (top-to-bottom, charcoal at 60% opacity on bottom half) so headline text remains legible.

**Headline (centered, large serif, white):**
> # Recover Faster. Feel Better.

**Subhead (centered, white, lighter weight):**
> Premium cold + compression therapy, delivered to your door. White-glove service for post-operative patients across Miami.

**CTAs (two buttons, centered, below subhead):**
- Primary: `Reserve Your NICE Machine` (filled blue) → scrolls to `#reserve`
- Secondary: `Learn How It Works` (ghost button, white border) → scrolls to `#how-it-works`

**Visual flourish:** Below the CTAs, a thin gold horizontal line (60px wide, centered) — premium hallmark.

Hero takes up ~85vh on desktop, full viewport feel without burying the next section.

### 2. Benefits Section (3-icon grid)

Background: `--color-bg` (cream)

**Section eyebrow:** `WHY ELITE CARE` (uppercase, letter-spacing, gold color, small)
**Section headline:** "Recovery Without Compromise"

3 columns (stack on mobile):

| Icon | Title | Description |
|------|-------|-------------|
| Snowflake (inline SVG) | **Iceless Cold Therapy** | Consistent temperature control from 42°F to 58°F. No melting ice, no mess, no interruption to your recovery. |
| Hand/heart (inline SVG) | **White-Glove Service** | Personal delivery, professional setup, and pickup directly at your door. We handle everything so you can focus on healing. |
| Shield/check (inline SVG) | **Trusted Expertise** | Two brothers, 23 combined years in orthopedics. Family-owned, patient-first, HIPAA-compliant care. |

Icons: 48px stroke icons, blue color (`--color-blue`).

### 3. The Product Section

Background: `--color-bg-alt` (slightly deeper cream — creates alternating rhythm)

**Layout:** Split 50/50 on desktop, stack on mobile.

**Left column:**
- Eyebrow: `THE NICE1 RECOVERY SYSTEM`
- Headline: "Engineered for the Comeback"
- Body paragraph: "The NICE1 delivers precise cold therapy and programmable pneumatic compression in a compact, iceless system. Proven to reduce edema, improve range of motion, and accelerate healing — without the inconvenience of traditional ice machines."
- Bulleted feature list (using small blue checkmarks):
  - No ice or water required
  - Consistent temperature control (42°F – 58°F)
  - Touch-screen control for cold + compression levels
  - Timed programmability for overnight use
  - Form-fitting wraps for each joint
  - Compact (8x8x8") and lightweight (9 lbs)
- Small link: `Download the Full Product Brochure (PDF) →` linking to `assets/nice-product-brochure.pdf`

**Right column:**
- Large image: `assets/nice-lifestyle.png` (the couch lifestyle shot)
- Small caption beneath: "The NICE1 in use — comfortable, quiet, effective."

### 4. How It Works Section

Background: `--color-bg` (cream)

Anchor: `id="how-it-works"`

**Section eyebrow:** `OUR PROCESS`
**Section headline:** "Four Steps to Recovery"

4-step horizontal flow (numbered 01, 02, 03, 04 in large serif gold numerals):

| # | Step | Description |
|---|------|-------------|
| 01 | **Reserve** | Submit a quick request with your surgery details. We'll confirm availability and pricing within 24 hours. |
| 02 | **Delivery** | We deliver and set up your NICE1 system at your home before your procedure. Full walkthrough included. |
| 03 | **Recover** | Use the device per your surgeon's protocol. We're a call away if you have questions or need adjustments. |
| 04 | **Pickup** | When you're done, we pick up the equipment. No shipping, no hassle, no return labels. |

Each step in a card on desktop (4 columns), stacked on mobile. Card has cream background, subtle border (`--color-border`), thin gold accent on top edge.

### 5. About Preview

Background: Dark — `--color-charcoal` with white text (creates striking break from cream sections, reinforces premium feel)

**Layout:** Split 50/50.

**Left column:**
- Eyebrow (gold): `OUR STORY`
- Headline (white serif): "Two Brothers. 23 Years. One Mission."
- Body (white): "From a big family in Miami, we've spent our careers in orthopedics watching post-operative patients struggle with outdated recovery tools. Elite Care Recovery is our answer — premium equipment, dependable service, and the kind of personal care our own family would want."
- CTA link (gold, with arrow): `Read Our Full Story →` → links to `about.html`

**Right column:**
- **[PLACEHOLDER — descriptive box]**
  Suggested image: "Portrait photo of the two brothers / founders, professional but warm. Shot in natural light, business-casual attire, ideally with subtle Miami background (e.g., warm light, palm shadow). Black-and-white treatment recommended for premium editorial feel. Aspect ratio 4:5."

### 6. Reserve Form Section

Anchor: `id="reserve"`

Background: `--color-bg-alt` (cream variant)

**Layout:** Centered, max-width 600px

**Eyebrow:** `RESERVE NOW`
**Headline:** "Schedule Your Recovery Equipment"
**Subhead:** "Fill out the form below and we'll be in touch within 24 hours to confirm your reservation and answer any questions."

**Form (Formspree):**

```html
<form action="https://formspree.io/f/REPLACE_WITH_FORM_ID" method="POST">
  <label>Full Name *
    <input type="text" name="name" required>
  </label>
  <label>Phone Number *
    <input type="tel" name="phone" required>
  </label>
  <label>Email Address *
    <input type="email" name="email" required>
  </label>
  <label>Procedure Type *
    <select name="procedure" required>
      <option value="">Select procedure...</option>
      <option>Knee surgery (ACL, replacement, meniscus)</option>
      <option>Shoulder surgery (rotator cuff, replacement)</option>
      <option>Hip surgery</option>
      <option>Ankle / foot surgery</option>
      <option>Back / spine surgery</option>
      <option>Other / Not sure yet</option>
    </select>
  </label>
  <label>Surgery Date *
    <input type="date" name="surgery_date" required>
  </label>
  <!-- Honeypot for spam -->
  <input type="text" name="_gotcha" style="display:none">
  <button type="submit">Reserve My NICE Machine</button>
</form>
```

**Trust signal beneath form:** Small text with lock icon: "Your information is secure and HIPAA-compliant. We'll never share your data."

**Alternative contact:** Below the form, a small block:
> Prefer to call? **(786) 214-2659** &nbsp;|&nbsp; johnpierce08@outlook.com

### Form styling notes
- Inputs: cream background (`--color-bg`), 1px charcoal border, generous padding (14px), 4px border radius
- Labels: small, uppercase, letter-spacing, charcoal color, above each input
- Submit button: filled blue, white text, full width on mobile, auto width on desktop, hover state darkens to `--color-blue-dark`

---

## PAGE 2: About Us (`about.html`)

Same nav + footer as homepage.

### Hero (smaller than homepage hero)

Background: `--color-bg` (cream)

- Eyebrow: `ABOUT ELITE CARE`
- Headline (large serif): "Family-Built. Patient-First."
- Subhead: "The story behind Elite Care Recovery — and the family that built it."

No image in hero — just typography and breathing room. Premium publications do this constantly.

### Section: The Story

Two-column layout, split 60/40 (text wider than image).

**Left (60%):**
- Subhead: "Two brothers from Miami, one shared mission."
- Body (multiple paragraphs):

> Elite Care Recovery was founded by two brothers from a big Miami family who spent their entire careers helping post-operative patients heal. With **23 combined years in orthopedics**, they've seen what works in recovery — and what doesn't.
>
> Traditional ice machines leak, require constant attention, and add stress to an already overwhelming recovery experience. Patients deserved better. Their families deserved better. So they built Elite Care Recovery to deliver something different: premium recovery equipment, hands-on service, and the kind of personal care they'd want for their own family members.
>
> Today, Elite Care Recovery partners with orthopedic surgeons and patients across Miami to make post-op recovery simpler, more comfortable, and more effective.

**Right (40%):**
- **[PLACEHOLDER — descriptive box]**
  Suggested image: "Vertical portrait of the two brothers together, professional but approachable. Editorial black-and-white or warm color grade. Could be shot outside a Miami orthopedic clinic or in a modern home setting where the NICE1 might be deployed. Aspect ratio 4:5."

### Section: By the Numbers

Background: `--color-charcoal` with white text — dark band creates visual rhythm.

3-column stat grid (centered):

| Stat | Label |
|------|-------|
| **23** | Years of combined orthopedic experience |
| **100%** | Family-owned and operated |
| **24hr** | Response time on reservations |

Each stat: large serif numeral (gold color, `--color-gold`), white label beneath, thin gold underline between number and label.

### Section: Why Patients Choose Us

Background: `--color-bg` (cream)

Headline: "Built on Experience. Run with Heart."

3-column or stacked list of differentiators:
- **Orthopedic insight** — We understand what patients face because we've spent decades on the clinical side.
- **Personal service** — When you reach out, you talk to a Pierce. No call centers, no scripts.
- **Premium equipment only** — We distribute the NICE1 because it's the best on the market. We don't compromise.

### CTA band (bottom of About page)

Background: `--color-blue` (signature electric blue band — bold visual)

Headline (white): "Ready to recover with us?"
Button: White button with blue text — "Reserve Your Equipment" → links to `index.html#reserve`

---

## PAGE 3: Our Culture (`culture.html`)

Same nav + footer.

### Hero

Background: `--color-bg`

- Eyebrow: `OUR CULTURE`
- Headline: "How We Show Up. Every Day."
- Subhead: "The values, vision, and standards that define every patient interaction."

### Section: Our Vision

Background: `--color-bg`

Two-column layout. Left: large pull-quote treatment. Right: supporting body text.

**Left (40%):** Large serif text, italic, with a gold quote-mark flourish:
> "Every patient deserves attentive care, clear communication, and solutions designed to make recovery easier, more comfortable, and more effective."

**Right (60%):**
> Our vision is to identify and understand each patient's unique recovery challenges while providing family-like customer support enhanced by thoughtful technology and reliable service.
>
> We believe recovery is one of the most important phases of healing — and the support patients receive during that window can make the difference between a hard road and a smooth one. We're here to make it smooth.

### Section: Our Mission

Background: `--color-bg-alt`

Headline: "Our Mission"
Subhead: "Five commitments we make to every patient, provider, and partner."

5-item list with blue checkmark icons (stacked vertically with generous spacing, not a tight bullet list):

1. **Remain true to our core values:** Focus, Empathy, Patience, and Care.
2. **Provide premium recovery tools** and resources that support better outcomes.
3. **Deliver white-glove service** with professionalism, consistency, and attention to detail.
4. **Build trusted relationships** with patients, providers, and partners.
5. **Create a recovery experience** centered on comfort, confidence, and high-quality support.

### Section: Core Values (highlight band)

Background: `--color-charcoal` with white text.

Headline (centered, serif, white): "Our Core Values"

4-column grid (stack on mobile). Each value gets its own card with:
- Single bold letter or icon at top (in `--color-gold`)
- Value name (white serif, large)
- One-sentence definition (white, smaller)

| Letter | Value | Definition |
|--------|-------|------------|
| **F** | Focus | Every patient gets our full attention — no distractions, no shortcuts. |
| **E** | Empathy | We've sat with patients in pain. We bring that understanding to every interaction. |
| **P** | Patience | Recovery takes time. We meet patients where they are, on their schedule. |
| **C** | Care | Above all, we treat patients the way we'd want our own family treated. |

### Section: Our Objectives

Background: `--color-bg`

Headline: "What We're Building Toward"

6-item list (two columns on desktop, stack on mobile), each with a small gold numeral or dot prefix:

1. Be recognized as a premium, high-touch recovery services provider.
2. Consistently exceed customer satisfaction expectations.
3. Acknowledge, respect, and comply with HIPAA standards of care.
4. Promote mutual respect and collaboration with vendors, providers, and partners.
5. Support post-operative patients with dependable resources, responsive service, and compassionate guidance.
6. Maintain a professional standard that reflects trust, integrity, and excellence in every interaction.

### CTA band (bottom of Culture page)

Same as About page — `--color-blue` background, white CTA button to `index.html#reserve`.

---

## Functional / Technical Requirements

### Responsive

- Mobile-first CSS (start with mobile styles, expand with `min-width` media queries)
- Breakpoints: 640px (tablet), 1024px (desktop), 1280px (wide)
- All sections stack on mobile, multi-column on tablet+
- Hero text shrinks gracefully (use `clamp()` for fluid typography)
- Touch targets minimum 44x44px

### Accessibility

- Semantic HTML5 (`<header>`, `<nav>`, `<main>`, `<section>`, `<footer>`, `<article>`)
- ARIA labels on icon-only buttons (hamburger menu)
- Alt text on all images (descriptive, not "image of...")
- Sufficient color contrast (charcoal text on cream = ~14:1, well past AA)
- Focus states visible on all interactive elements (gold outline on tab focus)
- Form labels properly associated with inputs
- Skip-to-content link for keyboard users

### Performance

- Lazy-load images below the fold (`loading="lazy"`)
- Compress all images — flag any over 500KB in a comment in HTML
- No external dependencies except Google Fonts (load with `display=swap`)
- Vanilla JS only — no jQuery, no libraries

### JS (`main.js`) responsibilities

Keep it minimal:
1. Sticky nav background blur on scroll (toggle a `.scrolled` class on `<nav>` after 50px scroll)
2. Mobile hamburger menu toggle (open/close)
3. Smooth scroll for anchor links (`#reserve`, `#how-it-works`)
4. Form submission UX: show "Sending..." state on submit, success message on response (Formspree returns JSON if you set `Accept: application/json` header)
5. Optional: simple intersection-observer fade-in for sections as they enter viewport (subtle — `opacity 0 → 1`, `translateY(20px) → 0`, 600ms ease)

### SEO basics (minimal — they're not doing organic)

- Proper `<title>` per page:
  - Home: "Elite Care Recovery | Premium Post-Op Recovery Equipment | Miami, FL"
  - About: "About Elite Care Recovery | Family-Owned Orthopedic Recovery Services"
  - Culture: "Our Culture | Elite Care Recovery"
- Meta description on each page
- Open Graph tags for social sharing (use the logo + lifestyle image)
- Favicon from the logo (small blue chevron)
- No sitemap needed for v1

---

## Image Placeholders — Use These When the Asset Doesn't Exist

When the build calls for an image we don't have, render a styled placeholder `<div>` with:
- Background: `--color-bg-alt` with a thin dashed `--color-gold` border
- Centered text in `--color-charcoal-soft`: "**[IMAGE PLACEHOLDER]**" + description below

Example:

```html
<div class="image-placeholder" style="aspect-ratio: 4/5;">
  <span class="placeholder-label">[IMAGE PLACEHOLDER]</span>
  <p>Portrait photo of the two brothers — professional, warm, Miami setting.
  Black-and-white editorial treatment. Aspect ratio 4:5.</p>
</div>
```

CSS:
```css
.image-placeholder {
  background: var(--color-bg-alt);
  border: 1.5px dashed var(--color-gold);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  text-align: center;
  color: var(--color-charcoal-soft);
}
.placeholder-label {
  font-family: 'Inter', sans-serif;
  font-size: 0.75rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--color-gold);
  margin-bottom: 1rem;
}
```

---

## Final Deliverables

1. `index.html`, `about.html`, `culture.html`
2. `styles.css` (single file, well-commented sections)
3. `main.js` (single file, vanilla)
4. `assets/` folder with provided images + favicon
5. `README.md` with:
   - Brief project description
   - How to test locally (just open `index.html` or use `python3 -m http.server`)
   - How to deploy to GitHub Pages
   - Formspree setup instructions (where to swap in the form ID)
   - List of placeholders that need real assets/content before launch

---

## Quality Bar

This site represents a real business pitching to post-op patients and their surgeons. It needs to look like Elite Care Recovery has been operating for years. No lorem ipsum, no broken layouts, no default browser styles bleeding through. When in doubt, lean toward **more whitespace, calmer pacing, more editorial**. We're not building a SaaS landing page — we're building a premium service brand.

Ship clean, semantic, accessible code. Ship it like the next thing it touches is production.

---

## Open Items (flag in README for follow-up with client)

- [ ] Confirm business hours (currently placeholder)
- [ ] Confirm "24/7 emergency delivery" claim — remove if not accurate
- [ ] Real photo of the two brothers (Bio page hero)
- [ ] Final domain pointed at GitHub Pages (`elitecarerecovery.net`)
- [ ] Formspree account created + form ID swapped in
- [ ] Social media handles (footer links currently `#`)
- [ ] Consider video b-roll of NICE1 in use for hero (v2)
- [ ] HIPAA disclaimer reviewed by client (currently boilerplate)
- [ ] Confirm `johnpierce08@outlook.com` is the right contact email vs. the brochure's `Johnpierce@orthoflowrecovery.com`
