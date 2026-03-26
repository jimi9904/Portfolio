// ===== THEME TOGGLE =====
(function () {
  const html  = document.documentElement;
  const saved = localStorage.getItem('theme') || 'dark';
  html.setAttribute('data-theme', saved);

  document.addEventListener('DOMContentLoaded', () => {
    const btn = document.getElementById('theme-toggle');
    if (!btn) return;

    btn.addEventListener('click', () => {
      const current = html.getAttribute('data-theme');
      const next    = current === 'dark' ? 'light' : 'dark';
      html.setAttribute('data-theme', next);
      localStorage.setItem('theme', next);
    });
  });
})();

// ===== EMAILJS INIT =====
emailjs.init("DFe-RXnKwR50Ez1Qz");


// ===== TYPING ANIMATION =====
const typingEl = document.getElementById('typing-text');
const phrases  = [
  'Full Stack Developer',
  'MERN Stack Engineer',
  'Problem Solver',
  'DSA Enthusiast',
  'Team Leader'
];
let phraseIdx = 0, charIdx = 0, deleting = false;

function type() {
  const cur = phrases[phraseIdx];
  typingEl.textContent = deleting
    ? cur.substring(0, charIdx - 1)
    : cur.substring(0, charIdx + 1);
  deleting ? charIdx-- : charIdx++;

  if (!deleting && charIdx === cur.length) {
    deleting = true;
    return setTimeout(type, 1800);
  }
  if (deleting && charIdx === 0) {
    deleting = false;
    phraseIdx = (phraseIdx + 1) % phrases.length;
    return setTimeout(type, 400);
  }
  setTimeout(type, deleting ? 50 : 85);
}
type();

// ===== NAVBAR — active link + shadow on scroll =====
const navbar  = document.getElementById('navbar');
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
  // Shadow
  navbar.style.boxShadow = window.scrollY > 20
    ? '0 2px 20px rgba(0,0,0,.4)'
    : 'none';

  // Active link
  const scrollY = window.scrollY + 80;
  sections.forEach(sec => {
    if (scrollY >= sec.offsetTop && scrollY < sec.offsetTop + sec.offsetHeight) {
      navLinks.forEach(l => l.classList.remove('active'));
      const active = document.querySelector(`.nav-link[href="#${sec.id}"]`);
      if (active) active.classList.add('active');
    }
  });
});

// ===== HAMBURGER =====
const hamburger = document.getElementById('hamburger');
const navLinksEl = document.getElementById('nav-links');

hamburger.addEventListener('click', () => {
  navLinksEl.classList.toggle('open');
  hamburger.classList.toggle('open');
});

navLinksEl.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    navLinksEl.classList.remove('open');
    hamburger.classList.remove('open');
  });
});

// ===== SMOOTH SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    e.preventDefault();
    const target = document.querySelector(a.getAttribute('href'));
    if (target) window.scrollTo({ top: target.offsetTop - 60, behavior: 'smooth' });
  });
});

// ===== CONTACT FORM =====
const contactForm = document.getElementById('contact-form');
const submitBtn   = document.getElementById('submit-btn');
const successMsg  = document.getElementById('form-success');
const errorMsg    = document.getElementById('form-error');

if (contactForm) {
  contactForm.addEventListener('submit', async e => {
    e.preventDefault();
    successMsg.style.display = 'none';
    errorMsg.style.display   = 'none';

    const origHTML = submitBtn.innerHTML;
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;

    try {
      await emailjs.sendForm('service_a8mxabq', 'template_qz2nmuf', contactForm);
      successMsg.style.display = 'block';
      contactForm.reset();
      setTimeout(() => { successMsg.style.display = 'none'; }, 5000);
    } catch (err) {
      console.error(err);
      errorMsg.style.display = 'block';
      setTimeout(() => { errorMsg.style.display = 'none'; }, 5000);
    } finally {
      submitBtn.innerHTML = origHTML;
      submitBtn.disabled  = false;
    }
  });
}

// ===== REVEAL ON SCROLL =====
const reveals = document.querySelectorAll(
  '.project-card, .cert-card, .timeline-item, .edu-item, .amber-card, .skill-group'
);

const io = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.style.opacity  = '1';
      e.target.style.transform = 'translateY(0)';
      io.unobserve(e.target);
    }
  });
}, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

reveals.forEach(el => {
  el.style.opacity   = '0';
  el.style.transform = 'translateY(24px)';
  el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  io.observe(el);
});