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

// Cinematic fashion showcase. The local MP4 path is intentionally ready for the
// official/authorized Vanessa Modas footage; the poster remains as graceful fallback.
const lookbook = document.querySelector('.lookbook');
if (lookbook) {
  const filmStyles = document.createElement('link');
  filmStyles.rel = 'stylesheet';
  filmStyles.href = './video-showcase.css';
  document.head.appendChild(filmStyles);

  const film = document.createElement('section');
  film.className = 'fashion-film section-shell';
  film.id = 'fashion-film';
  film.innerHTML = `
    <div class="film-heading reveal">
      <div><span class="kicker">Vanessa Fashion Film</span><h2>Moda feita para <em>entrar em cena.</em></h2></div>
      <p>Movimento, atitude e estilo em uma experiência visual que transforma a coleção em protagonista.</p>
    </div>
    <div class="film-stage reveal" data-film-tilt>
      <span class="film-index" aria-hidden="true">01</span>
      <span class="film-note" aria-hidden="true">Vanessa Modas · Fashion Experience</span>
      <div class="film-frame">
        <div class="film-media">
          <img class="film-poster" src="https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=1200&q=86" alt="Editorial feminino Vanessa Modas" loading="lazy">
          <video muted loop playsinline preload="metadata" poster="https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=1200&q=86" aria-label="Fashion film Vanessa Modas">
            <source src="./assets/vanessa-fashion-film.mp4" type="video/mp4">
          </video>
          <div class="film-shade"></div>
          <div class="film-status"><i></i> Fashion film</div>
          <div class="film-brand"><small>Nova coleção · Vanessa Modas</small><strong>A tendência é ser feliz.</strong></div>
        </div>
      </div>
      <div class="film-card film-card-left"><small>NEW SEASON</small><strong>Vista sua atitude.</strong></div>
      <div class="film-card film-card-right"><small>FEMININO</small><strong>Seu look. Seu momento.</strong></div>
    </div>`;
  lookbook.insertAdjacentElement('afterend', film);
  film.querySelectorAll('.reveal').forEach((element) => revealObserver.observe(element));

  const video = film.querySelector('video');
  const media = film.querySelector('.film-media');
  video?.addEventListener('canplay', () => {
    media?.classList.add('has-video');
    if (!reducedMotion) video.play().catch(() => {});
  }, { once: true });
  video?.addEventListener('error', () => media?.classList.remove('has-video'));
}

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

  const filmStage = document.querySelector('[data-film-tilt]');
  const filmFrame = filmStage?.querySelector('.film-frame');
  filmStage?.addEventListener('pointermove', (event) => {
    if (!filmFrame) return;
    const rect = filmStage.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    filmFrame.style.transform = `translateX(-50%) rotateX(${2 - y * 4}deg) rotateY(${-2 + x * 6}deg) translateZ(14px)`;
  });
  filmStage?.addEventListener('pointerleave', () => {
    if (filmFrame) filmFrame.style.transform = 'translateX(-50%) rotateX(2deg) rotateY(-2deg)';
  });

  const cursorGlow = document.querySelector('.cursor-glow');
  window.addEventListener('pointermove', (event) => {
    if (!cursorGlow) return;
    cursorGlow.style.left = `${event.clientX}px`;
    cursorGlow.style.top = `${event.clientY}px`;
    cursorGlow.style.opacity = '1';
  }, { passive: true });
}
