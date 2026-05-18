// ============================================
// Svadba 29.8.2026 — i18n + countdown + mobile menu
// ============================================

// --- i18n (SK / CZ) ---
// Texty sú v HTML cez data-sk / data-cs (textContent)
// alebo data-sk-html / data-cs-html (innerHTML — pre <strong>, <br>, <a>).
// title aj meta[name=description] používajú data-sk / data-cs.
//
// Jazyk sa určuje s touto prioritou:
//   1. URL parameter ?lang=sk|cs alebo ?l=sk|cs (pre QR kódy)
//   2. localStorage 'lang' (uložený výber z minula)
//   3. Default 'sk'
(function () {
  const SUPPORTED = ['sk', 'cs'];
  const DEFAULT_LANG = 'sk';
  const STORAGE_KEY = 'lang';

  function getLangFromUrl() {
    try {
      const params = new URLSearchParams(window.location.search);
      const raw = (params.get('lang') || params.get('l') || '').toLowerCase();
      if (SUPPORTED.includes(raw)) return raw;
    } catch (e) {}
    return null;
  }

  function getSavedLang() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (SUPPORTED.includes(saved)) return saved;
    } catch (e) { /* localStorage zakázaný */ }
    return null;
  }

  function getInitialLang() {
    return getLangFromUrl() || getSavedLang() || DEFAULT_LANG;
  }

  function saveLang(lang) {
    try { localStorage.setItem(STORAGE_KEY, lang); } catch (e) {}
  }

  function applyLang(lang) {
    if (!SUPPORTED.includes(lang)) lang = DEFAULT_LANG;

    document.querySelectorAll('[data-sk]').forEach(el => {
      const val = el.dataset[lang];
      if (val == null) return;
      if (el.tagName === 'TITLE') {
        document.title = val;
      } else if (el.tagName === 'META') {
        el.setAttribute('content', val);
      } else {
        el.textContent = val;
      }
    });

    document.querySelectorAll('[data-sk-html]').forEach(el => {
      const key = lang + 'Html';
      const val = el.dataset[key];
      if (val != null) el.innerHTML = val;
    });

    document.documentElement.lang = lang;

    document.querySelectorAll('.lang-btn').forEach(btn => {
      const isActive = btn.dataset.lang === lang;
      btn.classList.toggle('active', isActive);
      btn.setAttribute('aria-pressed', isActive ? 'true' : 'false');
    });

    saveLang(lang);
  }

  function init() {
    applyLang(getInitialLang());
    document.querySelectorAll('.lang-btn').forEach(btn => {
      btn.addEventListener('click', () => applyLang(btn.dataset.lang));
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();

// --- Mobile menu toggle ---
(function () {
  const toggle = document.querySelector('.nav-toggle');
  const links = document.querySelector('.nav-links');
  if (!toggle || !links) return;
  toggle.addEventListener('click', () => {
    links.classList.toggle('open');
  });
  links.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => links.classList.remove('open'));
  });
})();

// --- Countdown to 29.8.2026, 15:00 (čas obradu) ---
(function () {
  const target = new Date('2026-08-29T15:00:00+02:00').getTime();
  const elDays  = document.getElementById('cd-days');
  const elHours = document.getElementById('cd-hours');
  const elMins  = document.getElementById('cd-mins');
  const elSecs  = document.getElementById('cd-secs');
  if (!elDays) return;

  function pad(n) { return n < 10 ? '0' + n : '' + n; }

  function tick() {
    const now = Date.now();
    let diff = target - now;
    if (diff <= 0) {
      elDays.textContent  = '00';
      elHours.textContent = '00';
      elMins.textContent  = '00';
      elSecs.textContent  = '00';
      const label = document.querySelector('.countdown-wrap .label');
      if (label) {
        const lang = document.documentElement.lang === 'cs' ? 'cs' : 'sk';
        label.textContent = lang === 'cs'
          ? 'Náš den je tu — děkujeme, že jste s námi ♥'
          : 'Náš deň je tu — ďakujeme, že ste s nami ♥';
      }
      return;
    }
    const days  = Math.floor(diff / (1000 * 60 * 60 * 24));
    diff -= days * 1000 * 60 * 60 * 24;
    const hours = Math.floor(diff / (1000 * 60 * 60));
    diff -= hours * 1000 * 60 * 60;
    const mins  = Math.floor(diff / (1000 * 60));
    diff -= mins * 1000 * 60;
    const secs  = Math.floor(diff / 1000);

    elDays.textContent  = pad(days);
    elHours.textContent = pad(hours);
    elMins.textContent  = pad(mins);
    elSecs.textContent  = pad(secs);
  }
  tick();
  setInterval(tick, 1000);
})();

// --- Lightbox pre .gallery-item (klik = zväčšenie + prev/next) ---
(function () {
  const galleries = document.querySelectorAll('.gallery');
  if (!galleries.length) return;

  // Zozbieraj všetky obrázky z galérie/galérií na stránke
  const items = [];
  galleries.forEach(gal => {
    gal.querySelectorAll('.gallery-item').forEach(el => {
      const bg = el.style.backgroundImage || '';
      const m = bg.match(/url\((['"]?)(.*?)\1\)/);
      if (!m) return;
      const idx = items.length;
      items.push(m[2]);
      el.addEventListener('click', () => open(idx));
    });
  });
  if (!items.length) return;

  // Vytvor lightbox DOM
  const lb = document.createElement('div');
  lb.className = 'lightbox';
  lb.setAttribute('role', 'dialog');
  lb.setAttribute('aria-modal', 'true');
  lb.innerHTML =
    '<button class="lightbox-btn lightbox-close" aria-label="Zavrieť">&times;</button>' +
    '<button class="lightbox-btn lightbox-prev"  aria-label="Predchádzajúca">&lsaquo;</button>' +
    '<button class="lightbox-btn lightbox-next"  aria-label="Nasledujúca">&rsaquo;</button>' +
    '<img class="lightbox-img" alt="">' +
    '<div class="lightbox-counter"></div>';
  document.body.appendChild(lb);

  const imgEl = lb.querySelector('.lightbox-img');
  const counter = lb.querySelector('.lightbox-counter');
  let current = 0;

  function render() {
    imgEl.src = items[current];
    counter.textContent = (current + 1) + ' / ' + items.length;
  }
  function open(idx) {
    current = idx;
    render();
    lb.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
  function close() {
    lb.classList.remove('open');
    document.body.style.overflow = '';
  }
  function prev() { current = (current - 1 + items.length) % items.length; render(); }
  function next() { current = (current + 1) % items.length; render(); }

  lb.querySelector('.lightbox-close').addEventListener('click', close);
  lb.querySelector('.lightbox-prev').addEventListener('click', e => { e.stopPropagation(); prev(); });
  lb.querySelector('.lightbox-next').addEventListener('click', e => { e.stopPropagation(); next(); });
  imgEl.addEventListener('click', e => e.stopPropagation());
  lb.addEventListener('click', e => { if (e.target === lb) close(); });
  document.addEventListener('keydown', e => {
    if (!lb.classList.contains('open')) return;
    if (e.key === 'Escape') close();
    else if (e.key === 'ArrowLeft') prev();
    else if (e.key === 'ArrowRight') next();
  });
})();

// --- Reveal on scroll (subtle fade-in) ---
(function () {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.style.opacity = '1';
        e.target.style.transform = 'translateY(0)';
        observer.unobserve(e.target);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll('.card, .timeline-item, .info-block, .gallery-item, .section-head').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity .8s ease, transform .8s ease';
    observer.observe(el);
  });
})();
