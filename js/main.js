// Header scroll effect
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 20);
});

// Mobile nav
const burger = document.getElementById('navBurger');
const menu = document.getElementById('navMenu');
burger.addEventListener('click', () => {
  menu.classList.toggle('open');
  burger.setAttribute('aria-expanded', menu.classList.contains('open'));
});

// Close nav on link click
document.querySelectorAll('.nav-link, .nav-cta').forEach(link => {
  link.addEventListener('click', () => {
    menu.classList.remove('open');
  });
});

// Active nav link on scroll
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    if (window.scrollY >= section.offsetTop - 100) {
      current = section.getAttribute('id');
    }
  });
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === '#' + current) {
      link.classList.add('active');
    }
  });
}, { passive: true });

// Reviews slider
const track = document.getElementById('avisTrack');
const cards = document.querySelectorAll('.avis-card');
const dotsContainer = document.getElementById('avisDots');
const prevBtn = document.getElementById('avisPrev');
const nextBtn = document.getElementById('avisNext');

if (track && cards.length > 0) {
  let current = 0;
  const getVisible = () => window.innerWidth < 768 ? 1 : window.innerWidth < 900 ? 2 : 3;

  const dots = Array.from({ length: Math.ceil(cards.length / getVisible()) }, (_, i) => {
    const dot = document.createElement('button');
    dot.className = 'avis-dot' + (i === 0 ? ' active' : '');
    dot.setAttribute('aria-label', `Avis ${i + 1}`);
    dot.addEventListener('click', () => goTo(i));
    dotsContainer.appendChild(dot);
    return dot;
  });

  function goTo(idx) {
    const visible = getVisible();
    const max = Math.ceil(cards.length / visible) - 1;
    current = Math.max(0, Math.min(idx, max));
    const cardWidth = cards[0].offsetWidth + 24;
    track.style.transform = `translateX(-${current * visible * cardWidth}px)`;
    dots.forEach((d, i) => d.classList.toggle('active', i === current));
  }

  prevBtn.addEventListener('click', () => goTo(current - 1));
  nextBtn.addEventListener('click', () => goTo(current + 1));

  // Auto-play
  let autoPlay = setInterval(() => goTo((current + 1) % Math.ceil(cards.length / getVisible())), 4500);
  [prevBtn, nextBtn].forEach(btn => {
    btn.addEventListener('click', () => { clearInterval(autoPlay); autoPlay = setInterval(() => goTo((current + 1) % Math.ceil(cards.length / getVisible())), 4500); });
  });

  window.addEventListener('resize', () => goTo(0));
}

// Fade-in on scroll
const fadeEls = document.querySelectorAll('.produit-card, .offre-card, .blog-card, .avis-card, .step, .contact-card');
fadeEls.forEach(el => el.classList.add('fade-in'));

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

// WhatsApp message clicks
document.querySelectorAll('.wa-msg').forEach((msg, i) => {
  const messages = [
    'Bonjour Khadija, je veux commander un sac !',
    'Bonjour Khadija, je voudrais une commande personnalisée !',
    "Bonjour Khadija, j'ai une question sur les prix !"
  ];
  msg.addEventListener('click', () => {
    window.open(`https://wa.me/212715361382?text=${encodeURIComponent(messages[i] || messages[0])}`, '_blank', 'noopener');
  });
});

// Color dot tooltip
document.querySelectorAll('.color-dot').forEach(dot => {
  dot.addEventListener('click', function () {
    document.querySelectorAll('.color-dot').forEach(d => d.style.borderColor = 'transparent');
    this.style.borderColor = '#fff';
    this.style.boxShadow = '0 0 0 2px #C9A870';
  });
});
