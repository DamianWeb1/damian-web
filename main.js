/**
 * Personal Website — Retro-Brutalist Portfolio
 * Handles: menu toggle, scroll reveal, portfolio filters, smooth scroll
 */


/* ============================================================
   HAMBURGER MENU
   ============================================================ */

const menuToggle = document.getElementById('menuToggle');
const navOverlay = document.getElementById('navOverlay');
const navLinks = document.querySelectorAll('[data-nav]');

function toggleMenu() {
  menuToggle.classList.toggle('active');
  navOverlay.classList.toggle('open');
  document.body.style.overflow = navOverlay.classList.contains('open') ? 'hidden' : '';
}

menuToggle.addEventListener('click', toggleMenu);

navLinks.forEach(link => {
  link.addEventListener('click', () => {
    if (navOverlay.classList.contains('open')) {
      toggleMenu();
    }
  });
});

// Close on Escape
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && navOverlay.classList.contains('open')) {
    toggleMenu();
  }
});


/* ============================================================
   SCROLL REVEAL (Intersection Observer)
   ============================================================ */

const revealElements = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.15,
  rootMargin: '0px 0px -50px 0px'
});

revealElements.forEach(el => revealObserver.observe(el));


/* ============================================================
   PORTFOLIO FILTERS
   ============================================================ */

const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    // Update active button
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const filter = btn.dataset.filter;

    projectCards.forEach(card => {
      const category = card.dataset.category;

      if (filter === 'all' || category === filter) {
        card.classList.remove('hidden');
        // Re-trigger reveal animation
        requestAnimationFrame(() => {
          card.classList.add('visible');
        });
      } else {
        card.classList.add('hidden');
      }
    });
  });
});


/* ============================================================
   HEADER SCROLL EFFECT
   ============================================================ */

const header = document.getElementById('header');
let lastScroll = 0;

window.addEventListener('scroll', () => {
  const currentScroll = window.pageYOffset;

  if (currentScroll > 100) {
    header.style.boxShadow = '0 4px 30px rgba(26,26,26,0.06)';
  } else {
    header.style.boxShadow = 'none';
  }

  lastScroll = currentScroll;
}, { passive: true });


/* ============================================================
   SMOOTH SCROLL POLYFILL (for anchor links)
   ============================================================ */

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      const headerHeight = header.offsetHeight;
      const targetPosition = target.offsetTop - headerHeight;
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  });
});


/* ============================================================
   TILT EFFECT ON SERVICE CARDS (subtle)
   ============================================================ */

const serviceCards = document.querySelectorAll('.service-card');

serviceCards.forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = (y - centerY) / 20;
    const rotateY = (centerX - x) / 20;

    card.style.transform = `translateY(-8px) perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});


/* ============================================================
   TYPING / CURSOR BLINK ON CONTACT HEADING (optional flair)
   ============================================================ */

// Add a pulsing glow to the contact section heading
const contactHeading = document.querySelector('.contact-heading');
if (contactHeading) {
  setInterval(() => {
    contactHeading.style.textShadow = '0 0 40px rgba(253,251,245,0.15)';
    setTimeout(() => {
      contactHeading.style.textShadow = 'none';
    }, 1000);
  }, 3000);
}
