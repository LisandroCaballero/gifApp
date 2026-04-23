/* ============================================================
   NAV — scroll state + mobile toggle
   ============================================================ */
const nav        = document.getElementById('nav');
const navToggle  = document.getElementById('navToggle');
const navLinks   = document.querySelector('.nav-links');

window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 60);
}, { passive: true });

navToggle.addEventListener('click', () => {
  navToggle.classList.toggle('open');
  navLinks.classList.toggle('open');
  document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
});

navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navToggle.classList.remove('open');
    navLinks.classList.remove('open');
    document.body.style.overflow = '';
  });
});

/* ============================================================
   SCROLL REVEAL
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
  threshold: 0.12,
  rootMargin: '0px 0px -40px 0px'
});

revealElements.forEach(el => revealObserver.observe(el));

/* ============================================================
   BADGE HOVER STAGGER ANIMATION
   ============================================================ */
document.querySelectorAll('.skill-group').forEach(group => {
  const badges = group.querySelectorAll('.badge');
  badges.forEach((badge, i) => {
    badge.style.transitionDelay = `${i * 40}ms`;
  });
});

/* ============================================================
   CONTACT FORM — UI feedback only
   ============================================================ */
const form = document.getElementById('contactForm');

form.addEventListener('submit', e => {
  e.preventDefault();
  const btn    = form.querySelector('button[type="submit"]');
  const span   = btn.querySelector('span');
  const svg    = btn.querySelector('svg');

  btn.disabled  = true;
  span.textContent = 'Enviado ✓';
  svg.style.display = 'none';
  btn.style.background = 'var(--emerald)';
  btn.style.boxShadow  = '0 0 20px rgba(16,185,129,0.35)';

  setTimeout(() => {
    btn.disabled = false;
    span.textContent = 'Enviar mensaje';
    svg.style.display = '';
    btn.style.background = '';
    btn.style.boxShadow  = '';
    form.reset();
  }, 3000);
});

/* ============================================================
   ACTIVE NAV HIGHLIGHT ON SCROLL
   ============================================================ */
const sections   = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav-links a');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.id;
      navAnchors.forEach(a => {
        a.style.color = a.getAttribute('href') === `#${id}` ? 'var(--blue)' : '';
      });
    }
  });
}, { threshold: 0.4 });

sections.forEach(s => sectionObserver.observe(s));

/* ============================================================
   BADGE TILT EFFECT (subtle 3D on hover)
   ============================================================ */
document.querySelectorAll('.timeline-card').forEach(card => {
  card.addEventListener('mousemove', e => {
    const rect = card.getBoundingClientRect();
    const x    = ((e.clientX - rect.left) / rect.width  - 0.5) * 4;
    const y    = ((e.clientY - rect.top)  / rect.height - 0.5) * -4;
    card.style.transform = `translateX(4px) perspective(600px) rotateX(${y}deg) rotateY(${x}deg)`;
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});

/* ============================================================
   HERO PHOTO PARALLAX (subtle)
   ============================================================ */
const heroPhoto = document.querySelector('.hero-photo-wrap');
if (heroPhoto) {
  window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    if (scrolled < window.innerHeight) {
      heroPhoto.style.transform = `translateY(${scrolled * 0.08}px)`;
    }
  }, { passive: true });
}
