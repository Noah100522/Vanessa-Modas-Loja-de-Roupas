const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach((element) => revealObserver.observe(element));

document.querySelector('#year').textContent = new Date().getFullYear();

const header = document.querySelector('.site-header');
const menuButton = document.querySelector('.menu-button');

menuButton?.addEventListener('click', () => {
  const isOpen = header.classList.toggle('menu-open');
  menuButton.setAttribute('aria-expanded', String(isOpen));
  menuButton.setAttribute('aria-label', isOpen ? 'Fechar menu' : 'Abrir menu');
});

document.querySelectorAll('.desktop-nav a').forEach((link) => {
  link.addEventListener('click', () => {
    header.classList.remove('menu-open');
    menuButton?.setAttribute('aria-expanded', 'false');
  });
});

const progressBar = document.querySelector('.scroll-progress span');
const updateScrollProgress = () => {
  if (!progressBar) return;
  const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
  const progress = maxScroll > 0 ? (window.scrollY / maxScroll) * 100 : 0;
  progressBar.style.width = `${Math.min(100, progress)}%`;
};
window.addEventListener('scroll', updateScrollProgress, { passive: true });
updateScrollProgress();

const canTilt = window.matchMedia('(pointer:fine)').matches && !reducedMotion;

if (canTilt) {
  document.querySelectorAll('[data-tilt]').forEach((card) => {
    const baseRotation = card.classList.contains('mini-one') ? -7 : card.classList.contains('mini-two') ? 8 : 2;
    card.addEventListener('pointermove', (event) => {
      const rect = card.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;
      card.style.transform = `perspective(900px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg) rotateZ(${baseRotation}deg) translateZ(8px)`;
    });
    card.addEventListener('pointerleave', () => {
      card.style.transform = `rotate(${baseRotation}deg)`;
    });
  });

  document.querySelectorAll('[data-tilt-soft]').forEach((stage) => {
    const frame = stage.querySelector('.browser-frame');
    stage.addEventListener('pointermove', (event) => {
      if (!frame) return;
      const rect = stage.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;
      frame.style.transform = `rotateX(${3 - y * 5}deg) rotateY(${-2 + x * 7}deg) translateZ(12px)`;
    });
    stage.addEventListener('pointerleave', () => {
      if (frame) frame.style.transform = 'rotateX(3deg) rotateY(-2deg) translateZ(0)';
    });
  });

  const cursorGlow = document.querySelector('.cursor-glow');
  window.addEventListener('pointermove', (event) => {
    if (!cursorGlow) return;
    cursorGlow.style.left = `${event.clientX}px`;
    cursorGlow.style.top = `${event.clientY}px`;
    cursorGlow.style.opacity = '1';
  }, { passive: true });
}
