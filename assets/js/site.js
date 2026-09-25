/* INNO TEXNO — behaviour shared by every page (load after i18n.js, before page scripts). */

/* ============ i18n: language state and t()/fmt()/money() live in i18n.js ============ */
function applyLang(l) {
  lang = l;
  storageSet('it-lang', l);
  document.documentElement.lang = l;
  document.querySelectorAll('[data-i18n]').forEach(el => { const v = t(el.dataset.i18n); if (v) el.textContent = v; });
  document.querySelectorAll('[data-i18n-ph]').forEach(el => { const v = t(el.dataset.i18nPh); if (v) el.placeholder = v; });
  document.querySelectorAll('[data-i18n-aria]').forEach(el => { const v = t(el.dataset.i18nAria); if (v) el.setAttribute('aria-label', v); });
  document.querySelectorAll('.lang-switch button').forEach(b => b.classList.toggle('active', b.dataset.lang === l));
  document.dispatchEvent(new CustomEvent('langchange', { detail: l })); /* pages re-render their dynamic text */
}
document.querySelectorAll('.lang-switch button').forEach(b => b.addEventListener('click', () => applyLang(b.dataset.lang)));

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ============ preloader: min one signal cycle, green light, curtain up ============ */
const preloader = document.getElementById('preloader');
const plStart = performance.now();
let plHidden = false;
function hidePreloader() {
  if (plHidden || !preloader) return;
  plHidden = true;
  const minShow = reduceMotion ? 0 : 1600;
  setTimeout(() => {
    preloader.classList.add('go');               /* lock the green light… */
    setTimeout(() => {
      preloader.classList.add('done');           /* …then lift the curtain */
      setTimeout(() => preloader.remove(), 1000);
    }, reduceMotion ? 0 : 380);
  }, Math.max(0, minShow - (performance.now() - plStart)));
}
if (document.readyState === 'complete') hidePreloader();
else addEventListener('load', hidePreloader, { once: true });
setTimeout(hidePreloader, 4000); /* never hold the page hostage */

/* ============ header: compact on scroll, burger menu, scrollspy ============ */
const header = document.querySelector('.site-header');
addEventListener('scroll', () => header.classList.toggle('scrolled', scrollY > 40), { passive: true });

const burger = document.querySelector('.burger');
const mobileMenu = document.getElementById('mobile-menu');
function setMenu(open) {
  mobileMenu.classList.toggle('open', open);
  mobileMenu.setAttribute('aria-hidden', String(!open));
  document.body.classList.toggle('menu-open', open);
  burger.setAttribute('aria-expanded', String(open));
  burger.querySelector('.ic-open').hidden = open;
  burger.querySelector('.ic-close').hidden = !open;
  if (open) mobileMenu.querySelector('a').focus({ preventScroll: true });
  else burger.focus({ preventScroll: true });
}
burger.addEventListener('click', () => setMenu(!mobileMenu.classList.contains('open')));
mobileMenu.querySelectorAll('a[href^="#"]').forEach(a => a.addEventListener('click', () => setMenu(false)));
addEventListener('keydown', e => { if (e.key === 'Escape' && mobileMenu.classList.contains('open')) setMenu(false); });

/* scrollspy: light up the in-page nav item for the section in view (cross-page links keep their state) */
const spyLinks = [...document.querySelectorAll('.main-nav a[href^="#"], .mobile-menu nav a[href^="#"], .cat-nav a[href^="#"]')];
const spyIO = new IntersectionObserver(entries => {
  entries.forEach(en => {
    if (!en.isIntersecting) return;
    const id = '#' + en.target.id;
    spyLinks.forEach(a => a.classList.toggle('active', a.getAttribute('href') === id));
  });
}, { rootMargin: '-30% 0px -60% 0px' });
document.querySelectorAll('main section[id]').forEach(s => spyIO.observe(s));

/* ============ scroll reveals: CSS transitions + IO (enhance visible defaults) ============ */
if (!reduceMotion && 'IntersectionObserver' in window) {
  const io = new IntersectionObserver(entries => {
    entries.forEach(en => { if (en.isIntersecting) { en.target.classList.add('rv-in'); io.unobserve(en.target); } });
  }, { rootMargin: '0px 0px -10% 0px' });
  document.querySelectorAll('.cat-grid, .why-rows, .proc-grid, .cert-grid, .testi-grid, .proj-grid, .sec-head').forEach(grid => {
    if (grid.getBoundingClientRect().top < innerHeight * 0.9) return; /* already on screen — stay visible */
    [...grid.children].forEach((el, i) => {
      el.classList.add('rv');
      el.style.transitionDelay = Math.min(i * 70, 420) + 'ms';
      io.observe(el);
    });
  });
}

/* ============ "order" buttons → prefill the request form (works for rendered-later buttons too) ============ */
document.addEventListener('click', e => {
  const btn = e.target.closest('[data-product]');
  if (!btn) return;
  const select = document.getElementById('fm-product');
  const msg = document.getElementById('fm-msg');
  if (select && [...select.options].some(o => o.value === btn.dataset.product)) select.value = btn.dataset.product;
  if (msg && btn.dataset.item) msg.value = t('order_msg').replace('{name}', btn.dataset.item).replace('{price}', btn.dataset.price || t('price_request'));
});

/* ============ form (demo: Telegram-bot/CRM hook point) ============ */
const orderForm = document.getElementById('order-form');
if (orderForm) orderForm.addEventListener('submit', e => {
  e.preventDefault();
  /* production: POST to backend → Telegram Bot API + CRM webhook */
  const toast = document.getElementById('toast');
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 4200);
  e.target.reset();
});

/* ============ boot ============ */
applyLang(lang);
