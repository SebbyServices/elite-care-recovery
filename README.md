# Elite Care Recovery — Website

Static marketing site for **Elite Care Recovery LLC**, a Miami-based distributor of NICE Recovery System equipment.

**Live URL (TBD):** `elitecarerecovery.net`
**Hosting:** GitHub Pages
**Stack:** Plain HTML + CSS + vanilla JS (no build step)

---

## Local Development

No build tools required. Just:

```bash
# Option 1: open the file directly
open index.html

# Option 2: serve locally (recommended for testing forms & relative links)
python3 -m http.server 8000
# then visit http://localhost:8000
```

---

## Deploy to GitHub Pages

1. Push the repo to GitHub
2. Repo Settings → Pages → Source: `main` branch, `/ (root)` folder
3. Custom domain (when ready): add `elitecarerecovery.net` and create a `CNAME` file at the root with that domain
4. Update DNS at the registrar:
   - `A` records pointing to GitHub Pages IPs (185.199.108.153, 185.199.109.153, 185.199.110.153, 185.199.111.153)
   - `CNAME` record for `www` pointing to `<username>.github.io`

---

## Formspree Setup (required before launch)

The contact form on the homepage uses Formspree (free tier).

1. Sign up at [formspree.io](https://formspree.io) using `johnpierce08@outlook.com`
2. Create a new form, name it "Elite Care Recovery — Reservations"
3. Copy the form ID (looks like `xyzabcde`)
4. In `index.html`, find this line:
   ```html
   <form action="https://formspree.io/f/REPLACE_WITH_FORM_ID" method="POST">
   ```
5. Replace `REPLACE_WITH_FORM_ID` with the actual ID
6. Submit a test entry to confirm delivery
7. (Optional) Enable email notifications to multiple recipients in Formspree settings

**Future:** When ready to pipe leads directly into Airtable instead of email, swap the form `action` to point at a Google Apps Script that writes to Airtable via API, or upgrade to a paid Formspree plan with Airtable integration.

---

## Content & Asset Checklist (pre-launch)

Items the client still needs to provide:

- [ ] Photo of the two Pierce brothers (Homepage About preview + About page hero). Suggested: editorial portrait, B&W or warm tone, 4:5 aspect.
- [ ] Optional: short b-roll video of NICE1 in use (5–15 seconds, looping) for hero section
- [ ] Confirmation of business hours (currently placeholder in footer)
- [ ] Confirmation/removal of "24/7 emergency delivery" claim
- [ ] Real social media handles (Instagram, Facebook) — footer icons currently link to `#`
- [ ] Correct contact email — brochure shows `Johnpierce@orthoflowrecovery.com`, internal notes show `johnpierce08@outlook.com`. Confirm which one is current.
- [ ] HIPAA notice in footer — verify language with client/legal
- [ ] Domain purchase confirmation + DNS pointed at GitHub Pages

---

## File Structure

```
/
├── index.html         Homepage
├── about.html         About Us
├── culture.html       Vision / Mission / Objectives
├── styles.css         All styles
├── main.js            Nav scroll behavior, mobile menu, form UX
├── assets/
│   ├── elite-care-logo.png
│   ├── nice-lifestyle.png
│   ├── flyer-front.png
│   ├── nice-product-brochure.pdf
│   └── favicon.ico
├── BUILD_PROMPT.md    Source-of-truth spec used to build this site
└── README.md          This file
```

---

## Brand Quick Reference

- **Primary Blue:** `#1E6BFF` (from logo)
- **Charcoal:** `#1A1A1A`
- **Cream Background:** `#FAF7F2`
- **Gold Accent:** `#B8965A` (used sparingly)
- **Headline font:** Playfair Display (serif, editorial)
- **Body font:** Inter (sans, modern)

Tagline: **Recover Faster. Feel Better.**

---

## Contact

**Business owner:** John Pierce
**Phone:** (786) 214-2659
**Email:** johnpierce08@outlook.com

**Developer:** SebbyIT Consulting, Corp.
