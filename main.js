/* ============================================================================
   Elite Care Recovery — Main JavaScript
   ============================================================================ */

/* 1. STICKY NAV: Toggle .scrolled class after 50px scroll */
const nav = document.querySelector('nav');

window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    nav.classList.add('scrolled');
  } else {
    nav.classList.remove('scrolled');
  }
});

/* 2. MOBILE HAMBURGER MENU: Toggle open/close (event delegation) */
const hamburgerBtn = document.querySelector('.hamburger');
const mobileMenu = document.querySelector('.mobile-menu');

/* Hamburger click + outside-click handler via event delegation */
document.addEventListener('click', (e) => {
  const btn = e.target.closest('.hamburger');

  /* Click on hamburger or its spans */
  if (btn) {
    mobileMenu.classList.toggle('open');
    btn.classList.toggle('open');
    btn.setAttribute('aria-expanded', mobileMenu.classList.contains('open'));
    return;
  }

  /* Click outside menu when open */
  if (mobileMenu && mobileMenu.classList.contains('open')) {
    if (!e.target.closest('.mobile-menu')) {
      mobileMenu.classList.remove('open');
      hamburgerBtn.classList.remove('open');
      hamburgerBtn.setAttribute('aria-expanded', 'false');
    }
  }
});

/* Close mobile menu on Escape key */
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && mobileMenu && mobileMenu.classList.contains('open')) {
    mobileMenu.classList.remove('open');
    hamburgerBtn.classList.remove('open');
    hamburgerBtn.setAttribute('aria-expanded', 'false');
  }
});

/* 3. SMOOTH SCROLL: For anchor links (#reserve, #how-it-works) */
document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener('click', (e) => {
    const href = link.getAttribute('href');
    if (href === '#') return;

    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });

      /* Close mobile menu if open */
      if (mobileMenu && mobileMenu.classList.contains('open')) {
        mobileMenu.classList.remove('open');
        hamburgerBtn.classList.remove('open');
      }
    }
  });
});

/* 4. FORMSPREE SUBMISSION UX: Show "Sending..." state and success message */
const form = document.querySelector('form');

if (form) {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    const formStatus = document.querySelector('.form-status');

    /* Show "Sending..." state */
    submitBtn.disabled = true;
    submitBtn.classList.add('sending');
    submitBtn.textContent = 'Sending…';

    /* Hide any previous status message */
    if (formStatus) {
      formStatus.classList.remove('show', 'success', 'error');
    }

    try {
      const formData = new FormData(form);
      const response = await fetch(form.action, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
        },
        body: formData,
      });

      if (response.ok) {
        /* Success */
        submitBtn.disabled = false;
        submitBtn.classList.remove('sending');
        submitBtn.textContent = '✓ Sent!';

        if (formStatus) {
          formStatus.textContent =
            'Thanks for reaching out! We'll be in touch within 24 hours.';
          formStatus.classList.add('show', 'success');
        }

        /* Reset form after a brief delay */
        setTimeout(() => {
          form.reset();
          submitBtn.textContent = originalText;
        }, 2000);
      } else {
        throw new Error('Form submission failed');
      }
    } catch (error) {
      /* Error */
      submitBtn.disabled = false;
      submitBtn.classList.remove('sending');
      submitBtn.textContent = originalText;

      if (formStatus) {
        formStatus.textContent =
          'Something went wrong. Please try again or call (786) 214-2659.';
        formStatus.classList.add('show', 'error');
      }

      console.error('Form submission error:', error);
    }
  });
}

/* 5. INTERSECTION OBSERVER: Fade-in sections as they enter viewport */
const observerOptions = {
  threshold: 0.15,
  rootMargin: '0px 0px -50px 0px',
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('fade-in');
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

/* Observe all sections and cards */
document.querySelectorAll('section, .card, .step-card').forEach((el) => {
  el.classList.add('fade-out');
  observer.observe(el);
});

/* CSS for fade-in animation (defined in styles.css with class) */
document.head.insertAdjacentHTML(
  'beforeend',
  `
  <style>
    .fade-out {
      opacity: 0;
      transform: translateY(20px);
    }

    .fade-in {
      animation: fadeInUp 600ms ease forwards;
    }

    @keyframes fadeInUp {
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
  </style>
`
);

/* Set active nav link based on current page */
function setActiveNavLink() {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach((link) => {
    const href = link.getAttribute('href');
    if (href === currentPage || (href === 'index.html' && currentPage === '')) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}

setActiveNavLink();
