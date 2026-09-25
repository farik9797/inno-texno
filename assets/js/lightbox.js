/* INNO TEXNO — full-screen photo viewer shared by product and post pages (needs i18n.js; browser only).
   Lightbox.open(getItems, index, { label, onChange, returnFocus }) — getItems() returns [{ src, alt, cap }]
   and is re-read on every paint, so captions follow a language switch. */
function onSwipe(el, fn, only) {
  let x0 = null;
  el.addEventListener('pointerdown', e => { x0 = !only || e.target.closest(only) ? e.clientX : null; });
  el.addEventListener('pointerup', e => { if (x0 !== null && Math.abs(e.clientX - x0) > 45) fn(e.clientX < x0 ? 1 : -1); x0 = null; });
}

const Lightbox = (() => {
  let el = null, getItems = () => [], i = 0, opts = {};
  function paint() {
    const items = getItems(), it = items[i], img = el.querySelector('img');
    img.src = it.src; img.alt = it.alt || '';
    el.querySelector('figcaption').textContent = it.cap || '';
    el.querySelector('.lb-count').textContent = t('g_photo').replace('{i}', i + 1).replace('{n}', items.length);
    el.setAttribute('aria-label', typeof opts.label === 'function' ? opts.label() : (opts.label || t('g_gallery')));
    el.querySelector('.lb-close').setAttribute('aria-label', t('g_close'));
    el.querySelector('.lb-nav.prev').setAttribute('aria-label', t('g_prev'));
    el.querySelector('.lb-nav.next').setAttribute('aria-label', t('g_next'));
  }
  function go(d) {
    const n = getItems().length;
    i = (i + d + n) % n;
    paint();
    if (opts.onChange) opts.onChange(i);
  }
  function build() {
    el = document.createElement('div');
    el.className = 'lightbox'; el.hidden = true;
    el.setAttribute('role', 'dialog'); el.setAttribute('aria-modal', 'true');
    el.innerHTML = `<span class="lb-count"></span>
      <button type="button" class="lb-close"><iconify-icon icon="lucide:x"></iconify-icon></button>
      <button type="button" class="lb-nav prev"><iconify-icon icon="lucide:chevron-left"></iconify-icon></button>
      <figure><img alt=""><figcaption></figcaption></figure>
      <button type="button" class="lb-nav next"><iconify-icon icon="lucide:chevron-right"></iconify-icon></button>`;
    document.body.appendChild(el);
    el.addEventListener('click', e => {
      if (e.target.closest('.lb-close') || e.target === el) close();
      else if (e.target.closest('.lb-nav')) go(e.target.closest('.next') ? 1 : -1);
    });
    onSwipe(el.querySelector('figure'), go);
    el.addEventListener('keydown', e => {
      if (e.key === 'Escape') close();
      else if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') go(e.key === 'ArrowRight' ? 1 : -1);
      else if (e.key === 'Tab') { /* keep focus inside the dialog */
        const f = [...el.querySelectorAll('button')], k = f.indexOf(document.activeElement);
        e.preventDefault(); f[(k + (e.shiftKey ? -1 : 1) + f.length) % f.length].focus();
      }
    });
  }
  function open(items, index, options = {}) {
    if (!el) build();
    getItems = items; i = index; opts = options;
    paint();
    el.hidden = false;
    document.body.classList.add('lb-open');
    el.querySelector('.lb-close').focus();
  }
  function close() {
    el.hidden = true;
    document.body.classList.remove('lb-open');
    const back = opts.returnFocus && opts.returnFocus();
    if (back) back.focus();
  }
  const isOpen = () => !!el && !el.hidden;
  return { open, close, isOpen, repaint: () => { if (isOpen()) paint(); } };
})();
