/* =============================================
   SCRIPT.JS – Portfolio Interactivity
   ============================================= */

// ---- Year ----
document.getElementById('year').textContent = new Date().getFullYear();

// ---- Cursor Glow ----
const cursorGlow = document.getElementById('cursorGlow');
document.addEventListener('mousemove', (e) => {
  cursorGlow.style.left = e.clientX + 'px';
  cursorGlow.style.top = e.clientY + 'px';
});

// ---- Typing Animation ----
const phrases = [
  'Full-Stack MERN Developer',
  'Data Engineer in Progress',
  'AI/ML Enthusiast',
  'Open Source Contributor',
  'Problem Solver',
];

let phraseIdx = 0;
let charIdx = 0;
let isDeleting = false;
const typedEl = document.getElementById('typedText');

function type() {
  const current = phrases[phraseIdx];
  if (isDeleting) {
    charIdx--;
  } else {
    charIdx++;
  }

  typedEl.textContent = current.substring(0, charIdx);

  let delay = isDeleting ? 40 : 80;

  if (!isDeleting && charIdx === current.length) {
    delay = 1800;
    isDeleting = true;
  } else if (isDeleting && charIdx === 0) {
    isDeleting = false;
    phraseIdx = (phraseIdx + 1) % phrases.length;
    delay = 300;
  }

  setTimeout(type, delay);
}

type();

// ---- Navbar scroll effect ----
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 30) {
    navbar.style.background = 'rgba(8,8,13,0.95)';
    navbar.style.boxShadow = '0 1px 0 #1e1e2e';
  } else {
    navbar.style.background = 'rgba(10,10,15,0.85)';
    navbar.style.boxShadow = 'none';
  }
});

// ---- Hamburger Menu ----
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  hamburger.classList.toggle('active');
});

// Close menu on link click
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    hamburger.classList.remove('active');
  });
});

// ---- Scroll Reveal ----
const revealTargets = document.querySelectorAll(
  '.section-header, .about-text, .about-desc, .skill-category, .project-card, .timeline-item, .cert-card, .contact-terminal, .contact-cta, .stat-box'
);

revealTargets.forEach(el => el.classList.add('reveal'));

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, 60 * (entry.target.dataset.delay || 0));
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

// Stagger siblings
revealTargets.forEach((el, i) => {
  // If parent is a grid-like container, stagger
  const siblings = el.parentElement ? Array.from(el.parentElement.children) : [];
  const idx = siblings.indexOf(el);
  el.dataset.delay = idx;
  revealObserver.observe(el);
});

// ---- Active nav link on scroll ----
const sections = document.querySelectorAll('section[id]');
const navLinksAll = document.querySelectorAll('.nav-link');

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinksAll.forEach(link => link.classList.remove('active'));
        const active = document.querySelector(`.nav-link[href="#${entry.target.id}"]`);
        if (active) active.classList.add('active');
      }
    });
  },
  { threshold: 0.4 }
);

sections.forEach(s => sectionObserver.observe(s));

// ---- Active nav link styling ----
const style = document.createElement('style');
style.textContent = `
  .nav-link.active { color: var(--accent) !important; }
`;
document.head.appendChild(style);

// ---- Terminal glitch effect on logo ----
const logoText = document.querySelector('.logo-text');
const glitchChars = '!@#$%^&*[]{}SD';
let glitchInterval = null;

function startGlitch() {
  let count = 0;
  glitchInterval = setInterval(() => {
    logoText.textContent = glitchChars[Math.floor(Math.random() * glitchChars.length)] +
                           glitchChars[Math.floor(Math.random() * glitchChars.length)];
    count++;
    if (count > 6) {
      clearInterval(glitchInterval);
      logoText.textContent = 'SD';
    }
  }, 60);
}

document.querySelector('.nav-logo').addEventListener('mouseenter', () => {
  if (glitchInterval) clearInterval(glitchInterval);
  startGlitch();
});

// ---- Project card hover corner accent ----
document.querySelectorAll('.project-card').forEach(card => {
  card.addEventListener('mouseenter', () => {
    card.style.setProperty('--card-glow', '1');
  });
  card.addEventListener('mouseleave', () => {
    card.style.setProperty('--card-glow', '0');
  });
});

// ---- Easter egg: Konami code ----
const konami = ['ArrowUp','ArrowUp','ArrowDown','ArrowDown','ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','b','a'];
let konamiIdx = 0;

document.addEventListener('keydown', (e) => {
  if (e.key === konami[konamiIdx]) {
    konamiIdx++;
    if (konamiIdx === konami.length) {
      konamiIdx = 0;
      showEasterEgg();
    }
  } else {
    konamiIdx = 0;
  }
});

function showEasterEgg() {
  const egg = document.createElement('div');
  egg.style.cssText = `
    position:fixed; top:50%; left:50%; transform:translate(-50%,-50%);
    background:#0f0f1a; border:1px solid #6c63ff; padding:2rem 3rem;
    font-family:JetBrains Mono,monospace; color:#6c63ff; z-index:99999;
    text-align:center; font-size:0.85rem; line-height:1.8;
    box-shadow: 0 0 40px rgba(108,99,255,0.3);
  `;
  egg.innerHTML = `<p style="font-size:1.5rem;margin-bottom:0.5rem">🎮</p>
  <p>// konami_code_activated</p>
  <p style="color:#00d4aa">You found the easter egg!</p>
  <p style="color:#6b6b8a;font-size:0.72rem;margin-top:0.5rem">click to close</p>`;
  document.body.appendChild(egg);
  egg.addEventListener('click', () => document.body.removeChild(egg));
}
