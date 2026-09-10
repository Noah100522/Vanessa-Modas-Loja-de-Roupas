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
  const scrollFilmStyles = document.createElement('link');
  scrollFilmStyles.rel = 'stylesheet';
  scrollFilmStyles.href = './video-scroll.css';
  document.head.appendChild(scrollFilmStyles);

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
          <video muted loop playsinline preload="auto" poster="https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=1200&q=86" aria-label="Fashion film Vanessa Modas">
            <source src="./assets/vanessa-fashion-film.mp4" type="video/mp4">
          </video>
          <div class="film-shade"></div>
          <div class="film-status"><i></i> Fashion film</div>
          <div class="film-brand"><small>Nova coleção · Vanessa Modas</small><strong>A tendência é ser feliz.</strong></div>
        </div>
      </div>
      <div class="film-card film-card-left"><small>NEW SEASON</small><strong>Vista sua atitude.</strong></div>
      <div class="film-card film-card-right"><small>FEMININO</small><strong>Seu look. Seu momento.</strong></div>
      <div class="film-photo film-photo-left" aria-hidden="true"><img src="https://images.unsplash.com/photo-1485968579580-b6d095142e6e?auto=format&fit=crop&w=600&q=76" alt=""></div>
      <div class="film-photo film-photo-right" aria-hidden="true"><img src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=600&q=76" alt=""></div>
      <div class="film-scroll-copy" aria-live="polite"><span>NOVA COLEÇÃO</span><span>ELEGÂNCIA EM MOVIMENTO</span><span>SEU ESTILO. SUA IDENTIDADE.</span></div>
      <div class="film-progress" aria-hidden="true"><i></i></div>
      <span class="film-scroll-hint">ROLE PARA DIRIGIR O FILME</span>
    </div>`;
  lookbook.insertAdjacentElement('afterend', film);
  film.querySelectorAll('.reveal').forEach((element) => revealObserver.observe(element));

  const video = film.querySelector('video');
  const media = film.querySelector('.film-media');
  let filmDuration = 21;
  let targetProgress = 0;
  let renderedProgress = 0;
  let scrubFrame = 0;
  const updateFilmTarget = () => {
    const rect = film.getBoundingClientRect();
    const scrollable = Math.max(1, film.offsetHeight - window.innerHeight);
    targetProgress = Math.min(1, Math.max(0, -rect.top / scrollable));
  };
  const renderFilmScrub = () => {
    renderedProgress += (targetProgress - renderedProgress) * (reducedMotion ? 1 : 0.14);
    film.style.setProperty('--film-progress', renderedProgress.toFixed(5));
    if (video && Number.isFinite(filmDuration) && Math.abs(video.currentTime - renderedProgress * filmDuration) > 0.025) {
      video.currentTime = Math.min(Math.max(0, filmDuration - 0.04), renderedProgress * filmDuration);
    }
    if (Math.abs(targetProgress - renderedProgress) > 0.0005) scrubFrame = requestAnimationFrame(renderFilmScrub);
    else scrubFrame = 0;
  };
  const scheduleFilmScrub = () => {
    updateFilmTarget();
    if (!scrubFrame) scrubFrame = requestAnimationFrame(renderFilmScrub);
  };
  video?.addEventListener('loadedmetadata', () => {
    filmDuration = Number.isFinite(video.duration) ? video.duration : filmDuration;
    video.pause();
    scheduleFilmScrub();
  }, { once: true });
  video?.addEventListener('canplay', () => { media?.classList.add('has-video'); video.pause(); }, { once: true });
  video?.addEventListener('error', () => media?.classList.remove('has-video'));
  window.addEventListener('scroll', scheduleFilmScrub, { passive: true });
  window.addEventListener('resize', scheduleFilmScrub, { passive: true });
  scheduleFilmScrub();
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

  const cursorGlow = document.querySelector('.cursor-glow');
  window.addEventListener('pointermove', (event) => {
    if (!cursorGlow) return;
    cursorGlow.style.left = `${event.clientX}px`;
    cursorGlow.style.top = `${event.clientY}px`;
    cursorGlow.style.opacity = '1';
  }, { passive: true });
}
