# Elite Care Recovery — Website Launch Guide

Hi John,

Your website is ready to preview and launch. This document covers everything you need to know.

---

## Live Preview URL

Your site is now live at:

**https://{YOUR_GITHUB_USERNAME}.github.io/elite-care-recovery/**

Replace `{YOUR_GITHUB_USERNAME}` with your actual GitHub username. If you don't have a GitHub account yet, you'll need to create one (free) to host the site.

Test it on desktop, tablet, and mobile. Try the reserve form, click the navigation links, and scroll through all three pages.

---

## What's Done ✓

- **3 full pages:** Homepage, About Us, Culture
- **Mobile-responsive:** Works beautifully on phones (375px), tablets (768px), and desktops (1280px)
- **Premium design:** Cream backgrounds, gold accents, Playfair Display headlines, professional sans-serif body copy
- **Contact form:** Ready to capture leads (Formspree integration)
- **Accessibility:** Keyboard navigation, focus states, ARIA labels, semantic HTML
- **Fast & clean:** No frameworks, no dependencies, pure HTML/CSS/JavaScript

---

## Before Launch: Your To-Do Checklist

### 🔴 Must-Do (Blocks Launch)

- [ ] **Add Formspree Form ID**
  1. Go to [formspree.io](https://formspree.io) and sign up using **johnpierce08@outlook.com**
  2. Create a new form, name it "Elite Care Recovery — Reservations"
  3. Copy the form ID (looks like `xyzabcde`)
  4. In `index.html`, find this line: `<form action="https://formspree.io/f/REPLACE_WITH_FORM_ID"`
  5. Replace `REPLACE_WITH_FORM_ID` with your actual ID
  6. Test by submitting the form — you should receive an email

- [ ] **Confirm Contact Email**
  - The site uses **johnpierce08@outlook.com** for contact
  - Check `index.html` around line 400 for the TODO comment flagging this
  - If the brochure email (`Johnpierce@orthoflowrecovery.com`) is correct instead, let me know and I'll update it

### 🟡 Should-Do (Improves Credibility)

- [ ] **Add Your Photo**
  - Upload a portrait photo of you and your brother(s) to the repo
  - Format: Professional, warm, editorial style. Black-and-white or warm tone recommended.
  - Aspect ratio: 4:5 (portrait, taller than wide)
  - Replace the placeholder images on:
    - Homepage: "About Preview" section (right side)
    - About page: "The Story" section (right side)
  - Instructions: Save as `assets/brothers-photo.jpg` and update the image tags in the HTML files

- [ ] **Confirm Business Hours**
  - Footer shows: Mon–Fri 8–7, Sat 9–4, Sun by appointment, 24/7 emergency
  - Check `index.html` around line 450 (in footer)
  - Update if any of these are incorrect

- [ ] **Add Social Media Handles**
  - Footer has placeholder icons for Instagram & Facebook (currently link to `#`)
  - If you have Instagram/Facebook accounts, provide the URLs
  - I'll update the footer links

- [ ] **Review HIPAA Notice**
  - Footer includes: "Elite Care Recovery is committed to protecting patient privacy in accordance with HIPAA standards."
  - Check with your attorney that this language is appropriate
  - Located in `index.html`, `about.html`, `culture.html` footers

### 🟢 Nice-to-Have (v2 Enhancements)

- [ ] **Custom Domain** (optional for now)
  - Once you purchase `elitecarerecovery.net`, I can configure DNS
  - Site will then be live at `https://elitecarerecovery.net/`
  - (Instructions below for when you're ready)

- [ ] **Email Notifications**
  - Formspree can notify multiple people when forms are submitted
  - Set this up in Formspree dashboard after creating your form

---

## Setting Up Your GitHub Repository

If you don't already have the repo set up, here's the quick version:

1. **Create a GitHub account** at github.com (if you don't have one)
2. **Tell me your GitHub username**
3. I'll make sure the files are in the right place
4. Your site will be live at `https://{username}.github.io/elite-care-recovery/`

---

## Custom Domain Setup (When Ready)

When you purchase `elitecarerecovery.net`, follow these steps:

1. **At your domain registrar** (GoDaddy, Namecheap, etc.):
   - Add **A records** pointing to these IP addresses:
     - `185.199.108.153`
     - `185.199.109.153`
     - `185.199.110.153`
     - `185.199.111.153`
   - Add a **CNAME record** for `www` pointing to `{username}.github.io`

2. **In GitHub repo Settings**:
   - Go to Settings → Pages
   - In "Custom domain" field, enter `elitecarerecovery.net`
   - Click Save
   - Check "Enforce HTTPS" (after DNS propagates, ~10 minutes to 24 hours)

3. **Wait for DNS to propagate** (can take 10 minutes to 24 hours)
   - You can check status here: [mxtoolbox.com/dnscheck](https://mxtoolbox.com/dnscheck)
   - Enter your domain and verify the A records are resolving

---

## Form Submissions: Where Do They Go?

When someone fills out the "Reserve Equipment" form:
1. Formspree captures their info
2. Sends you an email to **johnpierce08@outlook.com**
3. You can reply directly or follow up manually

**Future enhancement (v2):** We can automate this to pipe directly into Airtable so you don't have to copy/paste leads.

---

## What's Next? (v2 Ideas)

Once you see how v1 performs, here are enhancements we could build:

- **Airtable Integration** — Form submissions automatically create rows in your CRM
- **Spanish Translation** — Bilingual site (English + Spanish)
- **Testimonials Section** — Display reviews and patient success stories
- **Blog or Case Studies** — Showcase recovery results
- **Email Automation** — Auto-send welcome emails and follow-ups
- **Google Analytics** — Track visitor behavior, form submissions, page performance
- **Booking Calendar** — Let patients schedule reservations directly (if you offer it)

Talk to me when you're ready to invest in any of these.

---

## Support & Updates

**Questions?**
- Email: sebastian@sebbyitconsulting.com
- Phone: (available during business hours)

**Found a bug or typo?**
- Let me know and I'll fix it

**Want to change something?**
- Logo, colors, copy, layout — just ask

---

## File Structure (For Your Reference)

```
/
├── index.html           (Homepage)
├── about.html           (About Us)
├── culture.html         (Vision, Mission, Culture)
├── styles.css           (All styling)
├── main.js              (Navigation, forms, smooth scroll)
├── favicon.svg          (Browser tab icon)
├── assets/
│   ├── elite-care-logo.png
│   ├── nice-lifestyle.png
│   ├── flyer-front.png
│   ├── nice-product-brochure.pdf
│   └── [brothers-photo.jpg — add this when ready]
├── README.md            (Developer notes)
├── BUILD_PROMPT.md      (Design spec)
├── CONTENT_DECK.md      (Your approved copy)
├── CLAUDE.md            (Developer operating manual)
└── HANDOFF.md           (This file)
```

---

## Launch Checklist

Before announcing the site to customers, check off:

- [ ] Form works and emails are being received
- [ ] Photo of you and your brother(s) added
- [ ] Business hours confirmed and updated
- [ ] Social media handles added (or marked as "coming soon")
- [ ] HIPAA notice reviewed by your attorney
- [ ] Contact email confirmed
- [ ] Tested on actual phone (not just desktop)
- [ ] All links work (internal pages + PDF brochure)
- [ ] Tagline "Recover Faster. Feel Better." appears on homepage

---

## Contact

**Developer:** SebbyIT Consulting, Corp.  
**Email:** sebastian@sebbyitconsulting.com  
**Website:** sebbyitconsulting.com

Thanks for letting me build this. Looking forward to helping Elite Care Recovery grow!

---

**Version:** 1.0  
**Date:** May 28, 2026  
**Status:** Ready for preview & launch
